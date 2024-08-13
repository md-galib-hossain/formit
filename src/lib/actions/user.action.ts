"use server";

import { db } from "@/configs";
import { users } from "@/configs/schema";

export async function createUser(user: any) {
  try {
    const newUser = await db.insert(users).values(user);
    return JSON.parse(JSON.stringify(newUser))
  } catch (err: any) {
    console.log(err);
  }
}
