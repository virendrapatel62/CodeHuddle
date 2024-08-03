import { env } from "@/app/env";

import { Client, Account, Avatars, Databases, Storage } from "appwrite";

const appWrite = env.appWrite;

const client = new Client()
  .setEndpoint(appWrite.endPoint) // Your API Endpoint
  .setProject(appWrite.projectId); // Your project ID

const account = new Account(client);
const databases = new Databases(client);
const avatar = new Avatars(client);
const storage = new Storage(client);

export { client, databases, avatar, account, storage };
