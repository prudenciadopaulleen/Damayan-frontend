"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SiteManagerLogInPage() {
  const router = useRouter();
  const [showPass, setShowPass] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    router.push("/site-manager/beforecalamity");
  }

  return (
    <main className="auth-root sm-auth">
      <div className="auth-blob auth-blob-1" />
      <div className="auth-blob auth-blob-2" />

      {/* Brand Panel */}
      <aside className="auth-brand">
        <div className="auth-brand-inner">
          <div className="auth-logo">
            <div className="auth-logo-mark">D</div>
            <div>
              <span className="auth-logo-name">DAMAYAN</span>
              <p className="auth-logo-sub">Site Manager Portal</p>
            </div>
          </div>

          <div className="auth-brand-copy">
            <p className="auth-eyebrow">Site Operations Command</p>
            <h1 className="auth-headline">
              Manage Every<br />Relief Site.<br />
              <span className="auth-headline-accent">All in One View.</span>
            </h1>
            <p className="auth-subline">
              Oversee shelter capacity, supply levels, evacuee check-in, and
              team coordination from a single operations portal.
            </p>
          </div>

        </div>
      </aside>

      {/* Form Panel */}
      <section className="auth-panel">
        <div className="auth-panel-inner">
          <div className="auth-mobile-logo">
            <div className="auth-logo-mark">D</div>
            <span className="auth-logo-name" style={{ color: "#1b5e20" }}>DAMAYAN</span>
          </div>

          <header className="auth-form-head">
            <span className="auth-badge" style={{ background: "rgba(27,94,32,0.1)", color: "#1b5e20" }}>
              Site Manager Login
            </span>
            <h2 className="auth-form-title">Welcome back,<br />Manager</h2>
            <p className="auth-form-sub">Sign in to access the site operations dashboard.</p>
          </header>

          <div className="auth-switch-bar">
            <span>Need a different portal?</span>
            <Link href="/loginportal">Open role selector →</Link>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="auth-field">
              <label htmlFor="sm-username">Username</label>
              <input
                id="sm-username"
                name="sm-username"
                type="text"
                placeholder="Enter your site manager username"
                autoComplete="username"
              />
            </div>

            <div className="auth-field">
              <div className="auth-field-row">
                <label htmlFor="sm-password">Password</label>
                <Link href="/site-manager/forgot-password" className="auth-forgot-link">
                  Forgot password?
                </Link>
              </div>
              <div className="auth-input-wrap">
                <input
                  id="sm-password"
                  name="sm-password"
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
              Sign In to Site Manager Dashboard
            </button>
          </form>

          <p className="auth-switch-copy">
            Don&apos;t have an account?{" "}
            <Link href="/site-manager/signup" style={{ color: "#1b5e20" }}>Sign up here</Link>
          </p>
        </div>
      </section>
    </main>
  );
}
