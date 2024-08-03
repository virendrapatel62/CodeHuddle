import { Permission } from "node-appwrite";

import { db, answerCollection } from "../name";
import { databases } from "./config";

export default async function createAnswerCollection() {
  // creating collection

  await databases.createCollection(db, answerCollection, answerCollection, [
    Permission.read("any"),
    Permission.read("users"),
    Permission.create("users"),
    Permission.delete("users"),
    Permission.update("users"),
  ]);

  console.log("Answer collection is created");

  // creating attribute and Index

  await Promise.all([
    databases.createStringAttribute(
      db,
      answerCollection,
      "content",
      10000,
      true
    ),

    databases.createStringAttribute(
      db,
      answerCollection,
      "questionsId",
      50,
      true
    ),

    databases.createStringAttribute(db, answerCollection, "authorId", 50, true),

    console.log("Answer Attributes created"),
  ]);
}
