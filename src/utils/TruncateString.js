/*
 * TRUNCATE STRING
 *    USE:   Truncate String is used to limit the length of the string to be
 *           displayed. Once the string exceeds the limit the text will be "..."
 ?    PROPS: str = the string
 ?            n = max length of the string
 *    SAMPLE: <TruncateString str={username} n={15} />
 */

function TruncateString({ str, n }) {
  if (!str) return "";
  else return str.length > n ? str.slice(0, n - 1) + "..." : str;
}

export default TruncateString;
