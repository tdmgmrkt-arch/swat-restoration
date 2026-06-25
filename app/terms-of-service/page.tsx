import type { Metadata } from "next"
import Link from "next/link"
import {
  Phone,
  Mail,
  MapPin,
  Scroll,
  Building2,
  Globe,
  ClipboardCheck,
  CreditCard,
  ShieldCheck,
  CalendarX,
  AlertOctagon,
  ExternalLink,
  Copyright,
  RefreshCw,
  Scale,
  CalendarClock,
} from "lucide-react"

import { siteConfig } from "@/lib/site-config"
import { canonicalUrl, cn } from "@/lib/utils"
import { TacticalLabel, AccentLine } from "@/components/ui/tactical-panel"

import SiteHeader from "@/components/site/site-header"
import PageBreadcrumb from "@/components/site/page-breadcrumb"
import SiteFooter from "@/components/site/site-footer"
import MobileCtaBar from "@/components/site/mobile-cta-bar"

const CANONICAL = canonicalUrl("/terms-of-service")
const EFFECTIVE_DATE = "June 19, 2026"

export const metadata: Metadata = {
  title: "Terms of Service — S.W.A.T. Restoration",
  description:
    "Terms governing use of the S.W.A.T. Restoration website and service inquiries — including emergency dispatch, estimates, insurance coordination, workmanship, and limitation of liability.",
  alternates: { canonical: CANONICAL },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: CANONICAL,
    title: "Terms of Service — S.W.A.T. Restoration",
    description:
      "Terms governing use of the S.W.A.T. Restoration website and service inquiries.",
    siteName: siteConfig.name,
  },
}

export default function TermsOfServicePage() {
  const aledo = siteConfig.locations[0]

  return (
    <>
      <SiteHeader />

      <main id="main-content">
        <PageBreadcrumb current="Terms of Service" />

        {/* ============================================================== */}
        {/* HERO                                                            */}
        {/* ============================================================== */}
        <section
          className="relative isolate bg-[#0c1230] overflow-hidden"
          aria-labelledby="terms-heading"
        >
          <div
            className="absolute inset-0 -z-10 bg-linear-to-b from-[#0a0f28] via-[#0c1230] to-[#131a3e] pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_55%_45%_at_20%_30%,rgba(220,38,38,0.12),transparent_70%)] pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 -z-10 tactical-grid opacity-25 pointer-events-none"
            aria-hidden="true"
          />

          <div
            className="absolute left-0 inset-y-0 w-1 bg-red-600 z-0"
            aria-hidden="true"
          />
          <div
            className="absolute top-8 right-8 w-6 h-6 border-t-2 border-r-2 border-red-600/50 pointer-events-none z-0"
            aria-hidden="true"
          />
          <div
            className="absolute bottom-8 right-8 w-6 h-6 border-b-2 border-r-2 border-red-600/50 pointer-events-none z-0 hidden sm:block"
            aria-hidden="true"
          />

          <div className="relative max-w-7xl mx-auto px-5 sm:px-6 py-16 lg:py-24">
            <div className="flex items-center gap-2 mb-5">
              <Scroll
                className="h-4 w-4 text-red-500"
                aria-hidden="true"
              />
              <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-red-300 font-bold">
                Service &amp; Website Terms
              </span>
            </div>

            <TacticalLabel>Legal</TacticalLabel>
            <AccentLine />

            <h1
              id="terms-heading"
              className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.05] mb-5"
            >
              Terms of Service
            </h1>
            <p className="text-white/65 text-base sm:text-lg leading-relaxed max-w-2xl">
              These Terms of Service (&ldquo;Terms&rdquo;) govern your use of
              the S.W.A.T. Restoration website and any service inquiries you
              submit through it. By using this website or requesting service,
              you agree to these Terms. Please read them carefully.
            </p>

            <div className="mt-8 inline-flex items-center gap-2.5 px-4 py-2 bg-white/5 border border-white/15 rounded-sm">
              <CalendarClock
                className="h-3.5 w-3.5 text-red-400"
                aria-hidden="true"
              />
              <span className="text-[10px] font-mono tracking-[0.22em] uppercase text-white/60 font-semibold">
                Effective Date
              </span>
              <span className="text-white/85 text-xs font-mono">
                {EFFECTIVE_DATE}
              </span>
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* BUSINESS INFO CARD                                              */}
        {/* ============================================================== */}
        <section
          className="relative bg-[#131a3e] border-y border-white/8 py-10 lg:py-12"
          aria-label="Business contact information"
        >
          <div className="relative max-w-7xl mx-auto px-5 sm:px-6">
            <div className="relative bg-[#1a2347] border border-white/12 rounded-sm p-6 lg:p-7 overflow-hidden">
              <div
                className="absolute left-0 top-0 bottom-0 w-1 bg-red-600"
                aria-hidden="true"
              />
              <div
                className="absolute top-2 right-2 w-2.5 h-2.5 border-t border-r border-red-600/60"
                aria-hidden="true"
              />

              <div className="pl-3">
                <p className="text-[10px] font-mono tracking-[0.25em] uppercase text-red-400 font-bold mb-2">
                  Business Information
                </p>
                <h2 className="text-white text-xl font-black tracking-tight mb-1">
                  {siteConfig.name}
                </h2>
                <p className="text-white/55 text-xs font-mono mb-4">
                  Family owned &amp; operated · IICRC-trained crews
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-start gap-2.5">
                    <MapPin
                      className="h-4 w-4 text-red-500 shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <address className="not-italic text-white/70 leading-relaxed">
                      {aledo.address}
                      <br />
                      {aledo.city}, {aledo.state} {aledo.zip}
                    </address>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Phone
                      className="h-4 w-4 text-red-500 shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <Link
                      href={siteConfig.phone.primary_tel}
                      className="text-white/85 hover:text-red-400 font-semibold transition-colors"
                    >
                      {siteConfig.phone.primary}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* TERMS SECTIONS                                                  */}
        {/* ============================================================== */}
        <section className="relative bg-[#0c1230] py-16 lg:py-20 overflow-hidden">
          <div
            className="absolute inset-0 tactical-grid opacity-20 pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative max-w-7xl mx-auto px-5 sm:px-6 space-y-12 lg:space-y-14">
            <TermsSection
              icon={Scroll}
              label="Section 01"
              title="Acceptance of Terms"
              paragraphs={[
                "By accessing or using the S.W.A.T. Restoration website, submitting a service request, or otherwise engaging with us through the site, you agree to be bound by these Terms and our Privacy Policy.",
                "If you do not agree with any part of these Terms, please do not use the website or submit a service request.",
              ]}
            />

            <TermsSection
              icon={Building2}
              label="Section 02"
              title="About S.W.A.T. Restoration"
              paragraphs={[
                "S.W.A.T. Restoration is a family-owned damage restoration company based in Aledo, Texas, serving Fort Worth and surrounding DFW communities. We provide 24/7 emergency response for water damage, fire and smoke damage, mold remediation, storm damage, and full reconstruction.",
                "All restoration work is performed by trained, insured crews. We coordinate directly with insurance carriers on covered claims when authorized by the property owner.",
              ]}
            />

            <TermsSection
              icon={Globe}
              label="Section 03"
              title="Use of the Website"
              intro="By using this website, you agree that you will not:"
              bullets={[
                "Use the site for any unlawful purpose or in violation of any applicable laws",
                "Attempt to gain unauthorized access to any portion of the site or its systems",
                "Use automated scrapers, bots, or data-harvesting tools to extract site content",
                "Copy, reproduce, modify, or redistribute site content without written permission",
                "Interfere with or disrupt the site's operation, security, or performance",
              ]}
              outro="We reserve the right to restrict or terminate access to the site at any time for users who violate these terms."
            />

            <TermsSection
              icon={ClipboardCheck}
              label="Section 04"
              title="Service Inquiries & Estimates"
              paragraphs={[
                "Forms and phone inquiries submitted through this website are service requests, not service contracts. Submitting a form or calling our dispatch line does not by itself create a binding agreement between you and S.W.A.T. Restoration.",
                "All written or verbal estimates provided in advance of on-site assessment are non-binding until a final scope of work is documented on-site. Estimates may be revised once hidden damage is uncovered, moisture mapping reveals additional affected areas, or insurance scope adjustments are required.",
                "A binding service agreement is created only when work is authorized in writing by the property owner or authorized representative and a S.W.A.T. Restoration crew lead on-site.",
              ]}
            />

            <TermsSection
              icon={CreditCard}
              label="Section 05"
              title="Pricing, Payment & Insurance Claims"
              paragraphs={[
                "Pricing is based on the documented scope of work agreed to on-site. For insurance-covered losses, we work directly with your carrier under industry-standard pricing methodology. Out-of-pocket amounts (deductibles, depreciation holdbacks, or non-covered items) remain your responsibility unless otherwise arranged.",
                "Payment terms will be presented in writing before work begins. We accept major credit cards, checks, and direct insurance carrier payments where the carrier authorizes assignment of benefits.",
                "Unpaid invoices may accrue interest and collection costs as permitted by Texas law.",
              ]}
            />

            <TermsSection
              icon={ShieldCheck}
              label="Section 06"
              title="Workmanship Guarantee"
              paragraphs={[
                "S.W.A.T. Restoration stands behind its work. Standard mitigation and remediation services are covered by a workmanship guarantee against defects in installation or workmanship — specific terms are provided in writing at the time of service.",
                "Our workmanship guarantee covers labor performed by S.W.A.T. Restoration. It does not extend to manufacturer defects in materials or equipment (which are governed by their respective manufacturer warranties), damage caused by subsequent water or fire events, modification of completed work by other parties, or pre-existing conditions unrelated to the work performed.",
              ]}
            />

            <TermsSection
              icon={CalendarX}
              label="Section 07"
              title="Cancellations & Rescheduling"
              paragraphs={[
                "You may cancel or reschedule a scheduled (non-emergency) assessment at no charge by contacting our office at least two (2) hours before the scheduled arrival window.",
                "For emergency dispatch calls already in progress, a trip fee may apply if the call is cancelled after the crew has been dispatched.",
              ]}
            />

            <TermsSection
              icon={AlertOctagon}
              label="Section 08"
              title="Limitation of Liability"
              paragraphs={[
                "To the maximum extent permitted by Texas law, S.W.A.T. Restoration's total liability arising out of or relating to any service performed shall not exceed the amount paid by you for the specific service giving rise to the claim.",
                "We are not liable for indirect, incidental, consequential, special, or punitive damages, including lost profits, loss of use, business interruption, or property damage that is not the direct result of our negligence in performing the work.",
                "Nothing in these Terms limits any liability that cannot be limited or excluded under applicable Texas law, including liability for gross negligence, willful misconduct, or fraud.",
              ]}
            />

            <TermsSection
              icon={ExternalLink}
              label="Section 09"
              title="Third-Party Services & Links"
              paragraphs={[
                "Our website may contain links to third-party websites, products, or services (including insurance carrier portals, manufacturer warranty resources, or informational guides). These links are provided for convenience only.",
                "We do not endorse, control, or assume responsibility for any third-party content, products, services, or privacy practices. Your use of any third-party site or service is at your own risk and subject to the terms and policies of that third party.",
              ]}
            />

            <TermsSection
              icon={Copyright}
              label="Section 10"
              title="Intellectual Property"
              paragraphs={[
                "All content on this website \u2014 including text, photography, video, logos, graphics, page layouts, and code \u2014 is the property of S.W.A.T. Restoration or its licensors and is protected by United States and international copyright and trademark laws.",
                "You may not copy, reproduce, modify, distribute, or publicly display any portion of the site without our prior written permission.",
              ]}
            />

            <TermsSection
              icon={RefreshCw}
              label="Section 11"
              title="Modifications to These Terms"
              paragraphs={[
                "We may update these Terms from time to time. Any changes will be posted on this page with an updated effective date.",
                "Your continued use of the website after changes are posted constitutes your acceptance of the updated Terms.",
              ]}
            />

            <TermsSection
              icon={Scale}
              label="Section 12"
              title="Governing Law & Jurisdiction"
              paragraphs={[
                "These Terms are governed by the laws of the State of Texas, without regard to conflict-of-law principles.",
                "Any dispute arising out of or relating to these Terms or any service performed by S.W.A.T. Restoration shall be resolved exclusively in the state or federal courts located in Parker County, Texas. You consent to the personal jurisdiction and venue of those courts.",
              ]}
            />
          </div>
        </section>

        {/* ============================================================== */}
        {/* CONTACT CTA                                                     */}
        {/* ============================================================== */}
        <section
          className="relative bg-[#131a3e] border-t border-white/8 py-16 lg:py-20 overflow-hidden"
          aria-labelledby="contact-heading"
        >
          <div
            className="absolute inset-0 tactical-grid opacity-25 pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute right-0 inset-y-0 w-0.75 bg-linear-to-b from-transparent via-red-600 to-transparent pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative max-w-7xl mx-auto px-5 sm:px-6">
            <div className="relative bg-[#1a2347] border border-white/12 rounded-sm p-8 lg:p-10 overflow-hidden">
              <div
                className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-red-600/60 pointer-events-none z-10"
                aria-hidden="true"
              />
              <div
                className="absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 border-red-600/60 pointer-events-none z-10"
                aria-hidden="true"
              />
              <div
                className="absolute -bottom-2 -left-2 w-4 h-4 border-b-2 border-l-2 border-red-600/60 pointer-events-none z-10"
                aria-hidden="true"
              />
              <div
                className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-red-600/60 pointer-events-none z-10"
                aria-hidden="true"
              />

              <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 lg:gap-10 lg:items-center">
                <div>
                  <TacticalLabel>Contact Us</TacticalLabel>
                  <AccentLine />
                  <h2
                    id="contact-heading"
                    className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight mb-3"
                  >
                    Questions about these terms?
                  </h2>
                  <p className="text-white/65 text-base leading-relaxed max-w-lg">
                    If you have any questions about these Terms of Service or
                    any work performed by S.W.A.T. Restoration, please contact
                    us using the details to the right.
                  </p>
                </div>

                <div className="flex flex-col gap-3 lg:min-w-[18rem]">
                  <div className="bg-[#131a3e] border border-white/10 rounded-sm p-4">
                    <p className="text-[10px] font-mono tracking-[0.22em] uppercase text-white/55 font-semibold mb-2">
                      {siteConfig.name}
                    </p>
                    <div className="flex items-start gap-2.5 mb-3">
                      <MapPin
                        className="h-3.5 w-3.5 text-red-500 shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <address className="not-italic text-white/75 text-sm leading-relaxed">
                        {aledo.address}, {aledo.city}, {aledo.state} {aledo.zip}
                      </address>
                    </div>
                    <Link
                      href={siteConfig.phone.primary_tel}
                      className={cn(
                        "inline-flex items-center justify-center gap-2 w-full",
                        "bg-red-600 hover:bg-red-700 text-white font-bold text-sm tracking-wide uppercase",
                        "px-5 py-3 rounded-sm border border-red-500/40 min-h-11 transition-colors"
                      )}
                    >
                      <Phone className="h-4 w-4" aria-hidden="true" />
                      {siteConfig.phone.primary}
                    </Link>
                    <Link
                      href={`mailto:${siteConfig.email}`}
                      className="mt-3 flex items-center justify-center gap-2 text-white/55 hover:text-white text-xs transition-colors min-h-9"
                    >
                      <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                      {siteConfig.email}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
      <MobileCtaBar />
    </>
  )
}

/* ------------------------------------------------------------------ */
/* TermsSection — reusable block matching the privacy-policy pattern    */
/* ------------------------------------------------------------------ */
type TermsSectionProps = {
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>
  label: string
  title: string
  intro?: string
  bullets?: readonly string[]
  outro?: string
  paragraphs?: readonly string[]
}

function TermsSection({
  icon: Icon,
  label,
  title,
  intro,
  bullets,
  outro,
  paragraphs,
}: TermsSectionProps) {
  const id = `section-${label.replace(/\s+/g, "-").toLowerCase()}`

  return (
    <article className="relative" aria-labelledby={id}>
      <div className="flex items-center gap-2.5 mb-3">
        <div className="flex items-center justify-center w-8 h-8 rounded-sm bg-red-600/10 border border-red-600/30">
          <Icon className="h-4 w-4 text-red-400" aria-hidden={true} />
        </div>
        <span className="text-[10px] font-mono tracking-[0.22em] uppercase text-red-400 font-bold">
          {label}
        </span>
        <div className="h-px flex-1 bg-red-600/20" aria-hidden="true" />
      </div>

      <h2
        id={id}
        className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight mb-4"
      >
        {title}
      </h2>

      {paragraphs &&
        paragraphs.map((p, i) => (
          <p
            key={i}
            className="text-white/70 text-sm sm:text-base leading-relaxed mb-3 last:mb-0"
          >
            {p}
          </p>
        ))}

      {intro && (
        <p className="text-white/70 text-sm sm:text-base leading-relaxed mb-4">
          {intro}
        </p>
      )}

      {bullets && (
        <ul role="list" className="space-y-2.5 mb-4">
          {bullets.map((item) => (
            <li
              key={item}
              className="flex items-start gap-2.5 text-white/75 text-sm sm:text-[15px] leading-relaxed"
            >
              <span
                className="mt-2 h-1 w-1 rounded-full bg-red-500 shrink-0"
                aria-hidden="true"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}

      {outro && (
        <p className="text-white/70 text-sm sm:text-base leading-relaxed mb-0">
          {outro}
        </p>
      )}
    </article>
  )
}
