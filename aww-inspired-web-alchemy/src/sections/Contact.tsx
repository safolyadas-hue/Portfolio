import { useState, type FormEvent } from "react";
import MagneticButton from "@/components/MagneticButton";

const FORMSPREE_URL = "https://formspree.io/f/xkoppyvn";

const contactInfo = [
  { label: "University", value: "SRM University AP" },
  { label: "Degree", value: "B.Tech Mechanical Engg." },
  { label: "Location", value: "Andhra Pradesh, India" },
  { label: "Status", value: "Open to Internships", accent: true },
];

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="relative flex min-h-screen flex-col justify-between px-8 py-32">
      <div>
        <div className="font-mono text-[11px] uppercase tracking-[0.4em] text-primary">
          08 — Contact
        </div>
        <h2 className="mt-6 font-serif text-6xl leading-[0.95] md:text-[10vw]">
          Let's <span className="italic text-foreground/70">build</span>
          <br />
          something<span className="text-primary">.</span>
        </h2>

        <p className="mt-10 max-w-xl text-base leading-relaxed text-foreground/70 md:text-lg">
          I'm actively looking for internships, collaborative projects, and opportunities
          where I can contribute, grow, and learn. If you're building something that needs
          a curious, driven engineer — I'd love to talk.
        </p>
      </div>

      {/* Contact form */}
      <div className="mt-16 max-w-xl">
        {status === "sent" ? (
          <div className="border border-primary/30 bg-primary/5 p-10 text-center">
            <div className="font-serif text-3xl text-primary">Message Sent</div>
            <p className="mt-3 text-sm text-foreground/70">
              Thank you for reaching out! I'll get back to you soon.
            </p>
            <button
              onClick={() => setStatus("idle")}
              className="mt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-primary underline underline-offset-4 transition-colors hover:text-foreground"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground"
              >
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                disabled={status === "sending"}
                className="w-full border border-border bg-transparent px-4 py-3 font-sans text-foreground outline-none transition-colors focus:border-primary disabled:opacity-50"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground"
              >
                Your Email
              </label>
              <input
                type="email"
                id="email"
                name="_replyto"
                required
                disabled={status === "sending"}
                className="w-full border border-border bg-transparent px-4 py-3 font-sans text-foreground outline-none transition-colors focus:border-primary disabled:opacity-50"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                disabled={status === "sending"}
                className="w-full resize-y border border-border bg-transparent px-4 py-3 font-sans text-foreground outline-none transition-colors focus:border-primary disabled:opacity-50"
              />
            </div>

            {status === "error" && (
              <div className="border border-red-500/30 bg-red-500/5 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-red-400">
                Something went wrong. Please try again or email me directly.
              </div>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              data-cursor="hover"
              className="w-full border border-primary bg-primary px-8 py-4 font-mono text-[10px] uppercase tracking-[0.3em] text-primary-foreground transition-all hover:bg-transparent hover:text-primary disabled:cursor-not-allowed disabled:opacity-50"
            >
              {status === "sending" ? "Sending..." : "Send Message"}
            </button>
          </form>
        )}
      </div>

      {/* Info cards */}
      <div className="mt-16 grid gap-8 md:grid-cols-4">
        {contactInfo.map((ci) => (
          <div key={ci.label}>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              {ci.label}
            </div>
            <div className={`mt-2 font-serif text-xl ${ci.accent ? "text-primary" : "text-foreground"}`}>
              {ci.value}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 flex items-center justify-center">
        <MagneticButton onClick={() => (window.location.href = "mailto:safolyadas@srmap.edu.in")}>
          Open to Internships
        </MagneticButton>
      </div>

      <footer className="mt-24 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
        <span>© 2026 Safolya Das — All rights reserved</span>
        <span>B.Tech Mechanical Engg. · SRM University AP</span>
      </footer>
    </section>
  );
}
