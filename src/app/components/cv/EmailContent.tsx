"use client";

import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";

type EmailContentProps = {
  onSent: () => void;
};

export default function EmailContent({ onSent }: EmailContentProps) {
  const [sent, setSent] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;

    // Reject fields containing only spaces.
    for (const name of ["from", "subject", "message"]) {
      const field = form.elements.namedItem(name);

      if (
        field instanceof HTMLInputElement ||
        field instanceof HTMLTextAreaElement
      ) {
        field.setCustomValidity(
          field.value.trim() ? "" : "Please complete this field.",
        );
      }
    }

    if (!form.reportValidity()) return;

    audioRef.current?.pause();

    const audio = new Audio("/sound/send-email.wav");
    audio.volume = 0.5;
    audioRef.current = audio;

    void audio.play().catch(() => {
      // Confirmation still works if sound is unavailable.
    });

    setSent(true);
  }

  if (sent) {
    return (
      <div className="retro-mail-confirmation">
        <div role="status">
          <h2>Message sent.</h2>
          <p>Your message has been sent successfully.</p>
        </div>

        <button
          type="button"
          className="retro-mail-button"
          onClick={onSent}
          autoFocus
        >
          OK
        </button>
      </div>
    );
  }
  return (
    <form className="retro-mail-form" onSubmit={handleSubmit}>
      <div className="retro-mail-fields">
        <label htmlFor="retro-mail-to">To:</label>
        <input
          id="retro-mail-to"
          type="email"
          value="hello@arriannlee.com"
          readOnly
        />

        <label htmlFor="retro-mail-from">From:</label>
        <input
          id="retro-mail-from"
          name="from"
          type="email"
          placeholder="Your email address"
          autoComplete="email"
          required
          onInput={(event) => event.currentTarget.setCustomValidity("")}
        />

        <label htmlFor="retro-mail-subject">Subject:</label>
        <input
          id="retro-mail-subject"
          name="subject"
          type="text"
          maxLength={200}
          required
          onInput={(event) => event.currentTarget.setCustomValidity("")}
        />
      </div>

      <label htmlFor="retro-mail-message">Message:</label>

      <textarea
        id="retro-mail-message"
        name="message"
        placeholder="Write your message here…"
        maxLength={10000}
        required
        onInput={(event) => event.currentTarget.setCustomValidity("")}
      />

      <div className="retro-mail-actions">
        <button type="submit" className="retro-mail-button">
          Send
        </button>
      </div>
    </form>
  );
}
