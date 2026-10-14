import { configured } from "@/lib/newsletter";
import { NewsletterForm } from "./newsletter-form";
export function Newsletter({ compact = false }: { compact?: boolean }) {
  return <NewsletterForm compact={compact} enabled={configured()} />;
}
