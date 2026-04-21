"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SiteManagerLoginPage() {
  const router = useRouter();
  const [showPass, setShowPass] = useState(false);

  function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    router.push("/beforecalamity");
  }

  return (
    <main className="auth-root sm-auth">
      <div className="auth-blob auth-blob-1" />
      <div className="auth-blob auth-blob-2" />

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
            <p className="auth-eyebrow">Operations Command</p>
            <h1 className="auth-headline">
              Manage Sites.<br />
              Coordinate Relief.<br />
              <span className="auth-headline-accent">Keep Response Moving.</span>
            </h1>
            <p className="auth-subline">
              Access shelter readiness, evacuee intake, local distribution logs,
              and on-site response coordination from one operations dashboard.
            </p>
          </div>
        </div>
      </aside>

      <section className="auth-panel">
        <div className="auth-panel-inner">
          <div className="auth-mobile-logo">
            <div className="auth-logo-mark">D</div>
            <span className="auth-logo-name" style={{ color: "#1b5e20" }}>
              DAMAYAN
            </span>
          </div>

          <header className="auth-form-head">
            <span className="auth-badge">Site Manager Login</span>
            <h2 className="auth-form-title">Welcome back</h2>
            <p className="auth-form-sub">
              Sign in to access your site operations dashboard.
            </p>
          </header>

          <div className="auth-switch-bar">
            <span>Need another portal?</span>
            <Link href="/login">Open role selector →</Link>
          </div>

          <form className="auth-form" onSubmit={handleLogin}>
            <div className="auth-field">
              <label htmlFor="site-manager-username">Username</label>
              <input
                id="site-manager-username"
                name="site-manager-username"
                type="text"
                placeholder="e.g. manager.username"
                autoComplete="username"
              />
            </div>

            <div className="auth-field">
              <div className="auth-field-row">
                <label htmlFor="site-manager-password">Password</label>
                <Link href="/site-manager/forgot-password" className="auth-forgot-link">
                  Forgot password?
                </Link>
              </div>
              <div className="auth-input-wrap">
                <input
                  id="site-manager-password"
                  name="site-manager-password"
                  type={showPass ? "text" : "password"}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="auth-toggle-pass"
                  onClick={() => setShowPass((value) => !value)}
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
            <Link href="/site-manager/signup">Create one here</Link>
          </p>
        </div>
      </section>
    </main>
  );
}
