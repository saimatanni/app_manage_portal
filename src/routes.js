import React from "react";

import UpdatedRevenueCalculation from "./views/menus/UpdatedRevenueCalculation";
import CostAnalysisContainer from "./views/menus/CostAnalysisContainer";
import Cookies from "js-cookie";
const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));
// Buttons
// import accounts
const LeadsTable = React.lazy(() =>
  import("./views/accounts/Leads/LeadsTable.jsx")
);
const AddLeads = React.lazy(() => import("./views/accounts/Leads/AddLead"));
const PricequoteTable = React.lazy(() =>
  import("./views/accounts/Pricequote/PricequoteTable.jsx")
);

const ApplicationContainer = React.lazy(() =>
  import("./views/accounts/NewApplication/ApplicationContainer")
);
const NewApplicationRetrive = React.lazy(() =>
  import("./views/accounts/NewApplication/NewApplicationRetrive")
);
const AllApplication = React.lazy(() =>
  import("./views/accounts/AllApplication/AllApplication.jsx")
);
const SubmittedApplication = React.lazy(() =>
  import("./views/accounts/submittedApplication/component/SubmittedApplication")
);
// Price Quote Priview
const PriceQuotePreview = React.lazy(() =>
  import("./views/accounts/Pricequote/PriceQuotePreview")
);
// New Application Preview
const NewApplicationPreview = React.lazy(() =>
  import("./views/accounts/NewApplication/NewApplicationPreview")
);
// All Application Preview
const AllApplicationPreview = React.lazy(() =>
  import("./views/accounts/AllApplication/AllApplicationPreview")
);
const SubmittedApplicationPreview = React.lazy(() =>
  import("./views/accounts/AllApplication/SubmittedApplicationPreview")
);

const LeadsPreview = React.lazy(() =>
  import("./views/accounts/Leads/LeadsPreview.jsx")
);
const LeadQualifyTable = React.lazy(() =>
  import("./views/accounts/Leads/LeadQualifyTable")
);
// Leads Retrive
const LeadRetrive = React.lazy(() =>
  import("./views/accounts/Leads/LeadsRetrieve/LeadRetrive")
);

const QuoteRetrive = React.lazy(() =>
  import("./views/accounts/Pricequote/PriceQuoteRetrieve/QuoteRetrive")
);

// Commistion Hub
const UpfrontCommission = React.lazy(() =>
  import("./views/commission/UpfrontComission.jsx")
);
const Residual = React.lazy(() => import("./views/commission/Residual.jsx"));
const ResidualDetails = React.lazy(() =>
  import("./views/commission/ResidualDetails")
);
const CommissionStatement = React.lazy(() =>
  import("./views/commission/CommissionStatement.jsx")
);
const Clawback = React.lazy(() => import("./views/commission/Clawback.jsx"));
const CommissionPreview = React.lazy(() =>
  import("./views/commission/CommissionPreview")
);
// const NewCostAnalysisPdf = React.lazy(() =>
//   import("./views/menus/NewCostAnalysisPdf")
// );
const Invoice = React.lazy(() => import("./views/menus/Invoice.jsx"));
const OnboardingCommissionStatement = React.lazy(() =>
  import("./views/menus/CommissionStatement.jsx")
);
const InformationHub = React.lazy(() =>
  import("./views/menus/InformationHub.jsx")
);
const Calendar = React.lazy(() => import("./views/menus/Calendar.jsx"));
const ChangePassword = React.lazy(() =>
  import("./views/menus/ChangePassword.jsx")
);
const ExportLeads = React.lazy(() => import("./views/menus/ExportLeads.jsx"));

// Support Nav
const Tickets = React.lazy(() => import("./views/support/Tickets.jsx"));
const Tasks = React.lazy(() => import("./views/support/Tasks.jsx"));
const Chat = React.lazy(() => import("./views/support/Chat.jsx"));
// New Application Form
const NewApplicationLeads = React.lazy(() =>
  import("./views/accounts/NewApplicationForm/NewApplicationLeads")
);
//partners
const SalesManList = React.lazy(() => import("./views/sales-man/SalesManList"));
const CreateSalesMan = React.lazy(() =>
  import("./views/sales-man/CreateSalesMan")
);
const UpdateSalesMan = React.lazy(() =>
  import("./views/sales-man/CreateSalesMan")
);
const ViewSalesMan = React.lazy(() => import("./views/sales-man/ViewSalesMan"));
const PartnerList = React.lazy(() => import("./views/partners/PartnerList"));
const PartnerDetails = React.lazy(() =>
  import("./views/partners/PartnerDetails")
);
const AllApplicationProductDetails = React.lazy(() =>
  import("./views/accounts/AllApplication/AllApplicationProduct")
);

const userData = Cookies.get("userData");
console.log("userDataroute", userData?.user_role);
const routes = [
  // { path: '/', exact: true, name: 'LogIn' ,element: Login},
  {
    path: "/dashboard",
    name: "Dashboard",
    element: Dashboard,
    Permissions: true,
  },
  {
    path: "/all-application-porduct-details",
    name: "All Application Product Details",
    element: AllApplicationProductDetails,
    Permissions: true,
  },

  {
    path: "/leads",
    name: "Leads Table",
    element: LeadsTable,
    Permissions: true,
  },
  {
    path: "/qualified-lead",
    name: "Qualified Lead",
    element: LeadQualifyTable,
    Permissions: true,
  },
  {
    path: "/add-leads",
    name: "Add Leads ",
    element: AddLeads,
    Permissions: true,
  },
  {
    path: "/opportunity",
    name: "Opportunity Table ",
    element: PricequoteTable,
    Permissions: true,
  },

  {
    path: "/new-application",
    name: "New Application ",
    element: ApplicationContainer,
    Permissions: true,
    // element: NewApplication,
  },
  {
    path: "/application-retrive",
    name: " Application Retrive",
    element: NewApplicationRetrive,
    Permissions: true,
  },
  {
    path: "/application-add",
    name: " Application add",
    element: NewApplicationRetrive,
    Permissions: true,
  },
  {
    path: "/all-application",
    name: "All Application ",
    element: AllApplication,
    Permissions: true,
  },
  {
    path: "/submitted-application",
    name: "Submitted Application ",
    element: SubmittedApplication,
    Permissions: true,
  },

  {
    path: "/leads-preview",
    name: "Leads Preview",
    element: LeadsPreview,
    Permissions: true,
  },
  {
    path: "/qualified-leads-preview",
    name: "Leads Preview",
    element: LeadsPreview,
    Permissions: true,
  },
  // Leads Retrive
  {
    path: "/retrieve-lead",
    name: "Retrieve Lead",
    element: LeadRetrive,
    Permissions: true,
  },

  {
    path: "/opportunity-retrive",
    name: "Opportunity Retrive",
    element: QuoteRetrive,
    Permissions: true,
  },

  {
    path: "/opportunity-preview",
    name: "Opportunity Preview",
    element: PriceQuotePreview,
    Permissions: true,
  },
  // New Application Preview
  {
    path: "/new-application-preview",
    name: "New Application Preview",
    element: NewApplicationPreview,
    Permissions: true,
  },
  // All Application Preview
  {
    path: "/all-application-preview",
    name: "All Application Preview",
    element: AllApplicationPreview,
    Permissions: true,
  },
  {
    path: "/submitted-application-preview",
    name: "Submitted Application Preview",
    element: SubmittedApplicationPreview,
    Permissions: true,
  },

  // Commission Hub
  {
    path: "/upfront-commission",
    name: "Upfront Commission",
    element: UpfrontCommission,
    Permissions: true,
  },
  { path: "/residual", name: "Residual", element: Residual, Permissions: true },
  {
    path: "/residual-details",
    name: "Residual Details",
    element: ResidualDetails,
    Permissions: true,
  },

  { path: "/clawback", name: "Clawback", element: Clawback, Permissions: true },
  {
    path: "/commission-preview",
    name: "Commission Preview",
    element: CommissionPreview,
    Permissions: true,
  },

  // Other Menus
  {
    path: "/cost-analysis",
    name: "Cost Analysis",
    element: CostAnalysisContainer,
    Permissions: true,
  },

  {
    path: "/create-salesman",
    name: "Create Salesman",
    element: CreateSalesMan,
    Permissions: true,
  },
  {
    path: "/user-details",
    name: "User Details",
    element: ViewSalesMan,
    Permissions: true,
  },
  {
    path: "/edit-salesman",
    name: "Update User",
    element: UpdateSalesMan,
    Permissions: true,
  },
  {
    path: "/salesman-list",
    name: "User List",
    element: SalesManList,
    Permissions: true,
  },

  {
    path:
      userData && JSON.parse(userData)?.user_role === 2
        ? "/partner-list"
        : "/404",
    name: "Partner List",
    element: PartnerList,
    Permissions: JSON.parse(userData)?.user_role === 2 ? true : false,
  },
  {
    path: "/partner-details",
    name: "Partner Details",
    element: PartnerDetails,
    Permissions: true,
  },
  {
    path:
      userData && JSON.parse(userData)?.user_role === 8 ? "/404" : "/invoice",
    name: "Invoice",
    element: Invoice,
    Permissions: true,
  },
  {
    path: "/commission-statement",
    name: "Commission statement",
    element: OnboardingCommissionStatement,
    Permissions: true,
  },
  {
    path: "/user-invoice",
    name: "user-Invoice",
    element: Invoice,
    Permissions: true,
  },
  {
    path:
      userData && JSON.parse(userData)?.user_role === 9
        ? "/user-statement"
        : "/404",
    name: "User statement",
    element: OnboardingCommissionStatement,
    Permissions: true,
  },
  {
    path:
      userData && JSON.parse(userData)?.user_role === 8
        ? "/404"
        : "/information-hub",
    name: "Information Hub",
    element: InformationHub,
    Permissions: true,
  },
  { path: "/calendar", name: "Calendar", element: Calendar, Permissions: true },
  {
    path:
      userData && JSON.parse(userData)?.user_role === 8
        ? "/404"
        : "/change-password",
    name: "Change Password",
    element: ChangePassword,
    Permissions: true,
  },
  {
    path: "/export-leads",
    name: "Export Leads",
    element: ExportLeads,
    Permissions: true,
  },

  {
    path: "/revenue-calculator",
    name: "Revenue Calculator",
    element: UpdatedRevenueCalculation,
    Permissions: true,
  },

  // Support Nav
  { path: "/tickets", name: "Tickets", element: Tickets, Permissions: true },
  { path: "/tasks", name: "Tasks", element: Tasks, Permissions: true },
  { path: "/chat", name: "Chat", element: Chat, Permissions: true },

  // New Application Form
  {
    path: "/new-application-leads",
    name: "New Application Leads",
    element: NewApplicationLeads,
    Permissions: true,
  },
];
export default routes;
