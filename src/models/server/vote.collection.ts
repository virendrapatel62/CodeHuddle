import { Permission } from "node-appwrite";

import { db, voteCollection } from "../name";
import { databases } from "./config";

export default async function createVoteCollection() {
  await databases.createCollection(db, voteCollection, voteCollection, [
    Permission.create("users"),
    Permission.read("any"),
    Permission.update("users"),
    Permission.read("users"),
    Permission.delete("users"),
  ]);

  console.log("Vote Collection Created");

  await Promise.all([
    databases.createEnumAttribute(
      db,
      voteCollection,
      "type",
      ["question", "answer"],
      true
    ),

    databases.createStringAttribute(db, voteCollection, "typeId", 50, true),
    databases.createEnumAttribute(
      db,
      voteCollection,
      "voteStatus",
      ["upvoted", "downvoted"],
      true
    ),

    databases.createStringAttribute(db, voteCollection, "votedById", 50, true),
  ]);

  console.log("Vote Attributes Created");
}
