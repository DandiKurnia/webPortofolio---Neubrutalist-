import { hash } from "bcryptjs";

async function main() {
  const hashedPassword = await hash("dandi3105", 10);
  console.log("Hashed password:", hashedPassword);
}

main();
