"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Role = "site_manager" | "citizen" | "dispatcher" | "admin";

const roles: { id: Role; label: string; desc: string; dot: string; icon: string; route: string }[] = [
  { id: "admin",        label: "Admin",            desc: "System monitoring, account approvals & platform reporting",          dot: "#1565c0", icon: "🏛", route: "/admin" },
  { id: "dispatcher",   label: "Dispatcher",       desc: "Incident management, resource dispatch & rescue monitoring",         dot: "#c2440a", icon: "🚨", route: "/dispatcher" },
  { id: "site_manager", label: "Site Manager",     desc: "Relief site capacity, check-in scanning & distribution",            dot: "#2e7d32", icon: "🏕", route: "/beforecalamity" },
  { id: "citizen",      label: "Affected Citizen", desc: "Register, receive alerts, QR access & relief tracking",             dot: "#c62828", icon: "👥", route: "/citizen/auth" },
];

export default function LoginPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<Role | null>(null);

  return (
    <main style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "radial-gradient(circle at top left, rgba(163,246,156,0.18), transparent 30%), linear-gradient(180deg, #fcfcf8 0%, #fafaf5 100%)", fontFamily: "'Public Sans', sans-serif", padding: "1.5rem" }}>
      <div style={{ width: "min(72rem, 100%)", display: "grid", gridTemplateColumns: "minmax(20rem, 0.85fr) minmax(0, 1fr)", borderRadius: "2rem", overflow: "hidden", background: "#fff", boxShadow: "0 32px 64px rgba(26,28,25,0.12)", minHeight: "min(36rem, calc(100vh - 3rem))" }}>

        {/* Left brand panel */}
        <div style={{ padding: "3.5rem", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "2rem", background: "linear-gradient(145deg, rgba(255,255,255,0.06), transparent 35%), linear-gradient(160deg, #204638 0%, #0d631b 100%)", color: "#fff" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.85rem", marginBottom: "3rem" }}>
              <div style={{ width: "3rem", height: "3rem", borderRadius: "0.9rem", display: "grid", placeItems: "center", background: "rgba(255,255,255,0.16)", fontSize: "1.15rem", fontWeight: 900 }}>D</div>
              <div>
                <div style={{ fontSize: "1.85rem", fontWeight: 900, letterSpacing: "-0.05em", lineHeight: 1 }}>Damayan</div>
                <div style={{ fontSize: "0.7rem", fontWeight: 800, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.65)", marginTop: "0.2rem" }}>Relief Coordination System</div>
              </div>
            </div>
            <h1 style={{ margin: "0 0 1rem", fontSize: "clamp(2.8rem,4.5vw,4.5rem)", lineHeight: 0.95, letterSpacing: "-0.06em" }}>The Resilient<br />Sanctuary.</h1>
            <p style={{ margin: 0, color: "rgba(235,255,232,0.88)", lineHeight: 1.72, fontSize: "0.95rem" }}>
              Digital infrastructure for human connection during times of crisis — bringing together responders, coordinators, and communities.
            </p>
          </div>
          <div style={{ display: "grid", gap: "0.65rem" }}>
            <div style={{ fontSize: "0.68rem", fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: "0.2rem" }}>Four Operational Portals</div>
            {roles.map(r => (
              <div key={r.id} style={{ display: "flex", alignItems: "center", gap: "0.7rem", padding: "0.6rem 0.85rem", borderRadius: "0.75rem", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <span style={{ fontSize: "1rem" }}>{r.icon}</span>
                <div>
                  <div style={{ fontSize: "0.82rem", fontWeight: 800, color: "#fff" }}>{r.label}</div>
                  <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.55)" }}>{r.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right selection panel */}
        <div style={{ padding: "3.5rem", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{ marginBottom: "2.2rem" }}>
            <div style={{ display: "inline-block", padding: "0.45rem 0.85rem", borderRadius: "999px", background: "rgba(13,99,27,0.1)", color: "#0d631b", fontSize: "0.68rem", fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "1rem" }}>Select Portal</div>
            <h2 style={{ margin: "0 0 0.6rem", fontSize: "clamp(2rem,3vw,2.8rem)", lineHeight: 0.95, letterSpacing: "-0.05em" }}>Which portal<br />are you accessing?</h2>
            <p style={{ margin: 0, color: "#586054", lineHeight: 1.72, fontSize: "0.9rem" }}>Each role has its own dedicated portal with tailored features and access levels.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "1.8rem" }}>
            {roles.map(r => (
              <button key={r.id} onClick={() => setSelected(r.id)} style={{ padding: "1.1rem 1.2rem", border: `1.5px solid ${selected === r.id ? r.dot : "rgba(191,202,186,0.35)"}`, borderRadius: "1rem", background: selected === r.id ? `${r.dot}0e` : "#fafaf5", cursor: "pointer", textAlign: "left", transition: "all 0.15s", fontFamily: "inherit", outline: "none" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.4rem" }}>
                  <span style={{ fontSize: "1.2rem" }}>{r.icon}</span>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                    <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: r.dot, display: "inline-block", flexShrink: 0 }} />
                    <span style={{ fontSize: "0.8rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em", color: selected === r.id ? r.dot : "#3c4152" }}>{r.label}</span>
                  </div>
                </div>
                <div style={{ fontSize: "0.78rem", color: "#8a8f7e", lineHeight: 1.45 }}>{r.desc}</div>
              </button>
            ))}
          </div>

          <button onClick={() => { if (!selected) return; router.push(roles.find(r => r.id === selected)!.route); }} disabled={!selected} style={{ padding: "1rem 1.2rem", border: "none", borderRadius: "1rem", background: selected ? `linear-gradient(135deg, ${roles.find(r => r.id === selected)?.dot}, ${roles.find(r => r.id === selected)?.dot}bb)` : "rgba(191,202,186,0.35)", color: selected ? "#fff" : "#9aa099", fontFamily: "inherit", fontSize: "0.96rem", fontWeight: 800, cursor: selected ? "pointer" : "default", transition: "all 0.18s" }}>
            {selected ? `Continue to ${roles.find(r => r.id === selected)?.label} Portal →` : "Select a portal to continue"}
          </button>

          <p style={{ margin: "1.2rem 0 0", textAlign: "center", fontSize: "0.8rem", color: "#8a8f7e" }}>Each portal has its own dedicated sign-in flow.</p>
        </div>
      </div>
    </main>
  );
}
