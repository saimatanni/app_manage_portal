import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {  Bar } from "react-chartjs-2";
import { CCard, CCardBody } from "@coreui/react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,BarController ,BarElement
} from "chart.js";

import {  CButton } from "@coreui/react";
import { useState } from "react";
import { showToast } from "src/utils/ToastHelper";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { GetLeadsnput } from "../accounts/Leads/_redux/action/LeadAction";
const CostanalysisChart = () => {
  const leadInput = useSelector((state) => state.leadInfo.leadInput);
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,BarController ,BarElement
  );
  

  //bar chart
  const determineBackgroundColor = (value) => {
    return value < 0 ? "#e55353" : "#198754";
  };
  const determineLabel = (value) => {
    return value < 0 ? "Cost " : "Savings ";
  };

  const fourYearSavings = (
    (leadInput.totalCurrentCost - leadInput.total_pc) *
    48
  )?.toFixed(2);
  const annualSavings = (
    (leadInput.totalCurrentCost - leadInput.total_pc) *
    12
  )?.toFixed(2);
  const monthlySavings = (
    leadInput.totalCurrentCost - leadInput.total_pc
  )?.toFixed(2);
  
  const data = {
    labels: [
      "Monthly " + determineLabel(fourYearSavings),
      "Annual " + determineLabel(fourYearSavings),
      "4 Year " + determineLabel(fourYearSavings),
    ],
    datasets: [
      {
        label: determineLabel(fourYearSavings) + "Amount",
        data: [monthlySavings || 0, annualSavings || 0, fourYearSavings || 0],
        backgroundColor: [
          determineBackgroundColor(monthlySavings),
          determineBackgroundColor(annualSavings),
          determineBackgroundColor(fourYearSavings),
        ],
        borderColor: "#181430",
        borderWidth: 1,
        barThickness: 65, // Adjust this value to control the bar width
      },
    ],
  };

  const options2 = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const getDataForRevineue = () => {
    if (leadInput.atv < 1 || leadInput.annual_card_turnover < 1) {
      showToast("error", "Monthly card turnover and ATV should  be greater then 0");
    }
   
    else {
      showToast("success", "Valid Data Added.");
      navigate("/revenue-calculator");
    }
  };
  const handleChangeInput = (name, value, e) => {
    dispatch(GetLeadsnput(name, value, e));

    
  };

  const [submit, setSubmit] = useState(false);
  const handleExport = () => {
    if (
      parseFloat(leadInput.visa_debit_pr) < 0.35 ||
      parseFloat(leadInput.mastercard_debit_pr) < 0.38 ||
      parseFloat(leadInput.visa_credit_pr) < 0.65 ||
      parseFloat(leadInput.mastercard_credit_pr) < 0.65 ||
      parseFloat(leadInput.visa_business_debit_pr) < 0.2
    ) {
      setSubmit(true);
    } else {
      navigate("/export-leads");
    }
  };
  return (
    <div>
      {" "}
      <div className="row my-5">
        <div className="col-md-8  my-5">
          
          <CCard >
            <CCardBody>
             
              <Bar data={data} options={options2} />
            </CCardBody>
          </CCard>
       
        </div>
        {/* <div className="col-md-0 col-lg-2 col xl 3"></div> */}
        <div className="col-md-4 my-5">
          <div className="table-responsive my-4 savings_table">
            <table className="table table-striped number-center table-hover">
              <tbody>
                <tr>
                  <td style={{ fontWeight: "600px", textAlign: "start" }}>
                    % of {determineLabel(fourYearSavings)}
                  </td>
                
                  <td>
                    {" "}
                    {!leadInput.percent || leadInput.percent === "-Infinity"
                      ? 0
                      : Math.ceil(leadInput.percent)}
                  </td>
                </tr>
                <tr>
                  <td style={{ fontWeight: "600px", textAlign: "start" }}>
                    {" "}
                    Monthly {determineLabel(fourYearSavings)}
                  </td>
                  <td>
                    £
                    {(leadInput.totalCurrentCost - leadInput.total_pc)?.toFixed(
                      2
                    )}
                  </td>
                </tr>

                <tr>
                  <td style={{ fontWeight: "600px", textAlign: "start" }}>
                    Annual {determineLabel(fourYearSavings)}
                  </td>
                  <td>
                    £
                    {(
                      (leadInput.totalCurrentCost - leadInput.total_pc) *
                      12
                    )?.toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td style={{ fontWeight: "600px", textAlign: "start" }}>
                    4-Year {determineLabel(fourYearSavings)}
                  </td>
                  <td>
                    £
                    {(
                      (leadInput.totalCurrentCost - leadInput.total_pc) *
                      48
                    )?.toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="d-flex justify-content-end">
            {/* <button
          style={{ padding: "10px 15px" }}
          className="btn btn-primary"
          onClick={() => navigate("/cost-analysis-pdf")}
        >
          View Pdf
        </button> */}
            <button
              className="btn btn-danger mx-2"
              style={{ padding: "3px 12px", borderRadius: "5px" }}
              onClick={() => {
                handleExport();
              }}
            >
              Export
            </button>
            <button className="basic_btn" onClick={getDataForRevineue} style={{background:"#38b6ff", border:"none", color:"white"}}>

              Calculate Commission
            </button>
          </div>

          {/* Modal */}

          <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
              {/* <Modal.Title>Modal heading</Modal.Title> */}
            </Modal.Header>
            <Modal.Body>
              <div className="row">
                <div className="col-md-6 ">
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">
                      Monthly Card Turnover
                    </label>
                    <input
                      value={leadInput.annual_card_turnover}
                      min={0}
                      name="annual_card_turnover"
                      onChange={(e) =>
                        handleChangeInput(
                          "annual_card_turnover",
                          e.target.value
                        )
                      }
                      type="number"
                      className="form-control my-3"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">ATV</label>
                    <input
                      value={leadInput.atv}
                      min={0}
                      name="atv"
                      onChange={(e) => handleChangeInput("atv", e.target.value)}
                      type="number"
                      className="form-control my-3"
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">
                      Renting From Elavon
                    </label>
                    <select
                      value={leadInput.renting_elavon_terminals}
                      name="renting_elavon_terminals"
                      onChange={(e) =>
                        handleChangeInput(
                          "renting_elavon_terminals",
                          e.target.value
                        )
                      }
                      id=""
                      className="form-control my-3"
                    >
                      <option value="">--</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <CButton block color="info" onClick={getDataForRevineue}>
                {/* <Button variant="info" onClick={handleClose}> */}
                Submit
              </CButton>
            </Modal.Footer>
          </Modal>
          <Modal
            show={submit}
            onHide={() => setSubmit(false)}
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Body style={{ color: "#1E2553 ", marginTop: "15px" }}>
              <h4>
                Are you sure, you want to proceed with low rates? Need
                Administrative approval.
              </h4>
            </Modal.Body>
            <Modal.Footer>
              <button
                style={{ background: "red" }}
                className="custom-btn  flex mx-2 "
                onClick={() => setSubmit(false)}
              >
                No
              </button>
              <button
                className="    custom-btn  flex mx-2 "
                onClick={() => {
                  navigate("/export-leads");
                  setSubmit(false);
                }}
              >
                Yes
              </button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default CostanalysisChart;
