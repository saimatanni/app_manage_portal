import React from "react";

const AddLeads = React.lazy(() => import("../../views/accounts/Leads/AddLead"));

const ApplicationRoute = [
    {
      path: "/add-lead",
      name: "Add Lead",
      component: AddLeads,
      exact: true,
    },
  
   
    
  
  
  
  ];

  export default ApplicationRoute;