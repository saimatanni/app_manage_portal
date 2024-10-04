import React, { useEffect, useState } from "react";

import "./Menu.css";
import Select from "react-select";
import { Radio } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import {
  GetCountryList,
  GetLeadsnput,
} from "../accounts/Leads/_redux/action/LeadAction";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import PropTypes from "prop-types";
import { BiCalculator } from "react-icons/bi";
import RevenueCalculationChart from "./RevenueCalculationChart";

const UpdatedRevenueCalculation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const leadInput = useSelector((state) => state.leadInfo.leadInput);

  const [numOfTransection, setNumOfTransection] = useState(0);
  const [selectedOption, setSelectedOption] = useState([]);
  const [allCardArray, setAllCardArray] = useState([]);

  const [b8OtherCard, setB8OtherCard] = useState(0);
  // debit
  const [b6DebitCard, setB6DebitCard] = useState(0);
  const [proposedDebitRates, setProposedDebitRates] = useState(
    leadInput.visa_debit_pr
  );
  const [debitMargin, setDebitMargin] = useState(0);
  const [visaDebitRevenue, setvisaDebitRevenue] = useState(0);
  const [debitPercent, setDebitPercent] = useState(85);
  const [creditPercent, setCreditPercent] = useState(10);
  const [error, setError] = useState(false);
  const [totalPercentage, setTotalPercentage] = useState(0);
  const [calculatedTotalPercentage, setCalculatedTotalPercentage] = useState(0);
  //   credit
  const [b7CreditCard, setB7CreditCard] = useState(0);
  const [proposedCreditRates, setProposedCreditRates] = useState(
    leadInput.visa_credit_pr
  );
  const [creditMargin, setCreditMargin] = useState(0);
  const [visaCreditRevenue, setvisaCreditRevenue] = useState(0);
  //pence
  const [proposeRatePence, setProposeRatePence] = useState(
    leadInput.per_transactional_charge_pr
  );
  const [penceRevenue, setPenceRevenue] = useState(0);
  //other revenue
  const [otherRevenue, setOtherRevenue] = useState(0);
  const [otherTotalValue, setOtherTotalValue] = useState(0);
  //total revenue
  const [totalRevenue, setTotalRevenue] = useState(0.0);
  const OnterCardOptions = [
    {
      value: "MasterCard Debit/Maestro Domestic",
      label: "MasterCard Debit/Maestro Domestic",
    },
    {
      value: "Visa Business Debit / Maestro within EEA",
      label: "Visa Business Debit / Maestro within EEA",
    },

    {
      value: "Visa Business Credit / MasterCard Business",
      label: "Visa Business Credit / MasterCard Business",
    },

    {
      value: "Visa Purchasing/Visa Corporate",
      label: "Visa Purchasing/Visa Corporate",
    },

    {
      value: "MasterCard Purchasing / Corporate/Commercial",
      label: "MasterCard Purchasing / Corporate/Commercial",
    },

    {
      value: "Non-EEA Visa / Non-EEA Mastercard/Maestro",
      label: "Non-EEA Visa / Non-EEA Mastercard/Maestro",
    },

    {
      value: "DCI / Discover / JCB / Union Pay",
      label: "DCI / Discover / JCB / Union Pay",
    },
  ];
  useEffect(() => {
    dispatch(GetCountryList());
  }, []);

  // ------------entity code-/
  const perentalEntity = (name) => {
    // entity code 95
    // leadInput.parent_entity_code ==
    if (leadInput.parent_entity_code === "52495") {
      if (name === "Visa Debit") return 0.20;
      if (name === "Visa Credit") return 0.30;
      if (name === "Mastercard Debit") return 0.20;
      if (name === "Mastercard Credit") return 0.30;
      if (name === "Visa V-Pay") return 0.20;
      if (name === "UK Maestro") return 0.30;
      if (name === "International Maestro") return 0.395;
      if (name === "Visa Business Credit") return 1.35;
      if (name === "Visa Business Debit") return 0.50;
      if (name === "Visa Purchasing") return 1.55;
      if (name === "Visa Corporate") return 1.55;
      if (name === "Mastercard Business") return 1.3;
      if (name === "Mastercard Purchasing") return 1.5;
      if (name === "Mastercard Fleet") return 1.5;
      if (name === "Mastercard Corporate") return 1.5;
      if (name === "Mastercard Prepaid Commerciale") return 1.3;
      if (name === "All Non-EEA VISA") return 2.1;
      if (name === "All Non-EEA Mastercard") return 2.1;
      if (name === "Diners") return 2.1;
      if (name === "JCB") return 2.1;
      if (name === "Union Pay") return 2.1;
    }
    // less 30 & less 50000 && no entity = 67
    else if (leadInput.parent_entity_code === "53267") {
      if (name === "Visa Debit") return 0.349;
      if (name === "Visa Credit") return 0.65;
      if (name === "Mastercard Debit") return 0.374;
      if (name === "Mastercard Credit") return 0.641;
      if (name === "Visa V-Pay") return 0.349;
      if (name === "UK Maestro") return 0.374;
      if (name === "International Maestro") return 0.435;
      if (name === "Visa Business Credit") return 1.825;
      if (name === "Visa Business Debit") return 1.01;
      if (name === "Visa Purchasing") return 2.261;
      if (name === "Visa Corporate") return 2.261;
      if (name === "Mastercard Business") return 1.793;
      if (name === "Mastercard Purchasing") return 1.999;
      if (name === "Mastercard Fleet") return 2.001;
      if (name === "Mastercard Corporate") return 2.001;
      if (name === "Mastercard Prepaid Commerciale") return 1.814;
      if (name === "All Non-EEA VISA") return 2.558;
      if (name === "All Non-EEA Mastercard") return 2.63;
      if (name === "Diners") return 2.1;
      if (name === "JCB") return 2.1;
      if (name === "Union Pay") return 2.1;
    }
    // avobe 30 & less  50000 && no entity =53270
    else if (leadInput.parent_entity_code === "53270") {
      if (name === "Visa Debit") return 0.329;
      if (name === "Visa Credit") return 0.65;
      if (name === "Mastercard Debit") return 0.35;
      if (name === "Mastercard Credit") return 0.35;
      if (name === "Visa V-Pay") return 0.35;
      if (name === "UK Maestro") return 0.35;
      if (name === "International Maestro") return 0.35;
      if (name === "Visa Business Credit") return 0.35;
      if (name === "Visa Business Debit") return 0.35;
      if (name === "Visa Purchasing") return 0.35;
      if (name === "Visa Corporate") return 0.35;
      if (name === "Mastercard Business") return 1.793;
      if (name === "Mastercard Purchasing") return 1.999;
      if (name === "Mastercard Fleet") return 2.001;
      if (name === "Mastercard Corporate") return 2.001;
      if (name === "Mastercard Prepaid Commerciale") return 1.814;
      if (name === "All Non-EEA VISA") return 2.588;
      if (name === "All Non-EEA Mastercard") return 2.63;
      if (name === "Diners") return 2.1;
      if (name === "JCB") return 2.1;
      if (name === "Union Pay") return 2.1;
    }
    // avobe 53266
    else if (leadInput.parent_entity_code === "53266") {
      if (name === "Visa Debit") return 0.299;
      if (name === "Visa Credit") return 0.6;
      if (name === "Mastercard Debit") return 0.35;
      if (name === "Mastercard Credit") return 0.35;
      if (name === "Visa V-Pay") return 0.35;
      if (name === "UK Maestro") return 0.35;
      if (name === "International Maestro") return 0.35;
      if (name === "Visa Business Credit") return 1.775;
      if (name === "Visa Business Debit") return 0.96;
      if (name === "Visa Purchasing") return 2.221;
      if (name === "Visa Corporate") return 2.221;
      if (name === "Mastercard Business") return 1.743;
      if (name === "Mastercard Purchasing") return 1.949;
      if (name === "Mastercard Fleet") return 1.951;
      if (name === "Mastercard Corporate") return 1.951;
      if (name === "Mastercard Prepaid Commerciale") return 1.754;
      if (name === "All Non-EEA VISA") return 2.538;
      if (name === "All Non-EEA Mastercard") return 2.58;
      if (name === "Diners") return 2.1;
      if (name === "JCB") return 2.1;
      if (name === "Union Pay") return 2.1;
    }
    //53269
    else if (leadInput.parent_entity_code === "53269") {
      if (name === "Visa Debit") return 0.279;
      if (name === "Visa Credit") return 0.6;
      if (name === "Mastercard Debit") return 0.35;
      if (name === "Mastercard Credit") return 0.35;
      if (name === "Visa V-Pay") return 0.35;
      if (name === "UK Maestro") return 0.35;
      if (name === "International Maestro") return 0.35;
      if (name === "Visa Business Credit") return 0.35;
      if (name === "Visa Business Debit") return 0.35;
      if (name === "Visa Purchasing") return 2.221;
      if (name === "Visa Corporate") return 2.221;
      if (name === "Mastercard Business") return 1.743;
      if (name === "Mastercard Purchasing") return 1.949;
      if (name === "Mastercard Fleet") return 1.951;
      if (name === "Mastercard Corporate") return 1.951;
      if (name === "Mastercard Prepaid Commerciale") return 1.754;
      if (name === "All Non-EEA VISA") return 2.538;
      if (name === "All Non-EEA Mastercard") return 2.58;
      if (name === "Diners") return 2.1;
      if (name === "JCB") return 2.1;
      if (name === "Union Pay") return 2.1;
    }
    //53268
    else if (leadInput.parent_entity_code === "53268") {
      if (name === "Visa Debit") return 0.299;
      if (name === "Visa Credit") return 0.611;
      if (name === "Mastercard Debit") return 0.35;
      if (name === "Mastercard Credit") return 0.35;
      if (name === "Visa V-Pay") return 0.35;
      if (name === "UK Maestro") return 0.35;
      if (name === "International Maestro") return 0.35;
      if (name === "Visa Business Credit") return 0.35;
      if (name === "Visa Business Debit") return 0.35;
      if (name === "Visa Purchasing") return 2.231;
      if (name === "Visa Corporate") return 2.231;
      if (name === "Mastercard Business") return 1.763;
      if (name === "Mastercard Purchasing") return 1.969;
      if (name === "Mastercard Fleet") return 1.971;
      if (name === "Mastercard Corporate") return 1.971;
      if (name === "Mastercard Prepaid Commerciale") return 1.784;
      if (name === "All Non-EEA VISA") return 2.558;
      if (name === "All Non-EEA Mastercard") return 2.6;
      if (name === "Diners") return 2.1;
      if (name === "JCB") return 2.1;
      if (name === "Union Pay") return 2.1;
    }

    //53265
    else if (leadInput.parent_entity_code === "53265") {
      if (name === "Visa Debit") return 0.319;
      if (name === "Visa Credit") return 0.611;
      if (name === "Mastercard Debit") return 0.35;
      if (name === "Mastercard Credit") return 0.35;
      if (name === "Visa V-Pay") return 0.35;
      if (name === "UK Maestro") return 0.35;
      if (name === "International Maestro") return 0.35;
      if (name === "Visa Business Credit") return 0.35;
      if (name === "Visa Business Debit") return 0.35;
      if (name === "Visa Purchasing") return 0.35;
      if (name === "Visa Corporate") return 2.231;
      if (name === "Mastercard Business") return 1.763;
      if (name === "Mastercard Purchasing") return 1.969;
      if (name === "Mastercard Fleet") return 1.971;
      if (name === "Mastercard Corporate") return 1.971;
      if (name === "Mastercard Prepaid Commerciale") return 1.784;
      if (name === "All Non-EEA VISA") return 2.558;
      if (name === "All Non-EEA Mastercard") return 2.6;
      if (name === "Diners") return 2.1;
      if (name === "JCB") return 2.1;
      if (name === "Union Pay") return 2.1;
    } else {
      // alert('error 160')
      if (name === "Visa Debit") return 0;
      if (name === "Visa Credit") return 0;
      if (name === "Mastercard Debit") return 0;
      if (name === "Mastercard Credit") return 0;
      if (name === "Visa V-Pay") return 0;
      if (name === "UK Maestro") return 0;
      if (name === "International Maestro") return 0;
      if (name === "Visa Business Credit") return 0;
      if (name === "Visa Business Debit") return 0;
      if (name === "Visa Purchasing") return 0;
      if (name === "Visa Corporate") return 0;
      if (name === "Mastercard Business") return 0;
      if (name === "Mastercard Purchasing") return 0;
      if (name === "Mastercard Fleet") return 0;
      if (name === "Mastercard Corporate") return 0;
      if (name === "Mastercard Prepaid Commerciale") return 0;
      if (name === "All Non-EEA VISA") return 0;
      if (name === "All Non-EEA Mastercard") return 0;
      if (name === "Diners") return 0;
      if (name === "JCB") return 0;
      if (name === "Union Pay") return 0;
    }
  };
  useEffect(() => {
    dispatch(
      GetLeadsnput(
        "entity_card_turnover",
        parseInt(leadInput.annual_card_turnover) * 12
      )
    );
    dispatch(GetLeadsnput("authorization_fee_cr", 0));
  }, [leadInput.annual_card_turnover]);

  useEffect(() => {
    if (leadInput.entity_card_turnover >= 2000000) {
      dispatch(GetLeadsnput("parent_entity_code", "52495"));
    } else {
      if (leadInput.renting_elavon_terminals === "yes") {
        if (leadInput.atv < 30) {
          dispatch(GetLeadsnput("parent_entity_code", "53266"));
        } else if (leadInput.atv >= 30) {
          dispatch(GetLeadsnput("parent_entity_code", "53269"));
        }
      } else if (leadInput.renting_elavon_terminals === "no") {
        if (
          leadInput.entity_card_turnover >= 500000 &&
          leadInput.entity_card_turnover < 2000000
        ) {
          if (leadInput.atv < 30) {
            dispatch(GetLeadsnput("parent_entity_code", "53266"));
          } else if (leadInput.atv >= 30) {
            dispatch(GetLeadsnput("parent_entity_code", "53269"));
          }
        } else if (
          leadInput.entity_card_turnover < 500000 &&
          leadInput.authorization_fee_cr <= 0
        ) {
          if (leadInput.atv < 30) {
            dispatch(GetLeadsnput("parent_entity_code", "53267"));
          } else if (leadInput.atv >= 30) {
            dispatch(GetLeadsnput("parent_entity_code", "53270"));
          }
        } else if (
          leadInput.entity_card_turnover < 500000 &&
          leadInput.authorization_fee_cr > 0
        ) {
          if (leadInput.atv < 30) {
            dispatch(GetLeadsnput("parent_entity_code", "53265"));
          } else if (leadInput.atv >= 30) {
            dispatch(GetLeadsnput("parent_entity_code", "53268"));
          }
        } else if (leadInput.authorization_fee_cr > 0) {
          if (leadInput.atv < 30) {
            dispatch(GetLeadsnput("parent_entity_code", "53265"));
          } else if (leadInput.atv >= 30) {
            dispatch(GetLeadsnput("parent_entity_code", "53268"));
          }
        }
      }
    }

    // }
  }, [
    leadInput.renting_elavon_terminals,
    leadInput.atv,
    leadInput.authorization_fee_cr,
    leadInput.annual_card_turnover,
    leadInput.entity_card_turnover,
    leadInput.authorization_fee_cr,
  ]);

  const handleChangeInput = (name, value, e) => {
    dispatch(GetLeadsnput(name, value, e));
  };
  const handlechangeEntityvalue = (name, value, e) => {
    dispatch(GetLeadsnput(name, value, e));
  };
  useEffect(() => {
    setB6DebitCard((leadInput?.annual_card_turnover * debitPercent) / 100);
    setB7CreditCard((leadInput?.annual_card_turnover * creditPercent) / 100);
    setB8OtherCard((leadInput?.annual_card_turnover * 5) / 100);
    const totalPercentage =
      allCardArray.reduce((sum, item) => sum + parseInt(item.percentage), 0) +
      parseInt(creditPercent || 0) +
      parseInt(debitPercent || 0);

    setCalculatedTotalPercentage(totalPercentage);
    if (totalPercentage !== 100) {
      setError(true);
    } else {
      setError(false);
    }
    // Recalculate name_value in allCardArray
    const updatedArray = allCardArray.map((item) => {
      const percentageValue =
        (item.percentage * leadInput.annual_card_turnover) / 100;
      return {
        ...item,
        name_value: percentageValue,
      };
    });

    setAllCardArray(updatedArray);
  }, [
    creditPercent,
    debitPercent,
    leadInput?.annual_card_turnover,
    error,
    totalPercentage,
  ]);

  const ProgressBar = ({ totalPercentage }) => {
    const progressBarColor = totalPercentage === 100 ? "#0f4595" : "#3498db";

    return (
      <div
        style={{
          width: "100%",
          height: "18px",
          fontSize: "12px",
          backgroundColor: "#e0e0e0",
          borderRadius: "5px",
          margin: "10px 0",
          position: "relative",
        }}
      >
        <div
          style={{
            width: `${totalPercentage > 100 ? 100 : totalPercentage}%`,
            height: "100%",
            backgroundColor: progressBarColor,
            borderRadius: "5px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        >
          {totalPercentage}%
        </div>
      </div>
    );
  };

  ProgressBar.propTypes = {
    totalPercentage: PropTypes.number.isRequired,
  };

  //   numOf Transaction  calculate
  useEffect(() => {
    if (typeof leadInput?.annual_card_turnover === "string" && leadInput.atv) {
      const annualCardTurnover = parseFloat(
        leadInput.annual_card_turnover.replace(/,/g, "")
      );
      const atv = parseFloat(leadInput.atv);

      if (!isNaN(annualCardTurnover) && !isNaN(atv) && atv !== 0) {
        const number = Math.floor(annualCardTurnover / atv);
        // const number = Math.ceil(annualCardTurnover / atv);
        setNumOfTransection(number);
      }
    }
  }, [leadInput.annual_card_turnover, leadInput.atv]);
  //inddevidual revenue
  useEffect(() => {
    // debit
    setDebitMargin(proposedDebitRates - perentalEntity("Visa Debit"));
    setvisaDebitRevenue((debitMargin * b6DebitCard) / 100);
    // setvisaDebitRevenue((debitMargin * (b6DebitCard / 12)) / 100);

    // credit
    setCreditMargin(proposedCreditRates - perentalEntity("Visa Credit"));
    setvisaCreditRevenue((creditMargin * b7CreditCard) / 100);

    //penece
    setPenceRevenue(numOfTransection * proposeRatePence);
  }, [
    proposedDebitRates,
    b6DebitCard,
    visaDebitRevenue,
    debitMargin,
    b7CreditCard,
    proposedCreditRates,
    creditMargin,
    visaCreditRevenue,
    leadInput.annual_card_turnover,
    leadInput.atv,
    numOfTransection,
    proposeRatePence,
    leadInput.renting_elavon_terminals,
    leadInput.parent_entity_code,
  ]);
  //final revenue
  useEffect(() => {
    const finalRevenue =
      visaCreditRevenue + visaDebitRevenue + penceRevenue + (otherRevenue || 0);

    if (leadInput.parent_entity_code === "52495") {
      setTotalRevenue(finalRevenue / 2);
    } else {
      setTotalRevenue(finalRevenue);
    }
  }, [
    visaCreditRevenue,
    visaDebitRevenue,
    numOfTransection,
    otherRevenue,
    penceRevenue,
    leadInput.renting_elavon_terminals,
    leadInput.parent_entity_code,
    leadInput.authorization_fee_cr,
  ]);
  //Others card add and remove
  const handleMultipleInputChange = (newValue, actionMeta) => {
    setSelectedOption(newValue);

    if (actionMeta?.action === "remove-value") {
      const removedValue = actionMeta?.removedValue;

      if (removedValue) {
        const value = removedValue.value;

        setAllCardArray((prevArray) =>
          prevArray.filter((data) => data?.name !== value)
        );
      }
    }
  };

  useEffect(() => {
    if (selectedOption?.length !== 0) {
      const lastOne = selectedOption[selectedOption?.length - 1];
      const num = 0;

      // Check if the selected option already exists in the array
      const existingItem = allCardArray.find(
        (data) => data.name === lastOne.value
      );

      if (existingItem) {
        // If it exists, update the existing item
        setAllCardArray((prevArray) =>
          prevArray.map((data) =>
            data.name === lastOne.value
              ? { ...data /* update properties if needed */ }
              : data
          )
        );
      } else {
        // If it doesn't exist, add a new item
        setAllCardArray((prevArray) => [
          ...prevArray,
          {
            name: lastOne.value,
            name_value: 0,
            base_rate: 0.35,
            proposed_rate: num.toFixed(2),
            debit_margin: 0.0,
            revenue: 0.0,
            percentage: 0,
          },
        ]);
      }
    }
  }, [selectedOption, leadInput.parent_entity_code]);
  // total sumation of annual cardturnover value
  useEffect(() => {
    let otherRevenue = 0;
    let totalValue = 0;
   
    if (allCardArray.length === 0) {
      
      setOtherTotalValue(totalValue);
    } else {
      allCardArray.forEach((item) => {
        otherRevenue += (item.name_value * 0.35) / 100;
        // otherRevenue += item.revenue;
        totalValue += item.name_value;
       
        setOtherTotalValue(totalValue);
      });
    }

    setOtherRevenue(otherRevenue);
  }, [allCardArray, leadInput.parent_entity_code]);
  // Determine color based on revenue value


 
  return (
    <>
      {" "}
      {/* <p>proposedDebitRates: {proposedDebitRates}</p>
      <p>visaDBaseRate: {perentalEntity("Visa Debit")}</p>
      <p>
        debitMargin:{proposedDebitRates - perentalEntity("Visa Debit")} /{" "}
        {debitMargin}
      </p>
      <p>debit revenue : {visaDebitRevenue}</p>
      <p>
        {" "}
        pence : {numOfTransection * proposeRatePence} , {penceRevenue}
      </p>
      <h4>Credit</h4>
      <p>proposedCreditRates: {proposedCreditRates}</p>
      <p>visaCreditBaseRate: {perentalEntity("Visa Credit")}</p>
      <p>
        CreditMargin:{proposedCreditRates - perentalEntity("Visa Credit")} or{" "}
        {creditMargin}
      </p>
      <p>credit revenue : {visaCreditRevenue}</p>
      <h4>other: {otherRevenue}</h4>
      <p>
        {allCardArray.map((item, index) => {
          return (
            <div key={index}>
              <p key={item.base_rate}>revenue: {item.revenue}</p>
              <p key={item.debit_margin}>
                revenue2: {(item.debit_margin * item.name_value) / 100}
              </p>
            </div>
          );
        })}
      </p> */}
      <div className="container shadow-lg p-4 my-4 bg-body rounded ">
        <div className="row ">
          <div className="col-md-12  mb-4">
            <h2 style={{ color: "#0f4595" }}>
              {" "}
              <span>
                {" "}
                <BiCalculator />{" "}
              </span>{" "}
              Revenue Calculator
            </h2>
          </div>
          {/* <div className="col-md-2"></div> */}
          <div className="col-lg-8 mb-lg-0 mb-3">
            <div className="table-responsive  calculator_card h-100">
              <table className="table table-striped table-hover revenue_table">
                <tbody>
                  <tr>
                    <td
                      style={{
                        fontWeight: "600",
                        textAlign: "start",
                        // backgroundColor: "#00B0F0",
                      }}
                    >
                      {" "}
                      Monthly Card Turnover
                    </td>
                 
                    <td
                
                    >
                      <input
                        className="calculate-input"
                        type="number"
                        min={0}
                        name="annual_card_turnover"
                        onWheel={(e) => e.target.blur()}
                        value={leadInput.annual_card_turnover}
                        onChange={(e) => {
                          handlechangeEntityvalue(
                            // handleChangeInput(
                            "annual_card_turnover",
                            e.target.value
                          );
                          setB6DebitCard(
                            (parseInt(e.target.value) * debitPercent) / 100
                          );
                          setB7CreditCard(
                            (parseInt(e.target.value) * creditPercent) / 100
                          );
                          setB8OtherCard((parseInt(e.target.value) * 5) / 100);
                        }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        fontWeight: "600",
                        textAlign: "start",
                        // backgroundColor: "#00B0F0",
                      }}
                    >
                      {" "}
                      ATV
                    </td>
                    {/* <td>£ {atv}</td> */}
                    <td
                    // style={{ backgroundColor: "#00B0F0" }}
                    >
                      <input
                        className="calculate-input"
                        type="number"
                        min={0}
                        name="atv"
                        onWheel={(e) => e.target.blur()}
                        value={leadInput.atv}
                        onChange={(e) => {
                          handlechangeEntityvalue("atv", e.target.value);
                        }}
                      />
                    </td>
                  </tr>
                  {/* <tr style={{ backgroundColor: "#00B0F0" }}>
                    <td style={{ fontWeight: "600", textAlign: "start" }}>
                      {" "}
                      Auth Fees
                    </td>
                 
                    <td>
                      <input
                        className="calculate-input"
                        type="number"
                        min={0}
                        placeholder="£"
                        onWheel={(e) => e.target.blur()}
                        name="authorization_fee_cr"
                        value={leadInput.authorization_fee_cr}
                        onChange={(e) => {
                          handleChangeInput(
                            "authorization_fee_cr",
                            e.target.value
                          );
                        }}
                      />
                    </td>
                  </tr> */}
                  {/* <tr style={{ background: "#00B0F0" }}>
                    <td style={{ fontWeight: "600", textAlign: "start" }}>
                      {" "}
                      Parent Entity code
                    </td>
                  
                    <td>
                    
                      <select
                        style={{ width: "200px" }}
                        className="calculate-input"
                        name="parent_entity_code"
                        onWheel={(e) => e.target.blur()}
                        value={leadInput.parent_entity_code}
                        onChange={(e) => {
                          handleChangeInput(
                            "parent_entity_code",
                            e.target.value
                          );
                        }}
                      >
                        {entity_code.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                   
                    </td>
                  </tr> */}
                  {/* <tr>
                    <td style={{ fontWeight: "600", textAlign: "start" }}>
                      No of Transactions
                    </td>

                    <td>
                      <input
                        className="calculate-input"
                        type="number"
                        min={0}
                        value={numOfTransection}
                        onWheel={(e) => e.target.blur()}
                      />
                    </td>
                  </tr> */}

                  <tr>
                    <td style={{ fontWeight: "600", textAlign: "start" }}>
                      Renting From Elavon
                    </td>
                    {/* <td>{Math.ceil(numberOfTranc)}</td> */}
                    <td>
                      <div className="d-flex justify-content-center">
                        <div>
                          <Radio
                            checked={
                              leadInput.renting_elavon_terminals === "yes" &&
                              true
                            }
                            onChange={(e) => {
                              handleChangeInput(
                                "renting_elavon_terminals",
                                e.target.value
                              );
                            }}
                            value="yes"
                            name="radio-buttons"
                            slotProps={{ input: { "aria-label": "yes" } }}
                          />
                          <label htmlFor="">Yes</label>
                        </div>
                        <div>
                          <Radio
                            checked={
                              leadInput.renting_elavon_terminals === "no" &&
                              true
                            }
                            onChange={(e) => {
                              handleChangeInput(
                                "renting_elavon_terminals",
                                e.target.value
                              );
                            }}
                            value="no"
                            name="radio-buttons"
                            slotProps={{ input: { "aria-label": "no" } }}
                          />
                          <label htmlFor="">No</label>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: "600", textAlign: "start" }}>
                      {" "}
                      &nbsp;{" "}
                    </td>
                    <td></td>
                  </tr>
                  {/* Visa Debit/Visa V-Pay */}
                  <tr>
                    <td
                      style={{
                        fontWeight: "600",
                        textAlign: "start",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: "15px",
                      }}
                    >
                      {" "}
                      Visa Debit/Visa V-Pay
                      <div className="revenue-parcent-input3">
                        <input
                          style={{
                            width: "85px",
                            borderColor: error ? "red" : "initial",
                          }}
                          className="calculate-input "
                          min={0}
                          onWheel={(e) => e.target.blur()}
                          type="number"
                          value={debitPercent}
                          onChange={(e) => setDebitPercent(e.target.value)}
                        />
                      </div>
                    </td>
                    {/* <td>£ {debitCard}</td> */}
                    <td>
                      <input
                        className="calculate-input"
                        onWheel={(e) => e.target.blur()}
                        disabled
                        readOnly
                        type="number"
                        min={0}
                        step="any"
                        value={b6DebitCard}
                        onChange={(e) => {
                          setB6DebitCard(parseInt(e.target.value));
                          if (otherTotalValue > 0) {
                            dispatch(
                              GetLeadsnput(
                                "annual_card_turnover",
                                parseInt(e.target.value) +
                                  b7CreditCard +
                                  b8OtherCard +
                                  otherTotalValue
                              )
                            );
                          } else {
                            dispatch(
                              GetLeadsnput(
                                "annual_card_turnover",
                                parseInt(e.target.value) +
                                  b7CreditCard +
                                  b8OtherCard
                              )
                            );
                          }
                        }}
                      />
                    </td>
                  </tr>
                  {/* Visa credit/Visa V-Pay */}
                  <tr>
                    <td
                      style={{
                        fontWeight: "600",
                        textAlign: "start",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: "15px",
                      }}
                    >
                      Visa Credit/MasterCard Credit
                      <div className="revenue-parcent-input3">
                        <input
                          style={{
                            width: "85px",
                            borderColor: error ? "red" : "initial",
                          }}
                          className="calculate-input"
                          min={0}
                          onWheel={(e) => e.target.blur()}
                          type="number"
                          value={creditPercent}
                          onChange={(e) => setCreditPercent(e.target.value)}
                        />
                      </div>
                    </td>
                    {/* <td>£ {creditCard}</td> */}
                    <td>
                      <input
                        className="calculate-input"
                        type="number"
                        disabled
                        readOnly
                        min={0}
                        onWheel={(e) => e.target.blur()}
                        value={b7CreditCard}
                        onChange={(e) => {
                          setB7CreditCard(parseInt(e.target.value));
                          if (otherTotalValue > 0) {
                            dispatch(
                              GetLeadsnput(
                                "annual_card_turnover",
                                b6DebitCard +
                                  parseInt(e.target.value) +
                                  b8OtherCard +
                                  otherTotalValue
                              )
                            );
                          } else {
                            dispatch(
                              GetLeadsnput(
                                "annual_card_turnover",
                                b6DebitCard +
                                  parseInt(e.target.value) +
                                  b8OtherCard
                              )
                            );
                          }
                        }}
                      />
                    </td>
                  </tr>
                  {/* Others Card */}
                  {allCardArray?.map((card, index) => (
                    <React.Fragment key={index}>
                      <tr>
                        <td
                          style={{
                            fontWeight: "600",
                            textAlign: "start",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          {card?.name}
                          <div className="revenue-parcent-input3">
                            <input
                              style={{
                                width: "85px",
                                borderColor: error ? "red" : "initial",
                              }}
                              className="calculate-input"
                              min={0}
                              onWheel={(e) => e.target.blur()}
                              type="number"
                              value={card.parcentage}
                              // onChange={(e) => setCreditPercent(e.target.value)}
                              onChange={(e) => {
                                const updatedArray = allCardArray.map(
                                  (item) => {
                                    if (item.name === card?.name) {
                                      return {
                                        ...item,
                                        name_value:
                                          (Number(e.target.value) *
                                            leadInput.annual_card_turnover) /
                                          100,
                                        percentage: Number(e.target.value),
                                      };
                                    }
                                    return item;
                                  }
                                );
                                setTotalPercentage(Number(e.target.value));
                                setAllCardArray(updatedArray);
                              }}
                            />
                          </div>
                        </td>
                        {/* <td>£ {otherCard}</td> */}
                        <td>
                          <input
                            className="calculate-input"
                            type="number"
                            disabled
                            readOnly
                            onWheel={(e) => e.target.blur()}
                            step={"any"}
                            onChange={(e) => {
                              const updatedArray = allCardArray.map((item) => {
                                if (item.name === card?.name) {
                                  return {
                                    ...item,
                                    name_value: Number(e.target.value),
                                    revenue:
                                      // (Number(e.target.value) / 12) *
                                      Number(e.target.value) *
                                      item?.debit_margin,
                                  };
                                }
                                return item;
                              });

                              setAllCardArray(updatedArray);
                            }}
                            value={card?.name_value}
                          />
                        </td>
                      </tr>
                    </React.Fragment>
                  ))}
                  <ProgressBar totalPercentage={calculatedTotalPercentage} />
                  <tr>
                    <td style={{ fontWeight: "600", textAlign: "start" }}>
                      Add New Card
                    </td>
                    <td className="d-flex justify-content-center ">
                      <div style={{ width: "450px" }}>
                        <Select
                          style={{
                            backgroundColor: "transparnet",
                            margin: "0 auto",
                            // opacity:1,
                            // zindex:"1000"
                          }}
                          isMulti
                          name="colors"
                          options={OnterCardOptions}
                          className="basic-multi-select"
                          classNamePrefix="select"
                          isClearable={false}
                          onChange={handleMultipleInputChange}
                        />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: "600", textAlign: "start" }}>
                      {" "}
                      &nbsp;{" "}
                    </td>
                    <td></td>
                  </tr>
                  {/* Proposed  */}
                  <tr>
                    <td style={{ fontWeight: "600", textAlign: "start" }}>
                      Proposed Debit Rates (%)
                    </td>
                    {/* <td>{proposedDebitRate}%</td> */}
                    <td>
                      <input
                        style={{
                          borderColor:
                            totalRevenue < 0 && debitMargin < 0
                              ? "red"
                              : "initial",
                        }}
                        className="calculate-input"
                        type="number"
                        onWheel={(e) => e.target.blur()}
                        min={0}
                        value={proposedDebitRates}
                        onChange={(e) => {
                          setProposedDebitRates(Number(e.target.value));
                        }}
                      />
                    </td>
                  </tr>

                  <tr>
                    <td style={{ fontWeight: "600", textAlign: "start" }}>
                      Proposed Credit Rates (%)
                    </td>
                    {/* <td>{proposedCreditRate.toFixed(3)} %</td> */}
                    <td>
                      <input
                        style={{
                          borderColor:
                            totalRevenue < 0 && creditMargin < 0
                              ? "red"
                              : "initial",
                        }}
                        className="calculate-input"
                        type="number"
                        onWheel={(e) => e.target.blur()}
                        min={0}
                        value={proposedCreditRates}
                        onChange={(e) => {
                          setProposedCreditRates(Number(e.target.value));
                        }}
                      />
                    </td>
                  </tr>

                  {/* Proposed Rates (Pence) */}
                  <tr>
                    <td style={{ fontWeight: "600", textAlign: "start" }}>
                      Proposed Rates (Pence)
                    </td>
                    {/* <td>£ {proposedRate.toFixed(3)}</td> */}
                    <td>
                      <input
                        className="calculate-input"
                        type="number"
                        onWheel={(e) => e.target.blur()}
                        min={0}
                        value={proposeRatePence}
                        onChange={(e) => {
                          setProposeRatePence(parseFloat(e.target.value));
                        }}
                      />
                    </td>
                  </tr>

                  {/* <tr style={{ backgroundColor: "#92D050" }}>
                    <td
                      style={{
                        fontWeight: "700",
                        textAlign: "start",
                        backgroundColor: "#92D050",
                      }}
                    >
                      Total Revenue
                    </td>

             
                    <td style={{ backgroundColor: "#92D050" }}>
                      £ {totalRevenue?.toFixed(3)}
                    </td>
                  </tr> */}
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-lg-4">
            <div className=" table-responsive py-4 px-2 calculator_card">
              <h3 className="text-center text-info mb-4 text-capitalize">
                {" "}
                Monthly Revenue Calculation{" "}
              </h3>
              <div className="row" style={{ padding: "22px 0 46px 0" }}>
                <RevenueCalculationChart
                  allCardArray={allCardArray}
                  b6DebitCard={b6DebitCard}
                  b7CreditCard={b7CreditCard}
                />
              </div>
              <div
                className=" d-flex gap-3 justify-content-center align-items-center  flex-column"
                // style={{ height: "100%" }}
              >
                <h5 className="mt-2 text-capitalize text-primary">
                  Total Revenue Up To
                </h5>
                <div
                  className=""
                  style={{
                    width: "250px",
                    height: "250px",
                    marginBottom: "20px",
                  }}
                >
                  <CircularProgressbar
                    value={totalRevenue.toFixed(2)}
                    text={`£${totalRevenue.toFixed(2)}`}
                    strokeWidth={5}
                    styles={buildStyles({
                      pathColor:
                        totalRevenue < 0
                          ? "#dc3545e6"
                          : "rgba(23, 71, 157, 0.85)",
                      textColor: "rgba(23, 71, 157, 0.85)",
                      trailColor:
                        totalRevenue < 21 && totalRevenue > 10
                          ? "#f9cb67"
                          : totalRevenue < 11 && totalRevenue > 0
                          ? "#FFBF00"
                          : totalRevenue < 0
                          ? "#dc3545e6"
                          : "#38b6ff",

                      backgroundColor: "#FFE5D3",

                      textSize: "14px",
                      // height: "25px",
                    })}
                  />
                  {proposeRatePence <= 0 && (
                    <small className="pb-4">
                      * Add transaction charge to increase revenue
                    </small>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <button
          className="btn btn-primary mt-4"
          onClick={() => navigate(`/cost-analysis`)}
        >
          Back
        </button>
      </div>
    </>
  );
};

export default UpdatedRevenueCalculation;
