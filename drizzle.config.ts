import { defineConfig } from "drizzle-kit";
 
export default defineConfig({
  schema: "./src/configs/schema.ts",
  out: "./drizzle",
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.NEXT_PUBLIC_DATABASE_URL_CONFIG!,
  }
});
