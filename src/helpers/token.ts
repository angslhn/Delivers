export default function token(length: number): string {
  let token: string = "";

  const characters = "abcdefghizklmnopqrstuvwxyzABCDEFGHIZKLMNOPQRSTUVWXYZ0123456789";

  for (let i = 0; i < length; i++) {
    const index = Math.floor(Math.random() * characters.length);

    token += characters.charAt(index);
  }

  return token;
}
