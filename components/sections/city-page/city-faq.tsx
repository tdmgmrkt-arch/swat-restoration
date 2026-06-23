"use client"

import { AccentLine, TacticalLabel } from "@/components/ui/tactical-panel"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"
import type { CityConfig } from "@/lib/cities/_types"

export default function CityFaq({ cfg }: { cfg: CityConfig }) {
  if (!cfg.faqs || cfg.faqs.length === 0) return null

  return (
    <section
      className="relative bg-[#1a2347] border-y border-white/8 py-20 lg:py-24 overflow-hidden"
      aria-labelledby="city-faq-heading"
    >
      <div
        className="absolute inset-0 tactical-grid opacity-20 pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <TacticalLabel>Common Questions — {cfg.name}</TacticalLabel>
          <AccentLine />
          <h2
            id="city-faq-heading"
            className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight mb-10"
          >
            Answered before
            <br />
            <span className="text-red-500">you have to ask.</span>
          </h2>

          <Accordion className="divide-y divide-white/8 border-t border-b border-white/10">
            {cfg.faqs.map((faq, idx) => (
              <AccordionItem
                key={idx}
                value={`city-faq-${idx}`}
                className="border-none py-1"
              >
                <AccordionTrigger className="py-5 text-left text-white text-base font-semibold hover:no-underline hover:text-red-400 transition-colors [&>svg]:text-red-500">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-white/65 text-sm leading-loose pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
