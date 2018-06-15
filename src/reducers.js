import { combineReducers } from "redux";
import ChoiceListReducer from "./components/ChoiceList/reducers";

// console.log("C", ChoiceListReducer)

export default combineReducers({
    items: ChoiceListReducer
})