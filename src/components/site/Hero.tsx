import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { BETA_TRIAL_DAYS } from "@/lib/site-config";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-glow pt-28 sm:pt-32 lg:pt-40">
      {/* Decorative grid wash — hidden from assistive tech. */}
      <div aria-hidden="true" className="grid-lines pointer-events-none absolute inset-0 -z-10" />

      <Container className="pb-16 sm:pb-20 lg:pb-24">
        <div className="max-w-3xl">
          <Reveal>
            <p className="eyebrow">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[hsl(var(--landing-accent))] opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[hsl(var(--landing-accent))]" />
              </span>
              Limited Early Access
            </p>
          </Reveal>

          <Reveal delay={60}>
            <h1 className="mt-6 text-4xl font-bold leading-[1.08] sm:text-5xl lg:text-6xl">
              Want to test ReChoir with your choir?
            </h1>
          </Reveal>

          <Reveal delay={120}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[hsl(var(--landing-muted))]">
              ReChoir brings the everyday work of running a choir into one organised
              space. We&apos;re inviting a limited number of choirs to test the
              beta free for {BETA_TRIAL_DAYS} days, before ReChoir goes live fully.
            </p>
          </Reveal>

          <Reveal delay={180}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a href="#apply" className="btn-primary w-full sm:w-auto">
                Request Early Access
                <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#product" className="btn-secondary w-full sm:w-auto">
                Explore ReChoir
              </a>
            </div>
          </Reveal>

          <Reveal delay={240}>
            <p className="mt-6 text-sm text-[hsl(var(--landing-muted))]">
              No account needed to look around. Explore the product first, then apply.
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
