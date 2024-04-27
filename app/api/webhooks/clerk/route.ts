import { db } from "@/lib/db";
import { WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { Webhook } from "svix";

const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;

async function validateRequest(request: Request) {
  if (!webhookSecret) {
    throw new Error(
      "Webhook secret not set. Please set CLERK_WEBHOOK_SECRET from Clerk Dashboard in your environment variables."
    );
  }

  const payloadString = await request.text();
  const headerPayload = headers();

  const svixHeaders = {
    "svix-id": headerPayload.get("svix-id")!,
    "svix-timestamp": headerPayload.get("svix-timestamp")!,
    "svix-signature": headerPayload.get("svix-signature")!,
  };
  const wh = new Webhook(webhookSecret);
  return wh.verify(payloadString, svixHeaders) as WebhookEvent;
}

export async function POST(request: Request) {
  try {
    const payload = await validateRequest(request);

    if (payload.type === "user.created") {
      const user = payload.data;
      await db.user.create({
        data: {
          externalUserId: user.id,
          imageUrl: user.image_url,
          username: user.username ?? "",
        },
      });
    } else if (payload.type === "user.updated") {
      const currentUser = await db.user.findUnique({
        where: {
          externalUserId: payload.data.id,
        },
      });
      if (!currentUser) {
        return new Response("User not found", { status: 404 });
      }
      await db.user.update({
        where: {
          externalUserId: payload.data.id,
        },
        data: {
          imageUrl: payload.data.image_url,
          username: payload.data.username ?? "",
        },
      });
    } else if (payload.type === "user.deleted") {
      await db.user.delete({
        where: {
          externalUserId: payload.data.id,
        },
      });
    }

    return Response.json({ message: "Received" });
  } catch (e) {
    console.error(e);
    return Response.error();
  }
}
