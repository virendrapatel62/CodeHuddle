import { databases } from "@/models/client/config";
import { answerCollection, db } from "@/models/name";
import { ID } from "appwrite";
import { NextRequest, NextResponse } from "next/server";
import { UserPrefs } from "@/store/auth";
import { users } from "@/models/server/config";

export async function POST(request: NextRequest) {
  try {
    const { questionId, answer, authorId } = await request.json();

    const response = await databases.createDocument(
      db,
      answerCollection,
      ID.unique(),
      {
        content: answer,
        authorId: authorId,
        questionId,
      }
    );

    // increase author reputation
    const userPrefs = await users.getPrefs<UserPrefs>(authorId);
    await users.updatePrefs(authorId, {
      reputation: Number(userPrefs.reputation) + 1,
    });

    return NextResponse.json(response, {
      status: 201,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error?.message || "Error creating answer",
      },
      {
        status: error?.status || error?.code || 500,
      }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { answerId } = await request.json();

    const answer = await databases.getDocument(db, answerCollection, answerId);
    const response = await databases.deleteDocument(
      db,
      answerCollection,
      answerId
    );

    // decrease author reputation
    const userPrefs = await users.getPrefs<UserPrefs>(answer.authorId);
    await users.updatePrefs(answer.authorId, {
      reputation: Number(userPrefs.reputation) + 1,
    });

    return NextResponse.json(
      {
        data: response,
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error?.message || "Error deleting answer",
      },
      {
        status: error?.status || error?.code || 500,
      }
    );
  }
}
