import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { siteConfig } from "@/lib/site-config"
import { canonicalUrl } from "@/lib/utils"
import {
  getServiceConfig,
  resolveRelatedServices,
  servicePageSchema,
  serviceFaqSchema,
  serviceBreadcrumbSchema,
  waterDamageCategoryServices,
} from "@/lib/services-config"

import UtilityBar from "@/components/site/utility-bar"
import SiteHeader from "@/components/site/site-header"
import SiteFooter from "@/components/site/site-footer"
import MobileCtaBar from "@/components/site/mobile-cta-bar"

import CredentialsStrip from "@/components/sections/credentials-strip"
import ServiceBreadcrumb from "@/components/sections/service-page/service-breadcrumb"
import ServiceHero from "@/components/sections/service-page/service-hero"
import ServiceProblem from "@/components/sections/service-page/service-problem"
import ServiceProcess from "@/components/sections/service-page/service-process"
import ServiceScope from "@/components/sections/service-page/service-scope"
import ServiceWhySwat from "@/components/sections/service-page/service-why-swat"
import ServiceReviews from "@/components/sections/service-page/service-reviews"
import ServiceFaq from "@/components/sections/service-page/service-faq"
import ServiceRelated from "@/components/sections/service-page/service-related"
import ServiceFinalCta from "@/components/sections/service-page/service-final-cta"

export async function generateStaticParams() {
  return waterDamageCategoryServices.map((cfg) => ({ slug: cfg.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const cfg = getServiceConfig(slug)
  if (!cfg) return {}

  const canonical = canonicalUrl(cfg.href)

  return {
    title: cfg.metaTitle,
    description: cfg.metaDescription,
    alternates: { canonical },
    openGraph: {
      type: "website",
      url: canonical,
      title: cfg.metaTitle,
      description: cfg.metaDescription,
      siteName: siteConfig.name,
    },
    twitter: {
      card: "summary_large_image",
      title: cfg.metaTitle,
      description: cfg.metaDescription,
    },
  }
}

export default async function WaterDamageServicePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const cfg = getServiceConfig(slug)
  if (!cfg) notFound()

  const relatedServices = resolveRelatedServices(cfg)

  const lastUpdatedDate = new Date(cfg.lastUpdated)
  const lastUpdatedDisplay = lastUpdatedDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  })

  return (
    <>
      {/* JSON-LD: Service schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicePageSchema(cfg)) }}
      />
      {/* JSON-LD: FAQPage schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceFaqSchema(cfg)) }}
      />
      {/* JSON-LD: BreadcrumbList schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceBreadcrumbSchema(cfg)) }}
      />

      <UtilityBar />
      <SiteHeader />

      <main id="main-content">
        <ServiceBreadcrumb cfg={cfg} />
        <ServiceHero cfg={cfg} />
        <CredentialsStrip />
        <ServiceProblem cfg={cfg} />
        <ServiceProcess cfg={cfg} />
        <ServiceScope cfg={cfg} />
        <ServiceWhySwat cfg={cfg} />
        <ServiceReviews cfg={cfg} />
        <ServiceFaq cfg={cfg} />
        <ServiceRelated services={relatedServices} />
        <ServiceFinalCta cfg={cfg} />

        {/* Last updated — required SEO signal on every service page */}
        <div className="bg-[#0c1230] border-t border-white/8 py-4">
          <div className="max-w-7xl mx-auto px-5 sm:px-6">
            <p className="text-white/35 text-xs font-mono tracking-wider">
              Last updated: {lastUpdatedDisplay}
            </p>
          </div>
        </div>
      </main>

      <SiteFooter />
      <MobileCtaBar />
      <div className="h-14 lg:hidden" aria-hidden="true" />
    </>
  )
}
