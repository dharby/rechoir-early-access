import { useId, useState, type FormEvent } from "react";
import { CheckCircle2, Info, Send } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";
import { APPLICATIONS_OPEN, BETA_TRIAL_DAYS, CONTACT_EMAIL, LAUNCH_PRICE_LABEL } from "@/lib/site-config";
import { cn } from "@/lib/utils";

interface FormValues {
  name: string;
  choir: string;
  role: string;
  size: string;
  email: string;
  pricingInterest: PricingInterest | "";
  goals: string;
}

type Errors = Partial<Record<keyof FormValues, string>>;

/** Early Access applications are open to choir team leads. */
const ROLES = ["Team Lead"] as const;

const SIZES = ["Under 15", "15–29", "30–49", "50–79", "80+"];

/** Response to the planned-price question, used to gauge demand. */
const PRICING_OPTIONS = [
  { value: "yes", label: "Yes", hint: "We would subscribe" },
  { value: "maybe", label: "Maybe", hint: "Depends on the final price" },
  { value: "no", label: "No", hint: "Unlikely at that price" },
] as const;

type PricingInterest = (typeof PRICING_OPTIONS)[number]["value"];

const PRICING_LABEL: Record<PricingInterest, string> = {
  yes: "Yes",
  maybe: "Maybe",
  no: "No",
};

const EMPTY: FormValues = {
  name: "",
  choir: "",
  role: ROLES[0],
  size: SIZES[1],
  email: "",
  pricingInterest: "",
  goals: "",
};

/** Deliberately permissive: catches typos without rejecting valid addresses. */
function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
}

function validate(values: FormValues): Errors {
  const errors: Errors = {};
  if (!values.name.trim()) errors.name = "Please tell us your name.";
  if (!values.choir.trim()) errors.choir = "Please tell us the name of your choir.";
  if (!isValidEmail(values.email)) errors.email = "Please enter a valid email address.";
  if (!values.pricingInterest) {
    errors.pricingInterest = "Let us know if 5,000 Naira a month would work for your choir.";
  }
  if (values.goals.trim().length < 10) {
    errors.goals = "A sentence or two about what you want to fix helps us review this properly.";
  }
  return errors;
}

export function ApplySection() {
  const uid = useId();
  const [values, setValues] = useState<FormValues>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState(false);
  /** True once we've handed the draft to the visitor's mail client. */
  const [opened, setOpened] = useState(false);

  const field = (name: keyof FormValues) => `${uid}-${name}`;

  const set = (name: keyof FormValues) => (value: string) => {
    setValues((prev) => {
      const next = { ...prev, [name]: value };
      if (touched) setErrors(validate(next));
      return next;
    });
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTouched(true);
    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (!APPLICATIONS_OPEN) return;
    if (Object.keys(nextErrors).length > 0) {
      setOpened(false);
      return;
    }

    // No backend: hand the completed application to the visitor's mail client.
    const body = [
      "ReChoir Early Access application",
      "",
      `Name:        ${values.name.trim()}`,
      `Choir:       ${values.choir.trim()}`,
      `Role:        ${values.role}`,
      `Choir size:  ${values.size} members`,
      `Email:       ${values.email.trim()}`,
      `At ${LAUNCH_PRICE_LABEL} Naira/month: ${PRICING_LABEL[values.pricingInterest as PricingInterest]}`,
      "",
      "What ReChoir would fix for me:",
      values.goals.trim(),
    ].join("\n");

    const href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      "ReChoir Early Access application",
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = href;
    setOpened(true);
  };

  const errorCount = Object.keys(errors).length;

  return (
    <section
      id="apply"
      className="scroll-mt-20 border-t border-[hsl(var(--landing-border))] bg-glow py-20 sm:py-24 lg:py-28"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-16">
          <Reveal>
            <SectionHead
              eyebrow="Early Access"
              title="Apply for your choir"
              sub="We read every request by hand, so a short note is far more useful to us than a long one. Early Access is for choir team leads."
            />

            <ul className="mt-8 space-y-3 text-sm text-[hsl(var(--landing-muted))]">
              {[
                `Free beta access for ${BETA_TRIAL_DAYS} days, no card needed`,
                "No card or payment details at any point",
                "You tell us directly what to build next",
              ].map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[hsl(var(--landing-accent))]"
                  />
                  {point}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={80}>
            <div className="rounded-2xl border border-[hsl(var(--landing-border))] bg-[hsl(var(--landing-surface))] p-6 sm:p-8">
              {/* The core Early Access promise, stated before anything else. */}
              <div className="mb-6 rounded-xl border border-[hsl(var(--landing-accent)/0.35)] bg-[hsl(var(--landing-accent)/0.08)] p-4">
                <p className="text-sm font-semibold text-[hsl(var(--landing-fg))]">
                  Early Access members test the beta free for {BETA_TRIAL_DAYS} days.
                </p>
                <p className="mt-1 text-sm leading-relaxed text-[hsl(var(--landing-muted))]">
                  Full access to the beta for {BETA_TRIAL_DAYS} days before ReChoir
                  goes live — no card, no payment, and nothing to cancel afterwards.
                </p>
              </div>

              <form onSubmit={onSubmit} noValidate>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="sm:col-span-1">
                    <label htmlFor={field("name")} className="label">
                      Your name
                    </label>
                    <input
                      id={field("name")}
                      name="name"
                      type="text"
                      autoComplete="name"
                      maxLength={80}
                      value={values.name}
                      onChange={(e) => set("name")(e.target.value)}
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? `${field("name")}-err` : undefined}
                      className={cn("input", errors.name && "input-error")}
                      placeholder="Amina Owusu"
                    />
                    {errors.name && (
                      <p id={`${field("name")}-err`} className="field-error">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div className="sm:col-span-1">
                    <label htmlFor={field("choir")} className="label">
                      Choir name
                    </label>
                    <input
                      id={field("choir")}
                      name="choir"
                      type="text"
                      autoComplete="organization"
                      maxLength={120}
                      value={values.choir}
                      onChange={(e) => set("choir")(e.target.value)}
                      aria-invalid={Boolean(errors.choir)}
                      aria-describedby={errors.choir ? `${field("choir")}-err` : undefined}
                      className={cn("input", errors.choir && "input-error")}
                      placeholder="Grace Community Choir"
                    />
                    {errors.choir && (
                      <p id={`${field("choir")}-err`} className="field-error">
                        {errors.choir}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor={field("role")} className="label">
                      Your role
                    </label>
                    <select
                      id={field("role")}
                      name="role"
                      value={values.role}
                      onChange={(e) => set("role")(e.target.value)}
                      className="input"
                    >
                      {ROLES.map((r) => (
                        <option key={r} value={r} className="bg-[hsl(var(--landing-surface))]">
                          {r}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor={field("size")} className="label">
                      Choir size
                    </label>
                    <select
                      id={field("size")}
                      name="size"
                      value={values.size}
                      onChange={(e) => set("size")(e.target.value)}
                      className="input"
                    >
                      {SIZES.map((s) => (
                        <option key={s} value={s} className="bg-[hsl(var(--landing-surface))]">
                          {s} members
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor={field("email")} className="label">
                      Email address
                    </label>
                    <input
                      id={field("email")}
                      name="email"
                      type="email"
                      autoComplete="email"
                      maxLength={200}
                      value={values.email}
                      onChange={(e) => set("email")(e.target.value)}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? `${field("email")}-err` : undefined}
                      className={cn("input", errors.email && "input-error")}
                      placeholder="you@example.com"
                    />
                    {errors.email && (
                      <p id={`${field("email")}-err`} className="field-error">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <fieldset className="sm:col-span-2">
                    <legend className="label">
                      If ReChoir launches at {LAUNCH_PRICE_LABEL} Naira per month,
                      would your choir consider subscribing?
                    </legend>
                    <div
                      className="mt-1 grid gap-2.5 sm:grid-cols-3"
                      role="radiogroup"
                      aria-invalid={Boolean(errors.pricingInterest)}
                      aria-describedby={errors.pricingInterest ? `${field("pricingInterest")}-err` : undefined}
                    >
                      {PRICING_OPTIONS.map((opt) => {
                        const checked = values.pricingInterest === opt.value;
                        return (
                          <label
                            key={opt.value}
                            className={cn(
                              "flex min-h-[44px] cursor-pointer items-center gap-3 rounded-xl border px-3.5 py-2.5 transition-colors",
                              checked
                                ? "border-[hsl(var(--landing-accent))] bg-[hsl(var(--landing-accent)/0.1)]"
                                : "border-[hsl(var(--landing-border))] hover:border-[hsl(var(--landing-accent)/0.45)]",
                            )}
                          >
                            <input
                              type="radio"
                              name="pricingInterest"
                              value={opt.value}
                              checked={checked}
                              onChange={(e) => set("pricingInterest")(e.target.value)}
                              className="h-4 w-4 shrink-0 accent-[hsl(var(--landing-accent))]"
                            />
                            <span className="flex flex-col leading-tight">
                              <span className="text-sm font-medium text-[hsl(var(--landing-fg))]">
                                {opt.label}
                              </span>
                              <span className="text-xs text-[hsl(var(--landing-muted))]">
                                {opt.hint}
                              </span>
                            </span>
                          </label>
                        );
                      })}
                    </div>
                    {errors.pricingInterest && (
                      <p id={`${field("pricingInterest")}-err`} className="field-error">
                        {errors.pricingInterest}
                      </p>
                    )}
                  </fieldset>

                  <div className="sm:col-span-2">
                    <label htmlFor={field("goals")} className="label">
                      What would ReChoir fix for you?
                    </label>
                    <textarea
                      id={field("goals")}
                      name="goals"
                      rows={4}
                      maxLength={1500}
                      value={values.goals}
                      onChange={(e) => set("goals")(e.target.value)}
                      aria-invalid={Boolean(errors.goals)}
                      aria-describedby={errors.goals ? `${field("goals")}-err` : undefined}
                      className={cn("input resize-y", errors.goals && "input-error")}
                      placeholder="Right now we track attendance in a spreadsheet and prayer requests in a private group chat…"
                    />
                    {errors.goals && (
                      <p id={`${field("goals")}-err`} className="field-error">
                        {errors.goals}
                      </p>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!APPLICATIONS_OPEN}
                  aria-disabled={!APPLICATIONS_OPEN}
                  className="btn-primary mt-6 w-full disabled:cursor-not-allowed disabled:opacity-55"
                >
                  {APPLICATIONS_OPEN ? "Send application" : "Applications closed"}
                  <Send className="h-4 w-4" aria-hidden="true" />
                </button>

                <p
                  role="status"
                  aria-live="polite"
                  className={cn(
                    "mt-4 flex items-start gap-2.5 text-sm leading-relaxed",
                    opened ? "text-[hsl(var(--landing-accent))]" : "text-[hsl(var(--landing-muted))]",
                  )}
                >
                  {opened ? (
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                  ) : (
                    <Info className="mt-0.5 h-4 w-4 shrink-0 text-[hsl(var(--landing-accent))]" aria-hidden="true" />
                  )}
                  {opened ? (
                    <>
                      Your email app should now be open with the application filled in.
                      Press send there and we&apos;ll reply within a few days.
                    </>
                  ) : !APPLICATIONS_OPEN ? (
                    <>Applications are not open at the moment. You can still explore every screen on this page.</>
                  ) : touched && errorCount > 0 ? (
                    <>Fix the {errorCount === 1 ? "field" : `${errorCount} fields`} above to continue.</>
                  ) : (
                    <>
                      Submitting opens your email app with the form already filled in —
                      you review and send it from there. No account needed, and nothing is
                      stored on this website.
                    </>
                  )}
                </p>
              </form>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
