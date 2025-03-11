import store from '../store/store';
import { incrementLoading, decrementLoading } from '../store/loadingSlice';
const shouldEnableSpinner = () => {
    // Default to enabled if not set, only disable when explicitly 'false'
    return process.env.REACT_APP_LOAD_SPINNER !== 'false';
  };
  
const withSpinner = {
increment: () => {
    if (shouldEnableSpinner()) {
    store.dispatch(incrementLoading());
    }
},
decrement: () => {
    if (shouldEnableSpinner()) {
    store.dispatch(decrementLoading());
    }
}
};
export default withSpinner;