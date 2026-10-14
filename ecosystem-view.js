/**
 * LIFELOOP — Connected Ecosystem Component
 * Central visual showing Learn, Move, and Grow connected in a circular loop
 * with animated flow paths, interactive synergy breakdowns, and civic heartbeat feed.
 */

window.EcosystemView = {
  render(container) {
    const data = window.LIFELOOP_DATA;
    const state = window.lifeLoopState.state;

    // Calculate live dynamic counts
    const totalOpps = state.opportunities.length;
    const totalTransport = state.transportRequests.length;
    const completedMissionsCount = Object.keys(state.completedMissions || {}).length;

    container.innerHTML = `
      <section class="ecosystem-hero">
        <div class="ecosystem-hero-header">
          <div class="hero-pill-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
            </svg>
            Interconnected Civic Infrastructure
          </div>
          <h1 class="hero-title">One Loop. Three Lifelines. Infinite Community Growth.</h1>
          <p class="hero-subtitle">
            Where education generates practical digital skills, vehicle owners eliminate agricultural transit exploitation,
            and smallholder farmers secure fair market livelihoods.
          </p>
        </div>

        <!-- Central Circular Visualization -->
        <div class="circular-loop-stage">
          <svg class="circular-loop-svg" viewBox="0 0 640 540" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <!-- Gradients for Sectors -->
              <linearGradient id="gradLearn" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#2A9D8F"/>
                <stop offset="100%" stop-color="#1B4D36"/>
              </linearGradient>
              <linearGradient id="gradMove" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#EB7A38"/>
                <stop offset="100%" stop-color="#B84F14"/>
              </linearGradient>
              <linearGradient id="gradGrow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#1B4D36"/>
                <stop offset="100%" stop-color="#358661"/>
              </linearGradient>
              <linearGradient id="flowGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#E3B341" stop-opacity="0.2"/>
                <stop offset="50%" stop-color="#E3B341" stop-opacity="1"/>
                <stop offset="100%" stop-color="#E3B341" stop-opacity="0.2"/>
              </linearGradient>

              <!-- Drop Shadows -->
              <filter id="nodeShadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="6" stdDeviation="6" flood-color="#0B2418" flood-opacity="0.16"/>
              </filter>
            </defs>

            <!-- Background subtle geometric rings -->
            <circle cx="320" cy="270" r="210" fill="none" stroke="#EBE4D6" stroke-width="1.5" stroke-dasharray="4 6"/>
            <circle cx="320" cy="270" r="160" fill="none" stroke="#EBE4D6" stroke-width="1"/>

            <!-- Interconnecting Flow Paths (The Loop) -->
            <!-- Path 1: Learn (Top) to Move (Right) -->
            <path id="pathLearnToMove" d="M 320 100 C 460 100 520 220 500 330" fill="none" stroke="#2A9D8F" stroke-width="4" stroke-linecap="round"/>
            <path d="M 320 100 C 460 100 520 220 500 330" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-dasharray="8 12" class="flow-particle"/>

            <!-- Path 2: Move (Right) to Grow (Left) -->
            <path id="pathMoveToGrow" d="M 500 330 C 450 470 190 470 140 330" fill="none" stroke="#D96B27" stroke-width="4" stroke-linecap="round"/>
            <path d="M 500 330 C 450 470 190 470 140 330" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-dasharray="8 12" class="flow-particle"/>

            <!-- Path 3: Grow (Left) to Learn (Top) -->
            <path id="pathGrowToLearn" d="M 140 330 C 120 220 180 100 320 100" fill="none" stroke="#1B4D36" stroke-width="4" stroke-linecap="round"/>
            <path d="M 140 330 C 120 220 180 100 320 100" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-dasharray="8 12" class="flow-particle"/>

            <!-- Interactive Center Synergy Hub -->
            <g class="loop-node-interactive" id="hubCenterNode" style="cursor: pointer;">
              <circle cx="320" cy="270" r="64" fill="#FCFAF7" stroke="#DFD5C3" stroke-width="2" filter="url(#nodeShadow)"/>
              <circle cx="320" cy="270" r="54" fill="#FAF7F2" stroke="#EBE4D6" stroke-width="1.5"/>
              <text x="320" y="262" font-family="'Georgia', serif" font-size="14" font-weight="bold" fill="#0B2418" text-anchor="middle">LIFELOOP</text>
              <text x="320" y="280" font-family="sans-serif" font-size="10" font-weight="600" fill="#73847B" text-anchor="middle">CIVIC NEXUS</text>
              <circle cx="320" cy="295" r="4" fill="#2E7D32"/>
            </g>

            <!-- Sector Node 1: LEARN (Top) -->
            <g class="loop-node-interactive" id="nodeLearn" data-sector="learn" style="cursor: pointer;">
              <circle cx="320" cy="100" r="52" fill="url(#gradLearn)" filter="url(#nodeShadow)"/>
              <circle cx="320" cy="100" r="45" fill="none" stroke="#FFFFFF" stroke-opacity="0.3" stroke-width="1.5"/>
              <!-- Graduation Cap / Book Icon -->
              <path d="M 320 84 L 340 94 L 320 104 L 300 94 Z" fill="#FCFAF7"/>
              <path d="M 307 98 L 307 110 C 307 116 333 116 333 110 L 333 98" fill="none" stroke="#FCFAF7" stroke-width="2.5" stroke-linecap="round"/>
              <text x="320" y="126" font-family="sans-serif" font-size="11" font-weight="700" fill="#FFFFFF" text-anchor="middle">1. LEARN</text>
              <text x="320" y="138" font-family="sans-serif" font-size="8.5" fill="#D8EADB" text-anchor="middle">Digital Skills</text>
            </g>

            <!-- Sector Node 2: MOVE (Bottom Right) -->
            <g class="loop-node-interactive" id="nodeMove" data-sector="move" style="cursor: pointer;">
              <circle cx="500" cy="330" r="52" fill="url(#gradMove)" filter="url(#nodeShadow)"/>
              <circle cx="500" cy="330" r="45" fill="none" stroke="#FFFFFF" stroke-opacity="0.3" stroke-width="1.5"/>
              <!-- Truck / Wheel Icon -->
              <rect x="484" y="316" width="20" height="15" rx="2" fill="#FCFAF7"/>
              <path d="M 504 321 L 514 321 L 518 327 L 518 331 L 504 331 Z" fill="#FCFAF7"/>
              <circle cx="490" cy="334" r="3.5" fill="#7A330B"/>
              <circle cx="512" cy="334" r="3.5" fill="#7A330B"/>
              <text x="500" y="356" font-family="sans-serif" font-size="11" font-weight="700" fill="#FFFFFF" text-anchor="middle">2. MOVE</text>
              <text x="500" y="368" font-family="sans-serif" font-size="8.5" fill="#FCECE4" text-anchor="middle">Rural Mobility</text>
            </g>

            <!-- Sector Node 3: GROW (Bottom Left) -->
            <g class="loop-node-interactive" id="nodeGrow" data-sector="grow" style="cursor: pointer;">
              <circle cx="140" cy="330" r="52" fill="url(#gradGrow)" filter="url(#nodeShadow)"/>
              <circle cx="140" cy="330" r="45" fill="none" stroke="#FFFFFF" stroke-opacity="0.3" stroke-width="1.5"/>
              <!-- Sprout / Agriculture Icon -->
              <path d="M 140 334 C 140 318 126 314 126 314 C 126 314 140 322 140 334 Z" fill="#FCFAF7"/>
              <path d="M 140 334 C 140 315 154 311 154 311 C 154 311 140 322 140 334 Z" fill="#FCFAF7"/>
              <path d="M 140 334 L 140 340" stroke="#FCFAF7" stroke-width="2.5" stroke-linecap="round"/>
              <text x="140" y="356" font-family="sans-serif" font-size="11" font-weight="700" fill="#FFFFFF" text-anchor="middle">3. GROW</text>
              <text x="140" y="368" font-family="sans-serif" font-size="8.5" fill="#EDF5EF" text-anchor="middle">Farm Security</text>
            </g>

            <!-- Energy Synergy Labels on Flow Arcs -->
            <!-- Label 1: Learn -> Move -->
            <g transform="translate(440, 190)">
              <rect x="-65" y="-14" width="130" height="26" rx="13" fill="#FAF7F2" stroke="#DFD5C3" stroke-width="1"/>
              <text x="0" y="4" font-family="sans-serif" font-size="9.5" font-weight="700" fill="#256648" text-anchor="middle">Fleet Optimization</text>
            </g>

            <!-- Label 2: Move -> Grow -->
            <g transform="translate(320, 420)">
              <rect x="-70" y="-14" width="140" height="26" rx="13" fill="#FAF7F2" stroke="#DFD5C3" stroke-width="1"/>
              <text x="0" y="4" font-family="sans-serif" font-size="9.5" font-weight="700" fill="#B84F14" text-anchor="middle">Zero-Loss Crop Transit</text>
            </g>

            <!-- Label 3: Grow -> Learn -->
            <g transform="translate(200, 190)">
              <rect x="-65" y="-14" width="130" height="26" rx="13" fill="#FAF7F2" stroke="#DFD5C3" stroke-width="1"/>
              <text x="0" y="4" font-family="sans-serif" font-size="9.5" font-weight="700" fill="#1B4D36" text-anchor="middle">Field Literacy Ledgers</text>
            </g>
          </svg>
        </div>

        <!-- Three Connected Sectors Interactive Grid -->
        <div class="ecosystem-pillars-grid">
          <!-- Pillar 1: LEARN -->
          <div class="pillar-card pillar-learn">
            <div class="pillar-header">
              <div class="pillar-icon-box">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                  <path d="M6 12v5c3 3 9 3 12 0v-5"/>
                </svg>
              </div>
              <div>
                <h3 class="pillar-title">1. LEARN</h3>
                <span class="pillar-tagline">Digital Scribes & Youth Livelihoods</span>
              </div>
            </div>
            <p class="pillar-description">
              Students and polytech learners deploy digital tools in the field — creating harvest records, verifying fair mandi market prices, and setting up maintenance tracking.
            </p>
            <div class="cross-connection-callout">
              <div class="cross-connection-title">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
                Feeds into GROW & MOVE
              </div>
              Students digitize crop crates for farmers and audit load capacities for vehicle providers.
            </div>
            <button class="btn btn-outline btn-sm" onclick="window.lifeLoopState.setView('matcher')">
              Explore Digital Skills Requests (${totalOpps})
            </button>
          </div>

          <!-- Pillar 2: MOVE -->
          <div class="pillar-card pillar-move">
            <div class="pillar-header">
              <div class="pillar-icon-box">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="1" y="3" width="15" height="13" rx="2"/>
                  <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
                  <circle cx="5.5" cy="18.5" r="2.5"/>
                  <circle cx="18.5" cy="18.5" r="2.5"/>
                </svg>
              </div>
              <div>
                <h3 class="pillar-title">2. MOVE</h3>
                <span class="pillar-tagline">Community Transport Pooling</span>
              </div>
            </div>
            <p class="pillar-description">
              Rural mini-trucks, tractors, and electric cargo trikes consolidate harvest routes. Reduces empty return trips and guarantees farm produce reaches buyers without spoilage.
            </p>
            <div class="cross-connection-callout">
              <div class="cross-connection-title">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
                Feeds into GROW & EXPERTS
              </div>
              Farmers access verified haulage on-demand; local mechanics certify brake and tyre roadworthiness.
            </div>
            <button class="btn btn-accent btn-sm" onclick="window.lifeLoopState.setView('transport')">
              Match Farm Produce Transit (${totalTransport})
            </button>
          </div>

          <!-- Pillar 3: GROW -->
          <div class="pillar-card pillar-grow">
            <div class="pillar-header">
              <div class="pillar-icon-box">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  <path d="M12 8v8M8 12h8"/>
                </svg>
              </div>
              <div>
                <h3 class="pillar-title">3. GROW</h3>
                <span class="pillar-tagline">Fair Smallholder Agriculture</span>
              </div>
            </div>
            <p class="pillar-description">
              Family farms and organic co-ops access authenticated agronomy advice, audit deductions on mandi slips, and schedule climate-safe transport for high-perishability crops.
            </p>
            <div class="cross-connection-callout">
              <div class="cross-connection-title">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
                Feeds into LEARN
              </div>
              Farmers provide real-world training environments for students to earn accredited civic impact points.
            </div>
            <button class="btn btn-secondary btn-sm" onclick="window.lifeLoopState.setView('learn')">
              Solve Real Missions (${completedMissionsCount}/3 Completed)
            </button>
          </div>
        </div>

        <!-- Live Community Activity Feed (Heartbeat) -->
        <div class="civic-synergy-banner">
          <div class="synergy-feed-header">
            <div class="pulse-indicator"></div>
            <div>
              <strong style="font-size: var(--font-size-sm); letter-spacing: 0.05em; text-transform: uppercase;">
                Civic Pulse Activity
              </strong>
              <div style="font-size: var(--font-size-xs); color: var(--color-ivory-400);">
                Real-time ecosystem transactions (Simulated)
              </div>
            </div>
          </div>

          <div class="synergy-items-scroller">
            ${data.recentSynergies.map(syn => `
              <div class="synergy-chip">
                <span class="synergy-chip-tag" style="background-color: ${syn.accent};">${syn.tag}</span>
                <span>${syn.text}</span>
                <span style="color: var(--color-ivory-600); font-size: 0.7rem;">• ${syn.timestamp}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Quick Civic Metrics -->
        <div class="impact-metrics-row">
          <div class="metric-card">
            <div class="metric-number">6,950 kg</div>
            <div class="metric-label">Harvest Produce Saved from Spoilage</div>
          </div>
          <div class="metric-card">
            <div class="metric-number">142 hrs</div>
            <div class="metric-label">Student Digital Literacy Support</div>
          </div>
          <div class="metric-card">
            <div class="metric-number">38 trips</div>
            <div class="metric-label">Shared Fleet Haulage Consolidated</div>
          </div>
          <div class="metric-card">
            <div class="metric-number">₹ 84,200</div>
            <div class="metric-label">Fair Value Retained by Smallholders</div>
          </div>
        </div>
      </section>
    `;

    // Attach interactive SVG handlers
    const nodeLearn = container.querySelector('#nodeLearn');
    const nodeMove = container.querySelector('#nodeMove');
    const nodeGrow = container.querySelector('#nodeGrow');
    const hubCenter = container.querySelector('#hubCenterNode');

    if (nodeLearn) nodeLearn.addEventListener('click', () => window.lifeLoopState.setView('matcher'));
    if (nodeMove) nodeMove.addEventListener('click', () => window.lifeLoopState.setView('transport'));
    if (nodeGrow) nodeGrow.addEventListener('click', () => window.lifeLoopState.setView('learn'));
    if (hubCenter) hubCenter.addEventListener('click', () => window.lifeLoopState.setView('map'));
  }
};
