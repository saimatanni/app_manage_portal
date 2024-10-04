import React from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import LimitedCompany from "../LeadsForm/LimitedCompany";
import SoleTrade from "../LeadsForm/SoleTrade";
import Partners from "../LeadsForm/Partners";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"; // Import js-cookie
const LeadTab = () => {
  const navigate = useNavigate();
  React.useEffect(() => {
    const is_ps_logged_in = Cookies.get("is_ps_logged_in") || "false";
    const is_ps_remember_me = Cookies.get("is_ps_remember_me") || "false";
    if (is_ps_logged_in === "false") {
      // history.push("/my_business");
      navigate("/login");
    }
  }, []);

  return (
    <div>
      <div className="row">
        <div className="col-md-1"></div>
        <div className="col-md-10">
          <div className="new_leads_information">
            <h1 className="text-center my-4">New Leads Information</h1>
            <Tabs
              defaultActiveKey="profile"
              id="fill-tab-example"
              className="my-5"
              fill
            >
              
              <Tab eventKey="profile" title="Limited company">
                <LimitedCompany />
              </Tab>
              <Tab eventKey="longer-tab" title="Sole Trade">
                <SoleTrade />
              </Tab>
              <Tab eventKey="contact" title="Others">
                <Partners />
              </Tab>
            </Tabs>
          </div>
        </div>
        <div className="col-md-1"></div>
      </div>
    </div>
  );
};

export default LeadTab;
