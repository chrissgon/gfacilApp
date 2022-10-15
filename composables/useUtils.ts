import crypto from "crypto-js";

function StrToMD5(val: string): string {
  return crypto.MD5(val).toString();
}
function DateToUTC(val: string): string {
  return `${val} 00:00:00`;
}
function UTCToDate(val: string): string {
  return val.split("T")[0];
}

export default function () {
  return {
    StrToMD5,
    DateToUTC,
    UTCToDate,
  };
}
