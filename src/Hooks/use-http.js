import { useState, useCallback } from "react";
import { notification } from "antd";
import Services from "../util/API/service";
import { deleteAuthDetails } from "../util/API/authStorage";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);

  const sendRequest = useCallback(
    async (url, responseHandler, payload, successMessage, errorHandler) => {
      setIsLoading(true);
      try {
        let response;
        switch (url.type) {
          case "POST":
            response = await Services.post(url.endpoint, payload);
            break;

          case "PUT":
            response = await Services.put(url.endpoint, payload);

            break;
          case "DELETE":
            response = await Services.delete(url.endpoint);
            break;

          case "PATCH":
            response = await Services.patch(url.endpoint, payload);
            break;

          default:
            response = await Services.get(url.endpoint);
            break;
        }

        const data = await response?.data;
        if (successMessage) {
          notification.success({ message: successMessage, duration: "3" });
        }
        try {
          if (responseHandler) {
            responseHandler(data);
          }
        } catch (e) {
          console.log(e);
        }
      } catch (err) {
        if (err?.response?.data?.status === 401) {
          deleteAuthDetails();
          localStorage.removeItem("token");
          window.location.assign("/");
        }
        if (err?.response?.data?.message === "jwt expired") {
          deleteAuthDetails();
          localStorage.removeItem("name");
          localStorage.removeItem("email");
          localStorage.removeItem("token");
          window.location.reload();
        }
        if (errorHandler) {
          errorHandler(err?.response?.data?.message);
        } else if (err?.response?.data?.message) {
          notification.error({
            message: err?.response?.data?.message,
            duration: "3",
          });
        } else {
          notification.error({ message: "Something Wrong Please Try again" });
        }
      }
      setIsLoading(false);
    },
    []
  );

  return {
    isLoading,
    sendRequest,
  };
};

export default useHttp;
