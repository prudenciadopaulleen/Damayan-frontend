"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const checklist = [
  {
    title: "Update Emergency Contact List",
    detail: "Ensure all phone numbers and medical info are current for household members.",
    status: "Done",
    done: true,
  },
  {
    title: "Restock 72-Hour Survival Kit",
    detail: "Check expiration dates on canned goods and refresh water supply (4L/person/day).",
    status: "Pending",
    done: false,
  },
  {
    title: "Verify Evacuation Route",
    detail: "Review the secondary route in case the primary highway is inaccessible.",
    status: "Pending",
    done: false,
  },
];

const sidebarLinks = [
  { label: "Home", href: "/citizen/beforecalamity", key: "home" },
  { label: "Risk Map", href: "/citizen/beforecalamity#sector-map", key: "risk-map" },
  { label: "Checklists", href: "/citizen/beforecalamity#checklists", key: "checklists" },
  { label: "Reporting", href: "/citizen/duringcalamity#tickets", key: "reporting" },
  { label: "Support", href: "/citizen/duringcalamity#broadcast", key: "support" },
];

export default function CitizenBeforeCalamityPage() {
  const [activeSidebarItem, setActiveSidebarItem] = useState("home");
  const [showNotificationPrompt, setShowNotificationPrompt] = useState(true);
  const [activeAlert, setActiveAlert] = useState<string | null>(
    "FLASH FLOOD WARNING: Sector 4 expects 20cm surge within 120mins. Acknowledge to receive evacuation route."
  );
  const [registrationType, setRegistrationType] = useState<"Individual" | "Household" | null>(null);
  const [householdMembers, setHouseholdMembers] = useState([{ name: "", age: "" }]);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleAddMember = () => {
    setHouseholdMembers([...householdMembers, { name: "", age: "" }]);
  };

  const handleMemberChange = (index: number, field: "name" | "age", value: string) => {
    const newMembers = [...householdMembers];
    newMembers[index][field] = value;
    setHouseholdMembers(newMembers);
  };

  const handleHouseholdSubmit = () => {
    setRegistrationSuccess(true);
    // In a real app, this is where you'd send to backend
  };

  useEffect(() => {
    function syncActiveSidebarItem() {
      const hash = window.location.hash;
      if (hash === "#sector-map") {
        setActiveSidebarItem("risk-map");
        return;
      }
      if (hash === "#checklists") {
        setActiveSidebarItem("checklists");
        return;
      }
      setActiveSidebarItem("home");
    }

    syncActiveSidebarItem();
    window.addEventListener("hashchange", syncActiveSidebarItem);
    return () => {
      window.removeEventListener("hashchange", syncActiveSidebarItem);
    };
  }, []);

  return (
    <div className="citizen-web-page">
      {/* Notification Permission Overlay */}
      {showNotificationPrompt && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.4)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(4px)" }}>
          <div style={{ backgroundColor: "#fff", padding: "40px", borderRadius: "32px", maxWidth: "450px", textAlign: "center", boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}>
             <div style={{ fontSize: "40px", marginBottom: "20px" }}>🔔</div>
             <h2 style={{ fontSize: "24px", fontWeight: "900", marginBottom: "12px" }}>Enable Alerts?</h2>
             <p style={{ color: "#707a6c", lineHeight: "1.6", marginBottom: "32px" }}>Receive real-time surge warnings and evacuation route changes directly on your desktop.</p>
             <div style={{ display: "flex", gap: "12px" }}>
                <button onClick={() => setShowNotificationPrompt(false)} style={{ flex: 1, padding: "16px", borderRadius: "14px", border: "1px solid #eef1ed", backgroundColor: "#fff", fontWeight: "800", cursor: "pointer" }}>Not Now</button>
                <button onClick={() => setShowNotificationPrompt(false)} style={{ flex: 1, padding: "16px", borderRadius: "14px", border: "none", backgroundColor: "#2e7d32", color: "#fff", fontWeight: "800", cursor: "pointer" }}>Allow Alerts</button>
             </div>
          </div>
        </div>
      )}

      {/* High-Visibility Alert Banner */}
      {activeAlert && (
        <div style={{ backgroundColor: "#ba1a1a", padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", color: "#fff", position: "sticky", top: 0, zIndex: 1000 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div style={{ fontWeight: "900", backgroundColor: "rgba(255,255,255,0.2)", padding: "4px 10px", borderRadius: "6px", fontSize: "12px" }}>CRITICAL ALERT</div>
            <p style={{ fontWeight: "700", fontSize: "14px" }}>{activeAlert}</p>
          </div>
          <button 
            onClick={() => setActiveAlert(null)}
            style={{ backgroundColor: "#fff", color: "#ba1a1a", border: "none", padding: "8px 20px", borderRadius: "10px", fontWeight: "900", fontSize: "13px", cursor: "pointer", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
          >
            ACKNOWLEDGE
          </button>
        </div>
      )}

      <aside className="citizen-web-sidebar">
        <div className="citizen-web-sidebar-brand">
          <h1>Citizen Portal</h1>
          <p>Stay Safe, Stay Informed</p>
        </div>
        <nav className="citizen-web-sidebar-nav" aria-label="Citizen sections">
          {sidebarLinks.map((item, index) => (
            <Link
              key={item.label}
              className={activeSidebarItem === item.key ? "is-active" : undefined}
              href={item.href}
              onClick={() => setActiveSidebarItem(item.key)}
            >
              <span className="citizen-web-nav-icon" aria-hidden="true">
                {index === 0 ? "H" : index === 1 ? "M" : index === 2 ? "C" : index === 3 ? "R" : "S"}
              </span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
        <div className="citizen-web-sidebar-footer">
          <Link className="citizen-web-signout" href="/citizen/login">Sign Out</Link>
        </div>
      </aside>

      <div className="citizen-web-shell">
        <header className="citizen-web-topbar">
          <div className="citizen-web-topbar-inner">
            <div className="citizen-web-topbar-copy">
              <Link className="citizen-web-logo" href="/citizen/beforecalamity">ReliefConnect</Link>
              <p>Preparedness dashboard</p>
            </div>
            <div className="citizen-web-topactions">
              <Link href="/citizen/duringcalamity#broadcast">Alerts</Link>
              <LivingProfileChip />
            </div>
          </div>
        </header>

        <main className="citizen-web-main" id="home">
          {/* Flowchart Step: Registration of Users with QR */}
          {!registrationType && (
            <section style={{ 
              marginBottom: "3rem", 
              padding: "4rem", 
              backgroundColor: "#fff", 
              borderRadius: "2.5rem", 
              border: "1px solid rgba(13, 99, 27, 0.08)", 
              boxShadow: "0 25px 50px rgba(0,0,0,0.04)",
              fontFamily: "'Poppins', sans-serif" 
            }}>
              <div style={{ marginBottom: "2.5rem" }}>
                <h3 style={{ fontSize: "2.2rem", fontWeight: "900", margin: 0, letterSpacing: "-0.04em" }}>Registration of Users with QR</h3>
                <p style={{ color: "#586054", marginTop: "0.6rem", fontSize: "1.1rem", fontWeight: "500" }}>Select your digital identity type to proceed with emergency preparedness.</p>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2.5rem" }}>
                <button 
                  onClick={() => setRegistrationType("Individual")} 
                  style={{ 
                    textAlign: "left", 
                    padding: "3.5rem 3rem", 
                    borderRadius: "2rem", 
                    border: "2px solid #0d631b", 
                    backgroundColor: "#fff", 
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    fontFamily: "inherit",
                    boxShadow: "0 10px 25px rgba(13, 99, 27, 0.04)"
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = "translateY(-5px)";
                    e.currentTarget.style.boxShadow = "0 20px 40px rgba(13, 99, 27, 0.08)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 10px 25px rgba(13, 99, 27, 0.04)";
                  }}
                >
                  <h4 style={{ fontSize: "1.5rem", fontWeight: "900", margin: 0 }}>Register Myself</h4>
                  <p style={{ fontSize: "1rem", color: "#586054", marginTop: "1rem", lineHeight: "1.6" }}>Generate an individual QR ID for personal tracking and rapid shelter check-in.</p>
                </button>
                <button 
                  onClick={() => setRegistrationType("Household")} 
                  style={{ 
                    textAlign: "left", 
                    padding: "3.5rem 3rem", 
                    borderRadius: "2rem", 
                    border: "2px solid #0d631b", 
                    backgroundColor: "#fff", 
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    fontFamily: "inherit",
                    boxShadow: "0 10px 25px rgba(13, 99, 27, 0.04)"
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = "translateY(-5px)";
                    e.currentTarget.style.boxShadow = "0 20px 40px rgba(13, 99, 27, 0.08)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 10px 25px rgba(13, 99, 27, 0.04)";
                  }}
                >
                  <h4 style={{ fontSize: "1.5rem", fontWeight: "900", margin: 0 }}>Register My Family</h4>
                  <p style={{ fontSize: "1rem", color: "#586054", marginTop: "1rem", lineHeight: "1.6" }}>Input self and family members to receive a unified household QR code and cluster aid.</p>
                </button>
              </div>
            </section>
          )}

          {registrationType === "Individual" && (
            <section style={{ marginBottom: "3rem", padding: "3rem", backgroundColor: "#eef4ed", borderRadius: "2rem", textAlign: "center" }}>
               <h3 style={{ fontWeight: "900" }}>Your Individual QR ID is Ready</h3>
               <div style={{ margin: "2rem auto", padding: "20px", background: "#fff", display: "inline-block", borderRadius: "20px" }}>
                  <div style={{ width: "150px", height: "150px", backgroundColor: "#000" }} />
                  <p style={{ fontWeight: "800", marginTop: "10px" }}>IND-992-01</p>
               </div>
               <br />
               <button onClick={() => setRegistrationType(null)} style={{ background: "transparent", border: "none", color: "#0d631b", fontWeight: "800", cursor: "pointer" }}>Change Type</button>
            </section>
          )}

          {registrationType === "Household" && !registrationSuccess && (
            <section style={{ 
              marginBottom: "3rem", 
              padding: "4rem", 
              backgroundColor: "#fefcf6", 
              borderRadius: "2.5rem", 
              border: "1px solid rgba(126, 87, 0, 0.1)",
              fontFamily: "'Poppins', sans-serif"
            }}>
               <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "1rem" }}>
                 <h3 style={{ fontSize: "2rem", fontWeight: "900", margin: 0 }}>Household Member Registration</h3>
                 <button onClick={() => setRegistrationType(null)} style={{ background: "transparent", border: "none", color: "#7e5700", fontWeight: "800", cursor: "pointer", fontSize: "1rem" }}>Back</button>
               </div>
               <p style={{ color: "#586054", fontSize: "1.1rem", marginBottom: "2.5rem" }}>Add all residents in your household to ensure group survival allocations.</p>
               
               <div style={{ display: "grid", gap: "1.25rem" }}>
                  {householdMembers.map((member, index) => (
                    <div key={index} style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "1.5rem", animation: "fadeIn 0.3s ease" }}>
                      <input 
                        type="text" 
                        placeholder="Full Name" 
                        value={member.name}
                        onChange={(e) => handleMemberChange(index, "name", e.target.value)}
                        style={{ padding: "1.25rem 1.5rem", borderRadius: "1.25rem", border: "1px solid #eef1ed", fontSize: "1rem", outline: "none", transition: "all 0.2s" }} 
                      />
                      <input 
                        type="number" 
                        placeholder="Age" 
                        value={member.age}
                        onChange={(e) => handleMemberChange(index, "age", e.target.value)}
                        style={{ padding: "1.25rem 1.5rem", borderRadius: "1.25rem", border: "1px solid #eef1ed", fontSize: "1rem", outline: "none" }} 
                      />
                    </div>
                  ))}
                  
                  <button 
                    onClick={handleAddMember}
                    style={{ 
                      padding: "1.25rem", 
                      borderRadius: "1.25rem", 
                      border: "2px dashed rgba(112, 122, 108, 0.3)", 
                      color: "#586054", 
                      background: "transparent", 
                      fontWeight: "700", 
                      cursor: "pointer",
                      fontSize: "1rem",
                      transition: "all 0.2s"
                    }}
                    onMouseOver={(e) => e.currentTarget.style.borderColor = "#0d631b"}
                    onMouseOut={(e) => e.currentTarget.style.borderColor = "rgba(112, 122, 108, 0.3)"}
                  >
                    + Add Another Member
                  </button>

                  <button 
                    onClick={handleHouseholdSubmit} 
                    style={{ 
                      padding: "1.5rem", 
                      borderRadius: "1.25rem", 
                      background: "#0d631b", 
                      color: "#fff", 
                      fontWeight: "900", 
                      border: "none", 
                      fontSize: "1.1rem",
                      cursor: "pointer",
                      marginTop: "1rem",
                      boxShadow: "0 10px 20px rgba(13, 99, 27, 0.2)"
                    }}
                  >
                    Submit Household Details
                  </button>
               </div>
            </section>
          )}

          {registrationSuccess && (
            <section style={{ 
              marginBottom: "3rem", 
              padding: "4rem", 
              backgroundColor: "#eef4ed", 
              borderRadius: "2.5rem", 
              textAlign: "center",
              fontFamily: "'Poppins', sans-serif"
            }}>
               <div style={{ backgroundColor: "#0d631b", width: "64px", height: "64px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "24px", margin: "0 auto 24px" }}>✓</div>
               <h3 style={{ fontSize: "2rem", fontWeight: "900", margin: "0 0 1rem" }}>Your Household QR ID is Ready</h3>
               <div style={{ margin: "2rem auto", padding: "2rem", background: "#fff", display: "inline-block", borderRadius: "2rem", boxShadow: "0 20px 40px rgba(0,0,0,0.05)" }}>
                  <div style={{ width: "160px", height: "160px", backgroundColor: "#000", position: "relative" }}>
                     <div style={{ position: "absolute", top: "10px", left: "10px", right: "10px", bottom: "10px", border: "8px solid #fff", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridTemplateRows: "repeat(3, 1fr)", gap: "5px" }}>
                        {[...Array(9)].map((_, i) => <div key={i} style={{ backgroundColor: i % 2 === 0 ? "#fff" : "transparent" }} />)}
                     </div>
                  </div>
                  <p style={{ fontWeight: "900", marginTop: "1.5rem", fontSize: "1.1rem", letterSpacing: "2px" }}>FAM-CLUSTER-04</p>
               </div>
               <br />
               <button 
                 onClick={() => { setRegistrationSuccess(false); setRegistrationType(null); }} 
                 style={{ background: "transparent", border: "none", color: "#0d631b", fontWeight: "800", cursor: "pointer", marginTop: "1rem" }}
               >
                 Register Another Cluster
               </button>
            </section>
          )}

          <section className="citizen-web-hero">
            <div className="citizen-web-hero-media" aria-hidden="true"><div className="citizen-web-hero-overlay" /></div>
            <div className="citizen-web-hero-content">
              <div className="citizen-web-status-pill"><span className="citizen-web-status-dot" /><span>Active Status: Stable</span></div>
              <h2>Low-Risk<br /><span>Condition.</span></h2>
              <p>No immediate environmental threats detected in your primary zone. Current preparedness phase: Maintenance and Education.</p>
              <Link className="citizen-web-primary-action" href="#checklists">Update Plan<span aria-hidden="true">+</span></Link>
            </div>
          </section>

          <section className="citizen-web-editorial">
            <div className="citizen-web-left-column">
              <section className="citizen-web-section-block" id="checklists">
                <div className="citizen-web-section-head">
                  <div><h3>Ready-Check</h3><p>Monthly Preparedness Audit</p></div>
                  <span>01/03</span>
                </div>
                <div className="citizen-web-checklist">
                  {checklist.map((item) => (
                    <article className="citizen-web-checkitem" key={item.title}>
                      <div className={`citizen-web-checkmark ${item.done ? "is-done" : ""}`}>{item.done ? "OK" : ""}</div>
                      <div className="citizen-web-checkcopy"><h4>{item.title}</h4><p>{item.detail}</p></div>
                      <span className={`citizen-web-checkstatus ${item.done ? "is-done" : "is-pending"}`}>{item.status}</span>
                    </article>
                  ))}
                </div>
              </section>

              <section className="citizen-web-section-block" id="household">
                <h3 className="citizen-web-simple-head">Household</h3>
                <div className="citizen-web-household-grid">
                  <article className="citizen-web-household-card">
                    <div className="citizen-web-household-icon">GH</div>
                    <Link href="#household">Edit</Link>
                    <div><strong>4 Members</strong><p>Profile: Active</p></div>
                  </article>
                  <article className="citizen-web-household-card">
                    <div className="citizen-web-household-icon is-secondary">PT</div>
                    <Link href="#household">Add</Link>
                    <div><strong>2 Animals</strong><p>Care-plan Required</p></div>
                  </article>
                </div>
              </section>
            </div>

            <div className="citizen-web-right-column">
              <section className="citizen-web-weather-card" id="weather">
                <div className="citizen-web-weather-symbol">SUN</div>
                <div className="citizen-web-weather-top"><span>Atmospheric Status</span></div>
                <div className="citizen-web-weather-main">
                  <div className="citizen-web-weather-temp">24C</div>
                  <div><strong>Partly Cloudy</strong><p>Clear visibility (12km)</p></div>
                </div>
                <div className="citizen-web-weather-stats">
                  <div><span>Wind Velocity</span><strong>12 km/h NW</strong></div>
                  <div><span>Precipitation</span><strong>2% Prob.</strong></div>
                  <div><span>UV Index</span><strong>4 (Moderate)</strong></div>
                </div>
              </section>

              <section className="citizen-web-map-card" id="sector-map">
                <div className="citizen-web-map-label"><span>Current Sector</span><strong>West District, Zone 4</strong></div>
                <div className="citizen-web-map-surface"><div className="citizen-web-map-grid" /></div>
                <Link className="citizen-web-map-route" href="/citizen/duringcalamity">
                  <div><strong>1.2km to Nearest Shelter</strong><p>Route: Clear - 15min Walk</p></div>
                  <span>GO</span>
                </Link>
              </section>
            </div>
          </section>

          <footer className="citizen-web-footer-actions">
            <Link className="is-primary" href="/citizen/duringcalamity">Open Response</Link>
          </footer>
        </main>
      </div>
      <button className="citizen-web-support-fab">Help</button>
    </div>
  );
}

function LivingProfileChip() {
  return (
    <Link className="citizen-web-profile-chip" href="/citizen/beforecalamity">
      <span className="citizen-web-profile-avatar">CP</span>
      <span className="citizen-web-profile-copy">
        <strong>Citizen</strong>
        <small>Profile</small>
      </span>
    </Link>
  );
}
