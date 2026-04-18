"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SiteManagerSignupPage() {
  const router = useRouter();
  const [selectedIdName, setSelectedIdName] = useState("No file selected");

  function handleRegister(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    router.push("/site-manager/login");
  }

  return (
    <main className="auth-root sm-auth">
      {/* Decorative blobs */}
      <div className="auth-blob auth-blob-1" />
      <div className="auth-blob auth-blob-2" />

      <aside className="auth-brand">
        <div className="auth-brand-inner" style={{ gap: "48px" }}>
          <div className="auth-logo">
            <div className="auth-logo-mark" style={{ background: "#1b5e20" }}>D</div>
            <div>
              <span className="auth-logo-name">DAMAYAN</span>
              <p className="auth-logo-sub">Site Manager Portal</p>
            </div>
          </div>

          <div className="auth-brand-copy">
            <p className="auth-eyebrow">Operations Command</p>
            <h1 className="auth-headline">Scale Your<br /><span className="auth-headline-accent" style={{ color: "#ffffff" }}>Response Power.</span></h1>
            <p className="auth-subline">
              Register for the site manager portal to validate your credentials, manage supply logs, and access the rescue network overview.
            </p>
          </div>
        </div>
      </aside>

      <section className="auth-panel">
        <div className="auth-panel-inner">
          <div className="auth-mobile-logo">
            <div className="auth-logo-mark" style={{ background: "#1b5e20" }}>D</div>
            <span className="auth-logo-name" style={{ color: "#1b5e20" }}>DAMAYAN</span>
          </div>

          <header className="auth-form-head">
            <span className="auth-badge" style={{ background: "rgba(27,94,32,0.1)", color: "#1b5e20" }}>Registration</span>
            <h2 className="auth-form-title">Manager Account</h2>
            <p className="auth-form-sub">Complete this form to activate your site operations dashboard.</p>
          </header>

          <form className="auth-form" onSubmit={handleRegister}>
            <div className="auth-field">
              <label>Full Name</label>
              <input type="text" placeholder="Site Manager Full Name" required />
            </div>

            <div className="auth-field">
              <label>Username</label>
              <input type="text" placeholder="manager.username" required />
            </div>

            <div className="auth-field">
              <label>Password</label>
              <input type="password" placeholder="Create a secure password" required />
            </div>

            <div className="auth-field">
              <label>Government ID (Required for Verification)</label>
              <div className="auth-input-wrap" style={{ cursor: "pointer" }}>
                <input
                  id="signup-id"
                  type="file"
                  accept=".jpg,.jpeg,.png"
                  required
                  style={{ 
                    position: "absolute",
                    inset: 0,
                    opacity: 0,
                    cursor: "pointer",
                    zIndex: 2
                  }}
                  onChange={(event) =>
                    setSelectedIdName(
                      event.target.files?.[0]?.name ?? "No file selected"
                    )
                  }
                />
                <div 
                  className="auth-upload-backdrop" 
                  style={{ 
                    width: "100%",
                    padding: "24px",
                    borderRadius: "16px",
                    border: "2px dashed rgba(27,94,32,0.2)",
                    textAlign: "center",
                    backgroundColor: "rgba(27,94,32,0.01)",
                    transition: "all 0.2s ease"
                  }}
                >
                  <span style={{ fontSize: "2rem", display: "block", marginBottom: "8px" }}>📄</span>
                  <strong style={{ display: "block", fontSize: "0.95rem", color: "#1b5e20" }}>
                    {selectedIdName === "No file selected" ? "Upload Official ID" : "ID Cached"}
                  </strong>
                  <span style={{ fontSize: "0.8rem", color: "var(--auth-muted)" }}>
                    {selectedIdName === "No file selected" ? "JPG or PNG • Max 5MB" : selectedIdName}
                  </span>
                </div>
              </div>
            </div>

            <button className="auth-submit" type="submit" style={{ background: "#1b5e20" }}>
              Submit Registration
            </button>
          </form>

          <p className="auth-switch-copy" style={{ marginTop: "32px", textAlign: "center" }}>
            Already have an account? <Link href="/site-manager/login" style={{ color: "#1b5e20" }}>Log in here</Link>
          </p>
        </div>
      </section>
    </main>
  );
}
