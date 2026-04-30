"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react"

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formState, setFormState] = useState<{
    message: string
    success: boolean
  } | null>(null)
  const [focusedField, setFocusedField] = useState<string | null>(null)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)
    setFormState(null)

    const form = event.currentTarget
    const formData = new FormData(form)

    try {
      const response = await fetch("https://formspree.io/f/mldbgwbb", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      })

      if (response.ok) {
        setFormState({
          success: true,
          message: "Your message has been sent successfully!",
        })
        form.reset()
      } else {
        const data = await response.json()
        setFormState({
          success: false,
          message: data.error || "There was an error sending your message. Please try again later.",
        })
      }
    } catch {
      setFormState({
        success: false,
        message: "There was an error sending your message. Please try again later.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const inputClasses = (fieldName: string) =>
    `w-full px-4 py-3 glass-subtle border transition-all duration-300 rounded-lg text-ctp-text placeholder:text-ctp-overlay0 ${
      focusedField === fieldName
        ? "border-ctp-mauve/50 ring-2 ring-ctp-mauve/20 shadow-glow-sm"
        : "border-ctp-surface2/50 hover:border-ctp-surface2"
    }`

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {formState && (
        <div
          className={`p-4 rounded-lg glass-subtle flex items-center gap-3 animate-fade-in ${
            formState.success
              ? "border border-ctp-green/30 text-ctp-green"
              : "border border-ctp-red/30 text-ctp-red"
          }`}
        >
          {formState.success ? (
            <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
          )}
          {formState.message}
        </div>
      )}

      <input type="hidden" name="_replyto" value="website@spencersmith.site" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-medium text-ctp-subtext1">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className={inputClasses("name")}
            placeholder="Your name"
            onFocus={() => setFocusedField("name")}
            onBlur={() => setFocusedField(null)}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-ctp-subtext1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className={inputClasses("email")}
            placeholder="your.email@example.com"
            onFocus={() => setFocusedField("email")}
            onBlur={() => setFocusedField(null)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="subject" className="block text-sm font-medium text-ctp-subtext1">
          Subject
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          required
          className={inputClasses("subject")}
          placeholder="What is this about?"
          onFocus={() => setFocusedField("subject")}
          onBlur={() => setFocusedField(null)}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="block text-sm font-medium text-ctp-subtext1">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className={`${inputClasses("message")} resize-none`}
          placeholder="Tell me about your project or idea..."
          onFocus={() => setFocusedField("message")}
          onBlur={() => setFocusedField(null)}
        />
      </div>

      <div>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full relative overflow-hidden bg-gradient-to-r from-ctp-mauve to-ctp-sapphire hover:from-ctp-pink hover:to-ctp-sky text-ctp-crust font-semibold transition-all duration-300 hover:shadow-glow-md hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          <span className={`flex items-center justify-center gap-2 transition-all duration-300 ${isSubmitting ? "opacity-0" : "opacity-100"}`}>
            <Send className="w-4 h-4" />
            Send Message
          </span>
          {isSubmitting && (
            <span className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="w-5 h-5 animate-spin" />
            </span>
          )}
        </Button>
      </div>
    </form>
  )
}
