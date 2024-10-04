import React from "react";

import PropTypes from "prop-types";
const AllApplicationSof = ({ quote }) => {
  AllApplicationSof.propTypes = {
    quote: PropTypes.object.isRequired,
  };

  return (
    <div className="buissness-data " style={{ backgroundColor: "#f5f5f5" }}>
      <div className="row">
      <div style={{ backgroundColor: "#f5f5f5", margin: "0 26px" }}>
            <p
              style={{
                fontWeight: "bold",
              }}
              className="pt-3"
            >
              Schedule of Fees 
            </p>
          </div>
        <div className="col-md-12">
          <div className="table-responsive p-4">
            <table className="table table-striped number-center">
              <thead>
                <tr>
                  <th style={{ color: "#333333" }}>Card Type</th>
                  <th>MSC Rate (%)</th>
                  <th>(£) MSC Rate Per Transaction</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td >Visa Credit</td>
                  <td>
                   
                      {
                        quote?.opportunity?.[
                          "ptsave_visacreditsecrate@OData.Community.Display.V1.FormattedValue"
                        ]
                      }
                 
                  </td>

                  <td>{quote?.ptsave_visamastercardcreditper}</td>
                </tr>
                <tr>
                  <td >Mastercard Credit</td>
                  <td>
                 
                      {
                        quote?.opportunity?.[
                          "ptsave_masterdebitnonsecrate@OData.Community.Display.V1.FormattedValue"
                        ]
                      }
                 
                  </td>

                  <td>{quote?.ptsave_visamastercardcreditper}</td>
                </tr>

                <tr>
                  <td>Mastercard Business Credit</td>
                  <td
                  // colSpan={2}
                  >
                    {
                      quote?.opportunity?.[
                        "ptsave_visabuscreditsecrate@OData.Community.Display.V1.FormattedValue"
                      ]
                    }
                  </td>
                  <td>{quote?.ptsave_visabusinesscreditper}</td>
                </tr>
                <tr>
                  <td>Visa Debit</td>
                  <td>
                    {
                      quote?.opportunity?.[
                        "ptsave_visadebitsecrate@OData.Community.Display.V1.FormattedValue"
                      ]
                    }
                  </td>
                  <td>{quote?.ptsave_visadebitvpayper}</td>
                </tr>
                <tr>
                  <td>Mastercard Debit</td>
                  <td>
                    {
                      quote?.opportunity?.[
                        "ptsave_masterdebitsecrate@OData.Community.Display.V1.FormattedValue"
                      ]
                    }
                  </td>
                  <td>{quote?.ptsave_mastercarddebitukmaestroper}</td>
                </tr>
                <tr>
                  <td>Visa Business Debit</td>
                  <td>
                    {
                      quote?.opportunity?.[
                        "ptsave_visabusdebitsecrate@OData.Community.Display.V1.FormattedValue"
                      ]
                    }
                  </td>
                  <td>{quote?.ptsave_visabusinessdebitper}</td>
                </tr>
              </tbody>
            </table>
            <p
              style={{
                fontWeight: "bold",
              }}
            >
              Schedule Of Fees - Others
            </p>
            <table className="mt-3 table table-striped number-center">
              <tbody>
                <tr>
                  <td>Auth Fees </td>

                  <td colSpan={2}>
                    {
                      quote?.opportunity?.[
                        "ptsave_authfeescommission_base@OData.Community.Display.V1.FormattedValue"
                      ]
                    }
                  </td>
                </tr>

                <tr>
                  <td>MMSC</td>
                  <td colSpan={2}>
                    {
                      quote?.opportunity?.[
                        "ptsave_mmsc@OData.Community.Display.V1.FormattedValue"
                      ]
                    }
                  </td>
                </tr>
                <tr>
                  <td> Average transaction value</td>
                  <td colSpan={2}>
                    {
                      quote?.opportunity?.[
                        "ptsave_atv@OData.Community.Display.V1.FormattedValue"
                      ]
                    }
                  </td>
                </tr>
                {/* <tr>
                  <td> Single maximum transaction value</td>
                  <td colSpan={2}>{quote?.smtv}</td>
                </tr> */}

                <tr>
                  <td> Annual Business Turnover </td>

                  <td colSpan={2}>
                    {
                      quote?.opportunity?.[
                        "ptsave_annual_business_turnover@OData.Community.Display.V1.FormattedValue"
                        // "ptsave_annual_business_turnover@OData.Community.Display.V1.FormattedValue"
                      ]
                    }
                  </td>
                </tr>

                <tr>
                  <td> Annual Card Turnover</td>
                  <td colSpan={2}>
                    {
                      quote?.account?.[
                        "ptsave_annualcardturnover@OData.Community.Display.V1.FormattedValue"
                      ]
                    }
                  </td>
                </tr>
                <tr>
                  <td>Card acceptance ratio(FtoF) </td>
                  <td colSpan={2}>
                    {
                      quote?.opportunity?.[
                        "ptsave_cardacceptanceratio_face2face"
                      ]
                    }
                  </td>
                </tr>
                <tr>
                  <td> Card acceptance ratio( CNP/MOTO) </td>
                  <td colSpan={2}>
                    {quote?.opportunity?.["ptsave_cardacceptanceratio_cnpmoto"]}
                  </td>
                </tr>
                <tr>
                  <td> Card acceptance ratio( ECOM) </td>
                  <td colSpan={2}>
                    {
                      quote?.opportunity?.[
                        "ptsave_cardacceptanceratio_ecommerce"
                      ]
                    }
                  </td>
                </tr>
                <tr>
                  <td>Notes for pricing</td>
                  <td colSpan={2}>
                    {quote?.opportunity?.["description"] || "--"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllApplicationSof;
