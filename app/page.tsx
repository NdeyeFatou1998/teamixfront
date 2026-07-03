import { LandingCta, LandingFooter } from "@/components/landing/landing-footer";
import { LandingFeatures } from "@/components/landing/landing-features";
import { LandingHeader } from "@/components/landing/landing-header";
import { LandingHero } from "@/components/landing/landing-hero";
import { LandingSecurity } from "@/components/landing/landing-security";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <LandingHeader />
      <main>
        <LandingHero />
        <LandingFeatures />
        <LandingSecurity />
        <LandingCta />
      </main>
      <LandingFooter />
    </div>
  );
}
