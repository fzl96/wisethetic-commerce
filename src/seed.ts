import { getPayload } from "payload";
import config from "@payload-config";

const seed = async () => {
  const payload = await getPayload({ config });

  const adminTenant = await payload.create({
    collection: "tenants",
    data: {
      name: "admin",
      slug: "admin",
    },
  });

  await payload.create({
    collection: "users",
    data: {
      email: "admin@demo.com",
      password: "demo",
      roles: ["super-admin"],
      username: "admin",
      tenants: [
        {
          tenant: adminTenant.id,
        },
      ],
    },
  });
};

try {
  await seed();
  console.log("Seeding completed");
  process.exit(0);
} catch (error) {
  console.error("error during seeding: ", error);
  process.exit(1);
}

