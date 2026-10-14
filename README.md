# LIFELOOP — Learn. Move. Grow.
### A Connected Civic Technology Ecosystem for Rural Education, Produce Mobility, and Smallholder Agriculture

> *"Where education generates practical digital skills, vehicle owners eliminate agricultural transit exploitation, and family farms secure fair market livelihoods."*

---

## 🌟 Executive Summary & Core Vision
Conventional rural tech applications operate in isolated silos: educational dashboards test theoretical questions, logistics tools treat drivers like gig-workers, and agricultural platforms dump unverified weather data onto farmers. 

**LIFELOOP** unifies these three vital lifelines into **one self-reinforcing community loop**:
1. **Learn (Education & Digital Scribes):** Rural students and youth gain accredited digital livelihoods by solving field problems for local cooperatives.
2. **Move (Community Fleet Mobility):** Mini-trucks, tractors, and electric trikes pool harvest transit, eliminating predatory commission agents and reducing post-harvest produce spoilage.
3. **Grow (Smallholder Food Security):** Family farmers access verified crop transport, audit fraudulent weighing memos, and digitize harvest traceability.

---

## 🎨 Design Direction & Civic Aesthetic
- **Palette:** Deep forest green (`#123826`), warm ivory parchment (`#FAF7F2`), and muted terracotta orange (`#D96B27`).
- **Brand Identity:** The triple-interlocking Möbius loop symbol weaving education (cap/leaf), mobility (transit route), and agrarian growth into one unbroken continuum.
- **Central Visual Ecosystem:** An interactive SVG engine displaying animated flow particles, interconnected orbital sector nodes, and dynamic civic pulse activity.
- **Anti-Generic Design Principles:** Zero repetitive dashboard cards, zero generic AI imagery, zero bloated CSS frameworks. Clean, accessible semantic design tailored for civic usability.

---

## 🚀 Core Features Walkthrough

### 1. Opportunity Matcher (Feature 1)
- **Multi-Role Synergy:** Connects students offering digital record-keeping, farmers seeking technical assistance, vehicle owners offering transport, and mechanics/agronomists sharing expertise.
- **Publishing & Discovery:** Filter by sector (Learn/Move/Grow/Expert), role needed, and location with instant live text search.
- **Civic Mutual Aid:** Users can publish new requests (tagged clearly as *User Created* vs. *Simulated Sample*), express interest with custom availability notes, and earn **+25 CIP** for civic participation.
- **Transparent Credentials:** View poster verification tier, cooperative endorsements, and masked contact info.

### 2. Farm-to-Transport Matching Engine (Feature 2)
- **Smallholder Transit Request Creator:** Farmers specify crop type, weight (kg / crates), pickup farm gate, destination mandi, preferred departure slot, budget, and perishability handling needs.
- **Intelligent Suitability Scorecard:** Real-time suitability scoring algorithm analyzing:
  - **Payload vs. Weight Ratio:** Warns against axle overload; certifies safe capacity margins.
  - **Corridor Proximity:** Distance from vehicle base to farm gate.
  - **Cargo Equipment:** Presence of waterproof tarpaulin, crate racks, or electric trike bed.
  - **Operator Credentials:** Field Verified commercial transport credentials.
- **⚖️ STRICT TRUST RULE:**
  *Never claims a booking is confirmed automatically.*
  - Farmer proposes terms &rarr; Status becomes `Dispatch Proposed (Awaiting Driver Confirmation)`.
  - Only when the vehicle provider persona explicitly attests to pre-trip roadworthiness and confirms dispatch does it transition to `Confirmed`, generating an authentic digital dispatch manifest.

### 3. Learn by Solving Real Problems (Feature 3)
Instead of abstract quizzes, learners solve authentic civic challenges:
- **Mission 1 (Student / Scribe):** Build Farmer Dhani's Digital Harvest Slip — classify crate grades (Tier A/B/C), measure moisture meter dockage, generate verifiable batch SVG QR codes, and push records to the cooperative ledger.
- **Mission 2 (Driver / Mechanic):** Pre-Trip Fleet Safety & Mountain Load Balance — inspect tire tread depth, brake fluid reservoir, tarpaulin latch tension, and calibrate a center-of-gravity slider to avoid vehicle rollover on mountain hairpin bends.
- **Mission 3 (Farmer / Beginner):** Mandi Pricing Literacy & SMS Receipt Audit — compare official government MSP broadcast SMS messages against exploitative middleman memos, flag fraudulent "shrinkage" fees, and recover hard-earned farm income.
- **Accreditation:** Earn Community Impact Points (CIP) and verified micro-credentials (*Certified Digital Scribe*, *Safety-First Transporter*, *Agri-Tech Pioneer*).

### 4. Community Impact Map (Feature 4)
- **Simulated Geographic Grid:** Realistic spatial canvas depicting Solan and Verdant Basin agrarian corridors, river basins, mountain contour lines, and transit highways.
- **Interactive Pins:** Inspect solar-powered digital learning kiosks, farm aggregation desks, fleet staging posts, and precision mechanics.
- **Node Inspector Drawer:** View workstation count, lead facilitators, verified equipment, masked contact relay, and direct route paths.

### 5. Trust, Privacy & Safety (Feature 5)
- **Three-Tier Verification Architecture:**
  - *Tier 0 (Unverified):* Standard registration; amber badge; cannot dispatch high-risk commercial loads.
  - *Tier 1 (Community Vouched):* Endorsed by 3+ registered cooperative or Self-Help Group members.
  - *Tier 2 (Field Verified):* In-person physical document authentication by Polytechnic Registrar, Mandi Cell, or RTO.
  - *Ethical Rule:* Never labels an account verified without actual verification proof.
- **Privacy First:** Personal phone numbers are masked across all screens (`+91 ••••• ••482`) with platform relay options.
- **Block & Report Controls:**
  - Block any suspicious member with immediate feed isolation (stored persistently in `localStorage`).
  - File detailed ethics and safety reports directly to the community moderation desk.
- **Prototype Sandbox Notice:** Clear disclaimers across all views declaring simulated demonstration parameters.

---

## 🛠️ Technical Architecture

```
antigravity/
├── index.html                 # Core application shell & semantic layout
├── test_runner.html           # Automated test suite (42 assertions)
├── README.md                  # Product manual & architecture guide
├── css/
│   ├── variables.css          # Design tokens (forest green, warm ivory, muted orange)
│   ├── base.css               # Typography, reset, header, navigation, footer
│   ├── components.css         # Buttons, badges, cards, modals, toasts, empty states
│   ├── ecosystem.css          # Central circular loop visualization & animations
│   └── features.css           # Map canvas, transport scorecard, mission simulators
└── js/
    ├── data.js                # Seed data (personas, opportunities, vehicles, missions, map nodes)
    ├── state.js               # Reactive state manager with localStorage persistence
    ├── app.js                 # Router, persona switcher, global modal & toast manager
    └── components/
        ├── ecosystem-view.js      # Central circular loop & civic heartbeat ticker
        ├── opportunity-matcher.js # Multi-role opportunity matching interface
        ├── transport-matcher.js   # Farm-to-transport suitability engine & confirmation
        ├── learning-missions.js   # Interactive problem-solving simulators
        ├── impact-map.js          # Interactive SVG geography & node inspector
        ├── trust-safety.js        # Verification tiers, blocklist, and reports desk
        └── profile-modal.js       # Verified public profile with masked contacts
```

---

## ⚡ How to Run the Application

This prototype is built using zero-dependency, standards-compliant HTML5, CSS3, and modern JavaScript. It runs immediately in any browser without needing Node, npm, Python, or build steps.

### Option A: Open Directly in Any Browser
Double-click `index.html` or open it from your file explorer:
```
file:///c:/Users/HP/Downloads/antigravity/index.html
```

### Option B: Run Automated Test Suite
Open `test_runner.html` to run all 42 automated unit and integration tests:
```
file:///c:/Users/HP/Downloads/antigravity/test_runner.html
```
All 42 tests will execute and report instant green `[PASS]` badges.

### Option C: Optional Local HTTP Server (PowerShell)
If you prefer running through an HTTP server, launch this one-liner in PowerShell:
```powershell
powershell -Command "$listener = New-Object System.Net.HttpListener; $listener.Prefixes.Add('http://localhost:8080/'); $listener.Start(); Write-Host 'Serving LIFELOOP at http://localhost:8080/'; while ($true) { $context = $listener.GetContext(); $path = Join-Path (Get-Location) ($context.Request.Url.LocalPath.TrimStart('/')); if (-not (Test-Path $path) -or (Test-Path $path -PathType Container)) { $path = Join-Path (Get-Location) 'index.html' }; $bytes = [System.IO.File]::ReadAllBytes($path); $context.Response.ContentLength64 = $bytes.Length; $context.Response.OutputStream.Write($bytes, 0, $bytes.Length); $context.Response.OutputStream.Close() }"
```
Then visit `http://localhost:8080/`.

---

## 🧪 Persona Switcher Testing Guide
Try experiencing the platform through the 4 distinct civic roles via the dropdown in the top header:
1. **Student (`Ananya Roy`):** Browse digital record-keeping requests, inspect cooperative crates, and launch **Mission 1** to generate Farmer Dhani's harvest QR slip.
2. **Farmer (`Harish Patel`):** Create a fresh produce transit request, review vehicle suitability matches, and propose terms to driver Vikram Singh.
3. **Vehicle Provider (`Vikram Singh`):** Browse farm transit requests, propose custom haulage quotes, review pre-trip safety checklist, and confirm dispatch to issue an authentic trip manifest.
4. **Expert (`Dr. Sunita Rao`):** Advise on soil rapid testing kits and review community impact map nodes.
