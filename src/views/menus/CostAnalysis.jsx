import React, { useEffect, useState } from "react";
import costImg from "../../assets/img/Group.png";
import { useDispatch, useSelector } from "react-redux";
import {
  GetLeadsnput,
  SetLeadsStatusFalse,
  SetLeadsTypeStatusFalse,
} from "../accounts/Leads/_redux/action/LeadAction";
import Modal from "react-bootstrap/Modal";
import "./Menu.css";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

import { useNavigate } from "react-router-dom";

import { GetAllProductList } from "../common/_redux/action/CommonAction";

import { showToast } from "src/utils/ToastHelper";

import CostAnalysisContainer from "./CostAnalysisContainer";
import Cookies from "js-cookie"; // Import js-cookie
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
      // position: 'top' as const,
    },
    
  },
};

const labels = [
  "VISA Debit",
  "Mastercard Debit",
  "VISA Credit",
  "Mastercard Credit",
  "Visa Business Debit",
  "Mastercard Business",
  "Visa Business Credit",
  "Mastercard Corporate",
  "All Non-EEA Visa",
  "All Non-EEA Mastercard",
  "Auth Fees",
  "Per Transactional Charge",
  "Portal Reporting",
  "PCI DSS Fees",
  "Terminal Rental",
];

export default function CostAnalysis() {
  const [atv, setAtv] = useState(0);
  const [cardTurnover, setCardTurnover] = useState(0);
  const [rentingFromElav, setRentingFromElav] = useState("no");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const allProductList = useSelector(
    (state) => state.commonInfo.allProductList
  );

  // const leadQualify = useSelector((state) => state.leadInfo.leadQualify);
  React.useEffect(() => {
    const is_ps_logged_in = Cookies.get("is_ps_logged_in") || "false";
  

    if (is_ps_logged_in === "false") {
      // history.push("/my_business");
      navigate("/login");
    }
    dispatch(SetLeadsStatusFalse());
    dispatch(SetLeadsTypeStatusFalse());
  }, []);
  useEffect(() => {
    dispatch(
      GetAllProductList(
        `${process.env.REACT_APP_BASE_URL}api/v1/product/product/`
      )
    );
  }, []);

  // ------------tanni---------------

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [visaDabitCc, setVisaDebitCc] = useState(0);
  const [visaDabitPc, setVisaDebitPc] = useState(0);
  

  const [visaDabit, setVisaDabit] = useState({
    visa_debit_cr: "0.450",
    visa_debit_pr: "0.350",
    visa_debit_ts: "0",
    visa_debit_no_tr: 0,
  });
  const visa_debit_cc = (
    (visaDabit?.visa_debit_cr * visaDabit?.visa_debit_ts) /
    100
  ).toFixed(3);

  const visa_debit_pc = (
    (visaDabit?.visa_debit_pr * visaDabit?.visa_debit_ts) /
    100
  ).toFixed(3);
  useEffect(() => {
    const visa_debit_cc =
      (visaDabit?.visa_debit_cr * visaDabit?.visa_debit_ts) / 100;

    const visa_debit_pc =
      (visaDabit?.visa_debit_pr * visaDabit?.visa_debit_ts) / 100;

    setVisaDebitCc(visa_debit_cc);
    setVisaDebitPc(visa_debit_pc);
  }, [visaDabitCc, visaDabitPc, visaDabit]);



  const [masterDabit, setMasterDabit] = useState({
    master_debit_cr: "0.480",
    master_debit_pr: "0.480",
    master_debit_ts: 0,
    master_debit_no_tr: 0,
  });
  // master debit
  const master_debit_cc = (
    (masterDabit?.master_debit_cr * masterDabit?.master_debit_ts) /
    100
  ).toFixed(3);

  const master_debit_pc = (
    (masterDabit?.master_debit_pr * masterDabit?.master_debit_ts) /
    100
  ).toFixed(3);

  const [visaCredit, setVisaCredit] = useState({
    visa_credit_cr: "0.690",
    visa_credit_pr: "0.690",
    visa_credit_ts: 0,
    visa_credit_no_tr: 0,
  });
  // visa credit
  const visa_credit_cc = (
    (visaCredit?.visa_credit_cr * visaCredit?.visa_credit_ts) /
    100
  ).toFixed(3);

  const visa_credit_pc = (
    (visaCredit?.visa_credit_pr * visaCredit?.visa_credit_ts) /
    100
  ).toFixed(3);

  const [mastercardCredit, setMastercardCredit] = useState({
    mastercard_credit_cr: "0.690",
    mastercard_credit_pr: "0.690",
    mastercard_credit_ts: 0,
    mastercard_credit_no_tr: 0,
  });
  // masterCredit
  const mastercard_credit_cc = (
    (mastercardCredit?.mastercard_credit_cr *
      mastercardCredit?.mastercard_credit_ts) /
    100
  ).toFixed(3);

  const mastercard_credit_pc = (
    (mastercardCredit?.mastercard_credit_pr *
      mastercardCredit?.mastercard_credit_ts) /
    100
  ).toFixed(3);

  const [visaBusinessDebit, setVisaBusinessDebit] = useState({
    visa_business_debit_cr: "0.000",
    visa_business_debit_pr: "0.000",
    visa_business_debit_ts: 0,
    visa_business_debit_no_tr: 0,
  });
  // visa business debit
  const visa_business_debit_cc = (
    (visaBusinessDebit?.visa_business_debit_cr *
      visaBusinessDebit?.visa_business_debit_ts) /
    100
  ).toFixed(3);

  const visa_business_debit_pc = (
    (visaBusinessDebit?.visa_business_debit_pr *
      visaBusinessDebit?.visa_business_debit_ts) /
    100
  ).toFixed(3);

  const [visaBusinessCredit, setVisaBusinessCredit] = useState({
    visa_business_credit_cr: "2.100",
    visa_business_credit_pr: "2.100",
    visa_business_credit_ts: 0,
    visa_business_credit_no_tr: 0,
  });
  // visa business credit
  const visa_business_credit_cc = (
    (visaBusinessCredit?.visa_business_credit_cr *
      visaBusinessCredit?.visa_business_credit_ts) /
    100
  ).toFixed(3);

  const visa_business_credit_pc = (
    (visaBusinessCredit?.visa_business_credit_pr *
      visaBusinessCredit?.visa_business_credit_ts) /
    100
  ).toFixed(3);

  const handleFilterInput = (e, setState) => {
    const InputName = e.target.name;
    const Inputval = parseFloat(e.target.value);
    setState((previous_values) => {
      return { ...previous_values, [InputName]: Inputval };
    });
  };
  const [mastercardBusiness, setMastercardBusiness] = useState({
    mastercard_business_cr: "0.000",
    mastercard_business_pr: "0.000",
    mastercard_business_ts: 0,
    mastercard_business_no_tr: 0,
  });
  // mastercard bsiness
  const mastercard_business_cc = (
    (mastercardBusiness?.mastercard_business_cr *
      mastercardBusiness?.mastercard_business_ts) /
    100
  ).toFixed(3);

  const mastercard_business_pc = (
    (mastercardBusiness?.mastercard_business_pr *
      mastercardBusiness?.mastercard_business_ts) /
    100
  ).toFixed(3);

  // master corporate
  const [mastercardCorporate, setMastercardCorporate] = useState({
    mastercard_corporate_cr: "0.000",
    mastercard_corporate_pr: "0.000",
    mastercard_corporate_ts: 0,
    mastercard_corporate_no_tr: 0,
  });
  // master corporate
  const mastercard_corporate_cc = (
    (mastercardCorporate?.mastercard_corporate_cr *
      mastercardCorporate?.mastercard_corporate_ts) /
    100
  ).toFixed(3);

  const mastercard_corporate_pc = (
    (mastercardCorporate?.mastercard_corporate_pr *
      mastercardCorporate?.mastercard_corporate_ts) /
    100
  ).toFixed(3);

  // ===============non eea start
  const [noneeaVisa, setNoneeaVisa] = useState({
    noneea_visa_cr: "0.000",
    noneea_visa_pr: "0.000",
    noneea_visa_ts: 0,
    noneea_visa_no_tr: 0,
  });

  const noneea_visa_cc = (
    (noneeaVisa?.noneea_visa_cr * noneeaVisa?.noneea_visa_ts) /
    100
  ).toFixed(3);

  const noneea_visa_pc = (
    (noneeaVisa?.noneea_visa_pr * noneeaVisa?.noneea_visa_ts) /
    100
  ).toFixed(3);

  // ===============non eea end
  // ================non eea master start
  const [noneeaMastercard, setNoneeaMastercard] = useState({
    noneea_mastercard_cr: "0.000",
    noneea_mastercard_pr: "0.000",
    noneea_mastercard_ts: 0,
    noneea_mastercard_no_tr: 0,
  });

  const noneea_mastercard_cc = (
    (noneeaMastercard?.noneea_mastercard_cr *
      noneeaMastercard?.noneea_mastercard_ts) /
    100
  ).toFixed(3);

  const noneea_mastercard_pc = (
    (noneeaMastercard?.noneea_mastercard_pr *
      noneeaMastercard?.noneea_mastercard_ts) /
    100
  ).toFixed(3);

  // ================non eea master end
  // ================amex start
  const [amex, setamex] = useState({
    amex_cr: "0.000",
    amex_sr: "1.900",
    amex_ts: "0",
    amex_tr_no: 0,
  });

  const amex_card_cc = ((amex?.amex_cr * amex?.amex_ts) / 100).toFixed(3);

  const amex_card_ps = ((amex?.amex_sr * amex?.amex_ts) / 100).toFixed(3);

  // ================amex end
  // auth fees start
  const [authFees, setAuthFees] = useState({
    auth_fees_cr: 0.015,
    auth_fees_pr: 0.015,
    auth_fees_no_tr: 0,
    auth_fees_ts: 0,
  });
  const auth_fees_cc = (
    authFees?.auth_fees_cr * authFees?.auth_fees_no_tr
  ).toFixed(3);

  const auth_fees_pc = (
    authFees?.auth_fees_pr * authFees?.auth_fees_no_tr
  ).toFixed(3);

  // auth fees end
  // =========number of tranction start
  const [perTrCrg, setPerTrCrg] = useState({
    per_tr_crg_cr: "0.000",
    per_tr_crg_pr: "0.000",
    per_tr_crg_no_tr: 0.0,
    per_tr_crg_ts: 0.0,
  });
  const per_tr_crg_cc = (
    perTrCrg?.per_tr_crg_cr * perTrCrg?.per_tr_crg_no_tr
  ).toFixed(3);
  const per_tr_crg_pc = (
    perTrCrg?.per_tr_crg_pr * perTrCrg?.per_tr_crg_no_tr
  ).toFixed(3);
  
  // =========number of tranction start
  // =============portal reporting start
  const [portalReporting, setPortalReporting] = useState({
    portal_reporting_cr: "0.000",
    portal_reporting_pr: "0.000",
    portal_reporting_no_tr: 0,
    portal_reporting_ts: 0,
  });
  const portal_reporting_cc =
    portalReporting?.portal_reporting_cr !== 0
      ? (parseFloat(portalReporting?.portal_reporting_cr) * 1).toFixed(3)
      : 0.0;
  const portal_reporting_pc =
    portalReporting?.portal_reporting_pr !== 0
      ? (parseFloat(portalReporting?.portal_reporting_pr) * 1).toFixed(3)
      : 0.0;
  // =============portal reporting end
  // =============pci dss=========
  const [pciDss, setPciDss] = useState({
    pci_dss_cr: "0.000",
    pci_dss_pr: "0.000",
    pci_dss_no_tr: 0,
    pci_dss_ts: 0,
  });
  const pci_dss_cc =
    pciDss?.pci_dss_cr !== 0
      ? (parseFloat(pciDss?.pci_dss_cr) * 1).toFixed(3)
      : 0.0;

  const pci_dss_pc =
    pciDss?.pci_dss_pr !== 0
      ? (parseFloat(pciDss?.pci_dss_pr) * 1).toFixed(3)
      : 0.0;
  // =============pci dss=========
  const [terminalRental, setTerminalRental] = useState({
    terminal_rental_cr: "0.000",
    terminal_rental_pr: "0.000",
  });
  const [terminalCount, setTerminalCount] = useState(0);
  const [crTerminal, setCrTerminal] = useState(0);
  const [prTerminal, setPrTerminal] = useState(0);

  const terminal_rental_cc = (
    parseFloat(terminalRental?.terminal_rental_cr) *
    parseFloat(terminalCount) *
    1
  ).toFixed(3);
  const terminal_rental_pc = (
    parseFloat(terminalRental?.terminal_rental_pr) *
    parseFloat(terminalCount) *
    1
  ).toFixed(3);

  // ====================total===========
  const [totalCurrentCost, setTotalCurentCost] = useState(0);
  useEffect(() => {
    const total_cc =
      parseFloat(visa_debit_cc) +
      parseFloat(noneea_visa_cc) +
      parseFloat(noneea_mastercard_cc) +
      parseFloat(auth_fees_cc) +
      parseFloat(per_tr_crg_cc) +
      parseFloat(portal_reporting_cc) +
      parseFloat(pci_dss_cc) +
      parseFloat(terminal_rental_cc) +
      parseFloat(master_debit_cc) +
      parseFloat(visa_credit_cc) +
      parseFloat(mastercard_credit_cc) +
      parseFloat(visa_business_debit_cc) +
      parseFloat(mastercard_business_cc) +
      parseFloat(visa_business_credit_cc) +
      parseFloat(amex_card_cc) +
      parseFloat(mastercard_corporate_cc);
    setTotalCurentCost(total_cc);
  }, [
    visa_debit_cc,
    visaDabitCc,
    noneea_visa_cc,
    noneea_mastercard_cc,
    auth_fees_cc,
    per_tr_crg_cc,
    portal_reporting_cc,
    pci_dss_cc,
    terminal_rental_cc,
    master_debit_cc,
    visa_credit_cc,
    mastercard_credit_cc,
    visa_business_debit_cc,
    mastercard_business_cc,
    visa_business_credit_cc,
    mastercard_corporate_cc,
    amex_card_cc,
  ]);

  const total_pc =
    parseFloat(visa_debit_pc) +
    parseFloat(noneea_visa_pc) +
    parseFloat(noneea_mastercard_pc) +
    parseFloat(auth_fees_pc) +
    parseFloat(per_tr_crg_pc) +
    parseFloat(portal_reporting_pc) +
    parseFloat(pci_dss_pc) +
    parseFloat(terminal_rental_pc) +
    parseFloat(master_debit_pc) +
    parseFloat(visa_credit_pc) +
    parseFloat(mastercard_credit_pc) +
    parseFloat(visa_business_debit_pc) +
    parseFloat(mastercard_business_pc) +
    parseFloat(visa_business_credit_pc) +
    parseFloat(mastercard_corporate_pc) +
    parseFloat(amex_card_ps);

  const percent =
    ((totalCurrentCost - total_pc) / totalCurrentCost) * 100 !== NaN
      ? ((totalCurrentCost - total_pc) / totalCurrentCost) * 100
      : 0;
  console.log(
    "total_cc",
    totalCurrentCost,
    visa_debit_cc,
    master_debit_cc,
    visa_credit_cc
  );
  const variables = [
    visaDabitCc,
    master_debit_cc,
    visa_credit_cc,
    mastercard_credit_cc,
    visa_business_debit_cc,
    mastercard_business_cc,
    visa_business_credit_cc,
    mastercard_corporate_cc,
    noneea_visa_cc,
    noneea_mastercard_cc,
    auth_fees_cc,
    per_tr_crg_cc,
    portal_reporting_cc,
    pci_dss_cc,
    terminal_rental_cc,
    amex_card_cc,
  ];
  const updatedVariables1 = variables.map((variable) => parseFloat(variable));
  useEffect(() => {
    dispatch(GetLeadsnput("updatedVariables1", updatedVariables1));
  }, [updatedVariables1]);

  const variable2 = [
    visaDabitPc,
    master_debit_pc,
    visa_credit_pc,
    mastercard_credit_pc,
    visa_business_debit_pc,
    mastercard_business_pc,
    visa_business_credit_pc,
    mastercard_corporate_pc,
    noneea_visa_pc,
    noneea_mastercard_pc,
    amex_card_ps,
    auth_fees_pc,
    per_tr_crg_pc,
    portal_reporting_pc,
    pci_dss_pc,
    terminal_rental_pc,
  ];
  const updatedVariables2 = variable2.map((variable) => parseFloat(variable));
  useEffect(() => {
    dispatch(GetLeadsnput("updatedVariables2", updatedVariables2));
  }, [updatedVariables2]);
  const chartData = {
    labels,
    datasets: [
      {
        fill: true,
        label: "Current Cost",
        data: updatedVariables1,
        borderColor: "rgb(229, 83, 83)",
        backgroundColor: "rgba(229, 83, 83, 0)",
      },
      {
        fill: true,
        label: "Paymentsave Cost",
        data: updatedVariables2,

        borderColor: "rgb(0, 86, 145)",
        backgroundColor: "rgba(0, 86, 145, 0)",
      },
    ],
  };

  const getDataForRevineue = () => {
    if (atv < 1 || cardTurnover < 1) {
      showToast("error", "Enter Valid Data");
    }
    //  else if (cardTurnover * 12 >= 2000000) {
    //   showToast("error", "Enter Valid Data");
    // }
    else {
      dispatch(GetLeadsnput("atv", atv));
      dispatch(GetLeadsnput("annual_card_turnover", cardTurnover));
      dispatch(GetLeadsnput("renting_elavon_terminals", rentingFromElav));
      localStorage.setItem("atv", atv);
      localStorage.setItem("cardTurnover", cardTurnover);
      localStorage.setItem("rentingFromElavon", rentingFromElav);
      showToast("success", "Valid Data Added.");
      navigate("/revenue-calculator");
    }
  };
  // =================tanni: data add to redux for export pdf==================
  // Visa debit
  useEffect(() => {
    dispatch(GetLeadsnput("visa_debit_cr", visaDabit.visa_debit_cr));
    dispatch(GetLeadsnput("visa_debit_pr", visaDabit.visa_debit_pr));
    dispatch(GetLeadsnput("visa_debit_ts", visaDabit.visa_debit_ts));
    // dispatch(GetLeadsnput("visa_debit_no_tr", visaDabit.visa_debit_no_tr));
    dispatch(GetLeadsnput("visa_debit_cc", visa_debit_cc));
    dispatch(GetLeadsnput("visa_debit_pc", visa_debit_pc));
    // dispatch(GetLeadsnput("visa_debit_cc", visaDabitCc.toFixed(3)));
    // dispatch(GetLeadsnput("visa_debit_pc", visaDabitPc.toFixed(3)));
  }, [visaDabit, visaDabitCc, visaDabitPc]);

  // master debit
  useEffect(() => {
    dispatch(GetLeadsnput("mastercard_debit_cr", masterDabit.master_debit_cr));
    dispatch(GetLeadsnput("mastercard_debit_pr", masterDabit.master_debit_pr));
    dispatch(GetLeadsnput("mastercard_debit_ts", masterDabit.master_debit_ts));
    // dispatch(
    //   GetLeadsnput("master_debit_no_tr", masterDabit.master_debit_no_tr)
    // );
    dispatch(GetLeadsnput("mastercard_debit_cc", master_debit_cc));
    dispatch(GetLeadsnput("mastercard_debit_pc", master_debit_pc));
  }, [masterDabit, master_debit_pc, master_debit_cc]);
  // visa credit
  useEffect(() => {
    dispatch(GetLeadsnput("visa_credit_cr", visaCredit.visa_credit_cr));
    dispatch(GetLeadsnput("visa_credit_pr", visaCredit.visa_credit_pr));
    dispatch(GetLeadsnput("visa_credit_ts", visaCredit.visa_credit_ts));
    dispatch(GetLeadsnput("visa_credit_no_tr", visaCredit.visa_credit_no_tr));
    dispatch(GetLeadsnput("visa_credit_cc", visa_credit_cc));
    dispatch(GetLeadsnput("visa_credit_pc", visa_credit_pc));
  }, [visaCredit, visa_credit_pc, visa_credit_cc]);

  // mastercard credit
  useEffect(() => {
    dispatch(
      GetLeadsnput(
        "mastercard_credit_cr",
        mastercardCredit.mastercard_credit_cr
      )
    );
    dispatch(
      GetLeadsnput(
        "mastercard_credit_pr",
        mastercardCredit.mastercard_credit_pr
      )
    );
    dispatch(
      GetLeadsnput(
        "mastercard_credit_ts",
        mastercardCredit.mastercard_credit_ts
      )
    );
    // dispatch(
    //   GetLeadsnput(
    //     "mastercard_credit_no_tr",
    //     mastercardCredit.mastercard_credit_no_tr
    //   )
    // );
    dispatch(GetLeadsnput("mastercard_credit_cc", mastercard_credit_cc));
    dispatch(GetLeadsnput("mastercard_credit_pc", mastercard_credit_pc));
  }, [mastercardCredit, mastercard_credit_pc, mastercard_credit_cc]);

  //visa business debit
  useEffect(() => {
    dispatch(
      GetLeadsnput(
        "visa_business_debit_cr",
        visaBusinessDebit.visa_business_debit_cr
      )
    );
    dispatch(
      GetLeadsnput(
        "visa_business_debit_pr",
        visaBusinessDebit.visa_business_debit_pr
      )
    );
    dispatch(
      GetLeadsnput(
        "visa_business_debit_ts",
        visaBusinessDebit.visa_business_debit_ts
      )
    );

    dispatch(GetLeadsnput("visa_business_debit_cc", visa_business_debit_cc));
    dispatch(GetLeadsnput("visa_business_debit_pc", visa_business_debit_pc));
  }, [visaBusinessDebit, visa_business_debit_pc, visa_business_debit_cc]);

  //visa business credit
  useEffect(() => {
    dispatch(
      GetLeadsnput(
        "visa_business_credit_cr",
        visaBusinessCredit.visa_business_credit_cr
      )
    );
    dispatch(
      GetLeadsnput(
        "visa_business_credit_pr",
        visaBusinessCredit.visa_business_credit_pr
      )
    );
    dispatch(
      GetLeadsnput(
        "visa_business_credit_ts",
        visaBusinessCredit.visa_business_credit_ts
      )
    );

    dispatch(GetLeadsnput("visa_business_credit_cc", visa_business_credit_cc));
    dispatch(GetLeadsnput("visa_business_credit_pc", visa_business_credit_pc));
  }, [visaBusinessCredit, visa_business_credit_pc, visa_business_credit_cc]);

  // mastercard bsiness
  useEffect(() => {
    dispatch(
      GetLeadsnput(
        "mastercard_business_cr",
        mastercardBusiness.mastercard_business_cr
      )
    );
    dispatch(
      GetLeadsnput(
        "mastercard_business_pr",
        mastercardBusiness.mastercard_business_pr
      )
    );
    dispatch(
      GetLeadsnput(
        "mastercard_business_ts",
        mastercardBusiness.mastercard_business_ts
      )
    );

    dispatch(GetLeadsnput("mastercard_business_cc", mastercard_business_cc));
    dispatch(GetLeadsnput("mastercard_business_pc", mastercard_business_pc));
  }, [mastercardBusiness, mastercard_business_pc, mastercard_business_cc]);

  // mastercard corporate
  useEffect(() => {
    dispatch(
      GetLeadsnput(
        "mastercard_corporate_cr",
        mastercardCorporate.mastercard_corporate_cr
      )
    );
    dispatch(
      GetLeadsnput(
        "mastercard_corporate_pr",
        mastercardCorporate.mastercard_corporate_pr
      )
    );
    dispatch(
      GetLeadsnput(
        "mastercard_corporate_ts",
        mastercardCorporate.mastercard_corporate_ts
      )
    );

    dispatch(GetLeadsnput("mastercard_corporate_cc", mastercard_corporate_cc));
    dispatch(GetLeadsnput("mastercard_corporate_pc", mastercard_corporate_pc));
  }, [mastercardCorporate, mastercard_corporate_pc, mastercard_corporate_cc]);

  // authorisation fee
  useEffect(() => {
    dispatch(GetLeadsnput("authorization_fee_cr", authFees.auth_fees_cr));
    dispatch(GetLeadsnput("authorization_fee_pr", authFees.auth_fees_pr));
    dispatch(GetLeadsnput("authorization_fee_tr_no", authFees.auth_fees_no_tr));
    // dispatch(GetLeadsnput("auth_fees_ts", authFees.auth_fees_ts));
    dispatch(GetLeadsnput("authorization_fee_cc", auth_fees_cc));
    dispatch(GetLeadsnput("authorization_fee_pc", auth_fees_pc));
  }, [authFees, auth_fees_pc, auth_fees_cc]);

  // savings
  useEffect(() => {
    dispatch(GetLeadsnput("totalCurrentCost", totalCurrentCost.toFixed(3)));
    // dispatch(GetLeadsnput("totalCurrentCost", totalCurrentCost.toFixed(3)));
    dispatch(GetLeadsnput("total_pc", total_pc.toFixed(3)));
    dispatch(GetLeadsnput("percent", percent.toFixed(3)));
  }, [total_pc, totalCurrentCost, percent]);

  // non eea start
  useEffect(() => {
    dispatch(
      GetLeadsnput("all_non_eea_visa_fee_cr", noneeaVisa.noneea_visa_cr)
    );
    dispatch(
      GetLeadsnput("all_non_eea_visa_fee_pr", noneeaVisa.noneea_visa_pr)
    );
    dispatch(
      GetLeadsnput("all_non_eea_visa_fee_ts", noneeaVisa.noneea_visa_ts)
    );

    dispatch(GetLeadsnput("all_non_eea_visa_fee_cc", noneea_visa_cc));
    dispatch(GetLeadsnput("all_non_eea_visa_fee_pc", noneea_visa_pc));
  }, [noneeaVisa, noneea_visa_pc, noneea_visa_cc]);

  // non eea master start
  useEffect(() => {
    dispatch(
      GetLeadsnput(
        "all_non_eea_mastercard_fee_cr",
        noneeaMastercard.noneea_mastercard_cr
      )
    );
    dispatch(
      GetLeadsnput(
        "all_non_eea_mastercard_fee_pr",
        noneeaMastercard.noneea_mastercard_pr
      )
    );
    dispatch(
      GetLeadsnput(
        "all_non_eea_mastercard_fee_ts",
        noneeaMastercard.noneea_mastercard_ts
      )
    );

    dispatch(
      GetLeadsnput("all_non_eea_mastercard_fee_cc", noneea_mastercard_cc)
    );
    dispatch(
      GetLeadsnput("all_non_eea_mastercard_fee_pc", noneea_mastercard_pc)
    );
    dispatch(GetLeadsnput("amex_cc", amex_card_cc));
    dispatch(GetLeadsnput("amex_pc", amex_card_ps));

    dispatch(GetLeadsnput("amex_cr", amex.amex_cr));
    dispatch(GetLeadsnput("amex_sr", amex.amex_sr));
    dispatch(GetLeadsnput("amex_ts", amex.amex_ts));

    dispatch(
      GetLeadsnput("all_non_eea_mastercard_fee_cc", noneea_mastercard_cc)
    );
    dispatch(
      GetLeadsnput("all_non_eea_mastercard_fee_pc", noneea_mastercard_pc)
    );
  }, [
    noneeaMastercard,
    noneea_mastercard_pc,
    noneea_mastercard_cc,
    amex_card_cc,
    amex_card_ps,
    amex,
  ]);

  // number of tranction start
  useEffect(() => {
    dispatch(
      GetLeadsnput("per_transactional_charge_cr", perTrCrg.per_tr_crg_cr)
    );
    dispatch(
      GetLeadsnput("per_transactional_charge_pr", perTrCrg.per_tr_crg_pr)
    );
    dispatch(
      GetLeadsnput("per_transactional_charge_tr_no", perTrCrg.per_tr_crg_no_tr)
    );

    dispatch(GetLeadsnput("per_transactional_charge_cc", per_tr_crg_cc));
    dispatch(GetLeadsnput("per_transactional_charge_pc", per_tr_crg_pc));
  }, [perTrCrg, per_tr_crg_pc, per_tr_crg_cc]);

  //=portal reporting start
  useEffect(() => {
    dispatch(
      GetLeadsnput(
        "portal_reporting_fee_cr",
        portalReporting.portal_reporting_cr
      )
    );
    dispatch(
      GetLeadsnput(
        "portal_reporting_fee_pr",
        portalReporting.portal_reporting_pr
      )
    );
    dispatch(
      GetLeadsnput(
        "portal_reporting_fee_tr_no",
        portalReporting.portal_reporting_no_tr
      )
    );
    dispatch(
      GetLeadsnput(
        "portal_reporting_fee_ts",
        portalReporting.portal_reporting_ts
      )
    );

    dispatch(GetLeadsnput("portal_reporting_fee_cc", portal_reporting_cc));
    dispatch(GetLeadsnput("portal_reporting_fee_pc", portal_reporting_pc));
  }, [portalReporting, portal_reporting_pc, portal_reporting_cc]);

  // =============pci dss=========
  useEffect(() => {
    dispatch(GetLeadsnput("pci_dss_fee_cr", pciDss.pci_dss_cr));
    dispatch(GetLeadsnput("pci_dss_fee_pr", pciDss.pci_dss_pr));
    dispatch(GetLeadsnput("pci_dss_fee_tr_no", pciDss.pci_dss_no_tr));
    dispatch(GetLeadsnput("pci_dss_fee_ts", pciDss.pci_dss_ts));

    dispatch(GetLeadsnput("pci_dss_fee_cc", pci_dss_cc));
    dispatch(GetLeadsnput("pci_dss_fee_pc", pci_dss_pc));
  }, [pciDss, pci_dss_pc, pci_dss_cc]);
  // =============rental terminal=========
  useEffect(() => {
    dispatch(
      GetLeadsnput("terminal_rental_fee_cr", terminalRental.terminal_rental_cr)
    );
    dispatch(
      GetLeadsnput("terminal_rental_fee_pr", terminalRental.terminal_rental_pr)
    );
    dispatch(GetLeadsnput("num_of_terminals", terminalCount));
    dispatch(GetLeadsnput("terminal_provider_pervious", crTerminal));
    dispatch(GetLeadsnput("terminal_provider_current", prTerminal));

    dispatch(GetLeadsnput("terminal_rental_fee_cc", terminal_rental_cc));
    dispatch(GetLeadsnput("terminal_rental_fee_pc", terminal_rental_pc));
  }, [
    terminalRental,
    terminal_rental_pc,
    terminal_rental_cc,
    crTerminal,
    prTerminal,
    terminalCount,
  ]);

  return (
    <div>
      <CostAnalysisContainer />
      <div className="row">
        <div className="col-12 col-md-6 mt-3 mb-4">
          <h3 style={{ color: "#3C4B64" }}>
            <img src={costImg} width="24" className="me-2" alt="" />
            Cost Analysis
          </h3>
        </div>
        <div className="col-md-12 cost">
          {/* <!-- <h2><img src="../../assets/img/list-document-interface-symbol.svg" alt="" width="25px" /> Table</h2> --> */}
          <div className="table-responsive">
            <table className="table table-striped number-center ">
              <thead>
                <tr>
                  <th className="col-1">Card Type</th>
                  <th className="col-1">Current Rate</th>
                  <th className="col-1">Paymentsave Rate</th>
                  <th className="col-1">{/* Total Sale */} Monthly Turnover</th>
                  <th className="col-1">Number of Transactions</th>
                  <th className="col-1" style={{ minWidth: "120px" }}>
                    Current Cost
                  </th>
                  <th className="col-1">Paymentsave Cost</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ fontWeight: "600px", textAlign: "start" }}>
                    {" "}
                    VISA Debit (Personal)
                  </td>
                  <td>
                    <input
                      min={0}
                      name="visa_debit_cr"
                      onChange={(e) => handleFilterInput(e, setVisaDabit)}
                      value={visaDabit["visa_debit_cr"]}
                      type="number"
                      className="form-control"
                      placeholder="%"
                    />
                  </td>
                  <td>
                    <input
                      onWheel={(e) => e.target.blur()}
                      min={0}
                      name="visa_debit_pr"
                      onChange={(e) => handleFilterInput(e, setVisaDabit)}
                      value={visaDabit?.visa_debit_pr}
                      type="number"
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      onWheel={(e) => e.target.blur()}
                      type="number"
                      className="form-control"
                      placeholder="£"
                      min={0}
                      name="visa_debit_ts"
                      onChange={(e) => handleFilterInput(e, setVisaDabit)}
                      value={visaDabit["visa_debit_ts"]}
                    />
                  </td>
                  <td>
                    <input type="number" className="form-control" disabled />
                  </td>
                  <td style={{ background: "#e55353" }}>
                    <input
                      onWheel={(e) => e.target.blur()}
                      type="text"
                      className="form-control"
                      placeholder="£"
                      value={visa_debit_cc}
                      // value={visa_debit_cc.toFixed(3)}
                    />
                  </td>
                  <td style={{ background: "#005691" }}>
                    <input
                      onWheel={(e) => e.target.blur()}
                      type="text"
                      className="form-control"
                      placeholder="£"
                      value={visa_debit_pc}
                    />
                  </td>
                </tr>
                <tr>
                  <td style={{ fontWeight: "600px", textAlign: "start" }}>
                    Mastercard Debit
                  </td>
                  <td>
                    <input
                      onWheel={(e) => e.target.blur()}
                      type="number"
                      className="form-control"
                      placeholder="%"
                      min={0}
                      name="master_debit_cr"
                      onChange={(e) => handleFilterInput(e, setMasterDabit)}
                      value={masterDabit["master_debit_cr"]}
                    />
                  </td>
                  <td>
                    <input
                      onWheel={(e) => e.target.blur()}
                      name="master_debit_pr"
                      onChange={(e) => handleFilterInput(e, setMasterDabit)}
                      value={masterDabit["master_debit_pr"]}
                      type="number"
                      className="form-control"
                      min={0}
                    />
                  </td>
                  <td>
                    <input
                      onWheel={(e) => e.target.blur()}
                      type="number"
                      className="form-control"
                      placeholder="£"
                      name="master_debit_ts"
                      onChange={(e) => handleFilterInput(e, setMasterDabit)}
                      value={masterDabit["master_debit_ts"]}
                      min={0}
                    />
                  </td>
                  <td>
                    <input
                      onWheel={(e) => e.target.blur()}
                      type="number"
                      className="form-control"
                      disabled
                    />
                  </td>
                  <td style={{ background: "#e55353" }}>
                    <input
                      onWheel={(e) => e.target.blur()}
                      type="text"
                      className="form-control"
                      placeholder="£"
                      value={master_debit_cc}
                    />
                  </td>
                  <td style={{ background: "#005691" }}>
                    <input
                      onWheel={(e) => e.target.blur()}
                      type="text"
                      className="form-control"
                      placeholder="£"
                      value={master_debit_pc}
                    />
                  </td>
                </tr>
                <tr>
                  <td style={{ fontWeight: "600px", textAlign: "start" }}>
                    VISA Credit (Personal)
                  </td>
                  <td>
                    <input
                      onWheel={(e) => e.target.blur()}
                      type="number"
                      className="form-control"
                      placeholder="%"
                      min={0}
                      name="visa_credit_cr"
                      onChange={(e) => handleFilterInput(e, setVisaCredit)}
                      value={visaCredit["visa_credit_cr"]}
                    />
                  </td>
                  <td>
                    <input
                      onWheel={(e) => e.target.blur()}
                      min={0}
                      name="visa_credit_pr"
                      onChange={(e) => handleFilterInput(e, setVisaCredit)}
                      value={visaCredit["visa_credit_pr"]}
                      type="number"
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      onWheel={(e) => e.target.blur()}
                      type="number"
                      className="form-control"
                      placeholder="£"
                      min={0}
                      name="visa_credit_ts"
                      onChange={(e) => handleFilterInput(e, setVisaCredit)}
                      value={visaCredit["visa_credit_ts"]}
                    />
                  </td>
                  <td>
                    <input type="number" className="form-control" disabled />
                  </td>
                  <td style={{ background: "#e55353" }}>
                    <input
                      onWheel={(e) => e.target.blur()}
                      type="text"
                      className="form-control"
                      placeholder="£"
                      value={visa_credit_cc}
                    />
                  </td>
                  <td style={{ background: "#005691" }}>
                    <input
                      onWheel={(e) => e.target.blur()}
                      type="text"
                      className="form-control"
                      placeholder="£"
                      value={visa_credit_pc}
                    />
                  </td>
                </tr>
                <tr>
                  <td style={{ fontWeight: "600px", textAlign: "start" }}>
                    Mastercard Credit
                  </td>
                  <td>
                    <input
                      onWheel={(e) => e.target.blur()}
                      type="number"
                      className="form-control"
                      placeholder="%"
                      min={0}
                      name="mastercard_credit_cr"
                      onChange={(e) =>
                        handleFilterInput(e, setMastercardCredit)
                      }
                      value={mastercardCredit["mastercard_credit_cr"]}
                    />
                  </td>
                  <td>
                    <input
                      onWheel={(e) => e.target.blur()}
                      min={0}
                      name="mastercard_credit_pr"
                      onChange={(e) =>
                        handleFilterInput(e, setMastercardCredit)
                      }
                      value={mastercardCredit["mastercard_credit_pr"]}
                      type="number"
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      onWheel={(e) => e.target.blur()}
                      type="number"
                      className="form-control"
                      placeholder="£"
                      min={0}
                      name="mastercard_credit_ts"
                      onChange={(e) =>
                        handleFilterInput(e, setMastercardCredit)
                      }
                      value={mastercardCredit["mastercard_credit_ts"]}
                    />
                  </td>
                  <td>
                    <input
                      onWheel={(e) => e.target.blur()}
                      type="number"
                      className="form-control"
                      disabled
                    />
                  </td>
                  <td style={{ background: "#e55353" }}>
                    <input
                      onWheel={(e) => e.target.blur()}
                      type="text"
                      className="form-control"
                      placeholder="£"
                      value={mastercard_credit_cc}
                    />
                  </td>
                  <td style={{ background: "#005691" }}>
                    <input
                      onWheel={(e) => e.target.blur()}
                      type="text"
                      className="form-control"
                      placeholder="£"
                      value={mastercard_credit_pc}
                    />
                  </td>
                </tr>
                <tr>
                  <td style={{ fontWeight: "600px", textAlign: "start" }}>
                    Visa Business Debit
                  </td>
                  <td>
                    <input
                      onWheel={(e) => e.target.blur()}
                      type="number"
                      className="form-control"
                      placeholder="%"
                      min={0}
                      name="visa_business_debit_cr"
                      onChange={(e) =>
                        handleFilterInput(e, setVisaBusinessDebit)
                      }
                      value={visaBusinessDebit["visa_business_debit_cr"]}
                    />
                  </td>
                  <td>
                    <input
                      onWheel={(e) => e.target.blur()}
                      type="number"
                      className="form-control"
                      placeholder="%"
                      min={0}
                      name="visa_business_debit_pr"
                      onChange={(e) =>
                        handleFilterInput(e, setVisaBusinessDebit)
                      }
                      value={visaBusinessDebit["visa_business_debit_pr"]}
                    />
                  </td>
                  <td>
                    <input
                      onWheel={(e) => e.target.blur()}
                      type="number"
                      className="form-control"
                      placeholder="£"
                      min={0}
                      name="visa_business_debit_ts"
                      onChange={(e) =>
                        handleFilterInput(e, setVisaBusinessDebit)
                      }
                      value={visaBusinessDebit["visa_business_debit_ts"]}
                    />
                  </td>
                  <td>
                    <input
                      onWheel={(e) => e.target.blur()}
                      type="number"
                      className="form-control"
                      disabled
                    />
                  </td>
                  <td style={{ background: "#e55353" }}>
                    <input
                      onWheel={(e) => e.target.blur()}
                      type="text"
                      className="form-control"
                      placeholder="£"
                      value={visa_business_debit_cc}
                    />
                  </td>
                  <td style={{ background: "#005691" }}>
                    <input
                      onWheel={(e) => e.target.blur()}
                      type="text"
                      className="form-control"
                      placeholder="£"
                      value={visa_business_debit_pc}
                    />
                  </td>
                </tr>
                <tr>
                  <td style={{ fontWeight: "600px", textAlign: "start" }}>
                    Mastercard Business
                  </td>
                  <td>
                    <input
                      onWheel={(e) => e.target.blur()}
                      type="number"
                      className="form-control"
                      placeholder="%"
                      min={0}
                      name="mastercard_business_cr"
                      onChange={(e) =>
                        handleFilterInput(e, setMastercardBusiness)
                      }
                      value={mastercardBusiness["mastercard_business_cr"]}
                    />
                  </td>
                  <td>
                    <input
                      onWheel={(e) => e.target.blur()}
                      type="number"
                      className="form-control"
                      placeholder="%"
                      name="mastercard_business_pr"
                      onChange={(e) =>
                        handleFilterInput(e, setMastercardBusiness)
                      }
                      value={mastercardBusiness["mastercard_business_pr"]}
                    />
                  </td>
                  <td>
                    <input
                      min={0}
                      onWheel={(e) => e.target.blur()}
                      type="number"
                      className="form-control"
                      placeholder="£"
                      name="mastercard_business_ts"
                      onChange={(e) =>
                        handleFilterInput(e, setMastercardBusiness)
                      }
                      value={mastercardBusiness["mastercard_business_ts"]}
                    />
                  </td>
                  <td>
                    <input
                      onWheel={(e) => e.target.blur()}
                      type="number"
                      className="form-control"
                      disabled
                    />
                  </td>
                  <td style={{ background: "#e55353" }}>
                    <input
                      onWheel={(e) => e.target.blur()}
                      type="text"
                      className="form-control"
                      placeholder="£"
                      value={mastercard_business_cc}
                    />
                  </td>
                  <td style={{ background: "#005691" }}>
                    <input
                      onWheel={(e) => e.target.blur()}
                      type="text"
                      className="form-control"
                      placeholder="£"
                      value={mastercard_business_pc}
                    />
                  </td>
                </tr>
                <tr>
                  <td style={{ fontWeight: "600px", textAlign: "start" }}>
                    Visa Business Credit
                  </td>
                  <td>
                    <input
                      onWheel={(e) => e.target.blur()}
                      type="number"
                      className="form-control"
                      placeholder="%"
                      min={0}
                      name="visa_business_credit_cr"
                      onChange={(e) =>
                        handleFilterInput(e, setVisaBusinessCredit)
                      }
                      value={visaBusinessCredit["visa_business_credit_cr"]}
                    />
                  </td>
                  <td>
                    <input
                      onWheel={(e) => e.target.blur()}
                      min={0}
                      name="visa_business_credit_pr"
                      onChange={(e) =>
                        handleFilterInput(e, setVisaBusinessCredit)
                      }
                      value={visaBusinessCredit["visa_business_credit_pr"]}
                      type="number"
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      onWheel={(e) => e.target.blur()}
                      type="number"
                      className="form-control"
                      placeholder="£"
                      min={0}
                      name="visa_business_credit_ts"
                      onChange={(e) =>
                        handleFilterInput(e, setVisaBusinessCredit)
                      }
                      value={visaBusinessCredit["visa_business_credit_ts"]}
                    />
                  </td>
                  <td>
                    <input
                      onWheel={(e) => e.target.blur()}
                      type="number"
                      className="form-control"
                      disabled
                    />
                  </td>
                  <td style={{ background: "#e55353" }}>
                    <input
                      onWheel={(e) => e.target.blur()}
                      type="text"
                      className="form-control"
                      placeholder="£"
                      value={visa_business_credit_cc}
                    />
                  </td>
                  <td style={{ background: "#005691" }}>
                    <input
                      onWheel={(e) => e.target.blur()}
                      type="text"
                      className="form-control"
                      placeholder="£"
                      value={visa_business_credit_pc}
                    />
                  </td>
                </tr>
                <tr>
                  <td style={{ fontWeight: "600px", textAlign: "start" }}>
                    Mastercard Corporate
                  </td>
                  <td>
                    <input
                      onWheel={(e) => e.target.blur()}
                      type="number"
                      className="form-control"
                      placeholder="%"
                      min={0}
                      name="mastercard_corporate_cr"
                      onChange={(e) =>
                        handleFilterInput(e, setMastercardCorporate)
                      }
                      value={mastercardCorporate["mastercard_corporate_cr"]}
                    />
                  </td>
                  <td>
                    <input
                      min={0}
                      onWheel={(e) => e.target.blur()}
                      type="number"
                      className="form-control"
                      placeholder="%"
                      name="mastercard_corporate_pr"
                      onChange={(e) =>
                        handleFilterInput(e, setMastercardCorporate)
                      }
                      value={mastercardCorporate["mastercard_corporate_pr"]}
                    />
                  </td>
                  <td>
                    <input
                      min={0}
                      onWheel={(e) => e.target.blur()}
                      type="number"
                      className="form-control"
                      placeholder="£"
                      name="mastercard_corporate_ts"
                      onChange={(e) =>
                        handleFilterInput(e, setMastercardCorporate)
                      }
                      value={mastercardCorporate["mastercard_corporate_ts"]}
                    />
                  </td>
                  <td>
                    <input
                      onWheel={(e) => e.target.blur()}
                      type="number"
                      className="form-control"
                      disabled
                    />
                  </td>
                  <td style={{ background: "#e55353" }}>
                    <input
                      min={0}
                      onWheel={(e) => e.target.blur()}
                      type="text"
                      className="form-control"
                      placeholder="£"
                      value={mastercard_corporate_cc}
                    />
                  </td>
                  <td style={{ background: "#005691" }}>
                    <input
                      onWheel={(e) => e.target.blur()}
                      type="text"
                      className="form-control"
                      placeholder="£"
                      value={mastercard_corporate_pc}
                    />
                  </td>
                </tr>
                <tr>
                  <td style={{ fontWeight: "600px", textAlign: "start" }}>
                    All Non-EEA Visa
                  </td>
                  <td>
                    <input
                      onWheel={(e) => e.target.blur()}
                      type="number"
                      className="form-control"
                      min={0}
                      placeholder="%"
                      name="noneea_visa_cr"
                      onChange={(e) => handleFilterInput(e, setNoneeaVisa)}
                      value={noneeaVisa["noneea_visa_cr"]}
                    />
                  </td>
                  <td>
                    <input
                      onWheel={(e) => e.target.blur()}
                      type="number"
                      min={0}
                      className="form-control"
                      placeholder="%"
                      name="noneea_visa_pr"
                      onChange={(e) => handleFilterInput(e, setNoneeaVisa)}
                      value={noneeaVisa["noneea_visa_pr"]}
                    />
                  </td>
                  <td>
                    <input
                      onWheel={(e) => e.target.blur()}
                      type="number"
                      className="form-control"
                      placeholder="£"
                      min={0}
                      name="noneea_visa_ts"
                      onChange={(e) => handleFilterInput(e, setNoneeaVisa)}
                      value={noneeaVisa["noneea_visa_ts"]}
                    />
                  </td>
                  <td>
                    <input
                      onWheel={(e) => e.target.blur()}
                      type="number"
                      className="form-control"
                      disabled
                    />
                  </td>
                  <td style={{ background: "#e55353" }}>
                    <input
                      onWheel={(e) => e.target.blur()}
                      type="number"
                      className="form-control"
                      placeholder="£"
                      value={noneea_visa_cc}
                    />
                  </td>
                  <td style={{ background: "#005691" }}>
                    <input
                      onWheel={(e) => e.target.blur()}
                      type="number"
                      className="form-control"
                      placeholder="£"
                      value={noneea_visa_pc}
                    />
                  </td>
                </tr>
                <tr>
                  <td style={{ fontWeight: "600px", textAlign: "start" }}>
                    All Non-EEA Mastercard
                  </td>
                  <td>
                    <input
                      onWheel={(e) => e.target.blur()}
                      type="number"
                      className="form-control"
                      placeholder="%"
                      min={0}
                      name="noneea_mastercard_cr"
                      onChange={(e) =>
                        handleFilterInput(e, setNoneeaMastercard)
                      }
                      value={noneeaMastercard["noneea_mastercard_cr"]}
                    />
                  </td>
                  <td>
                    <input
                      onWheel={(e) => e.target.blur()}
                      type="number"
                      className="form-control"
                      placeholder="%"
                      min={0}
                      name="noneea_mastercard_pr"
                      onChange={(e) =>
                        handleFilterInput(e, setNoneeaMastercard)
                      }
                      value={noneeaMastercard["noneea_mastercard_pr"]}
                    />
                  </td>
                  <td>
                    <input
                      onWheel={(e) => e.target.blur()}
                      type="number"
                      className="form-control"
                      placeholder="£"
                      min={0}
                      name="noneea_mastercard_ts"
                      onChange={(e) =>
                        handleFilterInput(e, setNoneeaMastercard)
                      }
                      value={noneeaMastercard["noneea_mastercard_ts"]}
                    />
                  </td>
                  <td>
                    <input
                      onWheel={(e) => e.target.blur()}
                      type="number"
                      className="form-control"
                      disabled
                    />
                  </td>
                  <td style={{ background: "#e55353" }}>
                    <input
                      onWheel={(e) => e.target.blur()}
                      type="number"
                      className="form-control"
                      placeholder="£"
                      value={noneea_mastercard_cc}
                    />
                  </td>
                  <td style={{ background: "#005691" }}>
                    <input
                      onWheel={(e) => e.target.blur()}
                      type="number"
                      className="form-control"
                      placeholder="£"
                      value={noneea_mastercard_pc}
                    />
                  </td>
                </tr>
                <tr>
                  <td style={{ fontWeight: "600px", textAlign: "start" }}>
                    AMEX
                  </td>
                  <td>
                    <input
                      onWheel={(e) => e.target.blur()}
                      type="number"
                      className="form-control"
                      placeholder="%"
                      min={0}
                      name="amex_cr"
                      onChange={(e) => handleFilterInput(e, setamex)}
                      value={amex["amex_cr"]}
                    />
                  </td>
                  <td>
                    <input
                      onWheel={(e) => e.target.blur()}
                      type="number"
                      className="form-control"
                      placeholder="%"
                      min={0}
                      name="amex_sr"
                      onChange={(e) => handleFilterInput(e, setamex)}
                      value={amex["amex_sr"]}
                    />
                  </td>
                  <td>
                    <input
                      onWheel={(e) => e.target.blur()}
                      type="number"
                      className="form-control"
                      placeholder="£"
                      min={0}
                      name="amex_ts"
                      onChange={(e) => handleFilterInput(e, setamex)}
                      value={amex["amex_ts"]}
                    />
                  </td>
                  <td>
                    <input
                      onWheel={(e) => e.target.blur()}
                      type="number"
                      className="form-control"
                      disabled
                    />
                  </td>
                  <td style={{ background: "#e55353" }}>
                    <input
                      onWheel={(e) => e.target.blur()}
                      type="number"
                      className="form-control"
                      placeholder="£"
                      value={amex_card_cc}
                    />
                  </td>
                  <td style={{ background: "#005691" }}>
                    <input
                      onWheel={(e) => e.target.blur()}
                      type="number"
                      className="form-control"
                      placeholder="£"
                      value={amex_card_ps}
                    />
                  </td>
                </tr>
                <tr>
                  <td style={{ fontWeight: "600px", textAlign: "start" }}>
                    Authorisation Fees
                  </td>
                  <td>
                    <input
                      onWheel={(e) => e.target.blur()}
                      type="number"
                      className="form-control"
                      placeholder="£"
                      name="auth_fees_cr"
                      onChange={(e) => handleFilterInput(e, setAuthFees)}
                      value={authFees["auth_fees_cr"]}
                      min={0}
                    />
                  </td>
                  <td>
                    <input
                      onWheel={(e) => e.target.blur()}
                      type="number"
                      className="form-control"
                      placeholder="£"
                      name="auth_fees_pr"
                      min={0}
                      // max={0.05}
                      onChange={(e) => handleFilterInput(e, setAuthFees)}
                    
                      value={authFees["auth_fees_pr"]}
                    />
                  </td>
                  <td>
                    <input
                      onWheel={(e) => e.target.blur()}
                      type="number"
                      className="form-control"
                      disabled
                    />
                  </td>
                  <td>
                    <input
                      onWheel={(e) => e.target.blur()}
                      type="number"
                      className="form-control"
                      placeholder="£"
                      name="auth_fees_no_tr"
                      onChange={(e) => handleFilterInput(e, setAuthFees)}
                      value={authFees["auth_fees_no_tr"]}
                      min={0}
                    />
                  </td>
                  <td style={{ background: "#e55353" }}>
                    <input
                      onWheel={(e) => e.target.blur()}
                      type="nuumber"
                      className="form-control"
                      placeholder="£"
                      value={auth_fees_cc}
                    />
                  </td>
                  <td style={{ background: "#005691" }}>
                    <input
                      onWheel={(e) => e.target.blur()}
                      type="number"
                      className="form-control"
                      placeholder="£"
                      value={auth_fees_pc}
                    />
                  </td>
                </tr>
                <tr>
                  <td style={{ fontWeight: "600px", textAlign: "start" }}>
                    Per Transaction Charge{" "}
                  </td>
                  <td>
                    <input
                      onWheel={(e) => e.target.blur()}
                      type="number"
                      className="form-control"
                      placeholder="£"
                      min={0}
                      name="per_tr_crg_cr"
                      onChange={(e) => handleFilterInput(e, setPerTrCrg)}
                      value={perTrCrg["per_tr_crg_cr"]}
                    />
                  </td>
                  <td>
                    <input
                      onWheel={(e) => e.target.blur()}
                      type="number"
                      className="form-control"
                      placeholder="£"
                      min={0}
                      name="per_tr_crg_pr"
                      onChange={(e) => handleFilterInput(e, setPerTrCrg)}
                      value={perTrCrg["per_tr_crg_pr"]}
                    />
                  </td>
                  <td>
                    <input
                      onWheel={(e) => e.target.blur()}
                      type="number"
                      className="form-control"
                      disabled
                    />
                  </td>
                  <td>
                    <input
                      onWheel={(e) => e.target.blur()}
                      type="number"
                      className="form-control"
                      placeholder="£"
                      min={0}
                      // max={0.050}
                      name="per_tr_crg_no_tr"
                      onChange={(e) => handleFilterInput(e, setPerTrCrg)}
                      value={perTrCrg["per_tr_crg_no_tr"]}
                    />
                  </td>
                  <td style={{ background: "#e55353" }}>
                    <input
                      onWheel={(e) => e.target.blur()}
                      type="number"
                      className="form-control"
                      placeholder="£"
                      value={per_tr_crg_cc}
                    />
                  </td>
                  <td style={{ background: "#005691" }}>
                    <input
                      onWheel={(e) => e.target.blur()}
                      type="number"
                      className="form-control"
                      placeholder="£"
                      value={per_tr_crg_pc}
                    />
                  </td>
                </tr>
                <tr>
                  <td style={{ fontWeight: "600px", textAlign: "start" }}>
                    Portal Reporting{" "}
                  </td>
                  <td>
                    <input
                      onWheel={(e) => e.target.blur()}
                      type="number"
                      className="form-control"
                      placeholder="£"
                      min={0}
                      name="portal_reporting_cr"
                      onChange={(e) => handleFilterInput(e, setPortalReporting)}
                      value={portalReporting["portal_reporting_cr"]}
                    />
                  </td>
                  <td>
                    <input
                      onWheel={(e) => e.target.blur()}
                      type="number"
                      className="form-control"
                      placeholder="£"
                      min={0}
                      name="portal_reporting_pr"
                      onChange={(e) => handleFilterInput(e, setPortalReporting)}
                      value={portalReporting["portal_reporting_pr"]}
                    />
                  </td>
                  <td>
                    <input
                      onWheel={(e) => e.target.blur()}
                      type="number"
                      className="form-control"
                      disabled
                    />
                  </td>
                  <td>
                    <input
                      onWheel={(e) => e.target.blur()}
                      type="number"
                      className="form-control"
                      disabled
                      placeholder="Per Month"
                      min={0}
                      name="portal_reporting_no_ts"
                      onChange={(e) => handleFilterInput(e, setPortalReporting)}
                      value={portalReporting["portal_reporting_no_ts"]}
                    />
                  </td>
                  <td style={{ background: "#e55353" }}>
                    <input
                      onWheel={(e) => e.target.blur()}
                      type="text"
                      className="form-control"
                      placeholder="£"
                      value={portal_reporting_cc}
                    />
                  </td>
                  <td style={{ background: "#005691" }}>
                    <input
                      onWheel={(e) => e.target.blur()}
                      type="text"
                      className="form-control"
                      placeholder="£"
                      value={portal_reporting_pc}
                    />
                  </td>
                </tr>
                <tr>
                  <td style={{ fontWeight: "600px", textAlign: "start" }}>
                    PCI DSS Fees{" "}
                  </td>
                  <td>
                    <input
                      onWheel={(e) => e.target.blur()}
                      type="number"
                      className="form-control"
                      placeholder="£"
                      min={0}
                      name="pci_dss_cr"
                      onChange={(e) => handleFilterInput(e, setPciDss)}
                      value={pciDss["pci_dss_cr"]}
                    />
                  </td>
                  <td>
                    <input
                      onWheel={(e) => e.target.blur()}
                      type="number"
                      className="form-control"
                      placeholder="£"
                      min={0}
                      name="pci_dss_pr"
                      onChange={(e) => handleFilterInput(e, setPciDss)}
                      value={pciDss["pci_dss_pr"]}
                    />
                  </td>
                  <td>
                    <input
                      onWheel={(e) => e.target.blur()}
                      type="number"
                      className="form-control"
                      disabled
                    />
                  </td>
                  <td>
                    <input
                      onWheel={(e) => e.target.blur()}
                      type="number"
                      className="form-control"
                      disabled
                      placeholder="Per Month"
                    />
                  </td>
                  <td style={{ background: "#e55353" }}>
                    <input
                      onWheel={(e) => e.target.blur()}
                      type="text"
                      className="form-control"
                      placeholder="£"
                      value={pci_dss_cc}
                    />
                  </td>
                  <td style={{ background: "#005691" }}>
                    <input
                      onWheel={(e) => e.target.blur()}
                      type="text"
                      className="form-control"
                      placeholder="£"
                      value={pci_dss_pc}
                    />
                  </td>
                </tr>
                <tr>
                  <td
                    style={{ fontWeight: "600px", textAlign: "start" }}
                    className="pt-lg-4 pt-0"
                  >
                    Terminal Rental{" "}
                  </td>
                  <td>
                    <div className="form-group mb-2">
                      <select
                        value={crTerminal}
                        onChange={(e) => setCrTerminal(e.target.value)}
                        className="form-control"
                        id="exampleSelect"
                      >
                        <option value={0} selected>
                          Select Terminal...
                        </option>
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
                      onWheel={(e) => e.target.blur()}
                      type="number"
                      className="form-control"
                      placeholder="£"
                      min={0}
                      name="terminal_rental_cr"
                      onChange={(e) => handleFilterInput(e, setTerminalRental)}
                      value={terminalRental["terminal_rental_cr"]}
                    />
                  </td>
                  <td>
                    <div className="form-group mb-2">
                      <select
                        value={prTerminal}
                        onChange={(e) => setPrTerminal(e.target.value)}
                        className="form-control"
                        id="exampleSelect"
                      >
                        <option value={0} selected>
                          Select Terminal...
                        </option>
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
                      onWheel={(e) => e.target.blur()}
                      type="number"
                      className="form-control"
                      placeholder="£"
                      min={0}
                      name="terminal_rental_pr"
                      onChange={(e) => handleFilterInput(e, setTerminalRental)}
                      value={terminalRental["terminal_rental_pr"]}
                    />
                  </td>
                  <td>
                    <p className="mt-5"></p>
                    <div className="form-group">
                      <input
                        onWheel={(e) => e.target.blur()}
                        type="number"
                        className="form-control"
                        placeholder="Number of Assets"
                        min={0}
                        name="num_of_terminals"
                        onChange={(e) => setTerminalCount(e.target?.value)}
                        value={terminalCount}
                      />
                      
                    </div>
                  </td>
                  <td>
                    <p className="mt-5"></p>
                    <input
                      onWheel={(e) => e.target.blur()}
                      type="number"
                      className="form-control mt-5"
                      disabled
                      placeholder="Per Month"
                    />
                  </td>
                  <td style={{ background: "#e55353" }}>
                    <input
                      onWheel={(e) => e.target.blur()}
                      type="text"
                      className="form-control mt-5"
                      placeholder="£"
                      value={terminal_rental_cc}
                    />
                  </td>
                  <td style={{ background: "#005691" }}>
                    <input
                      onWheel={(e) => e.target.blur()}
                      type="text"
                      className="form-control mt-5"
                      placeholder="£"
                      value={terminal_rental_pc}
                    />
                  </td>
                </tr>
                <tr className="total" style={{ background: "transparent" }}>
                  <td colSpan="5" className="text-end font-weight-bold">
                    TOTAL
                  </td>
                  <td style={{ background: "#e55353" }}>
                    <p
                      style={{
                        color: "#fff",
                        paddingLeft: "10px",
                        fontWeight: "600",
                      }}
                    >
                      {/* £ {totalCurrentCost} */}£{" "}
                      {totalCurrentCost?.toFixed(3)}
                    </p>
                  </td>
                  <td style={{ background: "#005691" }}>
                    <p
                      style={{
                        color: "gray",
                        paddingLeft: "10px",
                        fontWeight: "600",
                        
                      }}
                    >
                      {/* £ {total_pc} */}£ {total_pc.toFixed(3)}
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="row my-5">
        <div className="col-md-8 my-5">
          <Line options={options} data={chartData} />
        </div>
        <div className="col-md-4 my-5">
          <div className="table-responsive my-4 savings_table">
            <table className="table table-striped number-center table-hover">
              <tbody>
                <tr>
                  <td style={{ fontWeight: "600px", textAlign: "start" }}>
                    % Saving
                  </td>
                  <td>{isNaN(percent) ? 0 : Math.ceil(percent.toFixed(3))}</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: "600px", textAlign: "start" }}>
                    Monthly Savings
                  </td>
                  <td>£{(totalCurrentCost - total_pc).toFixed(3)}</td>
                </tr>

                <tr>
                  <td style={{ fontWeight: "600px", textAlign: "start" }}>
                    Annual Savings
                  </td>
                  <td>£{((totalCurrentCost - total_pc) * 12).toFixed(3)}</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: "600px", textAlign: "start" }}>
                    4-Year Savings
                  </td>
                  <td>£{((totalCurrentCost - total_pc) * 48).toFixed(3)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="d-flex justify-content-end">
            
            <button
              className="btn btn-danger mx-2"
              style={{ padding: "3px 12px", borderRadius: "5px" }}
              onClick={() => navigate("/export-leads")}
            >
              Export
            </button>
            <button className="basic_btn" onClick={handleShow} style={{background:"#38b6ff"}}>
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
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">
                      Annual Card Turnover
                    </label>
                    <input
                      value={cardTurnover}
                      min={0}
                      onChange={(e) => setCardTurnover(e.target.value)}
                      type="number"
                      className="form-control my-3"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">ATV</label>
                    <input
                      value={atv}
                      min={0}
                      onChange={(e) => setAtv(e.target.value)}
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
                      value={rentingFromElav}
                      onChange={(e) => setRentingFromElav(e.target.value)}
                      name=""
                      id=""
                      className="form-control my-3"
                    >
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <button className="basic_btn" onClick={getDataForRevineue}>
                Submit
              </button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
}
