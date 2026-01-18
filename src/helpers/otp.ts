import { randomInt } from "crypto";

export default function otp(length: number): string {
  let code = "";

  for (let i = 0; i < length; i++) {
    code += randomInt(0, 10);
  }

  return code;
}
