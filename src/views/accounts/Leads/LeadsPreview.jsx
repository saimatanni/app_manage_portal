import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate,  } from "react-router-dom";
// import { process.env.REACT_APP_BASE_URL } from "src/ConstUrl";
import Loader from "src/utils/Loader";
import { showToast } from "src/utils/ToastHelper";
import { useDispatch, useSelector } from "react-redux";
import { GetAllProductList } from "src/views/common/_redux/action/CommonAction";
import detailIcon from "../../../assets/img/detail-icon.svg";
import { GetIndustryList, LeadUpdatedData } from "./_redux/action/LeadAction";
import { getTimeFormat, onBoarddateFormat } from "src/utils/CommonFunction";
import LeadInfoPreview from "./leadPreview/LeadInfoPreview";
import EditLeadPreview from "./leadPreview/EditLeadPreview";

export default function LeadsPreview() {
  const dispatch = useDispatch();
  const location = useLocation();
  // -----------------edit lead preview tanni--------------
  const [leadType, setLeadType] = useState(true);

  const allProductList = useSelector(
    (state) => state.commonInfo.allProductList
  );

  useEffect(() => {
    dispatch(
      GetAllProductList(
        `${process.env.REACT_APP_BASE_URL}api/v1/product/product/`
      )
    );
  }, []);

  // const { id } = useParams()
  const id = localStorage.getItem("leadId");
  const navigate = useNavigate();
  const [lead, setLead] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [currentCostTotal, setCurrentCostTotal] = useState(0);
  const [psCostTotal, setPsCostTotal] = useState(0);
  const legalType = {
    ST: "Sole Trader",
    CL: "Club",
    CH: "Charity",
    TR: "Trust",
    PART: "Partnership",
    LLP: "Limited Liability Partnership",
    L: "Private Limited Company",
    PL: "Public Limited Company",
    OT: "Other",
  };
  const [leadsProduct, setLeadProducts] = useState([]);
 
  const getNewPreview = (url) => {
    axios
      .get(url)
      .then((res) => {
        setLeadProducts(res?.data?.data?.lead_products);
        setLead(res?.data?.data);
        const currentCost = Number(
          lead?.visa_debit_cc + lead?.mastercard_debit_cc
        );
        const psCost = Number(lead?.visa_debit_pc + lead?.mastercard_debit_pc);
        setCurrentCostTotal(currentCost);
        setPsCostTotal(psCost);
        setIsLoading(false);
      })
      .catch((err) => {
        const message = JSON.parse(err.request?.response)?.message;
        if (
          message === "Invalid token." ||
          JSON.parse(err.request.response).code === 401
        ) {
          showToast("success", "Invalid Token");
          navigate(`/login`);
        }
        console.log(err);
      });
  };
 
  const IndustryList = useSelector((state) => state.leadInfo.IndustryList);
  useEffect(() => {
    getNewPreview(`${process.env.REACT_APP_BASE_URL}api/v1/lead/lead/${id}`);
    dispatch(GetIndustryList());
    dispatch(LeadUpdatedData(id));
  }, []);
  // console.log(leadsProduct, "leadsp");
 
  const cardTerminal = leadsProduct.filter(
    (data) => data?.product_type == "card_terminal"
  );

  const eposTerminal = leadsProduct?.filter(
    (quote) => quote?.product_type === "epos"
  );
  const ecomTerminal = leadsProduct?.filter(
    (quote) =>
      quote?.product_type === "ecom" ||
      quote?.product_type === "VT" ||
      quote?.product_type === "pay_by_link" ||
      quote?.product_type === "ecom_VT"
  );

  let sum1 = 0;
  let sum2 = 0;

  for (const key in lead) {
    if (key.endsWith("_cc")) {
      sum1 += parseFloat(lead[key]);
    }
  }
  for (const key in lead) {
    if (key.endsWith("_pc")) {
      sum2 += parseFloat(lead[key]);
    }
  }

  if (isLoading) {
    return (
      <>
        <Loader />
      </>
    );
  }
  const getPdName = (product) => {
    const filter = allProductList?.filter((data) => data?.id === product);
    return filter[0]?.name;
  };
  const getPdConnectionType = (product) => {
    const filter = allProductList?.filter((data) => data?.id === product);
    return filter[0]?.connection_type[0]?.name;
  };
  // -----------------edit lead preview tanni--------------

  const toggleLead = () => setLeadType(!leadType);
  return (
    <>
      {location.pathname.includes("qualified-leads-preview") === false && (
        <div className="mb-5">
          {/* <LeadsPreview /> */}
          {leadType ? (
            <LeadInfoPreview toggleLead={toggleLead} />
          ) : (
            <EditLeadPreview toggleLead={toggleLead} />
          )}
        </div>
      )}

      {/* new desgin */}
      <div
        style={{ marginTop: "40px", marginBottom: "40px" }}
        className="buisness-detail customar-detail w-100 "
      >
        <div className="customar-detail-head w-100 fees-box">
          <div className="head-first">
            <img src={detailIcon} alt="" />
            <h4 style={{ color: "white" }}>Leads Preview</h4>
          </div>
        </div>

        <div style={{ backgroundColor: "#f5f5f5" }}>
          <div className="pt-4 px-4">
            <h5
              style={{
                fontWeight: "bold",
              }}
            >
              Lead Information
            </h5>
          </div>
          <div className="detail-content" style={{ marginTop: "-30px" }}>
            <div>
              <p>
                Lead Source <span className="required">*</span>
              </p>
              <span>{lead?.lead_source_name}</span>
            </div>

            <div>
              <p>
                Lead Quality<span className="required">*</span>
              </p>
              {/* <span>{legalType[lead?.legal_type]}</span> */}
              <span>
                {lead.lead_type === 0
                  ? "Hot"
                  : lead.lead_type === 1
                  ? " Cold"
                  : "Warm"}
              </span>
            </div>

            <div>
              <p>Sales Partner</p>
              <span>{lead?.sales_partner_name}</span>
            </div>
            <div>
              <p> Partner Manager</p>
              <span>{lead?.partner_manager_name}</span>
            </div>
            {/* <div>
              <p>Callback Date</p>
              <span>
                {!lead?.callback_date
                  ? ""
                  : onBoarddateFormat(lead?.callback_date)}
              </span>
            </div> */}
            <div>
              <p>Lead Owner</p>
              <span>{lead?.lead_owner_name}</span>
            </div>
            <div>
              <p>Callback Date</p>
              <span>
                {!lead?.callback_date ? "" : getTimeFormat(lead?.callback_date)}
                {/* : onBoarddateFormat(lead?.callback_date)} */}
              </span>
            </div>
            <div>
              <p>Appointment Date</p>
              <span>
                {!lead?.appointment_date
                  ? ""
                  : getTimeFormat(lead?.appointment_date)}
                {/* : onBoarddateFormat(lead?.appointment_date)} */}
              </span>
            </div>
            <div>
              <p>Lead Stage</p>
              <span>{lead?.lead_stage_name}</span>
            </div>

            <div>
              <p>Lead Status</p>
              <span>{lead?.lead_status_name}</span>
            </div>
            <div>
              <p>Lead Note</p>
              <span>{lead?.note}</span>
            </div>
            <div>
              <p>Created On</p>
              <span>
                {!lead?.created_at ? "" : onBoarddateFormat(lead?.created_at)}
              </span>
            </div>
            <div>
              <p>Modified On</p>
              <span>
                {!lead?.updated_at ? "" : onBoarddateFormat(lead?.updated_at)}
              </span>
            </div>
          </div>

          
          <hr />
        </div>
        <div style={{ backgroundColor: "#f5f5f5" }}>
          <div className="p-4">
            <h5
              style={{
                fontWeight: "bold",
              }}
            >
              Contact Information
            </h5>
          </div>
          <div className="detail-content" style={{ marginTop: "-30px" }}>
            <div>
              <p>
                First Name <span className="required">*</span>
              </p>
              <span>{lead?.first_name}</span>
            </div>

            <div>
              <p>
                Last Name <span className="required">*</span>
              </p>
              <span>{lead?.last_name}</span>
            </div>

            <div>
              <p>Date of Birth</p>
              <span>{lead?.dob}</span>
            </div>

            <div>
              <p>
                Primary Email <span className="required">*</span>
              </p>
              <span>{lead?.email}</span>
            </div>

            <div>
              <p>Secondary Email</p>
              <span>{lead?.secondary_email}</span>
            </div>

            <div>
              <p>
                Mobile Number <span className="required">*</span>
              </p>
              <span>{lead?.mobile}</span>
            </div>
            <div>
              <p>Telephone Number</p>
              <span>{lead?.telephone}</span>
            </div>
          </div>
          <div style={{ backgroundColor: "#f5f5f5" }}>
            <div className="px-4">
              <p
                style={{
                  fontWeight: "bold",
                }}
              >
                Home Address Information
              </p>
            </div>
            <div className="detail-content" style={{ marginTop: "-30px" }}>
              <div>
                <p>
                  Post Code <span className="required">*</span>
                </p>
                <span>{lead?.home_postcode}</span>
              </div>

              <div>
                <p>
                  Address 1 <span className="required">*</span>
                </p>
                <span>{lead?.home_address1}</span>
              </div>

              <div>
                <p>Address 2</p>
                <span>{lead?.home_address2}</span>
              </div>

              <div>
                <p>
                  City/Town <span className="required">*</span>
                </p>
                <span>{lead?.home_city}</span>
              </div>

              <div>
                <p>County</p>
                <span>{lead?.home_county}</span>
              </div>

              <div>
                <p>Country</p>
                <span>{lead?.home_country_name}</span>
              </div>
            </div>
          </div>
          <hr />
        </div>
        <hr />
        <div style={{ backgroundColor: "#f5f5f5" }}>
          <div className="p-4">
            <h5
              style={{
                fontWeight: "bold",
              }}
            >
              Business Information
            </h5>
          </div>
          <div className="detail-content" style={{ marginTop: "-30px" }}>
            <div>
              <p>
                Legal Type <span className="required">*</span>
              </p>
              <span>{legalType[lead?.legal_type]}</span>
            </div>

            <div>
              <p>
                Legal Name <span className="required">*</span>
              </p>
              <span>{lead?.legal_name}</span>
            </div>

            <div>
              <p>
                Trading Name <span className="required">*</span>
              </p>
              <span>{lead?.trading_name}</span>
            </div>

            <div>
              <p>MCC Code</p>
              {IndustryList?.map((option) => {
                return (
                  <>
                    {parseInt(option.ptsave_industrytypeid) ===
                      parseInt(lead?.industry_type) && (
                      <span
                        key={option.ptsave_industrytypeid}
                        value={option.ptsave_industrytypeid}
                      >
                        {option?.ptsave_code}
                      </span>
                    )}
                  </>
                );
              })}
              {/* <span>{lead?.mcc_code}</span> */}
            </div>

            <div>
              <p>Company House No</p>
              <span>{lead?.company_house_no}</span>
            </div>

            <div>
              <p>Website</p>
              <span>{lead?.website}</span>
            </div>

            <div>
              <p>Industry Type</p>
              <span>{lead?.industry_type_name}</span>
            </div>
          </div>
        </div>
        <div
          className="detail-content"
          style={{
            paddingTop: "0",
            backgroundColor: "#f5f5f5",
            gridTemplateColumns: " repeat(2, 1fr)",
          }}
        >
          <div style={{ backgroundColor: "#f5f5f5" }}>
            <div className="mb-3">
              <p
                style={{
                  fontWeight: "bold",
                }}
              >
                Legal Address Information
              </p>
            </div>
            <div
              className="detail-content"
              style={{
                marginTop: "-30px",
                paddingLeft: "0",
                gridTemplateColumns: " repeat(2, 1fr)",
              }}
            >
              <div className="d-flex gap-3 align-items-center mb-2">
                <p>
                  Post Code : <span className="required">*</span>
                </p>
                <span>{lead?.legal_postcode}</span>
              </div>

              <div className="d-flex gap-3 align-items-center mb-2">
                <p>
                  Address 1 : <span className="required">*</span>
                </p>
                <span>{lead?.legal_address1}</span>
              </div>

              <div className="d-flex gap-4 align-items-center mb-2">
                <p>Address 2 : </p>
                <span> {lead?.legal_address2}</span>
              </div>

              <div className="d-flex gap-3 align-items-center mb-2">
                <p>
                  City/Town :<span className="required">*</span>
                </p>
                <span>{lead?.legal_city}</span>
              </div>

              <div className="d-flex gap-4 align-items-center mb-2">
                <p>County : </p>
                <span>{lead?.legal_county}</span>
              </div>

              <div className="d-flex gap-3 align-items-center mb-2">
                <p>
                  Country : <span className="required">*</span>
                </p>
                <span>{lead?.legal_country_name}</span>
              </div>
            </div>
          </div>
          <div style={{ backgroundColor: "#f5f5f5" }}>
            <div className="mb-3">
              <p
                style={{
                  fontWeight: "bold",
                }}
              >
                Trading Address Information
              </p>
            </div>
            <div
              className="detail-content"
              style={{
                marginTop: "-30px",
                paddingLeft: "0",
                gridTemplateColumns: " repeat(2, 1fr)",
              }}
            >
              <div className="d-flex gap-3 align-items-center mb-2">
                <p>
                  Post Code :<span className="required">*</span>
                </p>
                <span>{lead?.trading_postcode}</span>
              </div>

              <div className="d-flex gap-3 align-items-center mb-2">
                <p>
                  Address 1 :<span className="required">*</span>
                </p>
                <span>{lead?.trading_address1}</span>
              </div>

              <div className="d-flex gap-4 align-items-center mb-2">
                <p>Address 2 :</p>
                <span>{lead?.trading_address2}</span>
              </div>

              <div className="d-flex gap-3 align-items-center mb-2">
                <p>
                  City/Town : <span className="required">*</span>
                </p>
                <span>{lead?.trading_city}</span>
              </div>

              <div className="d-flex gap-4 align-items-center mb-2">
                <p>County :</p>
                <span>{lead?.trading_county}</span>
              </div>

              <div className="d-flex gap-3 align-items-center mb-2">
                <p>
                  Country : <span className="required">*</span>
                </p>
                <span>{lead?.trading_country_name}</span>
              </div>
            </div>
          </div>
        </div>

        <hr />
        <div style={{ backgroundColor: "#f5f5f5" }}>
          <div className="p-4">
            <h5
              style={{
                fontWeight: "bold",
              }}
            >
              Business Profile
            </h5>
          </div>
          
        </div>
        {/* <hr /> */}
        <div style={{ backgroundColor: "#f5f5f5" }}>
          
          <div className="detail-content" style={{ marginTop: "-30px" }}>
            <div>
              <p>Card Machine</p>
              <span>{lead?.card_machine_service ? "True" : "False"}</span>
            </div>

            <div>
              <p>Ecom Service</p>
              <span>{lead?.ecom_service ? "True" : "False"}</span>
            </div>

            <div>
              <p>Epos Service</p>
              <span>{lead?.epos_service ? "True" : "False"}</span>
            </div>
          </div>
        </div>
        

        {/* ==============terminal Product=========== */}
        <div style={{ backgroundColor: "#f5f5f5" }}>
          <div className="px-4">
            <p
              style={{
                // borderBottom: "0.4px solid #979797",

                fontWeight: "bold",
              }}
            >
              Card Terminal
            </p>
          </div>
          <div className="mx-0 mx-md-3">
            <div className="table-container mt-2">
              <table className="table table-striped table-hover table-bordered">
                <thead style={{ color: "black" }}>
                  <tr className="height">
                   
                    {/* app type className="d-flex justify-content-between align-content-center" */}
                    <th>
                      <div>
                        <p>Product Name</p>
                        {/* <img style={{ marginTop: '-15px', cursor: 'pointer' }} src={arrow} alt="" /> */}
                      </div>
                    </th>
                    {/* legal name */}
                    <th>
                      <div className="d-flex justify-content-center">
                        <p>Connection Type</p>
                      </div>
                    </th>
                    <th>
                      <div className="d-flex justify-content-center">
                        <p>Terminal Option</p>
                      </div>
                    </th>
                    <th>
                      <div className="d-flex justify-content-center">
                        <p className="ms-4">Contract Length</p>
                      </div>
                    </th>
                    <th>
                      <div className="d-flex justify-content-center">
                        <p>Monthly Rental</p>
                      </div>
                    </th>
                    <th>
                      <div className="d-flex justify-content-center">
                        <p>Terminal Type</p>
                      </div>
                    </th>
                    {/* account status */}
                  </tr>
                </thead>
                <tbody>
                  {cardTerminal?.length === 0 ? (
                    <>
                      <tr>
                        <td colSpan="11">
                          <div className="not_found">
                            <h4 className="my-4">No Data Found</h4>
                          </div>
                        </td>
                      </tr>
                    </>
                  ) : (
                    <>
                      {cardTerminal?.map((data) => (
                        <>
                          <tr>
                            {/* <td>{data?.id}</td> */}
                            <td>{getPdName(data?.product)}</td>
                            <td>{getPdConnectionType(data?.product)}</td>
                            {/* <td>{data?.connection_type_name}</td> */}

                            <td>
                              {data?.terminal_option === "FT"
                                ? "Free Terminal"
                                : data?.terminal_option === "MR"
                                ? "Monthly Rental"
                                : data?.terminal_option === "ET"
                                ? "Elavon Terminal"
                                : "Outright"}
                            </td>
                            <td>{data?.product_term}</td>
                            <td>{data?.price}</td>
                            <td>{data?.integration_availability}</td>
                          </tr>
                        </>
                      ))}
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div style={{ backgroundColor: "#f5f5f5" }}>
          <div className="px-4">
            <p
              style={{
                // borderBottom: "0.4px solid #979797",

                fontWeight: "bold",
              }}
            >
              E-Commerce / Virtual terminal
            </p>
          </div>
          <div className="mx-0 mx-md-3">
            <div className="table-container mt-2">
              <table className="table table-striped table-hover table-bordered">
                <thead style={{ color: "black" }}>
                  <tr className="height">
                    <th style={{ minWidth: "140px" }}>
                      <div className="d-flex px-2 justify-content-center">
                        <p style={{ textAlign: "end" }}>Getway Provider</p>
                      </div>
                    </th>
                    <th style={{ minWidth: "140px" }}>
                      <div className="d-flex px-2 justify-content-center">
                        <p style={{ textAlign: "end" }}>Service Type</p>
                      </div>
                    </th>
                    {/* app type className="d-flex justify-content-between align-content-center" */}
                    <th>
                      <div className="d-flex px-2 justify-content-center">
                        <p>WebSite URL</p>
                        {/* <img style={{ marginTop: '-15px', cursor: 'pointer' }} src={arrow} alt="" /> */}
                      </div>
                    </th>
                    {/* legal name */}
                    <th>
                      <div className="d-flex justify-content-center">
                        <p>Getway Fee</p>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {ecomTerminal?.length === 0 ? (
                    <>
                      <tr>
                        <td colSpan="11">
                          <div className="not_found">
                            <h4 className="my-4">No Data Found</h4>
                          </div>
                        </td>
                      </tr>
                    </>
                  ) : (
                    <>
                      {ecomTerminal?.map((data) => (
                        <>
                          <tr>
                            <td>
                              {data?.getway_provider === 0
                                ? "Cardstream"
                                : data?.getway_provider === 1 && "Opayo"}
                            </td>
                            <td>
                              {data?.product_type === "VT"
                                ? "Virtual terminal"
                                : data?.product_type === "ecom"
                                ? " E-Commerce"
                                : data?.product_type === "ecom_VT"
                                ? "E-Commerce & Virtual terminal"
                                : "Pay By Link"}
                            </td>
                            <td>
                              {data?.website_url ? data?.website_url : ""}
                            </td>
                            <td>{data?.getway_fee}</td>
                          </tr>
                        </>
                      ))}
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div style={{ backgroundColor: "#f5f5f5" }}>
          <div className="px-4">
            <p
              style={{
                // borderBottom: "0.4px solid #979797",

                fontWeight: "bold",
              }}
            >
              E-POS / Online Ordering / Website
            </p>
          </div>
          <div className="mx-0 mx-md-3">
            <div className="table-container mt-2">
              <table className="table table-striped table-hover table-bordered">
                <thead style={{ color: "black" }}>
                  <tr className="height">
                    <th style={{ minWidth: "140px" }}>
                      <div className="d-flex px-2 justify-content-center">
                        <p>Service provider</p>
                      </div>
                    </th>
                    <th style={{ minWidth: "140px" }}>
                      <div className="d-flex px-2 justify-content-center">
                        <p style={{ textAlign: "end" }}>Service Option</p>
                      </div>
                    </th>
                    {/* app type className="d-flex justify-content-between align-content-center" */}
                    <th>
                      <div className="d-flex px-2 justify-content-center">
                        <p>one of Cost</p>
                        {/* <img style={{ marginTop: '-15px', cursor: 'pointer' }} src={arrow} alt="" /> */}
                      </div>
                    </th>
                    {/* trading name */}
                    <th>
                      <div className="d-flex px-2 justify-content-center">
                        <p className="ms-4">Monthly Rental</p>
                      </div>
                    </th>
                    {/* mMID status */}
                    <th>
                      <div className="d-flex px-2 justify-content-center">
                        <p>Contract length</p>
                      </div>
                    </th>
                    {/* account status */}
                    <th>
                      <div className="d-flex px-2 justify-content-center">
                        <p>Service Type</p>
                      </div>
                    </th>
                    <th>
                      <div className="d-flex px-2 justify-content-center">
                        <p>Integrated With </p>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {eposTerminal?.length === 0 ? (
                    <>
                      <tr>
                        <td colSpan="11">
                          <div className="not_found">
                            <h4 className="my-4">No Data Found</h4>
                          </div>
                        </td>
                      </tr>
                    </>
                  ) : (
                    <>
                      {eposTerminal?.map((data) => (
                        <>
                          <tr>
                            <td>{data?.epos_provider}</td>
                            <td>{data?.service_option}</td>
                            <td>{data?.one_of_cost}</td>
                            <td>{data?.price}</td>
                            <td>{data?.product_term}</td>
                            <td>{data?.epos_option}</td>
                            <td>{data?.integrated_with}</td>
                          </tr>
                        </>
                      ))}
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* ==============terminal Product=========== */}

        <div style={{ backgroundColor: "#f5f5f5" }}>
          <div className="px-4">
            <p
              style={{
                fontWeight: "bold",
              }}
            >
              Schedule of Fees
            </p>
          </div>
          <div className="p-4" style={{ marginTop: "-30px" }}>
            <div className="row mt-4">
              <div className="col-md-12">
                {/* <!-- <h2><img src="../../assets/img/list-document-interface-symbol.svg" alt="" width="25px" /> Table</h2> --> */}
                <div className="table-responsive">
                  <table className="table table-striped number-center ">
                    <thead>
                      <tr>
                        <th className="col-1">Card Type</th>
                        <th className="col-1">Current Rate</th>
                        <th className="col-1">Paymentsave Rate</th>
                        <th className="col-1" style={{ minWidth: "100px" }}>
                          Monthly Turnover
                        </th>
                        <th className="col-1">Number of Transactions</th>
                        <th className="col-1">Current Cost</th>
                        <th className="col-1">Paymentsave Cost</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style={{ fontWeight: "600" }}>
                          {" "}
                          VISA Debit (Personal)
                        </td>
                        <td>
                          <input
                            readOnly
                            type="number"
                            className="form-control"
                            placeholder={`% ${lead?.visa_debit_cr}`}
                          />
                        </td>
                        <td>
                          <input
                            readOnly
                            type="number"
                            placeholder={`% ${lead?.visa_debit_pr}`}
                            className="form-control"
                          />
                        </td>
                        <td>
                          <input
                            readOnly
                            type="number"
                            className="form-control"
                            //   placeholder="£"
                            placeholder={`£ ${lead?.visa_debit_ts}`}
                          />
                        </td>
                        <td>
                          <input
                            disabled
                            readOnly
                            placeholder={`${
                              lead?.visa_debit_tr_no === 0
                                ? ""
                                : lead?.visa_debit_tr_no
                            }`}
                            type="number"
                            className="form-control"
                          />
                        </td>
                        <td>
                          <input
                            readOnly
                            placeholder={`£ ${lead?.visa_debit_cc}`}
                            type="text"
                            className="form-control"
                          />
                        </td>
                        <td>
                          <input
                            readOnly
                            type="text"
                            className="form-control"
                            placeholder={`£ ${lead?.visa_debit_pc}`}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td style={{ fontWeight: "600" }}>Mastercard Debit</td>
                        <td>
                          <input
                            readOnly
                            type="number"
                            className="form-control"
                            //   placeholder=""
                            placeholder={`% ${lead?.mastercard_debit_cr}`}
                          />
                        </td>
                        <td>
                          <input
                            readOnly
                            placeholder={`% ${lead?.mastercard_debit_pr}`}
                            type="number"
                            className="form-control"
                          />
                        </td>
                        <td>
                          <input
                            readOnly
                            type="number"
                            className="form-control"
                            //   placeholder=""
                            placeholder={
                              `£ ${lead?.mastercard_debit_ts}`
                            }
                          />
                        </td>
                        <td>
                          <input
                            readOnly
                            placeholder={`${
                              lead?.mastercard_debit_tr_no === 0
                                ? ""
                                : lead?.mastercard_debit_tr_no
                            }`}
                            disabled
                            type="number"
                            className="form-control"
                          />
                        </td>
                        <td>
                          <input
                            readOnly
                            type="text"
                            className="form-control"
                            placeholder={`£ ${lead?.mastercard_debit_cc}`}
                          />
                        </td>
                        <td>
                          <input
                            readOnly
                            type="text"
                            className="form-control"
                            placeholder={`£ ${lead?.mastercard_debit_pc}`}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td style={{ fontWeight: "600" }}>
                          VISA Credit (Personal)
                        </td>
                        <td>
                          <input
                            readOnly
                            type="number"
                            className="form-control"
                            //   placeholder="%"
                            placeholder={`% ${lead?.visa_credit_cr}`}
                          />
                        </td>
                       
                        <td>
                          <input
                            readOnly
                            placeholder={`% ${lead?.visa_credit_pr}`}
                            type="number"
                            className="form-control"
                          />
                        </td>
                        <td>
                          <input
                            readOnly
                            type="number"
                            className="form-control"
                            placeholder={
                             `£ ${lead?.visa_credit_ts}`
                            }
                          />
                        </td>
                        <td>
                          <input
                            readOnly
                            placeholder={`${
                              lead?.visa_credit_tr_no === 0
                                ? ""
                                : lead?.visa_credit_tr_no
                            }`}
                            disabled
                            type="number"
                            className="form-control"
                          />
                        </td>
                        <td>
                          <input
                            readOnly
                            type="text"
                            className="form-control"
                            placeholder={`£ ${lead?.visa_credit_cc}`}
                          />
                        </td>
                        <td>
                          <input
                            readOnly
                            type="text"
                            className="form-control"
                            placeholder={`£ ${lead?.visa_credit_pc}`}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td style={{ fontWeight: "600" }}>Mastercard Credit</td>
                        <td>
                          <input
                            readOnly
                            type="number"
                            className="form-control"
                            //   placeholder="%"
                            placeholder={`% ${lead?.mastercard_credit_cr}`}
                          />
                        </td>
                        <td>
                          <input
                            readOnly
                            placeholder={`% ${lead?.mastercard_credit_pr}`}
                            type="number"
                            className="form-control"
                          />
                        </td>
                        <td>
                          <input
                            readOnly
                            type="number"
                            className="form-control"
                            //   placeholder="£"
                            placeholder={
                               `£ ${lead?.mastercard_credit_ts}`
                            }
                          />
                        </td>
                        <td>
                          <input
                            readOnly
                            placeholder={`${
                              lead?.mastercard_credit_tr_no === 0
                                ? ""
                                : lead?.mastercard_credit_tr_no
                            }`}
                            disabled
                            type="number"
                            className="form-control"
                          />
                        </td>
                        <td>
                          <input
                            readOnly
                            type="text"
                            className="form-control"
                            placeholder={`£ ${lead?.mastercard_credit_cc}`}
                          />
                        </td>
                        <td>
                          <input
                            readOnly
                            type="text"
                            className="form-control"
                            placeholder={`£ ${lead?.mastercard_credit_pc}`}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td style={{ fontWeight: "600" }}>
                          Visa Business Debit
                        </td>
                        <td>
                          <input
                            readOnly
                            type="number"
                            className="form-control"
                            //   placeholder="%"
                            placeholder={`% ${lead?.visa_business_debit_cr}`}
                          />
                        </td>
                        <td>
                          <input
                            readOnly
                            type="number"
                            className="form-control"
                            placeholder={`% ${lead?.visa_business_debit_pr}`}
                          />
                        </td>
                        <td>
                          <input
                            readOnly
                            type="number"
                            className="form-control"
                            //   placeholder="£"
                            placeholder={
                              `£ ${lead?.visa_business_debit_ts}`
                            }
                          />
                        </td>
                        <td>
                          <input
                            readOnly
                            placeholder={`${
                              lead?.visa_business_debit_tr_no === 0
                                ? ""
                                : lead?.visa_business_debit_tr_no
                            }`}
                            disabled
                            type="number"
                            className="form-control"
                          />
                        </td>
                        <td>
                          <input
                            readOnly
                            type="text"
                            className="form-control"
                            placeholder={`£ ${lead?.visa_business_debit_cc}`}
                          />
                        </td>
                        <td>
                          <input
                            readOnly
                            type="text"
                            className="form-control"
                            placeholder={`£ ${lead?.visa_business_debit_pc}`}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td style={{ fontWeight: "600" }}>
                          Visa Business Credit
                        </td>
                        <td>
                          <input
                            readOnly
                            type="number"
                            className="form-control"
                            //   placeholder="%"
                            placeholder={`% ${lead?.visa_business_credit_cr}`}
                          />
                        </td>
                        <td>
                          <input
                            readOnly
                            placeholder={`% ${lead?.visa_business_credit_pr}`}
                            type="number"
                            className="form-control"
                          />
                        </td>
                        <td>
                          <input
                            readOnly
                            type="number"
                            className="form-control"
                            placeholder={
                             `£ ${lead?.visa_business_credit_ts}`
                            }
                          />
                        </td>
                        <td>
                          <input
                            readOnly
                            placeholder={`${
                              lead?.visa_business_credit_tr_no === 0
                                ? ""
                                : lead?.visa_business_credit_tr_no
                            }`}
                            disabled
                            type="number"
                            className="form-control"
                          />
                        </td>
                        <td>
                          <input
                            readOnly
                            type="text"
                            className="form-control"
                            placeholder={`£ ${lead?.visa_business_credit_cc}`}
                          />
                        </td>
                        <td>
                          <input
                            readOnly
                            type="text"
                            className="form-control"
                            placeholder={`£ ${lead?.visa_business_credit_pc}`}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td style={{ fontWeight: "600" }}>
                          Mastercard Business
                        </td>
                        <td>
                          <input
                            readOnly
                            type="number"
                            className="form-control"
                            //   placeholder="%"
                            placeholder={`% ${lead?.mastercard_business_cr}`}
                          />
                        </td>
                        <td>
                          <input
                            readOnly
                            type="number"
                            className="form-control"
                            placeholder={`% ${lead?.mastercard_business_pr}`}
                          />
                        </td>
                        <td>
                          <input
                            readOnly
                            type="number"
                            className="form-control"
                            //   placeholder="£"
                            placeholder={
                               `£ ${lead?.mastercard_business_ts}`
                            }
                          />
                        </td>
                        <td>
                          <input
                            readOnly
                            placeholder={`${
                              lead?.mastercard_business_tr_no === 0
                                ? ""
                                : lead?.mastercard_business_tr_no
                            }`}
                            disabled
                            type="number"
                            className="form-control"
                          />
                        </td>
                        <td>
                          <input
                            readOnly
                            type="text"
                            className="form-control"
                            placeholder={`£ ${lead?.mastercard_business_cc}`}
                          />
                        </td>
                        <td>
                          <input
                            readOnly
                            type="text"
                            className="form-control"
                            placeholder={`£ ${lead?.mastercard_business_pc}`}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td style={{ fontWeight: "600" }}>
                          Mastercard Corporate
                        </td>
                        <td>
                          <input
                            readOnly
                            type="number"
                            className="form-control"
                            placeholder={`% ${lead?.mastercard_corporate_cr}`}
                          />
                        </td>
                        <td>
                          <input
                            readOnly
                            type="number"
                            className="form-control"
                            placeholder={`% ${lead?.mastercard_corporate_pr}`}
                          />
                        </td>
                        <td>
                          <input
                            readOnly
                            type="number"
                            className="form-control"
                            //   placeholder=""
                            placeholder={
                              `£ ${lead?.mastercard_corporate_ts}`
                            }
                          />
                        </td>
                        <td>
                          <input
                            readOnly
                            placeholder={`${
                              lead?.mastercard_corporate_tr_no === 0
                                ? ""
                                : lead?.mastercard_corporate_tr_no
                            }`}
                            disabled
                            type="number"
                            className="form-control"
                          />
                        </td>
                        <td>
                          <input
                            readOnly
                            type="text"
                            className="form-control"
                            placeholder={`£ ${lead?.mastercard_corporate_cc}`}
                          />
                        </td>
                        <td>
                          <input
                            readOnly
                            type="text"
                            className="form-control"
                            placeholder={`£ ${lead?.mastercard_corporate_pc}`}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td style={{ fontWeight: "600" }}>All Non-EEA Visa</td>
                        <td>
                          <input
                            readOnly
                            type="number"
                            className="form-control"
                            placeholder={`% ${lead?.mastercard_corporate_cr}`}
                          />
                        </td>
                        <td>
                          <input
                            readOnly
                            type="number"
                            className="form-control"
                            placeholder={`% ${lead?.mastercard_corporate_pr}`}
                          />
                        </td>
                        <td>
                          <input
                            readOnly
                            type="number"
                            className="form-control"
                            //   placeholder=""
                            placeholder={
                              `£ ${lead?.mastercard_corporate_ts}`
                            }
                          />
                        </td>
                        <td>
                          <input
                            readOnly
                            placeholder={`${
                              lead?.mastercard_corporate_tr_no === 0
                                ? ""
                                : lead?.mastercard_corporate_tr_no
                            }`}
                            disabled
                            type="number"
                            className="form-control"
                          />
                        </td>
                        <td>
                          <input
                            readOnly
                            type="text"
                            className="form-control"
                            placeholder={`£ ${lead?.mastercard_corporate_cc}`}
                          />
                        </td>
                        <td>
                          <input
                            readOnly
                            type="text"
                            className="form-control"
                            placeholder={`£ ${lead?.mastercard_corporate_pc}`}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td style={{ fontWeight: "600" }}>
                          All Non-EEA Mastercard
                        </td>
                        <td>
                          <input
                            readOnly
                            type="number"
                            className="form-control"
                            placeholder={`% ${lead?.mastercard_corporate_cr}`}
                          />
                        </td>
                        <td>
                          <input
                            readOnly
                            type="number"
                            className="form-control"
                            placeholder={`% ${lead?.mastercard_corporate_pr}`}
                          />
                        </td>
                        <td>
                          <input
                            readOnly
                            type="number"
                            className="form-control"
                            //   placeholder=""
                            placeholder={
                              `£ ${lead?.mastercard_corporate_ts}`
                            }
                          />
                        </td>
                        <td>
                          <input
                            readOnly
                            placeholder={`${
                              lead?.mastercard_corporate_tr_no === 0
                                ? ""
                                : lead?.mastercard_corporate_tr_no
                            }`}
                            disabled
                            type="number"
                            className="form-control"
                          />
                        </td>
                        <td>
                          <input
                            readOnly
                            type="text"
                            className="form-control"
                            placeholder={`£ ${lead?.mastercard_corporate_cc}`}
                          />
                        </td>
                        <td>
                          <input
                            readOnly
                            type="text"
                            className="form-control"
                            placeholder={`£ ${lead?.mastercard_corporate_pc}`}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td style={{ fontWeight: "600" }}>AMEX</td>
                        <td>
                          <input
                            readOnly
                            type="number"
                            className="form-control"
                            placeholder={`% ${lead?.amex_cr}`}
                          />
                        </td>
                        <td>
                          <input
                            readOnly
                            type="number"
                            className="form-control"
                            placeholder={`% ${lead?.amex_sr}`}
                          />
                        </td>
                        <td>
                          <input
                            readOnly
                            type="number"
                            className="form-control"
                            //   placeholder=""
                            placeholder={
                             `£ ${lead?.amex_ts}`
                            }
                          />
                        </td>
                        <td>
                          <input
                            readOnly
                            placeholder={`${
                              lead?.amex_tr_no === 0 ? "" : lead?.amex_tr_no
                            }`}
                            disabled
                            type="number"
                            className="form-control"
                          />
                        </td>
                        <td>
                          <input
                            readOnly
                            type="text"
                            className="form-control"
                            placeholder={`£ ${lead?.amex_cc}`}
                          />
                        </td>
                        <td>
                          <input
                            readOnly
                            type="text"
                            className="form-control"
                            placeholder={`£ ${lead?.amex_pc}`}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td style={{ fontWeight: "600" }}>
                          Authorisation Fees
                        </td>
                        <td>
                          <input
                            readOnly
                            type="number"
                            className="form-control"
                            placeholder={`£ ${lead?.authorization_fee_cr}`}
                          />
                        </td>
                        <td>
                          <input
                            readOnly
                            type="number"
                            className="form-control"
                            placeholder={`£ ${lead?.authorization_fee_pr}`}
                          />
                        </td>
                        <td>
                          <input
                            readOnly
                            placeholder={
                              `£ ${lead?.authorization_fee_ts}`
                            }
                            disabled
                            type="number"
                            className="form-control"
                          />
                        </td>
                        <td>
                          <input
                            readOnly
                            type="number"
                            className="form-control"
                            placeholder={`${
                              lead?.authorization_fee_tr_no === 0
                                ? ""
                                : lead?.authorization_fee_tr_no
                            }`}
                          />
                        </td>
                        <td>
                          <input
                            readOnly
                            type="text"
                            className="form-control"
                            placeholder={`£ ${lead?.authorization_fee_cc}`}
                          />
                        </td>
                        <td>
                          <input
                            readOnly
                            type="text"
                            className="form-control"
                            placeholder={`£ ${lead?.authorization_fee_pc}`}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td style={{ fontWeight: "600" }}>
                          Per Transaction Charge{" "}
                        </td>
                        {/* <!--                    <td style={{fontWeight:'600'}}>Transaction Rate </td>--> */}
                        <td>
                          <input
                            readOnly
                            type="number"
                            className="form-control"
                            placeholder={`£ ${lead?.per_transactional_charge_cr}`}
                          />
                        </td>
                        <td>
                          <input
                            readOnly
                            type="number"
                            className="form-control"
                            placeholder={`£ ${lead?.per_transactional_charge_pr}`}
                          />
                        </td>
                        <td>
                          <input
                            readOnly
                            placeholder={
                               `£ ${lead?.per_transactional_charge_ts}`
                            }
                            disabled
                            type="number"
                            className="form-control"
                          />
                        </td>
                        <td>
                          <input
                            readOnly
                            type="number"
                            className="form-control"
                            placeholder={`${
                              lead?.per_transactional_charge_tr_no === 0
                                ? ""
                                : lead?.per_transactional_charge_tr_no
                            }`}
                          />
                        </td>
                        <td>
                          <input
                            readOnly
                            type="text"
                            className="form-control"
                            placeholder={`£ ${lead?.per_transactional_charge_cc}`}
                          />
                        </td>
                        <td>
                          <input
                            readOnly
                            type="text"
                            className="form-control"
                            placeholder={`£ ${lead?.per_transactional_charge_pc}`}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td style={{ fontWeight: "600" }}>Portal Reporting </td>
                        <td>
                          <input
                            readOnly
                            type="number"
                            className="form-control"
                            // placeholder={`Per Month ${lead?.portal_reporting_fee_cr}`}
                            placeholder={`£ ${lead?.portal_reporting_fee_cr}`}
                          />
                        </td>
                        <td>
                          <input
                            readOnly
                            type="number"
                            className="form-control"
                            placeholder={`£ ${lead?.portal_reporting_fee_pr}`}
                          />
                        </td>
                        <td>
                          <input
                            readOnly
                            placeholder={`£ ${
                               lead?.portal_reporting_fee_ts
                            }`}
                            disabled
                            type="number"
                            className="form-control"
                          />
                        </td>
                        <td>
                          <input
                            readOnly
                            disabled
                            type="number"
                            className="form-control"
                            placeholder="Per Month"
                          />
                        </td>
                        <td>
                          <input
                            readOnly
                            type="text"
                            className="form-control"
                            placeholder={`£ ${lead?.portal_reporting_fee_cc}`}
                          />
                        </td>
                        <td>
                          <input
                            readOnly
                            type="text"
                            className="form-control"
                            placeholder={`£ ${lead?.portal_reporting_fee_pc}`}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td style={{ fontWeight: "600" }}>PCI DSS Fees </td>
                        <td>
                          <input
                            readOnly
                            type="number"
                            className="form-control"
                            placeholder={`£ ${lead?.pci_dss_fee_cr}`}
                          />
                        </td>
                        <td>
                          <input
                            readOnly
                            type="number"
                            className="form-control"
                            placeholder={`£ ${lead?.pci_dss_fee_pr}`}
                          />
                        </td>
                        <td>
                          <input
                            readOnly
                            placeholder={`£ ${
                              lead?.pci_dss_fee_ts
                            }`}
                            disabled
                            type="number"
                            className="form-control"
                          />
                        </td>
                        <td>
                          <input
                            readOnly
                            disabled
                            type="number"
                            className="form-control"
                            placeholder="Per Month"
                          />
                        </td>
                        <td>
                          <input
                            readOnly
                            type="text"
                            className="form-control"
                            placeholder={`£ ${lead?.pci_dss_fee_cc}`}
                          />
                        </td>
                        <td>
                          <input
                            readOnly
                            type="text"
                            className="form-control"
                            placeholder={`£ ${lead?.pci_dss_fee_pc}`}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td
                          style={{ fontWeight: "600" }}
                          className="pt-lg-4 pt-0"
                        >
                          Terminal Rental{" "}
                        </td>
                        <td>
                          <div className="form-group mb-2">
                            <select
                              readOnly
                              disabled
                              style={{
                                color: "gray",
                                fontSize: "12px",
                                background: "white",
                              }}
                              className="form-control"
                              name="terminal_provider_pervious"
                              value={lead.terminal_provider_pervious}
                              id="exampleSelect"
                            >
                              <option>--</option>
                              {allProductList?.map((option) => (
                                <option
                                  key={option.id}
                                  value={option.id}
                                  // title="Select Terminal"
                                >
                                  {option.name}
                                </option>
                              ))}
                            </select>
                          </div>
                          <input
                            readOnly
                            type="number"
                            className="form-control"
                            placeholder={`£ ${lead?.terminal_rental_fee_cr}`}
                          />
                        </td>
                        <td>
                          <div className="form-group mb-2">
                            <select
                              style={{
                                color: "gray",
                                fontSize: "12px",
                                background: "white",
                              }}
                              disabled
                              className="form-control"
                              name="terminal_provider_current"
                              value={lead.terminal_provider_current}
                              readOnly
                              id="exampleSelect"
                              // style={{color:'#C1C5CD'}}
                            >
                              <option>--</option>
                              {allProductList?.map((option) => (
                                <option
                                  key={option.id}
                                  value={option.id}
                                  // title="Select Terminal"
                                >
                                  {option.name}
                                </option>
                              ))}
                            </select>
                          </div>
                          <input
                            readOnly
                            type="number"
                            className="form-control"
                            placeholder={`£ ${lead?.terminal_rental_fee_pr}`}
                          />
                        </td>
                        <td>
                          {/* defaultValue={lead?.num_of_terminals} */}
                          <div className="form-group">
                            <p className="mt-5"></p>
                            <input
                              readOnly
                              type="number"
                              className="form-control"
                              placeholder={lead?.num_of_terminals}
                            />
                          </div>
                        </td>
                        <td>
                          <p className="mt-5"></p>
                          <input
                            disabled
                            type="number"
                            className="form-control mt-5"
                            placeholder="Per Month"
                          />
                        </td>
                        <td>
                          <input
                            readOnly
                            type="text"
                            className="form-control mt-5"
                            placeholder={`£ ${lead?.terminal_rental_fee_cc}`}
                          />
                        </td>
                        <td>
                          <input
                            readOnly
                            type="text"
                            className="form-control mt-5"
                            placeholder={`£ ${lead?.terminal_rental_fee_pc}`}
                          />
                        </td>
                      </tr>
                      <tr
                        className="total"
                        style={{ background: "transparent" }}
                      >
                        <td colSpan="5" className="text-end font-weight-bold">
                          TOTAL
                        </td>
                        <td style={{ backgroundColor: "#e55353" }}>
                          <p
                            style={{
                              color: "#fff",
                              paddingLeft: "10px",
                              fontWeight: "600",
                              marginBottom: 0,
                            }}
                          >
                            £ {sum1.toFixed(3)}
                          </p>
                        </td>
                        <td style={{ backgroundColor: "#198754" }}>
                          <p
                            style={{
                              color: "#fff",
                              paddingLeft: "10px",
                              fontWeight: "600",
                              marginBottom: 0,
                            }}
                          >
                            £ {sum2.toFixed(3)}
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <button
            onClick={() => navigate("/leads")}
            className="btn btn-info text-white"
          >
            Back
          </button>
        </div>
      </div>
    </>
  );
}
