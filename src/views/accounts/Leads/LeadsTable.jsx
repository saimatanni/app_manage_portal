import React, { useEffect, useRef, useState } from "react";

import "./Leads.css";


import LeadQualifyTable from "./LeadQualifyTable";
import LeadTableParent from "./LeadTableParent";


const LeadsTable = () => {
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
    window.addEventListener('beforeunload', scrollOnNavigate);

    // Cleanup the event listener when component unmounts
    return () => {
      window.removeEventListener('beforeunload', scrollOnNavigate);
    };
  }, []);

useEffect(()=>{
localStorage.removeItem("leadId")
localStorage.removeItem("activeStep")
localStorage.removeItem("quoteId")
localStorage.removeItem("allAppId")
localStorage.removeItem("cardTurnover")
localStorage.removeItem("residualName")
localStorage.removeItem("rentingFromElavon")
localStorage.removeItem("quote_id")
localStorage.removeItem("newAppId")
localStorage.removeItem("residualId")
localStorage.removeItem("application_id")
localStorage.removeItem("priceQId")
localStorage.removeItem("residualNameTrade")
localStorage.removeItem("atv")
localStorage.removeItem("appPd")
},[])
  return (
    <div>
      <LeadTableParent/>
      <div className="mt-4">
       <LeadQualifyTable/> 
      </div>
      
    </div>
  );
};

export default LeadsTable;
