/**
 * LIFELOOP — Feature 4: Community Impact Map Component
 * Interactive visual map interface showing learning kiosks, agro support hubs,
 * fleet transport staging posts, and precision mechanics across Solan & Verdant Basin.
 */

window.ImpactMap = {
  activeNodeId: 'node_1',
  activeFilter: 'all',

  render(container) {
    const data = window.LIFELOOP_DATA;
    const nodes = data.mapNodes;

    // Filter nodes
    const filteredNodes = this.activeFilter === 'all' 
      ? nodes 
      : nodes.filter(n => n.type === this.activeFilter || n.sector === this.activeFilter);

    const activeNode = nodes.find(n => n.id === this.activeNodeId) || nodes[0];

    container.innerHTML = `
      <section class="map-section">
        <!-- Map Header & Filter Bar -->
        <div class="map-header-card">
          <div>
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
              <span class="badge badge-sector-learn">Interactive Civic Geography</span>
              <span class="badge badge-sample-data">Simulated Territory Sandbox</span>
            </div>
            <h2 style="font-family: var(--font-family-display); font-size: 1.6rem; color: var(--color-forest-900);">
              Solan & Verdant Basin Community Impact Grid
            </h2>
            <p style="font-size: var(--font-size-xs); color: var(--text-muted); margin-top: 2px;">
              Real-time locations of solar-powered learning centers, farmer aggregation kiosks, vehicle fleet stands, and repair clinics.
            </p>
          </div>

          <div class="map-filter-pills">
            <button class="map-filter-btn ${this.activeFilter === 'all' ? 'active' : ''}" data-filter="all">
              All Grid Nodes (${nodes.length})
            </button>
            <button class="map-filter-btn ${this.activeFilter === 'learning_center' ? 'active' : ''}" data-filter="learning_center">
              🎓 Learning Kiosks
            </button>
            <button class="map-filter-btn ${this.activeFilter === 'agri_hub' ? 'active' : ''}" data-filter="agri_hub">
              🌱 Agro Hubs & Mandis
            </button>
            <button class="map-filter-btn ${this.activeFilter === 'transport_hub' ? 'active' : ''}" data-filter="transport_hub">
              🚚 Fleet & EV Trike Stands
            </button>
            <button class="map-filter-btn ${this.activeFilter === 'mechanic' ? 'active' : ''}" data-filter="mechanic">
              🔧 Mechanics & Solar Clinics
            </button>
          </div>
        </div>

        <!-- Map Legend Bar -->
        <div class="map-legend-bar">
          <span style="font-weight: 700; color: var(--color-forest-900);">Map Legend:</span>
          <div class="legend-item"><span class="legend-dot" style="background: #2A9D8F;"></span> Learning Kiosks (Digital Scribes)</div>
          <div class="legend-item"><span class="legend-dot" style="background: #1B4D36;"></span> Farm Hubs & Mandis (Agro Security)</div>
          <div class="legend-item"><span class="legend-dot" style="background: #D96B27;"></span> Fleet Junctions (Cargo Transit)</div>
          <div class="legend-item"><span class="legend-dot" style="background: #403D39;"></span> Mechanics & Clinics (Diagnostics)</div>
          <div class="legend-item" style="margin-left: auto; color: var(--text-muted);">Click any pin to inspect verified equipment & services</div>
        </div>

        <!-- Main Map Viewport -->
        <div class="map-viewport-container">
          <!-- Canvas Card -->
          <div class="map-canvas-card">
            <svg class="map-svg-board" viewBox="0 0 1000 650" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <!-- River Gradient -->
                <linearGradient id="riverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#BAE6FD"/>
                  <stop offset="100%" stop-color="#7DD3FC"/>
                </linearGradient>

                <!-- Hill Contour Pattern -->
                <pattern id="contourPattern" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 0 20 Q 20 10 40 20" fill="none" stroke="#D1E2D4" stroke-width="1.2"/>
                  <path d="M 0 40 Q 20 30 40 40" fill="none" stroke="#D1E2D4" stroke-width="1.2"/>
                </pattern>

                <filter id="pinShadow" x="-30%" y="-30%" width="160%" height="160%">
                  <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#0B2418" flood-opacity="0.25"/>
                </filter>
              </defs>

              <!-- Map Background Landmass -->
              <rect width="1000" height="650" fill="#EDF4EE"/>
              <rect width="1000" height="650" fill="url(#contourPattern)"/>

              <!-- Mountain Ridges Topography (North Ridge & Solan Hills) -->
              <path d="M 40 80 Q 220 20 400 90 T 780 40 T 960 110 L 1000 0 L 0 0 Z" fill="#DEEBDD" opacity="0.8"/>
              <path d="M 600 200 Q 750 150 980 230 L 1000 180 L 1000 0 L 520 0 Z" fill="#D3E5D2" opacity="0.6"/>

              <!-- River Solan Basin Flow -->
              <path d="M 120 0 C 180 180 210 260 280 360 C 350 460 410 520 520 650" fill="none" stroke="url(#riverGrad)" stroke-width="26" stroke-linecap="round"/>
              <path d="M 120 0 C 180 180 210 260 280 360 C 350 460 410 520 520 650" fill="none" stroke="#FFFFFF" stroke-width="4" stroke-dasharray="16 24" opacity="0.6"/>
              
              <!-- Tributary Branch -->
              <path d="M 280 360 C 160 410 80 480 0 510" fill="none" stroke="url(#riverGrad)" stroke-width="14" stroke-linecap="round"/>

              <!-- Transit Highway Corridors (Highland Route 14 & Mandi Bypass) -->
              <path id="transitCorridorMain" d="M 50 480 L 260 380 L 520 270 L 780 180 L 950 150" fill="none" stroke="#DFD5C3" stroke-width="10" stroke-linecap="round"/>
              <path d="M 50 480 L 260 380 L 520 270 L 780 180 L 950 150" fill="none" stroke="#F4A261" stroke-width="3" stroke-dasharray="8 8"/>

              <!-- Mountain Feeder Roads -->
              <path d="M 280 230 L 520 270 L 450 420 L 350 530" fill="none" stroke="#DFD5C3" stroke-width="5" stroke-dasharray="6 6"/>

              <!-- District Labels -->
              <text x="140" y="160" font-family="'Georgia', serif" font-size="16" font-style="italic" fill="#73847B">Riverside Organic Orchards</text>
              <text x="700" y="120" font-family="'Georgia', serif" font-size="16" font-style="italic" fill="#73847B">Central Mandi Commercial Hub</text>
              <text x="480" y="580" font-family="'Georgia', serif" font-size="16" font-style="italic" fill="#73847B">Lower Valley Agro Corridors</text>

              <!-- Node Connective Pulse Line to Active Node -->
              ${this.renderActiveRoute(activeNode)}

              <!-- Interactive Node Pins -->
              ${nodes.map(n => {
                const isFiltered = this.activeFilter !== 'all' && n.type !== this.activeFilter && n.sector !== this.activeFilter;
                const isActive = n.id === this.activeNodeId;
                const cx = (n.x / 100) * 1000;
                const cy = (n.y / 100) * 650;
                const color = this.getNodeColor(n.type);

                return `
                  <g class="map-pin ${isActive ? 'active-pin' : ''}" data-id="${n.id}" style="${isFiltered ? 'opacity: 0.2;' : ''}">
                    ${isActive ? `
                      <circle cx="${cx}" cy="${cy}" r="30" fill="${color}" fill-opacity="0.25" class="pulse-indicator"/>
                    ` : ''}
                    <circle cx="${cx}" cy="${cy}" r="${isActive ? 18 : 14}" fill="${color}" stroke="#FFFFFF" stroke-width="3" filter="url(#pinShadow)"/>
                    <!-- Pin Icon Symbol -->
                    <circle cx="${cx}" cy="${cy}" r="5" fill="#FFFFFF"/>
                    <!-- Pin Label -->
                    <text x="${cx}" y="${cy + 28}" font-family="sans-serif" font-size="11" font-weight="700" fill="#0B2418" text-anchor="middle" filter="drop-shadow(0 1px 2px #FFFFFF)">
                      ${n.name.split(' ')[0]} ${n.name.split(' ')[1] || ''}
                    </text>
                  </g>
                `;
              }).join('')}
            </svg>
          </div>

          <!-- Node Detail Inspector Drawer -->
          <div class="map-sidebar-details">
            <div>
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                <span class="badge ${this.getSectorBadgeClass(activeNode.sector)}">
                  ${activeNode.sector.toUpperCase()}
                </span>
                <span class="badge badge-verification-field">
                  ${activeNode.verificationLabel}
                </span>
              </div>

              <h3 style="font-family: var(--font-family-display); font-size: 1.35rem; color: var(--color-forest-900); margin-bottom: 6px;">
                ${activeNode.name}
              </h3>
              <div style="font-size: var(--font-size-xs); color: var(--text-muted); margin-bottom: 14px;">
                📍 ${activeNode.district} • Lead: <strong>${activeNode.facilitator}</strong>
              </div>

              <p style="font-size: var(--font-size-sm); color: var(--text-secondary); line-height: 1.5; margin-bottom: 16px;">
                ${activeNode.description}
              </p>

              <!-- Node Facility Metrics -->
              <div style="background: var(--color-ivory-100); border: 1px solid var(--border-medium); border-radius: var(--radius-md); padding: 12px; margin-bottom: 16px; font-size: var(--font-size-xs);">
                <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
                  <span style="color: var(--text-muted);">Active Workstations / Bays:</span>
                  <strong style="color: var(--color-forest-900);">${activeNode.activeWorkstations || 'On-Demand Staging'}</strong>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
                  <span style="color: var(--text-muted);">Active Opportunities Linked:</span>
                  <strong style="color: var(--color-orange-700);">${activeNode.activeOpportunities} Open Requests</strong>
                </div>
                <div style="display: flex; justify-content: space-between;">
                  <span style="color: var(--text-muted);">Verified Contact Relay:</span>
                  <span class="phone-masked-chip">${activeNode.contactMasked}</span>
                </div>
              </div>

              <!-- Services Available -->
              <div style="margin-bottom: 16px;">
                <div style="font-size: 0.72rem; font-weight: 700; color: var(--color-forest-800); text-transform: uppercase; margin-bottom: 6px;">
                  Verified Community Services:
                </div>
                <div style="display: flex; flex-wrap: wrap; gap: 6px;">
                  ${activeNode.services.map(s => `
                    <span class="badge" style="background: #FFFFFF; border: 1px solid var(--border-medium); color: var(--text-primary); font-size: 0.7rem;">
                      ✓ ${s}
                    </span>
                  `).join('')}
                </div>
              </div>
            </div>

            <!-- Footer Actions -->
            <div style="border-top: 1px solid var(--border-light); padding-top: 14px; display: flex; flex-direction: column; gap: 8px;">
              <button class="btn btn-primary btn-sm" id="btnConnectToNode" style="width: 100%;">
                Filter Opportunities Near This Hub
              </button>
              <button class="btn btn-outline btn-sm" id="btnInspectNodeFacilitator" style="width: 100%;">
                View Lead Profile (${activeNode.facilitator.split(' ')[0]})
              </button>
            </div>
          </div>
        </div>
      </section>
    `;

    this.bindEvents(container);
  },

  renderActiveRoute(activeNode) {
    if (!activeNode) return '';
    const cx = (activeNode.x / 100) * 1000;
    const cy = (activeNode.y / 100) * 650;
    // Draw animated dashed route line from center staging point (520, 270)
    return `
      <line x1="520" y1="270" x2="${cx}" y2="${cy}" stroke="#D96B27" stroke-width="2.5" stroke-dasharray="6 6" class="flow-particle"/>
    `;
  },

  getNodeColor(type) {
    switch(type) {
      case 'learning_center': return '#2A9D8F';
      case 'agri_hub': return '#1B4D36';
      case 'transport_hub': return '#D96B27';
      case 'mechanic': return '#403D39';
      default: return '#256648';
    }
  },

  getSectorBadgeClass(sector) {
    switch(sector) {
      case 'learn': return 'badge-sector-learn';
      case 'move': return 'badge-sector-move';
      case 'grow': return 'badge-sector-grow';
      case 'expert': return 'badge-sector-expert';
      default: return 'badge-sector-learn';
    }
  },

  bindEvents(container) {
    // Pin clicks
    container.querySelectorAll('.map-pin').forEach(pin => {
      pin.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        this.activeNodeId = id;
        this.render(container);
      });
    });

    // Filter clicks
    container.querySelectorAll('.map-filter-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const filter = e.currentTarget.getAttribute('data-filter');
        this.activeFilter = filter;
        this.render(container);
      });
    });

    // Connect / Filter opportunities near this hub
    const btnConnect = container.querySelector('#btnConnectToNode');
    if (btnConnect) {
      btnConnect.addEventListener('click', () => {
        const data = window.LIFELOOP_DATA;
        const activeNode = data.mapNodes.find(n => n.id === this.activeNodeId);
        if (activeNode) {
          window.lifeLoopState.setFilter('sector', activeNode.sector);
          window.lifeLoopState.setView('matcher');
          window.LifeLoopApp.showToast(`Filtered opportunities for ${activeNode.name}`, 'info');
        }
      });
    }

    // Inspect facilitator
    const btnFacilitator = container.querySelector('#btnInspectNodeFacilitator');
    if (btnFacilitator) {
      btnFacilitator.addEventListener('click', () => {
        const data = window.LIFELOOP_DATA;
        const activeNode = data.mapNodes.find(n => n.id === this.activeNodeId);
        if (activeNode) {
          window.ProfileModal.open(activeNode.facilitator);
        }
      });
    }
  }
};
