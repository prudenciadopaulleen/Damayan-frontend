"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type ForgotStep = "request" | "sent" | "create";

export default function CitizenForgotPasswordPage() {
  const router = useRouter();
  const [step, setStep] = useState<ForgotStep>("request");
  const [contact, setContact] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const steps: ForgotStep[] = ["request", "sent", "create"];

  function renderStep() {
    if (step === "request") {
      return (
        <>
          <header className="auth-form-head">
            <span className="auth-badge">Password Reset</span>
            <h2 className="auth-form-title">Forgot your<br />password?</h2>
            <p className="auth-form-sub">
              Enter your registered email or phone number. We'll send you a
              secure reset link right away.
            </p>
          </header>

          <form
            className="auth-form"
            onSubmit={(e) => {
              e.preventDefault();
              setStep("sent");
            }}
          >
            <div className="auth-field">
              <label htmlFor="fp-contact">Email or Phone Number</label>
              <input
                id="fp-contact"
                type="text"
                placeholder="e.g. juan@email.com or 09171234567"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                required
              />
            </div>

            <div className="auth-info-box">
              💡 We'll send a reset link to your registered email address or an
              SMS to your phone number — whichever you used when you signed up.
            </div>

            <button className="auth-submit" type="submit">
              Send Reset Link
            </button>
          </form>

          <Link href="/citizen/login" className="auth-back-link">
            ← Back to Sign In
          </Link>
        </>
      );
    }

    if (step === "sent") {
      return (
        <>
          <div className="auth-success-icon">📨</div>
          <header className="auth-form-head" style={{ textAlign: "center" }}>
            <span className="auth-badge">Link Sent</span>
            <h2 className="auth-form-title">Check your<br />inbox</h2>
            <p className="auth-form-sub">
              We sent a password reset link to <strong>{contact || "your registered contact"}</strong>.
              Check your email or SMS messages.
            </p>
          </header>

          <div className="auth-info-box">
            📱 The link expires in <strong>15 minutes</strong>. If you don't see it,
            check your spam folder or request a new link below.
          </div>

          <button
            className="auth-submit"
            type="button"
            onClick={() => setStep("create")}
          >
            I Received the Link — Continue
          </button>

          <button
            type="button"
            onClick={() => setStep("request")}
            className="auth-back-link"
            style={{ background: "none", border: "none", cursor: "pointer", font: "inherit" }}
          >
            ← Resend to a Different Contact
          </button>
        </>
      );
    }

    // Step 3: Create new password
    return (
      <>
        <header className="auth-form-head">
          <span className="auth-badge">New Password</span>
          <h2 className="auth-form-title">Create a new<br />password</h2>
          <p className="auth-form-sub">
            Choose a strong password. It should be at least 8 characters long.
          </p>
        </header>

        <form
          className="auth-form"
          onSubmit={(e) => {
            e.preventDefault();
            router.push("/citizen/login");
          }}
        >
          <div className="auth-field">
            <label htmlFor="fp-new-pass">New Password</label>
            <div className="auth-input-wrap">
              <input
                id="fp-new-pass"
                type={showPass ? "text" : "password"}
                placeholder="At least 8 characters"
                required
              />
              <button
                type="button"
                className="auth-toggle-pass"
                onClick={() => setShowPass((v) => !v)}
              >
                {showPass ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div className="auth-field">
            <label htmlFor="fp-confirm-pass">Confirm New Password</label>
            <div className="auth-input-wrap">
              <input
                id="fp-confirm-pass"
                type={showConfirm ? "text" : "password"}
                placeholder="Re-enter your new password"
                required
              />
              <button
                type="button"
                className="auth-toggle-pass"
                onClick={() => setShowConfirm((v) => !v)}
              >
                {showConfirm ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button className="auth-submit" type="submit">
            Save New Password
          </button>
        </form>

        <Link href="/citizen/login" className="auth-back-link">
          ← Back to Sign In
        </Link>
      </>
    );
  }

  return (
    <main className="auth-root citizen-auth">
      <div className="auth-blob auth-blob-1" />
      <div className="auth-blob auth-blob-2" />

      <aside className="auth-brand">
        <div className="auth-brand-inner">
          <div className="auth-logo">
            <div className="auth-logo-mark">D</div>
            <div>
              <span className="auth-logo-name">DAMAYAN</span>
              <p className="auth-logo-sub">Affected Citizen Portal</p>
            </div>
          </div>

          <div className="auth-brand-copy">
            <p className="auth-eyebrow">Account Recovery</p>
            <h1 className="auth-headline">
              Reset.<br />Recover.<br />
              <span className="auth-headline-accent">Re-enter.</span>
            </h1>
            <p className="auth-subline">
              Regain access to your emergency dashboard in just three quick
              steps — no waiting, no hassle.
            </p>
          </div>

          <div className="auth-steps-timeline">
            {[
              { n: 1, label: "Request Reset Link", active: step === "request", done: step !== "request" },
              { n: 2, label: "Receive via Email / SMS", active: step === "sent", done: step === "create" },
              { n: 3, label: "Create New Password", active: step === "create", done: false },
            ].map((s) => (
              <div key={s.n} className={`auth-timeline-item${s.active ? " is-active" : ""}${s.done ? " is-done" : ""}`}>
                <div className="auth-timeline-node">{s.done ? "✓" : s.n}</div>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </aside>

      <section className="auth-panel">
        <div className="auth-panel-inner">
          <div className="auth-mobile-logo">
            <div className="auth-logo-mark">D</div>
            <span className="auth-logo-name" style={{ color: "#2e7d32" }}>DAMAYAN</span>
          </div>

          {/* Step indicator dots */}
          <div className="auth-step-indicator">
            {steps.map((s) => (
              <div
                key={s}
                className={`auth-step-dot${step === s ? " is-active" : ""}${steps.indexOf(s) < steps.indexOf(step) ? " is-done" : ""}`}
              />
            ))}
          </div>

          {renderStep()}
        </div>
      </section>
    </main>
  );
}
