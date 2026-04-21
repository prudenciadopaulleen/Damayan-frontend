"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

const featureCards = [
  "Receive live hazard updates before response teams mobilize.",
  "Keep QR-based citizen identity and household data ready for validation.",
  "Move from preparedness to relief tracking in one connected portal.",
];

export default function CitizenAuthPage() {
  const router = useRouter();

  function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    router.push("/citizen/beforecalamity");
  }

  return (
    <main className="citizen-entry-page">
      <section className="citizen-entry-layout">
        <aside className="citizen-entry-brand">
          <div className="citizen-entry-brand-head">
            <div className="citizen-entry-mark">D</div>
            <div>
              <span className="citizen-entry-name">ReliefConnect</span>
              <p className="citizen-entry-kicker">Affected Citizen Portal</p>
            </div>
          </div>

          <div className="citizen-entry-brand-copy">
            <p className="citizen-entry-eyebrow">Community Preparedness Access</p>
            <h1>Stay Connected Before Help Needs To Move.</h1>
            <p>
              Use one citizen portal for alerts, household records, QR access,
              and rapid response coordination during active emergencies.
            </p>
          </div>

          <div className="citizen-entry-feature-list">
            {featureCards.map((item) => (
              <div className="citizen-entry-feature-card" key={item}>
                <span className="citizen-entry-feature-token">RC</span>
                <p>{item}</p>
              </div>
            ))}
          </div>
        </aside>

        <section className="citizen-entry-panel">
          <div className="citizen-entry-mobile-head">
            <div className="citizen-entry-mark citizen-entry-mark-mobile">D</div>
            <span className="citizen-entry-name citizen-entry-name-mobile">
              ReliefConnect
            </span>
          </div>

          <header className="citizen-entry-intro">
            <span className="citizen-entry-badge">Login</span>
            <h2>Affected Citizen Access</h2>
            <p>
              Sign in to continue to the citizen dashboard for preparation,
              alerts, shelter routing, and response tracking.
            </p>
          </header>

          <div className="citizen-entry-return">
            <span>Need the site manager portal instead?</span>
            <Link href="/login">Open Site Manager login</Link>
          </div>

          <article className="citizen-entry-card">
            <div className="citizen-entry-card-top">
              <h3>Already Registered</h3>
              <p>
                Enter your credentials to open your readiness dashboard and
                active citizen tools.
              </p>
            </div>

            <form className="citizen-entry-form" onSubmit={handleLogin}>
              <div className="citizen-entry-field">
                <label htmlFor="citizen-username">Username</label>
                <input
                  id="citizen-username"
                  name="citizen-username"
                  type="text"
                  placeholder="juan.delacruz"
                />
              </div>

              <div className="citizen-entry-field">
                <div className="citizen-entry-field-row">
                  <label htmlFor="citizen-password">Password</label>
                  <button type="button">Forgot password?</button>
                </div>
                <input
                  id="citizen-password"
                  name="citizen-password"
                  type="password"
                  placeholder="********"
                />
              </div>

              <button className="citizen-entry-primary" type="submit">
                Continue To Citizen Dashboard
              </button>
            </form>

            <div className="citizen-entry-note">
              <strong>Fast access path</strong>
              <p>Citizen login unlocks preparedness records, relief tickets, and QR identity tools.</p>
            </div>

            <p className="citizen-entry-switch-copy">
              If you do not have an account,{" "}
              <Link href="/citizen/signup">create an account</Link>.
            </p>
          </article>
        </section>
      </section>
    </main>
  );
}
