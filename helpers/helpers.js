const addDays = (date) => {
  var result = new Date(date);
  result.setDate(result.getDate() + max_day_range - 1);
  return result;
};

const formatDate = (date) => {
  const offset = date.getTimezoneOffset();
  date = new Date(date.getTime() - (offset * 60 * 1000));
  return date.toISOString().split('T')[0];
};

module.exports = {
  addDays,
  formatDate
}