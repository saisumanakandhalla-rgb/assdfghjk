/**
 * LIFELOOP — State Management & Reactive Store
 * Handles user persona switcher, persistent data in localStorage,
 * matching lifecycle state machine, missions, and trust & safety controls.
 */

class LifeLoopState {
  constructor() {
    this.STORAGE_KEY = 'lifeloop_state_v2';
    this.listeners = new Map();
    this.init();
  }

  init() {
    const defaultData = window.LIFELOOP_DATA;
    const stored = this.loadFromStorage();

    if (stored) {
      this.state = stored;
      // Ensure any newly added seed structure is merged safely
      if (!this.state.completedMissions) this.state.completedMissions = {};
      if (!this.state.blockedUsers) this.state.blockedUsers = [];
      if (!this.state.reports) this.state.reports = [];
      if (!this.state.myInterests) this.state.myInterests = {};
      if (!this.state.customOpportunities) this.state.customOpportunities = [];
      if (!this.state.customTransportRequests) this.state.customTransportRequests = [];
    } else {
      this.state = {
        currentRole: 'student', // 'student' | 'farmer' | 'provider' | 'expert'
        activeUser: defaultData.personas[0],
        opportunities: [...defaultData.opportunities],
        transportRequests: JSON.parse(JSON.stringify(defaultData.transportRequests)),
        vehicles: [...defaultData.vehiclesPool],
        completedMissions: {
          // mission_harvest_slip: { completedAt: "...", pointsAwarded: 150 }
        },
        cipBalance: 420, // Community Impact Points
        myInterests: {}, // { oppId: { timestamp: "...", status: "expressed", message: "..." } }
        blockedUsers: [],
        reports: [],
        bookmarks: [],
        transportBookings: {}, // tracking multi-step lifecycle
        filters: {
          sector: 'all',
          category: 'all',
          location: 'all',
          query: '',
          roleNeeded: 'all'
        },
        activeView: 'ecosystem' // 'ecosystem' | 'matcher' | 'transport' | 'learn' | 'map' | 'safety'
      };
      this.saveToStorage();
    }
  }

  loadFromStorage() {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.warn('LocalStorage error or unavailable, using in-memory state.', e);
      return null;
    }
  }

  saveToStorage() {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.state));
    } catch (e) {
      console.warn('Unable to write to localStorage', e);
    }
  }

  // Subscribe to state changes
  subscribe(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event).add(callback);
    return () => this.listeners.get(event).delete(callback);
  }

  emit(event, data) {
    if (this.listeners.has(event)) {
      this.listeners.get(event).forEach(cb => {
        try {
          cb(data, this.state);
        } catch (err) {
          console.error(`Error in state listener for ${event}:`, err);
        }
      });
    }
    if (this.listeners.has('*')) {
      this.listeners.get('*').forEach(cb => cb(event, data, this.state));
    }
  }

  // Switch Active User Persona
  switchRole(roleName) {
    const persona = window.LIFELOOP_DATA.personas.find(p => p.role === roleName);
    if (!persona) return;

    this.state.currentRole = roleName;
    this.state.activeUser = { ...persona };
    // Synchronize balance if recorded
    if (!this.state.cipBalance && this.state.cipBalance !== 0) {
      this.state.cipBalance = persona.cipPoints;
    }

    this.saveToStorage();
    this.emit('role_changed', { role: roleName, user: this.state.activeUser });
    this.emit('state_updated', this.state);
  }

  // Navigate View
  setView(viewName) {
    this.state.activeView = viewName;
    this.saveToStorage();
    this.emit('view_changed', viewName);
  }

  // Opportunity Management (Feature 1)
  addOpportunity(newOpp) {
    const opp = {
      id: 'opp_' + Date.now(),
      title: newOpp.title,
      sector: newOpp.sector || 'learn',
      roleNeeded: newOpp.roleNeeded || 'Community Member',
      postedBy: {
        name: this.state.activeUser.name,
        role: this.state.currentRole,
        location: this.state.activeUser.location,
        verificationStatus: this.state.activeUser.verificationStatus,
        phoneMasked: this.state.activeUser.phoneMasked
      },
      category: newOpp.category || 'General Support',
      urgency: newOpp.urgency || 'Medium',
      location: newOpp.location || 'Community Kiosk Area',
      description: newOpp.description,
      reward: newOpp.reward || 'Community Civic Recognition + 100 CIP',
      tags: newOpp.tags || ['Civic Support'],
      datePosted: 'Just now',
      interestedCount: 0,
      isSample: false, // User created!
      isUserCreated: true
    };

    this.state.opportunities.unshift(opp);
    this.saveToStorage();
    this.emit('opportunity_added', opp);
    this.emit('state_updated', this.state);
    return opp;
  }

  expressInterestInOpportunity(oppId, message) {
    const opp = this.state.opportunities.find(o => o.id === oppId);
    if (!opp) return false;

    if (!this.state.myInterests[oppId]) {
      opp.interestedCount = (opp.interestedCount || 0) + 1;
      this.state.myInterests[oppId] = {
        expressedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        user: this.state.activeUser.name,
        role: this.state.currentRole,
        message: message || "I would like to help with this opportunity."
      };
      // Award 25 CIP for civic participation
      this.awardCip(25, `Expressed interest in '${opp.title}'`);
      this.saveToStorage();
      this.emit('interest_expressed', { oppId, opp });
      this.emit('state_updated', this.state);
      return true;
    }
    return false;
  }

  // Farm-To-Transport Matching (Feature 2)
  addTransportRequest(requestData) {
    const newReq = {
      id: 'tr_' + Date.now(),
      farmerName: this.state.activeUser.name,
      farmerLocation: requestData.pickupArea || this.state.activeUser.location,
      cropType: requestData.cropType,
      quantityKg: Number(requestData.quantityKg),
      quantityFormatted: `${Number(requestData.quantityKg).toLocaleString()} kg`,
      pickupArea: requestData.pickupArea,
      destinationArea: requestData.destinationArea,
      preferredDate: requestData.preferredDate || 'Tomorrow Morning',
      maxBudget: requestData.maxBudget ? `₹ ${requestData.maxBudget}` : 'Fair Market Standard',
      urgency: requestData.urgency || 'Standard',
      cargoCondition: requestData.cargoCondition || 'Standard agricultural handling',
      status: 'requested', // requested -> interest_received -> proposed -> confirmed
      isSample: false,
      isUserCreated: true,
      interestedProviders: []
    };

    this.state.transportRequests.unshift(newReq);
    // Farmer earns 30 CIP for registering transparent haulage
    this.awardCip(30, `Logged harvest transit request for ${newReq.cropType}`);
    this.saveToStorage();
    this.emit('transport_request_added', newReq);
    this.emit('state_updated', this.state);
    return newReq;
  }

  // Vehicle provider expresses interest in a farm haul
  providerExpressInterest(requestId, providerData, quote) {
    const req = this.state.transportRequests.find(r => r.id === requestId);
    if (!req) return false;

    // Calculate realistic suitability metrics
    const payload = providerData.payloadCapacityKg || 1200;
    const capacityRatio = Math.min(100, Math.round((payload / req.quantityKg) * 100));
    const isOverload = req.quantityKg > payload;

    const reasons = [
      isOverload 
        ? `Capacity warning: Cargo (${req.quantityKg} kg) exceeds declared payload (${payload} kg). Partial load or multi-trip required.` 
        : `Capacity match: ${payload} kg rating safely handles the ${req.quantityKg} kg harvest load.`,
      `Vehicle base is stationed within primary operating zone.`,
      `Driver status: ${providerData.verificationStatus === 'field_verified' ? 'Field Verified credentials on file' : 'Standard verified account'}.`,
      `Safety equipment: ${providerData.hasTarp ? 'Waterproof tarpaulin available' : 'Open bed cargo safety protocols apply'}.`
    ];

    const providerEntry = {
      providerId: providerData.id || 'prov_' + Date.now(),
      name: providerData.driverName || this.state.activeUser.name,
      vehicle: providerData.model || this.state.activeUser.vehicleModel || "Rural Utility Vehicle",
      distanceToPickupKm: (Math.random() * 6 + 1.5).toFixed(1),
      capacityKg: payload,
      suitabilityScore: isOverload ? 58 : Math.min(98, Math.max(75, Math.round(92 - (Math.random() * 10)))),
      matchReasons: reasons,
      quoteProposed: quote || 'Fair Mandi Rate',
      status: 'interest_expressed', // NEVER confirmed automatically!
      expressedAt: 'Just now'
    };

    req.interestedProviders.push(providerEntry);
    req.status = 'interest_received';

    this.awardCip(35, `Expressed transport interest for haulage #${req.id}`);
    this.saveToStorage();
    this.emit('provider_expressed_interest', { requestId, providerEntry });
    this.emit('state_updated', this.state);
    return true;
  }

  // Farmer sends dispatch proposal to a provider
  proposeDispatchTerms(requestId, providerId, terms) {
    const req = this.state.transportRequests.find(r => r.id === requestId);
    if (!req) return false;

    const prov = req.interestedProviders.find(p => p.providerId === providerId);
    if (!prov) return false;

    prov.status = 'dispatch_proposed';
    prov.dispatchTerms = terms || 'Agreed standard terms, dispatch pending provider confirmation.';
    req.status = 'proposed';

    this.saveToStorage();
    this.emit('dispatch_proposed', { requestId, providerId });
    this.emit('state_updated', this.state);
    return true;
  }

  // STRICT REQUIREMENT: Only the provider confirming it marks it as confirmed
  confirmTransportBooking(requestId, providerId) {
    const req = this.state.transportRequests.find(r => r.id === requestId);
    if (!req) return false;

    const prov = req.interestedProviders.find(p => p.providerId === providerId);
    if (!prov) return false;

    prov.status = 'confirmed';
    prov.confirmedAt = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    req.status = 'confirmed';
    req.confirmedProvider = prov;

    // Both parties gain trust rewards
    this.awardCip(100, `Confirmed transport agreement for ${req.cropType}`);
    this.saveToStorage();
    this.emit('transport_confirmed', { requestId, provider: prov });
    this.emit('state_updated', this.state);
    return true;
  }

  // Learning Missions (Feature 3)
  completeMission(missionId, missionResultData) {
    const mission = window.LIFELOOP_DATA.learningMissions.find(m => m.id === missionId);
    if (!mission) return false;

    if (!this.state.completedMissions[missionId]) {
      this.state.completedMissions[missionId] = {
        completedAt: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
        pointsEarned: mission.rewardCip,
        badgeEarned: mission.badgeEarned,
        resultData: missionResultData || {}
      };

      this.awardCip(mission.rewardCip, `Completed Mission: ${mission.title}`);
      this.saveToStorage();
      this.emit('mission_completed', { missionId, mission, result: this.state.completedMissions[missionId] });
      this.emit('state_updated', this.state);
      return true;
    }
    return false;
  }

  // Trust & Safety Operations (Feature 5)
  blockUser(userName, reason) {
    if (!this.state.blockedUsers.includes(userName)) {
      this.state.blockedUsers.push(userName);
      this.saveToStorage();
      this.emit('user_blocked', { userName, reason });
      this.emit('state_updated', this.state);
      return true;
    }
    return false;
  }

  unblockUser(userName) {
    this.state.blockedUsers = this.state.blockedUsers.filter(u => u !== userName);
    this.saveToStorage();
    this.emit('user_unblocked', userName);
    this.emit('state_updated', this.state);
  }

  submitReport(targetEntity, violationType, details) {
    const report = {
      id: 'rep_' + Date.now(),
      target: targetEntity,
      reporterRole: this.state.currentRole,
      violationType,
      details,
      timestamp: new Date().toLocaleString(),
      status: 'Pending Community Review Desk'
    };

    this.state.reports.push(report);
    this.saveToStorage();
    this.emit('report_submitted', report);
    this.emit('state_updated', this.state);
    return report;
  }

  // CIP Points System
  awardCip(amount, reason) {
    this.state.cipBalance = (this.state.cipBalance || 0) + amount;
    this.emit('cip_awarded', { amount, total: this.state.cipBalance, reason });
  }

  // Reset to demo defaults
  resetDemoData() {
    localStorage.removeItem(this.STORAGE_KEY);
    this.init();
    this.emit('data_reset', this.state);
    this.emit('state_updated', this.state);
  }

  // Filter setters
  setFilter(key, value) {
    this.state.filters[key] = value;
    this.emit('filters_changed', this.state.filters);
  }
}

// Global singleton instance
window.lifeLoopState = new LifeLoopState();
