import { defineSchema } from "convex/server";
import { authTables } from "@convex-dev/auth/server";

const Schema = defineSchema({ ...authTables });

export default Schema;
