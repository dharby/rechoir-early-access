import { useState } from "react";
import { Plus } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";
import { FAQS } from "@/lib/content";
import { cn } from "@/lib/utils";

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="scroll-mt-20 border-t border-[hsl(var(--landing-border))] py-20 sm:py-24 lg:py-28"
    >
      <Container>
        <Reveal>
          <SectionHead
            eyebrow="Questions"
            title="Before you apply"
            sub="If something is not answered here, ask us in your application."
          />
        </Reveal>

        <div className="mt-12 divide-y divide-[hsl(var(--landing-border))] border-y border-[hsl(var(--landing-border))]">
          {FAQS.map((faq, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={faq.q} delay={Math.min(i, 4) * 40}>
                <div>
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${i}`}
                      id={`faq-button-${i}`}
                      className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors hover:text-[hsl(var(--landing-accent))]"
                    >
                      <span className="text-base font-medium text-[hsl(var(--landing-fg))] sm:text-lg">
                        {faq.q}
                      </span>
                      <Plus
                        className={cn(
                          "h-5 w-5 shrink-0 text-[hsl(var(--landing-muted))] transition-transform duration-200",
                          isOpen && "rotate-45 text-[hsl(var(--landing-accent))]",
                        )}
                        aria-hidden="true"
                      />
                    </button>
                  </h3>
                  <div
                    id={`faq-panel-${i}`}
                    role="region"
                    aria-labelledby={`faq-button-${i}`}
                    hidden={!isOpen}
                    className="pb-6 pr-8"
                  >
                    <p className="max-w-2xl text-sm leading-relaxed text-[hsl(var(--landing-muted))] sm:text-base">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
