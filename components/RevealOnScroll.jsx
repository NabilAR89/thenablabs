'use client';

/* RevealOnScroll — runs the reveal-on-scroll observer for a page whose markup
   is otherwise static, so that page can stay a server component.
   Replaces the inline IntersectionObserver script the legacy pages carried. */
import { useRevealObserver, useScrolledRoot } from '@/lib/hooks';

export default function RevealOnScroll() {
  useRevealObserver();
  useScrolledRoot();
  return null;
}
