import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  console.log("🔥 API Hit:", req.method);
  console.log("📬 Body:", req.body);
  console.log("🔑 Key Present?", !!process.env.RESEND_API_KEY);

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  const { rating, comment } = req.body;
  if (!rating) {
    return res.status(400).json({ message: "Rating is required" });
  }

  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "abhamates14@gmail.com",
      subject: "New Feedback Received",
      html: `
        <h3>New Feedback Submitted</h3>
        <p><strong>Rating:</strong> ${rating}</p>
        <p><strong>Comment:</strong> ${comment || "No comment"}</p>
      `,
    });

    return res.status(200).json({ message: "Feedback emailed!" });
  } catch (err) {
    console.error("🐞 Resend error:", err);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message || err });
  }
}
