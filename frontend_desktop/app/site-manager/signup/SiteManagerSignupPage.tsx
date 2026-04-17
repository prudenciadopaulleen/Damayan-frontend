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
    <main className="sitemanager-signup-web-page">
      <section className="sitemanager-signup-web-layout">
        <aside className="sitemanager-signup-web-brand">
          <div className="sitemanager-signup-web-brand-head">
            <div className="sitemanager-signup-web-mark">D</div>
            <div>
              <span className="sitemanager-signup-web-name">DAMAYAN</span>
              <p className="sitemanager-signup-web-kicker">Site Manager Registration</p>
            </div>
          </div>

          <div className="sitemanager-signup-web-copy">
            <span className="sitemanager-signup-web-badge">Register</span>
            <h1>Create A Site Manager Account</h1>
            <p>
              Register for the site manager portal to validate your credentials, manage supply logs, and access the rescue network overview.
            </p>
          </div>

        </aside>

        <section className="sitemanager-signup-web-panel">
          <header className="sitemanager-signup-web-intro">
            <h2>Site Manager Registration</h2>
            <p>
              Complete the registration form to activate your site operations dashboard and emergency coordination.
            </p>
          </header>

          <article className="sitemanager-signup-web-card">
            <form className="sitemanager-signup-web-form" onSubmit={handleRegister}>
              <div className="sitemanager-signup-web-field">
                <label htmlFor="signup-username">Create username</label>
                <input
                  id="signup-username"
                  name="signup-username"
                  type="text"
                  placeholder="site.manager.01"
                />
              </div>

              <div className="sitemanager-signup-web-field">
                <label htmlFor="signup-password">Create password</label>
                <input
                  id="signup-password"
                  name="signup-password"
                  type="password"
                  placeholder="********"
                />
              </div>

              <div className="sitemanager-signup-web-field">
                <label htmlFor="signup-id">Upload government ID</label>
                <div className="sitemanager-signup-web-upload">
                  <input
                    className="sitemanager-signup-web-file-input"
                    id="signup-id"
                    name="signup-id"
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    onChange={(event) =>
                      setSelectedIdName(
                        event.target.files?.[0]?.name ?? "No file selected"
                      )
                    }
                  />
                  <label
                    className="sitemanager-signup-web-upload-dropzone"
                    htmlFor="signup-id"
                  >
                    <div className="sitemanager-signup-web-upload-icon">📄</div>
                    <div className="sitemanager-signup-web-upload-content">
                      <span className="sitemanager-signup-web-upload-title">
                        {selectedIdName === "No file selected" 
                          ? "Upload file or drag here" 
                          : "File selected"}
                      </span>
                      <span className="sitemanager-signup-web-upload-hint">
                        JPG or PNG • Max 5MB
                      </span>
                      {selectedIdName !== "No file selected" && (
                        <span className="sitemanager-signup-web-upload-name">
                          {selectedIdName}
                        </span>
                      )}
                    </div>
                  </label>
                </div>
              </div>

              <button className="sitemanager-signup-web-primary" type="submit">
                Submit Registration
              </button>
            </form>

            <p className="sitemanager-signup-web-login-copy">
              Already have an account? <Link href="/site-manager/login">Log in here</Link>.
            </p>
          </article>
        </section>
      </section>
    </main>
  );
}
