export const getAuthToken = () => {
  return localStorage.getItem("token");
};

export const setAuthDetails = (accessToken, userName) => {
  localStorage.setItem("token", accessToken);
  localStorage.setItem("name", userName);
};

export const deleteAuthDetails = () => {
  localStorage.removeItem("token");
};
