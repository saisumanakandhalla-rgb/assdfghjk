/**
 * LIFELOOP — Main Application Orchestrator
 * Connects views, handles role switching, toasts, modals, and responsive layout.
 */

window.LifeLoopApp = {
  init() {
    this.viewContainer = document.getElementById('viewContainer');
    this.bindNavigation();
    this.bindRoleSwitcher();
    this.bindHeaderActions();
    this.bindMobileMenu();

    // Subscribe to state changes
    window.lifeLoopState.subscribe('view_changed', (view) => {
      this.updateActiveNavTab(view);
      this.renderActiveView();
    });

    window.lifeLoopState.subscribe('role_changed', ({ role, user }) => {
      this.updateHeaderUserDisplay(user);
      this.renderActiveView();
      this.showToast(`Switched active persona to ${user.name} (${user.roleTitle})`, 'info');
    });

    window.lifeLoopState.subscribe('cip_awarded', ({ amount, total, reason }) => {
      this.updateCipDisplay(total);
    });

    // Initial render
    this.updateHeaderUserDisplay(window.lifeLoopState.state.activeUser);
    this.updateCipDisplay(window.lifeLoopState.state.cipBalance);
    this.updateActiveNavTab(window.lifeLoopState.state.activeView);
    this.renderActiveView();

    console.log("LIFELOOP Civic Ecosystem initialized successfully.");
  },

  bindNavigation() {
    document.querySelectorAll('.nav-tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const view = e.currentTarget.getAttribute('data-view');
        if (view) {
          window.lifeLoopState.setView(view);
          // Close mobile menu if open
          const nav = document.querySelector('.main-nav');
          if (nav) nav.classList.remove('mobile-open');
        }
      });
    });

    // Brand click returns to ecosystem view
    const brand = document.querySelector('.brand-container');
    if (brand) {
      brand.addEventListener('click', (e) => {
        e.preventDefault();
        window.lifeLoopState.setView('ecosystem');
      });
    }
  },

  bindRoleSwitcher() {
    const roleSelect = document.getElementById('roleSelectDropdown');
    if (roleSelect) {
      roleSelect.value = window.lifeLoopState.state.currentRole;
      roleSelect.addEventListener('change', (e) => {
        window.lifeLoopState.switchRole(e.target.value);
      });
    }
  },

  bindHeaderActions() {
    // CIP Badge click
    const cipBadge = document.getElementById('headerCipBadge');
    if (cipBadge) {
      cipBadge.addEventListener('click', () => {
        this.openCipInfoModal();
      });
    }

    // Profile trigger button
    const userProfileBtn = document.getElementById('userProfileTrigger');
    if (userProfileBtn) {
      userProfileBtn.addEventListener('click', () => {
        const currentUser = window.lifeLoopState.state.activeUser;
        window.ProfileModal.open(currentUser.name);
      });
    }

    // Disclaimer banner info button
    const btnDisclaimer = document.getElementById('btnDisclaimerInfo');
    if (btnDisclaimer) {
      btnDisclaimer.addEventListener('click', () => {
        this.openDisclaimerModal();
      });
    }

    // Reset Demo Data Button
    const btnReset = document.getElementById('btnResetDemoState');
    if (btnReset) {
      btnReset.addEventListener('click', () => {
        const confirmReset = confirm("Reset all simulated data back to fresh prototype factory defaults?");
        if (confirmReset) {
          window.lifeLoopState.resetDemoData();
          this.updateHeaderUserDisplay(window.lifeLoopState.state.activeUser);
          this.updateCipDisplay(window.lifeLoopState.state.cipBalance);
          this.renderActiveView();
          this.showToast("Demo state reset to clean seed baseline.", "info");
        }
      });
    }

    // Global modal overlay backdrop click to close
    const overlay = document.getElementById('globalModalOverlay');
    if (overlay) {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          overlay.classList.remove('active');
        }
      });
    }
  },

  bindMobileMenu() {
    const toggle = document.getElementById('mobileMenuToggle');
    const nav = document.querySelector('.main-nav');
    if (toggle && nav) {
      toggle.addEventListener('click', () => {
        nav.classList.toggle('mobile-open');
      });
    }
  },

  updateActiveNavTab(viewName) {
    document.querySelectorAll('.nav-tab-btn').forEach(btn => {
      const v = btn.getAttribute('data-view');
      if (v === viewName) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  updateHeaderUserDisplay(user) {
    const avatar = document.getElementById('headerUserAvatar');
    const roleSelect = document.getElementById('roleSelectDropdown');
    if (avatar) avatar.textContent = user.avatar || user.name.charAt(0);
    if (roleSelect) roleSelect.value = user.role;
  },

  updateCipDisplay(totalPoints) {
    const count = document.getElementById('headerCipCount');
    if (count) count.textContent = `${totalPoints || 0} CIP`;
  },

  renderActiveView() {
    const view = window.lifeLoopState.state.activeView;
    if (!this.viewContainer) return;

    switch(view) {
      case 'ecosystem':
        window.EcosystemView.render(this.viewContainer);
        break;
      case 'matcher':
        window.OpportunityMatcher.render(this.viewContainer);
        break;
      case 'transport':
        window.TransportMatcher.render(this.viewContainer);
        break;
      case 'learn':
        window.LearningMissions.render(this.viewContainer);
        break;
      case 'map':
        window.ImpactMap.render(this.viewContainer);
        break;
      case 'safety':
        window.TrustSafety.render(this.viewContainer);
        break;
      default:
        window.EcosystemView.render(this.viewContainer);
    }
  },

  showToast(message, type = 'info') {
    const container = document.getElementById('globalToastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <div style="flex: 1;">${message}</div>
      <button style="background: transparent; border: none; color: #FFF; opacity: 0.7; cursor: pointer; font-size: 1.1rem; line-height: 1;">&times;</button>
    `;

    toast.querySelector('button').addEventListener('click', () => {
      toast.remove();
    });

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 4500);
  },

  openCipInfoModal() {
    const modalOverlay = document.getElementById('globalModalOverlay');
    const modalCard = document.getElementById('globalModalCard');
    const state = window.lifeLoopState.state;

    modalCard.innerHTML = `
      <div class="modal-header">
        <h3 class="modal-title">Community Impact Points (CIP)</h3>
        <button class="modal-close-btn" id="modalCloseX">&times;</button>
      </div>
      <div class="modal-body">
        <div style="text-align: center; padding: 16px; background: var(--color-orange-50); border: 1px solid var(--color-orange-400); border-radius: var(--radius-lg); margin-bottom: 20px;">
          <div style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.08em; font-weight: 700; color: var(--color-orange-900);">
            Your Active Civic Ledger Balance
          </div>
          <div style="font-family: var(--font-family-display); font-size: 2.75rem; font-weight: 800; color: var(--color-orange-700); margin: 6px 0;">
            ${state.cipBalance} CIP
          </div>
          <div style="font-size: var(--font-size-xs); color: var(--text-secondary);">
            Awarded for non-monetary community mutual aid, verified transport pooling, and digital assistance.
          </div>
        </div>

        <h4 style="font-size: var(--font-size-sm); color: var(--color-forest-900); font-weight: 700; margin-bottom: 8px;">
          How CIP Points Are Earned:
        </h4>
        <ul style="list-style: none; display: flex; flex-direction: column; gap: 8px; font-size: var(--font-size-xs); color: var(--text-secondary); margin-bottom: 16px;">
          <li style="display: flex; justify-content: space-between; padding: 6px 10px; background: var(--color-ivory-100); border-radius: var(--radius-sm);">
            <span>🎓 Complete Practical Learning Mission</span>
            <strong style="color: var(--color-forest-700);">+150 to +200 CIP</strong>
          </li>
          <li style="display: flex; justify-content: space-between; padding: 6px 10px; background: var(--color-ivory-100); border-radius: var(--radius-sm);">
            <span>🚚 Confirm Fair Harvest Transit Agreement</span>
            <strong style="color: var(--color-forest-700);">+100 CIP</strong>
          </li>
          <li style="display: flex; justify-content: space-between; padding: 6px 10px; background: var(--color-ivory-100); border-radius: var(--radius-sm);">
            <span>🌱 Log Transparent Produce Request</span>
            <strong style="color: var(--color-forest-700);">+30 CIP</strong>
          </li>
          <li style="display: flex; justify-content: space-between; padding: 6px 10px; background: var(--color-ivory-100); border-radius: var(--radius-sm);">
            <span>🤝 Express Interest in Community Request</span>
            <strong style="color: var(--color-forest-700);">+25 CIP</strong>
          </li>
        </ul>

        <div style="font-size: 0.72rem; color: var(--text-muted); border-top: 1px solid var(--border-light); padding-top: 10px;">
          *CIP points demonstrate verified reliability to community cooperatives and are not speculative crypto-currency tokens.
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" id="btnCloseCip">Close</button>
      </div>
    `;

    modalOverlay.classList.add('active');
    const closeModal = () => modalOverlay.classList.remove('active');
    modalCard.querySelector('#modalCloseX').addEventListener('click', closeModal);
    modalCard.querySelector('#btnCloseCip').addEventListener('click', closeModal);
  },

  openDisclaimerModal() {
    const modalOverlay = document.getElementById('globalModalOverlay');
    const modalCard = document.getElementById('globalModalCard');

    modalCard.innerHTML = `
      <div class="modal-header">
        <h3 class="modal-title">Civic Prototype Sandbox Notice</h3>
        <button class="modal-close-btn" id="modalCloseX">&times;</button>
      </div>
      <div class="modal-body">
        <div style="background: var(--color-ivory-100); border: 1px solid var(--border-medium); border-radius: var(--radius-md); padding: 14px; margin-bottom: 16px; font-size: var(--font-size-xs); line-height: 1.6;">
          <strong>Authentic Prototype Integrity Declaration:</strong>
          <ul style="margin-top: 8px; margin-left: 18px; display: flex; flex-direction: column; gap: 6px;">
            <li>This web application is an interactive civic technology demonstration created for evaluation and design testing.</li>
            <li>All profiles, vehicle capacities, mandi rates, and geographic coordinates are simulated demo assets.</li>
            <li><strong>No fabricated live data:</strong> We do not fabricate live weather radars, fake market price tickers, or artificial payment transactions.</li>
            <li><strong>Strict Trust Rule:</strong> No vehicle booking is ever marked confirmed until the vehicle provider explicitly attests to capacity and confirms dispatch.</li>
            <li>Personal phone numbers are masked across all interfaces to respect privacy ethics.</li>
          </ul>
        </div>
        <p style="font-size: var(--font-size-xs); color: var(--text-muted);">
          Design & Architecture Version: <strong>LIFELOOP v2.4 Civic Pilot</strong>
        </p>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" id="btnCloseDisclaimer">Understood</button>
      </div>
    `;

    modalOverlay.classList.add('active');
    const closeModal = () => modalOverlay.classList.remove('active');
    modalCard.querySelector('#modalCloseX').addEventListener('click', closeModal);
    modalCard.querySelector('#btnCloseDisclaimer').addEventListener('click', closeModal);
  }
};

// Start application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.LifeLoopApp.init();
});
