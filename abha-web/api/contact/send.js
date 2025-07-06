// File: /api/feedback/index.js

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY); // Set in Vercel env vars

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { rating, comment } = req.body;

  if (!rating) {
    return res.status(400).json({ error: "Rating is required" });
  }

  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "abhamates14@gmail.com", // Change to your email
      subject: "📝 New Feedback Received",
      html: `
        <h3>New Feedback Submitted</h3>
        <p><strong>Rating:</strong> ${rating}</p>
        <p><strong>Comment:</strong> ${comment || "No comment provided"}</p>
      `,
    });

    return res
      .status(200)
      .json({ message: "Feedback submitted and emailed successfully" });
  } catch (error) {
    console.error("Email send error:", error);
    return res
      .status(500)
      .json({ message: "Failed to send feedback email", error });
  }
}
