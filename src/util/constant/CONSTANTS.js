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
      filter: {
        type: "GET",
        endpoint: `/tasks?status=:statusType`,
      },
      delete: {
        type: "DELETE",
        endpoint: `/tasks/:id`,
      },
      bulkDelete: {
        type: "DELETE",
        endpoint: "/tasks/bulkDelete/:id",
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

      filter: {
        type: "GET",
        endpoint: `/repeatTasks?task_frequency=:taskType`,
      },
      delete: {
        type: "DELETE",
        endpoint: `/repeatTasks/:id`,
      },
      bulkDelete: {
        type: "DELETE",
        endpoint: "/repeatTasks/bulkDelete/:id",
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
