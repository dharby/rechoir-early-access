import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { DemoSection } from "@/components/site/DemoSection";
import { FeaturesSection } from "@/components/site/FeaturesSection";
import { HowItWorksSection } from "@/components/site/HowItWorksSection";
import { FaqSection } from "@/components/site/FaqSection";
import { ApplySection } from "@/components/site/ApplySection";
import { NewsletterSection } from "@/components/site/NewsletterSection";
import { FinalCta } from "@/components/site/FinalCta";
import { Footer } from "@/components/site/Footer";

export default function App() {
  return (
    <div className="flex min-h-dvh flex-col bg-[hsl(var(--landing-bg))] text-[hsl(var(--landing-fg))]">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-[hsl(var(--landing-accent))] focus:px-4 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-[hsl(var(--landing-accent-fg))]"
      >
        Skip to content
      </a>

      <Nav />

      <main id="main" className="flex-1">
        <Hero />
        <DemoSection />
        <FeaturesSection />
        <HowItWorksSection />
        <FaqSection />
        <ApplySection />
        <NewsletterSection />
        <FinalCta />
      </main>

      <Footer />
    </div>
  );
}
