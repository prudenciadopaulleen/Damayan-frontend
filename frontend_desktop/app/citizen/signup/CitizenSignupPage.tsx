"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type SignupStep = "FORM" | "SUCCESS";

export default function CitizenSignupPage() {
  const router = useRouter();
  const [step, setStep] = useState<SignupStep>("FORM");
  const [selectedIdName, setSelectedIdName] = useState("No file selected");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStep("SUCCESS");
  }

  if (step === "SUCCESS") {
    return (
      <main className="auth-root citizen-auth">
        {/* Decorative blobs */}
        <div className="auth-blob auth-blob-1" />
        <div className="auth-blob auth-blob-2" />

        <aside className="auth-brand">
          <div className="auth-brand-inner">
            <div className="auth-logo">
              <div className="auth-logo-mark">D</div>
              <div>
                <span className="auth-logo-name">DAMAYAN</span>
                <p className="auth-logo-sub">Registration Success</p>
              </div>
            </div>

            <div className="auth-brand-copy">
              <h1 className="auth-headline">Welcome to the<br /><span className="auth-headline-accent">Network.</span></h1>
              <p className="auth-subline">
                Your account is being finalized. You can now access your citizen
                dashboard and secure your digital credentials.
              </p>
            </div>
          </div>
        </aside>

        <section className="auth-panel">
          <div className="auth-panel-inner" style={{ textAlign: "center" }}>
            <div className="success-icon-wrap" style={{ 
              backgroundColor: "#2e7d32", 
              width: "80px", 
              height: "80px", 
              borderRadius: "50%", 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center", 
              color: "#fff", 
              fontSize: "32px", 
              margin: "0 auto 32px",
              boxShadow: "0 12px 24px rgba(46, 125, 50, 0.25)"
            }}>✓</div>
            
            <h2 className="auth-form-title" style={{ marginBottom: "16px" }}>Registration Complete!</h2>
            <p className="auth-form-sub" style={{ marginBottom: "40px" }}>
              Your digital preparedness profile is active. Secure your QR ID below for rapid checkpoint entry.
            </p>
            
            <div className="qr-container" style={{ 
              margin: "0 auto 40px", 
              padding: "24px", 
              backgroundColor: "#fff", 
              borderRadius: "32px", 
              border: "1px solid rgba(0,0,0,0.06)", 
              display: "inline-block",
              boxShadow: "0 20px 48px rgba(0,0,0,0.04)"
            }}>
              <div style={{ width: "200px", height: "200px", backgroundColor: "#000", position: "relative", borderRadius: "12px", overflow: "hidden" }}>
                 <div style={{ position: "absolute", top: "12px", left: "12px", right: "12px", bottom: "12px", border: "12px solid #fff", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gridTemplateRows: "repeat(4, 1fr)", gap: "6px" }}>
                    {[...Array(16)].map((_, i) => <div key={i} style={{ backgroundColor: i % 3 === 0 ? "#fff" : "transparent" }} />)}
                 </div>
              </div>
              <p style={{ marginTop: "20px", fontWeight: "900", fontSize: "12px", letterSpacing: "3px", color: "#1a1c19" }}>IND-992-01-DM</p>
            </div>

            <div>
              <button 
                onClick={() => router.push("/citizen/beforecalamity")} 
                className="auth-submit"
                style={{ maxWidth: "320px", margin: "0 auto" }}
              >
                Enter Citizen Dashboard
              </button>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="auth-root citizen-auth">
      {/* Decorative blobs */}
      <div className="auth-blob auth-blob-1" />
      <div className="auth-blob auth-blob-2" />

      <aside className="auth-brand">
        <div className="auth-brand-inner">
          <div className="auth-logo">
            <div className="auth-logo-mark">D</div>
            <div>
              <span className="auth-logo-name">DAMAYAN</span>
              <p className="auth-logo-sub">Citizen Registration</p>
            </div>
          </div>

          <div className="auth-brand-copy">
            <p className="auth-eyebrow">Join the Network</p>
            <h1 className="auth-headline">Create Your<br /><span className="auth-headline-accent">Citizen Account.</span></h1>
            <p className="auth-subline">
              Register for the citizen portal to receive real-time alerts, access your digital relief ID, and report incidents directly.
            </p>
          </div>
        </div>
      </aside>

      <section className="auth-panel">
        <div className="auth-panel-inner">
          <div className="auth-mobile-logo">
            <div className="auth-logo-mark">D</div>
            <span className="auth-logo-name" style={{ color: "#2E7D32" }}>DAMAYAN</span>
          </div>

          <header className="auth-form-head">
            <span className="auth-badge">Sign Up</span>
            <h2 className="auth-form-title">Secure Registration</h2>
            <p className="auth-form-sub">Complete the form to activate your digital preparedness profile.</p>
          </header>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="auth-field">
              <label>Full Name</label>
              <input type="text" placeholder="Juan Dela Cruz" required />
            </div>

            <div className="auth-field">
              <label>Username</label>
              <input type="text" placeholder="juan.delacruz" required />
            </div>

            <div className="auth-field">
              <label>Password</label>
              <input type="password" placeholder="Create a strong password" required />
            </div>

            <div className="auth-field">
              <label>Government ID (Recommended)</label>
              <div className="auth-input-wrap" style={{ cursor: "pointer" }}>
                <input
                  id="citizen-id"
                  type="file"
                  accept=".jpg,.jpeg,.png"
                  style={{ 
                    position: "absolute",
                    inset: 0,
                    opacity: 0,
                    cursor: "pointer",
                    zIndex: 2
                  }}
                  onChange={(e) => setSelectedIdName(e.target.files?.[0]?.name ?? "No file selected")}
                />
                <div 
                  className="auth-upload-backdrop" 
                  style={{ 
                    width: "100%",
                    padding: "24px",
                    borderRadius: "16px",
                    border: "2px dashed var(--auth-line)",
                    textAlign: "center",
                    backgroundColor: "rgba(0,0,0,0.01)",
                    transition: "all 0.2s ease"
                  }}
                >
                  <span style={{ fontSize: "2rem", display: "block", marginBottom: "8px" }}>📄</span>
                  <strong style={{ display: "block", fontSize: "0.95rem", color: "var(--auth-accent)" }}>
                    {selectedIdName === "No file selected" ? "Click to upload ID photo" : "ID Uploaded"}
                  </strong>
                  <span style={{ fontSize: "0.8rem", color: "var(--auth-muted)" }}>
                    {selectedIdName === "No file selected" ? "JPG or PNG • Max 5MB" : selectedIdName}
                  </span>
                </div>
              </div>
            </div>

            <button className="auth-submit" type="submit">Complete Registration</button>
          </form>

          <p className="auth-switch-copy" style={{ marginTop: "32px", textAlign: "center" }}>
            Already have an account? <Link href="/citizen/login">Log in here</Link>
          </p>
        </div>
      </section>
    </main>
  );
}
