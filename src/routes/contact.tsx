import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Clock3, MapPin, MessageCircle, Phone } from "lucide-react";
import { PageHero } from "@/components/PageBlocks";
import { gymConfig } from "@/data/site";
import { MagneticButton } from "@/components/MagneticButton";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Join | Aura Fitness Samalkota" },
      {
        name: "description",
        content: "Contact Aura Fitness in Samalkota, call 6304-746380, or chat directly on WhatsApp to join.",
      },
      { property: "og:title", content: "Join Aura Fitness" },
      { property: "og:description", content: "Your stronger version starts here." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      setStatus("error");
      form.reportValidity();
      return;
    }
    setStatus("loading");
    setTimeout(() => setStatus("success"), 700);
  };

  return (
    <main>
      <PageHero
        eyebrow="START TODAY"
        title="READY TO TRAIN?"
        copy="Your stronger version starts here. Visit us in Samalkota or reach out directly."
      />
      <section className="py-24 md:py-36">
        <div className="section-shell grid gap-14 lg:grid-cols-[.85fr_1.15fr]">
          <div>
            <p className="eyebrow">AURA FITNESS</p>
            <h2 className="display-hero mt-5 text-6xl md:text-7xl">
              LET'S GET<br />
              <span className="text-primary">STARTED.</span>
            </h2>
            <div className="mt-10 space-y-6 text-sm text-muted-foreground">
              <a
                href={`tel:${gymConfig.phone}`}
                className="flex items-center gap-4 text-foreground transition-colors hover:text-primary"
              >
                <div className="grid size-10 place-items-center border border-primary/50 bg-primary/10 text-primary">
                  <Phone className="size-4" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Call Directly</div>
                  <div className="font-display text-2xl font-bold text-foreground">{gymConfig.phoneDisplay}</div>
                </div>
              </a>

              <a
                href="https://wa.me/916304746380?text=Hi%20Aura%20Fitness%2C%20I%20want%20to%20know%20more%20about%20membership"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 text-foreground transition-colors hover:text-emerald-400"
              >
                <div className="grid size-10 place-items-center border border-emerald-500/50 bg-emerald-500/10 text-emerald-400">
                  <MessageCircle className="size-4" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">WhatsApp Instant Chat</div>
                  <div className="font-display text-xl font-bold text-emerald-400">Chat with AmmiRaju</div>
                </div>
              </a>

              <div className="flex items-start gap-4">
                <div className="grid size-10 place-items-center border border-primary/50 bg-primary/10 text-primary">
                  <MapPin className="size-4" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Gym Location</div>
                  <div className="text-sm font-medium text-foreground">{gymConfig.location}</div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="grid size-10 place-items-center border border-primary/50 bg-primary/10 text-primary">
                  <Clock3 className="size-4" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Operating Hours</div>
                  <div className="text-sm text-foreground">
                    {gymConfig.hours[0]}<br />{gymConfig.hours[1]}
                  </div>
                </div>
              </div>
            </div>

            <p className="mt-10 border-l border-primary pl-4 text-xs leading-6 text-muted-foreground">
              A precise street address and verified map link are coming soon. Founded by {gymConfig.founder}.
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={submit}
            className="border border-border bg-card p-8 md:p-12 shadow-xl"
            noValidate
          >
            <h3 className="font-display text-3xl font-bold uppercase tracking-wide">
              Send an Enquiry
            </h3>
            <p className="mt-2 text-xs text-muted-foreground mb-8">
              Fill in your details and our team will get in touch with you shortly.
            </p>

            <div className="grid gap-6 md:grid-cols-2">
              <Field label="YOUR FULL NAME" name="name" required placeholder="e.g. Rahul Sharma" />
              <Field label="PHONE NUMBER" name="phone" type="tel" required placeholder="e.g. 9876543210" />
              <label className="grid gap-2 text-xs font-bold tracking-[.12em] text-muted-foreground">
                PREFERRED PROGRAM
                <select
                  name="program"
                  className="min-h-12 border border-border bg-input px-4 text-sm text-foreground focus:border-primary focus:outline-none"
                >
                  <option>Strength Training</option>
                  <option>Cardio Conditioning</option>
                  <option>Zumba Group Class</option>
                  <option>CrossFit Training</option>
                  <option>Personal Training (1-on-1)</option>
                </select>
              </label>

              <label className="grid gap-2 text-xs font-bold tracking-[.12em] text-muted-foreground md:col-span-2">
                YOUR MESSAGE / GOAL
                <textarea
                  name="message"
                  required
                  rows={4}
                  placeholder="Tell us about your fitness background and goals..."
                  className="border border-border bg-input p-4 text-sm text-foreground focus:border-primary focus:outline-none"
                />
              </label>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                disabled={status === "loading" || status === "success"}
                className="min-h-12 bg-primary px-8 text-xs font-extrabold tracking-[.18em] text-primary-foreground transition-all duration-300 hover:bg-accent disabled:opacity-60"
              >
                {status === "loading"
                  ? "SENDING..."
                  : status === "success"
                  ? "ENQUIRY RECORDED"
                  : "SUBMIT ENQUIRY"}
              </button>

              <a
                href="https://wa.me/916304746380?text=Hi%20Aura%20Fitness%2C%20I%20want%20to%20know%20more%20about%20membership"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center gap-2 border border-emerald-500/50 bg-emerald-500/10 px-6 text-xs font-bold tracking-[.16em] text-emerald-400 hover:bg-emerald-500/20 transition-colors"
              >
                <MessageCircle className="size-4" /> CHAT ON WHATSAPP
              </a>
            </div>

            {status === "success" && (
              <p className="mt-5 text-sm text-primary font-medium">
                Thank you! Your details have been received. We will connect with you soon.
              </p>
            )}
            {status === "error" && (
              <p className="mt-5 text-sm text-red-400 font-medium">
                Please complete all required fields.
              </p>
            )}
            <p className="mt-6 text-[.68rem] leading-5 text-muted-foreground/70">
              * This form validates locally and will be connected to Aura Fitness's direct CRM upon launch.
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
  placeholder = "",
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="grid gap-2 text-xs font-bold tracking-[.12em] text-muted-foreground">
      {label}
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="min-h-12 border border-border bg-input px-4 text-sm text-foreground focus:border-primary focus:outline-none placeholder:text-muted-foreground/40"
      />
    </label>
  );
}

