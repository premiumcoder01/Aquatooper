import jwt_decode from 'jwt-decode';

export default isTokenExpired = (token) => {
  let decoded = jwt_decode(token);
  if (decoded.exp < Date.now() / 1000) {
    // console.log('token expired');
    return true;
  } else {
    // console.log('token not expired');
    return false;
  }
};
