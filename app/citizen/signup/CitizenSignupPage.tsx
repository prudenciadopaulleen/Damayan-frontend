"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

const verificationSteps = [
  "Upload a valid government ID.",
  "Wait for verification review.",
  "Validated credentials unlock citizen access.",
];

export default function CitizenSignupPage() {
  const router = useRouter();

  function handleRegister(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    router.push("/citizen/beforecalamity");
  }

  return (
    <main className="citizen-signup-web-page">
      <section className="citizen-signup-web-layout">
        <aside className="citizen-signup-web-brand">
          <div className="citizen-signup-web-brand-head">
            <div className="citizen-signup-web-mark">D</div>
            <div>
              <span className="citizen-signup-web-name">ReliefConnect</span>
              <p className="citizen-signup-web-kicker">Citizen Registration</p>
            </div>
          </div>

          <div className="citizen-signup-web-copy">
            <span className="citizen-signup-web-badge">Register</span>
            <h1>Create A Citizen Account</h1>
            <p>
              Register for the affected-citizen portal, validate your identity,
              and prepare your household access before emergencies escalate.
            </p>
          </div>

          <div className="citizen-signup-web-highlight">
            <strong>Verification Path</strong>
            {verificationSteps.map((step, index) => (
              <div className="citizen-signup-web-step" key={step}>
                <span>{`0${index + 1}`}</span>
                <p>{step}</p>
              </div>
            ))}
          </div>
        </aside>

        <section className="citizen-signup-web-panel">
          <header className="citizen-signup-web-intro">
            <h2>Citizen Registration</h2>
            <p>
              Complete the registration form to activate citizen preparedness
              access, alerts, and response support.
            </p>
          </header>

          <article className="citizen-signup-web-card">
            <form className="citizen-signup-web-form" onSubmit={handleRegister}>
              <div className="citizen-signup-web-field">
                <label htmlFor="signup-username">Create username</label>
                <input
                  id="signup-username"
                  name="signup-username"
                  type="text"
                  placeholder="family.cluster.04"
                />
              </div>

              <div className="citizen-signup-web-field">
                <label htmlFor="signup-password">Create password</label>
                <input
                  id="signup-password"
                  name="signup-password"
                  type="password"
                  placeholder="********"
                />
              </div>

              <div className="citizen-signup-web-field">
                <label htmlFor="signup-id">Upload valid government ID</label>
                <input
                  id="signup-id"
                  name="signup-id"
                  type="text"
                  placeholder="Attachment placeholder"
                />
              </div>

              <button className="citizen-signup-web-primary" type="submit">
                Submit Registration
              </button>
            </form>

            <div className="citizen-signup-web-note">
              <strong>Access outcome</strong>
              <p>
                Once approved, your account opens the citizen dashboard, QR ID,
                household records, and response features.
              </p>
            </div>

            <p className="citizen-signup-web-login-copy">
              Already have an account? <Link href="/citizen/auth">Log in here</Link>.
            </p>
          </article>
        </section>
      </section>
    </main>
  );
}
