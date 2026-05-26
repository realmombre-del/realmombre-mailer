import { useState, useEffect } from "react";

const TABS = ["Dashboard", "Campaigns", "Automations", "Audience", "AI Studio", "Integrations"];

const WIX_STATS = { total: 268, subscribed: 260, unsubscribed: 4, notSet: 4, sources: { IMPORT: 263, WIX_SITE_MEMBERS: 2, WIX_FORMS: 1, ADMIN: 2 } };

const CAMPAIGNS = [
  { name: "May Drop — Card Holder Launch", status: "Sent", date: "May 12, 2026", sent: 260, open: "41%", click: "14%" },
  { name: "Chess Tee Early Access", status: "Sent", date: "May 8, 2026", sent: 260, open: "36%", click: "11%" },
  { name: "June Editorial Preview", status: "Scheduled", date: "Jun 2, 2026", sent: "—", open: "—", click: "—" },
  { name: "Fall Collection Teaser", status: "Draft", date: "—", sent: "—", open: "—", click: "—" },
];

const AUTOMATIONS = [
  { name: "Welcome Series", trigger: "New subscriber", status: "active", sent: 214, opens: "61%" },
  { name: "Abandoned Cart Recovery", trigger: "Cart abandoned 1h", status: "active", sent: 87, opens: "44%" },
  { name: "Post-Purchase Follow-up", trigger: "Order fulfilled", status: "active", sent: 312, opens: "55%" },
  { name: "Win-Back Campaign", trigger: "90 days inactive", status: "paused", sent: 56, opens: "18%" },
  { name: "Drop Launch Countdown", trigger: "3 days before drop", status: "draft", sent: 0, opens: "—" },
];

const AI_PROMPTS = [
  "Write a launch email for the leather card holder drop",
  "Create a 3-part welcome series for a quiet luxury brand",
  "Write a subject line that feels editorial, not promotional",
  "Generate an abandoned cart email with a brand-story angle",
];

const LIVE_CONTACTS = [
  { name: "Olanrewaju Soetan", email: "timisoetan@gmail.com", status: "SUBSCRIBED", source: "IMPORT" },
  { name: "Daniel Ryan", email: "dryan415@gmail.com", status: "SUBSCRIBED", source: "IMPORT" },
  { name: "Justin Heron", email: "jheron004@gmail.com", status: "SUBSCRIBED", source: "IMPORT" },
  { name: "Samuel Kim", email: "samuelkim1402@gmail.com", status: "SUBSCRIBED", source: "IMPORT" },
  { name: "Angelo Ortiz", email: "birds311@icloud.com", status: "SUBSCRIBED", source: "IMPORT" },
  { name: "George Lai", email: "george.lai923@gmail.com", status: "SUBSCRIBED", source: "IMPORT" },
  { name: "Aramis Blais", email: "blaisaramis@gmail.com", status: "SUBSCRIBED", source: "IMPORT" },
  { name: "Jacob Dupuis", email: "dupuis_jacob@yahoo.com", status: "SUBSCRIBED", source: "IMPORT" },
  { name: "Aidan Costello", email: "acostello127@gmail.com", status: "SUBSCRIBED", source: "IMPORT" },
  { name: "Liam McMullen", email: "liam.mcmullen2003@gmail.com", status: "SUBSCRIBED", source: "IMPORT" },
  { name: "Eric Guido", email: "ericguido.a@gmail.com", status: "SUBSCRIBED", source: "IMPORT" },
  { name: "Larissa Labutte", email: "larissalabutte@gmail.com", status: "SUBSCRIBED", source: "WIX_SITE_MEMBERS" },
  { name: "Devontae Falconi", email: "devontae_falconi@yahoo.com", status: "SUBSCRIBED", source: "IMPORT" },
  { name: "Hritesh Pushparaj", email: "hriteshpushparaj19@gmail.com", status: "SUBSCRIBED", source: "IMPORT" },
  { name: "Vina Shih", email: "vinashih@gmail.com", status: "SUBSCRIBED", source: "IMPORT" },
  { name: "paco Corona", email: "pacomio2002@icloud.com", status: "SUBSCRIBED", source: "IMPORT" },
  { name: "Paul Garai", email: "garaipaul@gmail.com", status: "UNSUBSCRIBED", source: "IMPORT" },
  { name: "", email: "cuongdn@yahoo.com", status: "SUBSCRIBED", source: "IMPORT" },
  { name: "", email: "mechn14@aol.com", status: "SUBSCRIBED", source: "IMPORT" },
  { name: "", email: "saint.laurentgomes19@gmail.com", status: "SUBSCRIBED", source: "IMPORT" },
  { name: "", email: "alexafaithw@gmail.com", status: "SUBSCRIBED", source: "IMPORT" },
  { name: "", email: "sm656493@gmail.com", status: "SUBSCRIBED", source: "IMPORT" },
  { name: "", email: "faizaanbaig4@gmail.com", status: "SUBSCRIBED", source: "IMPORT" },
  { name: "", email: "pennykay@pennykayconsulting.com.au", status: "SUBSCRIBED", source: "IMPORT" },
  { name: "", email: "dmbuzdar@gmail.com", status: "SUBSCRIBED", source: "IMPORT" },
  { name: "", email: "shannonwaymire@hotmail.com", status: "SUBSCRIBED", source: "IMPORT" },
  { name: "", email: "sdemarco1961@gmail.com", status: "SUBSCRIBED", source: "IMPORT" },
  { name: "", email: "nbealieu@gmail.com", status: "SUBSCRIBED", source: "IMPORT" },
  { name: "", email: "eric.brullemans@gmail.com", status: "SUBSCRIBED", source: "WIX_FORMS" },
  { name: "", email: "bentoussaint68@gmail.com", status: "SUBSCRIBED", source: "IMPORT" },
];

function StatusBadge({ status }) {
  const map = { active: ["#00E5C8","#0A0A0A"], paused: ["#FFD166","#0A0A0A"], draft: ["#2A2A2A","#888"], Sent: ["#00E5C8","#0A0A0A"], Scheduled: ["#A78BFA","#0A0A0A"], Draft: ["#2A2A2A","#888"], SUBSCRIBED: ["#00E5C8","#0A0A0A"], UNSUBSCRIBED: ["#FF6B6B","#0A0A0A"] };
  const [bg, text] = map[status] || ["#2A2A2A","#888"];
  return <span style={{ background: bg, color: text, fontSize: "10px", fontWeight: 700, letterSpacing: "0.08em", padding: "3px 9px", borderRadius: "20px", textTransform: "uppercase", fontFamily: "'Space Mono', monospace" }}>{status}</span>;
}

function Dashboard() {
  const stats = [
    { label: "Subscribers", value: "260", sub: "realmombre.com · live", accent: "#00E5C8" },
    { label: "Total Contacts", value: "268", sub: "4 unsubscribed", accent: "#FFD166" },
    { label: "Opt-in Rate", value: "97%", sub: "Healthy list quality", accent: "#A78BFA" },
    { label: "Emails Sent", value: "∞", sub: "Unlimited plan", accent: "#FF6B6B" },
  ];
  return (
    <div>
      <div style={{ marginBottom: "32px" }}>
        <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#F5F0E8", marginBottom: "6px", fontFamily: "'Playfair Display', serif" }}>Good morning, Xavier.</h2>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#00E5C8", boxShadow: "0 0 6px #00E5C880" }} />
          <p style={{ color: "#666", fontSize: "12px", fontFamily: "'Space Mono', monospace" }}>realmombre.com connected · 260 active subscribers</p>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "32px" }}>
        {stats.map((s, i) => (
          <div key={i} style={{ background: "#111", border: "1px solid #1E1E1E", borderRadius: "12px", padding: "20px" }}>
            <div style={{ width: "40px", height: "3px", background: s.accent, borderRadius: "2px", marginBottom: "16px" }} />
            <div style={{ fontSize: "28px", fontWeight: 800, color: "#F5F0E8", fontFamily: "'Playfair Display', serif", letterSpacing: "-1px" }}>{s.value}</div>
            <div style={{ fontSize: "11px", color: "#888", marginTop: "4px", fontFamily: "'Space Mono', monospace" }}>{s.label}</div>
            <div style={{ fontSize: "10px", color: s.accent, marginTop: "4px", fontFamily: "'Space Mono', monospace" }}>{s.sub}</div>
          </div>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "16px" }}>
        <div style={{ background: "#111", border: "1px solid #1E1E1E", borderRadius: "12px", padding: "20px" }}>
          <div style={{ fontSize: "11px", fontFamily: "'Space Mono', monospace", color: "#666", marginBottom: "16px", letterSpacing: "0.1em" }}>RECENT CAMPAIGNS</div>
          {CAMPAIGNS.slice(0, 3).map((c, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: i < 2 ? "1px solid #1A1A1A" : "none" }}>
              <div>
                <div style={{ fontSize: "13px", color: "#D4CEBD", fontWeight: 600 }}>{c.name}</div>
                <div style={{ fontSize: "11px", color: "#555", fontFamily: "'Space Mono', monospace", marginTop: "2px" }}>{c.date}</div>
              </div>
              <StatusBadge status={c.status} />
            </div>
          ))}
        </div>
        <div style={{ background: "#111", border: "1px solid #1E1E1E", borderRadius: "12px", padding: "20px" }}>
          <div style={{ fontSize: "11px", fontFamily: "'Space Mono', monospace", color: "#666", marginBottom: "16px", letterSpacing: "0.1em" }}>LIST BREAKDOWN</div>
          {[
            { label: "Subscribed", count: 260, color: "#00E5C8", pct: 97 },
            { label: "Unsubscribed", count: 4, color: "#FF6B6B", pct: 2 },
            { label: "Not set", count: 4, color: "#333", pct: 1 },
          ].map((row, i) => (
            <div key={i} style={{ marginBottom: "12px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                <span style={{ fontSize: "11px", color: "#888", fontFamily: "'Space Mono', monospace" }}>{row.label}</span>
                <span style={{ fontSize: "11px", color: row.color, fontFamily: "'Space Mono', monospace" }}>{row.count} · {row.pct}%</span>
              </div>
              <div style={{ height: "3px", background: "#1A1A1A", borderRadius: "2px" }}>
                <div style={{ height: "100%", width: `${row.pct}%`, background: row.color, borderRadius: "2px" }} />
              </div>
            </div>
          ))}
          <div style={{ marginTop: "16px", paddingTop: "14px", borderTop: "1px solid #1A1A1A" }}>
            <div style={{ fontSize: "10px", color: "#555", fontFamily: "'Space Mono', monospace", marginBottom: "8px" }}>SOURCE</div>
            {[["IMPORT", 263], ["WIX SITE MEMBERS", 2], ["WIX FORMS", 1], ["ADMIN", 2]].map(([src, count]) => (
              <div key={src} style={{ display: "flex", justifyContent: "space-between", marginBottom: "3px" }}>
                <span style={{ fontSize: "10px", color: "#555", fontFamily: "'Space Mono', monospace" }}>{src}</span>
                <span style={{ fontSize: "10px", color: "#888", fontFamily: "'Space Mono', monospace" }}>{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Audience() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("ALL");
  const filtered = LIVE_CONTACTS.filter(c => {
    const ms = !search || (c.email + c.name).toLowerCase().includes(search.toLowerCase());
    const mf = filter === "ALL" || c.status === filter;
    return ms && mf;
  });
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }}>
        <div>
          <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#F5F0E8", fontFamily: "'Playfair Display', serif", marginBottom: "3px" }}>Audience</h2>
          <p style={{ fontSize: "11px", color: "#666", fontFamily: "'Space Mono', monospace" }}>268 contacts · 260 subscribed · synced from realmombre.com</p>
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          {["ALL", "SUBSCRIBED", "UNSUBSCRIBED"].map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{ background: filter === f ? "#00E5C8" : "#1A1A1A", color: filter === f ? "#0A0A0A" : "#666", border: `1px solid ${filter === f ? "#00E5C8" : "#222"}`, padding: "5px 14px", borderRadius: "20px", fontSize: "10px", fontFamily: "'Space Mono', monospace", cursor: "pointer" }}>{f}</button>
          ))}
        </div>
      </div>
      <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name or email..." style={{ width: "100%", background: "#111", border: "1px solid #1E1E1E", borderRadius: "8px", color: "#D4CEBD", padding: "10px 14px", fontSize: "12px", fontFamily: "'Space Mono', monospace", outline: "none", boxSizing: "border-box", marginBottom: "14px" }} />
      <div style={{ background: "#111", border: "1px solid #1E1E1E", borderRadius: "12px", overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 2fr 130px 120px", padding: "10px 20px", borderBottom: "1px solid #1A1A1A" }}>
          {["Name", "Email", "Status", "Source"].map((h, i) => (
            <div key={i} style={{ fontSize: "10px", color: "#555", fontFamily: "'Space Mono', monospace", letterSpacing: "0.08em" }}>{h}</div>
          ))}
        </div>
        <div style={{ maxHeight: "440px", overflowY: "auto" }}>
          {filtered.map((c, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "1.5fr 2fr 130px 120px", padding: "11px 20px", borderBottom: "1px solid #141414" }}
              onMouseEnter={e => e.currentTarget.style.background = "#141414"}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
              <div style={{ fontSize: "12px", color: c.name ? "#D4CEBD" : "#444" }}>{c.name || "—"}</div>
              <div style={{ fontSize: "11px", color: "#888", fontFamily: "'Space Mono', monospace", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.email}</div>
              <div><StatusBadge status={c.status} /></div>
              <div style={{ fontSize: "10px", color: "#555", fontFamily: "'Space Mono', monospace" }}>{c.source.replace(/_/g, " ")}</div>
            </div>
          ))}
          <div style={{ padding: "14px 20px", fontSize: "11px", color: "#444", fontFamily: "'Space Mono', monospace", textAlign: "center" }}>
            Showing {filtered.length} of 268 contacts — full list synced from Wix CRM
          </div>
        </div>
      </div>
    </div>
  );
}

function Campaigns({ onCompose }) {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#F5F0E8", fontFamily: "'Playfair Display', serif" }}>Campaigns</h2>
        <button onClick={onCompose} style={{ background: "#00E5C8", color: "#0A0A0A", border: "none", padding: "10px 20px", borderRadius: "8px", fontSize: "12px", fontWeight: 700, fontFamily: "'Space Mono', monospace", cursor: "pointer" }}>+ NEW CAMPAIGN</button>
      </div>
      <div style={{ background: "#111", border: "1px solid #1E1E1E", borderRadius: "12px", overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 100px 120px 80px 80px 80px", padding: "12px 20px", borderBottom: "1px solid #1A1A1A" }}>
          {["Campaign", "Status", "Date", "Sent", "Opens", "Clicks"].map((h, i) => (
            <div key={i} style={{ fontSize: "10px", color: "#555", fontFamily: "'Space Mono', monospace", letterSpacing: "0.08em" }}>{h}</div>
          ))}
        </div>
        {CAMPAIGNS.map((c, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "2fr 100px 120px 80px 80px 80px", padding: "16px 20px", borderBottom: i < CAMPAIGNS.length - 1 ? "1px solid #141414" : "none", cursor: "pointer" }}
            onMouseEnter={e => e.currentTarget.style.background = "#141414"}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
            <div style={{ fontSize: "13px", color: "#D4CEBD", fontWeight: 500 }}>{c.name}</div>
            <div><StatusBadge status={c.status} /></div>
            <div style={{ fontSize: "12px", color: "#666", fontFamily: "'Space Mono', monospace" }}>{c.date}</div>
            <div style={{ fontSize: "12px", color: "#888", fontFamily: "'Space Mono', monospace" }}>{c.sent}</div>
            <div style={{ fontSize: "12px", color: c.open !== "—" ? "#00E5C8" : "#555", fontFamily: "'Space Mono', monospace" }}>{c.open}</div>
            <div style={{ fontSize: "12px", color: c.click !== "—" ? "#FFD166" : "#555", fontFamily: "'Space Mono', monospace" }}>{c.click}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Automations() {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#F5F0E8", fontFamily: "'Playfair Display', serif" }}>Automations</h2>
        <button style={{ background: "#A78BFA", color: "#0A0A0A", border: "none", padding: "10px 20px", borderRadius: "8px", fontSize: "12px", fontWeight: 700, fontFamily: "'Space Mono', monospace", cursor: "pointer" }}>+ NEW FLOW</button>
      </div>
      <div style={{ display: "grid", gap: "12px", marginBottom: "24px" }}>
        {AUTOMATIONS.map((a, i) => (
          <div key={i} style={{ background: "#111", border: "1px solid #1E1E1E", borderRadius: "12px", padding: "18px 20px", display: "flex", alignItems: "center", gap: "16px", cursor: "pointer" }}
            onMouseEnter={e => e.currentTarget.style.borderColor = "#2A2A2A"}
            onMouseLeave={e => e.currentTarget.style.borderColor = "#1E1E1E"}>
            <div style={{ width: "10px", height: "10px", borderRadius: "50%", flexShrink: 0, background: a.status === "active" ? "#00E5C8" : a.status === "paused" ? "#FFD166" : "#333", boxShadow: a.status === "active" ? "0 0 8px #00E5C880" : "none" }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: "14px", color: "#D4CEBD", fontWeight: 600, marginBottom: "3px" }}>{a.name}</div>
              <div style={{ fontSize: "11px", color: "#555", fontFamily: "'Space Mono', monospace" }}>Trigger: {a.trigger}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: "13px", color: "#888", fontFamily: "'Space Mono', monospace" }}>{a.sent} sent</div>
              <div style={{ fontSize: "11px", color: a.opens !== "—" ? "#00E5C8" : "#555", fontFamily: "'Space Mono', monospace" }}>{a.opens} open rate</div>
            </div>
            <StatusBadge status={a.status} />
          </div>
        ))}
      </div>
      <div style={{ background: "#0D1A17", border: "1px solid #0E2B24", borderRadius: "12px", padding: "20px" }}>
        <div style={{ fontSize: "11px", fontFamily: "'Space Mono', monospace", color: "#00E5C8", marginBottom: "10px", letterSpacing: "0.1em" }}>TEMPLATES</div>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {["Drop Launch Series", "VIP Early Access", "Re-engagement Flow", "Post-Purchase Upsell", "Birthday Reward"].map((t, i) => (
            <button key={i} style={{ background: "#0A1A14", border: "1px solid #0E2B24", color: "#00E5C8", padding: "6px 14px", borderRadius: "20px", fontSize: "11px", fontFamily: "'Space Mono', monospace", cursor: "pointer" }}>{t}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

function AIStudio() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [tone, setTone] = useState("editorial");

  const generate = async () => {
    if (!prompt.trim()) return;
    setLoading(true); setResult("");
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: `You are a copywriter for Realm Ombré, a Montreal quiet luxury clothing brand. Tagline: "Journal of a Design House." Voice: philosophical, unhurried, process-driven. Tone: ${tone}. No hype, no emojis. Write like a thoughtful designer. Include subject line, preview text, and email body.`,
          messages: [{ role: "user", content: prompt }]
        })
      });
      const data = await res.json();
      setResult(data.content?.[0]?.text || "No response.");
    } catch { setResult("Error. Try again."); }
    setLoading(false);
  };

  return (
    <div>
      <div style={{ marginBottom: "24px" }}>
        <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#F5F0E8", fontFamily: "'Playfair Display', serif", marginBottom: "4px" }}>AI Studio</h2>
        <p style={{ fontSize: "12px", color: "#666", fontFamily: "'Space Mono', monospace" }}>Brand-voice AI tuned to Realm Ombré's editorial language.</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        <div>
          <div style={{ marginBottom: "14px" }}>
            <div style={{ fontSize: "10px", color: "#666", fontFamily: "'Space Mono', monospace", letterSpacing: "0.08em", marginBottom: "8px" }}>TONE</div>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {["editorial", "intimate", "minimal", "story-driven"].map(t => (
                <button key={t} onClick={() => setTone(t)} style={{ background: tone === t ? "#00E5C8" : "#1A1A1A", color: tone === t ? "#0A0A0A" : "#888", border: `1px solid ${tone === t ? "#00E5C8" : "#222"}`, padding: "5px 14px", borderRadius: "20px", fontSize: "11px", fontFamily: "'Space Mono', monospace", cursor: "pointer", textTransform: "capitalize" }}>{t}</button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: "12px" }}>
            <div style={{ fontSize: "10px", color: "#666", fontFamily: "'Space Mono', monospace", letterSpacing: "0.08em", marginBottom: "8px" }}>PROMPT</div>
            <textarea value={prompt} onChange={e => setPrompt(e.target.value)} placeholder="e.g. Write a launch email for the chess tee, emphasizing the cream colorway..." style={{ width: "100%", height: "120px", background: "#111", border: "1px solid #1E1E1E", borderRadius: "8px", color: "#D4CEBD", padding: "12px", fontSize: "13px", fontFamily: "'Space Mono', monospace", resize: "none", outline: "none", boxSizing: "border-box", lineHeight: "1.5" }} />
          </div>
          <div style={{ marginBottom: "14px" }}>
            <div style={{ fontSize: "10px", color: "#555", fontFamily: "'Space Mono', monospace", letterSpacing: "0.08em", marginBottom: "8px" }}>QUICK PROMPTS</div>
            {AI_PROMPTS.map((p, i) => (
              <button key={i} onClick={() => setPrompt(p)} style={{ display: "block", width: "100%", background: "#0D0D0D", border: "1px solid #1A1A1A", color: "#777", padding: "8px 12px", borderRadius: "6px", fontSize: "11px", fontFamily: "'Space Mono', monospace", cursor: "pointer", textAlign: "left", marginBottom: "6px" }}
                onMouseEnter={e => { e.currentTarget.style.color = "#D4CEBD"; e.currentTarget.style.borderColor = "#333"; }}
                onMouseLeave={e => { e.currentTarget.style.color = "#777"; e.currentTarget.style.borderColor = "#1A1A1A"; }}>→ {p}</button>
            ))}
          </div>
          <button onClick={generate} disabled={loading} style={{ width: "100%", background: loading ? "#0A2920" : "#00E5C8", color: loading ? "#00E5C8" : "#0A0A0A", border: "none", padding: "13px", borderRadius: "8px", fontSize: "12px", fontWeight: 700, fontFamily: "'Space Mono', monospace", cursor: loading ? "default" : "pointer" }}>{loading ? "WRITING..." : "GENERATE →"}</button>
        </div>
        <div style={{ background: "#111", border: "1px solid #1E1E1E", borderRadius: "12px", padding: "20px", minHeight: "400px" }}>
          <div style={{ fontSize: "10px", color: "#555", fontFamily: "'Space Mono', monospace", letterSpacing: "0.08em", marginBottom: "16px" }}>OUTPUT</div>
          {loading && <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#00E5C8", fontFamily: "'Space Mono', monospace", fontSize: "12px" }}><div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#00E5C8", animation: "pulse 1s infinite" }} />Writing in brand voice...</div>}
          {result && (
            <>
              <div style={{ fontSize: "13px", color: "#C8C0AD", lineHeight: "1.8", whiteSpace: "pre-wrap", fontFamily: "Georgia, serif" }}>{result}</div>
              <div style={{ marginTop: "16px", display: "flex", gap: "8px" }}>
                <button onClick={() => navigator.clipboard?.writeText(result)} style={{ background: "#1A1A1A", color: "#888", border: "1px solid #222", padding: "8px 16px", borderRadius: "6px", fontSize: "11px", fontFamily: "'Space Mono', monospace", cursor: "pointer" }}>COPY</button>
                <button style={{ background: "#1A1A1A", color: "#888", border: "1px solid #222", padding: "8px 16px", borderRadius: "6px", fontSize: "11px", fontFamily: "'Space Mono', monospace", cursor: "pointer" }}>USE IN CAMPAIGN</button>
              </div>
            </>
          )}
          {!result && !loading && <div style={{ color: "#333", fontSize: "12px", fontFamily: "'Space Mono', monospace", marginTop: "40px", textAlign: "center" }}>Your email will appear here.</div>}
        </div>
      </div>
    </div>
  );
}

function Integrations() {
  return (
    <div>
      <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#F5F0E8", fontFamily: "'Playfair Display', serif", marginBottom: "6px" }}>Integrations</h2>
      <p style={{ fontSize: "12px", color: "#666", fontFamily: "'Space Mono', monospace", marginBottom: "24px" }}>Sync stores to pull contacts and trigger automations on orders.</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        {[
          { name: "Wix", desc: "realmombre.com · 268 contacts, 260 subscribed · live sync active.", color: "#00E5C8", connected: true },
          { name: "Shopify", desc: "Import customers, track purchases, automate post-purchase flows.", color: "#95BF47", connected: false },
          { name: "Klaviyo Import", desc: "Import your existing Klaviyo lists and flow history.", color: "#FFD166", connected: false },
          { name: "Zapier", desc: "Route orders to Google Sheets and connect 5,000+ apps.", color: "#FF6B6B", connected: false },
          { name: "Meta Ads Sync", desc: "Sync custom audiences for retargeting from your email lists.", color: "#A78BFA", connected: false },
          { name: "Google Analytics", desc: "Track email-driven revenue and attribution.", color: "#4285F4", connected: false },
        ].map((p, i) => (
          <div key={i} style={{ background: "#111", border: `1px solid ${p.connected ? p.color + "40" : "#1E1E1E"}`, borderRadius: "12px", padding: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
              <div>
                <div style={{ fontSize: "15px", fontWeight: 700, color: "#F5F0E8", fontFamily: "'Playfair Display', serif", marginBottom: "4px" }}>{p.name}</div>
                <div style={{ fontSize: "11px", color: "#555", lineHeight: "1.5" }}>{p.desc}</div>
              </div>
              <div style={{ width: "10px", height: "10px", borderRadius: "50%", flexShrink: 0, background: p.connected ? p.color : "#222", boxShadow: p.connected ? `0 0 8px ${p.color}80` : "none", marginTop: "4px" }} />
            </div>
            <button style={{ background: p.connected ? "#0A2920" : "#161616", color: p.connected ? p.color : "#555", border: `1px solid ${p.connected ? p.color + "40" : "#222"}`, padding: "8px 16px", borderRadius: "6px", fontSize: "11px", fontFamily: "'Space Mono', monospace", cursor: "pointer", width: "100%" }}>{p.connected ? "✓ CONNECTED — MANAGE" : "CONNECT →"}</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function ComposeModal({ onClose }) {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  const aiAssist = async () => {
    if (!subject) return;
    setAiLoading(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, system: "You are a copywriter for Realm Ombré, a Montreal quiet luxury clothing brand. Write editorial email body copy. No hype, no emojis. Just the email body.", messages: [{ role: "user", content: `Write an email body for: "${subject}"` }] })
      });
      const data = await res.json();
      setBody(data.content?.[0]?.text || "");
    } catch { }
    setAiLoading(false);
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "#000000CC", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100 }}>
      <div style={{ background: "#0F0F0F", border: "1px solid #1E1E1E", borderRadius: "16px", width: "640px", maxHeight: "80vh", overflow: "auto", padding: "32px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
          <div>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "18px", color: "#F5F0E8", marginBottom: "4px" }}>New Campaign</h3>
            <p style={{ fontSize: "11px", color: "#555", fontFamily: "'Space Mono', monospace" }}>Sending to 260 subscribers · realmombre.com</p>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "#555", fontSize: "20px", cursor: "pointer" }}>✕</button>
        </div>
        <div style={{ marginBottom: "14px" }}>
          <label style={{ fontSize: "10px", color: "#666", fontFamily: "'Space Mono', monospace", letterSpacing: "0.08em", display: "block", marginBottom: "6px" }}>SUBJECT LINE</label>
          <input value={subject} onChange={e => setSubject(e.target.value)} placeholder="Something worth opening..." style={{ width: "100%", background: "#111", border: "1px solid #1E1E1E", borderRadius: "8px", color: "#D4CEBD", padding: "11px 14px", fontSize: "13px", fontFamily: "Georgia, serif", outline: "none", boxSizing: "border-box" }} />
        </div>
        <div style={{ marginBottom: "18px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
            <label style={{ fontSize: "10px", color: "#666", fontFamily: "'Space Mono', monospace", letterSpacing: "0.08em" }}>BODY</label>
            <button onClick={aiAssist} disabled={aiLoading || !subject} style={{ background: "none", border: "1px solid #00E5C840", color: "#00E5C8", padding: "4px 12px", borderRadius: "20px", fontSize: "10px", fontFamily: "'Space Mono', monospace", cursor: subject ? "pointer" : "default" }}>{aiLoading ? "WRITING..." : "⟡ AI ASSIST"}</button>
          </div>
          <textarea value={body} onChange={e => setBody(e.target.value)} placeholder="Write your email, or use AI Assist..." style={{ width: "100%", height: "200px", background: "#111", border: "1px solid #1E1E1E", borderRadius: "8px", color: "#D4CEBD", padding: "12px 14px", fontSize: "13px", fontFamily: "Georgia, serif", resize: "vertical", outline: "none", boxSizing: "border-box", lineHeight: "1.7" }} />
        </div>
        <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
          <button onClick={onClose} style={{ background: "#1A1A1A", color: "#888", border: "1px solid #222", padding: "10px 20px", borderRadius: "8px", fontSize: "11px", fontFamily: "'Space Mono', monospace", cursor: "pointer" }}>CANCEL</button>
          <button style={{ background: "#00E5C8", color: "#0A0A0A", border: "none", padding: "10px 24px", borderRadius: "8px", fontSize: "11px", fontWeight: 700, fontFamily: "'Space Mono', monospace", cursor: "pointer" }}>SAVE & SCHEDULE →</button>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [composing, setComposing] = useState(false);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Space+Mono:wght@400;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #080808; }
        @keyframes pulse { 0%,100%{opacity:1;} 50%{opacity:0.3;} }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #111; }
        ::-webkit-scrollbar-thumb { background: #333; border-radius: 2px; }
      `}</style>
      <div style={{ minHeight: "100vh", background: "#080808", display: "flex" }}>
        <div style={{ width: "220px", background: "#0A0A0A", borderRight: "1px solid #141414", display: "flex", flexDirection: "column", position: "fixed", top: 0, left: 0, height: "100vh" }}>
          <div style={{ padding: "28px 20px 20px" }}>
            <div style={{ fontSize: "15px", fontWeight: 700, color: "#F5F0E8", fontFamily: "'Playfair Display', serif" }}>Realm Mailer</div>
            <div style={{ fontSize: "9px", color: "#444", fontFamily: "'Space Mono', monospace", letterSpacing: "0.12em", marginTop: "3px" }}>EMAIL PLATFORM</div>
          </div>
          <div style={{ margin: "0 12px 16px", background: "#0D1A17", border: "1px solid #0E2B24", borderRadius: "8px", padding: "10px 12px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "7px", marginBottom: "3px" }}>
              <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#00E5C8", boxShadow: "0 0 5px #00E5C880", flexShrink: 0 }} />
              <span style={{ fontSize: "10px", color: "#00E5C8", fontFamily: "'Space Mono', monospace" }}>WIX CONNECTED</span>
            </div>
            <div style={{ fontSize: "10px", color: "#446655", fontFamily: "'Space Mono', monospace" }}>realmombre.com</div>
            <div style={{ fontSize: "10px", color: "#00E5C8", fontFamily: "'Space Mono', monospace", marginTop: "1px" }}>260 subscribers · 268 total</div>
          </div>
          <nav style={{ flex: 1, padding: "0 12px" }}>
            {TABS.map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} style={{ width: "100%", background: activeTab === tab ? "#161616" : "none", border: activeTab === tab ? "1px solid #1E1E1E" : "1px solid transparent", color: activeTab === tab ? "#F5F0E8" : "#555", padding: "10px 12px", borderRadius: "8px", fontSize: "11px", fontFamily: "'Space Mono', monospace", cursor: "pointer", textAlign: "left", marginBottom: "2px", letterSpacing: "0.04em", transition: "all 0.15s" }}>
                {tab === "AI Studio" ? "⟡ " : ""}{tab}
                {tab === "Audience" && <span style={{ float: "right", fontSize: "9px", color: "#00E5C8" }}>260</span>}
              </button>
            ))}
          </nav>
          <div style={{ padding: "16px 20px", borderTop: "1px solid #141414" }}>
            <div style={{ fontSize: "10px", color: "#555", fontFamily: "'Space Mono', monospace", marginBottom: "2px" }}>PLAN</div>
            <div style={{ fontSize: "11px", color: "#00E5C8", fontFamily: "'Space Mono', monospace" }}>∞ Unlimited Sends</div>
          </div>
        </div>
        <div style={{ marginLeft: "220px", flex: 1, padding: "40px", maxWidth: "calc(100% - 220px)" }}>
          {activeTab === "Dashboard" && <Dashboard />}
          {activeTab === "Campaigns" && <Campaigns onCompose={() => setComposing(true)} />}
          {activeTab === "Automations" && <Automations />}
          {activeTab === "Audience" && <Audience />}
          {activeTab === "AI Studio" && <AIStudio />}
          {activeTab === "Integrations" && <Integrations />}
        </div>
      </div>
      {composing && <ComposeModal onClose={() => setComposing(false)} />}
    </>
  );
}
