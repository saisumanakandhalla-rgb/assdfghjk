/**
 * LIFELOOP — Feature 2: Farm-to-Transport Matching Component
 * Enables farmers to publish haulage requests and vehicle providers to browse and express interest.
 * Includes intelligent suitability scoring algorithm and STRICT provider-confirmation rule.
 */

window.TransportMatcher = {
  render(container) {
    const state = window.lifeLoopState.state;
    const requests = state.transportRequests;

    container.innerHTML = `
      <section class="transport-layout">
        <!-- Top Banner -->
        <div class="transport-header-banner">
          <div class="transport-header-info">
            <h2>Farm-to-Transport Community Logistics</h2>
            <p>
              Direct matching between smallholder farmers and verified rural vehicle owners.
              Eliminating middlemen extortion and preventing perishable crop spoilage through transparent capacity sharing.
            </p>
          </div>
          <div style="display: flex; gap: 12px; flex-wrap: wrap;">
            <button class="btn btn-primary" id="btnCreateTransportRequest" style="background: var(--color-orange-600); border-color: var(--color-orange-600);">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <line x1="12" y1="5" x2="12" y2="19"/>
                <line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              Create Farm Produce Request
            </button>
            <button class="btn btn-secondary" id="btnToggleVehiclesPool">
              Inspect Available Fleet (${state.vehicles.length})
            </button>
          </div>
        </div>

        <!-- Strict Trust Notice -->
        <div style="background: #FFFBEB; border: 1px solid #FDE68A; border-radius: var(--radius-lg); padding: 14px 20px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; font-size: var(--font-size-xs);">
          <div style="display: flex; align-items: center; gap: 10px;">
            <span style="font-size: 1.25rem;">⚖️</span>
            <div>
              <strong style="color: #92400E;">Civic Dispatch Integrity Rule:</strong>
              <span style="color: #78350F;">
                A booking is <em>never</em> claimed as confirmed until the vehicle provider explicitly reviews capacity, route conditions, and confirms the dispatch.
              </span>
            </div>
          </div>
          <div style="font-weight: 700; color: #92400E;">
            Current Persona: ${state.activeUser.name} (${state.activeUser.role.toUpperCase()})
          </div>
        </div>

        <!-- Transport Requests Grid -->
        <div class="transport-requests-grid">
          ${requests.map(req => this.renderRequestCard(req, state)).join('')}
        </div>
      </section>
    `;

    this.bindEvents(container);
  },

  renderRequestCard(req, state) {
    const isSample = req.isSample;
    const isFarmer = state.currentRole === 'farmer';
    const isProvider = state.currentRole === 'provider';
    const hasInterested = req.interestedProviders && req.interestedProviders.length > 0;
    const isConfirmed = req.status === 'confirmed';
    const isProposed = req.status === 'proposed';

    return `
      <div class="transport-card" data-req-id="${req.id}">
        <div class="card-header" style="margin-bottom: 8px;">
          <div>
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
              <span class="badge ${this.getStatusBadgeClass(req.status)}">
                ${this.getStatusLabel(req.status)}
              </span>
              ${isSample ? '<span class="badge badge-sample-data">Simulated Sample</span>' : '<span class="badge badge-user-created">Farmer Created</span>'}
              <span class="badge" style="background: var(--color-orange-50); color: var(--color-orange-800); border: 1px solid var(--color-orange-300);">
                ${req.urgency}
              </span>
            </div>
            <h3 class="card-title" style="font-size: 1.25rem; color: var(--color-forest-900);">
              ${this.escapeHtml(req.cropType)}
            </h3>
            <div class="card-subtitle">
              Requested by <strong>${req.farmerName}</strong> • ${req.farmerLocation}
            </div>
          </div>
        </div>

        <!-- Meta Grid -->
        <div class="transport-meta-grid">
          <div class="transport-meta-item">
            <strong>Harvest Quantity</strong>
            <span>${req.quantityFormatted || req.quantityKg + ' kg'}</span>
          </div>
          <div class="transport-meta-item">
            <strong>Max Transit Budget</strong>
            <span>${req.maxBudget}</span>
          </div>
          <div class="transport-meta-item">
            <strong>Pickup Area</strong>
            <span>${req.pickupArea}</span>
          </div>
          <div class="transport-meta-item">
            <strong>Destination Mandi</strong>
            <span>${req.destinationArea}</span>
          </div>
        </div>

        <div style="font-size: var(--font-size-xs); color: var(--text-secondary); margin-bottom: 12px;">
          <strong>Cargo Handling:</strong> ${req.cargoCondition}
        </div>

        <!-- Suitable Matches Section -->
        <div class="provider-matches-section">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px;">
            <h4 style="font-size: var(--font-size-sm); color: var(--color-forest-900); font-weight: 700;">
              Vehicle Matches & Quotes (${req.interestedProviders ? req.interestedProviders.length : 0})
            </h4>
            <span style="font-size: 0.72rem; color: var(--text-muted);">
              ${isConfirmed ? '✓ Booking Finalized by Driver' : 'Suitability Analysis Active'}
            </span>
          </div>

          ${hasInterested ? req.interestedProviders.map(p => this.renderProviderMatchCard(p, req, state)).join('') : `
            <div style="background: var(--color-ivory-100); border: 1px dashed var(--border-medium); border-radius: var(--radius-md); padding: 14px; text-align: center; font-size: var(--font-size-xs); color: var(--text-muted);">
              Awaiting vehicle provider interest. Verified drivers in the corridor can submit suitability quotes below.
            </div>
          `}
        </div>

        <!-- Card Actions -->
        <div class="card-footer" style="margin-top: 16px;">
          <div style="font-size: var(--font-size-xs); color: var(--text-muted);">
            Pickup scheduled: <strong>${req.preferredDate}</strong>
          </div>

          <div style="display: flex; gap: 8px;">
            ${isProvider && !isConfirmed ? `
              <button class="btn btn-accent btn-sm btn-provider-interest" data-id="${req.id}" data-crop="${this.escapeHtml(req.cropType)}" data-weight="${req.quantityKg}">
                🚚 Propose Vehicle Quote
              </button>
            ` : ''}

            ${!isProvider && !isConfirmed ? `
              <button class="btn btn-outline btn-sm btn-simulate-quote" data-id="${req.id}">
                Match Available Vehicle
              </button>
            ` : ''}
          </div>
        </div>
      </div>
    `;
  },

  renderProviderMatchCard(prov, req, state) {
    const isOverload = req.quantityKg > prov.capacityKg;
    const isConfirmed = prov.status === 'confirmed';
    const isProposed = prov.status === 'dispatch_proposed';
    const isDriverMe = state.currentRole === 'provider' && state.activeUser.name.includes(prov.name.split(' ')[0]);

    return `
      <div class="provider-match-card ${isConfirmed ? 'status-confirmed' : ''}">
        <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 10px;">
          <div>
            <div style="font-weight: 700; color: var(--color-forest-900); font-size: var(--font-size-sm); display: flex; align-items: center; gap: 6px;">
              ${prov.name}
              <span class="badge" style="background: var(--color-forest-50); color: var(--color-forest-700); font-size: 0.65rem;">
                ${prov.vehicle}
              </span>
            </div>
            <div style="font-size: var(--font-size-xs); color: var(--text-muted); margin-top: 2px;">
              Stationed <strong>${prov.distanceToPickupKm} km</strong> away • Capacity: <strong>${prov.capacityKg} kg</strong> • Quote: <strong style="color: var(--color-orange-700);">${prov.quoteProposed}</strong>
            </div>
          </div>

          <div class="suitability-score-pill ${prov.suitabilityScore >= 80 ? 'suitability-score-high' : prov.suitabilityScore >= 65 ? 'suitability-score-med' : 'suitability-score-low'}">
            ${prov.suitabilityScore}% Suitability
          </div>
        </div>

        <!-- Suitability Breakdown Reasons -->
        <div class="suitability-box">
          <div style="font-size: 0.72rem; font-weight: 700; color: var(--color-forest-800); text-transform: uppercase; margin-bottom: 6px;">
            Match Suitability Rationale:
          </div>
          <ul class="suitability-reasons-list">
            ${prov.matchReasons.map(r => `
              <li>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="${r.includes('warning') || r.includes('limitation') ? '#B45309' : '#2E7D32'}" stroke-width="2.5">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span>${r}</span>
              </li>
            `).join('')}
          </ul>
        </div>

        <!-- Provider Confirmation State Machine Actions -->
        <div style="margin-top: 12px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px;">
          <div style="font-size: var(--font-size-xs);">
            ${isConfirmed ? `
              <span style="color: #2E7D32; font-weight: 700;">
                ✓ Booking Confirmed by Provider (${prov.confirmedAt || 'Verified'})
              </span>
            ` : isProposed ? `
              <span style="color: var(--color-warning); font-weight: 700;">
                ⏳ Dispatch Proposed — Pending Provider Review
              </span>
            ` : `
              <span style="color: var(--text-muted);">
                Interest submitted by driver at ${prov.expressedAt}
              </span>
            `}
          </div>

          <div>
            ${!isConfirmed && !isProposed ? `
              <button class="btn btn-outline btn-sm btn-propose-dispatch" data-req-id="${req.id}" data-prov-id="${prov.providerId}" data-prov-name="${prov.name}">
                Propose Terms to Driver
              </button>
            ` : ''}

            ${isProposed && !isConfirmed ? `
              <button class="btn btn-primary btn-sm btn-driver-confirm" data-req-id="${req.id}" data-prov-id="${prov.providerId}" data-prov-name="${prov.name}" style="background: var(--color-forest-700);">
                Driver: Confirm Booking & Schedule Dispatch
              </button>
            ` : ''}

            ${isConfirmed ? `
              <button class="btn btn-secondary btn-sm btn-view-trip-manifest" data-req-id="${req.id}" data-prov-id="${prov.providerId}">
                📄 View Dispatch Manifest
              </button>
            ` : ''}
          </div>
        </div>
      </div>
    `;
  },

  getStatusBadgeClass(status) {
    switch(status) {
      case 'confirmed': return 'badge-sector-grow';
      case 'proposed': return 'badge-verification-unverified';
      case 'interest_received': return 'badge-sector-move';
      default: return 'badge-verification-vouched';
    }
  },

  getStatusLabel(status) {
    switch(status) {
      case 'confirmed': return '✓ Confirmed by Driver';
      case 'proposed': return '⏳ Terms Proposed (Pending Driver)';
      case 'interest_received': return 'Quotes Available';
      default: return 'Haulage Open';
    }
  },

  bindEvents(container) {
    // Create Request Button
    const btnCreate = container.querySelector('#btnCreateTransportRequest');
    if (btnCreate) {
      btnCreate.addEventListener('click', () => this.openCreateRequestModal());
    }

    // Toggle Fleet Pool Button
    const btnFleet = container.querySelector('#btnToggleVehiclesPool');
    if (btnFleet) {
      btnFleet.addEventListener('click', () => this.openFleetPoolModal());
    }

    // Provider Propose Quote
    container.querySelectorAll('.btn-provider-interest').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const reqId = e.currentTarget.getAttribute('data-id');
        const crop = e.currentTarget.getAttribute('data-crop');
        const weight = e.currentTarget.getAttribute('data-weight');
        this.openProviderQuoteModal(reqId, crop, weight);
      });
    });

    // Simulate Match with Pool Vehicle
    container.querySelectorAll('.btn-simulate-quote').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const reqId = e.currentTarget.getAttribute('data-id');
        this.openSelectVehicleToMatchModal(reqId);
      });
    });

    // Farmer Proposes Terms
    container.querySelectorAll('.btn-propose-dispatch').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const reqId = e.currentTarget.getAttribute('data-req-id');
        const provId = e.currentTarget.getAttribute('data-prov-id');
        const provName = e.currentTarget.getAttribute('data-prov-name');
        this.openProposeTermsModal(reqId, provId, provName);
      });
    });

    // Driver Confirms Booking (STRICT RULE DEMONSTRATED)
    container.querySelectorAll('.btn-driver-confirm').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const reqId = e.currentTarget.getAttribute('data-req-id');
        const provId = e.currentTarget.getAttribute('data-prov-id');
        const provName = e.currentTarget.getAttribute('data-prov-name');
        this.openDriverConfirmationModal(reqId, provId, provName);
      });
    });

    // View Manifest
    container.querySelectorAll('.btn-view-trip-manifest').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const reqId = e.currentTarget.getAttribute('data-req-id');
        const provId = e.currentTarget.getAttribute('data-prov-id');
        this.openManifestModal(reqId, provId);
      });
    });
  },

  openCreateRequestModal() {
    const modalOverlay = document.getElementById('globalModalOverlay');
    const modalCard = document.getElementById('globalModalCard');
    const state = window.lifeLoopState.state;

    modalCard.innerHTML = `
      <div class="modal-header">
        <h3 class="modal-title">Create Farm Transport Request</h3>
        <button class="modal-close-btn" id="modalCloseX">&times;</button>
      </div>
      <div class="modal-body">
        <form id="createTransportForm">
          <div style="background: var(--color-ivory-100); border: 1px solid var(--border-medium); border-radius: var(--radius-md); padding: 12px; margin-bottom: 16px; font-size: var(--font-size-xs);">
            <strong>Posting Farmer:</strong> ${state.activeUser.name} • ${state.activeUser.location}
            <div style="margin-top: 4px; color: var(--text-muted);">
              Your request will be surfaced to verified cargo vehicles stationed along your transit corridor.
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Crop Type & Packaging <span class="required">*</span></label>
              <input type="text" id="reqCropType" class="form-input" placeholder="e.g. Crisp Bell Peppers (40 Crates)" required>
            </div>
            <div class="form-group">
              <label class="form-label">Total Weight in Kilograms <span class="required">*</span></label>
              <input type="number" id="reqQuantityKg" class="form-input" placeholder="e.g. 800" min="50" max="10000" required>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Pickup Point <span class="required">*</span></label>
              <input type="text" id="reqPickup" class="form-input" placeholder="e.g. Patel Agro Orchards, Riverside Gate 2" required>
            </div>
            <div class="form-group">
              <label class="form-label">Destination Mandi / Hub <span class="required">*</span></label>
              <input type="text" id="reqDestination" class="form-input" placeholder="e.g. Central District Agro Mandi, Gate 4" required>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Preferred Date & Departure Time</label>
              <input type="text" id="reqDate" class="form-input" placeholder="e.g. Tomorrow at 06:00 AM">
            </div>
            <div class="form-group">
              <label class="form-label">Target Transit Budget (INR)</label>
              <input type="number" id="reqBudget" class="form-input" placeholder="e.g. 1500">
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Cargo Condition & Safety Needs</label>
            <input type="text" id="reqCargoCond" class="form-input" placeholder="e.g. Perishable produce, requires tarpaulin cover against morning dew">
          </div>

          <div class="modal-footer" style="margin: 20px -24px -24px; padding: 16px 24px;">
            <button type="button" class="btn btn-secondary" id="btnCancelTransport">Cancel</button>
            <button type="submit" class="btn btn-primary">Submit Produce Haulage Request</button>
          </div>
        </form>
      </div>
    `;

    modalOverlay.classList.add('active');
    const closeModal = () => modalOverlay.classList.remove('active');
    modalCard.querySelector('#modalCloseX').addEventListener('click', closeModal);
    modalCard.querySelector('#btnCancelTransport').addEventListener('click', closeModal);

    modalCard.querySelector('#createTransportForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const cropType = modalCard.querySelector('#reqCropType').value.trim();
      const quantityKg = modalCard.querySelector('#reqQuantityKg').value;
      const pickupArea = modalCard.querySelector('#reqPickup').value.trim();
      const destinationArea = modalCard.querySelector('#reqDestination').value.trim();
      const preferredDate = modalCard.querySelector('#reqDate').value.trim();
      const maxBudget = modalCard.querySelector('#reqBudget').value;
      const cargoCondition = modalCard.querySelector('#reqCargoCond').value.trim();

      if (!cropType || !quantityKg || !pickupArea || !destinationArea) {
        alert('Please complete all required fields.');
        return;
      }

      window.lifeLoopState.addTransportRequest({
        cropType, quantityKg, pickupArea, destinationArea, preferredDate, maxBudget, cargoCondition
      });

      closeModal();
      window.LifeLoopApp.showToast(`Transit request registered! +30 CIP awarded for transparent logistics.`, 'success');
      this.render(document.getElementById('viewContainer'));
    });
  },

  openSelectVehicleToMatchModal(reqId) {
    const state = window.lifeLoopState.state;
    const req = state.transportRequests.find(r => r.id === reqId);
    if (!req) return;

    const modalOverlay = document.getElementById('globalModalOverlay');
    const modalCard = document.getElementById('globalModalCard');

    modalCard.innerHTML = `
      <div class="modal-header">
        <h3 class="modal-title">Match Vehicle From Rural Fleet</h3>
        <button class="modal-close-btn" id="modalCloseX">&times;</button>
      </div>
      <div class="modal-body">
        <p style="font-size: var(--font-size-sm); color: var(--text-secondary); margin-bottom: 14px;">
          Select a verified vehicle to calculate real-time load capacity suitability for <strong>${req.cropType} (${req.quantityKg} kg)</strong>:
        </p>

        <div style="display: flex; flex-direction: column; gap: 12px;">
          ${state.vehicles.map(veh => {
            const isOver = req.quantityKg > veh.payloadCapacityKg;
            const ratio = Math.round((veh.payloadCapacityKg / req.quantityKg) * 100);
            return `
              <div style="border: 1px solid var(--border-medium); border-radius: var(--radius-md); padding: 14px; display: flex; align-items: center; justify-content: space-between; gap: 12px; background: #FFFFFF;">
                <div>
                  <div style="font-weight: 700; color: var(--color-forest-900); font-size: var(--font-size-sm);">
                    ${veh.driverName} — ${veh.model}
                  </div>
                  <div style="font-size: var(--font-size-xs); color: var(--text-muted); margin-top: 2px;">
                    Payload Capacity: <strong>${veh.payloadCapacityKg} kg</strong> • Base: ${veh.currentBase}
                  </div>
                  <div style="margin-top: 6px;">
                    ${isOver 
                      ? `<span class="badge" style="background: #FEE2E2; color: #991B1B;">Overload Warning (${ratio}% of load)</span>` 
                      : `<span class="badge" style="background: #E8F5E9; color: #2E7D32;">✓ Safe Payload Match (${ratio}% capacity)</span>`}
                    <span class="badge badge-verification-field">Field Verified</span>
                  </div>
                </div>
                <button class="btn btn-outline btn-sm btn-submit-match" data-veh-id="${veh.id}">
                  Select & Propose
                </button>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;

    modalOverlay.classList.add('active');
    const closeModal = () => modalOverlay.classList.remove('active');
    modalCard.querySelector('#modalCloseX').addEventListener('click', closeModal);

    modalCard.querySelectorAll('.btn-submit-match').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const vehId = e.currentTarget.getAttribute('data-veh-id');
        const veh = state.vehicles.find(v => v.id === vehId);
        if (veh) {
          window.lifeLoopState.providerExpressInterest(reqId, veh, '₹ 1,600 Standard Haul');
          closeModal();
          window.LifeLoopApp.showToast(`Vehicle match calculated and proposed for ${veh.driverName}!`, 'success');
          this.render(document.getElementById('viewContainer'));
        }
      });
    });
  },

  openProposeTermsModal(reqId, provId, provName) {
    const modalOverlay = document.getElementById('globalModalOverlay');
    const modalCard = document.getElementById('globalModalCard');

    modalCard.innerHTML = `
      <div class="modal-header">
        <h3 class="modal-title">Propose Terms to Driver</h3>
        <button class="modal-close-btn" id="modalCloseX">&times;</button>
      </div>
      <div class="modal-body">
        <p style="font-size: var(--font-size-sm); color: var(--text-secondary); margin-bottom: 16px;">
          Send formal transit terms to driver <strong>${provName}</strong>. 
          <em>Remember: The booking is not confirmed until the driver explicitly accepts and verifies vehicle roadworthiness.</em>
        </p>

        <div class="form-group">
          <label class="form-label">Agreed Compensation Rate & Terms</label>
          <input type="text" id="termsRate" class="form-input" value="₹ 1,750 (Includes crate loading assistance and tarpaulin cover)">
        </div>

        <div class="form-group">
          <label class="form-label">Driver Arrival Time Window</label>
          <input type="text" id="termsWindow" class="form-input" value="Tomorrow between 05:30 AM and 06:00 AM">
        </div>

        <div class="modal-footer" style="margin: 20px -24px -24px; padding: 16px 24px;">
          <button type="button" class="btn btn-secondary" id="btnCancelTerms">Cancel</button>
          <button type="button" class="btn btn-primary" id="btnSendTerms">Submit Terms for Driver Confirmation</button>
        </div>
      </div>
    `;

    modalOverlay.classList.add('active');
    const closeModal = () => modalOverlay.classList.remove('active');
    modalCard.querySelector('#modalCloseX').addEventListener('click', closeModal);
    modalCard.querySelector('#btnCancelTerms').addEventListener('click', closeModal);

    modalCard.querySelector('#btnSendTerms').addEventListener('click', () => {
      const terms = modalCard.querySelector('#termsRate').value.trim();
      window.lifeLoopState.proposeDispatchTerms(reqId, provId, terms);
      closeModal();
      window.LifeLoopApp.showToast(`Terms proposed to ${provName}. Awaiting driver final verification.`, 'info');
      this.render(document.getElementById('viewContainer'));
    });
  },

  openDriverConfirmationModal(reqId, provId, provName) {
    const modalOverlay = document.getElementById('globalModalOverlay');
    const modalCard = document.getElementById('globalModalCard');

    modalCard.innerHTML = `
      <div class="modal-header">
        <h3 class="modal-title">Driver Pre-Trip Review & Confirmation</h3>
        <button class="modal-close-btn" id="modalCloseX">&times;</button>
      </div>
      <div class="modal-body">
        <div style="background: #F0FDF4; border: 1px solid #BBF7D0; border-radius: var(--radius-md); padding: 14px; margin-bottom: 16px; font-size: var(--font-size-xs); color: #166534;">
          <strong>Official Driver Authorization Desk:</strong>
          You are confirming as vehicle operator <strong>${provName}</strong>. 
          By confirming, you commit your vehicle capacity and certify pre-trip roadworthiness.
        </div>

        <div style="margin-bottom: 16px; font-size: var(--font-size-xs);">
          <div style="font-weight: 700; color: var(--color-forest-900); margin-bottom: 8px;">Pre-Dispatch Safety Attestations:</div>
          <label style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
            <input type="checkbox" id="chkCapacity" checked>
            <span>Payload capacity safely accommodates crop weight without axle overload.</span>
          </label>
          <label style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
            <input type="checkbox" id="chkTarp" checked>
            <span>Weatherproof tarpaulin and crate tie-down cords are on-board.</span>
          </label>
          <label style="display: flex; align-items: center; gap: 8px;">
            <input type="checkbox" id="chkTime" checked>
            <span>Punctual arrival at farm pickup gate is confirmed.</span>
          </label>
        </div>

        <div class="modal-footer" style="margin: 20px -24px -24px; padding: 16px 24px;">
          <button type="button" class="btn btn-secondary" id="btnCancelConfirm">Decline</button>
          <button type="button" class="btn btn-primary" id="btnFinalConfirm" style="background: var(--color-forest-800);">
            Confirm Dispatch & Issue Trip Manifest
          </button>
        </div>
      </div>
    `;

    modalOverlay.classList.add('active');
    const closeModal = () => modalOverlay.classList.remove('active');
    modalCard.querySelector('#modalCloseX').addEventListener('click', closeModal);
    modalCard.querySelector('#btnCancelConfirm').addEventListener('click', closeModal);

    modalCard.querySelector('#btnFinalConfirm').addEventListener('click', () => {
      window.lifeLoopState.confirmTransportBooking(reqId, provId);
      closeModal();
      window.LifeLoopApp.showToast(`Dispatch Confirmed by Provider! +100 CIP awarded to both farmer and driver.`, 'success');
      this.render(document.getElementById('viewContainer'));
    });
  },

  openManifestModal(reqId, provId) {
    const state = window.lifeLoopState.state;
    const req = state.transportRequests.find(r => r.id === reqId);
    if (!req) return;

    const modalOverlay = document.getElementById('globalModalOverlay');
    const modalCard = document.getElementById('globalModalCard');

    modalCard.innerHTML = `
      <div class="modal-header">
        <h3 class="modal-title">Verified Civic Dispatch Manifest</h3>
        <button class="modal-close-btn" id="modalCloseX">&times;</button>
      </div>
      <div class="modal-body">
        <div style="border: 2px dashed var(--color-forest-500); border-radius: var(--radius-lg); padding: 20px; background: #FAFDFB;">
          <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border-light); padding-bottom: 12px; margin-bottom: 12px;">
            <div>
              <div style="font-weight: 800; font-size: 1.1rem; color: var(--color-forest-900);">MANIFEST #LIFELOOP-${req.id.toUpperCase()}</div>
              <div style="font-size: 0.72rem; color: var(--text-muted);">Decentralized Cooperative Transit Protocol</div>
            </div>
            <span class="badge badge-verification-field">AUTHENTICATED DISPATCH</span>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; font-size: var(--font-size-xs);">
            <div><span style="color: var(--text-muted);">Cargo:</span> <strong>${req.cropType}</strong></div>
            <div><span style="color: var(--text-muted);">Verified Weight:</span> <strong>${req.quantityFormatted || req.quantityKg + ' kg'}</strong></div>
            <div><span style="color: var(--text-muted);">Shipper / Farmer:</span> <strong>${req.farmerName}</strong></div>
            <div><span style="color: var(--text-muted);">Carrier / Provider:</span> <strong>${req.confirmedProvider ? req.confirmedProvider.name : 'Vikram Singh'}</strong></div>
            <div><span style="color: var(--text-muted);">Origin:</span> <strong>${req.pickupArea}</strong></div>
            <div><span style="color: var(--text-muted);">Destination:</span> <strong>${req.destinationArea}</strong></div>
            <div><span style="color: var(--text-muted);">Departure Slot:</span> <strong>${req.preferredDate}</strong></div>
            <div><span style="color: var(--text-muted);">Agreed Honorarium:</span> <strong>${req.confirmedProvider ? req.confirmedProvider.quoteProposed : req.maxBudget}</strong></div>
          </div>

          <div style="margin-top: 16px; padding-top: 12px; border-top: 1px solid var(--border-light); font-size: 0.72rem; color: var(--text-muted); display: flex; align-items: center; justify-content: space-between;">
            <span>Digital Proof Hash: 0x9f4a...88c2</span>
            <span>Traceability ID: #SOLAN-MANDI-2026</span>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" id="btnCloseManifest">Close Manifest</button>
      </div>
    `;

    modalOverlay.classList.add('active');
    const closeModal = () => modalOverlay.classList.remove('active');
    modalCard.querySelector('#modalCloseX').addEventListener('click', closeModal);
    modalCard.querySelector('#btnCloseManifest').addEventListener('click', closeModal);
  },

  openFleetPoolModal() {
    const state = window.lifeLoopState.state;
    const modalOverlay = document.getElementById('globalModalOverlay');
    const modalCard = document.getElementById('globalModalCard');

    modalCard.innerHTML = `
      <div class="modal-header">
        <h3 class="modal-title">Registered Community Rural Fleet</h3>
        <button class="modal-close-btn" id="modalCloseX">&times;</button>
      </div>
      <div class="modal-body">
        <p style="font-size: var(--font-size-sm); color: var(--text-secondary); margin-bottom: 16px;">
          All vehicles undergo pre-trip safety verification and carry tarp covers for perishable produce:
        </p>
        <div style="display: flex; flex-direction: column; gap: 14px;">
          ${state.vehicles.map(v => `
            <div style="border: 1px solid var(--border-light); border-radius: var(--radius-lg); padding: 16px; background: var(--bg-surface); box-shadow: var(--shadow-sm);">
              <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                <div>
                  <div style="font-weight: 700; color: var(--color-forest-900); font-size: 1rem;">${v.driverName} — ${v.model}</div>
                  <div style="font-size: var(--font-size-xs); color: var(--text-muted);">${v.category} • Reg: ${v.registration}</div>
                </div>
                <span class="badge ${v.verificationStatus === 'field_verified' ? 'badge-verification-field' : 'badge-verification-vouched'}">
                  ${v.verificationStatus === 'field_verified' ? '✓ Field Verified' : '👥 Vouched'}
                </span>
              </div>
              <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-top: 12px; font-size: var(--font-size-xs); background: var(--color-ivory-50); padding: 10px; border-radius: var(--radius-md);">
                <div>Payload: <strong>${v.payloadCapacityKg} kg</strong></div>
                <div>Deck Size: <strong>${v.bedDimensions}</strong></div>
                <div>Trips Logged: <strong>${v.tripsCompleted}</strong></div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" id="btnCloseFleet">Close</button>
      </div>
    `;

    modalOverlay.classList.add('active');
    const closeModal = () => modalOverlay.classList.remove('active');
    modalCard.querySelector('#modalCloseX').addEventListener('click', closeModal);
    modalCard.querySelector('#btnCloseFleet').addEventListener('click', closeModal);
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
