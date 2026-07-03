import { LandingCta, LandingFooter } from "@/components/landing/landing-footer";
import { LandingFeatures } from "@/components/landing/landing-features";
import { LandingHeader } from "@/components/landing/landing-header";
import { LandingHero } from "@/components/landing/landing-hero";
import { LandingSecurity } from "@/components/landing/landing-security";

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#fafbff]">
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
