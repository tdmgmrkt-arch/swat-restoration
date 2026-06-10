import type { Metadata } from "next"
import { siteConfig } from "@/lib/site-config"
import { plumberSchema } from "@/lib/schema"

import UtilityBar from "@/components/site/utility-bar"
import SiteHeader from "@/components/site/site-header"
import SiteFooter from "@/components/site/site-footer"
import MobileCtaBar from "@/components/site/mobile-cta-bar"

import Hero from "@/components/sections/hero"
import TrustMetrics from "@/components/sections/trust-metrics"
import ServicesOverview from "@/components/sections/services-overview"
import WhyChoose from "@/components/sections/why-choose"
import FinancingBanner from "@/components/sections/financing-banner"
import ServiceArea from "@/components/sections/service-area"
import Testimonials from "@/components/sections/testimonials"
import TeamFleet from "@/components/sections/team-fleet"
import FinalCta from "@/components/sections/final-cta"

export const metadata: Metadata = {
  title: `${siteConfig.name} | Water & Fire Damage Restoration in DFW`,
  description: siteConfig.description,
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    type: "website",
    url: siteConfig.url,
    title: `${siteConfig.name} | Water & Fire Damage Restoration in DFW`,
    description: siteConfig.description,
  },
}

export default function HomePage() {
  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(plumberSchema()) }}
      />

      <UtilityBar />

      <SiteHeader />

      <main id="main-content">
        <Hero />
        <TrustMetrics />
        <ServicesOverview />
        <WhyChoose />
        <FinancingBanner />
        <ServiceArea />
        <Testimonials />
        <TeamFleet />
        <FinalCta />
      </main>

      <SiteFooter />

      {/* Sticky mobile CTA bar — lg:hidden */}
      <MobileCtaBar />

      {/* Spacer so mobile CTA bar doesn't overlap footer */}
      <div className="h-14 lg:hidden" aria-hidden="true" />
    </>
  )
}
