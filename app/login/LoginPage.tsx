"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Role = "site_manager" | "citizen" | "dispatcher" | "admin";

const roles: { id: Role; label: string; desc: string; dot: string }[] = [
  { id: "admin", label: "Admin", desc: "System monitoring, approvals & reporting", dot: "#1565c0" },
  { id: "dispatcher", label: "Dispatcher", desc: "Incident management & resource dispatch", dot: "#e65100" },
  { id: "site_manager", label: "Site Manager", desc: "Relief site capacity & distribution", dot: "#2e7d32" },
  { id: "citizen", label: "Affected Citizen", desc: "Register, alerts, QR access & relief tracking", dot: "#c62828" },
];

const routeMap: Record<Role, string> = {
  admin: "/admin",
  dispatcher: "/dispatcher/beforecalamity",
  site_manager: "/beforecalamity",
  citizen: "/citizen/auth",
};

export default function LoginPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const handleSignIn = () => {
    if (!selectedRole) return;
    router.push(routeMap[selectedRole]);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f0f4f0", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Inter', sans-serif", padding: 24 }}>
      <div style={{ display: "flex", width: "100%", maxWidth: 960, borderRadius: 16, overflow: "hidden", boxShadow: "0 24px 80px rgba(0,0,0,0.15)" }}>
        {/* Left panel */}
        <div style={{ width: 420, background: "linear-gradient(160deg, #1b5e20 0%, #2e7d32 60%, #388e3c 100%)", padding: "48px 40px", display: "flex", flexDirection: "column", justifyContent: "space-between", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 80% 20%, rgba(255,255,255,0.07) 0%, transparent 60%)" }} />
          <div style={{ position: "relative" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 48 }}>
              <div style={{ width: 32, height: 32, background: "rgba(255,255,255,0.15)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 15, color: "#fff" }}>D</div>
              <span style={{ fontWeight: 700, fontSize: 15, color: "#fff" }}>Damayan</span>
            </div>
            <h2 style={{ fontSize: 38, fontWeight: 900, color: "#fff", lineHeight: 1.1, marginBottom: 16 }}>The Resilient<br />Sanctuary.</h2>
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 14, lineHeight: 1.7 }}>Providing digital infrastructure for human connection during times of crisis. Editorial clarity meets emergency response.</p>
          </div>
          <div style={{ position: "relative" }}>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>Relief Coordination Hub</div>
            <div style={{ display: "flex", gap: 6 }}>
              {["AL", "JM", "RC", "+2"].map((init, i) => (
                <div key={init} style={{ width: 34, height: 34, borderRadius: "50%", background: i < 3 ? "rgba(255,255,255,0.2)" : "#f9a825", border: "2px solid rgba(255,255,255,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#fff" }}>{init}</div>
              ))}
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div style={{ flex: 1, background: "#fff", padding: "48px 44px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
            <h1 style={{ fontSize: 26, fontWeight: 800, color: "#1a1f2e" }}>Welcome Back</h1>
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "#2e7d32", fontWeight: 600 }}>
              <span style={{ width: 7, height: 7, background: "#2e7d32", borderRadius: "50%", display: "inline-block" }} />
              Systems Nominal
            </div>
          </div>
          <p style={{ color: "#6b7494", fontSize: 13, marginBottom: 24 }}>One Damayan system for all operational roles.</p>

          {/* Role selector */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#6b7494", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>Select Your Role</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {roles.map(r => (
                <div key={r.id} onClick={() => setSelectedRole(r.id)} style={{
                  border: `1.5px solid ${selectedRole === r.id ? r.dot : "#e8eaed"}`,
                  borderRadius: 8, padding: "11px 14px", cursor: "pointer",
                  background: selectedRole === r.id ? r.dot + "0d" : "#fafbfc",
                  transition: "all 0.15s",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 3 }}>
                    <span style={{ width: 7, height: 7, borderRadius: "50%", background: r.dot, display: "inline-block" }} />
                    <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: selectedRole === r.id ? r.dot : "#3c4152" }}>{r.label}</span>
                  </div>
                  <div style={{ fontSize: 11, color: "#9aa3b2", lineHeight: 1.4 }}>{r.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Email */}
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#6b7494", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>Email Address</div>
            <input value={email} onChange={e => setEmail(e.target.value)} placeholder="name@organization.org" style={{ width: "100%", padding: "10px 14px", border: "1.5px solid #e8eaed", borderRadius: 8, fontSize: 13, outline: "none", boxSizing: "border-box" }} />
          </div>

          {/* Password */}
          <div style={{ marginBottom: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#6b7494", textTransform: "uppercase", letterSpacing: "0.08em" }}>Password</div>
              <a href="#" style={{ fontSize: 12, color: "#2e7d32", textDecoration: "none", fontWeight: 500 }}>Forgot?</a>
            </div>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" style={{ width: "100%", padding: "10px 14px", border: "1.5px solid #e8eaed", borderRadius: 8, fontSize: 13, outline: "none", boxSizing: "border-box" }} />
          </div>

          {/* Remember */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
            <input type="checkbox" id="remember" checked={remember} onChange={e => setRemember(e.target.checked)} style={{ accentColor: "#2e7d32", width: 14, height: 14 }} />
            <label htmlFor="remember" style={{ fontSize: 13, color: "#6b7494" }}>Remember this device for 30 days</label>
          </div>

          {/* CTA */}
          <button onClick={handleSignIn} disabled={!selectedRole} style={{
            width: "100%", padding: "12px", background: selectedRole ? "#2e7d32" : "#c8d6c8", color: "#fff",
            border: "none", borderRadius: 8, fontWeight: 700, fontSize: 14, cursor: selectedRole ? "pointer" : "default", marginBottom: 12,
          }}>
            Sign In to Dashboard →
          </button>

          {/* SSO row */}
          <div style={{ textAlign: "center", fontSize: 11, color: "#9aa3b2", marginBottom: 12 }}>or continue with</div>
          <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
            {["Google", "SSO"].map(method => (
              <button key={method} style={{ flex: 1, padding: "10px", background: "#f5f6f8", border: "1px solid #e8eaed", borderRadius: 8, fontWeight: 600, fontSize: 13, cursor: "pointer", color: "#3c4152" }}>{method}</button>
            ))}
          </div>

          <div style={{ textAlign: "center", fontSize: 12, color: "#9aa3b2" }}>
            Need citizen access instead?{" "}
            <a href="/citizen/auth" style={{ color: "#2e7d32", fontWeight: 600, textDecoration: "none" }}>Open the affected citizen portal</a>
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: 16, marginTop: 24 }}>
            {["Privacy Policy", "Terms of Service", "Help Center"].map(l => (
              <a key={l} href="#" style={{ fontSize: 11, color: "#9aa3b2", textDecoration: "none" }}>{l}</a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}