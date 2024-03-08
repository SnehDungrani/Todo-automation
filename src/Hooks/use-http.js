import { useState, useCallback } from "react";
import axios from "axios";
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
          window.location.assign('/');
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
    [],
  );

  const sendBulkRequest = useCallback(
    async (urls, responseHandler, successMessage, errorHandler) => {
      setIsLoading(true);
      try {
        const response = await axios.all(
          urls?.map((url) => {
            switch (url?.url?.type) {
              case "POST":
                return Services.post(url?.url?.endpoint, url?.payload);

              case "PUT":
                return Services.put(url?.url?.endpoint, url?.payload);

              case "DELETE":
                return Services.delete(url?.url?.endpoint);

              case "PATCH":
                return Services.patch(url?.url?.endpoint, url?.payload);

              default:
                return Services.get(url?.endpoint);
            }
          }),
        );

        if (successMessage) {
          notification.success({ message: successMessage, duration: "3" });
        }
        try {
          if (responseHandler) {
            responseHandler(response);
          }
        } catch (e) {
          console.log(e);
        }
      } catch (err) {
        if (err?.response?.data?.message === "jwt expired") {
          deleteAuthDetails();
          localStorage.removeItem("name");
          localStorage.removeItem("email");
          localStorage.removeItem("token");
          window.location.reload();
        }
        console.log(err?.response?.data?.message);
        if (err?.response?.data?.message) {
          notification.error({
            message: err?.response?.data?.message,
            duration: "3",
          });
          if (errorHandler) {
            errorHandler(err?.response?.data?.message);
          }

          return;
        }

        // eslint-disable-next-line consistent-return
        return notification.error({
          message: "Something Wrong Please Try again",
        });
      }
      setIsLoading(false);
    },
    [],
  );
  return {
    isLoading,
    sendRequest,
    sendBulkRequest,
  };
};

export default useHttp;
