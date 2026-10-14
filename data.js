/**
 * LIFELOOP — Learn. Move. Grow.
 * Seed Data & Demo Ecosystem Architecture
 * Clearly tagged sample entities for civic technology prototype demonstration.
 */

window.LIFELOOP_DATA = {
  // Current prototype version & disclaimer notice
  disclaimer: {
    title: "Civic Prototype Sandbox Notice",
    message: "This platform is an interactive civic technology demonstration. All listings, rates, match scores, and profiles are simulated demo data. Real bookings require verified field confirmation.",
    version: "2.4-civic-pilot"
  },

  // Ecosystem Sectors Definition
  sectors: {
    learn: {
      id: "learn",
      name: "Learn — Digital Skills & Education",
      tagline: "Rural youth & students build practical digital livelihoods",
      color: "#2A9D8F",
      accent: "#E76F51",
      icon: "graduation-cap",
      description: "Connects students and digital scribes to farmers and local enterprises to solve everyday technical challenges."
    },
    move: {
      id: "move",
      name: "Move — Community Mobility & Fleet",
      tagline: "Shared transport for agricultural produce & rural access",
      color: "#D96B27",
      accent: "#F4A261",
      icon: "truck",
      description: "Aggregates rural mini-trucks, tractors, and utility vehicles so farm yields reach markets without middlemen exploitation."
    },
    grow: {
      id: "grow",
      name: "Grow — Agriculture & Food Security",
      tagline: "Smallholders, cooperatives, and sustainable cultivation",
      color: "#1B4332",
      accent: "#52B788",
      icon: "sprout",
      description: "Empowers family farms with verified crop advisory, fair market transport access, and digitized harvest records."
    },
    expert: {
      id: "expert",
      name: "Expert Support & Maintenance",
      tagline: "Agronomists, mechanics, and certified field specialists",
      color: "#403D39",
      accent: "#CCC5B9",
      icon: "wrench",
      description: "On-demand troubleshooting for farm equipment, solar pumps, soil health diagnostics, and vehicle roadworthiness."
    }
  },

  // Preset User Personas
  personas: [
    {
      id: "user_student",
      role: "student",
      name: "Ananya Roy",
      roleTitle: "Digital Scribe & Polytech Student",
      avatar: "AR",
      location: "Green Valley Learning Hub",
      district: "Solan Block B",
      verificationStatus: "field_verified", // "unverified" | "community_vouched" | "field_verified"
      verificationDetails: "Verified in-person by Solan Community Polytechnic Registrar on Sept 12, 2026.",
      badge: "Verified Student Fellow",
      phoneMasked: "+91 ••••• ••482",
      cipPoints: 420,
      skills: ["Digital Record Keeping", "Smartphone Literacy", "Mandi Receipt Auditing", "Marathi / Hindi Data Entry"],
      bio: "2nd year Computer Applications student passionate about helping local farming families transition away from fragile paper ledgers.",
      completedMissions: ["mission_harvest_slip"],
      activeRequests: 2
    },
    {
      id: "user_farmer",
      role: "farmer",
      name: "Harish Patel",
      roleTitle: "Organic Smallholder & Co-op Member",
      avatar: "HP",
      location: "Patel Agro Orchards, Riverside Block",
      district: "Verdant Basin",
      verificationStatus: "community_vouched",
      verificationDetails: "Vouched by 4 active members of the Verdant Basin Organic Cooperative.",
      badge: "Community Vouched Farmer",
      phoneMasked: "+91 ••••• ••915",
      cipPoints: 280,
      farmSize: "3.5 Acres",
      crops: ["Organic Heirloom Tomatoes", "Bell Peppers", "Sweet Corn"],
      bio: "Growing pesticide-free produce for 12 years. Partnering with student volunteers to digitize harvest traceability for city buyers.",
      completedMissions: ["mission_mandi_literacy"],
      activeRequests: 1
    },
    {
      id: "user_provider",
      role: "provider",
      name: "Vikram Singh",
      roleTitle: "Rural Utility & Mini-Truck Provider",
      avatar: "VS",
      location: "Highland Transit Junction",
      district: "North Ridge",
      verificationStatus: "field_verified",
      verificationDetails: "Commercial driver license and vehicle fitness verified by District Transport Cell.",
      badge: "Certified Fleet Partner",
      phoneMasked: "+91 ••••• ••337",
      cipPoints: 560,
      vehicleModel: "Mahindra Bolero Maxi-Truck Plus",
      payloadCapacityKg: 1500,
      cargoType: "Covered Weatherproof Bed",
      bio: "Owner-operator dedicated to reducing post-harvest transport losses for small farmers across Solan and Mandi corridors.",
      completedMissions: ["mission_vehicle_inspection"],
      activeRequests: 3
    },
    {
      id: "user_expert",
      role: "expert",
      name: "Dr. Sunita Rao",
      roleTitle: "Agri-Extension Specialist & Soil Scientist",
      avatar: "SR",
      location: "Regional Agro Extension Centre",
      district: "Central Mandi Zone",
      verificationStatus: "field_verified",
      verificationDetails: "State Agricultural University ID #AG-9421 authenticated.",
      badge: "Verified Agri Scientist",
      phoneMasked: "+91 ••••• ••771",
      cipPoints: 890,
      specialization: ["Soil Micro-nutrients", "Integrated Pest Management", "Tractor Hydraulic Maintenance"],
      bio: "Senior scientist bridging academic agricultural research with grassroot farming practices through community workshops.",
      completedMissions: ["mission_harvest_slip", "mission_mandi_literacy"],
      activeRequests: 1
    }
  ],

  // Opportunities Seed Pool (Feature 1)
  opportunities: [
    {
      id: "opp_101",
      title: "Digitize 50 Harvest Receipts for Tomato Cooperative",
      sector: "learn",
      roleNeeded: "Student / Digital Scribe",
      postedBy: {
        name: "Harish Patel",
        role: "farmer",
        location: "Patel Agro Orchards, Riverside Block",
        verificationStatus: "community_vouched",
        phoneMasked: "+91 ••••• ••915"
      },
      category: "Digital Record Keeping",
      urgency: "Medium",
      location: "Riverside Block (Within 6 km)",
      description: "Need a patient student volunteer or trainee to sit with our co-op committee for 2 hours to input weekly tomato dispatch receipts into a digital spreadsheet and generate QR stickers.",
      reward: "Earn 150 CIP + Fresh Organic Produce Hamper",
      tags: ["Spreadsheet", "QR Records", "Cooperative"],
      datePosted: "Yesterday",
      interestedCount: 3,
      isSample: true
    },
    {
      id: "opp_102",
      title: "Bulk Transit: 1,400 kg Organic Tomatoes to Central Mandi",
      sector: "move",
      roleNeeded: "Vehicle Provider",
      postedBy: {
        name: "Verdant Basin Agro Co-op",
        role: "farmer",
        location: "Green Valley Collection Desk",
        verificationStatus: "field_verified",
        phoneMasked: "+91 ••••• ••612"
      },
      category: "Agricultural Transport",
      urgency: "High",
      location: "Green Valley -> Central Mandi (32 km)",
      description: "Urgent harvest haul of ripe heirloom tomatoes in crates. Requires covered or tarp-fitted mini-truck (minimum 1.2 Tonne payload capacity). Early morning dispatch at 5:30 AM.",
      reward: "Direct Fair-Rate Transit Fee + 200 CIP",
      tags: ["Crates", "Perishable", "Early Morning", "Covered Bed"],
      datePosted: "Today at 08:30 AM",
      interestedCount: 2,
      isSample: true
    },
    {
      id: "opp_103",
      title: "Diagnostic Check on Solar Tube-Well Submersible Pump",
      sector: "expert",
      roleNeeded: "Mechanic / Electrical Expert",
      postedBy: {
        name: "Sundar Rajan",
        role: "farmer",
        location: "East Ridge Terraces",
        verificationStatus: "unverified",
        phoneMasked: "+91 ••••• ••884"
      },
      category: "Technical & Mechanical Repair",
      urgency: "High",
      location: "East Ridge Terraces (8.5 km)",
      description: "Our 5HP DC solar pump inverter trips after 20 minutes under peak sun. Need an expert technician or polytech mentor to inspect the inverter wiring and ground fault sensor.",
      reward: "Consultation Honorarium + 180 CIP",
      tags: ["Solar Pump", "Electrical", "Diagnostics"],
      datePosted: "2 days ago",
      interestedCount: 1,
      isSample: true
    },
    {
      id: "opp_104",
      title: "Mobile App Onboarding: Teaching 8 Women Farmers Mandi SMS Alerts",
      sector: "learn",
      roleNeeded: "Student / Community Mentor",
      postedBy: {
        name: "Shanti Devi Self-Help Group",
        role: "farmer",
        location: "Solan Block Community Hall",
        verificationStatus: "community_vouched",
        phoneMasked: "+91 ••••• ••204"
      },
      category: "Digital Literacy Workshop",
      urgency: "Low",
      location: "Solan Block Hall (In-person)",
      description: "Conduct a friendly 90-minute hands-on circle teaching our members how to verify official MSP rates on simple smartphones and avoid middleman pricing traps.",
      reward: "Community Service Certificate + 120 CIP",
      tags: ["Digital Literacy", "Women in Agri", "Mentorship"],
      datePosted: "3 days ago",
      interestedCount: 5,
      isSample: true
    },
    {
      id: "opp_105",
      title: "Return Trip Empty Leg: 2-Tonne Flatbed Available towards North Ridge",
      sector: "move",
      roleNeeded: "Farmer or Merchant with Cargo",
      postedBy: {
        name: "Vikram Singh",
        role: "provider",
        location: "Central Mandi Terminal",
        verificationStatus: "field_verified",
        phoneMasked: "+91 ••••• ••337"
      },
      category: "Shared Logistics Pooling",
      urgency: "Medium",
      location: "Central Mandi -> North Ridge Highway",
      description: "Dropping produce at Central Mandi at 11 AM tomorrow. Returning empty toward North Ridge. Available to haul fertilizer bags, irrigation pipes, or nursery saplings at shared fuel cost.",
      reward: "Shared Cost Pooling + 100 CIP",
      tags: ["Shared Route", "Fertilizer / Hardware", "Eco Pooling"],
      datePosted: "4 hours ago",
      interestedCount: 4,
      isSample: true
    },
    {
      id: "opp_106",
      title: "Soil Acidity & Salinity Rapid Kit Field Testing",
      sector: "expert",
      roleNeeded: "Agricultural Expert / Agronomist",
      postedBy: {
        name: "Riverside Orchard Union",
        role: "farmer",
        location: "Riverside Block Kiosk",
        verificationStatus: "field_verified",
        phoneMasked: "+91 ••••• ••550"
      },
      category: "Agricultural Advisory",
      urgency: "Low",
      location: "Riverside Block Kiosk",
      description: "Need soil expert to conduct quick pH tests on 12 sample soil bags collected from ginger cultivation plots. Guide farmers on bio-fertilizer dosage before sowing.",
      reward: "Verified Expert Honorarium + 220 CIP",
      tags: ["Soil Science", "Bio-Fertilizer", "Advisory"],
      datePosted: "Yesterday",
      interestedCount: 2,
      isSample: true
    }
  ],

  // Farm-To-Transport Sample Requests (Feature 2)
  transportRequests: [
    {
      id: "tr_201",
      farmerName: "Harish Patel",
      farmerLocation: "Patel Agro Orchards, Riverside Block",
      cropType: "Organic Ripe Tomatoes",
      quantityKg: 1200,
      quantityFormatted: "1,200 kg (60 Crates)",
      pickupArea: "Riverside Block - Farm Gate 2",
      destinationArea: "Central District Agro Mandi, Gate 4",
      preferredDate: "Tomorrow, 05:30 AM",
      maxBudget: "₹ 1,850",
      urgency: "Urgent (Perishable Produce)",
      cargoCondition: "Crates requiring good ventilation and tarpaulin cover against rain",
      status: "interest_received", // requested | interest_received | proposed | confirmed
      isSample: true,
      interestedProviders: [
        {
          providerId: "prov_vikram",
          name: "Vikram Singh",
          vehicle: "Mahindra Bolero Maxi-Truck (1.5T)",
          distanceToPickupKm: 4.2,
          capacityKg: 1500,
          suitabilityScore: 94,
          matchReasons: [
            "Payload capacity (1,500 kg) safely accommodates 1,200 kg with 20% safety margin.",
            "Vehicle equipped with ventilated crate racks and heavy waterproof canvas.",
            "Driver is located just 4.2 km from Riverside pickup point.",
            "Driver holds active Field Verified transport credentials."
          ],
          quoteProposed: "₹ 1,750",
          status: "interest_expressed", // interest_expressed | dispatch_proposed | confirmed
          expressedAt: "Today, 09:15 AM"
        },
        {
          providerId: "prov_priya",
          name: "Priya Verma",
          vehicle: "Gramin E-Loader Electric (800 kg)",
          distanceToPickupKm: 2.1,
          capacityKg: 800,
          suitabilityScore: 68,
          matchReasons: [
            "Ultra-close proximity (2.1 km away).",
            "Zero emission electric run.",
            "Capacity limitation: Can only carry 800 kg of the 1,200 kg load (requires 2 trips or partial load)."
          ],
          quoteProposed: "₹ 1,100 (Single trip 800 kg)",
          status: "interest_expressed",
          expressedAt: "Today, 10:40 AM"
        }
      ]
    },
    {
      id: "tr_202",
      farmerName: "Gurdev Singh Dhillon",
      farmerLocation: "North Ridge Grain Terraces",
      cropType: "Aromatic Basmati Paddy (Bulk Sacks)",
      quantityKg: 3500,
      quantityFormatted: "3,500 kg (70 Jute Sacks)",
      pickupArea: "North Ridge Community Weighbridge",
      destinationArea: "Riverside Grain Storage Depot",
      preferredDate: "Friday, 08:00 AM",
      maxBudget: "₹ 3,400",
      urgency: "Standard",
      cargoCondition: "Heavy bagged grain; requires high-capacity flatbed or tractor-trolley with tie-down straps",
      status: "requested",
      isSample: true,
      interestedProviders: []
    },
    {
      id: "tr_203",
      farmerName: "Kavita Bai",
      farmerLocation: "Green Valley Hill Kiosk",
      cropType: "Fresh Ginger & Mountain Turmeric",
      quantityKg: 850,
      quantityFormatted: "850 kg (45 Mesh Bags)",
      pickupArea: "Green Valley Kiosk Collection Center",
      destinationArea: "State Organic Terminal, Solan Hub",
      preferredDate: "Saturday, 06:30 AM",
      maxBudget: "₹ 1,400",
      urgency: "Medium",
      cargoCondition: "Dry moisture-sensitive spices; must stay protected from road dust",
      status: "interest_received",
      isSample: true,
      interestedProviders: [
        {
          providerId: "prov_amit",
          name: "Amit Deshmukh",
          vehicle: "Tata Ace High-Deck (1.2T)",
          distanceToPickupKm: 6.8,
          capacityKg: 1200,
          suitabilityScore: 89,
          matchReasons: [
            "Payload capacity (1,200 kg) handles 850 kg load comfortably.",
            "High deck protects spices from roadside mud and dust splatter.",
            "Direct route access along Solan Hub corridor."
          ],
          quoteProposed: "₹ 1,350",
          status: "interest_expressed",
          expressedAt: "Yesterday, 04:20 PM"
        }
      ]
    }
  ],

  // Vehicles Available in Provider Pool
  vehiclesPool: [
    {
      id: "veh_1",
      driverName: "Vikram Singh",
      model: "Mahindra Bolero Maxi-Truck Plus",
      category: "Light Commercial Truck",
      registration: "HP-14-B-9021",
      payloadCapacityKg: 1500,
      bedDimensions: "8.2 ft x 5.5 ft",
      hasTarp: true,
      hasRefrigeration: false,
      hasCrateRacks: true,
      currentBase: "Highland Transit Junction (4.2 km from center)",
      verificationStatus: "field_verified",
      verificationNote: "District Transport Cell fitness valid through Dec 2027",
      rating: 4.9,
      tripsCompleted: 48,
      phoneMasked: "+91 ••••• ••337"
    },
    {
      id: "veh_2",
      driverName: "Priya Verma",
      model: "Gramin E-Cargo 800 Utility",
      category: "Electric Rural Trike",
      registration: "HP-12-EV-0418",
      payloadCapacityKg: 800,
      bedDimensions: "5.5 ft x 4.0 ft",
      hasTarp: true,
      hasRefrigeration: false,
      hasCrateRacks: false,
      currentBase: "Green Valley Energy Hub (2.1 km from center)",
      verificationStatus: "community_vouched",
      verificationNote: "Clean energy subsidy certified, 3 co-op endorsements",
      rating: 4.8,
      tripsCompleted: 23,
      phoneMasked: "+91 ••••• ••119"
    },
    {
      id: "veh_3",
      driverName: "Gurpreet Gill",
      model: "Swaraj 744 FE + Heavy Trolley",
      category: "Heavy Farm Tractor-Trolley",
      registration: "HP-14-T-5510",
      payloadCapacityKg: 4500,
      bedDimensions: "12 ft x 6 ft",
      hasTarp: true,
      hasRefrigeration: false,
      hasCrateRacks: false,
      currentBase: "Riverside Grain Depot (8.0 km from center)",
      verificationStatus: "field_verified",
      verificationNote: "Heavy transport license & agricultural permit active",
      rating: 4.7,
      tripsCompleted: 62,
      phoneMasked: "+91 ••••• ••892"
    },
    {
      id: "veh_4",
      driverName: "Amit Deshmukh",
      model: "Tata Ace Gold High-Deck",
      category: "Mini Commercial Truck",
      registration: "HP-14-C-3388",
      payloadCapacityKg: 1200,
      bedDimensions: "7.0 ft x 4.8 ft",
      hasTarp: true,
      hasRefrigeration: false,
      hasCrateRacks: true,
      currentBase: "Central District Terminal (6.8 km from center)",
      verificationStatus: "unverified",
      verificationNote: "New platform registration; in-person inspection pending next week",
      rating: 4.6,
      tripsCompleted: 9,
      phoneMasked: "+91 ••••• ••776"
    }
  ],

  // Practical Learning Missions (Feature 3)
  learningMissions: [
    {
      id: "mission_harvest_slip",
      title: "Mission 1: Build Farmer Dhani's Digital Harvest Slip",
      targetRole: "Students & Digital Scribes",
      sector: "learn",
      difficulty: "Beginner Friendly",
      duration: "10 mins interactive",
      rewardCip: 150,
      badgeEarned: "Certified Digital Scribe",
      description: "Step into the shoes of student volunteer Ananya. Help organic farmer Dhani Patel digitize 3 crates of harvested bell peppers, calculate moisture grade, generate a verifiable batch QR code, and push the record to the cooperative ledger.",
      learningGoals: [
        "Eliminate paper ledger errors that cost farmers money at the weighbridge",
        "Understand crop grade classifications (Tier A / B / C)",
        "Generate cryptographic batch identifiers for fair traceability"
      ]
    },
    {
      id: "mission_vehicle_inspection",
      title: "Mission 2: Pre-Trip Fleet Safety & Cargo Load Balance",
      targetRole: "Vehicle Providers & Mechanics",
      sector: "move",
      difficulty: "Practical Hands-On",
      duration: "8 mins interactive",
      rewardCip: 180,
      badgeEarned: "Safety-First Transporter",
      description: "Inspect a 1.5-Tonne utility vehicle before a 45-km mountain harvest transit. Check tire tread depth, brake reservoir levels, tarpaulin latch tension, and calculate cargo weight distribution to avoid dangerous roll-over on hillside bends.",
      learningGoals: [
        "Spot critical roadworthiness hazards before departing the farm gate",
        "Prevent load shifting and crate crushing during transit",
        "Earn verified safety trust points that boost match ranking"
      ]
    },
    {
      id: "mission_mandi_literacy",
      title: "Mission 3: Mandi Pricing Literacy & SMS Receipt Audit",
      targetRole: "Farmers & Beginners",
      sector: "grow",
      difficulty: "Essential Civic Skill",
      duration: "12 mins interactive",
      rewardCip: 200,
      badgeEarned: "Agri-Tech Pioneer",
      description: "Learn how to read official government Minimum Support Price (MSP) broadcasts, decode mandi deduction slips (weighing fees, commission, moisture dockage), and detect fraudulent deductions before signing the sale memo.",
      learningGoals: [
        "Decipher complex mandi sale receipts with confidence",
        "Distinguish official portal SMS from predatory middleman messages",
        "Protect family farm earnings through data-driven price verification"
      ]
    }
  ],

  // Community Impact Map Nodes (Feature 4)
  mapNodes: [
    {
      id: "node_1",
      name: "Green Valley Community Learning Kiosk",
      type: "learning_center",
      sector: "learn",
      x: 28, // % from left in SVG canvas
      y: 35, // % from top
      district: "Green Valley Block",
      facilitator: "Prof. Arvind Joshi",
      verified: true,
      verificationLabel: "Field Verified Institution",
      activeWorkstations: 8,
      solarPowered: true,
      services: ["Student Digital Clinics", "Crop Ledger Printing", "Smartphone Literacy"],
      activeOpportunities: 3,
      contactMasked: "+91 ••••• ••101",
      description: "A community solar-powered room equipped with 8 refurbished laptops where local polytech students train elders in digital government services."
    },
    {
      id: "node_2",
      name: "Patel Agro Organic Farm Hub",
      type: "agri_hub",
      sector: "grow",
      x: 22,
      y: 58,
      district: "Riverside Block",
      facilitator: "Harish Patel",
      verified: true,
      verificationLabel: "Community Vouched Farm",
      activeWorkstations: 0,
      services: ["Organic Compost Demonstration", "Produce Aggregation", "Rainwater Harvesting"],
      activeOpportunities: 2,
      contactMasked: "+91 ••••• ••915",
      description: "Central collection point for 14 smallholder organic growers. Equipped with a digital scale and crate washing station."
    },
    {
      id: "node_3",
      name: "Highland Cooperative Transit Hub",
      type: "transport_hub",
      sector: "move",
      x: 52,
      y: 42,
      district: "Highland Junction",
      facilitator: "Vikram Singh & Co-op Committee",
      verified: true,
      verificationLabel: "Field Verified Fleet Desk",
      activeWorkstations: 0,
      services: ["Shared Cargo Pooling", "Tarp & Strapping Depot", "Trip Staging"],
      activeOpportunities: 4,
      contactMasked: "+91 ••••• ••337",
      description: "Logistics staging yard where mini-trucks and tractors consolidate partial farm loads for high-efficiency bulk trips to the city terminal."
    },
    {
      id: "node_4",
      name: "Gramin Precision Mechanics & Solar Clinic",
      type: "mechanic",
      sector: "expert",
      x: 45,
      y: 65,
      district: "South Valley Corridors",
      facilitator: "Master Mechanic Devinder",
      verified: true,
      verificationLabel: "Certified Rural Workshop",
      activeWorkstations: 4,
      services: ["Tractor Diagnostics", "Solar Inverter Repair", "Brake Overhaul"],
      activeOpportunities: 2,
      contactMasked: "+91 ••••• ••448",
      description: "Equipped with heavy hydraulic jacks, digital multimeter diagnostics, and spare belts for farm machinery."
    },
    {
      id: "node_5",
      name: "Central District Agro Mandi Gate 4",
      type: "agri_hub",
      sector: "grow",
      x: 78,
      y: 28,
      district: "Central Mandi Metro Zone",
      facilitator: "Mandi Board Inspection Cell",
      verified: true,
      verificationLabel: "Government Verified Terminal",
      activeWorkstations: 12,
      services: ["Electronic Weighbridge", "Direct Co-op Auction", "Cold Pre-Cooling"],
      activeOpportunities: 5,
      contactMasked: "+91 ••••• ••990",
      description: "Major regional marketplace handling over 150 tonnes of horticultural produce every morning."
    },
    {
      id: "node_6",
      name: "Solan North Ridge Extension Post",
      type: "learning_center",
      sector: "learn",
      x: 65,
      y: 72,
      district: "North Ridge",
      facilitator: "Dr. Sunita Rao",
      verified: true,
      verificationLabel: "State University Field Desk",
      activeWorkstations: 6,
      services: ["Soil Health Rapid Card", "Pest Identification Clinic", "Seed Testing"],
      activeOpportunities: 1,
      contactMasked: "+91 ••••• ••771",
      description: "Mobile research unit analyzing soil salinity and providing free organic biocontrol recipes to mountain orchards."
    },
    {
      id: "node_7",
      name: "Riverside EV Charging & Trike Stand",
      type: "transport_hub",
      sector: "move",
      x: 35,
      y: 82,
      district: "Lower River Corridors",
      facilitator: "Priya Verma",
      verified: true,
      verificationLabel: "Green Grid Certified",
      activeWorkstations: 2,
      services: ["Solar Rapid Battery Swap", "Light Cargo Despatch", "Emergency Air Compressor"],
      activeOpportunities: 2,
      contactMasked: "+91 ••••• ••119",
      description: "Dedicated micro-mobility point for electric cargo trikes serving river-bank farms within 15 km."
    }
  ],

  // Live Community Activity Feed (Simulated civic heartbeat)
  recentSynergies: [
    {
      id: "syn_1",
      timestamp: "12 mins ago",
      text: "Student Ananya completed Digital Harvest Log for Patel Agro — 1,200 kg tomatoes verified.",
      tag: "Learn -> Grow",
      accent: "#2A9D8F"
    },
    {
      id: "syn_2",
      timestamp: "38 mins ago",
      text: "Driver Vikram Singh confirmed dispatch for 60 crates from Riverside to Central Mandi.",
      tag: "Move -> Grow",
      accent: "#D96B27"
    },
    {
      id: "syn_3",
      timestamp: "1 hour ago",
      text: "Mechanic Devinder certified brake pads on Tata Ace #HP-14-C-3388 before mountain transit.",
      tag: "Expert -> Move",
      accent: "#403D39"
    },
    {
      id: "syn_4",
      timestamp: "2 hours ago",
      text: "Farmer Dhani used digital price ledger to secure ₹ 4/kg higher return on bell peppers.",
      tag: "Learn -> Income",
      accent: "#1B4332"
    }
  ]
};
