"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formState, setFormState] = useState<{
    message: string
    success: boolean
  } | null>(null)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)
    setFormState(null)

    const form = event.currentTarget
    const formData = new FormData(form)

    try {
      // Replace 'YOUR_FORMSPREE_ID' with your actual Formspree form ID
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
    } catch (error) {
      setFormState({
        success: false,
        message: "There was an error sending your message. Please try again later.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {formState && (
        <div
          className={`p-4 rounded-lg ${
            formState.success ? "bg-green-500/20 text-green-200" : "bg-red-500/20 text-red-200"
          }`}
        >
          {formState.message}
        </div>
      )}

      {/* Hidden field for Formspree to know where to send the email */}
      <input type="hidden" name="_replyto" value="website@spencersmith.site" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-zinc-300 mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full px-4 py-3 bg-zinc-700/50 border border-zinc-600 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent text-zinc-100"
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-zinc-300 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full px-4 py-3 bg-zinc-700/50 border border-zinc-600 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent text-zinc-100"
            placeholder="your.email@example.com"
          />
        </div>
      </div>
      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-zinc-300 mb-1">
          Subject
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          required
          className="w-full px-4 py-3 bg-zinc-700/50 border border-zinc-600 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent text-zinc-100"
          placeholder="Subject"
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-zinc-300 mb-1">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="w-full px-4 py-3 bg-zinc-700/50 border border-zinc-600 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent text-zinc-100"
          placeholder="Your message"
        ></textarea>
      </div>
      <div>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-primary-500 to-secondary-400 hover:from-primary-600 hover:to-secondary-500 text-white"
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </Button>
      </div>
    </form>
  )
}
