import { Webhook } from "svix";
import { createUser } from "@/lib/actions/user.action";

export const runtime = "nodejs";

export async function POST(req) {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;
  if (!WEBHOOK_SECRET) {
    return new Response("Missing WEBHOOK_SECRET", { status: 500 });
  }

  const body = await req.text();

  const svix_id = req.headers.get("svix-id");
  const svix_timestamp = req.headers.get("svix-timestamp");
  const svix_signature = req.headers.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Missing svix headers", { status: 400 });
  }

  let evt;
  try {
    const wh = new Webhook(WEBHOOK_SECRET);
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });
  } catch (err) {
    console.error("❌ Invalid webhook signature", err);
    return new Response("Invalid signature", { status: 400 });
  }

  if (evt.type !== "user.created") {
    return new Response("Ignored", { status: 200 });
  }

  try {
    const { data } = evt;
    const email = data.email_addresses?.[0]?.email_address;

    if (!email) {
      return new Response("Missing email", { status: 400 });
    }

    await createUser({
      clerkId: data.id,
      email,
      username: `${email.split("@")[0]}_${data.id.slice(-4)}`,
      firstName: data.first_name || "",
      lastName: data.last_name || "",
      photo: data.image_url || "",
    });

    // ✅ IMPORTANT: return 200 always
    return new Response("OK", { status: 200 });
  } catch (error) {
    console.error("❌ DB error:", error);
    return new Response("OK", { status: 200 }); // still 200 to stop retries
  }
}
