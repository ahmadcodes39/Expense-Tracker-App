import { jwtDecode } from "jwt-decode";

const isTokenValid = (token) => {
  if (!token) return false;
  try {
    const decoded = jwtDecode(token);
    return decoded.exp * 1000 > Date.now(); // Convert exp to milliseconds
  } catch (error) {
    return false; // Token is invalid
  }
};

export default isTokenValid;
