import { createContext } from "react";

export const TaskContext = createContext({
  nTasks: {},
  dTasks: {},
  onDelete: {},
  onEdit: {},
  onFilter: {},
  onDailyFilter: {},
  filteredData: {},
  dailyFilteredData: {},
});
