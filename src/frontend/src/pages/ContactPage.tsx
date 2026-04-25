import { Layout } from "@/components/layout/Layout";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { useSubmitContact } from "@/hooks/useBackend";
import { useState } from "react";

const SUBJECTS = [
  "General Enquiry",
  "Orders & Shipping",
  "Press & Media",
  "Partnerships",
];

export function ContactPage() {
  const mutation = useSubmitContact();
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: SUBJECTS[0],
    message: "",
  });

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    mutation.mutate(form);
  }

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-muted/30 py-20 border-b border-border">
        <div className="container mx-auto px-6 max-w-5xl text-center">
          <AnimatedSection variant="fade-in">
            <p className="font-display text-xs tracking-[0.3em] uppercase text-primary mb-4">
              Atelier Maison Élite
            </p>
            <h1 className="font-display text-5xl md:text-6xl text-foreground leading-tight mb-5">
              Contact Us
            </h1>
            <p className="font-body text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
              We welcome every correspondence — from bespoke enquiries to press
              and partnership conversations.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Two-column layout */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left: Form */}
            <AnimatedSection variant="slide-in-up" delay={100}>
              {mutation.isSuccess ? (
                <div
                  data-ocid="contact.success_state"
                  className="py-16 text-center"
                >
                  <div className="w-12 h-0.5 bg-primary mx-auto mb-6" />
                  <p className="font-display text-2xl text-foreground mb-3">
                    Thank you.
                  </p>
                  <p className="font-body text-muted-foreground leading-relaxed">
                    We'll be in touch shortly.
                  </p>
                  <button
                    type="button"
                    data-ocid="contact.secondary_button"
                    onClick={() => {
                      mutation.reset();
                      setForm({
                        name: "",
                        email: "",
                        subject: SUBJECTS[0],
                        message: "",
                      });
                    }}
                    className="mt-8 font-display text-xs tracking-widest uppercase text-primary border-b border-primary/50 pb-0.5 hover:border-primary transition-colors duration-200"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  <h2 className="font-display text-2xl text-foreground mb-2">
                    Send a Message
                  </h2>
                  <div className="w-8 h-0.5 bg-primary mb-6" />

                  <div>
                    <label
                      htmlFor="name"
                      className="block font-display text-xs tracking-widest uppercase text-muted-foreground mb-2"
                    >
                      Full Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      data-ocid="contact.input"
                      value={form.name}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-border focus:border-primary outline-none py-2.5 font-body text-sm text-foreground placeholder:text-muted-foreground/50 transition-colors duration-200"
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block font-display text-xs tracking-widest uppercase text-muted-foreground mb-2"
                    >
                      Email Address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      data-ocid="contact.input"
                      value={form.email}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-border focus:border-primary outline-none py-2.5 font-body text-sm text-foreground placeholder:text-muted-foreground/50 transition-colors duration-200"
                      placeholder="hello@example.com"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block font-display text-xs tracking-widest uppercase text-muted-foreground mb-2"
                    >
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      data-ocid="contact.select"
                      value={form.subject}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-border focus:border-primary outline-none py-2.5 font-body text-sm text-foreground transition-colors duration-200 cursor-pointer"
                    >
                      {SUBJECTS.map((s) => (
                        <option key={s} value={s} className="bg-background">
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block font-display text-xs tracking-widest uppercase text-muted-foreground mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      data-ocid="contact.textarea"
                      value={form.message}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-border focus:border-primary outline-none py-2.5 font-body text-sm text-foreground placeholder:text-muted-foreground/50 transition-colors duration-200 resize-none"
                      placeholder="How may we assist you?"
                    />
                  </div>

                  {mutation.isError && (
                    <p
                      data-ocid="contact.error_state"
                      className="font-body text-sm text-destructive"
                    >
                      {mutation.error?.message ??
                        "Something went wrong. Please try again."}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={mutation.isPending}
                    data-ocid="contact.submit_button"
                    className="mt-2 w-full bg-primary text-primary-foreground font-display text-xs tracking-[0.2em] uppercase py-4 hover:bg-primary/90 disabled:opacity-60 transition-all duration-300"
                  >
                    {mutation.isPending ? "Sending…" : "Send Message"}
                  </button>
                </form>
              )}
            </AnimatedSection>

            {/* Right: Contact details */}
            <AnimatedSection variant="slide-in-up" delay={250}>
              <div className="space-y-10 lg:pl-8 lg:border-l border-border">
                <div>
                  <p className="font-display text-xs tracking-[0.25em] uppercase text-primary mb-4">
                    Our Atelier
                  </p>
                  <h3 className="font-display text-xl text-foreground mb-4">
                    Maison Élite
                  </h3>
                  <address className="not-italic font-body text-sm text-muted-foreground leading-8 space-y-0.5">
                    <p>14 Rue du Faubourg Saint-Honoré</p>
                    <p>8th Arrondissement, Paris 75008</p>
                    <p>France</p>
                  </address>
                </div>

                <div className="w-10 h-0.5 bg-primary/40" />

                <div className="space-y-4">
                  <div>
                    <p className="font-display text-xs tracking-widest uppercase text-muted-foreground mb-1">
                      Email
                    </p>
                    <a
                      href="mailto:hello@maisonelite.com"
                      className="font-body text-sm text-foreground hover:text-primary transition-colors duration-200"
                    >
                      hello@maisonelite.com
                    </a>
                  </div>
                  <div>
                    <p className="font-display text-xs tracking-widest uppercase text-muted-foreground mb-1">
                      Telephone
                    </p>
                    <a
                      href="tel:+33142661234"
                      className="font-body text-sm text-foreground hover:text-primary transition-colors duration-200"
                    >
                      +33 1 42 66 12 34
                    </a>
                  </div>
                  <div>
                    <p className="font-display text-xs tracking-widest uppercase text-muted-foreground mb-1">
                      Press & Partnerships
                    </p>
                    <a
                      href="mailto:press@maisonelite.com"
                      className="font-body text-sm text-foreground hover:text-primary transition-colors duration-200"
                    >
                      press@maisonelite.com
                    </a>
                  </div>
                </div>

                <div className="w-10 h-0.5 bg-primary/40" />

                <div>
                  <p className="font-display text-xs tracking-[0.25em] uppercase text-primary mb-4">
                    Opening Hours
                  </p>
                  <dl className="font-body text-sm text-muted-foreground space-y-2">
                    {[
                      ["Monday – Friday", "10:00 – 19:00"],
                      ["Saturday", "11:00 – 18:00"],
                      ["Sunday", "By appointment only"],
                    ].map(([day, hours]) => (
                      <div key={day} className="flex justify-between gap-8">
                        <dt className="text-foreground">{day}</dt>
                        <dd>{hours}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </Layout>
  );
}
