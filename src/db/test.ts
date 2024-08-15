import { desc, eq } from "drizzle-orm";
import { db } from ".";
import { inviteKeys, users } from "./schema";

const main = async () => {
  const data = await db
    .select()
    .from(users)
    .leftJoin(inviteKeys, eq(users.id, inviteKeys.generatedBy))
    .orderBy(users.createdAt, desc(users.id));
};
