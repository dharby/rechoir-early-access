import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";
import { FEATURES } from "@/lib/content";

export function FeaturesSection() {
  return (
    <section
      id="features"
      className="scroll-mt-20 border-t border-[hsl(var(--landing-border))] py-20 sm:py-24 lg:py-28"
    >
      <Container>
        <Reveal>
          <SectionHead
            eyebrow="What's inside"
            title="Everything a choir actually has to keep track of"
            sub="Each of these is a real part of ReChoir today, not a roadmap item."
          />
        </Reveal>

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <Reveal
                key={feature.title}
                delay={(i % 3) * 70}
                as="li"
              >
                <div className="group h-full rounded-2xl border border-[hsl(var(--landing-border))] bg-[hsl(var(--landing-surface))] p-6 transition-colors duration-200 hover:border-[hsl(var(--landing-accent)/0.5)]">
                  <span className="grid h-11 w-11 place-items-center rounded-xl border border-[hsl(var(--landing-border))] bg-white/[0.03] text-[hsl(var(--landing-accent))]">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-base font-semibold text-[hsl(var(--landing-fg))]">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[hsl(var(--landing-muted))]">
                    {feature.body}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
