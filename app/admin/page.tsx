"use client";

import { useState } from "react";

interface Approval {
  id: string;
  name: string;
  role: string;
  area: string;
  submitted: string;
  docs: number;
}

const initialApprovals: Approval[] = [
  { id: "ACC-1041", name: "Ana Torres", role: "Site Manager", area: "District 2", submitted: "2h ago", docs: 3 },
  { id: "ACC-1042", name: "Renz Villanueva", role: "Dispatcher", area: "Metro Cluster 5", submitted: "4h ago", docs: 2 },
  { id: "ACC-1043", name: "Liza Ramos", role: "Field Officer", area: "Zone B-3", submitted: "1d ago", docs: 2 },
];

const mockSystemHealth = [
  { name: "API Gateway", status: "OPERATIONAL", latency: "12ms" },
  { name: "Auth Service", status: "OPERATIONAL", latency: "8ms" },
  { name: "Notification Service", status: "DEGRADED", latency: "340ms" },
  { name: "GIS / Mapping", status: "OPERATIONAL", latency: "22ms" },
  { name: "Triage API", status: "OPERATIONAL", latency: "56ms" },
  { name: "Screening API", status: "OPERATIONAL", latency: "180ms" },
];

const mockDisasters = [
  { name: "Typhoon 09B", phase: "DURING", severity: "CAT 4", areas: "Metro Cluster 3, 5", tickets: 142, dispatchers: 4 },
  { name: "Flooding – Laguna Basin", phase: "BEFORE", severity: "WATCH", areas: "Cluster 8", tickets: 12, dispatchers: 1 },
  { name: "Landslide – Rizal Province", phase: "AFTER", severity: "RESOLVED", areas: "Cluster 2", tickets: 87, dispatchers: 0 },
];

const phaseStyle: Record<string, { bg: string; color: string }> = {
  BEFORE: { bg: "#fff3e0", color: "#795000" },
  DURING: { bg: "#fce4ec", color: "#880e4f" },
  AFTER: { bg: "#e8f5e9", color: "#1b5e20" },
};

const statusColor: Record<string, string> = {
  OPERATIONAL: "#2e7d32", DEGRADED: "#e65100", DOWN: "#c62828",
};

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState<"overview" | "approvals" | "system">("overview");
  const [approvals, setApprovals] = useState<Approval[]>(initialApprovals);
  const [toast, setToast] = useState<string | null>(null);
  const [rejectTarget, setRejectTarget] = useState<Approval | null>(null);
  const [rejectReason, setRejectReason] = useState("");
  const [docsTarget, setDocsTarget] = useState<Approval | null>(null);
  const [activityLog, setActivityLog] = useState<{ time: string; msg: string; type: string }[]>([]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  const addLog = (msg: string, type: string) => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
    setActivityLog(prev => [{ time: timeStr, msg, type }, ...prev]);
  };

  const handleApprove = (approval: Approval) => {
    setApprovals(prev => prev.filter(a => a.id !== approval.id));
    addLog(`${approval.name} (${approval.role}) approved for ${approval.area}.`, "APPROVED");
    showToast(`✓ ${approval.name} approved as ${approval.role}`);
  };

  const handleReject = () => {
    if (!rejectTarget || !rejectReason.trim()) return;
    setApprovals(prev => prev.filter(a => a.id !== rejectTarget.id));
    addLog(`${rejectTarget.name} (${rejectTarget.role}) rejected. Reason: ${rejectReason}`, "REJECTED");
    showToast(`✕ ${rejectTarget.name}'s application rejected`);
    setRejectTarget(null);
    setRejectReason("");
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f5f6f8", fontFamily: "'Inter', sans-serif" }}>
      {/* Sidebar */}
      <aside style={{ width: 200, background: "#1a1f2e", display: "flex", flexDirection: "column", padding: "0 0 24px" }}>
        <div style={{ padding: "20px 16px 16px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 28, height: 28, background: "#2e7d32", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 13 }}>D</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 13, color: "#fff" }}>Damayan Portal</div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>Admin</div>
            </div>
          </div>
        </div>
        <nav style={{ flex: 1, padding: "12px 8px" }}>
          {[
            { key: "D", label: "Dashboard", id: "overview" },
            { key: "A", label: "Approvals", id: "approvals", badge: approvals.length },
            { key: "S", label: "System Health", id: "system" },
            { key: "R", label: "Reports", id: "" },
            { key: "U", label: "Users", id: "" },
            { key: "C", label: "Configuration", id: "" },
          ].map((item) => {
            const isActive = item.id === activeSection;
            return (
              <div key={item.key} onClick={() => item.id && setActiveSection(item.id as any)} style={{
                display: "flex", alignItems: "center", gap: 10, padding: "9px 10px",
                borderRadius: 6, marginBottom: 2, cursor: "pointer",
                background: isActive ? "rgba(46,125,50,0.3)" : "transparent",
                borderLeft: isActive ? "3px solid #2e7d32" : "3px solid transparent",
              }}>
                <div style={{ width: 22, height: 22, borderRadius: 4, background: isActive ? "#2e7d32" : "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: "#fff" }}>{item.key}</div>
                <span style={{ fontSize: 13, fontWeight: isActive ? 600 : 400, color: isActive ? "#fff" : "rgba(255,255,255,0.6)", flex: 1 }}>{item.label}</span>
                {item.badge != null && item.badge > 0 && (
                  <span style={{ background: "#c62828", color: "#fff", fontSize: 9, fontWeight: 700, padding: "2px 6px", borderRadius: 10 }}>{item.badge}</span>
                )}
              </div>
            );
          })}
        </nav>
        <div style={{ padding: "0 8px" }}>
          {["Audit Logs", "Support", "Sign Out"].map(label => (
            <div key={label} style={{ padding: "8px 10px", fontSize: 12, color: "rgba(255,255,255,0.4)", cursor: "pointer" }}>{label}</div>
          ))}
        </div>
      </aside>

      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <header style={{ background: "#fff", borderBottom: "1px solid #e8eaed", padding: "0 24px", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span style={{ fontWeight: 700, fontSize: 15, color: "#1a1f2e" }}>DAMAYAN Admin Console</span>
            <span style={{ background: "#e8f5e9", color: "#2e7d32", fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20, border: "1px solid #a5d6a7" }}>● Systems Nominal</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button style={{ padding: "7px 16px", background: "#c62828", color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>🔔 Broadcast Alert</button>
            <div style={{ width: 34, height: 34, borderRadius: "50%", background: "#1a237e", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#fff" }}>AD</div>
          </div>
        </header>

        <main style={{ flex: 1, padding: "28px 28px 40px", overflowY: "auto" }}>
          <div style={{ marginBottom: 20 }}>
            <h1 style={{ fontSize: 30, fontWeight: 800, color: "#1a1f2e", marginBottom: 4 }}>
              {activeSection === "overview" ? "System Overview" : activeSection === "approvals" ? "Account Approvals" : "System Health Monitor"}
            </h1>
            <p style={{ color: "#6b7494", fontSize: 13 }}>
              {activeSection === "overview" ? "Real-time view of all active disasters, dispatchers, and platform metrics." : activeSection === "approvals" ? "Review and approve pending role applications and document submissions." : "Monitor live service status across all platform components."}
            </p>
          </div>

          {/* Section nav */}
          <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
            {(["overview", "approvals", "system"] as const).map(s => (
              <button key={s} onClick={() => setActiveSection(s)} style={{
                padding: "8px 18px", borderRadius: 20, border: "1px solid",
                borderColor: activeSection === s ? "#2e7d32" : "#e8eaed",
                background: activeSection === s ? "#e8f5e9" : "#fff",
                color: activeSection === s ? "#1b5e20" : "#6b7494",
                fontWeight: activeSection === s ? 700 : 500, fontSize: 13, cursor: "pointer",
                display: "flex", alignItems: "center", gap: 6,
              }}>
                {s === "system" ? "System Health" : s.charAt(0).toUpperCase() + s.slice(1)}
                {s === "approvals" && approvals.length > 0 && (
                  <span style={{ background: "#c62828", color: "#fff", fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 10 }}>{approvals.length}</span>
                )}
              </button>
            ))}
          </div>

          {/* OVERVIEW */}
          {activeSection === "overview" && (
            <div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12, marginBottom: 24 }}>
                {[
                  { label: "Active Disasters", value: "2", color: "#e91e63" },
                  { label: "Total Relief Tickets", value: "241", color: "#1565c0" },
                  { label: "Registered Citizens", value: "18,432", color: "#2e7d32" },
                  { label: "Active Dispatchers", value: "5", color: "#e65100" },
                  { label: "Pending Approvals", value: String(approvals.length), color: "#6a1b9a" },
                ].map(k => (
                  <div key={k.label} style={{ background: "#fff", border: "1px solid #e8eaed", borderRadius: 10, padding: "16px 18px" }}>
                    <div style={{ fontSize: 10, color: "#6b7494", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>{k.label}</div>
                    <div style={{ fontSize: 26, fontWeight: 800, color: k.color }}>{k.value}</div>
                  </div>
                ))}
              </div>

              <div style={{ background: "#fff", border: "1px solid #e8eaed", borderRadius: 10, overflow: "hidden", marginBottom: 16 }}>
                <div style={{ padding: "14px 20px", borderBottom: "1px solid #e8eaed" }}>
                  <span style={{ fontWeight: 700, fontSize: 14 }}>Active & Recent Disaster Events</span>
                </div>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ background: "#f5f6f8" }}>
                      {["Event", "Phase", "Severity", "Areas", "Tickets", "Dispatchers", "Actions"].map(h => (
                        <th key={h} style={{ padding: "10px 16px", textAlign: "left", fontSize: 10, fontWeight: 700, color: "#6b7494", textTransform: "uppercase", letterSpacing: "0.06em" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {mockDisasters.map((d, i) => (
                      <tr key={d.name} style={{ borderTop: "1px solid #f0f2f7", background: i % 2 === 0 ? "#fff" : "#fafbfc" }}>
                        <td style={{ padding: "13px 16px", fontWeight: 600, fontSize: 13 }}>{d.name}</td>
                        <td style={{ padding: "13px 16px" }}>
                          <span style={{ background: phaseStyle[d.phase].bg, color: phaseStyle[d.phase].color, fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 4 }}>{d.phase}</span>
                        </td>
                        <td style={{ padding: "13px 16px", fontSize: 12, fontWeight: 600, color: d.severity === "CAT 4" ? "#c62828" : d.severity === "WATCH" ? "#e65100" : "#2e7d32" }}>{d.severity}</td>
                        <td style={{ padding: "13px 16px", fontSize: 12, color: "#6b7494" }}>{d.areas}</td>
                        <td style={{ padding: "13px 16px", fontSize: 13, fontWeight: 700 }}>{d.tickets}</td>
                        <td style={{ padding: "13px 16px", fontSize: 13 }}>{d.dispatchers}</td>
                        <td style={{ padding: "13px 16px" }}>
                          <button style={{ padding: "5px 12px", background: "#e3f2fd", color: "#1565c0", border: "1px solid #90caf9", borderRadius: 5, fontSize: 11, fontWeight: 600, cursor: "pointer" }}>View →</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
                {[
                  { title: "Generate Relief Report", desc: "Compile full relief operation summary for Typhoon 09B", action: "Generate PDF", color: "#1b5e20", section: "" },
                  { title: "Pending Account Approvals", desc: `${approvals.length} new role applications awaiting review`, action: "Review Now", color: "#6a1b9a", section: "approvals" },
                  { title: "Notification Broadcast", desc: "Send system-wide alert to all registered citizens and staff", action: "Compose Alert", color: "#c62828", section: "" },
                ].map(card => (
                  <div key={card.title} style={{ background: "#fff", border: "1px solid #e8eaed", borderRadius: 10, padding: "18px 20px" }}>
                    <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 6 }}>{card.title}</div>
                    <div style={{ fontSize: 12, color: "#6b7494", marginBottom: 14, lineHeight: 1.5 }}>{card.desc}</div>
                    <button onClick={() => card.section && setActiveSection(card.section as any)} style={{ padding: "8px 16px", background: card.color, color: "#fff", border: "none", borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>{card.action}</button>
                  </div>
                ))}
              </div>

              {/* Activity log */}
              {activityLog.length > 0 && (
                <div style={{ background: "#fff", border: "1px solid #e8eaed", borderRadius: 10, padding: "16px 20px", marginTop: 16 }}>
                  <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 12 }}>Recent Admin Activity</div>
                  {activityLog.map((log, i) => (
                    <div key={i} style={{ display: "flex", gap: 10, marginBottom: 8, alignItems: "flex-start" }}>
                      <span style={{ fontSize: 10, color: "#9aa3b2", width: 60, flexShrink: 0 }}>{log.time}</span>
                      <span style={{ fontSize: 12, color: log.type === "APPROVED" ? "#1b5e20" : "#c62828", fontWeight: 600, width: 70, flexShrink: 0 }}>{log.type}</span>
                      <span style={{ fontSize: 12, color: "#3c4152" }}>{log.msg}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* APPROVALS */}
          {activeSection === "approvals" && (
            <div>
              {approvals.length === 0 ? (
                <div style={{ background: "#fff", border: "1px solid #e8eaed", borderRadius: 10, padding: "48px", textAlign: "center" }}>
                  <div style={{ fontSize: 32, marginBottom: 12 }}>✅</div>
                  <div style={{ fontWeight: 700, fontSize: 16, color: "#1a1f2e", marginBottom: 4 }}>All caught up!</div>
                  <div style={{ fontSize: 13, color: "#6b7494" }}>No pending account applications at this time.</div>
                </div>
              ) : (
                <div style={{ background: "#fff", border: "1px solid #e8eaed", borderRadius: 10, overflow: "hidden", marginBottom: 16 }}>
                  <div style={{ padding: "14px 20px", borderBottom: "1px solid #e8eaed", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontWeight: 700, fontSize: 14 }}>Pending Role Applications</span>
                    <span style={{ background: "#fce4ec", color: "#c62828", fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 20 }}>{approvals.length} Pending</span>
                  </div>
                  {approvals.map((a, i) => (
                    <div key={a.id} style={{ padding: "16px 20px", borderBottom: i < approvals.length - 1 ? "1px solid #f0f2f7" : "none", display: "flex", alignItems: "center", gap: 14 }}>
                      <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#e3f2fd", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, fontWeight: 700, color: "#1565c0", flexShrink: 0 }}>{a.name[0]}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 700, fontSize: 14 }}>{a.name} <span style={{ fontFamily: "monospace", fontSize: 11, color: "#6b7494", fontWeight: 400 }}>{a.id}</span></div>
                        <div style={{ fontSize: 12, color: "#6b7494" }}>Applying for: <strong style={{ color: "#1a1f2e" }}>{a.role}</strong> · {a.area}</div>
                        <div style={{ fontSize: 11, color: "#9aa3b2", marginTop: 2 }}>Submitted {a.submitted} · {a.docs} documents uploaded</div>
                      </div>
                      <div style={{ display: "flex", gap: 8 }}>
                        <button onClick={() => handleApprove(a)} style={{ padding: "7px 14px", background: "#e8f5e9", color: "#1b5e20", border: "1px solid #a5d6a7", borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>✓ Approve</button>
                        <button onClick={() => setRejectTarget(a)} style={{ padding: "7px 14px", background: "#fce4ec", color: "#c62828", border: "1px solid #f48fb1", borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>✕ Reject</button>
                        <button onClick={() => setDocsTarget(a)} style={{ padding: "7px 14px", background: "#f0f2f7", color: "#6b7494", border: "1px solid #e8eaed", borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>View Docs</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Activity log for approvals section */}
              {activityLog.length > 0 && (
                <div style={{ background: "#fff", border: "1px solid #e8eaed", borderRadius: 10, padding: "16px 20px" }}>
                  <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 12 }}>Approval Activity Log</div>
                  {activityLog.map((log, i) => (
                    <div key={i} style={{ display: "flex", gap: 10, marginBottom: 8, alignItems: "flex-start" }}>
                      <span style={{ fontSize: 10, color: "#9aa3b2", width: 60, flexShrink: 0 }}>{log.time}</span>
                      <span style={{ fontSize: 12, color: log.type === "APPROVED" ? "#1b5e20" : "#c62828", fontWeight: 600, width: 70, flexShrink: 0 }}>{log.type}</span>
                      <span style={{ fontSize: 12, color: "#3c4152" }}>{log.msg}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* SYSTEM HEALTH */}
          {activeSection === "system" && (
            <div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
                {mockSystemHealth.map(svc => (
                  <div key={svc.name} style={{ background: "#fff", border: `1px solid ${svc.status === "OPERATIONAL" ? "#a5d6a7" : "#ffb74d"}`, borderRadius: 10, padding: "18px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{svc.name}</div>
                      <div style={{ fontSize: 12, color: "#6b7494" }}>Latency: <strong>{svc.latency}</strong></div>
                    </div>
                    <span style={{ background: statusColor[svc.status] + "22", color: statusColor[svc.status], fontSize: 11, fontWeight: 700, padding: "5px 12px", borderRadius: 20 }}>
                      {svc.status === "OPERATIONAL" ? "● " : "⚠ "}{svc.status}
                    </span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 16, background: "#fff", border: "1px solid #e8eaed", borderRadius: 10, padding: "18px 20px" }}>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>Notification Service — Degraded</div>
                <div style={{ fontSize: 13, color: "#6b7494", lineHeight: 1.6 }}>SMS push latency elevated at 340ms (threshold: 200ms). Root cause: third-party SMS provider rate limiting. Engineering team notified. ETA to resolve: 15 minutes.</div>
                <button style={{ marginTop: 12, padding: "8px 16px", background: "#e65100", color: "#fff", border: "none", borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Escalate Issue</button>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Toast */}
      {toast && (
        <div style={{ position: "fixed", bottom: 28, left: "50%", transform: "translateX(-50%)", background: "#1b5e20", color: "#fff", padding: "12px 24px", borderRadius: 8, fontWeight: 600, fontSize: 13, boxShadow: "0 8px 32px rgba(0,0,0,0.2)", zIndex: 200 }}>
          {toast}
        </div>
      )}

      {/* Reject modal */}
      {rejectTarget && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100 }}>
          <div style={{ background: "#fff", borderRadius: 12, padding: 32, width: 460, boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}>
            <h2 style={{ fontWeight: 800, fontSize: 20, marginBottom: 4 }}>Reject Application</h2>
            <p style={{ color: "#6b7494", fontSize: 13, marginBottom: 20 }}>
              You are rejecting <strong>{rejectTarget.name}</strong>'s application for <strong>{rejectTarget.role}</strong>. Please provide a reason — this will be sent to the applicant.
            </p>
            <div style={{ marginBottom: 8 }}>
              <label style={{ fontSize: 11, fontWeight: 600, color: "#6b7494", textTransform: "uppercase", letterSpacing: "0.06em", display: "block", marginBottom: 6 }}>Reason for Rejection *</label>
              <textarea
                value={rejectReason}
                onChange={e => setRejectReason(e.target.value)}
                placeholder="e.g. Submitted ID document is expired. Please resubmit with a valid government ID."
                rows={3}
                style={{ width: "100%", padding: "10px 14px", border: "1.5px solid #e8eaed", borderRadius: 8, fontSize: 13, resize: "none", outline: "none", boxSizing: "border-box" }}
              />
            </div>
            <div style={{ fontSize: 11, color: "#9aa3b2", marginBottom: 20 }}>This reason will be included in the notification email sent to the applicant.</div>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => { setRejectTarget(null); setRejectReason(""); }} style={{ flex: 1, padding: "11px", background: "#f0f2f7", color: "#6b7494", border: "none", borderRadius: 8, fontWeight: 600, fontSize: 13, cursor: "pointer" }}>Cancel</button>
              <button onClick={handleReject} disabled={!rejectReason.trim()} style={{ flex: 2, padding: "11px", background: rejectReason.trim() ? "#c62828" : "#e0c0c0", color: "#fff", border: "none", borderRadius: 8, fontWeight: 700, fontSize: 13, cursor: rejectReason.trim() ? "pointer" : "default" }}>
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Docs modal */}
      {docsTarget && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100 }}>
          <div style={{ background: "#fff", borderRadius: 12, padding: 32, width: 460, boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}>
            <h2 style={{ fontWeight: 800, fontSize: 20, marginBottom: 4 }}>Documents — {docsTarget.name}</h2>
            <p style={{ color: "#6b7494", fontSize: 13, marginBottom: 20 }}>{docsTarget.role} application · {docsTarget.area}</p>
            {[
              { name: "Government Issued ID", type: "image/jpeg", size: "1.2 MB", status: "VERIFIED" },
              { name: "Employment Certificate", type: "application/pdf", size: "340 KB", status: "VERIFIED" },
              ...(docsTarget.docs === 3 ? [{ name: "Barangay Clearance", type: "application/pdf", size: "210 KB", status: "PENDING" }] : []),
            ].map((doc, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px", background: "#f5f6f8", borderRadius: 8, marginBottom: 8 }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 13 }}>{doc.name}</div>
                  <div style={{ fontSize: 11, color: "#9aa3b2" }}>{doc.type} · {doc.size}</div>
                </div>
                <span style={{ background: doc.status === "VERIFIED" ? "#e8f5e9" : "#fff3e0", color: doc.status === "VERIFIED" ? "#1b5e20" : "#795000", fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 4 }}>{doc.status}</span>
              </div>
            ))}
            <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
              <button onClick={() => setDocsTarget(null)} style={{ flex: 1, padding: "11px", background: "#f0f2f7", color: "#6b7494", border: "none", borderRadius: 8, fontWeight: 600, fontSize: 13, cursor: "pointer" }}>Close</button>
              <button onClick={() => { handleApprove(docsTarget); setDocsTarget(null); }} style={{ flex: 2, padding: "11px", background: "#2e7d32", color: "#fff", border: "none", borderRadius: 8, fontWeight: 700, fontSize: 13, cursor: "pointer" }}>✓ Approve from here</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}