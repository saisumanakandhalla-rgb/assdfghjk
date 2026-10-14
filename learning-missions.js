/**
 * LIFELOOP — Feature 3: Learn by Solving Real Problems
 * Practical interactive learning missions with realistic simulators,
 * instant feedback, CIP points calculation, and civic micro-credentials.
 */

window.LearningMissions = {
  render(container) {
    const data = window.LIFELOOP_DATA;
    const state = window.lifeLoopState.state;
    const completed = state.completedMissions || {};

    container.innerHTML = `
      <section class="missions-section">
        <!-- Missions Header -->
        <div style="background: var(--bg-surface); border: 1px solid var(--border-light); border-radius: var(--radius-xl); padding: 32px; margin-bottom: 28px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 20px;">
          <div>
            <div class="badge badge-sector-learn" style="margin-bottom: 10px;">
              Civic Education & Field Apprenticeship
            </div>
            <h2 style="font-family: var(--font-family-display); font-size: 1.85rem; color: var(--color-forest-900); margin-bottom: 8px;">
              Learn By Solving Real Community Challenges
            </h2>
            <p style="color: var(--text-secondary); max-width: 650px; font-size: var(--font-size-sm); line-height: 1.6;">
              No abstract coding tests or multiple-choice trivia. Step into real-world scenarios: digitize smallholder harvest crates, inspect rural haulage vehicles, and audit exploitative mandi deduction slips.
            </p>
          </div>

          <div style="background: var(--color-ivory-100); border: 1px solid var(--border-medium); border-radius: var(--radius-lg); padding: 18px 24px; text-align: center; min-width: 180px;">
            <div style="font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.08em; font-weight: 700; color: var(--text-muted); margin-bottom: 4px;">
              Completed Missions
            </div>
            <div style="font-family: var(--font-family-display); font-size: 2.2rem; font-weight: 800; color: var(--color-forest-800);">
              ${Object.keys(completed).length} / ${data.learningMissions.length}
            </div>
            <div style="font-size: var(--font-size-xs); color: var(--color-orange-700); font-weight: 600; margin-top: 4px;">
              +${Object.values(completed).reduce((acc, c) => acc + (c.pointsEarned || 0), 0)} CIP Earned
            </div>
          </div>
        </div>

        <!-- Missions Cards Grid -->
        <div class="missions-grid">
          ${data.learningMissions.map(m => this.renderMissionCard(m, completed[m.id])).join('')}
        </div>
      </section>
    `;

    this.bindEvents(container);
  },

  renderMissionCard(mission, completionRecord) {
    const isDone = !!completionRecord;

    return `
      <div class="mission-card ${isDone ? 'mission-completed' : ''}" data-mission-id="${mission.id}">
        ${isDone ? `
          <div class="mission-completed-tag">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            Completed (${completionRecord.completedAt})
          </div>
        ` : ''}

        <div style="margin-bottom: 12px;">
          <span class="mission-points-tag">
            🏆 +${mission.rewardCip} Community Impact Points
          </span>
          <h3 class="card-title" style="font-size: 1.25rem; color: var(--color-forest-900); margin-top: 4px;">
            ${mission.title}
          </h3>
          <div style="font-size: var(--font-size-xs); color: var(--text-muted); margin-top: 4px;">
            Target: <strong>${mission.targetRole}</strong> • ${mission.difficulty} • ⏱️ ${mission.duration}
          </div>
        </div>

        <p style="font-size: var(--font-size-sm); color: var(--text-secondary); line-height: 1.5; margin-bottom: 18px; flex: 1;">
          ${mission.description}
        </p>

        <div style="background: var(--color-ivory-50); border: 1px solid var(--border-light); border-radius: var(--radius-md); padding: 12px; margin-bottom: 20px;">
          <div style="font-size: 0.72rem; font-weight: 700; color: var(--color-forest-800); text-transform: uppercase; margin-bottom: 6px;">
            Key Learning Outcomes:
          </div>
          <ul style="list-style: none; display: flex; flex-direction: column; gap: 6px; font-size: var(--font-size-xs); color: var(--text-secondary);">
            ${mission.learningGoals.map(g => `
              <li style="display: flex; align-items: flex-start; gap: 6px;">
                <span style="color: var(--color-forest-600); font-weight: bold;">•</span>
                <span>${g}</span>
              </li>
            `).join('')}
          </ul>
        </div>

        <div class="card-footer" style="padding-top: 14px; margin-top: auto;">
          <div style="font-size: var(--font-size-xs); color: var(--text-muted);">
            Badge: <strong style="color: var(--color-forest-800);">${mission.badgeEarned}</strong>
          </div>

          <button class="btn ${isDone ? 'btn-outline' : 'btn-primary'} btn-sm btn-launch-mission" data-mission-id="${mission.id}">
            ${isDone ? 'Review Simulator Record' : 'Launch Interactive Mission'}
          </button>
        </div>
      </div>
    `;
  },

  bindEvents(container) {
    container.querySelectorAll('.btn-launch-mission').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const missionId = e.currentTarget.getAttribute('data-mission-id');
        this.launchMission(missionId);
      });
    });
  },

  launchMission(missionId) {
    if (missionId === 'mission_harvest_slip') {
      this.openHarvestSlipSimulator();
    } else if (missionId === 'mission_vehicle_inspection') {
      this.openVehicleInspectionSimulator();
    } else if (missionId === 'mission_mandi_literacy') {
      this.openMandiLiteracySimulator();
    }
  },

  // MISSION 1: Student Builds Farmer Dhani's Harvest Slip
  openHarvestSlipSimulator() {
    const modalOverlay = document.getElementById('globalModalOverlay');
    const modalCard = document.getElementById('globalModalCard');

    modalCard.innerHTML = `
      <div class="modal-header">
        <div>
          <span class="badge badge-sector-learn">Mission 1 — Digital Scribe</span>
          <h3 class="modal-title" style="margin-top: 4px;">Build Farmer Dhani's Digital Harvest Slip</h3>
        </div>
        <button class="modal-close-btn" id="modalCloseX">&times;</button>
      </div>
      <div class="modal-body">
        <div style="background: var(--color-ivory-100); border: 1px solid var(--border-medium); border-radius: var(--radius-md); padding: 14px; margin-bottom: 16px; font-size: var(--font-size-xs);">
          <strong>Scenario Brief:</strong>
          Farmer Dhani Patel just harvested 3 crates of ripe bell peppers. In the past, scribbled paper slips resulted in 15% price dockage at the mandi weighbridge.
          Step into student scribe Ananya's shoes: enter the crate data, classify produce grade, and generate an authenticated QR batch slip!
        </div>

        <form id="harvestSlipForm">
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Crate Weight (Gross kg)</label>
              <input type="number" id="slipWeight" class="form-input" value="64.5" step="0.5" required>
            </div>
            <div class="form-group">
              <label class="form-label">Produce Grade</label>
              <select id="slipGrade" class="form-select">
                <option value="Tier A (Export / Prime Organic)">Tier A (Export / Prime Organic)</option>
                <option value="Tier B (Domestic Mandi)">Tier B (Domestic Mandi)</option>
                <option value="Tier C (Processing / Sauce)">Tier C (Processing / Sauce)</option>
              </select>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Moisture Meter Reading (%)</label>
              <input type="range" id="slipMoisture" min="10" max="22" value="14" style="width: 100%;">
              <div style="display: flex; justify-content: space-between; font-size: var(--font-size-xs); color: var(--text-muted); margin-top: 4px;">
                <span>10% (Dry)</span>
                <span id="slipMoistureVal" style="font-weight: 700; color: var(--color-forest-800);">14% (Optimal)</span>
                <span>22% (High Risk)</span>
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Farmer Identification</label>
              <input type="text" class="form-input" value="Dhani Patel — Patel Agro Riverside" readonly style="background: var(--color-ivory-200);">
            </div>
          </div>

          <!-- Live Generated Batch Slip Preview -->
          <div class="simulator-qr-preview">
            <div style="font-size: 0.72rem; font-weight: 700; color: var(--color-forest-800); text-transform: uppercase; margin-bottom: 8px;">
              Live Authenticated Digital Batch QR
            </div>
            <!-- Dynamic QR Code SVG -->
            <svg class="simulator-qr-svg" viewBox="0 0 100 100">
              <rect width="100" height="100" fill="#FFFFFF"/>
              <!-- Corner Finder 1 -->
              <rect x="10" y="10" width="24" height="24" fill="#0B2418"/>
              <rect x="14" y="14" width="16" height="16" fill="#FFFFFF"/>
              <rect x="18" y="18" width="8" height="8" fill="#0B2418"/>
              <!-- Corner Finder 2 -->
              <rect x="66" y="10" width="24" height="24" fill="#0B2418"/>
              <rect x="70" y="14" width="16" height="16" fill="#FFFFFF"/>
              <rect x="74" y="18" width="8" height="8" fill="#0B2418"/>
              <!-- Corner Finder 3 -->
              <rect x="10" y="66" width="24" height="24" fill="#0B2418"/>
              <rect x="14" y="70" width="16" height="16" fill="#FFFFFF"/>
              <rect x="18" y="74" width="8" height="8" fill="#0B2418"/>
              <!-- Data patterns -->
              <rect x="40" y="12" width="6" height="6" fill="#256648"/>
              <rect x="52" y="18" width="6" height="6" fill="#256648"/>
              <rect x="42" y="32" width="16" height="6" fill="#256648"/>
              <rect x="40" y="48" width="20" height="20" fill="#D96B27"/>
              <rect x="66" y="42" width="8" height="8" fill="#256648"/>
              <rect x="78" y="56" width="12" height="6" fill="#256648"/>
              <rect x="40" y="74" width="6" height="16" fill="#256648"/>
              <rect x="54" y="80" width="18" height="10" fill="#256648"/>
            </svg>
            <div id="slipBatchHash" style="font-family: monospace; font-size: 0.75rem; color: var(--color-forest-800); margin-top: 6px;">
              BATCH #LL-HARVEST-DHANI-2026-64KG-A
            </div>
          </div>

          <div class="modal-footer" style="margin: 20px -24px -24px; padding: 16px 24px;">
            <button type="button" class="btn btn-secondary" id="btnCancelSlip">Cancel</button>
            <button type="submit" class="btn btn-primary">Commit Slip to Co-op Ledger (+150 CIP)</button>
          </div>
        </form>
      </div>
    `;

    modalOverlay.classList.add('active');
    const closeModal = () => modalOverlay.classList.remove('active');
    modalCard.querySelector('#modalCloseX').addEventListener('click', closeModal);
    modalCard.querySelector('#btnCancelSlip').addEventListener('click', closeModal);

    // Live update moisture slider
    const moistureInput = modalCard.querySelector('#slipMoisture');
    const moistureVal = modalCard.querySelector('#slipMoistureVal');
    moistureInput.addEventListener('input', (e) => {
      const v = e.target.value;
      moistureVal.textContent = `${v}% (${v <= 15 ? 'Optimal' : 'Caution: High Moisture'})`;
    });

    // Form submit
    modalCard.querySelector('#harvestSlipForm').addEventListener('submit', (e) => {
      e.preventDefault();
      window.lifeLoopState.completeMission('mission_harvest_slip', {
        weight: modalCard.querySelector('#slipWeight').value,
        grade: modalCard.querySelector('#slipGrade').value,
        moisture: moistureInput.value
      });
      closeModal();
      window.LifeLoopApp.showToast(`Mission Accomplished! You earned the 'Certified Digital Scribe' badge and +150 CIP.`, 'success');
      this.render(document.getElementById('viewContainer'));
    });
  },

  // MISSION 2: Pre-Trip Fleet Safety & Cargo Load Balance
  openVehicleInspectionSimulator() {
    const modalOverlay = document.getElementById('globalModalOverlay');
    const modalCard = document.getElementById('globalModalCard');

    modalCard.innerHTML = `
      <div class="modal-header">
        <div>
          <span class="badge badge-sector-move">Mission 2 — Vehicle Safety</span>
          <h3 class="modal-title" style="margin-top: 4px;">Pre-Trip Fleet Safety & Mountain Load Balance</h3>
        </div>
        <button class="modal-close-btn" id="modalCloseX">&times;</button>
      </div>
      <div class="modal-body">
        <div style="background: var(--color-ivory-100); border: 1px solid var(--border-medium); border-radius: var(--radius-md); padding: 14px; margin-bottom: 16px; font-size: var(--font-size-xs);">
          <strong>Scenario Brief:</strong>
          You are preparing a 1.5-Tonne Mahindra Bolero Maxi-Truck for a 45-km mountain harvest trip across the Solan ridge.
          Complete the 4 safety checkpoints and balance the cargo load center-of-gravity slider to avoid dangerous rollovers on hairpin curves!
        </div>

        <form id="vehicleSafetyForm">
          <div style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 18px; font-size: var(--font-size-sm);">
            <label style="display: flex; align-items: center; gap: 10px; padding: 10px; background: #FFFFFF; border: 1px solid var(--border-light); border-radius: var(--radius-md); cursor: pointer;">
              <input type="checkbox" id="chkTyreTread" required>
              <span><strong>Tyre Tread Depth:</strong> Inspected front and rear tyres (Min. 3.2mm depth confirmed)</span>
            </label>
            <label style="display: flex; align-items: center; gap: 10px; padding: 10px; background: #FFFFFF; border: 1px solid var(--border-light); border-radius: var(--radius-md); cursor: pointer;">
              <input type="checkbox" id="chkBrakes" required>
              <span><strong>Hydraulic Brake Fluid:</strong> Reservoir level checked between MIN and MAX marks</span>
            </label>
            <label style="display: flex; align-items: center; gap: 10px; padding: 10px; background: #FFFFFF; border: 1px solid var(--border-light); border-radius: var(--radius-md); cursor: pointer;">
              <input type="checkbox" id="chkTarpLatch" required>
              <span><strong>Weatherproof Canvas:</strong> Tie-down ratchet straps tensioned against heavy rain</span>
            </label>
            <label style="display: flex; align-items: center; gap: 10px; padding: 10px; background: #FFFFFF; border: 1px solid var(--border-light); border-radius: var(--radius-md); cursor: pointer;">
              <input type="checkbox" id="chkEmergencyKit" required>
              <span><strong>Emergency Warning Triangle & Jack:</strong> Secured in cabin storage</span>
            </label>
          </div>

          <!-- Cargo Weight Balance Slider -->
          <div style="background: var(--color-ivory-50); border: 1px solid var(--border-medium); border-radius: var(--radius-md); padding: 16px; margin-bottom: 16px;">
            <div style="display: flex; justify-content: space-between; font-size: var(--font-size-xs); font-weight: 700; margin-bottom: 6px;">
              <span>Front Axle Bias</span>
              <span id="balanceStatusText" style="color: #2E7D32;">Optimal Center of Gravity (50/50 Balance)</span>
              <span>Rear Axle Bias</span>
            </div>
            <input type="range" id="loadBalanceSlider" min="20" max="80" value="50" style="width: 100%;">
            <div style="font-size: 0.72rem; color: var(--text-muted); margin-top: 6px;">
              *Keep the weight centered (between 45% and 55%) to maintain steering traction on wet mountain inclines.
            </div>
          </div>

          <div class="modal-footer" style="margin: 20px -24px -24px; padding: 16px 24px;">
            <button type="button" class="btn btn-secondary" id="btnCancelSafety">Cancel</button>
            <button type="submit" class="btn btn-primary" id="btnCertifySafety">Certify Roadworthiness (+180 CIP)</button>
          </div>
        </form>
      </div>
    `;

    modalOverlay.classList.add('active');
    const closeModal = () => modalOverlay.classList.remove('active');
    modalCard.querySelector('#modalCloseX').addEventListener('click', closeModal);
    modalCard.querySelector('#btnCancelSafety').addEventListener('click', closeModal);

    const slider = modalCard.querySelector('#loadBalanceSlider');
    const statusText = modalCard.querySelector('#balanceStatusText');

    slider.addEventListener('input', (e) => {
      const v = Number(e.target.value);
      if (v >= 45 && v <= 55) {
        statusText.textContent = `Optimal Center of Gravity (${v}/${100 - v} Balance)`;
        statusText.style.color = '#2E7D32';
      } else if (v < 45) {
        statusText.textContent = `Warning: Heavy Front Bias (${v}%) — Heavy Steering Hazard`;
        statusText.style.color = '#B45309';
      } else {
        statusText.textContent = `Hazard: Rear Heavy (${100 - v}%) — Rollover Risk on Hill Incline!`;
        statusText.style.color = '#DC2626';
      }
    });

    modalCard.querySelector('#vehicleSafetyForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const v = Number(slider.value);
      if (v < 40 || v > 60) {
        alert('Please center the cargo load slider closer to 50% before certifying departure.');
        return;
      }

      window.lifeLoopState.completeMission('mission_vehicle_inspection', {
        loadBalance: slider.value,
        certified: true
      });
      closeModal();
      window.LifeLoopApp.showToast(`Vehicle Certified! You earned the 'Safety-First Transporter' credential and +180 CIP.`, 'success');
      this.render(document.getElementById('viewContainer'));
    });
  },

  // MISSION 3: Mandi Pricing Literacy & SMS Receipt Audit
  openMandiLiteracySimulator() {
    const modalOverlay = document.getElementById('globalModalOverlay');
    const modalCard = document.getElementById('globalModalCard');

    modalCard.innerHTML = `
      <div class="modal-header">
        <div>
          <span class="badge badge-sector-grow">Mission 3 — Agri-Tech Literacy</span>
          <h3 class="modal-title" style="margin-top: 4px;">Mandi Pricing Literacy & SMS Receipt Audit</h3>
        </div>
        <button class="modal-close-btn" id="modalCloseX">&times;</button>
      </div>
      <div class="modal-body">
        <div style="background: var(--color-ivory-100); border: 1px solid var(--border-medium); border-radius: var(--radius-md); padding: 14px; margin-bottom: 16px; font-size: var(--font-size-xs);">
          <strong>Scenario Brief:</strong>
          Smallholder farmer Gurdev received a commission deduction slip at the regional mandi for 1,200 kg of organic tomatoes.
          Compare the official government MSP broadcast SMS with the agent's handwritten memo to identify unauthorized dockage fees and recover Gurdev's rightful payout!
        </div>

        <!-- Official SMS Broadcast Mockup -->
        <div style="background: #E0F2FE; border: 1px solid #7DD3FC; border-radius: var(--radius-md); padding: 12px; margin-bottom: 16px; font-size: var(--font-size-xs);">
          <div style="font-weight: 700; color: #0369A1; margin-bottom: 4px;">
            📲 Official Gov Agro Mandi SMS (Verified Broadcast):
          </div>
          <div style="font-family: monospace; color: #0C4A6E;">
            "HORTI-PORTAL: Solan Mandi MSP Benchmark for Grade A Tomatoes is ₹ 28.00/kg. Official weighbridge charge is capped at ₹ 0.10/kg. Unlicensed unloading deductions are strictly prohibited under APMC Bylaw 4."
          </div>
        </div>

        <!-- Audit Comparison Table -->
        <table class="audit-table">
          <thead>
            <tr>
              <th>Line Item on Receipt</th>
              <th>Middleman Slip Amount</th>
              <th>Official Cap</th>
              <th>Audit Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1,200 kg Gross Produce</td>
              <td>₹ 24.50 / kg</td>
              <td>₹ 28.00 / kg</td>
              <td><span style="color: #DC2626; font-weight: 700;">Underpriced by ₹ 3.50/kg</span></td>
            </tr>
            <tr class="flagged-row">
              <td>"Moisture Shrinkage Fee"</td>
              <td>- ₹ 1,800.00</td>
              <td>₹ 0.00 (Illegal)</td>
              <td>
                <label style="cursor: pointer;">
                  <input type="checkbox" id="flagMoisture" checked> Flag Fraudulent Fee
                </label>
              </td>
            </tr>
            <tr class="flagged-row">
              <td>"Tea & Gatekeeper Surcharge"</td>
              <td>- ₹ 650.00</td>
              <td>₹ 0.00 (Illegal)</td>
              <td>
                <label style="cursor: pointer;">
                  <input type="checkbox" id="flagGatekeeper" checked> Flag Unauthorized Deduction
                </label>
              </td>
            </tr>
            <tr>
              <td>Electronic Weighing Fee</td>
              <td>- ₹ 120.00</td>
              <td>₹ 120.00 Max</td>
              <td><span style="color: #166534; font-weight: 700;">✓ Legitimate Fee</span></td>
            </tr>
          </tbody>
        </table>

        <!-- Resulting Recovered Net -->
        <div style="background: #F0FDF4; border: 1px solid #BBF7D0; border-radius: var(--radius-md); padding: 12px; font-size: var(--font-size-xs); color: #166534; margin-bottom: 16px;">
          <strong>Audit Calculation:</strong>
          Flagging these 2 fraudulent deductions and citing the official MSP benchmark recovers <strong>₹ 6,650.00</strong> directly to the farmer's bank account.
        </div>

        <div class="modal-footer" style="margin: 20px -24px -24px; padding: 16px 24px;">
          <button type="button" class="btn btn-secondary" id="btnCancelAudit">Cancel</button>
          <button type="button" class="btn btn-primary" id="btnSubmitAudit">File Audit Memo & Issue Certificate (+200 CIP)</button>
        </div>
      </div>
    `;

    modalOverlay.classList.add('active');
    const closeModal = () => modalOverlay.classList.remove('active');
    modalCard.querySelector('#modalCloseX').addEventListener('click', closeModal);
    modalCard.querySelector('#btnCancelAudit').addEventListener('click', closeModal);

    modalCard.querySelector('#btnSubmitAudit').addEventListener('click', () => {
      window.lifeLoopState.completeMission('mission_mandi_literacy', {
        recoveredAmount: 6650,
        audited: true
      });
      closeModal();
      window.LifeLoopApp.showToast(`Audit Memo Filed! You earned the 'Agri-Tech Pioneer' credential and +200 CIP.`, 'success');
      this.render(document.getElementById('viewContainer'));
    });
  }
};
