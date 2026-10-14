export const site = {
  name: "Inside AI",
  creator: "Ramesh Badugu",
  tagline: "Understand AI. Find useful tools. Build something.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  description:
    "Clear explanations, useful tools, and practical guides to help you make sense of AI.",
  instagram: "https://www.instagram.com/insideai.vision/",
  instagramHandle: "insideai.vision",
  youtube: process.env.NEXT_PUBLIC_YOUTUBE_URL || "",
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "",
  newsletter: {
    provider: "brevo",
    consent: "I agree to receive AI updates by email. Unsubscribe at any time.",
  },
};
