export default function () {
  return {
    Any(val: string, min: number, max: number): boolean {
      return new RegExp(
        `^.{${min},${max}}$`,
        "gis"
      ).test(val);
    },
    Text(val: string, min: number, max: number): boolean {
      return new RegExp(
        `^[a-zA-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÛÇÑ \s]{${min},${max}}$`,
        "gm"
      ).test(val);
    },
    Number(val: string, min: number, max: number): boolean {
      return new RegExp(`^[0-9 \s]{${min},${max}}$`, "gm").test(val);
    },
    Phone(val: string): boolean {
      return /(\(?\d{2}\)?\s)?(\d{4,5}\-\d{4})/gm.test(
        val
      );
    },
    Nickname(val: string): boolean {
      return /^[a-zA-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÛÇÑ.\s]{6,}$/gm.test(val);
    },
    Email(val: string): boolean {
      return /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/gm.test(val);
    },
    Password(val: string): boolean {
      return /^[a-f0-9]{32}/gm.test(val);
    },
    CPF(val: string): boolean {
      return /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/gm.test(val);
    },
    CNPJ(val: string): boolean {
      return /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/gm.test(val);
    },
    RG(val: string): boolean {
      return /^(^\d{1,2}).?(\d{3}).?(\d{3})-?(\d{1}|X|x$)$/gm.test(val);
    },
    Zipcode(val: string): boolean {
      return /^[0-9]{5}-[0-9]{3}$/gm.test(val);
    },
    Date(val: string): boolean {
      return /^(\d){4,4}-(\d){2,2}-(\d){2,2}$/gm.test(val);
    },
    Datetime(val: string): boolean {
      return /^(\d){4,4}-(\d){2,2}-(\d){2,2} (\d){2,2}:(\d){2,2}:(\d){2,2}$/gm.test(
        val
      );
    },
    MaritalStatus(val: string): boolean {
      val = val.toUpperCase();
      return val === "S" || val === "C" || val === "D" || val === "V";
    },
    Gender(val: string): boolean {
      val = val.toUpperCase();
      return val === "M" || val === "F";
    },
  };
}
