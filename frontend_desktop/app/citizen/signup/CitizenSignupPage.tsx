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
      <main className="citizen-signup-web-page">
        <section className="citizen-signup-web-layout">
          <aside className="citizen-signup-web-brand">
            <div className="citizen-signup-web-brand-head">
              <div className="citizen-signup-web-mark">D</div>
              <div>
                <span className="citizen-signup-web-name">DAMAYAN</span>
                <p className="citizen-signup-web-kicker">Registration Success</p>
              </div>
            </div>
          </aside>
          <section className="citizen-signup-web-panel" style={{ alignItems: "center", justifyContent: "center" }}>
            <div style={{ textAlign: "center", maxWidth: "400px" }}>
              <div style={{ backgroundColor: "#0d631b", width: "64px", height: "64px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "24px", margin: "0 auto 24px" }}>✓</div>
              <h2 style={{ fontSize: "28px", fontWeight: "900" }}>Registration Complete!</h2>
              <p style={{ color: "#586054", marginTop: "12px" }}>Download your Citizen QR ID below. You will need this for shelter entry and relief distribution.</p>
              
              <div className="qr-container" style={{ margin: "32px 0", padding: "24px", backgroundColor: "#fff", borderRadius: "24px", border: "1px solid #eef1ed", display: "inline-block" }}>
                <div style={{ width: "200px", height: "200px", backgroundColor: "#000", position: "relative" }}>
                   {/* Mock QR */}
                   <div style={{ position: "absolute", top: "10px", left: "10px", right: "10px", bottom: "10px", border: "10px solid #fff", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gridTemplateRows: "repeat(4, 1fr)", gap: "5px" }}>
                      {[...Array(16)].map((_, i) => <div key={i} style={{ backgroundColor: i % 3 === 0 ? "#fff" : "transparent" }} />)}
                   </div>
                </div>
                <p style={{ marginTop: "16px", fontWeight: "800", fontSize: "12px", letterSpacing: "2px" }}>IND-992-01</p>
              </div>

              <button onClick={() => router.push("/citizen/beforecalamity")} className="citizen-signup-web-primary">Open Portal</button>
            </div>
          </section>
        </section>
      </main>
    );
  }

  return (
    <main className="citizen-signup-web-page">
      <section className="citizen-signup-web-layout">
        <aside className="citizen-signup-web-brand">
          <div className="citizen-signup-web-brand-head">
            <div className="citizen-signup-web-mark">D</div>
            <div>
              <span className="citizen-signup-web-name">DAMAYAN</span>
              <p className="citizen-signup-web-kicker">Citizen Registration</p>
            </div>
          </div>
          <div className="citizen-signup-web-copy">
            <span className="citizen-signup-web-badge">Join the Network</span>
            <h1>Create Your Citizen Account</h1>
            <p>
              Register for the citizen portal to receive real-time alerts, access your digital relief ID, and report incidents directly to the rescue network.
            </p>
          </div>
        </aside>

        <section className="citizen-signup-web-panel">
          <header className="citizen-signup-web-intro">
            <h2>Sign Up</h2>
            <p>Complete the form below to activate your digital preparedness profile.</p>
          </header>

          <article className="citizen-signup-web-card">
            <form className="citizen-signup-web-form" onSubmit={handleSubmit}>
              <div className="citizen-signup-web-field">
                <label>Full Name</label>
                <input type="text" placeholder="Juan Dela Cruz" required />
              </div>
              <div className="citizen-signup-web-field">
                <label>Username</label>
                <input type="text" placeholder="juan.dc" required />
              </div>
              <div className="citizen-signup-web-field">
                <label>Password</label>
                <input type="password" placeholder="********" required />
              </div>

              <div className="citizen-signup-web-field">
                <label>Government ID (Recommended)</label>
                <div className="citizen-signup-web-upload">
                  <input
                    className="citizen-signup-web-file-input"
                    id="citizen-id"
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    onChange={(e) => setSelectedIdName(e.target.files?.[0]?.name ?? "No file selected")}
                  />
                  <label className="citizen-signup-web-upload-dropzone" htmlFor="citizen-id">
                    <div className="citizen-signup-web-upload-icon">📄</div>
                    <div className="citizen-signup-web-upload-content">
                      <span className="citizen-signup-web-upload-title">
                        {selectedIdName === "No file selected" ? "Upload ID or drag here" : "File selected"}
                      </span>
                      <span className="citizen-signup-web-upload-hint">JPG or PNG • Max 5MB</span>
                      {selectedIdName !== "No file selected" && (
                        <span className="citizen-signup-web-upload-name">{selectedIdName}</span>
                      )}
                    </div>
                  </label>
                </div>
              </div>

              <button className="citizen-signup-web-primary" type="submit">Complete Registration</button>
            </form>
            <p className="citizen-signup-web-login-copy" style={{ marginTop: "1.5rem", fontSize: "0.9rem", color: "#586054", textAlign: "center" }}>
              Already have an account? <Link href="/citizen/login" style={{ color: "#0d631b", fontWeight: "800", textDecoration: "none" }}>Log in here</Link>
            </p>
          </article>
        </section>
      </section>
    </main>
  );
}
