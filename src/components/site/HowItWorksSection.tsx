import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";
import { HOW_IT_WORKS } from "@/lib/content";

export function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="scroll-mt-20 border-t border-[hsl(var(--landing-border))] py-20 sm:py-24 lg:py-28"
    >
      <Container>
        <Reveal>
          <SectionHead
            eyebrow="How it works"
            title="Three steps, and no commitment up front"
            sub="Early Access is a trial, not a sales process. If it is not useful to your choir, we have both lost a little time."
          />
        </Reveal>

        <ol className="mt-14 grid gap-4 lg:grid-cols-3">
          {HOW_IT_WORKS.map((step, i) => (
            <Reveal as="li" key={step.title} delay={i * 90} className="relative">
              <div className="h-full rounded-2xl border border-[hsl(var(--landing-border))] bg-[hsl(var(--landing-surface))] p-7">
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-full border border-[hsl(var(--landing-accent)/0.4)] bg-[hsl(var(--landing-accent)/0.1)] font-mono text-sm font-bold text-[hsl(var(--landing-accent))]">
                    {i + 1}
                  </span>
                  <h3 className="text-lg font-semibold text-[hsl(var(--landing-fg))]">
                    {step.title}
                  </h3>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-[hsl(var(--landing-muted))]">
                  {step.body}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
