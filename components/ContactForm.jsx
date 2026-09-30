"use client";

/* ContactForm — the "Send a message" form, shared by the home page's contact
   section and the floating ContactFab on every page. */

import { useState } from "react";
import { Icon } from "@/lib/icons";
import "@/styles/contact.css";

export default function ContactForm() {
  /* idle → sending → sent | error. The form posts to /api/contact (worker.js),
     which emails hello@thenablabs.com server-side — no mail app involved. */
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const submit = async (e) => {
    e.preventDefault();
    const f = e.target;
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: f.name.value,
          email: f.email.value,
          message: f.message.value,
          website: f.website.value,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error);
      f.reset();
      setStatus("sent");
    } catch (err) {
      setError(
        err.message ||
          "Your message could not be sent. Please email hello@thenablabs.com directly.",
      );
      setStatus("error");
    }
  };
  return (
    <form className="cform" onSubmit={submit}>
      <div className="cform-row">
        <label className="cfield">
          <span>Name</span>
          <input name="name" type="text" required placeholder="Your name" />
        </label>
        <label className="cfield">
          <span>Email</span>
          <input
            name="email"
            type="email"
            required
            placeholder="you@company.com"
          />
        </label>
      </div>
      <label className="cfield">
        <span>Project</span>
        <textarea
          name="message"
          rows="4"
          required
          placeholder="What are you building, and what do you need help with?"
        ></textarea>
      </label>
      {/* honeypot — hidden from people, filled in by bots */}
      <input
        className="cform-hp"
        name="website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />
      <button
        className="btn btn-light btn-neon-host"
        type="submit"
        disabled={status === "sending"}
      >
        <span className="btn-neon" aria-hidden="true"></span>
        {status === "sending"
          ? "Sending…"
          : status === "sent"
            ? "Message sent"
            : "Send message"}{" "}
        <Icon name="arrowUpRight" />
      </button>
      <p className="cform-note" role="status" aria-live="polite">
        {status === "sent"
          ? "Thanks — your message is on its way. We’ll be in touch soon."
          : status === "error"
            ? error
            : ""}
      </p>
    </form>
  );
}
