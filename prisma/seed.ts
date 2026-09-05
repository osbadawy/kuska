import "dotenv/config";

import { auth } from "../lib/auth";

async function main() {
  const email = "Reka.tokaji11@gmail.com";
  const password = "KuskaMotion2026!";

  console.log(`Creating user: ${email}`);

  try {
    const result = await auth.api.signUpEmail({
      body: {
        name: "Reka Tokaji",
        email,
        password,
      },
    });

    console.log("✅ User created successfully.");
    console.log({
      id: result.user.id,
      name: result.user.name,
      email: result.user.email,
    });
  } catch (error) {
    console.error("❌ Failed to create user:");
    console.error(error);
    process.exit(1);
  }
}

main();