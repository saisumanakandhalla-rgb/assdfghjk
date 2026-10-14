/**
 * LIFELOOP — Feature 1: Opportunity Matcher Component
 * Connects Students, Farmers, Vehicle Providers, and Experts.
 * Supports publishing requests, filtering, expressing interest, and viewing poster credentials.
 */

window.OpportunityMatcher = {
  render(container) {
    const state = window.lifeLoopState.state;
    const blockedUsers = state.blockedUsers || [];

    // Filter opportunities
    let opps = state.opportunities.filter(o => !blockedUsers.includes(o.postedBy.name));

    if (state.filters.sector && state.filters.sector !== 'all') {
      opps = opps.filter(o => o.sector === state.filters.sector);
    }
    if (state.filters.roleNeeded && state.filters.roleNeeded !== 'all') {
      opps = opps.filter(o => o.roleNeeded.toLowerCase().includes(state.filters.roleNeeded.toLowerCase()));
    }
    if (state.filters.query && state.filters.query.trim() !== '') {
      const q = state.filters.query.toLowerCase();
      opps = opps.filter(o => 
        o.title.toLowerCase().includes(q) ||
        o.description.toLowerCase().includes(q) ||
        o.category.toLowerCase().includes(q) ||
        o.location.toLowerCase().includes(q) ||
        o.postedBy.name.toLowerCase().includes(q)
      );
    }

    container.innerHTML = `
      <section class="matcher-section">
        <!-- Top Action & Search Bar -->
        <div class="filter-bar">
          <div class="filter-group">
            <div class="search-input-wrapper">
              <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input type="text" id="oppSearchInput" class="form-input search-input" 
                placeholder="Search by skill, crop, vehicle, or block..." 
                value="${state.filters.query || ''}">
            </div>

            <!-- Sector Filter -->
            <select id="oppSectorFilter" class="form-select" style="width: auto;">
              <option value="all" ${state.filters.sector === 'all' ? 'selected' : ''}>All Sectors (Learn, Move, Grow)</option>
              <option value="learn" ${state.filters.sector === 'learn' ? 'selected' : ''}>🎓 Learn (Digital Skills)</option>
              <option value="move" ${state.filters.sector === 'move' ? 'selected' : ''}>🚚 Move (Transit Pooling)</option>
              <option value="grow" ${state.filters.sector === 'grow' ? 'selected' : ''}>🌱 Grow (Farm Advisory)</option>
              <option value="expert" ${state.filters.sector === 'expert' ? 'selected' : ''}>🔧 Expert & Maintenance</option>
            </select>

            <!-- Role Needed Filter -->
            <select id="oppRoleFilter" class="form-select" style="width: auto;">
              <option value="all" ${state.filters.roleNeeded === 'all' ? 'selected' : ''}>All Roles Needed</option>
              <option value="student" ${state.filters.roleNeeded === 'student' ? 'selected' : ''}>Student / Digital Scribe</option>
              <option value="vehicle" ${state.filters.roleNeeded === 'vehicle' ? 'selected' : ''}>Vehicle Provider</option>
              <option value="farmer" ${state.filters.roleNeeded === 'farmer' ? 'selected' : ''}>Farmer / Merchant</option>
              <option value="expert" ${state.filters.roleNeeded === 'expert' ? 'selected' : ''}>Mechanic / Agronomist</option>
            </select>
          </div>

          <div class="filter-actions">
            <button class="btn btn-primary" id="btnPublishOpportunity">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <line x1="12" y1="5" x2="12" y2="19"/>
                <line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              Publish a Community Request
            </button>
          </div>
        </div>

        <!-- Role Context Advisory Card -->
        <div style="background: var(--color-ivory-100); border: 1px solid var(--border-medium); border-radius: var(--radius-lg); padding: 12px 18px; margin-bottom: 24px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px;">
          <div style="display: flex; align-items: center; gap: 10px; font-size: var(--font-size-xs);">
            <span style="font-weight: 700; color: var(--color-forest-800);">Active Identity:</span>
            <span class="badge ${this.getRoleBadgeClass(state.currentRole)}">${state.activeUser.name} (${state.activeUser.roleTitle})</span>
            <span class="phone-masked-chip">${state.activeUser.phoneMasked}</span>
          </div>
          <div style="font-size: var(--font-size-xs); color: var(--text-muted);">
            Expressing interest awards <strong>+25 CIP</strong> to your verified civic profile.
          </div>
        </div>

        <!-- Opportunities Grid -->
        <div class="opportunities-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(360px, 1fr)); gap: 24px;">
          ${opps.length > 0 ? opps.map(opp => this.renderOpportunityCard(opp, state)).join('') : this.renderEmptyState()}
        </div>
      </section>
    `;

    this.bindEvents(container);
  },

  renderOpportunityCard(opp, state) {
    const isExpressed = !!state.myInterests[opp.id];
    const isMine = opp.postedBy.name === state.activeUser.name;
    const isSample = opp.isSample;

    const sectorBadgeClass = `badge-sector-${opp.sector}`;
    const verificationBadge = this.getVerificationBadge(opp.postedBy.verificationStatus);

    return `
      <div class="card opportunity-card" data-id="${opp.id}">
        <div class="card-header">
          <div style="display: flex; flex-direction: column; gap: 6px;">
            <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
              <span class="badge ${sectorBadgeClass}">${opp.sector.toUpperCase()}</span>
              ${isSample ? '<span class="badge badge-sample-data">Simulated Sample</span>' : '<span class="badge badge-user-created">User Created</span>'}
              <span class="badge" style="background: var(--color-ivory-200); color: var(--text-secondary); font-size: 0.68rem;">Urgency: ${opp.urgency}</span>
            </div>
            <h3 class="card-title" style="font-size: 1.15rem; margin-top: 4px;">${this.escapeHtml(opp.title)}</h3>
          </div>
        </div>

        <div class="card-body">
          <p style="margin-bottom: 14px; font-size: var(--font-size-sm); color: var(--text-secondary); line-height: 1.5;">
            ${this.escapeHtml(opp.description)}
          </p>

          <div style="background: var(--color-ivory-50); border: 1px solid var(--border-light); border-radius: var(--radius-md); padding: 10px 12px; margin-bottom: 14px; font-size: var(--font-size-xs);">
            <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
              <span style="color: var(--text-muted); font-weight: 600;">Role Needed:</span>
              <strong style="color: var(--color-forest-800);">${opp.roleNeeded}</strong>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
              <span style="color: var(--text-muted); font-weight: 600;">Location:</span>
              <strong style="color: var(--text-primary);">${opp.location}</strong>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span style="color: var(--text-muted); font-weight: 600;">Civic Honorarium:</span>
              <span style="color: var(--color-orange-700); font-weight: 700;">${opp.reward}</span>
            </div>
          </div>

          <!-- Poster Meta -->
          <div style="display: flex; align-items: center; justify-content: space-between; font-size: var(--font-size-xs); padding-top: 8px; border-top: 1px solid var(--border-light);">
            <div style="display: flex; align-items: center; gap: 8px;">
              <div style="width: 28px; height: 28px; border-radius: 50%; background: var(--color-forest-700); color: #FFF; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.72rem;">
                ${opp.postedBy.name.charAt(0)}
              </div>
              <div>
                <a href="javascript:void(0)" class="view-poster-btn" data-name="${opp.postedBy.name}" style="font-weight: 700; color: var(--color-forest-900); text-decoration: underline;">
                  ${opp.postedBy.name}
                </a>
                <div>${verificationBadge}</div>
              </div>
            </div>
            <span class="phone-masked-chip">${opp.postedBy.phoneMasked}</span>
          </div>
        </div>

        <div class="card-footer" style="padding-top: 14px;">
          <div style="font-size: var(--font-size-xs); color: var(--text-muted);">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align: middle;">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
            <strong>${opp.interestedCount || 0}</strong> expressed interest
          </div>

          <div style="display: flex; gap: 8px;">
            <button class="btn btn-outline btn-sm btn-view-details" data-id="${opp.id}">
              Inspect Details
            </button>

            ${isMine ? `
              <span class="badge" style="background: var(--color-ivory-200); color: var(--text-muted);">Your Request</span>
            ` : isExpressed ? `
              <button class="btn btn-sm" style="background: var(--color-forest-100); color: var(--color-forest-800); border: 1px solid var(--color-forest-300);" disabled>
                ✓ Interest Registered
              </button>
            ` : `
              <button class="btn btn-primary btn-sm btn-express-interest" data-id="${opp.id}" data-title="${this.escapeHtml(opp.title)}">
                Express Interest
              </button>
            `}
          </div>
        </div>
      </div>
    `;
  },

  renderEmptyState() {
    return `
      <div class="empty-state" style="grid-column: 1 / -1;">
        <svg class="empty-state-svg" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="60" cy="60" r="50" fill="#EDF5EF" stroke="#6EA98A" stroke-width="2" stroke-dasharray="4 4"/>
          <path d="M45 55L60 70L75 55" stroke="#1B4D36" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
          <circle cx="60" cy="40" r="8" fill="#D96B27"/>
        </svg>
        <h3 class="empty-state-title">No Matching Opportunities Found</h3>
        <p class="empty-state-desc">
          Try loosening your filter criteria or publish a new request to kickstart a community connection.
        </p>
        <button class="btn btn-primary" id="btnEmptyResetFilters">Reset Filters</button>
      </div>
    `;
  },

  getVerificationBadge(status) {
    if (status === 'field_verified') {
      return `<span class="badge badge-verification-field" title="In-person verified credentials">✓ Field Verified</span>`;
    } else if (status === 'community_vouched') {
      return `<span class="badge badge-verification-vouched" title="Vouched by local cooperative members">👥 Community Vouched</span>`;
    }
    return `<span class="badge badge-verification-unverified" title="Standard unverified registration">⚠ Unverified Account</span>`;
  },

  getRoleBadgeClass(role) {
    switch(role) {
      case 'student': return 'badge-sector-learn';
      case 'provider': return 'badge-sector-move';
      case 'farmer': return 'badge-sector-grow';
      case 'expert': return 'badge-sector-expert';
      default: return 'badge-sector-learn';
    }
  },

  bindEvents(container) {
    // Search input
    const searchInput = container.querySelector('#oppSearchInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        window.lifeLoopState.setFilter('query', e.target.value);
        this.render(container);
      });
    }

    // Sector filter
    const sectorFilter = container.querySelector('#oppSectorFilter');
    if (sectorFilter) {
      sectorFilter.addEventListener('change', (e) => {
        window.lifeLoopState.setFilter('sector', e.target.value);
        this.render(container);
      });
    }

    // Role filter
    const roleFilter = container.querySelector('#oppRoleFilter');
    if (roleFilter) {
      roleFilter.addEventListener('change', (e) => {
        window.lifeLoopState.setFilter('roleNeeded', e.target.value);
        this.render(container);
      });
    }

    // Reset filters
    const btnReset = container.querySelector('#btnEmptyResetFilters');
    if (btnReset) {
      btnReset.addEventListener('click', () => {
        window.lifeLoopState.setFilter('sector', 'all');
        window.lifeLoopState.setFilter('roleNeeded', 'all');
        window.lifeLoopState.setFilter('query', '');
        this.render(container);
      });
    }

    // Publish Request Button
    const btnPublish = container.querySelector('#btnPublishOpportunity');
    if (btnPublish) {
      btnPublish.addEventListener('click', () => {
        this.openPublishModal();
      });
    }

    // Express Interest Buttons
    container.querySelectorAll('.btn-express-interest').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        const title = e.currentTarget.getAttribute('data-title');
        this.openExpressInterestModal(id, title);
      });
    });

    // Inspect Details Buttons
    container.querySelectorAll('.btn-view-details').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        this.openDetailsModal(id);
      });
    });

    // View Poster Profile
    container.querySelectorAll('.view-poster-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const name = e.currentTarget.getAttribute('data-name');
        window.ProfileModal.open(name);
      });
    });
  },

  openPublishModal() {
    const modalOverlay = document.getElementById('globalModalOverlay');
    const modalCard = document.getElementById('globalModalCard');
    const state = window.lifeLoopState.state;

    modalCard.innerHTML = `
      <div class="modal-header">
        <h3 class="modal-title">Publish Community Opportunity</h3>
        <button class="modal-close-btn" id="modalCloseX">&times;</button>
      </div>
      <div class="modal-body">
        <form id="publishOppForm">
          <div style="background: var(--color-forest-50); border: 1px solid var(--color-forest-300); padding: 12px; border-radius: var(--radius-md); margin-bottom: 16px; font-size: var(--font-size-xs); color: var(--color-forest-900);">
            <strong>Publishing as:</strong> ${state.activeUser.name} (${state.activeUser.roleTitle}) • 
            <span class="phone-masked-chip">${state.activeUser.phoneMasked}</span>
            <div style="margin-top: 4px; color: var(--text-muted);">Your listing will be tagged as <strong>User Created</strong> and visible across the ecosystem.</div>
          </div>

          <div class="form-group">
            <label class="form-label">Opportunity Title <span class="required">*</span></label>
            <input type="text" id="newOppTitle" class="form-input" placeholder="e.g. Audit Mandi Crate Slips for Ginger Harvest" required>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Sector <span class="required">*</span></label>
              <select id="newOppSector" class="form-select" required>
                <option value="learn">🎓 Learn — Digital Skills</option>
                <option value="move">🚚 Move — Community Mobility</option>
                <option value="grow">🌱 Grow — Farm Advisory</option>
                <option value="expert">🔧 Expert — Technical / Repair</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Role Needed <span class="required">*</span></label>
              <input type="text" id="newOppRoleNeeded" class="form-input" placeholder="e.g. Student / Digital Scribe" required>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Category</label>
              <input type="text" id="newOppCategory" class="form-input" placeholder="e.g. Digital Record Keeping">
            </div>
            <div class="form-group">
              <label class="form-label">Location / Block <span class="required">*</span></label>
              <input type="text" id="newOppLocation" class="form-input" placeholder="e.g. Riverside Block (Within 8 km)" required>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Urgency</label>
              <select id="newOppUrgency" class="form-select">
                <option value="Standard">Standard</option>
                <option value="Medium">Medium Priority</option>
                <option value="High">High Urgency (Time Sensitive)</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Honorarium / Civic Reward</label>
              <input type="text" id="newOppReward" class="form-input" placeholder="e.g. 150 CIP + Travel Allowance">
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Detailed Description <span class="required">*</span></label>
            <textarea id="newOppDesc" class="form-textarea" placeholder="Explain the exact community problem, equipment involved, and expected duration..." required></textarea>
          </div>

          <div class="modal-footer" style="margin: 20px -24px -24px; padding: 16px 24px;">
            <button type="button" class="btn btn-secondary" id="btnCancelPublish">Cancel</button>
            <button type="submit" class="btn btn-primary">Publish to Community Loop</button>
          </div>
        </form>
      </div>
    `;

    modalOverlay.classList.add('active');

    // Close logic
    const closeModal = () => modalOverlay.classList.remove('active');
    modalCard.querySelector('#modalCloseX').addEventListener('click', closeModal);
    modalCard.querySelector('#btnCancelPublish').addEventListener('click', closeModal);

    // Submit handler
    const form = modalCard.querySelector('#publishOppForm');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = modalCard.querySelector('#newOppTitle').value.trim();
      const sector = modalCard.querySelector('#newOppSector').value;
      const roleNeeded = modalCard.querySelector('#newOppRoleNeeded').value.trim();
      const category = modalCard.querySelector('#newOppCategory').value.trim();
      const location = modalCard.querySelector('#newOppLocation').value.trim();
      const urgency = modalCard.querySelector('#newOppUrgency').value;
      const reward = modalCard.querySelector('#newOppReward').value.trim();
      const description = modalCard.querySelector('#newOppDesc').value.trim();

      if (!title || !description || !location) {
        alert('Please fill out all required fields.');
        return;
      }

      window.lifeLoopState.addOpportunity({
        title, sector, roleNeeded, category, location, urgency, reward, description
      });

      closeModal();
      window.LifeLoopApp.showToast(`Opportunity published successfully! +15 CIP awarded.`, 'success');
      this.render(document.getElementById('viewContainer'));
    });
  },

  openExpressInterestModal(oppId, title) {
    const modalOverlay = document.getElementById('globalModalOverlay');
    const modalCard = document.getElementById('globalModalCard');
    const state = window.lifeLoopState.state;

    modalCard.innerHTML = `
      <div class="modal-header">
        <h3 class="modal-title">Express Civic Interest</h3>
        <button class="modal-close-btn" id="modalCloseX">&times;</button>
      </div>
      <div class="modal-body">
        <p style="font-size: var(--font-size-sm); color: var(--text-secondary); margin-bottom: 16px;">
          You are volunteering or proposing to assist with:
          <strong style="color: var(--color-forest-900); display: block; margin-top: 4px;">${this.escapeHtml(title)}</strong>
        </p>

        <div style="background: var(--color-ivory-100); border: 1px solid var(--border-medium); border-radius: var(--radius-md); padding: 12px; margin-bottom: 16px; font-size: var(--font-size-xs);">
          <div style="font-weight: 700; color: var(--color-forest-800); margin-bottom: 4px;">
            🔒 Privacy Relay Guarantee
          </div>
          Your personal telephone number is masked. The opportunity owner will receive your platform verified profile, skill credentials, and note through the secure civic loop.
        </div>

        <div class="form-group">
          <label class="form-label">Message / Availability Note <span class="required">*</span></label>
          <textarea id="expressInterestMsg" class="form-textarea" placeholder="Describe your relevant experience and when you are free to assist..." required>Hello! I am active in this area and would be glad to help with this task.</textarea>
        </div>

        <div class="modal-footer" style="margin: 20px -24px -24px; padding: 16px 24px;">
          <button type="button" class="btn btn-secondary" id="btnCancelExpress">Cancel</button>
          <button type="button" class="btn btn-primary" id="btnConfirmExpress">Send Expression of Interest</button>
        </div>
      </div>
    `;

    modalOverlay.classList.add('active');
    const closeModal = () => modalOverlay.classList.remove('active');
    modalCard.querySelector('#modalCloseX').addEventListener('click', closeModal);
    modalCard.querySelector('#btnCancelExpress').addEventListener('click', closeModal);

    modalCard.querySelector('#btnConfirmExpress').addEventListener('click', () => {
      const msg = modalCard.querySelector('#expressInterestMsg').value.trim();
      const success = window.lifeLoopState.expressInterestInOpportunity(oppId, msg);
      closeModal();

      if (success) {
        window.LifeLoopApp.showToast(`Interest registered! You earned +25 CIP for community collaboration.`, 'success');
        this.render(document.getElementById('viewContainer'));
      }
    });
  },

  openDetailsModal(oppId) {
    const state = window.lifeLoopState.state;
    const opp = state.opportunities.find(o => o.id === oppId);
    if (!opp) return;

    const modalOverlay = document.getElementById('globalModalOverlay');
    const modalCard = document.getElementById('globalModalCard');

    modalCard.innerHTML = `
      <div class="modal-header">
        <div>
          <span class="badge badge-sector-${opp.sector}">${opp.sector.toUpperCase()}</span>
          <h3 class="modal-title" style="margin-top: 6px;">${this.escapeHtml(opp.title)}</h3>
        </div>
        <button class="modal-close-btn" id="modalCloseX">&times;</button>
      </div>
      <div class="modal-body">
        <div style="background: var(--color-ivory-50); border: 1px solid var(--border-light); border-radius: var(--radius-lg); padding: 16px; margin-bottom: 20px;">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; font-size: var(--font-size-xs);">
            <div><span style="color: var(--text-muted);">Category:</span> <strong>${opp.category}</strong></div>
            <div><span style="color: var(--text-muted);">Urgency:</span> <strong>${opp.urgency}</strong></div>
            <div><span style="color: var(--text-muted);">Role Needed:</span> <strong>${opp.roleNeeded}</strong></div>
            <div><span style="color: var(--text-muted);">Location:</span> <strong>${opp.location}</strong></div>
            <div><span style="color: var(--text-muted);">Civic Reward:</span> <strong style="color: var(--color-orange-700);">${opp.reward}</strong></div>
            <div><span style="color: var(--text-muted);">Date Posted:</span> <strong>${opp.datePosted}</strong></div>
          </div>
        </div>

        <h4 style="font-size: var(--font-size-base); color: var(--color-forest-900); margin-bottom: 8px;">Full Brief</h4>
        <p style="font-size: var(--font-size-sm); color: var(--text-secondary); line-height: 1.6; margin-bottom: 24px;">
          ${this.escapeHtml(opp.description)}
        </p>

        <h4 style="font-size: var(--font-size-base); color: var(--color-forest-900); margin-bottom: 12px;">Posted By</h4>
        <div style="display: flex; align-items: center; justify-content: space-between; background: var(--color-ivory-100); border: 1px solid var(--border-medium); border-radius: var(--radius-md); padding: 14px;">
          <div>
            <div style="font-weight: 700; font-size: var(--font-size-sm); color: var(--color-forest-900);">${opp.postedBy.name}</div>
            <div style="font-size: var(--font-size-xs); color: var(--text-muted); margin-top: 2px;">${opp.postedBy.location}</div>
            <div style="margin-top: 6px;">${this.getVerificationBadge(opp.postedBy.verificationStatus)}</div>
          </div>
          <div style="text-align: right;">
            <div class="phone-masked-chip">${opp.postedBy.phoneMasked}</div>
            <div style="margin-top: 8px;">
              <button class="btn btn-outline btn-sm" id="btnInspectPosterProfile" data-name="${opp.postedBy.name}">View Full Profile</button>
            </div>
          </div>
        </div>

        <div style="margin-top: 20px; font-size: 0.75rem; color: var(--text-muted); border-top: 1px solid var(--border-light); padding-top: 12px; display: flex; align-items: center; justify-content: space-between;">
          <span>⚖️ Demo sandbox listing. Not a commercial legally-binding agreement.</span>
          <button class="btn btn-outline btn-sm" id="btnReportListing" style="color: var(--color-danger); border-color: var(--color-danger);">
            Report Listing
          </button>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" id="btnCloseDetails">Close</button>
      </div>
    `;

    modalOverlay.classList.add('active');
    const closeModal = () => modalOverlay.classList.remove('active');
    modalCard.querySelector('#modalCloseX').addEventListener('click', closeModal);
    modalCard.querySelector('#btnCloseDetails').addEventListener('click', closeModal);

    modalCard.querySelector('#btnInspectPosterProfile').addEventListener('click', () => {
      closeModal();
      window.ProfileModal.open(opp.postedBy.name);
    });

    modalCard.querySelector('#btnReportListing').addEventListener('click', () => {
      closeModal();
      window.TrustSafety.openReportModal(opp.title + ' by ' + opp.postedBy.name);
    });
  },

  escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>"']/g, function(m) {
      switch(m) {
        case '&': return '&amp;';
        case '<': return '&lt;';
        case '>': return '&gt;';
        case '"': return '&quot;';
        case "'": return '&#39;';
        default: return m;
      }
    });
  }
};
