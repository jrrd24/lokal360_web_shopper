/*
* FORMAT DATE
*   USE:      Format Date is used for formatting sql date to MM/DD/YYYY
?   PROPS:    date = date to be formatted
*   RETURNS:  date in MM/DD/YYYY format
*   SAMPLE:   <FormatDate date={date} />
 */

function FormatDate({ date }) {
  const inputDate = new Date(date);

  // Check if the date is valid
  if (isNaN(inputDate.getTime())) {
    return "00/00/0000";
  }

  const month = String(inputDate.getMonth() + 1).padStart(2, "0"); // Add 1 to month because it is 0-based
  const day = String(inputDate.getDate()).padStart(2, "0");
  const year = inputDate.getFullYear();

  return `${month}/${day}/${year}`;
}

export default FormatDate;
