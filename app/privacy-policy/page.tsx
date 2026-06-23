import type { Metadata } from "next"
import Link from "next/link"
import {
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  MessageSquare,
  Cookie,
  Database,
  UserCheck,
  Lock,
  ExternalLink,
  RefreshCw,
  Share2,
  Eye,
  CalendarClock,
} from "lucide-react"

import { siteConfig } from "@/lib/site-config"
import { cn } from "@/lib/utils"
import { TacticalLabel, AccentLine } from "@/components/ui/tactical-panel"

import SiteHeader from "@/components/site/site-header"
import PageBreadcrumb from "@/components/site/page-breadcrumb"
import SiteFooter from "@/components/site/site-footer"
import MobileCtaBar from "@/components/site/mobile-cta-bar"

const CANONICAL = `${siteConfig.url}/privacy-policy`
const EFFECTIVE_DATE = "June 19, 2026"

export const metadata: Metadata = {
  title: "Privacy Policy — S.W.A.T. Restoration",
  description:
    "How S.W.A.T. Restoration collects, uses, and safeguards your personal information, including our SMS messaging policy and your privacy rights.",
  alternates: { canonical: CANONICAL },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: CANONICAL,
    title: "Privacy Policy — S.W.A.T. Restoration",
    description:
      "Our commitment to protecting your privacy — how we collect, use, and safeguard your information.",
    siteName: siteConfig.name,
  },
}

export default function PrivacyPolicyPage() {
  const aledo = siteConfig.locations[0]

  return (
    <>
      <SiteHeader />

      <main id="main-content">
        <PageBreadcrumb current="Privacy Policy" />

        {/* ============================================================== */}
        {/* HERO                                                            */}
        {/* ============================================================== */}
        <section
          className="relative isolate bg-[#0c1230] overflow-hidden"
          aria-labelledby="privacy-heading"
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
              <ShieldCheck
                className="h-4 w-4 text-red-500"
                aria-hidden="true"
              />
              <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-red-300 font-bold">
                Privacy &amp; Data Protection
              </span>
            </div>

            <TacticalLabel>Legal</TacticalLabel>
            <AccentLine />

            <h1
              id="privacy-heading"
              className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.05] mb-5"
            >
              Privacy Policy
            </h1>
            <p className="text-white/65 text-base sm:text-lg leading-relaxed max-w-2xl">
              S.W.A.T. Restoration (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or
              &ldquo;us&rdquo;) is committed to protecting your privacy and
              ensuring transparency in how we collect, use, and safeguard your
              information. This Privacy Policy explains how we handle your
              information when you visit our website or interact with our
              services.
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
                <h2 className="text-white text-xl font-black tracking-tight mb-4">
                  {siteConfig.name}
                </h2>
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
        {/* POLICY SECTIONS                                                 */}
        {/* ============================================================== */}
        <section className="relative bg-[#0c1230] py-16 lg:py-20 overflow-hidden">
          <div
            className="absolute inset-0 tactical-grid opacity-20 pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative max-w-7xl mx-auto px-5 sm:px-6 space-y-12 lg:space-y-14">
            <PolicySection
              icon={Database}
              label="Section 01"
              title="Information We Collect"
              intro="We may collect personal and non-personal information when you interact with our website or services, including:"
              bullets={[
                "Name, phone number, and email address",
                "Property address and damage details (water, fire, mold, storm)",
                "Information submitted through contact forms",
                "Phone numbers provided for SMS communication",
                "Insurance carrier and claim information you choose to share",
                "IP address, browser type, and website usage data",
              ]}
              outro="This information is collected when you:"
              outroBullets={[
                "Fill out a form on our website",
                "Call or text our 24/7 emergency dispatch line",
                "Schedule a restoration assessment",
                "Interact with our advertisements or website",
              ]}
            />

            <PolicySection
              icon={Eye}
              label="Section 02"
              title="How We Use Your Information"
              intro="We use your information to:"
              bullets={[
                "Dispatch crews and respond to emergency restoration calls",
                "Schedule assessments and send job status updates",
                "Coordinate with your insurance carrier on covered claims",
                "Communicate regarding your service requests and project progress",
                "Improve our website, services, and customer experience",
                "Send relevant updates, promotions, or follow-ups (if opted in)",
              ]}
            />

            {/* SMS — emphasized callout */}
            <article
              className="relative bg-[#131a3e] border border-white/12 rounded-sm overflow-hidden"
              aria-labelledby="sms-policy"
            >
              <div
                className="absolute left-0 top-0 bottom-0 w-1 bg-red-600"
                aria-hidden="true"
              />
              <div
                className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-red-600/60"
                aria-hidden="true"
              />
              <div
                className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-red-600/60"
                aria-hidden="true"
              />

              <div className="p-6 lg:p-8 pl-7 lg:pl-9">
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-sm bg-red-600/10 border border-red-600/30">
                    <MessageSquare
                      className="h-4 w-4 text-red-400"
                      aria-hidden="true"
                    />
                  </div>
                  <span className="text-[10px] font-mono tracking-[0.22em] uppercase text-red-400 font-bold">
                    Section 03
                  </span>
                </div>
                <h2
                  id="sms-policy"
                  className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight mb-4"
                >
                  SMS / Text Messaging Policy
                </h2>
                <p className="text-white/70 text-sm sm:text-base leading-relaxed mb-5">
                  By providing your phone number, you consent to receive SMS
                  messages from S.W.A.T. Restoration, including dispatch
                  confirmations, crew ETA updates, job progress updates, and
                  occasional promotional messages.
                </p>

                <ul role="list" className="space-y-2.5 mb-5">
                  {[
                    "Message and data rates may apply",
                    "Messaging frequency may vary",
                    "Reply STOP to opt-out at any time",
                    "Reply HELP for assistance",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-white/75 text-sm leading-relaxed"
                    >
                      <span
                        className="mt-1.5 h-1 w-1 rounded-full bg-red-500 shrink-0"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="border-t border-white/10 pt-4">
                  <p className="text-white/65 text-sm leading-relaxed">
                    <span className="text-white font-semibold">
                      We do not share, sell, or rent your phone number or SMS
                      consent
                    </span>{" "}
                    with third parties or affiliates for marketing purposes.
                  </p>
                </div>
              </div>
            </article>

            <PolicySection
              icon={Share2}
              label="Section 04"
              title="How We Share Your Information"
              intro="We do not sell or rent your personal information. We may share information only when necessary to:"
              bullets={[
                "Coordinate restoration work with your insurance carrier or adjuster",
                "Provide services (employees, contractors, or service providers)",
                "Comply with legal obligations or law enforcement requests",
                "Protect our business, customers, or legal rights",
              ]}
              outro="All partners and service providers are required to keep your information confidential."
            />

            <PolicySection
              icon={Cookie}
              label="Section 05"
              title="Cookies and Tracking Technologies"
              intro="Our website may use cookies and similar technologies to:"
              bullets={[
                "Improve website performance and user experience",
                "Analyze website traffic and visitor behavior",
                "Support advertising and remarketing efforts (such as Google Ads)",
              ]}
              outro="You can disable cookies through your browser settings, though some features of the website may not function properly."
            />

            <PolicySection
              icon={ExternalLink}
              label="Section 06"
              title="Third-Party Services and Advertising"
              paragraphs={[
                "We may use third-party tools such as Google Ads or analytics services that collect non-personal data to improve advertising performance.",
                "These third-party providers may use cookies or tracking technologies to deliver relevant ads based on your previous interactions with our website.",
                "We recommend reviewing their respective privacy policies for more information.",
              ]}
            />

            <PolicySection
              icon={Lock}
              label="Section 07"
              title="Data Security"
              paragraphs={[
                "We take reasonable precautions to protect your personal information using industry-standard security measures. However, no method of transmission over the internet or electronic storage is completely secure.",
              ]}
            />

            <PolicySection
              icon={UserCheck}
              label="Section 08"
              title="Your Privacy Rights"
              intro="You have the right to:"
              bullets={[
                "Request access to your personal information",
                "Request corrections or updates to your information",
                "Request deletion of your personal data",
                "Opt out of marketing communications at any time",
              ]}
              outro="To make a request, please contact us using the information below."
            />

            <PolicySection
              icon={Database}
              label="Section 09"
              title="Data Retention"
              intro="We retain personal information only as long as necessary to:"
              bullets={[
                "Provide services and complete restoration projects",
                "Support insurance claim documentation",
                "Fulfill legal or regulatory requirements",
                "Resolve disputes and enforce agreements",
              ]}
            />

            <PolicySection
              icon={ExternalLink}
              label="Section 10"
              title="Links to Other Websites"
              paragraphs={[
                "Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of those sites.",
              ]}
            />

            <PolicySection
              icon={RefreshCw}
              label="Section 11"
              title="Updates to This Privacy Policy"
              paragraphs={[
                "We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date.",
                "Your continued use of our website constitutes your acceptance of any updates.",
              ]}
            />
          </div>
        </section>

        {/* ============================================================== */}
        {/* CONTACT US CTA                                                  */}
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
                    Questions about this policy?
                  </h2>
                  <p className="text-white/65 text-base leading-relaxed max-w-lg">
                    If you have any questions about this Privacy Policy or how
                    your information is handled, please contact us using the
                    details to the right.
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
/* PolicySection — reusable block for each numbered policy section      */
/* ------------------------------------------------------------------ */
type PolicySectionProps = {
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>
  label: string
  title: string
  intro?: string
  bullets?: readonly string[]
  outro?: string
  outroBullets?: readonly string[]
  paragraphs?: readonly string[]
}

function PolicySection({
  icon: Icon,
  label,
  title,
  intro,
  bullets,
  outro,
  outroBullets,
  paragraphs,
}: PolicySectionProps) {
  return (
    <article
      className="relative"
      aria-labelledby={`section-${label.replace(/\s+/g, "-").toLowerCase()}`}
    >
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
        id={`section-${label.replace(/\s+/g, "-").toLowerCase()}`}
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
        <p className="text-white/70 text-sm sm:text-base leading-relaxed mb-4 last:mb-0">
          {outro}
        </p>
      )}

      {outroBullets && (
        <ul role="list" className="space-y-2.5">
          {outroBullets.map((item) => (
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
    </article>
  )
}
