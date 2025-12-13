import { clerkClient } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { Webhook } from "svix";

import { createUser } from "@/lib/actions/user.action";

export const runtime = "nodejs";

export async function POST(req) {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    return new Response("Missing WEBHOOK_SECRET", { status: 500 });
  }

  const body = await req.text(); // RAW body

  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Missing svix headers", { status: 400 });
  }

  const wh = new Webhook(WEBHOOK_SECRET);
  let evt;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });
  } catch (err) {
    console.error("❌ Webhook verification failed:", err);
    return new Response("Invalid signature", { status: 400 });
  }

  const { type, data } = evt;

  if (type === "user.created") {
    try {
      const user = {
        clerkId: data.id,
        email: data.email_addresses?.[0]?.email_address || "",
        username: data.username || "",
        firstName: data.first_name || "",
        lastName: data.last_name || "",
        photo: data.image_url || "",
      };

      const newUser = await createUser(user);

      await clerkClient.users.updateUserMetadata(data.id, {
        publicMetadata: {
          userId: newUser._id.toString(),
        },
      });

      return new Response("OK", { status: 200 });
    } catch (error) {
      console.error("❌ Webhook handler error:", error);
      return new Response("Webhook failed", { status: 500 });
    }
  }

  return new Response("OK", { status: 200 });
}


// import { clerkClient } from "@clerk/nextjs/server";
// import { headers } from "next/headers";
// import { NextResponse } from "next/server";
// import { Webhook } from "svix";

// import { createUser } from "@/lib/actions/user.action";

// export const runtime = "nodejs"; // IMPORTANT

// export async function POST(req) {
//   const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;
//   if (!WEBHOOK_SECRET) {
//     return new Response("Missing WEBHOOK_SECRET", { status: 500 });
//   }

//   // ✅ RAW BODY — DO NOT PARSE
//   const body = await req.text();

//   const headerPayload = headers();
//   const svix_id = headerPayload.get("svix-id");
//   const svix_timestamp = headerPayload.get("svix-timestamp");
//   const svix_signature = headerPayload.get("svix-signature");

//   if (!svix_id || !svix_timestamp || !svix_signature) {
//     return new Response("Missing svix headers", { status: 400 });
//   }

//   const wh = new Webhook(WEBHOOK_SECRET);
//   let evt;

//   try {
//     evt = wh.verify(body, {
//       "svix-id": svix_id,
//       "svix-timestamp": svix_timestamp,
//       "svix-signature": svix_signature,
//     });
//   } catch (err) {
//     console.error("Webhook verification failed:", err);
//     return new Response("Invalid signature", { status: 400 });
//   }

//   // ✅ NOW SAFE TO PARSE
//   const { type, data } = evt;

//   if (type === "user.created") {
//     try {
//       const user = {
//         clerkId: data.id,
//         email: data.email_addresses?.[0]?.email_address || "",
//         username: data.username || "",
//         firstName: data.first_name || "",
//         lastName: data.last_name || "",
//         photo: data.image_url || "",
//       };

//       const newUser = await createUser(user);

//       if (newUser) {
//         await clerkClient.users.updateUserMetadata(data.id, {
//           publicMetadata: {
//             userId: newUser._id.toString(),
//           },
//         });
//       }

//       return NextResponse.json({ success: true });
//     } catch (error) {
//       console.error("DB error:", error);
//       return new Response("Database error", { status: 500 });
//     }
//   }

//   return new Response("OK", { status: 200 });
// }
