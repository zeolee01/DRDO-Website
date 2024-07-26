// store.js
import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./reducers";

const store = createStore(rootReducer);

const ReduxProvider = ({ children }) => (
  <Provider store={store}>{children}</Provider>
);

export default ReduxProvider;