import { useState } from "react";

const API = "https://prd-studio-7r66.onrender.com";

// ── Styles ────────────────────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=JetBrains+Mono:wght@300;400;500&family=DM+Sans:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --ink: #0a0a0b;
    --ink-2: #111114;
    --ink-3: #1a1a1f;
    --ink-4: #252530;
    --border: #2a2a35;
    --muted: #55555f;
    --text: #c8c8d4;
    --text-bright: #eeeef5;
    --gold: #d4a847;
    --gold-dim: #8a6b28;
    --gold-glow: rgba(212,168,71,0.15);
    --green: #4caf7d;
    --red: #e05c5c;
    --blue: #5c8de0;
    --radius: 4px;
    --transition: 180ms cubic-bezier(0.4,0,0.2,1);
  }

  html { font-size: 14px; }

  body {
    background: var(--ink);
    color: var(--text);
    font-family: 'DM Sans', sans-serif;
    min-height: 100vh;
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
  }

  /* ── Layout ── */
  .app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    max-width: 1100px;
    margin: 0 auto;
    padding: 0 24px;
  }

  /* ── Header ── */
  .header {
    border-bottom: 1px solid var(--border);
    padding: 28px 0 22px;
    display: flex;
    align-items: baseline;
    gap: 16px;
    position: sticky;
    top: 0;
    background: var(--ink);
    z-index: 100;
  }
  .header-logo {
    font-family: 'Playfair Display', serif;
    font-size: 1.5rem;
    color: var(--text-bright);
    letter-spacing: -0.02em;
  }
  .header-logo span { color: var(--gold); }
  .header-tag {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.65rem;
    color: var(--muted);
    letter-spacing: 0.15em;
    text-transform: uppercase;
    border: 1px solid var(--border);
    padding: 3px 8px;
    border-radius: 2px;
  }
  .header-step-trail {
    margin-left: auto;
    display: flex;
    align-items: center;
    gap: 6px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.65rem;
    color: var(--muted);
  }
  .step-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: var(--border);
    transition: background var(--transition);
  }
  .step-dot.active { background: var(--gold); }
  .step-dot.done { background: var(--green); }

  /* ── Main Content ── */
  .main { flex: 1; padding: 48px 0 80px; }

  /* ── Cards / Panels ── */
  .card {
    background: var(--ink-2);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 32px;
    animation: fadeUp 0.3s ease both;
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* ── Section Title ── */
  .section-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.75rem;
    color: var(--text-bright);
    margin-bottom: 8px;
  }
  .section-sub {
    color: var(--muted);
    font-size: 0.85rem;
    margin-bottom: 32px;
  }

  /* ── Form ── */
  .form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }
  .form-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .form-group.full { grid-column: 1 / -1; }
  .form-label {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.65rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--muted);
  }
  .form-input, .form-textarea {
    background: var(--ink-3);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    color: var(--text-bright);
    font-family: 'DM Sans', sans-serif;
    font-size: 0.9rem;
    padding: 12px 14px;
    outline: none;
    resize: none;
    transition: border-color var(--transition), box-shadow var(--transition);
  }
  .form-input:focus, .form-textarea:focus {
    border-color: var(--gold-dim);
    box-shadow: 0 0 0 3px var(--gold-glow);
  }
  .form-textarea { min-height: 100px; }

  /* ── Buttons ── */
  .btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 11px 20px;
    border-radius: var(--radius);
    border: none;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.85rem;
    font-weight: 500;
    transition: all var(--transition);
    white-space: nowrap;
    text-decoration: none;
  }
  .btn:disabled { opacity: 0.4; cursor: not-allowed; }

  .btn-primary {
    background: var(--gold);
    color: #0a0a0b;
    font-weight: 600;
  }
  .btn-primary:hover:not(:disabled) {
    background: #e0b85a;
    box-shadow: 0 0 20px var(--gold-glow);
  }

  .btn-outline {
    background: transparent;
    border: 1px solid var(--border);
    color: var(--text);
  }
  .btn-outline:hover:not(:disabled) {
    border-color: var(--muted);
    color: var(--text-bright);
  }

  .btn-ghost {
    background: transparent;
    color: var(--muted);
    padding: 8px 12px;
  }
  .btn-ghost:hover:not(:disabled) { color: var(--text-bright); }

  .btn-danger {
    background: transparent;
    border: 1px solid rgba(224,92,92,0.3);
    color: var(--red);
  }
  .btn-danger:hover:not(:disabled) {
    background: rgba(224,92,92,0.08);
    border-color: var(--red);
  }

  .btn-success {
    background: rgba(76,175,125,0.15);
    border: 1px solid rgba(76,175,125,0.3);
    color: var(--green);
  }
  .btn-success:hover:not(:disabled) {
    background: rgba(76,175,125,0.25);
  }

  .btn-lg { padding: 14px 28px; font-size: 0.95rem; }

  /* ── Progress Bar ── */
  .progress-wrap {
    margin-bottom: 32px;
  }
  .progress-label {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.65rem;
    color: var(--muted);
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }
  .progress-track {
    height: 2px;
    background: var(--border);
    border-radius: 1px;
    overflow: hidden;
  }
  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--gold-dim), var(--gold));
    border-radius: 1px;
    transition: width 0.5s cubic-bezier(0.4,0,0.2,1);
  }

  /* ── Section Navigator ── */
  .section-nav {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
    margin-bottom: 24px;
  }
  .section-chip {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.6rem;
    padding: 4px 10px;
    border-radius: 2px;
    border: 1px solid var(--border);
    color: var(--muted);
    cursor: pointer;
    transition: all var(--transition);
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }
  .section-chip:hover { border-color: var(--muted); color: var(--text); }
  .section-chip.active {
    border-color: var(--gold-dim);
    color: var(--gold);
    background: var(--gold-glow);
  }
  .section-chip.done { border-color: #2a4a38; color: var(--green); }

  /* ── Review Panel ── */
  .review-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 6px;
  }
  .review-section-label {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.65rem;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: var(--gold);
    border: 1px solid var(--gold-dim);
    padding: 3px 10px;
    border-radius: 2px;
    background: var(--gold-glow);
  }
  .review-index {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.7rem;
    color: var(--muted);
  }
  .review-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.5rem;
    color: var(--text-bright);
    margin-bottom: 24px;
    line-height: 1.2;
  }

  .content-box {
    background: var(--ink-3);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 24px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.8rem;
    line-height: 1.8;
    color: var(--text);
    white-space: pre-wrap;
    max-height: 380px;
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: var(--border) transparent;
    margin-bottom: 24px;
  }

  /* ── Action Row ── */
  .action-row {
    display: flex;
    gap: 10px;
    align-items: center;
    flex-wrap: wrap;
  }
  .action-divider {
    width: 1px;
    height: 24px;
    background: var(--border);
  }

  /* ── Feedback Panel ── */
  .feedback-panel {
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px solid var(--border);
    animation: fadeUp 0.2s ease;
  }
  .feedback-label {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.65rem;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: var(--muted);
    margin-bottom: 10px;
  }
  .feedback-row {
    display: flex;
    gap: 10px;
    align-items: flex-start;
  }
  .feedback-input {
    flex: 1;
    background: var(--ink-3);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    color: var(--text-bright);
    font-family: 'DM Sans', sans-serif;
    font-size: 0.88rem;
    padding: 11px 14px;
    outline: none;
    resize: none;
    min-height: 80px;
    transition: border-color var(--transition), box-shadow var(--transition);
  }
  .feedback-input:focus {
    border-color: var(--blue);
    box-shadow: 0 0 0 3px rgba(92,141,224,0.12);
  }

  /* ── Loading Spinner ── */
  .loader {
    display: inline-block;
    width: 16px;
    height: 16px;
    border: 2px solid rgba(212,168,71,0.3);
    border-top-color: var(--gold);
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  .loading-block {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    padding: 60px 0;
  }
  .loading-text {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.7rem;
    color: var(--muted);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    animation: pulse 1.5s ease-in-out infinite;
  }
  .loader-lg {
    width: 36px; height: 36px;
    border-width: 3px;
  }
  @keyframes pulse {
    0%, 100% { opacity: 0.4; }
    50% { opacity: 1; }
  }

  /* ── Completed PRD ── */
  .completed-banner {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px 20px;
    background: rgba(76,175,125,0.08);
    border: 1px solid rgba(76,175,125,0.25);
    border-radius: var(--radius);
    margin-bottom: 28px;
  }
  .completed-icon {
    width: 28px; height: 28px;
    background: rgba(76,175,125,0.2);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .completed-banner h3 {
    color: var(--green);
    font-size: 0.9rem;
    font-weight: 600;
  }
  .completed-banner p {
    color: var(--muted);
    font-size: 0.8rem;
  }

  .prd-sections {
    display: flex;
    flex-direction: column;
    gap: 2px;
    margin-bottom: 32px;
  }
  .prd-section-item {
    border: 1px solid var(--border);
    border-radius: var(--radius);
    overflow: hidden;
  }
  .prd-section-header {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px 20px;
    cursor: pointer;
    background: var(--ink-2);
    transition: background var(--transition);
  }
  .prd-section-header:hover { background: var(--ink-3); }
  .prd-section-num {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.6rem;
    color: var(--muted);
    width: 24px;
  }
  .prd-section-name {
    font-size: 0.88rem;
    font-weight: 500;
    color: var(--text-bright);
    flex: 1;
  }
  .prd-chevron {
    color: var(--muted);
    font-size: 0.7rem;
    transition: transform 0.2s;
  }
  .prd-chevron.open { transform: rotate(180deg); }
  .prd-section-body {
    background: var(--ink-3);
    padding: 20px;
    border-top: 1px solid var(--border);
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.78rem;
    line-height: 1.8;
    color: var(--text);
    white-space: pre-wrap;
  }

  /* ── Email Step ── */
  .email-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 16px;
    min-height: 36px;
  }
  .email-tag {
    display: flex;
    align-items: center;
    gap: 6px;
    background: var(--ink-3);
    border: 1px solid var(--border);
    border-radius: 2px;
    padding: 4px 10px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.72rem;
    color: var(--text);
    animation: fadeUp 0.2s ease;
  }
  .email-tag-remove {
    background: none;
    border: none;
    color: var(--muted);
    cursor: pointer;
    font-size: 1rem;
    line-height: 1;
    padding: 0;
    transition: color var(--transition);
  }
  .email-tag-remove:hover { color: var(--red); }
  .email-input-row {
    display: flex;
    gap: 10px;
  }

  /* ── Error ── */
  .error-bar {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px 16px;
    background: rgba(224,92,92,0.08);
    border: 1px solid rgba(224,92,92,0.25);
    border-radius: var(--radius);
    color: var(--red);
    font-size: 0.85rem;
    margin-bottom: 20px;
    animation: fadeUp 0.2s ease;
  }

  /* ── Sent Success ── */
  .sent-card {
    text-align: center;
    padding: 60px 32px;
  }
  .sent-icon {
    width: 64px; height: 64px;
    background: rgba(76,175,125,0.12);
    border: 1px solid rgba(76,175,125,0.3);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 24px;
    font-size: 1.8rem;
  }
  .sent-card h2 {
    font-family: 'Playfair Display', serif;
    font-size: 1.75rem;
    color: var(--text-bright);
    margin-bottom: 8px;
  }
  .sent-card p { color: var(--muted); font-size: 0.9rem; }

  /* ── Scrollbar ── */
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 3px; }
  ::-webkit-scrollbar-thumb:hover { background: var(--muted); }
`;

// ── Constants ─────────────────────────────────────────────────────────────────
const PRD_SECTIONS = [
  "Executive Summary","Problem Statement","Goals and Non-Goals",
  "User Personas","User Stories","Functional Requirements",
  "Non-Functional Requirements","Success Metrics","Risks and Assumptions"
];

// ── Helpers ───────────────────────────────────────────────────────────────────
const Loader = ({ large }) => (
  <span className={`loader ${large ? "loader-lg" : ""}`} />
);

const steps = ["Brief", "Review", "Send"];

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [phase, setPhase] = useState("form");
  // form | generating | reviewing | completed | sending | sent
  const [form, setForm] = useState({ idea: "", target_users: "", problem: "" });
  const [threadId, setThreadId] = useState(null);
  const [review, setReview] = useState(null); // { section, content, message }
  const [sections, setSections] = useState({});
  const [completedSections, setCompletedSections] = useState({});
  const [feedback, setFeedback] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openSection, setOpenSection] = useState(null);
  const [emails, setEmails] = useState([]);
  const [emailInput, setEmailInput] = useState("");
  const [sendingEmail, setSendingEmail] = useState(false);

  const currentSectionIndex = review
    ? PRD_SECTIONS.indexOf(review.section)
    : -1;

  const stepIndex = phase === "form" || phase === "generating" ? 0
    : phase === "reviewing" ? 1
    : phase === "completed" ? 1
    : 2;

  // ── API Calls ──
  const startPRD = async () => {
    if (!form.idea.trim() || !form.target_users.trim() || !form.problem.trim()) {
      setError("Please fill in all three fields before generating the PRD.");
      return;
    }
    setError(null);
    setLoading(true);
    setPhase("generating");
    try {
      const res = await fetch(`${API}/start`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      setThreadId(data.thread_id);
      if (data.status === "waiting_review") {
        setReview(data.review);
        setPhase("reviewing");
      } else if (data.status === "completed") {
        setCompletedSections(data.prd || {});
        setPhase("completed");
      }
    } catch (e) {
      setError("Failed to connect to the API. Is the backend running?");
      setPhase("form");
    } finally {
      setLoading(false);
    }
  };

  const resume = async (act, fb = null) => {
    setError(null);
    setLoading(true);
    setShowFeedback(false);
    setFeedback("");
    try {
      const res = await fetch(`${API}/resume`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ thread_id: threadId, action: act, feedback: fb }),
      });
      const data = await res.json();
      if (data.status === "waiting_review") {
        // Track completed section
        if (act === "approve" && review) {
          setSections(prev => ({ ...prev, [review.section]: review.content }));
        }
        setReview(data.review);
        setPhase("reviewing");
      } else if (data.status === "completed") {
        if (act === "approve" && review) {
          setSections(prev => ({ ...prev, [review.section]: review.content }));
        }
        const allSections = { ...sections };
        if (act === "approve" && review) allSections[review.section] = review.content;
        setCompletedSections({ ...allSections, ...(data.prd || {}) });
        setPhase("completed");
      }
    } catch (e) {
      setError("Request failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const sendEmail = async () => {
    if (emails.length === 0) { setError("Add at least one email address."); return; }
    setError(null);
    setSendingEmail(true);
    try {
      const res = await fetch(`${API}/send-prd`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ thread_id: threadId, emails }),
      });
      const data = await res.json();
      if (data.status === "sent") {
        setPhase("sent");
      } else {
        setError(data.message || "Failed to send email.");
      }
    } catch (e) {
      setError("Failed to send. Check your email configuration.");
    } finally {
      setSendingEmail(false);
    }
  };

  const addEmail = () => {
    const e = emailInput.trim().toLowerCase();
    if (!e) return;
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
    if (!valid) { setError("Please enter a valid email address."); return; }
    if (emails.includes(e)) { setError("That email is already added."); return; }
    setEmails(prev => [...prev, e]);
    setEmailInput("");
    setError(null);
  };

  const handleEmailKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") { e.preventDefault(); addEmail(); }
  };

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <>
      <style>{css}</style>
      <div className="app">
        <header className="header">
          <div className="header-logo">PRD <span>Studio</span></div>
          <div className="header-tag">AI-Powered</div>
          <div className="header-step-trail">
            {steps.map((s, i) => (
              <div key={s} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div className={`step-dot ${i < stepIndex ? "done" : i === stepIndex ? "active" : ""}`} />
                <span style={{ color: i === stepIndex ? "var(--text)" : "var(--muted)", fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                  {s}
                </span>
                {i < steps.length - 1 && <span style={{ color: "var(--border)", margin: "0 4px" }}>—</span>}
              </div>
            ))}
          </div>
        </header>

        <main className="main">
          {error && (
            <div className="error-bar">
              <span>⚠</span> {error}
              <button className="btn btn-ghost" style={{ marginLeft: "auto", padding: "2px 6px" }} onClick={() => setError(null)}>✕</button>
            </div>
          )}

          {/* ── FORM ── */}
          {phase === "form" && (
            <div className="card">
              <h1 className="section-title">Define Your Product</h1>
              <p className="section-sub">Provide the core details and our AI will generate a complete, structured PRD section by section.</p>
              <div className="form-grid">
                <div className="form-group full">
                  <label className="form-label">Product Idea</label>
                  <input
                    className="form-input"
                    placeholder="e.g. A mobile app that helps remote teams track daily focus goals…"
                    value={form.idea}
                    onChange={e => setForm(f => ({ ...f, idea: e.target.value }))}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Target Users</label>
                  <input
                    className="form-input"
                    placeholder="e.g. Remote knowledge workers, 25–45"
                    value={form.target_users}
                    onChange={e => setForm(f => ({ ...f, target_users: e.target.value }))}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Core Problem</label>
                  <input
                    className="form-input"
                    placeholder="e.g. Lack of visibility into individual daily productivity"
                    value={form.problem}
                    onChange={e => setForm(f => ({ ...f, problem: e.target.value }))}
                  />
                </div>
              </div>
              <div style={{ marginTop: 28, display: "flex", justifyContent: "flex-end" }}>
                <button className="btn btn-primary btn-lg" onClick={startPRD}>
                  Generate PRD →
                </button>
              </div>
            </div>
          )}

          {/* ── GENERATING ── */}
          {phase === "generating" && (
            <div className="card loading-block">
              <Loader large />
              <span className="loading-text">Generating first section…</span>
            </div>
          )}

          {/* ── REVIEWING ── */}
          {phase === "reviewing" && review && (
            <div>
              {/* Progress */}
              <div className="progress-wrap">
                <div className="progress-label">
                  <span>Progress</span>
                  <span>{currentSectionIndex + 1} / {PRD_SECTIONS.length}</span>
                </div>
                <div className="progress-track">
                  <div
                    className="progress-fill"
                    style={{ width: `${((currentSectionIndex + 1) / PRD_SECTIONS.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Section chips */}
              <div className="section-nav">
                {PRD_SECTIONS.map((s, i) => (
                  <div
                    key={s}
                    className={`section-chip ${i === currentSectionIndex ? "active" : i < currentSectionIndex || sections[s] ? "done" : ""}`}
                  >
                    {i < currentSectionIndex || sections[s] ? "✓ " : ""}{i + 1}. {s}
                  </div>
                ))}
              </div>

              <div className="card">
                <div className="review-header">
                  <span className="review-section-label">Section {currentSectionIndex + 1}</span>
                  <span className="review-index">{review.section}</span>
                </div>
                <h2 className="review-title">{review.section}</h2>

                <div className="content-box">
                  {review.content}
                </div>

                {loading ? (
                  <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "8px 0" }}>
                    <Loader />
                    <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.7rem", color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                      Processing…
                    </span>
                  </div>
                ) : (
                  <>
                    <div className="action-row">
                      <button className="btn btn-success" onClick={() => resume("approve")}>
                        ✓ Approve
                      </button>
                      <div className="action-divider" />
                      <button className="btn btn-outline" onClick={() => { setShowFeedback(false); resume("regenerate"); }}>
                        ↻ Regenerate
                      </button>
                      <button
                        className="btn btn-outline"
                        style={{ borderColor: showFeedback ? "var(--blue)" : undefined, color: showFeedback ? "var(--blue)" : undefined }}
                        onClick={() => setShowFeedback(v => !v)}
                      >
                        ✎ Edit with Feedback
                      </button>
                    </div>

                    {showFeedback && (
                      <div className="feedback-panel">
                        <div className="feedback-label">Your feedback for this section</div>
                        <div className="feedback-row">
                          <textarea
                            className="feedback-input"
                            placeholder="e.g. Make the problem statement more specific. Add quantitative context about market size…"
                            value={feedback}
                            onChange={e => setFeedback(e.target.value)}
                            autoFocus
                          />
                          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                            <button
                              className="btn btn-primary"
                              disabled={!feedback.trim()}
                              onClick={() => resume("feedback", feedback.trim())}
                            >
                              Submit
                            </button>
                            <button className="btn btn-ghost" onClick={() => { setShowFeedback(false); setFeedback(""); }}>
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          )}

          {/* ── COMPLETED ── */}
          {phase === "completed" && (
            <div>
              <div className="completed-banner">
                <div className="completed-icon">✓</div>
                <div>
                  <h3>PRD Complete</h3>
                  <p>All {PRD_SECTIONS.length} sections have been approved and are ready to share.</p>
                </div>
                <button
                  className="btn btn-primary"
                  style={{ marginLeft: "auto" }}
                  onClick={() => { setPhase("sending"); setError(null); }}
                >
                  Send via Email →
                </button>
              </div>

              <div className="prd-sections">
                {PRD_SECTIONS.map((name, i) => {
                  const content = completedSections[name] || sections[name] || "";
                  const isOpen = openSection === name;
                  return (
                    <div key={name} className="prd-section-item">
                      <div className="prd-section-header" onClick={() => setOpenSection(isOpen ? null : name)}>
                        <span className="prd-section-num">0{i + 1}</span>
                        <span className="prd-section-name">{name}</span>
                        {content && <span style={{ fontSize: "0.6rem", color: "var(--green)", fontFamily: "JetBrains Mono", marginRight: 8 }}>✓ ready</span>}
                        <span className={`prd-chevron ${isOpen ? "open" : ""}`}>▼</span>
                      </div>
                      {isOpen && content && (
                        <div className="prd-section-body">{content}</div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── SENDING EMAIL ── */}
          {phase === "sending" && (
            <div className="card">
              <h1 className="section-title">Send PRD via Email</h1>
              <p className="section-sub">Add recipient email addresses. Press Enter or comma to add each one.</p>

              <div style={{ marginBottom: 20 }}>
                <div className="form-label" style={{ marginBottom: 10 }}>Recipients</div>
                {emails.length > 0 && (
                  <div className="email-tags">
                    {emails.map(e => (
                      <div key={e} className="email-tag">
                        {e}
                        <button className="email-tag-remove" onClick={() => setEmails(prev => prev.filter(x => x !== e))}>×</button>
                      </div>
                    ))}
                  </div>
                )}
                <div className="email-input-row">
                  <input
                    className="form-input"
                    style={{ flex: 1 }}
                    placeholder="recipient@company.com"
                    value={emailInput}
                    onChange={e => { setEmailInput(e.target.value); setError(null); }}
                    onKeyDown={handleEmailKeyDown}
                  />
                  <button className="btn btn-outline" onClick={addEmail}>Add</button>
                </div>
                {emails.length > 0 && (
                  <p style={{ fontSize: "0.75rem", color: "var(--muted)", marginTop: 8 }}>
                    {emails.length} recipient{emails.length > 1 ? "s" : ""} added
                  </p>
                )}
              </div>

              <div style={{ borderTop: "1px solid var(--border)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <button className="btn btn-ghost" onClick={() => { setPhase("completed"); setError(null); }}>
                  ← Back to PRD
                </button>
                <button
                  className="btn btn-primary btn-lg"
                  disabled={emails.length === 0 || sendingEmail}
                  onClick={sendEmail}
                >
                  {sendingEmail ? <><Loader /> Sending…</> : `Send to ${emails.length || "…"} recipient${emails.length !== 1 ? "s" : ""} →`}
                </button>
              </div>
            </div>
          )}

          {/* ── SENT ── */}
          {phase === "sent" && (
            <div className="card sent-card">
              <div className="sent-icon">✉</div>
              <h2>PRD Delivered</h2>
              <p style={{ marginBottom: 8 }}>Your PRD was successfully sent to {emails.length} recipient{emails.length !== 1 ? "s" : ""}.</p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center", margin: "16px 0 32px" }}>
                {emails.map(e => (
                  <span key={e} className="email-tag" style={{ fontSize: "0.72rem" }}>{e}</span>
                ))}
              </div>
              <button
                className="btn btn-outline"
                onClick={() => {
                  setPhase("form");
                  setForm({ idea: "", target_users: "", problem: "" });
                  setThreadId(null);
                  setReview(null);
                  setSections({});
                  setCompletedSections({});
                  setEmails([]);
                  setEmailInput("");
                  setError(null);
                }}
              >
                Start a New PRD
              </button>
            </div>
          )}
        </main>
      </div>
    </>
  );
}
