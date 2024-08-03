import { Permission } from "node-appwrite";

import { db, questionAttachmentBucket } from "../name";
import { databases, storage } from "./config";

export default async function getOrCreateStorage() {
  try {
    await storage.getBucket(questionAttachmentBucket);
    console.log("Storage Connected");
  } catch (error) {
    try {
      await storage.createBucket(
        questionAttachmentBucket,
        questionAttachmentBucket,
        [
          Permission.read("any"),
          Permission.read("users"),
          Permission.create("users"),
          Permission.delete("users"),
          Permission.update("users"),
        ],
        false,
        undefined,
        undefined,
        ["jpg", "jpeg", "png", "gif", "webp"]
      );

      console.log("Storage created");
      console.log("Storage connected");
    } catch (error) {
      console.log("Error while creating bucket");
    }
  }
}
