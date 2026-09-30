import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { BETA_TRIAL_DAYS } from "@/lib/site-config";

export function FinalCta() {
  return (
    <section className="bg-glow border-t border-[hsl(var(--landing-border))] py-20 sm:py-24">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="section-heading text-3xl sm:text-4xl">
              Help us build the choir app you actually wanted
            </h2>
            <p className="section-sub">
              Early Access is limited so we can give each choir real attention. If
              that sounds like your kind of tool, we would like to hear from you —
              and we&apos;ll give you {BETA_TRIAL_DAYS} free days to test the beta
              before it goes live.
            </p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <a href="#apply" className="btn-primary w-full sm:w-auto">
                Request Early Access
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a href="#product" className="btn-secondary w-full sm:w-auto">
                Look around first
              </a>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
