// july 4 with problem of force page
import React, { useEffect, useRef, useState } from "react";
import printer from "../../../assets/img/printer.svg";
import list from "../../../assets/img/dossier.svg";

import arrow from "../../../EboardComponents/Custom/Arrow.svg";
import "../Leads/Leads.css";

import axios from "axios";

import { useNavigate } from "react-router-dom";
import Loader from "src/utils/Loader";

import { BsEye } from "react-icons/bs";
import ReactPaginate from "react-paginate";
import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
import Cookies from "js-cookie"; // Import js-cookie
const AllApplication = () => {
  React.useEffect(() => {
    const is_ps_logged_in = Cookies.get("is_ps_logged_in") || "false";

    if (is_ps_logged_in === "false") {
      // history.push("/my_business");
      navigate("/login");
    }
    localStorage.removeItem("leadId");
    localStorage.removeItem("activeStep");
    localStorage.removeItem("quoteId");
    localStorage.removeItem("allAppId");
    localStorage.removeItem("cardTurnover");
    localStorage.removeItem("residualName");
    localStorage.removeItem("rentingFromElavon");
    localStorage.removeItem("quote_id");
    localStorage.removeItem("newAppId");
    localStorage.removeItem("residualId");
    localStorage.removeItem("application_id");
    localStorage.removeItem("priceQId");
    localStorage.removeItem("residualNameTrade");
    localStorage.removeItem("atv");
    localStorage.removeItem("appPd");
  }, []);
  const navigate = useNavigate();
  // initial data and Loader
  const [isLoading, setIsLoading] = useState(true);
  const [applications, setApplications] = useState([]);
  const [copiedAarray, setCopiedArray] = useState([]);
  const chartRef = useRef(null);

  // filter checked
  const [query, setQuery] = useState("");
  const [queryEx, setQueryEx] = useState("");
  const [itemPerPage, setItemPerPage] = useState(10);
  const [newPageCount, SetNewPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [currentItems, setCurrentItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState({
    ptsave_terminal_tracking_number: "",
    accuring_bank: "",
    created_on: "",
    pci_dss_renewal_date: "",
    pci_dss_due_date: "",
    pci_dss_compliance: "",
    trading_name: "",
    legal_name: "",
    application_type: "",
    leasing_status: "",
    account_status: "",
    mid_status: "",
    ptsave_mid: "",
    client_id: "",
    partnet_manager: "",
  });

  const currentDate = new Date();
  const options = { month: "short" };

  const [month, setMonth] = useState("");
  // const [month, setMonth] = useState(fullMonthName);
  const [year, setYear] = useState("");
  // const [year, setYear] = useState(crY.toString());
  const [acquiring, setAcquiring] = useState("");
  // const [acquiring, setAcquiring] = useState("184090000");
  const handleFilterInput = (e) => {
    const InputName = e.target.name;
    const Inputval = e.target.value;
    setSearch((previous_values) => {
      return { ...previous_values, [InputName]: Inputval };
    });
  };
  // span state
  const [sort, setSort] = useState("ASC");
  const [midSpan, setMidSpan] = useState(true);
  const [midStatusSpan, setMidStatusSpan] = useState(true);
  const [accountStatusSpan, setAccountStatusSpan] = useState(true);
  const [pciCompilenceSpan, setPciCompilenceSpan] = useState(true);
  const [pciCompilenceRenualSpan, setPciCompilenceRenualSpan] = useState(true);
  const [pciDueDateSpan, setPciDueDateSpan] = useState(true);
  const [legalNameSpan, SetLegalNameSpan] = useState(true);
  const [tradingNameSpan, SetTradingNameSpan] = useState(true);
  const [partnerSpan, setPartnerSpan] = useState(true);
  const [createdAtSpan, setCreatedAtSpan] = useState(true);
  const [acquiringBankSpan, setAcquiringBankSpan] = useState(true);
  const [noteSpan, setNoteSpan] = useState(true);
  const userData = JSON.parse(Cookies.get("userData"));
  // paggination State

  const [total_item, setTotal_item] = useState(0);

  const [pageNumber, setPageNumber] = useState(1);
  // const [nextUrl, setNextUrl] = useState(null);
  // const [prevUrl, setPrevUrl] = useState(null);
  const limit = itemPerPage;

  const pageCount = Math.ceil(total_item / limit);

  const [label, setLabel] = useState([]);
  const [chartData, setChartData] = useState([]);

  const getNewApplications = (url) => {
    axios
      .get(url)
      .then((res) => {
        setApplications([]);
        const newData = res?.data?.data?.map((curr) => ({
          ...curr,

          ptsave_mid: curr?.ptsave_mid ? curr?.ptsave_mid : "",
          trading_name: curr?.ptsave_trading_name
            ? curr?.ptsave_trading_name
            : "",
          legal_name: curr?.name ? curr?.name : "",
          partnet_manager: curr?.[
            "_parentaccountid_value@OData.Community.Display.V1.FormattedValue"
          ]
            ? curr?.[
                "_parentaccountid_value@OData.Community.Display.V1.FormattedValue"
              ]
            : " ",
          ptsave_terminal_tracking_number: curr?.ptsave_terminal_tracking_number
            ? curr?.ptsave_terminal_tracking_number
            : "",
          application_type:
            curr?.[
              "ptsave_opportunitytype@OData.Community.Display.V1.FormattedValue"
            ],
          mid_status: curr?.[
            "ptsave_status@OData.Community.Display.V1.FormattedValue"
          ]
            ? curr?.["ptsave_status@OData.Community.Display.V1.FormattedValue"]
            : "",
          account_status:
            curr?.[
              "ptsave_back_office_stage@OData.Community.Display.V1.FormattedValue"
            ],
          leasing_status: curr?.[
            "ptsave_leasestatus@OData.Community.Display.V1.FormattedValue"
          ]
            ? curr?.[
                "ptsave_leasestatus@OData.Community.Display.V1.FormattedValue"
              ]
            : "",
          comission:
            curr?.[
              "ptsave_totalcomissioncalculated_base@OData.Community.Display.V1.FormattedValue"
            ],
          pci_dss_compliance:
            curr?.[
              "ptsave_pcicompliance@OData.Community.Display.V1.FormattedValue"
            ],
          pci_dss_due_date: curr?.[
            "ptsave_pci1stduedate@OData.Community.Display.V1.FormattedValue"
          ]
            ? curr?.[
                "ptsave_pci1stduedate@OData.Community.Display.V1.FormattedValue"
              ]
            : "",
          pci_dss_renewal_date: curr?.[
            "ptsave_pcirenewaldate@OData.Community.Display.V1.FormattedValue"
          ]
            ? curr?.[
                "ptsave_pcirenewaldate@OData.Community.Display.V1.FormattedValue"
              ]
            : "",
          created_on: curr?.[
            "createdon@OData.Community.Display.V1.FormattedValue"
          ]
            ? curr?.["createdon@OData.Community.Display.V1.FormattedValue"]
            : "",
          accuring_bank: curr?.[
            "ptsave_acquiring_bank@OData.Community.Display.V1.FormattedValue"
          ]
            ? curr?.[
                "ptsave_acquiring_bank@OData.Community.Display.V1.FormattedValue"
              ]
            : "",
        }));

        setApplications(newData);
        setCopiedArray(newData);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        // const message = JSON.parse(err?.request?.response)?.message;
        console.log(err);
      });
  };
  // console.log(applications, "ft");
  // calling all aData
  useEffect(() => {
    if (month !== "" && year !== "") {
      setIsLoading(true);
      getNewApplications(
        `${
          process.env.REACT_APP_BASE_URL
        }api/v1/application/applications/?application_status=0&month=${month}&year=${year}${
          acquiring && `&acquiring_bank=${acquiring}`
        }`
      );
    } else if (month === "" && year === "") {
      setIsLoading(true);
      getNewApplications(
        `${
          process.env.REACT_APP_BASE_URL
        }api/v1/application/applications/?application_status=0${
          acquiring && `&acquiring_bank=${acquiring}`
        }`
      );
    }
  }, [pageNumber, itemPerPage, month, year, acquiring]);
  // sorting

  const handleSearchApi = () => {
    // if(query){
    setIsLoading(true);
    getNewApplications(
      `${
        process.env.REACT_APP_BASE_URL
      }api/v1/application/applications/?application_status=0${
        acquiring && `&acquiring_bank=${acquiring}`
      }`
    );
    // }
    // else{
    //   showToast('error','Type text first')
    // }
  };

  const sortingData = (sortBy, stateSpan) => {
    if (sortBy === "created_on") {
      if (sort === "ASC") {
        const sorted = [...applications].sort((a, b) => {
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

        setApplications(sorted);
        setSort("DSC");
        stateSpan(!true);
      } else if (sort === "DSC") {
        // const sorted = [...copiedAarray].sort((a, b) =>
        //   a[sortBy].toLowerCase() < b[sortBy].toLowerCase() ? 1 : -1
        //   // a[sortBy].toLowerCase() < b[sortBy].toLowerCase() ? 1 : -1
        // );

        // adding
        const sorted = [...applications].sort((a, b) => {
          const dateA = new Date(a[sortBy]);
          const dateB = new Date(b[sortBy]);
          return dateB - dateA;
        });
        setApplications(sorted);
        setSort("ASC");
        stateSpan(!false);
      }
    } else {
      if (sort === "ASC") {
        const sorted = [...applications].sort((a, b) =>
          a[sortBy]?.toLowerCase() > b[sortBy]?.toLowerCase() ? 1 : -1
        );
        setApplications(sorted);
        setSort("DSC");
        stateSpan(!true);
      } else if (sort === "DSC") {
        const sorted = [...applications].sort((a, b) =>
          a[sortBy]?.toLowerCase() < b[sortBy]?.toLowerCase() ? 1 : -1
        );
        setApplications(sorted);
        setSort("ASC");
        stateSpan(!false);
      }
    }
  };

  // for chart
  // Calculate applications per month and render the chart
  // useEffect(() => {
  //   if (isLoading === false) {
  //     const applicationsPerMonth = applications?.reduce((result, item) => {
  //       const createdDate = new Date(item?.createdon);
  //       const monthYear = `${
  //         createdDate.getMonth() + 1
  //       }/${createdDate.getFullYear()}`;
  //       result[monthYear] = (result[monthYear] || 0) + 1;
  //       return result;
  //     }, {});

  //     // Get the last 12 months
  //     const currentDate = new Date();
  //     const labels = [];
  //     const data = [];
  //     for (let i = 11; i >= 0; i--) {
  //       const monthYear = new Date(
  //         currentDate.getFullYear(),
  //         currentDate.getMonth() - i
  //       );
  //       const month = monthYear.getMonth() + 1;
  //       const year = monthYear.getFullYear();
  //       const label = `${month}/${year}`;
  //       labels.push(label);
  //       data.push(applicationsPerMonth[label] || 0);
  //     }

  //     // Fill in missing months with zero values
  //     const firstValidIndex = data.findIndex((value) => value > 0);
  //     if (firstValidIndex !== -1) {
  //       for (let i = 0; i < firstValidIndex; i++) {
  //         data[i] = 0;
  //       }
  //     }

  //     if (chartRef?.current) {
  //       chartRef.current.destroy();
  //     }
  //     setLabel(labels);
  //     setChartData(applicationsPerMonth[label] || 0);
  //     // Render the chart
  //     const chartElement = document.getElementById("chart");
  //     chartRef.current = new Chart(chartElement, {
  //       type: "bar",
  //       data: {
  //         labels,
  //         datasets: [
  //           {
  //             label: "Applications",
  //             data,
  //             backgroundColor: "#25A9DF",
  //           },
  //         ],
  //       },
  //       options: {
  //         scales: {
  //           x: {
  //             grid: {
  //               display: false, // To hide the x-axis gridlines
  //             },
  //             beginAtZero: true,
  //             precision: 0,
  //           },
  //           y: {
  //             grid: {
  //               display: false, // To hide the y-axis gridlines
  //             },
  //           },
  //         },
  //       },
  //     });
  //   }
  // }, [applications]);
  const [labels, setLabels] = useState([]);
  const pastelColors = [
    '#FFB3BA', '#4e79a6', '#76b7b1', '#e15659', '#00a5ca',
    '#D5BAFF', '#9b755e', '#f28e2c','#C7CEEA', '#b17aa1', '#FCC2FF',
    '#59a14f', 
  ];

  useEffect(() => {
    if (!isLoading) {
      const applicationsPerMonth = applications?.reduce((result, item) => {
        const createdDate = new Date(item?.createdon);
        const monthYear = `${createdDate.getMonth() + 1}/${createdDate.getFullYear()}`;
        result[monthYear] = (result[monthYear] || 0) + 1;
        return result;
      }, {});

      // Get the last 12 months
      const currentDate = new Date();
      const labels = [];
      const data = [];
      for (let i = 11; i >= 0; i--) {
        const monthYear = new Date(currentDate.getFullYear(), currentDate.getMonth() - i);
        const month = monthYear.getMonth() + 1;
        const year = monthYear.getFullYear();
        const label = `${month}/${year}`;
        labels.push(label);
        data.push(applicationsPerMonth[label] || 0);
      }

      // Fill in missing months with zero values
      const firstValidIndex = data.findIndex((value) => value > 0);
      if (firstValidIndex !== -1) {
        for (let i = 0; i < firstValidIndex; i++) {
          data[i] = 0;
        }
      }

      if (chartRef.current) {
        chartRef.current.destroy();
      }

      setLabels(labels);
      setChartData(data);

      const chartElement = document.getElementById("chart");
      chartRef.current = new Chart(chartElement, {
        type: "bar",
        data: {
          labels,
          datasets: [
            {
              label: "Applications",
              data,
              backgroundColor: data.map((_, index) => pastelColors[index % pastelColors.length]), // Use pastel colors
            },
          ],
        },
        options: {
          plugins: {
            datalabels: {
              anchor: 'end',
              align: 'end',
              color: 'gray',
              font: {
                weight: 'normal',
              },
              formatter: (value) => value,
            },
          },
          scales: {
            x: {
              grid: {
                display: false, // To hide the x-axis gridlines
              },
              beginAtZero: true,
              precision: 0,
            },
            y: {
              grid: {
                display: false, // To hide the y-axis gridlines
              },
            },
          },
        },
        plugins: [ChartDataLabels], // Include the plugin for data labels
      });
    }
  }, [applications]);

  const keys = [
    "ptsave_terminal_tracking_number",
    "accuring_bank",
    "created_on",
    "pci_dss_renewal_date",
    "pci_dss_due_date",
    "pci_dss_compliance",
    "trading_name",
    "legal_name",
    "application_type",
    "leasing_status",
    "account_status",
    "mid_status",
    "ptsave_mid",
    "client_id",
    "partnet_manager",
  ];

  // filter
  const displayData2 = applications
    ?.filter((item) =>
      keys.some((key) => {
        const value = item[key]?.toLowerCase();
        const queryLower = query.toLowerCase();
        return value?.includes(queryLower);
      })
    )
    .filter((fill) => {
      if (
        fill.application_type
          ?.toLowerCase()
          .includes(search.application_type.toLowerCase())
      ) {
        return fill;
      }
    })
    ?.filter((fill) => {
      if (
        search.legal_name === "" ||
        search.trading_name === "" ||
        search?.created_at === "" ||
        !fill.mid_status ||
        search.pci_dss_compliance === "" ||
        fill?.ptsave_mid === "" ||
        search?.ptsave_mid === ""
      ) {
        return fill;
      }
    })
    .filter((fill) => {
      if (
        fill.ptsave_mid?.toLowerCase().includes(search.ptsave_mid.toLowerCase())
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
        fill?.mid_status
          ?.toLowerCase()
          .includes(search?.mid_status?.toLowerCase())
      ) {
        return fill;
      }
    })
    .filter((fill) => {
      if (
        fill.account_status
          ?.toLowerCase()
          .includes(search.account_status.toLowerCase())
      ) {
        return fill;
      }
    })
    // problm lasing
    .filter((fill) => {
      if (
        fill.leasing_status
          ?.toLowerCase()
          .includes(search.leasing_status.toLowerCase())
      ) {
        return fill;
      }
    })
    .filter((fill) => {
      if (
        fill.pci_dss_compliance
          ?.toLowerCase()
          .includes(search.pci_dss_compliance.toLowerCase())
      ) {
        return fill;
      }
    })

    .filter((fill) => {
      if (
        fill.pci_dss_due_date
          ?.toLowerCase()
          .includes(search.pci_dss_due_date.toLowerCase())
      ) {
        return fill;
      }
    })

    .filter((fill) => {
      if (
        fill.pci_dss_renewal_date
          ?.toLowerCase()
          .includes(search.pci_dss_renewal_date.toLowerCase())
      ) {
        return fill;
      }
    })
    .filter((fill) => {
      if (
        fill.created_on?.toLowerCase().includes(search.created_on.toLowerCase())
      ) {
        return fill;
      }
    })
    .filter((fill) => {
      if (
        fill.accuring_bank
          ?.toLowerCase()
          .includes(search.accuring_bank.toLowerCase())
      ) {
        return fill;
      }
    })
    .filter((fill) => {
      if (
        fill.ptsave_terminal_tracking_number
          ?.toLowerCase()
          .includes(search.ptsave_terminal_tracking_number.toLowerCase())
      ) {
        return fill;
      }
    })
    .filter((fill) => {
      if (
        fill.partnet_manager
          ?.toLowerCase()
          .includes(search.partnet_manager.toLowerCase())
      ) {
        return fill;
      }
    });

  const endOffset = itemOffset + itemPerPage;
  const displayData = displayData2?.slice(itemOffset, endOffset);

  useEffect(() => {
    if (pageCount !== 0) {
      if (pageCount < pageNumber) {
        setPageNumber(pageCount);
      }
    }
  }, [pageCount]);

  // ------------new pagination----------

  useEffect(() => {
    // const endOffset = itemOffset + itemPerPage;
    setCurrentItems(applications?.slice(itemOffset, endOffset));
    SetNewPageCount(Math.ceil(displayData2?.length / itemPerPage));
  }, [itemOffset, itemPerPage, displayData2?.length]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemPerPage) % applications?.length;
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

  const divRef = useRef(null);

  const handleScroll = (event) => {
    const container = divRef.current;
    const scrollAmount = event.deltaX;
    container.scrollLeft += scrollAmount;
  };
  if (isLoading) {
    return (
      <>
        <Loader />
      </>
    );
  }
  const btnBg = (data) => {
    if (data === "In Arrears") return "#dc3545"; //no
    if (data === "Inactive") return "#dc3545"; //no
    if (data === "Not Applicable") return "#EF5350"; //no
    if (data === "Paid") return "#66BB6A"; //no
    if (data === "Not Paid") return "#FFA000"; //no
    if (data === "Active") {
      return "#28a745";
    } else if (data === "Inactive") {
      return "#dc3545";
      //1
    } else if (data === "Sent to Bank") {
      return "#2EB85C";
      //4
    } else if (data === "Bank Query") {
      return "#EF5350";
      //9
    } else if (data === "Auto Withdrawn") {
      return "#66BB6A";
      //2
    } else if (data === "Query Result") {
      return "#66BB6A";
      //3
    } else if (data === "Terminal Ordered") {
      return "#D32F2F";
      //5
    } else if (data === "Live") {
      return "#28a745";
      //6
    } else if (data === "Dispatched") {
      return "#F9B115";
      //7
    } else if (data === "Transacting") {
      return "#38B6FF";
      //8
    } else if (data === "Approved") {
      return "#17479D";
      //10
    } else if (data === "Terminal Delivered") {
      return "#66BB6A";
    } else if (data === "Deactivated") {
      return "#d32f2f";
    } else if (data === "Reserve") {
      return "#FFB300";
    } else if (data === "Open") {
      return "#28a745";
    } else if (data === "Re-opened") {
      return "#66bb6a";
      //11
    } else if (data === "Not Live") {
      return "#FFC107";
      //12
    } else if (data === "Not Transacting") {
      return "#D32F2F";
      //13
    } else if (data === "Declined") {
      return "#D32F2F";
      //14
    } else if (data === "Closed") {
      return "#EF5350";
      //15
    } else if (data === "Fraud Closed") {
      return "#D32F2F";
      //16
    } else if (data === "Cancelled") {
      return "#EF5350";
    } else if (data === "In Arrears") {
      return "#EE8EC1";
    } else if (data === "Default") {
      return "#33B5FF";
    } else if (data === "Transferred") {
      return "#3D33FF";
    } else if (data === "Hold") {
      return "#FFC107";
    } else if (data === "Unpaid") {
      return "#FFA000";
    } else if (data === "Application Signed Back") {
      return "#66BB6A";
    } else if (data === "Application signed back") {
      return "#66BB6A";
    } else return "#28a745";
  };
  return (
    <div>
      <div className=" container mb-3">
        <canvas id="chart" width="300" height="130"></canvas>
      </div>
      <div className="row">
        <div className="col-md-2"></div>
        <div className="col-md-8"></div>
        <div className="col-md-2"></div>
        <div className="col-12 col-md-6">
          <h3 style={{ color: "#3C4B64" }}>
            <img src={list} width="32" className="me-2" alt="" />
            All Application
          </h3>
        </div>
        <div className="col-12 col-md-6 d-flex justify-content-md-end">
          {/* <button  className="btn btn-info btn-lg me-3 text-white">Add New Leads</button>{' '} */}
          <img style={{ cursor: "pointer" }} src={printer} width="32" alt="" />
        </div>
      </div>
      <br />
      {/* ---------search and item per page--------- */}
      <div className="row">
        <div className="col-12 col-lg-4 d-flex align-items-center my-2">
          <span style={{ color: "#212121", fontSize: "14px" }} className="me-2">
            Filter :
          </span>{" "}
          <input
            value={queryEx}
            onChange={(e) => {
              setQuery(e.target.value);
              setQueryEx(e.target.value);
            }}
            className="top-input"
            type="text"
            placeholder="Type Here..."
          />
          <button
            className="btn basic_btn ms-2 btn-sm"
            onClick={handleSearchApi}
          >
            Search
          </button>
        </div>
        <div className="col-12 col-lg-8 d-flex justify-content-lg-end">
          <div className="d-flex align-items-center my-2">
            <span
              style={{ color: "#212121", fontSize: "14px" }}
              className="me-2"
            >
              Acquiring Bank :
            </span>{" "}
            <select
              value={acquiring}
              onChange={(e) => {
                setAcquiring(e.target.value);
              }}
              className="top-input"
            >
              <option value={""}>...</option>
              <option value={"184090000"}>Elavon</option>
              <option value={"184090005"}>First Data</option>
              <option value={"100000000"}>Emerchant Pay</option>
              <option value={"184090002"}>World Pay</option>
              <option value={"184090006"}>Barclayard/Utp</option>
              <option value={"184090007"}>Trust payment</option>
              <option value={"184090003"}>Viva wallet</option>
              <option value={"184090008"}>Cashflows</option>
              <option value={"184090004"}>Evopayment/Cardcutter</option>
              <option value={"184090001"}>myPOS</option>
            </select>
          </div>
          <div className="d-flex ms-1 align-items-center my-2">
            <span
              style={{ color: "#212121", fontSize: "14px" }}
              className="me-2"
            >
              Year :
            </span>{" "}
            <select
              value={year}
              onChange={(e) => {
                setYear(e.target.value);
              }}
              className="top-input"
            >
              <option value={""}>...</option>
              <option value={2016}>2016</option>
              <option value={2017}>2017</option>
              <option value={2018}>2018</option>
              <option value={2019}>2019</option>
              <option value={2020}>2020</option>
              <option value={2021}>2021</option>
              <option value={2022}>2022</option>
              <option value={2023}>2023</option>
              <option value={2024}>2024</option>
            </select>
          </div>
          <div className="ms-1 d-flex align-items-center my-2">
            <span
              style={{ color: "#212121", fontSize: "14px" }}
              className="me-2"
            >
              Month :
            </span>{" "}
            <select
              value={month}
              onChange={(e) => {
                setMonth(e.target.value);
                // setCurrentPage(1);
              }}
              className="top-input"
            >
              <option value="">...</option>
              <option value="Jan">January</option>
              <option value="Feb">February</option>
              <option value="Mar">March</option>
              <option value="Apr">April</option>
              <option value="May">May</option>
              <option value="Jun">June</option>
              <option value="Jul">July</option>
              <option value="Aug">August</option>
              <option value="Sep">September</option>
              <option value="Oct">October</option>
              <option value="Nov">November</option>
              <option value="Dec">December</option>
            </select>
          </div>
        </div>
      </div>
      {/* ---------search and item per page end--------- */}
      {/* ------All Application table------- */}
      <div className="table-container mt-2" ref={divRef} onWheel={handleScroll}>
        <table className="table table-striped table-hover table-bordered">
          <thead style={{ color: "black" }}>
            <tr className="height">
              <th style={{ minWidth: "140px" }}>
                <div
                  className="d-flex px-2 justify-content-center gap-2 align-content-center"
                  onClick={() => {
                    sortingData("mid", setMidSpan);
                  }}
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
              {userData?.customer_type === "Partner Manager" && (
                <th>
                  <div
                    onClick={() => {
                      sortingData("partnet_manager", setPartnerSpan);
                    }}
                    className="d-flex justify-content-center gap-2 align-content-center"
                  >
                    <p>Partner</p>
                    <img
                      style={{ marginTop: "-15px", cursor: "pointer" }}
                      src={arrow}
                      alt=""
                      className={`${
                        partnerSpan === false ? "rotate" : "rotate-back"
                      }`}
                    />
                  </div>
                </th>
              )}
              {/* app type className="d-flex justify-content-between align-content-center" */}
              <th>
                <div>
                  <p>Application Type</p>
                  {/* <img style={{ marginTop: '-15px', cursor: 'pointer' }} src={arrow} alt="" /> */}
                </div>
              </th>
              {/* legal name */}
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
              {/* trading name */}
              <th>
                <div
                  onClick={() => {
                    sortingData("trading_name", SetTradingNameSpan);
                  }}
                  className="d-flex justify-content-center gap-2 align-content-center"
                >
                  <p className="ms-4">Trading Name</p>

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
              {/* mMID status */}
              <th>
                <div
                  className="d-flex justify-content-center gap-2 align-content-center"
                  onClick={() => {
                    sortingData("mid_status", setMidStatusSpan);
                  }}
                >
                  <p>MID Status</p>
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
              {/* account status */}
              <th>
                <div
                  className="d-flex justify-content-center gap-2 align-content-center"
                  onClick={() => {
                    sortingData("account_status", setAccountStatusSpan);
                  }}
                >
                  <p>Account Status</p>
                  <img
                    style={{ marginBottom: "8px", cursor: "pointer" }}
                    src={arrow}
                    alt=""
                    className={`${
                      accountStatusSpan === false ? "rotate" : "rotate-back"
                    }`}
                  />
                </div>
              </th>
              {/* Leasing Status */}
              <th>
                <div className="d-flex justify-content-center gap-2 align-content-center">
                  <p>Leasing Status</p>
                  {/* <img style={{ marginBottom: '8px', cursor: 'pointer' }} src={arrow} alt="" /> */}
                </div>
              </th>
              {/* PCI/DSS Compliance */}
              <th>
                <div
                  className="d-flex justify-content-center gap-2 align-content-center"
                  onClick={() => {
                    sortingData("pci_dss_compliance", setPciCompilenceSpan);
                  }}
                >
                  <p>PCI/DSS Compliance</p>
                  <img
                    style={{ marginBottom: "8px", cursor: "pointer" }}
                    src={arrow}
                    alt=""
                    className={`${
                      pciCompilenceSpan === false ? "rotate" : "rotate-back"
                    }`}
                  />
                </div>
              </th>
              {/* PCI/DSS due Date */}
              <th>
                <div
                  className="d-flex justify-content-center gap-2 align-content-center"
                  onClick={() => {
                    sortingData("pci_dss_due_date", setPciDueDateSpan);
                  }}
                >
                  <p>PCI/DSS Due Date</p>
                  <img
                    style={{ marginTop: "-15px", cursor: "pointer" }}
                    src={arrow}
                    alt=""
                    className={`${
                      pciDueDateSpan === false ? "rotate" : "rotate-back"
                    }`}
                  />
                </div>
              </th>
              {/* PCI/DSS Renewal Date */}
              <th>
                <div
                  className="d-flex justify-content-center gap-2 align-content-center"
                  onClick={() => {
                    sortingData(
                      "pci_dss_renewal_date",
                      setPciCompilenceRenualSpan
                    );
                  }}
                >
                  <p>PCI/DSS Renewal Date</p>
                  <img
                    style={{ marginTop: "-15px", cursor: "pointer" }}
                    src={arrow}
                    alt=""
                    className={`${
                      pciCompilenceRenualSpan === false
                        ? "rotate"
                        : "rotate-back"
                    }`}
                  />
                </div>
              </th>
              <th>
                <div
                  onClick={() => {
                    sortingData("created_at", setCreatedAtSpan);
                  }}
                  className="d-flex justify-content-center gap-2 align-content-center"
                >
                  <p>Created On</p>
                  <img
                    className={`${
                      createdAtSpan === false ? "rotate" : "rotate-back"
                    }`}
                    style={{ marginTop: "-15px", cursor: "pointer" }}
                    src={arrow}
                    alt=""
                  />
                </div>
              </th>
              <th>
                <div
                  onClick={() => {
                    sortingData("acquiring_bank", setAcquiringBankSpan);
                  }}
                  className="d-flex justify-content-center gap-2 align-content-center"
                >
                  <p>Acquiring Bank</p>
                  <img
                    className={`${
                      acquiringBankSpan === false ? "rotate" : "rotate-back"
                    }`}
                    style={{ marginTop: "-15px", cursor: "pointer" }}
                    src={arrow}
                    alt=""
                  />
                </div>
              </th>
              <th>
                <div
                  onClick={() => {
                    sortingData("ptsave_terminal_tracking_number", setNoteSpan);
                  }}
                  className="d-flex justify-content-center gap-2 align-content-center"
                >
                  <p>All Applicatin Note</p>
                  <img
                    className={`${
                      noteSpan === false ? "rotate" : "rotate-back"
                    }`}
                    style={{ marginTop: "-15px", cursor: "pointer" }}
                    src={arrow}
                    alt=""
                  />
                </div>
              </th>

              <th>
                <div className="d-flex justify-content-center gap-2 align-content-center">
                  <p>Products Details</p>
                </div>
              </th>

              <th style={{ minWidth: "100px", textAlign: "center" }}>
                <div>
                  <p style={{ marginBottom: "0px" }}>Action</p>
                </div>
              </th>
            </tr>
          </thead>
          <thead>
            <tr
              style={{
                borderTop: "2px solid #d8dbe0",
                borderBottom: "2px solid #d8dbe0",
              }}
            >
              <th>
                <div>
                  <input
                    style={{
                      minWidth: "120px",
                      maxWidth: "120px",
                      height: "30px",
                    }}
                    type="text"
                    className="top-input"
                    name="ptsave_mid"
                    onChange={handleFilterInput}
                    value={search["ptsave_mid"]}
                  />
                </div>
              </th>
              {userData?.customer_type === "Partner Manager" && (
                <th>
                  <div>
                    <input
                      style={{
                        minWidth: "180px",
                        maxWidth: "140px",
                        height: "30px",
                      }}
                      type="text"
                      className="top-input"
                      name="partnet_manager"
                      onChange={handleFilterInput}
                      value={search["partnet_manager"]}
                    />
                  </div>
                </th>
              )}
              {/* app type */}
              <th>
                <div>
                  <input
                    style={{
                      minWidth: "140px",
                      maxWidth: "140px",
                      height: "30px",
                    }}
                    type="text"
                    className="top-input"
                    name="application_type"
                    onChange={handleFilterInput}
                    value={search["application_type"]}
                  />
                </div>
              </th>
              {/* legalname */}
              <th>
                <div>
                  <input
                    style={{
                      minWidth: "140px",
                      maxWidth: "140px",
                      height: "30px",
                    }}
                    type="text"
                    className="top-input"
                    name="legal_name"
                    onChange={handleFilterInput}
                    value={search["legal_name"]}
                  />
                </div>
              </th>
              {/* trading name */}
              <th>
                <div>
                  <input
                    style={{
                      minWidth: "150px",
                      maxWidth: "150px",
                      height: "30px",
                    }}
                    type="text"
                    className="top-input"
                    name="trading_name"
                    onChange={handleFilterInput}
                    value={search["trading_name"]}
                  />
                </div>
              </th>
              {/* mid stat */}
              <th>
                <div>
                  <input
                    style={{
                      minWidth: "110px",
                      maxWidth: "110px",
                      height: "30px",
                    }}
                    type="text"
                    className="top-input"
                    name="mid_status"
                    onChange={handleFilterInput}
                    value={search["mid_status"]}
                  />
                </div>
              </th>
              {/* account date */}
              <th>
                <div>
                  <input
                    style={{
                      minWidth: "150px",
                      maxWidth: "150px",
                      height: "30px",
                    }}
                    type="text"
                    className="top-input"
                    name="account_status"
                    onChange={handleFilterInput}
                    value={search["account_status"]}
                  />
                </div>
              </th>
              {/* Leasing Status */}
              <th>
                <div>
                  <input
                    style={{
                      minWidth: "190px",
                      maxWidth: "190px",
                      height: "30px",
                    }}
                    type="text"
                    className="top-input"
                    name="leasing_status"
                    onChange={handleFilterInput}
                    value={search["leasing_status"]}
                  />
                </div>
              </th>
              {/* PCI/DSS Compliance */}
              <th>
                <div>
                  <input
                    style={{
                      minWidth: "150px",
                      maxWidth: "150px",
                      height: "30px",
                    }}
                    type="text"
                    className="top-input"
                    name="pci_dss_compliance"
                    onChange={handleFilterInput}
                    value={search["pci_dss_compliance"]}
                  />
                </div>
              </th>
              {/* PCI/DSS due Date */}
              <th>
                <div>
                  <input
                    style={{
                      minWidth: "180px",
                      maxWidth: "140px",
                      height: "30px",
                    }}
                    type="text"
                    className="top-input"
                    name="pci_dss_due_date"
                    onChange={handleFilterInput}
                    value={search["pci_dss_due_date"]}
                  />
                </div>
              </th>
              {/* PCI/DSS Renewal Date */}
              <th>
                <div>
                  <input
                    style={{
                      minWidth: "180px",
                      maxWidth: "140px",
                      height: "30px",
                    }}
                    type="text"
                    className="top-input"
                    name="pci_dss_renewal_date"
                    onChange={handleFilterInput}
                    value={search["pci_dss_renewal_date"]}
                  />
                </div>
              </th>
              <th>
                <div>
                  <input
                    style={{
                      minWidth: "180px",
                      maxWidth: "140px",
                      height: "30px",
                    }}
                    type="text"
                    className="top-input"
                    name="created_on"
                    onChange={handleFilterInput}
                    value={search["created_on"]}
                  />
                </div>
              </th>
              <th>
                <div>
                  <input
                    style={{
                      minWidth: "180px",
                      maxWidth: "140px",
                      height: "30px",
                    }}
                    type="text"
                    className="top-input"
                    name="accuring_bank"
                    onChange={handleFilterInput}
                    value={search["accuring_bank"]}
                  />
                </div>
              </th>
              <th>
                <div>
                  <input
                    style={{
                      minWidth: "180px",
                      maxWidth: "140px",
                      height: "30px",
                    }}
                    type="text"
                    className="top-input"
                    name="ptsave_terminal_tracking_number"
                    onChange={handleFilterInput}
                    value={search["ptsave_terminal_tracking_number"]}
                  />
                </div>
              </th>

              <th>
                <div>
                  <input
                    style={{
                      minWidth: "180px",
                      maxWidth: "140px",
                      height: "30px",
                    }}
                    type="text"
                    className="top-input opacity-0"
                  />
                </div>
              </th>

              <th>
                {/* <div style={{ opacity: '0' }}>
                  <input type="text" className="top-input" />
                </div> */}
              </th>
            </tr>
          </thead>
          <tbody>
            {displayData?.length === 0 ? (
              <tr>
                <td colSpan="15">
                  <div className="not_found">
                    <h4 className="my-4">No Data Found</h4>
                  </div>
                </td>
              </tr>
            ) : (
              displayData?.map((app) => (
                <tr key={app?.id}>
                  <td>{app?.ptsave_mid}</td>
                  {userData?.customer_type === "Partner Manager" && (
                    <td>{app?.partnet_manager}</td>
                  )}
                  <td>
                    {app?.application_type}
                    {/* {
                          app?.[
                            "ptsave_opportunitytype@OData.Community.Display.V1.FormattedValue"
                          ]
                        } */}
                  </td>
                  <td>{app?.legal_name}</td>
                  <td>{app?.trading_name}</td>
                  <td>
                    {app?.mid_status?.length > 1 ? (
                      <button
                        className="btn text-white"
                        style={{
                          backgroundColor: `${btnBg(app?.mid_status)}`,
                        }}
                      >
                        {app?.mid_status}
                      </button>
                    ) : (
                      ""
                    )}
                  </td>
                  <td>
                    {app?.account_status ? (
                      <button
                        className="btn text-white"
                        style={{
                          backgroundColor: `${btnBg(app?.account_status)}`,
                        }}
                      >
                        {app?.account_status}
                      </button>
                    ) : (
                      ""
                    )}
                  </td>
                  <td>
                    {app.leasing_status ? (
                      <button
                        className="btn  text-white"
                        style={{
                          backgroundColor: `${btnBg(app?.leasing_status)}`,
                        }}
                      >
                        {app?.leasing_status}
                      </button>
                    ) : (
                      ""
                    )}
                  </td>

                  <td>
                    {app?.pci_dss_compliance === "Yes" ? (
                      <button className="btn btn-success text-white">
                        {/* {app?.pci_dss_compliance} */}
                        Compliance
                      </button>
                    ) : (
                      <button className="btn btn-danger text-white">
                        {/* {app?.pci_dss_compliance} */}
                        Not Compliance
                      </button>
                    )}
                  </td>

                  <td>{app?.pci_dss_due_date}</td>
                  <td>{app?.pci_dss_renewal_date}</td>
                  <td>{app?.created_on}</td>
                  <td>{app?.accuring_bank}</td>
                  <td>{app?.["ptsave_terminal_tracking_number"]}</td>
                  <td>
                    <div>
                      <p
                        onClick={() => {
                          localStorage.setItem("allAppId", app?.accountid);
                          navigate("/all-application-porduct-details");
                        }}
                        style={{
                          color: "blue",
                          textDecoration: "underline",
                          cursor: "pointer",
                        }}
                      >
                        View Details
                      </p>
                    </div>
                    {/* <a href="/all-application-porduct-details"></a> */}
                  </td>

                  <td>
                    <div
                      className="d-flex gap-2 align-items-center justify-content-center"
                      style={{ fontSize: "19px" }}
                    >
                      <div
                        onClick={() => {
                          localStorage.setItem("allAppId", app?.accountid);
                          navigate(`/all-application-preview`);
                        }}
                        className="d-flex justify-content-center view_btn"
                      >
                        <BsEye />
                      </div>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="mt-3 d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center ms-1 ">
          <span className="me-1">Total Item : {applications?.length}</span>
          <span style={{ color: "#212121", fontSize: "14px" }} className="me-2">
            Item Per Page :
          </span>{" "}
          <select
            value={itemPerPage}
            onChange={(e) => {
              setItemPerPage(Number(e.target.value));
              // setCurrentPage(1);
            }}
            className="top-input"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
          </select>
        </div>
        <div>
          <ReactPaginate
            breakLabel="..."
            nextLabel="&raquo;"
            containerClassName="pagination-container"
            activeClassName="active"
            disabledClassName="disable"
            onPageChange={handlePageClick}
            pageRangeDisplayed={2}
            marginPagesDisplayed={2}
            pageCount={newPageCount}
            previousLabel="&laquo;"
            renderOnZeroPageCount={null}
            forcePage={currentPage}
            // initialSelected={1}
          />
        </div>
      </div>
     
    </div>
  );
};

export default AllApplication;
