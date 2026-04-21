"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CitizenAuthPage() {
  const router = useRouter();
  const [showPass, setShowPass] = useState(false);

  function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    router.push("/citizen/beforecalamity");
  }

  return (
    <main className="auth-root citizen-auth">
      {/* Decorative blobs */}
      <div className="auth-blob auth-blob-1" />
      <div className="auth-blob auth-blob-2" />

      {/* Brand Panel */}
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
            <p className="auth-eyebrow">Community Emergency Access</p>
            <h1 className="auth-headline">Stay Ready.<br />Stay Safe.<br />
              <span className="auth-headline-accent">Stay Connected.</span>
            </h1>
            <p className="auth-subline">
              Access real-time alerts, your QR ID, evacuation routes, and
              relief aid updates — all in one place.
            </p>
          </div>

        </div>
      </aside>

      {/* Form Panel */}
      <section className="auth-panel">
        <div className="auth-panel-inner">
          <div className="auth-mobile-logo">
            <div className="auth-logo-mark">D</div>
            <span className="auth-logo-name" style={{ color: "#2e7d32" }}>DAMAYAN</span>
          </div>

          <header className="auth-form-head">
            <span className="auth-badge">Citizen Login</span>
            <h2 className="auth-form-title">Welcome back</h2>
            <p className="auth-form-sub">Sign in to access your citizen dashboard.</p>
          </header>

          <div className="auth-switch-bar">
            <span>Need a staff portal?</span>
            <Link href="/loginportal">Open role selector →</Link>
          </div>

          <form className="auth-form" onSubmit={handleLogin}>
            <div className="auth-field">
              <label htmlFor="citizen-username">Username</label>
              <input
                id="citizen-username"
                name="citizen-username"
                type="text"
                placeholder="e.g. juan.delacruz"
                autoComplete="username"
              />
            </div>

            <div className="auth-field">
              <div className="auth-field-row">
                <label htmlFor="citizen-password">Password</label>
                <Link href="/citizen/forgot-password" className="auth-forgot-link">
                  Forgot password?
                </Link>
              </div>
              <div className="auth-input-wrap">
                <input
                  id="citizen-password"
                  name="citizen-password"
                  type={showPass ? "text" : "password"}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="auth-toggle-pass"
                  onClick={() => setShowPass((v) => !v)}
                  aria-label="Toggle password visibility"
                >
                  {showPass ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <button className="auth-submit" type="submit">
              Sign In to Citizen Dashboard
            </button>
          </form>

          <p className="auth-switch-copy">
            Don&apos;t have an account?{" "}
            <Link href="/citizen/signup">Create one here</Link>
          </p>
        </div>
      </section>
    </main>
  );
}
