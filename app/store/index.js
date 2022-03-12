import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import RegistrationReducer from "./RegistrationReducer";
import OffersReducer from './OffersReducer';

const rootReducer = combineReducers({
    RegistrationReducerName: RegistrationReducer,
    OffersReducerName: OffersReducer
});

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

export default store;
