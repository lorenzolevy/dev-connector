import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";

// OBJ with all reducers
export default combineReducers({
  alert,
  auth,
});
