const CONSTANTS = {
  API: {
    todo: {
      get: {
        endpoint: "/tasks/gettasks",
      },
      add: {
        type: "POST",
        endpoint: "/tasks/create",
      },
      update: {
        endpoint: `/tasks/:id`,
        type: "PATCH",
      },
      delete: {
        endpoint: `/tasks/:id`,
        type: "DELETE",
      },
    },

    auth: {
      signup: {
        type: "POST",
        endpoint: "/users/signup",
      },
      login: {
        type: "POST",
        endpoint: "/users/login",
      },
    },
  },
};
export default CONSTANTS;
