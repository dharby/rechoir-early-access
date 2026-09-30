import { useId, useState, type FormEvent } from "react";
import { CheckCircle2, Loader2, Mail, TriangleAlert } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "done"; alreadySubscribed: boolean }
  | { kind: "error"; message: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function NewsletterSection() {
  const uid = useId();
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const fieldId = `${uid}-email`;
  const errorId = `${uid}-error`;

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status.kind === "submitting") return;

    const trimmed = email.trim();
    if (!EMAIL_RE.test(trimmed)) {
      setLocalError("Please enter a valid email address.");
      setStatus({ kind: "idle" });
      return;
    }

    setLocalError(null);
    setStatus({ kind: "submitting" });

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed, company }),
      });

      const data: unknown = await res.json().catch(() => null);
      const ok =
        data !== null &&
        typeof data === "object" &&
        (data as { ok?: unknown }).ok === true;
      const already =
        data !== null &&
        typeof data === "object" &&
        (data as { alreadySubscribed?: unknown }).alreadySubscribed === true;

      if (res.ok && ok) {
        setStatus({ kind: "done", alreadySubscribed: already });
        setEmail("");
        return;
      }

      const message =
        data !== null &&
        typeof data === "object" &&
        typeof (data as { error?: unknown }).error === "string"
          ? (data as { error: string }).error
          : "Something went wrong. Please try again.";

      setStatus({ kind: "error", message });
    } catch {
      // Network failure or blocked request.
      setStatus({
        kind: "error",
        message: "We could not reach the server. Please check your connection and try again.",
      });
    }
  };

  const invalid = Boolean(localError);
  const message =
    status.kind === "error"
      ? status.message
      : localError ??
        (status.kind === "done"
          ? status.alreadySubscribed
            ? "That address is already on the list — nothing more to do."
            : "Almost there — check your inbox and confirm your subscription."
          : null);

  const tone =
    status.kind === "done"
      ? "text-[hsl(var(--landing-accent))]"
      : status.kind === "error"
        ? "text-rose-300"
        : "";

  return (
    <section className="border-t border-[hsl(var(--landing-border))] py-20 sm:py-24">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Stay in the loop</p>
            <h2 className="section-heading mt-5">Subscribe to the newsletter</h2>
            <p className="section-sub">
              Occasional updates on Early Access, new features and what we are
              building next. No noise, and you can unsubscribe from any email.
            </p>

            <form onSubmit={onSubmit} noValidate className="relative mx-auto mt-9 max-w-md">
              <label htmlFor={fieldId} className="sr-only">
                Email address
              </label>
              <div className="flex flex-col gap-2.5 sm:flex-row">
                <div className="relative flex-1">
                  <Mail
                    className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[hsl(var(--landing-muted))]"
                    aria-hidden="true"
                  />
                  <input
                    id={fieldId}
                    name="email"
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (localError) setLocalError(null);
                      if (status.kind === "error" || status.kind === "done") {
                        setStatus({ kind: "idle" });
                      }
                    }}
                    disabled={status.kind === "submitting"}
                    aria-invalid={invalid}
                    aria-describedby={message ? errorId : undefined}
                    className={cn("input pl-10", invalid && "input-error")}
                  />
                </div>
                <button
                  type="submit"
                  disabled={status.kind === "submitting"}
                  className="btn-primary sm:w-auto disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status.kind === "submitting" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                      Subscribing
                    </>
                  ) : (
                    "Subscribe"
                  )}
                </button>
              </div>

              {/* Honeypot: hidden from people, tempting to bots. */}
              <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden">
                <label htmlFor={`${uid}-company`}>Company</label>
                <input
                  id={`${uid}-company`}
                  name="company"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
              </div>

              <p
                id={errorId}
                role="status"
                aria-live="polite"
                className={cn("mt-3 flex min-h-[1.25rem] items-start justify-center gap-2 text-sm", tone)}
              >
                {status.kind === "done" ? (
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                ) : status.kind === "error" ? (
                  <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                ) : null}
                {message ? <span>{message}</span> : null}
              </p>

              <p className="mt-1 text-xs text-[hsl(var(--landing-muted))]">
                We use your address for ReChoir updates only.
              </p>
            </form>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
