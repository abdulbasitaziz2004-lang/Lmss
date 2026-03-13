import { NextResponse } from "next/server";
import { getCurrentDbUser } from "@/lib/actions/getCurrentUser";
import { createTransport } from "nodemailer";

const transporter = createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

const ACTION_LABELS = {
  create: { verb: "created",  color: "#16a34a", emoji: "✅" },
  edit:   { verb: "updated",  color: "#2563eb", emoji: "✏️" },
  delete: { verb: "deleted",  color: "#dc2626", emoji: "🗑️" },
};

export async function POST(req) {
  try {
    const user = await getCurrentDbUser();

    // only instructors and admins can trigger notifications
    if (!user || !["admin", "instructor"].includes(user.role)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // admins acting on their own don't need a notification
    if (user.role === "admin") {
      return NextResponse.json({ skipped: true });
    }

    const { action, courseTitle, courseSlug } = await req.json();
    const meta = ACTION_LABELS[action] || ACTION_LABELS.edit;
    const adminEmail = process.env.ADMIN_EMAIL;

    if (!adminEmail) {
      console.warn("ADMIN_EMAIL not set — skipping notification");
      return NextResponse.json({ skipped: true });
    }

    await transporter.sendMail({
      from: `"DevAcademy" <${process.env.GMAIL_USER}>`,
      to: adminEmail,
      subject: `${meta.emoji} Course ${meta.verb} by instructor — ${courseTitle}`,
      html: `
        <div style="font-family: sans-serif; max-width: 520px; margin: 0 auto; background: #0f0f18; color: #e5e5e5; border-radius: 12px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #7c3aed, #4f46e5); padding: 28px 32px;">
            <h1 style="margin: 0; font-size: 20px; color: #fff; font-weight: 800; letter-spacing: -0.3px;">
              DevAcademy Admin Alert
            </h1>
            <p style="margin: 6px 0 0; font-size: 13px; color: rgba(255,255,255,0.7);">Instructor activity notification</p>
          </div>

          <div style="padding: 28px 32px;">
            <div style="background: #1a1a2e; border: 1px solid #2a2a3e; border-radius: 10px; padding: 20px; margin-bottom: 20px;">
              <p style="margin: 0 0 4px; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #6b7280;">Action</p>
              <p style="margin: 0; font-size: 22px; font-weight: 800; color: ${meta.color};">
                ${meta.emoji} Course ${meta.verb}
              </p>
            </div>

            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #1f1f2e; color: #6b7280; font-size: 13px; width: 120px;">Course</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #1f1f2e; color: #e5e5e5; font-size: 13px; font-weight: 600;">${courseTitle}</td>
              </tr>
              ${courseSlug ? `
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #1f1f2e; color: #6b7280; font-size: 13px;">Slug</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #1f1f2e; color: #e5e5e5; font-size: 13px;">${courseSlug}</td>
              </tr>` : ""}
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #1f1f2e; color: #6b7280; font-size: 13px;">Instructor</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #1f1f2e; color: #e5e5e5; font-size: 13px;">${user.name || user.email}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #6b7280; font-size: 13px;">Time</td>
                <td style="padding: 10px 0; color: #e5e5e5; font-size: 13px;">${new Date().toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })}</td>
              </tr>
            </table>

            <div style="margin-top: 24px; text-align: center;">
              <a href="${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/dashboard/AdminCourses"
                style="display: inline-block; background: linear-gradient(135deg, #7c3aed, #4f46e5); color: #fff; text-decoration: none; padding: 12px 28px; border-radius: 8px; font-size: 14px; font-weight: 700;">
                Review in Dashboard →
              </a>
            </div>
          </div>

          <div style="padding: 16px 32px; border-top: 1px solid #1f1f2e; text-align: center;">
            <p style="margin: 0; font-size: 11px; color: #4b5563;">© ${new Date().getFullYear()} DevAcademy · Admin notifications</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("notify-admin error:", err);
    // don't fail the main action if email fails
    return NextResponse.json({ error: "Email failed", detail: err.message }, { status: 500 });
  }
}