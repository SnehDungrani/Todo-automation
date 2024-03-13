import { setCookie, eraseCookie } from "../Cookies";

export const getAuthToken = () => {
  return localStorage.getItem("token");
};

export const setAuthDetails = (accessToken, userName) => {
  setCookie("SAID", accessToken, 1);
  localStorage.setItem("token", accessToken);
  localStorage.setItem("name", userName);
};

export const deleteAuthDetails = () => {
  eraseCookie("SAID");
  localStorage.removeItem("token");
};
