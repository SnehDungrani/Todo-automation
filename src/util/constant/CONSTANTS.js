const CONSTANTS = {
  API: {
    todo: {
      get: {
        type: "GET",
        endpoint: "/tasks",
      },
      add: {
        type: "POST",
        endpoint: "/tasks/create",
      },
      update: {
        type: "PATCH",
        endpoint: `/tasks/:id`,
      },
      delete: {
        type: "DELETE",
        endpoint: `/tasks/:id`,
      },
      filter: {
        type: "GET",
        endpoint: `/tasks?status=:statusType`,
      },
    },

    repeatTodo: {
      get: {
        type: "GET",
        endpoint: "/repeatTasks",
      },
      add: {
        endpoint: "/repeatTasks/create",
        type: "POST",
      },
      update: {
        type: "PATCH",
        endpoint: `/repeatTasks/:id`,
      },
      delete: {
        type: "DELETE",
        endpoint: `/repeatTasks/:id`,
      },
      filter: {
        type: "GET",
        endpoint: `/repeatTasks?task_frequency=:taskType`,
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
