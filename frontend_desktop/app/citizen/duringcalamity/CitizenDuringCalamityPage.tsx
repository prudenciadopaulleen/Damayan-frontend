"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const sidebarLinks = [
  { label: "Home", href: "/citizen/beforecalamity", key: "home" },
  { label: "Risk Map", href: "/citizen/duringcalamity", key: "risk-map" },
  { label: "Checklists", href: "/citizen/beforecalamity#checklists", key: "checklists" },
  { label: "Reporting", href: "/citizen/duringcalamity#tickets", key: "reporting" },
  { label: "Support", href: "/citizen/duringcalamity#broadcast", key: "support" },
];

const tickets = [
  {
    icon: "MED",
    status: "Ready",
    title: "Medical Kit (Essential)",
    detail: "Ticket ID: #REL-4029",
    meta: "Distribution Point A",
    action: "QR",
    tone: "primary",
  },
  {
    icon: "WTR",
    status: "Queued",
    title: "Potable Water (4L)",
    detail: "Ticket ID: #REL-4055",
    meta: "ETA: 45 Mins",
    action: "ETA",
    tone: "secondary",
  },
];

export default function CitizenDuringCalamityPage() {
  const [activeSidebarItem, setActiveSidebarItem] = useState("risk-map");
  
  // Flowchart State - Linear Operational Flow
  type FlowStep = 
    | "INITIAL"           // Is in need of immediate rescue?
    | "INTERNET_CHECK"    // Is internet available?
    | "REPORTING_FORM"    // Upload Photo & Location
    | "SMS_GATEWAY"       // Generate & Send SMS
    | "WAIT_RESCUE"       // Receive Confirmation -> Wait
    | "SELF_EVACTUATE"    // View Safe Zone Map -> Navigate
    | "SITE_ARRIVAL"      // Arrive at Site -> Present Credentials
    | "QR_PRESENTATION";  // Show Individual/Family QR

  const [flowStep, setFlowStep] = useState<FlowStep>("INITIAL");
  const [hasInternet, setHasInternet] = useState(true);
  const [identityType, setIdentityType] = useState<"INDIVIDUAL" | "FAMILY" | null>(null);
  const [startLocation, setStartLocation] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [mapOffset, setMapOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - mapOffset.x,
      y: e.clientY - mapOffset.y,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setMapOffset({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  useEffect(() => {
    const hash = window.location.hash;

    if (hash === "#tickets") {
      setActiveSidebarItem("reporting");
      return;
    }

    if (hash === "#broadcast") {
      setActiveSidebarItem("support");
      return;
    }

    setActiveSidebarItem("risk-map");
  }, []);

  return (
    <div className="citizen-response-page">
      <aside className="citizen-response-sidebar">
        <div className="citizen-response-sidebar-brand">
          <h1>Citizen Portal</h1>
          <p>Stay Safe, Stay Informed</p>
        </div>

        <nav className="citizen-response-sidebar-nav" aria-label="Citizen sections">
          {sidebarLinks.map((item, index) => (
            <Link
              key={item.label}
              className={activeSidebarItem === item.key ? "is-active" : undefined}
              href={item.href}
              onClick={() => {
                if (item.key === "reporting" || item.key === "support" || item.key === "risk-map") {
                  setActiveSidebarItem(item.key);
                }
              }}
            >
              <span className="citizen-response-nav-icon" aria-hidden="true">
                {index === 0
                  ? "H"
                  : index === 1
                    ? "M"
                    : index === 2
                      ? "C"
                      : index === 3
                        ? "R"
                        : "S"}
              </span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="citizen-response-sidebar-footer">
          <Link className="citizen-response-signout" href="/citizen/login">
            Sign Out
          </Link>
        </div>
      </aside>

      <div className="citizen-response-shell">
        <header className="citizen-response-topbar">
          <div className="citizen-response-topbar-inner">
            <div className="citizen-response-brand-side">
              <Link className="citizen-response-logo" href="/citizen/duringcalamity">
                DAMAYAN
              </Link>
              <p className="citizen-response-topbar-label">Emergency response dashboard</p>
            </div>

            <div className="citizen-response-actions">
              <Link className="is-sos" href="#broadcast">
                Trigger SOS
              </Link>
              <Link className="is-report" href="#tickets">
                Report Incident
              </Link>
              <div className="citizen-response-meta-actions">
                <Link href="#broadcast">Alerts</Link>
                <Link
                  className="citizen-response-profile-chip"
                  href="/citizen/beforecalamity"
                  aria-label="Open citizen profile"
                >
                  <span className="citizen-response-profile-avatar" aria-hidden="true">
                    CP
                  </span>
                  <span className="citizen-response-profile-copy">
                    <strong>Citizen</strong>
                    <small>Profile</small>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </header>

        <main className={`citizen-response-main ${flowStep === "INITIAL" || flowStep === "INTERNET_CHECK" ? "is-flow-active" : ""}`}>
          <div className="citizen-response-workspace">
            <section className="citizen-response-map-zone">
              {/* Persistent Background Layer */}
              <div 
                className={`citizen-response-map-surface ${flowStep !== "SELF_EVACTUATE" ? "is-blurred" : ""}`} 
                aria-hidden="true"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
              >
                <div 
                   className="citizen-response-map-image is-highlighted" 
                   style={{ 
                     transform: `translate(${mapOffset.x}px, ${mapOffset.y}px) scale(${zoomLevel})` 
                   }}
                />
              </div>

              {/* Directional & Zoom HUD Overlays - ALWAYS ON TOP (z-index 50) */}
              <div className="citizen-response-map-hud" style={{ zIndex: 50 }}>
                <div className="hud-zoom-controls">
                  <button onClick={() => setZoomLevel(prev => Math.min(prev + 0.2, 3))}>+</button>
                  <button onClick={() => setZoomLevel(prev => Math.max(prev - 0.2, 0.5))}>-</button>
                </div>
                
                <div className="hud-compass">
                  <span className="compass-n">N</span>
                  <span className="compass-e">E</span>
                  <span className="compass-s">S</span>
                  <span className="compass-w">W</span>
                </div>
              </div>

              {/* Linear Operational Flow Overlays */}
              {flowStep === "INITIAL" && (
                <div className="citizen-flow-overlay">
                  <div className="citizen-flow-card">
                    <span className="citizen-flow-badge">Operational Flow</span>
                    <h2>Is in need of immediate rescue?</h2>
                    <p>Select your condition to prioritize system resources and coordinate with emergency teams.</p>
                    <div className="citizen-flow-actions">
                      <button className="btn-rescue" onClick={() => setFlowStep("INTERNET_CHECK")}>
                         <strong>Yes</strong>
                         <span>Immediate Help</span>
                      </button>
                      <button className="btn-evacuate" onClick={() => setFlowStep("SELF_EVACTUATE")}>
                         <strong>No</strong>
                         <span>Self-Evacuate</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {flowStep === "INTERNET_CHECK" && (
                <div className="citizen-flow-overlay">
                  <div className="citizen-flow-card">
                    <h2>Is Internet Available?</h2>
                    <p>We need to determine the best method to transmit your location data to rescue teams.</p>
                    <div className="citizen-flow-actions">
                      <button className="btn-rescue" onClick={() => { setHasInternet(true); setFlowStep("REPORTING_FORM"); }}>
                         <strong>Yes</strong>
                         <span>Mobile Data / Wi-Fi</span>
                      </button>
                      <button className="btn-evacuate" onClick={() => { setHasInternet(false); setFlowStep("SMS_GATEWAY"); }}>
                         <strong>No</strong>
                         <span>SMS Signal Only</span>
                      </button>
                    </div>
                    <button className="btn-text-only" onClick={() => setFlowStep("INITIAL")}>Back to Decision</button>
                  </div>
                </div>
              )}

              {flowStep === "REPORTING_FORM" && (
                <div className="citizen-flow-overlay">
                  <div className="citizen-flow-card">
                    <h2>Upload Photo & Location</h2>
                    <p>Confirm your surroundings to help rescuers identify your exact position.</p>
                    <div 
                       className="report-upload-box" 
                       onClick={() => document.getElementById("file-upload")?.click()}
                       onDragOver={(e) => e.preventDefault()}
                       onDrop={handleDrop}
                    >
                       <input type="file" id="file-upload" style={{ display: "none" }} onChange={handleFileChange} />
                       {selectedFile ? (
                         <div className="selected-file-info">
                            <strong>{selectedFile.name}</strong>
                            <span>Ready to transmit</span>
                         </div>
                       ) : (
                         <span>Drop image here or click to upload</span>
                       )}
                    </div>
                    <button className="btn-submit-flow" disabled={!selectedFile} onClick={() => setFlowStep("WAIT_RESCUE")}>Send Live Report</button>
                    <button className="btn-text-only" onClick={() => setFlowStep("INTERNET_CHECK")}>Back</button>
                  </div>
                </div>
              )}

              {flowStep === "SMS_GATEWAY" && (
                <div className="citizen-flow-overlay">
                  <div className="citizen-flow-card">
                    <h2>Generate SMS Code</h2>
                    <p>Copy this emergency packet and send it to our gateway at <strong>#8888</strong> or <strong>+63 917 123 4567</strong>.</p>
                    <div className="sms-sim-box">
                       <code>DAMAYAN:RESCUE:14.599,120.984:USER_ID_992</code>
                       <button className="btn-copy-code" onClick={() => alert("Code Copied!")}>Copy Code</button>
                    </div>
                    <button className="btn-submit-flow" onClick={() => setFlowStep("WAIT_RESCUE")}>Send via SMS</button>
                    <button className="btn-text-only" onClick={() => setFlowStep("INTERNET_CHECK")}>Back</button>
                  </div>
                </div>
              )}

              {flowStep === "WAIT_RESCUE" && (
                <div className="citizen-flow-overlay">
                  <div className="citizen-flow-card is-success">
                    <div className="success-icon">✓</div>
                    <h2>Report Transmitted</h2>
                    <p>Receive Delivery Confirmation. Your status is now "Queued for Rescue". Stay calm and wait for the extraction team.</p>
                    <div className="status-badge">RESCUE ETA: 12 MINS</div>
                    <button className="btn-submit-flow" onClick={() => setFlowStep("SELF_EVACTUATE")}>View Live Status Map</button>
                  </div>
                </div>
              )}

              {flowStep === "SELF_EVACTUATE" && (
                <div className="citizen-response-evacuation-flow">
                   <div className="citizen-response-nav-input">
                      <h3>Self-Evacuation Path</h3>
                      <div className="input-group">
                         <label>Navigate User to Evacuation Site</label>
                         <input 
                           type="text" 
                           placeholder="Finding nearest safe hub..." 
                           value="Unity High Gymnasium (Shelter A)"
                           readOnly
                         />
                         <button className="btn-navigate" onClick={() => setFlowStep("SITE_ARRIVAL")}>Mark as Arrived</button>
                      </div>
                   </div>
                   
                   <div className="citizen-response-map-label">
                     <span>SAFE ZONE MAP</span>
                     <h4>Sector 4 Evacuation Hub</h4>
                     <p>Status: Active Reception</p>
                   </div>
                </div>
              )}

              {flowStep === "SITE_ARRIVAL" && (
                <div className="citizen-flow-overlay">
                   <div className="citizen-flow-card">
                      <span className="citizen-flow-badge">Arrival at Site</span>
                      <h2>Present Credentials</h2>
                      <p>Show your Digital QR/ID to the site manage to log into the system and access relief supplies.</p>
                      
                      <div className="identity-prompt">
                         <h4>Is the QR for:</h4>
                         <div className="identity-choices">
                            <button className={identityType === "INDIVIDUAL" ? "is-selected" : ""} onClick={() => setIdentityType("INDIVIDUAL")}>Individual</button>
                            <button className={identityType === "FAMILY" ? "is-selected" : ""} onClick={() => setIdentityType("FAMILY")}>Family/Household</button>
                         </div>
                      </div>

                      <button className="btn-submit-flow" disabled={!identityType} onClick={() => setFlowStep("QR_PRESENTATION")}>Present QR ID</button>
                   </div>
                </div>
              )}

              {flowStep === "QR_PRESENTATION" && (
                <div className="citizen-flow-overlay">
                   <div className="citizen-flow-card qr-view">
                      <div className="qr-container">
                         <div className="qr-image" />
                      </div>
                      <h3>{identityType === "INDIVIDUAL" ? "Individual Logged Into System" : "Family Logged Into System"}</h3>
                      <p>Check-in confirmed. You are now registered at Shelter A.</p>
                      <button className="btn-submit-flow" onClick={() => setFlowStep("INITIAL")}>Return to Dashboard</button>
                   </div>
                </div>
              )}

              {/* Keep map cards as overlay if evacuating */}
              {flowStep === "SELF_EVACTUATE" && (
                <div className="citizen-response-map-cards" id="map-cards">
                  <Link className="citizen-response-map-card is-primary" href="#broadcast">
                    <div className="citizen-response-map-icon">SH</div>
                    <div className="citizen-response-map-copy">
                      <span>Nearest Shelter</span>
                      <h4>Unity High Gymnasium</h4>
                      <p>850m - 12 min walk</p>
                    </div>
                    <strong>Go</strong>
                  </Link>

                  <Link className="citizen-response-map-card is-secondary" href="#broadcast">
                    <div className="citizen-response-map-icon">HZ</div>
                    <div className="citizen-response-map-copy">
                      <span>Active Hazard</span>
                      <h4>Rising Flood Level</h4>
                      <p>Verdant Relief Alert Zone</p>
                    </div>
                    <strong>Info</strong>
                  </Link>
                </div>
              )}
            </section>

            <aside className={`citizen-response-sidepanel ${["INITIAL", "INTERNET_CHECK", "REPORTING_FORM", "SMS_GATEWAY"].includes(flowStep) ? "is-hidden" : ""}`}>
              <section className="citizen-response-ticket-panel" id="tickets">
                <h3>Active Tickets</h3>

                <div className="citizen-response-ticket-list">
                  {tickets.map((ticket) => (
                    <article
                      key={ticket.title}
                      className={`citizen-response-ticket is-${ticket.tone}`}
                    >
                      <div className="citizen-response-ticket-head">
                        <span className="citizen-response-ticket-icon">
                          {ticket.icon}
                        </span>
                        <strong>{ticket.status}</strong>
                      </div>
                      <h4>{ticket.title}</h4>
                      <p>{ticket.detail}</p>

                      <div className="citizen-response-ticket-meta">
                        <span>{ticket.meta}</span>
                        <b>{ticket.action}</b>
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              <section className="citizen-response-broadcast" id="broadcast">
                <h4>System Broadcast</h4>
                <p>
                  Flood evacuation phase 2 has commenced. Proceed to Unity High
                  Gymnasium if water levels reach threshold marker.
                </p>
              </section>
            </aside>
          </div>

          <section className="citizen-response-footer-actions">
            <Link href="/citizen/beforecalamity">Back To Prepare</Link>
          </section>
        </main>
      </div>

      <nav className="citizen-response-mobile-nav">
        <Link href="/citizen/beforecalamity">Home</Link>
        <Link className="is-active" href="/citizen/duringcalamity">
          Risk Map
        </Link>
        <Link href="#broadcast">SOS</Link>
        <Link href="#tickets">Tasks</Link>
        <Link href="/citizen/login">Profile</Link>
      </nav>
    </div>
  );
}
