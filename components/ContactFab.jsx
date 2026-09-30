"use client";

/* ContactFab — a floating "contact" button on every page. It opens a panel
   holding the same ContactForm as the home page's "Send a message" section.
   Mounted from each route group's layout. */

import { useState, useEffect, useRef } from "react";
import { Icon } from "@/lib/icons";
import ContactForm from "@/components/ContactForm";

/* speech bubble with three typing dots */
function ChatIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
         strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 4h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-8l-5 4v-4H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
      <circle cx="8.5" cy="11" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="12" cy="11" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="15.5" cy="11" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function ContactFab() {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);
  const panelRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onDocClick = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDocClick);
    panelRef.current?.querySelector("input")?.focus({ preventScroll: true });
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDocClick);
    };
  }, [open]);

  return (
    <div className={"cfab" + (open ? " open" : "")} ref={wrapRef}>
      {/* kept mounted while closed so a half-typed message survives */}
      <div
        className="cfab-panel"
        id="cfab-panel"
        ref={panelRef}
        role="dialog"
        aria-label="Send a message"
        aria-hidden={!open}
        inert={!open}
      >
        <div className="cfab-head">
          <div>
            <span className="cfab-eyebrow">Get in touch</span>
            <h2 className="cfab-title">Send a message</h2>
          </div>
          <button
            type="button"
            className="cfab-close"
            aria-label="Close"
            onClick={() => setOpen(false)}
          >
            <Icon name="close" />
          </button>
        </div>
        <ContactForm />
      </div>
      <button
        type="button"
        className="cfab-btn"
        aria-label={open ? "Close contact form" : "Contact us"}
        aria-expanded={open}
        aria-controls="cfab-panel"
        onClick={() => setOpen((o) => !o)}
      >
        <span className="cfab-ring" aria-hidden="true" />
        {open ? <Icon name="close" /> : <ChatIcon />}
        <span className="cfab-live" aria-hidden="true" />
      </button>
    </div>
  );
}
