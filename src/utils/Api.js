import {applyAuthTokenInterceptor} from 'react-native-axios-jwt';
import axios from 'axios';

const BASE_URL = 'https://api.blackboxcontrols.co.uk/v1/accounts';

// 1. Create an axios instance that you wish to apply the interceptor to
export const axiosInstance = axios.create({baseURL: BASE_URL});

// 2. Define token refresh function.
const requestRefresh = async refresh => {
  // Notice that this is the global axios instance, not the axiosInstance!
  const response = await axios.post(`${BASE_URL}/refresh-token`, {
    refresh,
  });
  console.log("run in on")

  return response.data.access_token;
};

// 3. Apply interceptor
// Notice that this uses the axiosInstance instance.
applyAuthTokenInterceptor(axiosInstance, {requestRefresh});