"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { CheckCircle, AlertTriangle, Phone, Loader2 } from "lucide-react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import {
  contactSchema,
  type ContactFormValues,
  SERVICE_TYPE_OPTIONS,
  URGENCY_OPTIONS,
  PREFERRED_CONTACT_OPTIONS,
} from "@/lib/contact-schema"
import { siteConfig } from "@/lib/site-config"

type SubmitState = "idle" | "loading" | "success" | "error"

export function ContactForm() {
  const [submitState, setSubmitState] = useState<SubmitState>("idle")

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  })

  const urgencyValue = watch("urgency")
  const preferredContactValue = watch("preferred_contact")

  async function onSubmit(data: ContactFormValues) {
    setSubmitState("loading")
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      const json = await res.json()
      if (json.ok) {
        setSubmitState("success")
      } else {
        setSubmitState("error")
      }
    } catch {
      setSubmitState("error")
    }
  }

  if (submitState === "success") {
    return (
      <div className="bg-[#1a2347] border border-white/10 rounded-sm p-8 lg:p-12 flex flex-col items-center text-center gap-5">
        <div className="flex items-center justify-center w-14 h-14 rounded-full bg-red-600/15 border border-red-600/30">
          <CheckCircle className="h-7 w-7 text-red-400" aria-hidden="true" />
        </div>
        <div>
          <p className="text-[10px] font-mono tracking-[0.25em] uppercase text-red-400 font-semibold mb-2">
            Message Received
          </p>
          <h3 className="text-white text-2xl font-black tracking-tight mb-3">
            Transmission Confirmed.
          </h3>
          <p className="text-white/55 text-sm leading-relaxed max-w-sm mx-auto">
            We&apos;ve routed your request to dispatch — expect a call within one
            business hour, or immediately if you selected emergency.
          </p>
        </div>
      </div>
    )
  }

  if (submitState === "error") {
    return (
      <div className="bg-[#1a2347] border border-red-600/30 rounded-sm p-8 lg:p-12 flex flex-col items-center text-center gap-5">
        <div className="flex items-center justify-center w-14 h-14 rounded-full bg-red-600/15 border border-red-600/30">
          <AlertTriangle className="h-7 w-7 text-red-400" aria-hidden="true" />
        </div>
        <div>
          <p className="text-[10px] font-mono tracking-[0.25em] uppercase text-red-400 font-semibold mb-2">
            Transmission Blocked
          </p>
          <h3 className="text-white text-2xl font-black tracking-tight mb-3">
            Something interrupted the signal.
          </h3>
          <p className="text-white/55 text-sm leading-relaxed max-w-sm mx-auto mb-6">
            The form couldn&apos;t send. Call directly — the line is always live.
          </p>
          <Link
            href={siteConfig.phone.aled_tel}
            className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold text-sm tracking-wide uppercase px-6 py-3 rounded-sm border border-red-500/40 min-h-[44px] transition-colors"
            aria-label={`Call S.W.A.T. Restoration at ${siteConfig.phone.aledo}`}
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            Call {siteConfig.phone.aledo}
          </Link>
        </div>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="bg-[#1a2347] border border-white/12 border-t-0 rounded-b-sm p-6 lg:p-8"
    >
      {/* Honeypot — hidden from real users, bots will fill it */}
      <input
        type="text"
        tabIndex={-1}
        aria-hidden="true"
        className="absolute opacity-0 pointer-events-none w-0 h-0 overflow-hidden"
        {...register("website")}
        autoComplete="off"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Name */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="contact-name"
            className="text-xs font-mono tracking-[0.18em] uppercase text-white/75 font-semibold"
          >
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            id="contact-name"
            type="text"
            autoComplete="name"
            placeholder="Jane Smith"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "error-name" : undefined}
            className={cn(
              "bg-[#131a3e] text-white text-base placeholder:text-white/40",
              "border rounded-sm px-4 min-h-12",
              "focus:outline-none focus:ring-2 focus:ring-red-500/60 focus:border-red-500/60",
              "transition-colors",
              errors.name
                ? "border-red-500/60"
                : "border-white/15 hover:border-white/25"
            )}
            {...register("name")}
          />
          {errors.name && (
            <p id="error-name" role="alert" className="text-red-400 text-xs mt-0.5">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Phone */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="contact-phone"
            className="text-xs font-mono tracking-[0.18em] uppercase text-white/75 font-semibold"
          >
            Phone <span className="text-red-500">*</span>
          </label>
          <input
            id="contact-phone"
            type="tel"
            autoComplete="tel"
            placeholder="(817) 555-0100"
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "error-phone" : undefined}
            className={cn(
              "bg-[#131a3e] text-white text-base placeholder:text-white/40",
              "border rounded-sm px-4 min-h-12",
              "focus:outline-none focus:ring-2 focus:ring-red-500/60 focus:border-red-500/60",
              "transition-colors",
              errors.phone
                ? "border-red-500/60"
                : "border-white/15 hover:border-white/25"
            )}
            {...register("phone")}
          />
          {errors.phone && (
            <p id="error-phone" role="alert" className="text-red-400 text-xs mt-0.5">
              {errors.phone.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="contact-email"
            className="text-xs font-mono tracking-[0.18em] uppercase text-white/75 font-semibold"
          >
            Email <span className="text-red-500">*</span>
          </label>
          <input
            id="contact-email"
            type="email"
            autoComplete="email"
            placeholder="jane@example.com"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "error-email" : undefined}
            className={cn(
              "bg-[#131a3e] text-white text-base placeholder:text-white/40",
              "border rounded-sm px-4 min-h-12",
              "focus:outline-none focus:ring-2 focus:ring-red-500/60 focus:border-red-500/60",
              "transition-colors",
              errors.email
                ? "border-red-500/60"
                : "border-white/15 hover:border-white/25"
            )}
            {...register("email")}
          />
          {errors.email && (
            <p id="error-email" role="alert" className="text-red-400 text-xs mt-0.5">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* City */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="contact-city"
            className="text-xs font-mono tracking-[0.18em] uppercase text-white/75 font-semibold"
          >
            City{" "}
            <span className="text-white/40 normal-case tracking-normal text-[10px]">
              optional
            </span>
          </label>
          <input
            id="contact-city"
            type="text"
            autoComplete="address-level2"
            placeholder="Aledo, Weatherford, Fort Worth…"
            className={cn(
              "bg-[#131a3e] text-white text-base placeholder:text-white/40",
              "border border-white/15 hover:border-white/25 rounded-sm px-4 min-h-12",
              "focus:outline-none focus:ring-2 focus:ring-red-500/60 focus:border-red-500/60",
              "transition-colors"
            )}
            {...register("city")}
          />
        </div>

        {/* Service Type */}
        <div className="flex flex-col gap-1.5 lg:col-span-2">
          <label
            htmlFor="contact-service"
            className="text-xs font-mono tracking-[0.18em] uppercase text-white/75 font-semibold"
          >
            Service Needed <span className="text-red-500">*</span>
          </label>
          <select
            id="contact-service"
            aria-invalid={!!errors.service_type}
            aria-describedby={errors.service_type ? "error-service" : undefined}
            className={cn(
              "bg-[#131a3e] text-white text-base",
              "border rounded-sm px-4 min-h-12",
              "focus:outline-none focus:ring-2 focus:ring-red-500/60 focus:border-red-500/60",
              "transition-colors appearance-none cursor-pointer",
              errors.service_type
                ? "border-red-500/60"
                : "border-white/15 hover:border-white/25"
            )}
            defaultValue=""
            {...register("service_type")}
          >
            <option value="" disabled className="text-white/40 bg-[#131a3e]">
              Select a service…
            </option>
            {SERVICE_TYPE_OPTIONS.map((opt) => (
              <option key={opt} value={opt} className="bg-[#131a3e]">
                {opt}
              </option>
            ))}
          </select>
          {errors.service_type && (
            <p id="error-service" role="alert" className="text-red-400 text-xs mt-0.5">
              {errors.service_type.message}
            </p>
          )}
        </div>

        {/* Urgency */}
        <div className="flex flex-col gap-2 lg:col-span-2">
          <fieldset>
            <legend className="text-xs font-mono tracking-[0.18em] uppercase text-white/75 font-semibold mb-2.5">
              How Soon? <span className="text-red-500">*</span>
            </legend>
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5"
              role="group"
              aria-describedby={errors.urgency ? "error-urgency" : undefined}
            >
              {URGENCY_OPTIONS.map((opt) => {
                const id = `urgency-${opt.replace(/\s+/g, "-").toLowerCase()}`
                const isSelected = urgencyValue === opt
                return (
                  <label
                    key={opt}
                    htmlFor={id}
                    className={cn(
                      "flex items-center gap-3 cursor-pointer",
                      "border rounded-sm px-4 py-3 min-h-[52px]",
                      "transition-colors select-none",
                      isSelected
                        ? "border-red-500/70 bg-red-600/10 text-white"
                        : "border-white/15 bg-[#131a3e] text-white/70 hover:border-white/30 hover:text-white"
                    )}
                  >
                    <input
                      type="radio"
                      id={id}
                      value={opt}
                      className="sr-only"
                      aria-invalid={!!errors.urgency}
                      {...register("urgency")}
                      onChange={() => setValue("urgency", opt, { shouldValidate: true })}
                    />
                    <span
                      className={cn(
                        "flex-shrink-0 w-3.5 h-3.5 rounded-full border-2 transition-colors",
                        isSelected
                          ? "border-red-500 bg-red-500"
                          : "border-white/30 bg-transparent"
                      )}
                      aria-hidden="true"
                    />
                    <span className="text-sm font-medium leading-tight">{opt}</span>
                  </label>
                )
              })}
            </div>
          </fieldset>
          {errors.urgency && (
            <p id="error-urgency" role="alert" className="text-red-400 text-xs mt-0.5">
              {errors.urgency.message}
            </p>
          )}
        </div>

        {/* Preferred Contact */}
        <div className="flex flex-col gap-2 lg:col-span-2">
          <fieldset>
            <legend className="text-xs font-mono tracking-[0.18em] uppercase text-white/75 font-semibold mb-2.5">
              Preferred Contact Method <span className="text-red-500">*</span>
            </legend>
            <div
              className="flex flex-col sm:flex-row gap-2.5"
              role="group"
              aria-describedby={errors.preferred_contact ? "error-preferred" : undefined}
            >
              {PREFERRED_CONTACT_OPTIONS.map((opt) => {
                const id = `preferred-${opt.toLowerCase()}`
                const isSelected = preferredContactValue === opt
                return (
                  <label
                    key={opt}
                    htmlFor={id}
                    className={cn(
                      "flex items-center gap-3 cursor-pointer flex-1",
                      "border rounded-sm px-4 py-3 min-h-[52px]",
                      "transition-colors select-none",
                      isSelected
                        ? "border-red-500/70 bg-red-600/10 text-white"
                        : "border-white/15 bg-[#131a3e] text-white/70 hover:border-white/30 hover:text-white"
                    )}
                  >
                    <input
                      type="radio"
                      id={id}
                      value={opt}
                      className="sr-only"
                      aria-invalid={!!errors.preferred_contact}
                      {...register("preferred_contact")}
                      onChange={() =>
                        setValue("preferred_contact", opt, { shouldValidate: true })
                      }
                    />
                    <span
                      className={cn(
                        "flex-shrink-0 w-3.5 h-3.5 rounded-full border-2 transition-colors",
                        isSelected
                          ? "border-red-500 bg-red-500"
                          : "border-white/30 bg-transparent"
                      )}
                      aria-hidden="true"
                    />
                    <span className="text-sm font-medium">{opt}</span>
                  </label>
                )
              })}
            </div>
          </fieldset>
          {errors.preferred_contact && (
            <p id="error-preferred" role="alert" className="text-red-400 text-xs mt-0.5">
              {errors.preferred_contact.message}
            </p>
          )}
        </div>

        {/* Message */}
        <div className="flex flex-col gap-1.5 lg:col-span-2">
          <label
            htmlFor="contact-message"
            className="text-xs font-mono tracking-[0.18em] uppercase text-white/75 font-semibold"
          >
            Message{" "}
            <span className="text-white/40 normal-case tracking-normal text-[10px]">
              optional
            </span>
          </label>
          <textarea
            id="contact-message"
            rows={5}
            placeholder="Describe what's happening — the more detail, the faster dispatch can route the right crew."
            className={cn(
              "bg-[#131a3e] text-white text-base placeholder:text-white/40",
              "border border-white/15 hover:border-white/25 rounded-sm px-4 py-3.5",
              "focus:outline-none focus:ring-2 focus:ring-red-500/60 focus:border-red-500/60",
              "transition-colors resize-none"
            )}
            {...register("message")}
          />
        </div>

        {/* Submit */}
        <div className="lg:col-span-2">
          <button
            type="submit"
            disabled={submitState === "loading"}
            className={cn(
              "w-full lg:w-auto inline-flex items-center justify-center gap-2",
              "bg-red-600 hover:bg-red-700 text-white font-bold text-sm tracking-wide uppercase",
              "px-10 py-4 rounded-sm border border-red-500/40 min-h-[52px] transition-colors",
              "disabled:opacity-60 disabled:cursor-not-allowed"
            )}
          >
            {submitState === "loading" ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                Transmitting…
              </>
            ) : (
              "Send Message"
            )}
          </button>
          <p className="text-white/30 text-xs mt-3 font-mono">
            Fields marked <span className="text-red-500">*</span> are required.
            Emergency? Call directly — response is immediate.
          </p>
          <p className="text-white/35 text-xs mt-2 leading-relaxed">
            By submitting, you agree to our{" "}
            <Link
              href="/privacy-policy"
              className="text-white/60 hover:text-red-400 underline underline-offset-2 transition-colors"
            >
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link
              href="/terms-of-service"
              className="text-white/60 hover:text-red-400 underline underline-offset-2 transition-colors"
            >
              Terms of Service
            </Link>
            , and consent to receive SMS messages about your service request
            (msg &amp; data rates may apply; reply STOP to opt-out).
          </p>
        </div>
      </div>
    </form>
  )
}
