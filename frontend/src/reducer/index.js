import userReducers from "./userReducers";


import { combineReducers } from "redux";

const rootReducer = combineReducers({
   user : userReducers 
})

export default rootReducer;