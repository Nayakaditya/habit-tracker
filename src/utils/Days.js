const days = {
  0: "Sun",
  1: "Mon",
  2: "Tue",
  3: "Wed",
  4: "Thu",
  5: "Fri",
  6: "Sat",
};

const dateFormate = new Date();
export const day = days[dateFormate.getDay()];
export const date = dateFormate.getDate();
