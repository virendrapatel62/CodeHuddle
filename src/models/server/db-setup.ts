import { db } from "../name";
import createAnswerCollection from "./answer.collection";
import createCommentCollection from "./comment.collection";
import { databases } from "./config";
import createQuestionCollection from "./question.collection";
import createVoteCollection from "./vote.collection";

export default async function getOrCreateDB() {
  try {
    await databases.get(db);
  } catch (error) {
    try {
      await databases.create(db, db);
      console.log("Database created");

      //creating Collections
      await Promise.all([
        createQuestionCollection(),
        createAnswerCollection(),
        createCommentCollection(),
        createVoteCollection(),
      ]);

      console.log("Collections created");
      console.log("Database connected");
    } catch (error) {
      console.log("Error creating databases or collections");
      console.log(error);
    }

    return databases;
  }
}
