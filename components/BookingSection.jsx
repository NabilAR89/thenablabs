'use client';

/* BookingSection — pick a day, pick a time, leave your details.
   Availability and the booking itself go through the Cloudflare Pages
   Functions in /functions/api, so the Cal.com key never reaches the browser.
   Copy lives in DATA.booking. */

import { useState, useEffect, useMemo, useCallback, useSyncExternalStore } from 'react';
import { DATA } from '@/lib/data';
import { Icon } from '@/lib/icons';

const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const ZONES = [
  'Asia/Beirut', 'Asia/Dubai', 'Asia/Riyadh', 'Europe/London', 'Europe/Paris',
  'Europe/Berlin', 'America/New_York', 'America/Chicago', 'America/Los_Angeles',
];

const iso = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const startOfMonth = (d) => new Date(d.getFullYear(), d.getMonth(), 1);
const addMonths = (d, n) => new Date(d.getFullYear(), d.getMonth() + n, 1);

/* The grid always starts on a Sunday and runs whole weeks, so the month never
   changes height as you page through it. */
function monthGrid(month) {
  const first = startOfMonth(month);
  const cells = [];
  for (let i = 0; i < first.getDay(); i++) cells.push(null);
  const days = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  for (let d = 1; d <= days; d++) cells.push(new Date(month.getFullYear(), month.getMonth(), d));
  while (cells.length % 7) cells.push(null);
  return cells;
}

/* The API lives in Cloudflare Functions, which only run under
   `wrangler pages dev` or on Pages itself. Under `next dev` the request falls
   through to the 404 page, so a non-JSON body means "no backend here" rather
   than a broken response — say that instead of leaking a parse error. */
async function readJson(res) {
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch {
    throw new Error(
      res.status === 404
        ? 'Booking API not found. Run `npm run preview` (wrangler); it is not served by `next dev`.'
        : 'The booking service returned an unexpected response.',
    );
  }
}

export default function BookingSection() {
  const { kicker, title, lead, panel, eventLabel, email } = DATA.booking;

  const today = useMemo(() => new Date(), []);
  const [month, setMonth] = useState(() => startOfMonth(new Date()));
  const [zone, setZone] = useState(null);
  const [date, setDate] = useState(null);
  const [slot, setSlot] = useState(null);
  const [step, setStep] = useState('pick');
  const [form, setForm] = useState({ name: '', email: '', notes: '' });
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [booked, setBooked] = useState(null);

  /* The visitor's own zone, read after hydration so the server and the first
     client render agree; the select can then override it. */
  const detected = useSyncExternalStore(
    () => () => {},
    () => Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC',
    () => 'UTC',
  );
  const timeZone = zone ?? detected;
  const setTimeZone = setZone;

  /* One state bag keyed by the request it answers, so "is this stale?" is
     derived during render rather than pushed with a setState inside the effect. */
  const from = new Date(Math.max(startOfMonth(month), today));
  const to = new Date(month.getFullYear(), month.getMonth() + 1, 0);
  const key = `${iso(from)}|${iso(to)}|${timeZone}`;
  const [slotData, setSlotData] = useState({ key: null, days: {}, error: '' });

  useEffect(() => {
    let live = true;
    const [start, end, tz] = key.split('|');
    const q = new URLSearchParams({ start, end, timeZone: tz });
    fetch(`/api/slots?${q}`)
      .then(async (r) => {
        const b = await readJson(r);
        if (!r.ok) throw new Error(b.error || 'Could not load availability.');
        return b;
      })
      .then((b) => { if (live) setSlotData({ key, days: b.days || {}, error: '' }); })
      .catch((e) => { if (live) setSlotData({ key, days: {}, error: e.message || 'Could not load availability.' }); });
    return () => { live = false; };
  }, [key]);

  const loading = slotData.key !== key;
  const loadError = loading ? '' : slotData.error;
  const days = loading ? {} : slotData.days;
  const times = date ? days[date] || [] : [];
  const fmtTime = useCallback(
    (s) => new Date(s).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', timeZone }),
    [timeZone],
  );

  const pickDate = (d) => { setDate(d); setSlot(null); setError(''); };

  async function confirm(e) {
    e.preventDefault();
    setSending(true); setError('');
    try {
      const r = await fetch('/api/book', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ ...form, start: slot, timeZone }),
      });
      const b = await readJson(r);
      if (!r.ok) throw new Error(b.error || 'Could not book that time.');
      setBooked(b.start || slot);
      setStep('done');
    } catch (err) {
      setError(err.message);
    } finally {
      setSending(false);
    }
  }

  const monthLabel = month.toLocaleDateString([], { month: 'long', year: 'numeric' });
  const canGoBack = startOfMonth(today) < month;

  return (
    <section className="section book" id="book">
      <div className="wrap">
        <div className="book-head reveal">
          <div className="book-head-title">
            <span className="eyebrow">{kicker}</span>
            <h2 className="h-sec">{title}</h2>
          </div>
          <p className="sec-sub">{lead}</p>
        </div>

        <div className="book-card reveal reveal-d1">
          <aside className="book-aside">
            <span className="book-aside-kick">{panel.kicker}</span>
            <h3>{panel.title}</h3>
            <p>{panel.body}</p>
            <ul className="book-points">
              {panel.points.map((p) => (
                <li key={p}><Icon name="spark" /> {p}</li>
              ))}
            </ul>
            <div className="book-mail">
              <span>Prefer email?</span>
              <a href={`mailto:${email}`}>{email}</a>
            </div>
          </aside>

          <div className="book-main">
            {step === 'done' ? (
              <div className="book-done">
                <span className="book-tick"><Icon name="spark" /></span>
                <h3>You&rsquo;re booked.</h3>
                <p>
                  {new Date(booked).toLocaleString([], {
                    weekday: 'long', month: 'long', day: 'numeric',
                    hour: 'numeric', minute: '2-digit', timeZone,
                  })} ({timeZone})
                </p>
                <p className="book-note">A calendar invite is on its way to {form.email}.</p>
              </div>
            ) : (
              <>
                <div className="book-main-head">
                  <span className="book-kick">{eventLabel}</span>
                  <h3>{step === 'pick' ? 'Select a date & time' : 'Your details'}</h3>
                </div>

                {step === 'pick' ? (
                  <>
                    <label className="book-tz">
                      <span>Times shown in</span>
                      <select value={timeZone} onChange={(e) => { setTimeZone(e.target.value); setSlot(null); }}>
                        {[...new Set([timeZone, ...ZONES])].map((z) => <option key={z} value={z}>{z}</option>)}
                      </select>
                    </label>

                    <div className="book-grid">
                      <div className="book-cal">
                        <div className="book-cal-head">
                          <strong>{monthLabel}</strong>
                          <span className="book-nav">
                            <button type="button" aria-label="Previous month" disabled={!canGoBack}
                                    onClick={() => { setMonth(addMonths(month, -1)); pickDate(null); }}>
                              <Icon name="arrowRight" />
                            </button>
                            <button type="button" aria-label="Next month"
                                    onClick={() => { setMonth(addMonths(month, 1)); pickDate(null); }}>
                              <Icon name="arrowRight" />
                            </button>
                          </span>
                        </div>
                        <div className="book-dow">{DAY_NAMES.map((d) => <span key={d}>{d}</span>)}</div>
                        <div className="book-days">
                          {monthGrid(month).map((d, i) => {
                            if (!d) return <span key={`x${i}`} />;
                            const key = iso(d);
                            const open = !!days[key]?.length;
                            return (
                              <button type="button" key={key} disabled={!open}
                                      className={'book-day' + (open ? ' open' : '') + (date === key ? ' on' : '')}
                                      aria-pressed={date === key}
                                      onClick={() => pickDate(key)}>
                                {d.getDate()}
                              </button>
                            );
                          })}
                        </div>
                        <p className="book-note">{DATA.booking.footnote}</p>
                      </div>

                      <div className="book-times">
                        <strong>Available times</strong>
                        {loading && <p className="book-note">Loading availability…</p>}
                        {!loading && loadError && <p className="book-err">{loadError}</p>}
                        {!loading && !loadError && !date && (
                          <p className="book-note">Choose a highlighted date to see available times.</p>
                        )}
                        {!loading && !loadError && date && !times.length && (
                          <p className="book-note">Nothing free that day.</p>
                        )}
                        <div className="book-slots">
                          {times.map((t) => (
                            <button type="button" key={t}
                                    className={'book-slot' + (slot === t ? ' on' : '')}
                                    aria-pressed={slot === t}
                                    onClick={() => setSlot(t)}>
                              {fmtTime(t)}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <button type="button" className="btn btn-teal book-go" disabled={!slot}
                            onClick={() => setStep('details')}>
                      Continue
                    </button>
                  </>
                ) : (
                  <form className="book-form" onSubmit={confirm}>
                    <p className="book-chosen">
                      {new Date(slot).toLocaleString([], {
                        weekday: 'long', month: 'long', day: 'numeric',
                        hour: 'numeric', minute: '2-digit', timeZone,
                      })}
                      <button type="button" onClick={() => setStep('pick')}>Change</button>
                    </p>
                    <label className="cfield"><span>Name</span>
                      <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                    </label>
                    <label className="cfield"><span>Email</span>
                      <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                    </label>
                    <label className="cfield"><span>What are you building?</span>
                      <textarea rows="3" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
                    </label>
                    {error && <p className="book-err">{error}</p>}
                    <button className="btn btn-teal book-go" type="submit" disabled={sending}>
                      {sending ? 'Booking…' : 'Confirm booking'}
                    </button>
                  </form>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
