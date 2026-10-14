/**
 * LIFELOOP — User Public Profile Modal Component
 * Displays verified skills, vehicle/farm details, verification audit trail,
 * masked phone numbers, and safety actions (Block / Report).
 */

window.ProfileModal = {
  open(userName) {
    const data = window.LIFELOOP_DATA;
    const state = window.lifeLoopState.state;

    // Search in personas first
    let user = data.personas.find(p => p.name.toLowerCase().includes(userName.toLowerCase()));
    
    // Fallback if looking up vehicle provider
    if (!user) {
      const veh = data.vehiclesPool.find(v => v.driverName.toLowerCase().includes(userName.toLowerCase()));
      if (veh) {
        user = {
          role: 'provider',
          name: veh.driverName,
          roleTitle: veh.category,
          avatar: veh.driverName.split(' ').map(n => n[0]).join(''),
          location: veh.currentBase,
          verificationStatus: veh.verificationStatus,
          verificationDetails: veh.verificationNote,
          badge: veh.verificationStatus === 'field_verified' ? 'Certified Fleet Partner' : 'Community Vouched Driver',
          phoneMasked: veh.phoneMasked,
          cipPoints: 480,
          vehicleModel: veh.model,
          payloadCapacityKg: veh.payloadCapacityKg,
          bio: `Active carrier registered under vehicle reg #${veh.registration}. Specializing in agricultural transit.`,
          skills: ['Cargo Lashing', 'Perishable Produce Handling', 'Mountain Pass Navigation']
        };
      }
    }

    // Default fallback
    if (!user) {
      user = {
        role: 'member',
        name: userName,
        roleTitle: 'Community Contributor',
        avatar: userName.charAt(0),
        location: 'Solan District Corridor',
        verificationStatus: 'unverified',
        verificationDetails: 'New platform member. Identity document review pending.',
        badge: 'Community Participant',
        phoneMasked: '+91 ••••• ••000',
        cipPoints: 120,
        bio: 'Community member collaborating across local agricultural and skill initiatives.',
        skills: ['General Community Support']
      };
    }

    const modalOverlay = document.getElementById('globalModalOverlay');
    const modalCard = document.getElementById('globalModalCard');

    modalCard.innerHTML = `
      <div class="modal-header">
        <h3 class="modal-title">Verified Civic Profile</h3>
        <button class="modal-close-btn" id="modalCloseX">&times;</button>
      </div>
      <div class="modal-body">
        <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; margin-bottom: 20px; flex-wrap: wrap;">
          <div style="display: flex; align-items: center; gap: 14px;">
            <div style="width: 58px; height: 58px; border-radius: 50%; background: var(--color-forest-800); color: #FFF; display: flex; align-items: center; justify-content: center; font-family: var(--font-family-display); font-size: 1.5rem; font-weight: 700; border: 3px solid var(--border-medium);">
              ${user.avatar || user.name.charAt(0)}
            </div>
            <div>
              <h3 style="font-family: var(--font-family-display); font-size: 1.4rem; color: var(--color-forest-900);">
                ${user.name}
              </h3>
              <div style="font-size: var(--font-size-xs); color: var(--text-muted);">
                ${user.roleTitle} • 📍 ${user.location}
              </div>
            </div>
          </div>

          <div style="text-align: right;">
            <div class="phone-masked-chip">${user.phoneMasked}</div>
            <div style="font-size: 0.68rem; color: var(--text-muted); margin-top: 4px;">Protected by Civic Relay</div>
          </div>
        </div>

        <!-- Verification Proof Banner -->
        <div style="background: var(--color-ivory-100); border: 1px solid var(--border-medium); border-radius: var(--radius-lg); padding: 14px; margin-bottom: 18px;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
            <div style="font-size: 0.72rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-forest-800);">
              Official Verification Record
            </div>
            ${this.getVerificationBadge(user.verificationStatus)}
          </div>
          <p style="font-size: var(--font-size-xs); color: var(--text-secondary); line-height: 1.5;">
            ${user.verificationDetails}
          </p>
        </div>

        <!-- Bio -->
        <p style="font-size: var(--font-size-sm); color: var(--text-secondary); line-height: 1.6; margin-bottom: 18px;">
          ${user.bio || 'Active participant contributing to rural education, mobility, and agriculture.'}
        </p>

        <!-- Role Specific Specs -->
        ${user.crops ? `
          <div style="margin-bottom: 16px;">
            <div style="font-size: 0.72rem; font-weight: 700; color: var(--color-forest-800); text-transform: uppercase; margin-bottom: 6px;">
              Primary Cultivated Crops:
            </div>
            <div style="display: flex; flex-wrap: wrap; gap: 6px;">
              ${user.crops.map(c => `<span class="badge badge-sector-grow">🌱 ${c}</span>`).join('')}
            </div>
          </div>
        ` : ''}

        ${user.vehicleModel ? `
          <div style="background: var(--color-ivory-50); border: 1px solid var(--border-light); border-radius: var(--radius-md); padding: 12px; margin-bottom: 16px; font-size: var(--font-size-xs);">
            <div>Vehicle: <strong>${user.vehicleModel}</strong></div>
            <div style="margin-top: 4px;">Payload Capacity: <strong>${user.payloadCapacityKg} kg</strong></div>
            ${user.cargoType ? `<div style="margin-top: 4px;">Cargo Bed: <strong>${user.cargoType}</strong></div>` : ''}
          </div>
        ` : ''}

        ${user.skills ? `
          <div style="margin-bottom: 18px;">
            <div style="font-size: 0.72rem; font-weight: 700; color: var(--color-forest-800); text-transform: uppercase; margin-bottom: 6px;">
              Verified Skills & Proficiencies:
            </div>
            <div style="display: flex; flex-wrap: wrap; gap: 6px;">
              ${user.skills.map(s => `<span class="badge" style="background: #FFFFFF; border: 1px solid var(--border-medium); color: var(--text-primary); font-size: 0.72rem;">✓ ${s}</span>`).join('')}
            </div>
          </div>
        ` : ''}

        <!-- Community Standing -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; background: var(--color-ivory-50); border: 1px solid var(--border-light); border-radius: var(--radius-md); padding: 12px; margin-bottom: 20px; font-size: var(--font-size-xs);">
          <div>
            <span style="color: var(--text-muted);">Community Impact Points:</span>
            <div style="font-weight: 800; font-size: 1.15rem; color: var(--color-orange-700);">${user.cipPoints || 300} CIP</div>
          </div>
          <div>
            <span style="color: var(--text-muted);">Honors & Role:</span>
            <div style="font-weight: 700; color: var(--color-forest-900);">${user.badge || 'Active Contributor'}</div>
          </div>
        </div>

        <!-- Trust & Safety User Controls -->
        <div style="border-top: 1px solid var(--border-light); padding-top: 14px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px;">
          <button class="btn btn-primary btn-sm" id="btnRelayMessage">
            💬 Send Masked Relay Message
          </button>

          <div style="display: flex; gap: 8px;">
            <button class="btn btn-outline btn-sm" id="btnBlockThisUser" style="color: #991B1B; border-color: #F87171;">
              Block Member
            </button>
            <button class="btn btn-outline btn-sm" id="btnReportThisUser" style="color: var(--color-danger); border-color: var(--color-danger);">
              Report Profile
            </button>
          </div>
        </div>
      </div>
    `;

    modalOverlay.classList.add('active');
    const closeModal = () => modalOverlay.classList.remove('active');
    modalCard.querySelector('#modalCloseX').addEventListener('click', closeModal);

    // Relay message
    modalCard.querySelector('#btnRelayMessage').addEventListener('click', () => {
      closeModal();
      window.LifeLoopApp.showToast(`Relay message channel opened with ${user.name}. Masked phone numbers remain secure.`, 'info');
    });

    // Block user
    modalCard.querySelector('#btnBlockThisUser').addEventListener('click', () => {
      const confirmBlock = confirm(`Block ${user.name}? Their requests and listings will no longer be visible in your feed.`);
      if (confirmBlock) {
        window.lifeLoopState.blockUser(user.name, 'User initiated block from profile modal');
        closeModal();
        window.LifeLoopApp.showToast(`${user.name} has been blocked and hidden from your loop.`, 'warning');
        // Re-render active view to update listings
        window.LifeLoopApp.renderActiveView();
      }
    });

    // Report user
    modalCard.querySelector('#btnReportThisUser').addEventListener('click', () => {
      closeModal();
      window.TrustSafety.openReportModal(user.name + ' (Profile ID)');
    });
  },

  getVerificationBadge(status) {
    if (status === 'field_verified') {
      return `<span class="badge badge-verification-field">✓ Field Verified</span>`;
    } else if (status === 'community_vouched') {
      return `<span class="badge badge-verification-vouched">👥 Community Vouched</span>`;
    }
    return `<span class="badge badge-verification-unverified">⚠ Unverified Account</span>`;
  }
};
