import React, { useEffect, useState } from "react";
import printer from "../../assets/img/printer.svg";
import arrow from "../../EboardComponents/Custom/Arrow.svg";
import "../accounts/Leads/Leads.css";
import { Bar, Line } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

// Chart js
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getTimeFormat } from "src/utils/CommonFunction";
import { showToast } from "src/utils/ToastHelper";
import Loader from "src/utils/Loader";
import ReactPaginate from "react-paginate";
import { BsEye } from "react-icons/bs";
import { GetPricequoteInput } from "../accounts/Pricequote/_redux/action/PriceQuoteAction";
import { useDispatch } from "react-redux";
import Chart from "react-apexcharts";
import Cookies from "js-cookie";
import ResidualThead from "./ResidualThead";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// export const options = {
//   responsive: true,
//   plugins: {
//     legend: {
//       position: "top",
//     },
//   },
//   animation: {
//     duration: 200,
//   },
//   scales: {
//     x: {
//       grid: {
//         display: false,
//       },
//     },
//     y: {
//       grid: {
//         display: false,
//       },
//     },
//   },
// };

const labels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function Residual() {
  // new test

  // new test
  const userDataCookie = Cookies.get("userData");
  const userData = JSON.parse(userDataCookie);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [itemPerPage, setItemPerPage] = useState(10);
  const [upfronts, setUpfronts] = useState([]);
  const [upfrontsChart, setUpfrontsChart] = useState([]);
  const [copiedAarray, setCopiedArray] = useState([]);

  const handleFilterInput = (e) => {
    const InputName = e.target.name;
    const Inputval = e.target.value;
    setSearch((previous_values) => {
      return { ...previous_values, [InputName]: Inputval };
    });
  };
  const getMonthIndex = (monthAbbreviation) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return months.findIndex((month) => month === monthAbbreviation);
  };
  var currentDate = new Date();
  var currentMonth = currentDate.getMonth();
  var actualMonth = currentMonth;
  const crY = new Date().getUTCFullYear();
  const finalMonth = () => {
    const currentDate = new Date();
    const day = currentDate.getDate();
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    if (actualMonth === 0 && day < 10) {
      return months[10];
    }
    else  if (actualMonth === 1 && day < 10) {
      return months[11];
    }
    else if(day < 10 && actualMonth > 1){
      return months[actualMonth - 2]
    } else return months[actualMonth -1] 
    // return day < 10 ? months[actualMonth - 2] : months[actualMonth - 1];
  };
  function getYear() {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; 
    const currentDay = currentDate.getDate();
  
    if ((currentDay < 10) && (currentMonth === 1 || currentMonth === 2)) {
      return currentDate.getFullYear() - 1;
    } else {
      return currentDate.getFullYear();
    }
  }
  const [year, setYear] = useState(getYear());
  const [month, setMonth] = useState(finalMonth);
  console.log(month, "fm");
  console.log(year, "fm");

  const dateFormat = (date) => {
    // const date = '202304 Apr'
    const month = getMonthIndex(date?.split(" ")[1]);
    const year = date?.slice(0, 4);
    const day = date?.slice(4, 6);
    const finalMonth = month + 1;
    return `${day}-${finalMonth}-${year}`;
  };
  const keys = [
    "mid",
    "trading_name",
    "legal_name",
    "created_at",
    "mid_status",
    "number_of_tr",
    "monthly_turnover",
    "statement_month",
    "epos_patrner_residual_amount",
  ];

  const [search, setSearch] = useState({
    trading_name: "",
    legal_name: "",
    created_at: "",
    mid: "",
    mid_status: "",
    monthly_turnover: "",
    number_of_tr: "",
    monthly_residual: "",
    epos_patrner_residual_amount: "",
    statement_month: "",
    residual_detail: "",
  });
  // paggination
  const [pageCount, SetPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [currentItems, setCurrentItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  // sorting San
  const [sort, setSort] = useState("ASC");
  const [legalNameSpan, SetLegalNameSpan] = useState(true);
  const [tradingNameSpan, SetTradingNameSpan] = useState(true);
  const [createdAtSpan, SetCreatedAtSpan] = useState(true);
  const [midSpan, setMidSpan] = useState(true);
  const [mtrSpan, setMtrSpan] = useState(true);

  const [numberTrSpan, setNumberTrSpan] = useState(true);
  const [epraSpan, setEpraSpan] = useState(true);
  const [statementMonthSpan, setStateMonthSpan] = useState(true);

  const [midStatusSpan, setMidStatusSpan] = useState(true);
  const getUpfrontList = (url) => {
    axios
      .get(url)
      .then((res) => {
        setUpfronts([]);
        const newData = res?.data?.data?.map((curr) => ({
          ...curr,
          created_at: getTimeFormat(
            curr["createdon@OData.Community.Display.V1.FormattedValue"]
          ),
          mid: !curr?.ptsave_Account ? "" : curr?.ptsave_Account?.ptsave_mid,
          legal_name: curr?.ptsave_Account["name"],

          trading_name: curr?.ptsave_Account["ptsave_trading_name"],
          mid_status: !curr?.ptsave_Account[
            "ptsave_status@OData.Community.Display.V1.FormattedValue"
          ]
            ? ""
            : curr?.ptsave_Account[
                "ptsave_status@OData.Community.Display.V1.FormattedValue"
              ],
          monthly_turnover:
            curr[
              "ptsave_actualmonthlytransactionsbyamountrollup@OData.Community.Display.V1.FormattedValue"
            ],
          number_of_tr:
            curr[
              "ptsave_actualmonthlytransactionsbynooftrrollup@OData.Community.Display.V1.FormattedValue"
            ],
          monthly_residual: curr[
            "ptsave_totalmonthlyresidualrollup_base@OData.Community.Display.V1.FormattedValue"
          ]
            ? curr[
                "ptsave_totalmonthlyresidualrollup_base@OData.Community.Display.V1.FormattedValue"
              ]
            : "",
          epos_patrner_residual_amount:
            userData?.user_role === 2
              ? curr[
                  "ptsave_partnermanagerresidualamount@OData.Community.Display.V1.FormattedValue"
                ]
                ? curr[
                    "ptsave_partnermanagerresidualamount@OData.Community.Display.V1.FormattedValue"
                  ]
                : ""
              : userData?.user_role === 3
              ? curr[
                  "ptsave_epospartnerresidualamount@OData.Community.Display.V1.FormattedValue"
                ]
                ? curr[
                    "ptsave_epospartnerresidualamount@OData.Community.Display.V1.FormattedValue"
                  ]
                : ""
              : curr[
                  "ptsave_partnerresidualamount@OData.Community.Display.V1.FormattedValue"
                ]
              ? curr[
                  "ptsave_partnerresidualamount@OData.Community.Display.V1.FormattedValue"
                ]
              : "",
          statement_month: curr["ptsave_name"]
            ? dateFormat(curr["ptsave_name"])
            : "",
          residual_detail: curr["Residual_details"]
            ? curr["Residual_details"]
            : "",
        }));
        setCopiedArray(newData);
        setUpfronts(newData);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        try {
          const message = JSON.parse(err.request.response).message;

          if (
            message === "Invalid token." ||
            JSON.parse(err.request.response).code === 401
          ) {
            showToast("success", "Invalid Token");
            navigate("/login");
          }
        } catch {
          console.log("success", "srver error ");
        }
      });
  };
  const getUpfrontChartList = (url) => {
    axios
      .get(url)
      .then((res) => {
        setUpfrontsChart([]);
        const newData = res?.data?.data?.map((curr) => ({
          ...curr,
          created_at: getTimeFormat(
            curr["createdon@OData.Community.Display.V1.FormattedValue"]
          ),
          mid: !curr?.ptsave_Account ? "" : curr?.ptsave_Account?.ptsave_mid,
          legal_name: curr?.ptsave_Account["name"],

          trading_name: curr?.ptsave_Account["ptsave_trading_name"],
          mid_status: !curr?.ptsave_Account[
            "ptsave_status@OData.Community.Display.V1.FormattedValue"
          ]
            ? ""
            : curr?.ptsave_Account[
                "ptsave_status@OData.Community.Display.V1.FormattedValue"
              ],
          monthly_turnover:
            curr[
              "ptsave_actualmonthlytransactionsbyamountrollup@OData.Community.Display.V1.FormattedValue"
            ],
          number_of_tr:
            curr[
              "ptsave_actualmonthlytransactionsbynooftrrollup@OData.Community.Display.V1.FormattedValue"
            ],
          monthly_residual: curr[
            "ptsave_totalmonthlyresidualrollup_base@OData.Community.Display.V1.FormattedValue"
          ]
            ? curr[
                "ptsave_totalmonthlyresidualrollup_base@OData.Community.Display.V1.FormattedValue"
              ]
            : "",
          epos_patrner_residual_amount:
            userData?.user_role === 2
              ? curr[
                  "ptsave_partnermanagerresidualamount@OData.Community.Display.V1.FormattedValue"
                ]
                ? curr[
                    "ptsave_partnermanagerresidualamount@OData.Community.Display.V1.FormattedValue"
                  ]
                : ""
              : userData?.user_role === 3
              ? curr[
                  "ptsave_epospartnerresidualamount@OData.Community.Display.V1.FormattedValue"
                ]
                ? curr[
                    "ptsave_epospartnerresidualamount@OData.Community.Display.V1.FormattedValue"
                  ]
                : ""
              : curr[
                  "ptsave_partnerresidualamount@OData.Community.Display.V1.FormattedValue"
                ]
              ? curr[
                  "ptsave_partnerresidualamount@OData.Community.Display.V1.FormattedValue"
                ]
              : "",
          statement_month: curr["ptsave_name"]
            ? dateFormat(curr["ptsave_name"])
            : "",
          residual_detail: curr["Residual_details"]
            ? curr["Residual_details"]
            : "",
        }));
        setUpfrontsChart(newData);
      })
      .catch((err) => {
        try {
          const message = JSON.parse(err.request.response).message;

          if (
            message === "Invalid token." ||
            JSON.parse(err.request.response).code === 401
          ) {
            showToast("success", "Invalid Token");
            navigate("/login");
          }
        } catch {
          showToast("success", "srver error ");
        }
      });
  };

  const getChartData = () => {
    const currentYear = new Date().getUTCFullYear();
    // const currentYear = year;
    const filteredArray = upfrontsChart?.filter((obj) => {
      const createdAtYear = new Date(
        obj?.ptsave_statementdate
      ).getUTCFullYear();
      return createdAtYear === currentYear;
    });
    const commissionSumArray = Array(12).fill(0);

    filteredArray.forEach((obj) => {
      const createdAt = new Date(obj?.ptsave_statementdate);
      const monthIndex = createdAt.getUTCMonth();
      // const commission = Number(obj?.monthly_turnover?.split("£")[1]) || 0;
      const commission =
        userData?.user_role === 2
          ? parseFloat(obj?.ptsave_partnermanagerresidualamount) || 0
          : userData?.user_role === 3
          ? parseFloat(obj?.ptsave_epospartnerresidualamount) || 0
          : parseFloat(obj?.ptsave_partnerresidualamountcalculated) || 0;
      commissionSumArray[monthIndex] += commission;
    });
    const roundedArray = commissionSumArray.map((item) =>
      parseFloat(item.toFixed(2))
    );
    return roundedArray;
  };

  const getChartData2 = () => {
    // const currentYear = year && month ? year:  new Date().getUTCFullYear() ;
    const currentYear = new Date(upfronts[0]?.createdon).getUTCFullYear();
    // const currentYear = year;
    const filteredArray = upfrontsChart?.filter((obj) => {
      const createdAtYear = new Date(
        obj?.ptsave_statementdate
      ).getUTCFullYear();
      return createdAtYear === currentYear;
    });
    const commissionSumArray = Array(12).fill(0);

    filteredArray.forEach((obj) => {
      const createdAt = new Date(obj?.ptsave_statementdate);
      const monthIndex = createdAt.getUTCMonth();
      // const commission = Number(obj?.monthly_turnover?.split("£")[1]) || 0;
      const commission =
        userData?.user_role === 2
          ? parseFloat(obj?.ptsave_partnermanagerresidualamount) || 0
          : userData?.user_role === 3
          ? parseFloat(obj?.ptsave_epospartnerresidualamount) || 0
          : parseFloat(obj?.ptsave_partnerresidualamountcalculated) || 0;
      commissionSumArray[monthIndex] += commission;
    });
    const roundedArray = commissionSumArray.map((item) =>
      parseFloat(item.toFixed(2))
    );

    return roundedArray;
  };

  // console.log(userData,'data:')

  const getChartDataFull = () => {
    // const currentYear = year && month ? year:  new Date().getUTCFullYear() ;
    const currentYear = new Date(upfronts[0]?.createdon).getUTCFullYear();
    // const currentYear = year;
    const filteredArray = upfrontsChart?.filter((obj) => {
      const createdAtYear = new Date(
        obj?.ptsave_statementdate
      ).getUTCFullYear();
      return createdAtYear === currentYear;
    });
    const commissionSumArray = Array(12).fill(0);

    filteredArray.forEach((obj) => {
      const createdAt = new Date(obj?.ptsave_statementdate);
      const monthIndex = createdAt.getUTCMonth();
      console.log(monthIndex,'ctdata')
      // const commission = Number(obj?.monthly_turnover?.split("£")[1]) || 0;
      const commission =
        userData?.user_role === 2
          ? parseFloat(obj?.ptsave_partnermanagerresidualamount) || 0
          : userData?.user_role === 3
          ? parseFloat(obj?.ptsave_epospartnerresidualamount) || 0
          : parseFloat(obj?.ptsave_partnerresidualamountcalculated) || 0;
      commissionSumArray[monthIndex] += commission;
    });
    const roundedArray = commissionSumArray.map((item) =>
      parseFloat(item.toFixed(2))
    );

    return roundedArray;
  };

  const chartData1 = getChartData();
  const chartData2 = getChartData2();
  const chartData3 = getChartDataFull();
  console.log(chartData3,'ctdata')
  console.log(month,'ctdata')

  // calling api
  useEffect(() => {
    if (month !== "" && year !== "") {
      setIsLoading(true);
      getUpfrontList(
        `${process.env.REACT_APP_BASE_URL}api/v1/commission/residual/?month=${month}&year=${year}`
      );
    } else if (month === "" && year === "") {
      setIsLoading(true);
      getUpfrontList(
        `${process.env.REACT_APP_BASE_URL}api/v1/commission/residual/`
      );
    }
  }, [itemPerPage, year, month]);

  useEffect(() => {
    getUpfrontChartList(
      `${process.env.REACT_APP_BASE_URL}api/v1/commission/residual/?year=${year}`
    );
  }, [year]);

  console.log(upfronts, "up");

  const displayData2 = upfronts
    ?.filter((item) =>
      keys.some((key) => {
        const value = item[key]?.toLowerCase();
        const queryLower = query.toLowerCase();
        return value?.includes(queryLower);
      })
    )
    ?.filter((fill) => {
      if (
        search.legal_name === "" ||
        search.trading_name === "" ||
        search.residual_detail === "" ||
        fill?.mid === null ||
        fill?.residual_detail === null ||
        search?.epos_patrner_residual_amount === null ||
        fill?.mid_status === ""
      ) {
        return fill;
      }
    })
    .filter((fill) => {
      if (
        fill.legal_name?.toLowerCase().includes(search.legal_name.toLowerCase())
      ) {
        return fill;
      }
    })
    .filter((fill) => {
      if (
        fill.trading_name
          ?.toLowerCase()
          .includes(search.trading_name.toLowerCase())
      ) {
        return fill;
      }
    })
    .filter((fill) => {
      if (
        fill.mid_status?.toLowerCase().includes(search.mid_status.toLowerCase())
      ) {
        return fill;
      }
    })
    .filter((fill) => {
      if (fill.mid?.toLowerCase().includes(search.mid.toLowerCase())) {
        return fill;
      }
    })
    .filter((fill) => {
      if (
        fill.number_of_tr
          ?.toLowerCase()
          .includes(search.number_of_tr.toLowerCase())
      ) {
        return fill;
      }
    })
    .filter((fill) => {
      if (
        fill.monthly_turnover
          ?.toLowerCase()
          .includes(search.monthly_turnover.toLowerCase())
      ) {
        return fill;
      }
    })
    .filter((fill) => {
      if (
        fill.monthly_residual
          ?.toLowerCase()
          .includes(search.monthly_residual.toLowerCase())
      ) {
        return fill;
      }
    })
    .filter((fill) => {
      if (
        fill.epos_patrner_residual_amount
          ?.toLowerCase()
          .includes(search.epos_patrner_residual_amount.toLowerCase())
      ) {
        return fill;
      }
    })
    .filter((fill) => {
      if (
        fill.statement_month
          ?.toLowerCase()
          .includes(search.statement_month.toLowerCase())
      ) {
        return fill;
      }
    })
    .filter((fill) => {
      if (
        fill.residual_detail
          ?.toLowerCase()
          .includes(search.residual_detail.toLowerCase())
      ) {
        return fill;
      }
    });
  const endOffset = itemOffset + itemPerPage;
  const displayData = displayData2?.slice(itemOffset, endOffset);

  useEffect(() => {
    // const endOffset = itemOffset + itemPerPage;
    setCurrentItems(upfronts?.slice(itemOffset, endOffset));
    SetPageCount(Math.ceil(displayData2?.length / itemPerPage));
  }, [itemOffset, itemPerPage]);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemPerPage) % upfronts?.length;

    setItemOffset(newOffset);
  };
  useEffect(() => {
    const delaySetItemOffset = () => {
      setTimeout(() => {
        setItemOffset(0);
      }, 0);
    };

    delaySetItemOffset();
    return () => {
      clearTimeout(delaySetItemOffset);
    };
  }, [query, search]);
  useEffect(() => {
    handlePageClick({ selected: 0 });
  }, [search, query]);
  // sorting
  const sortingData = (sortBy, stateSpan) => {
    if (sortBy === "statement_month") {
      if (sort === "ASC") {
        const sorted = [...copiedAarray].sort((a, b) => {
          const datePartsA = a[sortBy].split(/[-,:\s]/);
          const datePartsB = b[sortBy].split(/[-,:\s]/);

          // Extract year, month, and day from the date strings
          const yearA = parseInt(datePartsA[2]);
          const yearB = parseInt(datePartsB[2]);
          const monthA = parseInt(datePartsA[1]) - 1; // Month is zero-indexed
          const monthB = parseInt(datePartsB[1]) - 1;
          const dayA = parseInt(datePartsA[0]);
          const dayB = parseInt(datePartsB[0]);

          // Compare year, month, and day
          if (yearA !== yearB) {
            return yearA - yearB;
          }
          if (monthA !== monthB) {
            return monthA - monthB;
          }
          return dayA - dayB;
        });

        setUpfronts(sorted);
        setSort("DSC");
        stateSpan(!true);
      } else if (sort === "DSC") {
        const sorted = [...copiedAarray].sort((a, b) => {
          const dateA = new Date(a[sortBy]);
          const dateB = new Date(b[sortBy]);
          return dateB - dateA;
        });
        setUpfronts(sorted);
        setSort("ASC");
        stateSpan(!false);
      }
    } else if (sortBy === "monthly_turnover") {
      if (sort === "ASC") {
        const sorted = [...upfronts].sort((a, b) =>
          a["ptsave_actualmonthlytransactionsbyamountrollup"] >
          b["ptsave_actualmonthlytransactionsbyamountrollup"]
            ? 1
            : -1
        );
        setUpfronts(sorted);
        setSort("DSC");
        stateSpan(!true);
      } else if (sort === "DSC") {
        const sorted = [...upfronts].sort((a, b) =>
          a["ptsave_actualmonthlytransactionsbyamountrollup"] <
          b["ptsave_actualmonthlytransactionsbyamountrollup"]
            ? 1
            : -1
        );
        setUpfronts(sorted);
        setSort("ASC");
        stateSpan(!false);
      }
    } else if (sortBy === "number_of_tr") {
      if (sort === "ASC") {
        const sorted = [...upfronts].sort((a, b) =>
          a["ptsave_actualmonthlytransactionsbynooftrrollup"] >
          b["ptsave_actualmonthlytransactionsbynooftrrollup"]
            ? 1
            : -1
        );
        setUpfronts(sorted);
        setSort("DSC");
        stateSpan(!true);
      } else if (sort === "DSC") {
        const sorted = [...upfronts].sort((a, b) =>
          a["ptsave_actualmonthlytransactionsbynooftrrollup"] <
          b["ptsave_actualmonthlytransactionsbynooftrrollup"]
            ? 1
            : -1
        );
        setUpfronts(sorted);
        setSort("ASC");
        stateSpan(!false);
      }
    } else if (sortBy === "epos_patrner_residual_amount") {
      if (sort === "ASC") {
        const param =
          userData?.user_role === 2
            ? "ptsave_partnermanagerresidualamount"
            : userData?.user_role === 3
            ? "ptsave_epospartnerresidualamount"
            : "ptsave_partnerresidualamount";
        console.log(param, "param");
        const sorted = [...upfronts].sort((a, b) =>
          a[param] > b[param] ? 1 : -1
        );
        setUpfronts(sorted);
        setSort("DSC");
        stateSpan(!true);
      } else if (sort === "DSC") {
        const param =
          userData?.user_role === 2
            ? "ptsave_partnermanagerresidualamount"
            : userData?.user_role === 3
            ? "ptsave_epospartnerresidualamount"
            : "ptsave_partnerresidualamount";
        console.log(param, "param 603");
        const sorted = [...upfronts].sort((a, b) =>
          a[param] < b[param] ? 1 : -1
        );
        setUpfronts(sorted);
        setSort("ASC");
        stateSpan(!false);
      }
    } else {
      if (sort === "ASC") {
        const sorted = [...upfronts].sort((a, b) =>
          a[sortBy].toLowerCase() > b[sortBy].toLowerCase() ? 1 : -1
        );
        setUpfronts(sorted);
        setSort("DSC");
        stateSpan(!true);
      } else if (sort === "DSC") {
        const sorted = [...upfronts].sort((a, b) =>
          a[sortBy].toLowerCase() < b[sortBy].toLowerCase() ? 1 : -1
        );
        setUpfronts(sorted);
        setSort("ASC");
        stateSpan(!false);
      }
    }
  };

  const btnBg = (data) => {
    if (data === "Reserve") return "#FFC107";
    if (data === "Fraud Closed") return "#dc3545";
    if (data === "Closed") return "#dc3545";
    if (data === "Deactivated") return "#EF5350";
    if (data === "Re-opened") return "#66BB6A";
    if (data === "Hold") return "#FFC107";
    if (data === "Open") return "#28a745";
    else return "#28a745";
  };
  const optionsTest = {
    plugins: {
      datalabels: {
        display: true,
        color: "black",
        align: "end",
        anchor: "end",
        font: { size: "14", weight: "bold" },
        formatter: function (value) {
          return value > 0 ? "£" + value : value;
        },
      },
    },
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
        // ticks: {
        //   callback: function (value) {
        //     return `£${value}`;
        //   },
        // },
      },
    },
  };
  const monthColors = [
    { fullName: "January", shortName: "Jan", color: "#38B6FF" },
    { fullName: "February", shortName: "Feb", color: "#38B6FF" },
    { fullName: "March", shortName: "Mar", color: "#38B6FF" },
    { fullName: "April", shortName: "Apr", color: "#38B6FF" },
    { fullName: "May", shortName: "May", color: "#38B6FF" },
    { fullName: "June", shortName: "Jun", color: "#38B6FF" },
    { fullName: "July", shortName: "Jul", color: "#38B6FF" },
    { fullName: "August", shortName: "Aug", color: "#38B6FF" },
    { fullName: "September", shortName: "Sep", color: "#38B6FF" },
    { fullName: "October", shortName: "Oct", color: "#38B6FF" },
    { fullName: "November", shortName: "Nov", color: "#38B6FF" },
    { fullName: "December", shortName: "Dec", color: "#38B6FF" },
  ];

  const updateColorByShortName = (shortName, newColor) => {
    const updatedMonthColors = monthColors.map((month) => {
      if (shortName?.toLowerCase() === month.shortName?.toLowerCase()) {
        return { ...month, color: newColor };
      }
      return month;
    });

    return updatedMonthColors.map((month) => month.color);
  };

  // Example usage
  const updatedColorsArray = updateColorByShortName(month, "#0000FF");
  const filteredChartData = chartData3.map((value) =>
    value === 0 ? "" : value
  );

  const dataBar = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: `Patrner Residual Amount : ${year}`,
        backgroundColor: updatedColorsArray,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: filteredChartData,
        tooltipTemplate: function (value) {
          return `£${value}`;
        },
      },
    ],
  };

  if (isLoading) {
    return <Loader />;
  }

  const setFunc = (data, state, setState) => {
    setState(data);
  };

  return (
    <div>
      {/* Residual Chart */}
      <div>
        <div className="row mb-3">
          <div className="col-md-12">
            <div className="my-2 container">
              <Bar
                data={dataBar}
                options={optionsTest}
                width={100}
                height={400}
                plugins={[ChartDataLabels]}
              />
              {/* <Line
                data={dataBar}
                plugins={[ChartDataLabels]}
                options={optionsTest}
              /> */}
            </div>
          </div>
        </div>
      </div>
      {/* UpfrontCommission Table */}
      {/* Filter Button by year start*/}
      <div className="my-3">
        <div className="row">
          <div className="col-lg col-6 d-grid p-0">
            <button
              className="mb-2 basic_btn"
              onClick={() => setFunc("2024", year, setYear)}
              style={{ backgroundColor: `${year === "2024" || year === 2024 ? "blue" : ""}` }}
            >
              2024
            </button>
          </div>
          <div className="col-lg col-6 d-grid p-0">
            <button
              className="mb-2 basic_btn"
              onClick={() => setFunc("2023", year, setYear)}
              style={{ backgroundColor: `${year === "2023" || year === 2023 ? "blue" : ""}` }}
            >
              2023
            </button>
          </div>
          <div className="col-lg col-6 d-grid p-0">
            <button
              className="mb-2 basic_btn"
              onClick={() => setFunc("2022", year, setYear)}
              style={{ backgroundColor: `${year === "2022" || year === 2022 ? "blue" : ""}` }}
            >
              2022
            </button>
          </div>
          <div className="col-lg col-6 d-grid p-0">
            <button
              className="mb-2 basic_btn"
              style={{ backgroundColor: `${year === "2021" || year === 2021 ? "blue" : ""}` }}
              onClick={() => setFunc("2021", year, setYear)}
            >
              2021
            </button>
          </div>
          <div className="col-lg col-6 d-grid p-0">
            <button
              className="mb-2 basic_btn"
              style={{ backgroundColor: `${year === "2020" || year === 2020 ? "blue" : ""}` }}
              onClick={() => setFunc("2020", year, setYear)}
            >
              2020
            </button>
          </div>
          <div className="col-lg col-6 d-grid p-0">
            <button
              className="mb-2 basic_btn"
              style={{ backgroundColor: `${year === "2019" || year === 2019 ? "blue" : ""}` }}
              onClick={() => setFunc("2019", year, setYear)}
            >
              2019
            </button>
          </div>
          <div className="col-lg col-6 d-grid p-0">
            <button
              className="mb-2 basic_btn"
              style={{ backgroundColor: `${year === "2018" || year === 2018 ? "blue" : ""}` }}
              onClick={() => setFunc("2018", year, setYear)}
            >
              2018
            </button>
          </div>
          <div className="col-lg col-6 d-grid p-0">
            <button
              className="mb-2 basic_btn"
              style={{ backgroundColor: `${year === "2017" || year === 2017 ? "blue" : ""}` }}
              onClick={() => setFunc("2017", year, setYear)}
            >
              2017
            </button>
          </div>
          <div className="col-lg col-6 d-grid p-0">
            <button
              className="mb-2 basic_btn"
              style={{ backgroundColor: `${year === "2016" || year === 2016 ? "blue" : ""}` }}
              onClick={() => setFunc("2016", year, setYear)}
            >
              2016
            </button>
          </div>
        </div>
      </div>
      {/* Filter Button by year end */}
      {/* Filter Button by month start*/}
      <div className="my-3">
        <div className="row">
          <div className="col-lg col-6 d-grid p-0">
            <button
              onClick={() => setFunc("Jan", month, setMonth)}
              style={{
                backgroundColor: `${month === "Jan" ? "blue" : ""}`,
              }}
              className="mb-2 basic_btn"
            >
              January
            </button>
          </div>
          <div className="col-lg col-6 d-grid p-0">
            <button
              onClick={() => setFunc("Feb", month, setMonth)}
              style={{
                backgroundColor: `${month === "Feb" ? "blue" : ""}`,
              }}
              className="mb-2 basic_btn"
            >
              February
            </button>
          </div>
          <div className="col-lg col-6 d-grid p-0">
            <button
              onClick={() => setFunc("Mar", month, setMonth)}
              style={{
                backgroundColor: `${month === "Mar" ? "blue" : ""}`,
              }}
              className="mb-2 basic_btn"
            >
              March
            </button>
          </div>
          <div className="col-lg col-6 d-grid p-0">
            <button
              onClick={() => setFunc("Apr", month, setMonth)}
              style={{
                backgroundColor: `${month === "Apr" ? "blue" : ""}`,
              }}
              className="mb-2 basic_btn"
            >
              April
            </button>
          </div>
          <div className="col-lg col-6 d-grid p-0">
            <button
              onClick={() => setFunc("May", month, setMonth)}
              style={{
                backgroundColor: `${month === "May" ? "blue" : ""}`,
              }}
              className="mb-2 basic_btn"
            >
              May
            </button>
          </div>
          <div className="col-lg col-6 d-grid p-0">
            <button
              onClick={() => setFunc("Jun", month, setMonth)}
              style={{
                backgroundColor: `${month === "Jun" ? "blue" : ""}`,
              }}
              className="mb-2 basic_btn"
            >
              June
            </button>
          </div>
          <div className="col-lg col-6 d-grid p-0">
            <button
              onClick={() => setFunc("Jul", month, setMonth)}
              style={{
                backgroundColor: `${month === "Jul" ? "blue" : ""}`,
              }}
              className="mb-2 basic_btn"
            >
              July
            </button>
          </div>
          <div className="col-lg col-6 d-grid p-0">
            <button
              onClick={() => setFunc("Aug", month, setMonth)}
              style={{
                backgroundColor: `${month === "Aug" ? "blue" : ""}`,
              }}
              className="mb-2 basic_btn"
            >
              August
            </button>
          </div>
          <div className="col-lg col-6 d-grid p-0">
            <button
              onClick={() => setFunc("Sep", month, setMonth)}
              style={{
                backgroundColor: `${month === "Sep" ? "blue" : ""}`,
              }}
              className="mb-2 basic_btn p-0"
            >
              September
            </button>
          </div>
          <div className="col-lg col-6 d-grid p-0">
            <button
              onClick={() => setFunc("Oct", month, setMonth)}
              style={{
                backgroundColor: `${month === "Oct" ? "blue" : ""}`,
              }}
              className="mb-2 basic_btn"
            >
              October
            </button>
          </div>
          <div className="col-lg col-6 d-grid p-0">
            <button
              onClick={() => setFunc("Nov", month, setMonth)}
              style={{
                backgroundColor: `${month === "Nov" ? "blue" : ""}`,
              }}
              className="mb-2 basic_btn p-0"
            >
              November
            </button>
          </div>
          <div className="col-lg col-6 d-grid p-0">
            <button
              onClick={() => setFunc("Dec", month, setMonth)}
              style={{
                backgroundColor: `${month === "Dec" ? "blue" : ""}`,
              }}
              className="mb-2 basic_btn p-0"
            >
              December
            </button>
          </div>
        </div>
      </div>
      {/* Filter Button by month end*/}
      <div className="row">
        <div className="col-12 col-md-6">
          <h3 style={{ color: "#3C4B64" }}>Residual List</h3>
        </div>
        <div className="col-12 col-md-6 d-flex justify-content-md-end">
          {/* <button className="btn btn-info btn-lg me-3 text-white">Add New Leads</button>{' '} */}
          <img style={{ cursor: "pointer" }} src={printer} width="32" alt="" />
        </div>
      </div>
      <br />
      {/* ---------search and item per page--------- */}
      <div className="row">
        <div className="col-12 col-md-6 d-flex align-items-center ">
          <span style={{ color: "#212121", fontSize: "14px" }} className="me-2">
            Filter :
          </span>{" "}
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="top-input"
            type="text"
            placeholder="Type here..."
          />
        </div>
        <div className="col-12 col-md-6 d-flex justify-content-md-end">
          <div className="d-flex align-items-center">
            <span
              style={{ color: "#212121", fontSize: "14px" }}
              className="me-2"
            >
              Item Per Page :
            </span>{" "}
            <select
              value={itemPerPage}
              onChange={(e) => setItemPerPage(Number(e.target.value))}
              className="top-input"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={30}>30</option>
            </select>
          </div>
        </div>
      </div>
      {/* ---------search and item per page end--------- */}
      {/* ------All Application table------- */}
      <div className="table-container mt-2">
        <table className="table table-striped table-hover table-bordered">
          <thead style={{ color: "black" }}>
            <tr className="height">
              <th style={{ minWidth: "140px" }}>
                <div
                  onClick={() => {
                    sortingData("mid", setMidSpan);
                  }}
                  className="d-flex px-2 justify-content-center gap-2 align-content-center"
                >
                  <p style={{ textAlign: "end" }}>MID</p>
                  <img
                    style={{ marginTop: "-15px", cursor: "pointer" }}
                    src={arrow}
                    alt=""
                    className={`${
                      midSpan === false ? "rotate" : "rotate-back"
                    }`}
                  />
                </div>
              </th>
              {/* app type className="d-flex justify-content-between align-content-center" */}
              <th>
                <div
                  onClick={() => {
                    sortingData("legal_name", SetLegalNameSpan);
                  }}
                  className="d-flex justify-content-center gap-2 align-content-center"
                >
                  <p>Legal Name</p>
                  <img
                    className={`${
                      legalNameSpan === false ? "rotate" : "rotate-back"
                    }`}
                    style={{ marginTop: "-15px", cursor: "pointer" }}
                    src={arrow}
                    alt=""
                  />
                </div>
              </th>
              {/* legal name */}
              <th>
                <div
                  onClick={() => {
                    sortingData("trading_name", SetTradingNameSpan);
                  }}
                  className="d-flex justify-content-center gap-2 align-content-center"
                >
                  <p>Trading name</p>
                  <img
                    className={`${
                      tradingNameSpan === false ? "rotate" : "rotate-back"
                    }`}
                    style={{ marginTop: "-15px", cursor: "pointer" }}
                    src={arrow}
                    alt=""
                  />
                </div>
              </th>
              {/* trading name */}
              <th>
                <div
                  onClick={() => {
                    sortingData("mid_status", setMidStatusSpan);
                  }}
                  className="d-flex justify-content-center gap-2 align-content-center"
                >
                  <p className="ms-4">Mid status</p>

                  <img
                    style={{ marginTop: "-15px", cursor: "pointer" }}
                    src={arrow}
                    alt=""
                    className={`${
                      midStatusSpan === false ? "rotate" : "rotate-back"
                    }`}
                  />
                </div>
              </th>
              {/* mMID status */}
              <th>
                <div
                  onClick={() => {
                    sortingData("monthly_turnover", setMtrSpan);
                  }}
                  className="d-flex justify-content-center gap-2 align-content-center"
                >
                  <p>Monthly Turnover</p>
                  <img
                    style={{ marginTop: "-15px", cursor: "pointer" }}
                    src={arrow}
                    alt=""
                    className={`${
                      mtrSpan === false ? "rotate" : "rotate-back"
                    }`}
                  />
                </div>
              </th>
              {/* account status */}
              <th>
                <div
                  onClick={() => {
                    sortingData("number_of_tr", setNumberTrSpan);
                  }}
                  className="d-flex justify-content-center gap-2 align-content-center"
                >
                  <p>Number of Transaction</p>
                  <img
                    style={{ marginBottom: "8px", cursor: "pointer" }}
                    src={arrow}
                    alt=""
                    className={`${
                      numberTrSpan === false ? "rotate" : "rotate-back"
                    }`}
                  />
                </div>
              </th>
              {/* Leasing Status */}
              <th>
                <div className="d-flex justify-content-center gap-2 align-content-center">
                  <p>Total Monthly Residual</p>
                </div>
              </th>

              {/* PCI/DSS Compilance */}
              <th>
                <div
                  onClick={() => {
                    sortingData("epos_patrner_residual_amount", setEpraSpan);
                  }}
                  className="d-flex justify-content-center gap-2 align-content-center"
                >
                  <p>
                    {userData?.user_role === 2
                      ? "Partner Manager Residual Amount"
                      : userData?.user_role === 3
                      ? " Epos Partner Residual Amount"
                      : "Sales Partner Residual Amount"}{" "}
                  </p>
                  <img
                    style={{ marginBottom: "8px", cursor: "pointer" }}
                    src={arrow}
                    alt=""
                    className={`${
                      epraSpan === false ? "rotate" : "rotate-back"
                    }`}
                  />
                </div>
              </th>
              {/* PCI/DSS due Date */}
              <th>
                <div
                  onClick={() => {
                    sortingData("statement_month", setStateMonthSpan);
                  }}
                  className="d-flex justify-content-center gap-2 align-content-center"
                >
                  <p>Statemnet Month</p>
                  <img
                    style={{ marginTop: "-15px", cursor: "pointer" }}
                    src={arrow}
                    alt=""
                    className={`${
                      statementMonthSpan === false ? "rotate" : "rotate-back"
                    }`}
                  />
                </div>
              </th>
              {/* PCI/DSS Renewal Date */}
              <th>
                <div className="d-flex justify-content-center gap-2 align-content-center">
                  <p>Residual Details</p>
                  {/* <img style={{ marginTop: '-15px', cursor: 'pointer' }} src={arrow} alt="" /> */}
                </div>
              </th>
              <th style={{ minWidth: "100px", textAlign: "center" }}>
                <div>
                  <p style={{ marginBottom: "0px" }}>View Details</p>
                </div>
              </th>
            </tr>
          </thead>
          <ResidualThead
            search={search}
            handleFilterInput={handleFilterInput}
          />
          <tbody>
            {displayData?.length === 0 ? (
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
                {displayData?.map((data) => (
                  <tr key={data?.id}>
                    <td>{data?.mid}</td>
                    <td>{data?.legal_name}</td>
                    <td>{data?.trading_name}</td>
                    <td>
                      {data?.mid_status && (
                        <button
                          className="btn  text-white"
                          style={{
                            backgroundColor: `${btnBg(data?.mid_status)}`,
                          }}
                        >
                          {data?.mid_status}
                        </button>
                      )}
                    </td>

                    <td>{data?.monthly_turnover}</td>
                    <td>{data?.number_of_tr}</td>
                    <td>{data?.monthly_residual}</td>
                    <td>{data?.epos_patrner_residual_amount}</td>
                    <td>{data?.statement_month}</td>
                    <td>{data?.residual_detail}</td>
                    <td>
                      <div
                        className="d-flex gap-2 align-items-center justify-content-center"
                        style={{ fontSize: "19px" }}
                      >
                        <div
                          onClick={() => {
                            localStorage.setItem(
                              "residualId",
                              `${data?.ptsave_Account?.accountid}`
                            );
                            // c6158ea8-2d37-ec11-8c64-000d3a871df1
                            localStorage.setItem(
                              "residualName",
                              `${data?.legal_name}`
                            );
                            localStorage.setItem(
                              "residualNameTrade",
                              `${data?.trading_name}`
                            );
                            dispatch(
                              GetPricequoteInput(
                                "mid_number",
                                data.ptsave_Account.ptsave_mid
                              )
                            );
                            dispatch(
                              GetPricequoteInput("mid_status", data?.mid_status)
                            );
                            navigate(`/residual-details`);
                          }}
                          className="d-flex justify-content-center view_btn"
                        >
                          <BsEye />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>
      </div>
      {/* --------paggination------- */}
      {(
        <div className="mt-3 d-flex justify-content-start">
          <ReactPaginate
            breakLabel="..."
            nextLabel="&raquo;"
            containerClassName="pagination-container"
            activeClassName="active"
            disabledClassName="disable"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="&laquo;"
            renderOnZeroPageCount={null}
            forcePage={currentPage - 1}
          />
        </div>
      )}
    </div>
  );
}
