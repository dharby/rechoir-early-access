import { Container } from "@/components/ui/Container";
import { Brand } from "@/components/ui/Brand";
import { CONTACT_EMAIL, COPYRIGHT_YEAR } from "@/lib/site-config";

const FOOTER_LINKS = [
  { href: "#product", label: "Product tour" },
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#faq", label: "FAQ" },
  { href: "#apply", label: "Request Early Access" },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-[hsl(var(--landing-border))] py-12 sm:py-14">
      <Container>
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-xs">
            <Brand size="md" showTagline />
            <p className="mt-4 text-sm leading-relaxed text-[hsl(var(--landing-muted))]">
              An organised space for the everyday work of running a choir.
            </p>
          </div>

          <nav aria-label="Footer" className="flex flex-col">
            {FOOTER_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="flex min-h-[44px] items-center rounded text-sm text-[hsl(var(--landing-muted))] transition-colors hover:text-[hsl(var(--landing-fg))]"
              >
                {link.label}
              </a>
            ))}
            {CONTACT_EMAIL && (
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="flex min-h-[44px] items-center rounded text-sm text-[hsl(var(--landing-muted))] transition-colors hover:text-[hsl(var(--landing-fg))]"
              >
                {CONTACT_EMAIL}
              </a>
            )}
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-[hsl(var(--landing-border))] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-[hsl(var(--landing-muted))]">
            © {COPYRIGHT_YEAR} ReChoir. All rights reserved.
          </p>
          <p className="text-xs text-[hsl(var(--landing-muted))]">
            Product screens on this page use sample data only.
          </p>
        </div>
      </Container>
    </footer>
  );
}
