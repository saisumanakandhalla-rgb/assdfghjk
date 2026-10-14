/**
 * LIFELOOP — Feature 5: Trust and Safety Component
 * Manages verification tiers, reports, user blocking/unblocking,
 * masked communication rules, and civic platform disclaimers.
 */

window.TrustSafety = {
  render(container) {
    const state = window.lifeLoopState.state;
    const blockedUsers = state.blockedUsers || [];
    const reports = state.reports || [];

    container.innerHTML = `
      <section class="safety-layout">
        <!-- Top Safety Integrity Manifesto -->
        <div style="background: var(--color-forest-900); color: #FFFFFF; border-radius: var(--radius-xl); padding: 32px; border: 1px solid rgba(255, 255, 255, 0.1);">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
            <span class="badge" style="background: var(--color-orange-600); color: #FFFFFF;">Civic Guardrail</span>
            <span class="badge badge-verification-field">Protocol v2.4</span>
          </div>
          <h2 style="font-family: var(--font-family-display); font-size: 1.85rem; margin-bottom: 8px;">
            Trust, Verification & Community Safety
          </h2>
          <p style="color: var(--color-ivory-300); max-width: 650px; font-size: var(--font-size-sm); line-height: 1.6;">
            LIFELOOP connects vulnerable smallholder farmers, student volunteers, and rural vehicle operators.
            We maintain strict verification standards, protect personal telephone numbers, and provide immediate blocking and reporting controls.
          </p>
        </div>

        <!-- Three Verification Tiers Transparently Explained -->
        <div>
          <h3 style="font-family: var(--font-family-display); font-size: 1.35rem; color: var(--color-forest-900); margin-bottom: 6px;">
            Three-Tier Transparent Verification Architecture
          </h3>
          <p style="font-size: var(--font-size-xs); color: var(--text-muted); margin-bottom: 16px;">
            <em>Strict Design Rule:</em> LIFELOOP never labels an account verified without verifiable institutional or cooperative evidence.
          </p>

          <div class="safety-tiers-grid">
            <!-- Tier 1: Unverified -->
            <div class="safety-tier-card tier-unverified">
              <span class="badge badge-verification-unverified" style="margin-bottom: 10px;">
                Tier 0 — Unverified Account
              </span>
              <h4 style="font-size: 1.1rem; color: var(--color-forest-900); margin-bottom: 8px;">Standard Registration</h4>
              <p style="font-size: var(--font-size-xs); color: var(--text-secondary); line-height: 1.5; margin-bottom: 12px;">
                New users who have registered a phone number but have not yet undergone community or physical document review.
              </p>
              <div style="background: var(--color-ivory-50); border: 1px solid var(--border-light); border-radius: var(--radius-md); padding: 10px; font-size: var(--font-size-xs); color: var(--text-muted);">
                • Public listings display cautionary amber badge.<br>
                • Cannot confirm bulk commercial transit over 1 Tonne without co-op voucher.
              </div>
            </div>

            <!-- Tier 2: Community Vouched -->
            <div class="safety-tier-card tier-vouched">
              <span class="badge badge-verification-vouched" style="margin-bottom: 10px;">
                Tier 1 — Community Vouched
              </span>
              <h4 style="font-size: 1.1rem; color: var(--color-forest-900); margin-bottom: 8px;">Peer Cooperative Endorsement</h4>
              <p style="font-size: var(--font-size-xs); color: var(--text-secondary); line-height: 1.5; margin-bottom: 12px;">
                Farmer or driver endorsed in-person by at least 3 active members of a registered agricultural cooperative or Self-Help Group (SHG).
              </p>
              <div style="background: var(--color-ivory-50); border: 1px solid var(--border-light); border-radius: var(--radius-md); padding: 10px; font-size: var(--font-size-xs); color: var(--text-muted);">
                • Unlocks harvest transport pooling.<br>
                • Co-op peer names recorded in transparency ledger.
              </div>
            </div>

            <!-- Tier 3: Field Verified -->
            <div class="safety-tier-card tier-field">
              <span class="badge badge-verification-field" style="margin-bottom: 10px;">
                Tier 2 — Field Verified
              </span>
              <h4 style="font-size: 1.1rem; color: var(--color-forest-900); margin-bottom: 8px;">Official Document Authentication</h4>
              <p style="font-size: var(--font-size-xs); color: var(--text-secondary); line-height: 1.5; margin-bottom: 12px;">
                Physical in-person inspection of Polytechnic Student ID, State Land Records (7/12 extract), or RTO Commercial Vehicle Fitness Certificate.
              </p>
              <div style="background: var(--color-ivory-50); border: 1px solid var(--border-light); border-radius: var(--radius-md); padding: 10px; font-size: var(--font-size-xs); color: var(--text-muted);">
                • Full eligibility for high-urgency perishable crop dispatches.<br>
                • Certified safety and digital literacy credentials.
              </div>
            </div>
          </div>
        </div>

        <!-- Privacy & Contact Masking Protocol -->
        <div style="background: var(--bg-surface); border: 1px solid var(--border-light); border-radius: var(--radius-xl); padding: 24px; box-shadow: var(--shadow-sm);">
          <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; flex-wrap: wrap;">
            <div>
              <h3 style="font-family: var(--font-family-display); font-size: 1.25rem; color: var(--color-forest-900); margin-bottom: 4px;">
                Privacy Protection: Masked Contact Numbers
              </h3>
              <p style="font-size: var(--font-size-xs); color: var(--text-muted); max-width: 600px; line-height: 1.5;">
                To prevent predatory harassment, unsolicited middleman spam, and identity theft, personal phone numbers are NEVER publicly displayed on LIFELOOP.
              </p>
            </div>
            <div class="phone-masked-chip" style="font-size: 0.95rem; padding: 8px 14px;">
              +91 ••••• ••${state.activeUser.phoneMasked.slice(-3)}
            </div>
          </div>
        </div>

        <!-- Active Blocked Users Management -->
        <div style="background: var(--bg-surface); border: 1px solid var(--border-light); border-radius: var(--radius-xl); padding: 24px; box-shadow: var(--shadow-sm);">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px;">
            <div>
              <h3 style="font-family: var(--font-family-display); font-size: 1.25rem; color: var(--color-forest-900);">
                Blocked Community Members (${blockedUsers.length})
              </h3>
              <div style="font-size: var(--font-size-xs); color: var(--text-muted);">
                Blocked accounts cannot contact you or appear in your opportunity and transport feeds.
              </div>
            </div>
          </div>

          ${blockedUsers.length > 0 ? `
            <div class="blocked-users-list">
              ${blockedUsers.map(name => `
                <div class="blocked-user-row">
                  <div>
                    <strong style="color: var(--color-forest-900); font-size: var(--font-size-sm);">${name}</strong>
                    <div style="font-size: 0.72rem; color: var(--text-muted);">Status: Blocked from your local loop</div>
                  </div>
                  <button class="btn btn-outline btn-sm btn-unblock-user" data-name="${name}">
                    Unblock User
                  </button>
                </div>
              `).join('')}
            </div>
          ` : `
            <div style="background: var(--color-ivory-50); border: 1px dashed var(--border-medium); border-radius: var(--radius-md); padding: 16px; text-align: center; font-size: var(--font-size-xs); color: var(--text-muted);">
              You have not blocked any users. You can block any suspicious profile from their profile card or opportunity post.
            </div>
          `}
        </div>

        <!-- Audit Reports Desk -->
        <div style="background: var(--bg-surface); border: 1px solid var(--border-light); border-radius: var(--radius-xl); padding: 24px; box-shadow: var(--shadow-sm);">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px;">
            <div>
              <h3 style="font-family: var(--font-family-display); font-size: 1.25rem; color: var(--color-forest-900);">
                Filed Violation Reports (${reports.length})
              </h3>
              <div style="font-size: var(--font-size-xs); color: var(--text-muted);">
                Audited by community moderation desk for safety compliance.
              </div>
            </div>
            <button class="btn btn-outline btn-sm" id="btnOpenNewReport">
              File a Civic Violation Report
            </button>
          </div>

          ${reports.length > 0 ? `
            <div style="display: flex; flex-direction: column; gap: 10px;">
              ${reports.map(rep => `
                <div style="border: 1px solid var(--border-light); border-radius: var(--radius-md); padding: 12px 16px; background: var(--color-ivory-50); font-size: var(--font-size-xs);">
                  <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                    <strong style="color: var(--color-danger);">${rep.violationType}</strong>
                    <span style="color: var(--text-muted); font-size: 0.7rem;">${rep.timestamp}</span>
                  </div>
                  <div>Reported Target: <strong>${rep.target}</strong></div>
                  <div style="color: var(--text-secondary); margin-top: 4px;">"${rep.details}"</div>
                  <div style="margin-top: 6px; color: var(--color-forest-700); font-weight: 600;">Status: ${rep.status}</div>
                </div>
              `).join('')}
            </div>
          ` : `
            <div style="background: var(--color-ivory-50); border: 1px dashed var(--border-medium); border-radius: var(--radius-md); padding: 16px; text-align: center; font-size: var(--font-size-xs); color: var(--text-muted);">
              No active reports filed. All current sample listings are compliant with civic community guidelines.
            </div>
          `}
        </div>
      </section>
    `;

    this.bindEvents(container);
  },

  bindEvents(container) {
    // Unblock button
    container.querySelectorAll('.btn-unblock-user').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const name = e.currentTarget.getAttribute('data-name');
        window.lifeLoopState.unblockUser(name);
        window.LifeLoopApp.showToast(`Unblocked ${name}. Their listings will now be visible again.`, 'info');
        this.render(container);
      });
    });

    // File report button
    const btnReport = container.querySelector('#btnOpenNewReport');
    if (btnReport) {
      btnReport.addEventListener('click', () => {
        this.openReportModal('General Community Listing');
      });
    }
  },

  openReportModal(targetEntity) {
    const modalOverlay = document.getElementById('globalModalOverlay');
    const modalCard = document.getElementById('globalModalCard');

    modalCard.innerHTML = `
      <div class="modal-header">
        <h3 class="modal-title" style="color: var(--color-danger);">File Safety / Ethics Report</h3>
        <button class="modal-close-btn" id="modalCloseX">&times;</button>
      </div>
      <div class="modal-body">
        <p style="font-size: var(--font-size-sm); color: var(--text-secondary); margin-bottom: 14px;">
          Reporting: <strong style="color: var(--color-forest-900);">${targetEntity}</strong>
        </p>

        <form id="reportViolationForm">
          <div class="form-group">
            <label class="form-label">Violation Category <span class="required">*</span></label>
            <select id="violationCategory" class="form-select" required>
              <option value="Misleading Cargo Weight or Capacity">Misleading Cargo Weight or Vehicle Capacity</option>
              <option value="Predatory Middleman Price Docking">Predatory Middleman Price Docking</option>
              <option value="Unsafe Vehicle Roadworthiness Hazard">Unsafe Vehicle Roadworthiness Hazard</option>
              <option value="False Claims of Official Verification">False Claims of Official Verification</option>
              <option value="Harassment or Inappropriate Behavior">Harassment or Inappropriate Behavior</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">Explain What Happened <span class="required">*</span></label>
            <textarea id="violationDetails" class="form-textarea" placeholder="Provide factual details regarding the listing, quote discrepancy, or conduct..." required></textarea>
          </div>

          <div class="modal-footer" style="margin: 20px -24px -24px; padding: 16px 24px;">
            <button type="button" class="btn btn-secondary" id="btnCancelReport">Cancel</button>
            <button type="submit" class="btn btn-primary" style="background: var(--color-danger); border-color: var(--color-danger);">
              Submit Official Report to Review Desk
            </button>
          </div>
        </form>
      </div>
    `;

    modalOverlay.classList.add('active');
    const closeModal = () => modalOverlay.classList.remove('active');
    modalCard.querySelector('#modalCloseX').addEventListener('click', closeModal);
    modalCard.querySelector('#btnCancelReport').addEventListener('click', closeModal);

    modalCard.querySelector('#reportViolationForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const cat = modalCard.querySelector('#violationCategory').value;
      const details = modalCard.querySelector('#violationDetails').value.trim();

      window.lifeLoopState.submitReport(targetEntity, cat, details);
      closeModal();
      window.LifeLoopApp.showToast(`Report filed securely with community review desk.`, 'warning');
      if (window.lifeLoopState.state.activeView === 'safety') {
        this.render(document.getElementById('viewContainer'));
      }
    });
  }
};
