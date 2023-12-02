/*  
 * NUMBER FORMAT
 *    USE:   Number format is used to format a number to either the default format
 *           (1,000,000), peso format (₱ 1,000,000.00), or shortened format (1.0M)
 ?    PROPS: value = the number
 ?           isPeso = (boolean) if true the number will be converted to peso format
 ?           isShortened = (boolean) if true the number will be converted to shortened format
 ?           noDecimal = (boolean) if true peso number would be displayed without decimal
 *    NOTE:  if "isPeso" and "isShortened" are null, the number will be in the default format
 *    SAMPLE:  <NumberFormat value={total} isPeso={true} />
*/

function NumberFormat({ value, isPeso, isShortened, noDecimal }) {
  //Default Format
  //Returns: 999,999
  const formattedValue = value?.toLocaleString(0, {});

  //Peso Format
  //Returns: ₱999,999.00
  const pesoOptions = noDecimal
    ? {}
    : {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      };
  const formattedValuePeso = value?.toLocaleString(
    0,
    value > 999 ? noDecimal : pesoOptions
  );
  const peso = `₱ ${formattedValuePeso}`;

  //Shortened Format
  //Returns: 999k
  const shortenedNumber = (value) => {
    if (value >= 1e9) {
      return `${(value / 1e9).toFixed(1)}B`;
    } else if (value >= 1e6) {
      return `${(value / 1e6).toFixed(1)}M`;
    } else if (value >= 1e3) {
      return `${(value / 1e3).toFixed(1)}k`;
    } else {
      return value.toString();
    }
  };

  return isPeso ? peso : isShortened ? shortenedNumber(value) : formattedValue;
}

export default NumberFormat;
