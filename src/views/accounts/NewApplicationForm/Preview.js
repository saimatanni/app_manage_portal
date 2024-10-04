import React, { useEffect, useState } from "react";

import "./AllNewApplication.css";

import { useNavigate } from "react-router-dom";
import Leads from "../NewApplication/NewAppPreview/Leads";
import BuisnessDetails from "../NewApplication/NewAppPreview/BuisnessDetails";
import CustomarDetails from "../NewApplication/NewAppPreview/CustomarDetails";
import BuisnessProfile from "../NewApplication/NewAppPreview/BuisnessProfile";
import FinancialProfile from "../NewApplication/NewAppPreview/FinancialProfile";
import SiteVisit from "../NewApplication/NewAppPreview/SiteVisit";
import Documents from "../NewApplication/NewAppPreview/Documents";
import LeadEdit from "./PreviewEdit/LeadEdit";
import EditBusinessDetail from "./PreviewEdit/EditBusinessDetail";
import EditCostomerDetail from "./PreviewEdit/EditCostomerDetail";
import EditBusinessProfile from "./PreviewEdit/EditBusinessProfile";
import EditFinancialInfo from "./PreviewEdit/EditFinancialInfo";
import EditSideVisit from "./PreviewEdit/EditSideVisit";
import EditDocuments from "./PreviewEdit/EditDocuments";
import { GetApplicationInput } from "../NewApplication/_redux/action/ApplicationAction";
import { useSelector, useDispatch } from "react-redux";

import ProductPreview from "../NewApplication/NewAppPreview/ProductPreview";
import EditProductPreview from "./PreviewEdit/EditProductPreview";
import { CircularProgress } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import SignAndConfirm from "../Leads/LeadsRetrieve/SignAndConfirm";
import EditSofPreview from "./PreviewEdit/EditSofPreview";

import Cookies from "js-cookie"; // Import js-cookie
import SofPreviewNew from "../NewApplication/NewAppPreview/SofPreviewNew";
export default function Preview() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const applicationInput = useSelector(
    (state) => state.applicationInfo.applicationInput
  );
  const priceQuoteInput = useSelector(
    (state) => state.quoteInfo.priceQuoteInput
  );
  const isLoadApplication = useSelector(
    (state) => state.quoteInfo.isLoadApplication
  );
  React.useEffect(() => {
    const is_ps_logged_in = Cookies.get("is_ps_logged_in") || "false";
    const is_ps_remember_me = Cookies.get("is_ps_remember_me") || "false";
    if (is_ps_logged_in === "false") {
      // history.push("/my_business");
      navigate("/login");
    }
  }, []);
  React.useEffect(() => {
    dispatch(
      GetApplicationInput("application_products", [
        ...(priceQuoteInput?.terminal_products ?? []),
        ...(priceQuoteInput?.ecommerce_products ?? []),
        ...(priceQuoteInput?.epos_products ?? []),
      ])
    );
  }, [
    priceQuoteInput?.terminal_products,
    priceQuoteInput?.ecommerce_products,
    priceQuoteInput?.epos_products,
  ]);
  const [lead, setLead] = useState(true);
  const [businessDetail, setBusinessDetail] = useState(true);
  const [customerDetail, setCustomerDetail] = useState(true);
  const [businessProfile, setBusinessProfile] = useState(true);
  const [financialInfo, setFinancialInfo] = useState(true);
  const [siteVisit, setSiteVisit] = useState(true);
  const [documents, setDocuments] = useState(true);
  const [products, setProducts] = useState(true);
  const [sof, setSof] = useState(true);

  const toggleBusinessDetail = () => setBusinessDetail(!businessDetail);
  const toggleCustomerDetail = () => setCustomerDetail(!customerDetail);
  const toggleBusinessProfile = () => setBusinessProfile(!businessProfile);
  const toggleFinancialInfo = () => setFinancialInfo(!financialInfo);
  const toggleSiteVisit = () => setSiteVisit(!siteVisit);
  const toggleDocuments = () => setDocuments(!documents);
  const toggleProducts = () => setProducts(!products);
  const toggleLead = () => setLead(!lead);
  const toggleSof = () => setSof(!sof);

  useEffect(() => {
    const handleScroll = () => {
      window.scrollTo(0, 0);
    };

    // Scroll to top when component mounts
    handleScroll();

    // Scroll to top on navigate
    const scrollOnNavigate = () => {
      handleScroll();
    };

    // Attach scrollOnNavigate as a listener to the beforeunload event
    window.addEventListener("beforeunload", scrollOnNavigate);

    // Cleanup the event listener when component unmounts
    return () => {
      window.removeEventListener("beforeunload", scrollOnNavigate);
    };
  }, []);
  useEffect(() => {
    // for (const product of applicationInput.application_products) {

    if (applicationInput.annual_card_turnover >= 2000000) {
      dispatch(GetApplicationInput("parent_entity_code", "52495"));
    } else {
      if (applicationInput.renting_elavon_terminals === true) {
        if (applicationInput.atv < 30) {
          dispatch(GetApplicationInput("parent_entity_code", "53266"));
        } else if (applicationInput.atv >= 30) {
          dispatch(GetApplicationInput("parent_entity_code", "53269"));
        }
      } else if (applicationInput.renting_elavon_terminals === false) {
        // if (applicationInput.annual_card_turnover >= 2000000) {
        //   dispatch(GetApplicationInput("parent_entity_code", "52495"));
        // } else
        if (
          applicationInput.annual_card_turnover >= 500000 &&
          applicationInput.annual_card_turnover < 2000000
        ) {
          if (applicationInput.atv < 30) {
            dispatch(GetApplicationInput("parent_entity_code", "53266"));
          } else if (applicationInput.atv >= 30) {
            dispatch(GetApplicationInput("parent_entity_code", "53269"));
          }
        } else if (
          applicationInput.annual_card_turnover < 500000 &&
          applicationInput.auth_fees <= 0
        ) {
          if (applicationInput.atv < 30) {
            dispatch(GetApplicationInput("parent_entity_code", "53267"));
          } else if (applicationInput.atv >= 30) {
            dispatch(GetApplicationInput("parent_entity_code", "53270"));
          }
        } else if (
          applicationInput.annual_card_turnover < 500000 &&
          applicationInput.auth_fees > 0
        ) {
          if (applicationInput.atv < 30) {
            dispatch(GetApplicationInput("parent_entity_code", "53265"));
          } else if (applicationInput.atv >= 30) {
            dispatch(GetApplicationInput("parent_entity_code", "53268"));
          }
        } else if (applicationInput.auth_fees > 0) {
          if (applicationInput.atv < 30) {
            dispatch(GetApplicationInput("parent_entity_code", "53265"));
          } else if (applicationInput.atv >= 30) {
            dispatch(GetApplicationInput("parent_entity_code", "53268"));
          }
        }
      }
    }

    // }
  }, []);
  return (
    <div>
      <section className="content">
        {isLoadApplication && (
          <>
            <Backdrop
              open
              sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
          </>
        )}
        <div className=" p-0">
          <div className="row mt-5">
            <div className="col-xl-12 col-lg-12 col-md-12">
              <div className="mb-5">
                {/* <LeadsPreview /> */}
                {lead ? (
                  <Leads toggleLead={toggleLead} />
                ) : (
                  <LeadEdit toggleLead={toggleLead} />
                )}
              </div>
              <div className="mb-5">{/* <PriceQuotePreview/> */}</div>
              <div className="mb-5">
                {/* <BusinessDetailsPreview /> */}
                {businessDetail ? (
                  <BuisnessDetails
                    toggleBusinessDetail={toggleBusinessDetail}
                  />
                ) : (
                  <EditBusinessDetail
                    toggleBusinessDetail={toggleBusinessDetail}
                  />
                )}
              </div>
              <div className="mb-5">
                {/* <ScheduleOfFeesPreview /> */}
                {customerDetail ? (
                  <CustomarDetails
                    toggleCustomerDetail={toggleCustomerDetail}
                  />
                ) : (
                  <EditCostomerDetail
                    toggleCustomerDetail={toggleCustomerDetail}
                  />
                )}
              </div>
              <div className="mb-5">
                {/* <CustomerDetailsPreview /> */}
                {businessProfile ? (
                  <BuisnessProfile
                    toggleBusinessProfile={toggleBusinessProfile}
                  />
                ) : (
                  <EditBusinessProfile
                    toggleBusinessProfile={toggleBusinessProfile}
                  />
                )}
              </div>
              <div className="mb-5">
                {/* <BusinessProfilePreview /> */}
                {financialInfo ? (
                  <FinancialProfile toggleFinancialInfo={toggleFinancialInfo} />
                ) : (
                  <EditFinancialInfo
                    toggleFinancialInfo={toggleFinancialInfo}
                  />
                )}
              </div>
              <div className="mb-5">
                {/* <FinancialInfoPreview /> */}
                {siteVisit ? (
                  <SiteVisit toggleSiteVisit={toggleSiteVisit} />
                ) : (
                  <EditSideVisit toggleSiteVisit={toggleSiteVisit} />
                )}
              </div>
              <div className="mb-5">
                {/* <FinancialInfoPreview /> */}
                {documents ? (
                  <Documents toggleDocuments={toggleDocuments} />
                ) : (
                  <EditDocuments toggleDocuments={toggleDocuments} />
                )}
              </div>
              <div className="mb-5">
                {products ? (
                  <ProductPreview toggleProducts={toggleProducts} />
                ) : (
                  <EditProductPreview toggleProducts={toggleProducts} />
                )}
              </div>
              <div className="mb-5">
                {sof ? (
                  <SofPreviewNew toggleSof={toggleSof} />
                ) : (
                  // <SofPreview toggleSof={toggleSof} />
                  <EditSofPreview toggleSof={toggleSof} />
                )}
              </div>
          
                <div className="mb-5">
                  <SignAndConfirm />
                </div>
          
            </div>
          </div>
        </div>
        {/* <!-- <div className="row">
        <div className="col-md-6 mb-3">
          <CButton block color="info"><CIcon name="cil-arrow-left"/>&nbsp;Previous </CButton>
        </div>
        <div className="col-md-6 mb-3">
          <CButton block color="info" @click="largeModal = true" className="mr-1">
            <CIcon name="cil-check-circle"/>&nbsp;Submit 
          </CButton>
        </div>
      </div> --> */}
        {/* <!-- Modal Component --> */}
        <div>
          {/* <CModal title="" size="lg" :show.sync="largeModal">
        <img src="../../assets/img/online-payment 1.svg" className="img-fluid" alt="">
        <template #footer>
          <CButton @click="largeModal = false" color="warning" style="color:#fff;">Submit as Paper Application</CButton>
          <CButton @click="largeModal = false" color="success">Submit as E-sign Application</CButton>
        </template>
      </CModal> */}
        </div>
        {/* <!-- </div> --> */}
      </section>
    </div>
  );
}
