import { createContext } from "react";

const TaskContext = createContext({
  nTasks: {},
  dTasks: {},
  onDelete: {},
  onEdit: {},
  onFilter: {},
  onDailyFilter: {},
  filteredData: {},
  dailyFilteredData: {},
});

export default TaskContext;
