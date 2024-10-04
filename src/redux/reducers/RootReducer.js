import { combineReducers } from "redux";
import LeadReducer from "src/views/accounts/Leads/_redux/reducer/LeadReducer";
import ApplicationReducer from "src/views/accounts/NewApplication/_redux/reducer/ApplicationReducer";
import PriceQuoteReducer from "src/views/accounts/Pricequote/_redux/reducer/PriceQuoteReducer";
import CommonReducer from "src/views/common/_redux/reducer/CommonReducer";

import LogInReducer from "src/views/pages/_redux/reducer/LogInReducer";
// import SidebarReducer from "./SidebarReducer";



// combine all of the reducers here
const rootReducer = combineReducers({
//  leadInfo: Leadreducer,
 loginInfo: LogInReducer,
 leadInfo: LeadReducer,
 commonInfo: CommonReducer,
 quoteInfo: PriceQuoteReducer,
 applicationInfo: ApplicationReducer,
//  sidebarInfo: SidebarReducer,
});

export default rootReducer;
