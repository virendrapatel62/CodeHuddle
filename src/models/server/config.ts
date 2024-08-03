import { env } from "@/app/env";

import {
  Avatars,
  Client,
  Databases,
  Storage,
  Users,
  Account,
} from "node-appwrite";

let client = new Client();
const { appWrite } = env;

client
  .setEndpoint(appWrite.endPoint) // Your API Endpoint
  .setProject(appWrite.projectId) // Your project ID
  .setKey(appWrite.apiKey); // Your secret API key

const account = new Account(client);
const databases = new Databases(client);
const avatar = new Avatars(client);
const storage = new Storage(client);
const users = new Users(client);

export { client, databases, avatar, account, storage };
