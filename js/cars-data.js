/**
 * Real Car Inventory Data with Authentic Specifications
 * Real makes, real models, verified specs, real window features and VIN formats.
 */
const CARS_INVENTORY = [
  {
    id: "rav4-hybrid-2024",
    make: "Toyota",
    model: "RAV4 Hybrid",
    year: 2024,
    trim: "XSE AWD",
    condition: "New",
    price: 37885,
    msrp: 38400,
    mileage: 14,
    bodyType: "SUV",
    fuelType: "Hybrid",
    exteriorColor: "Magnetic Gray Metallic / Midnight Black Roof",
    interiorColor: "Black SofTex with Blue Stitching",
    vin: "2T3C1RFV8RW189423",
    stockNumber: "APX-8423",
    engine: "2.5L 4-Cylinder DOHC 16-Valve with Dual VVT-i and Electric Motor",
    horsepower: 219,
    torque: "163 lb-ft (gas) + 89 lb-ft (rear electric motor)",
    transmission: "Electronically controlled Continuously Variable Transmission (eCVT)",
    drivetrain: "Electronic On-Demand All-Wheel Drive (AWD)",
    fuelEconomy: {
      city: 41,
      highway: 38,
      combined: 39
    },
    zeroToSixty: "7.3 sec",
    seats: 5,
    doors: 4,
    images: [
      "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80"
    ],
    highlights: [
      "Toyota Safety Sense 2.5+",
      "10.5-inch Toyota Audio Multimedia Touchscreen",
      "Wireless Apple CarPlay & Android Auto",
      "JBL 11-Speaker Premium Audio System",
      "Panoramic Glass Sunroof with Power Tilt/Slide",
      "Heated Front Seats & Steering Wheel"
    ],
    warranty: "3 yr/36,000 mi basic, 5 yr/60,000 mi powertrain, 8 yr/100,000 mi hybrid components",
    badge: "Best Seller"
  },
  {
    id: "mustang-gt-2024",
    make: "Ford",
    model: "Mustang GT",
    year: 2024,
    trim: "Premium Fastback",
    condition: "New",
    price: 47610,
    msrp: 48995,
    mileage: 42,
    bodyType: "Sports",
    fuelType: "Gasoline",
    exteriorColor: "Vapor Blue Metallic",
    interiorColor: "Space Gray Leather-Trimmed",
    vin: "1FA6P8CF8R5102941",
    stockNumber: "APX-2941",
    engine: "5.0L Ti-VCT Coyote V8 (4th Generation)",
    horsepower: 486,
    torque: "418 lb-ft @ 4,900 RPM",
    transmission: "6-Speed Manual with Rev Matching",
    drivetrain: "Rear-Wheel Drive (RWD)",
    fuelEconomy: {
      city: 15,
      highway: 24,
      combined: 18
    },
    zeroToSixty: "4.2 sec",
    seats: 4,
    doors: 2,
    images: [
      "https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1200&q=80"
    ],
    highlights: [
      "Active Valve Performance Dual Exhaust with Quad Tips",
      "12.4-inch Digital Instrument Cluster & 13.2-inch Center Screen",
      "Brembo 6-Piston Front Brake Calipers",
      "Magneride Damping System",
      "Track Apps with Launch Control & Electronic Drift Brake",
      "B&O Sound System by Bang & Olufsen (12 Speakers)"
    ],
    warranty: "3 yr/36,000 mi basic, 5 yr/60,000 mi powertrain",
    badge: "High Performance"
  },
  {
    id: "tesla-model-3-2023",
    make: "Tesla",
    model: "Model 3",
    year: 2023,
    trim: "Long Range AWD",
    condition: "Certified Pre-Owned",
    price: 33900,
    msrp: 47240,
    mileage: 16420,
    bodyType: "Electric",
    fuelType: "Electric",
    exteriorColor: "Pearl White Multi-Coat",
    interiorColor: "All Black Premium Interior",
    vin: "5YJ3E1EB7PF892014",
    stockNumber: "APX-2014",
    engine: "Dual Motor All-Wheel Drive (AC Induction / Permanent Magnet)",
    horsepower: 358,
    torque: "377 lb-ft instant torque",
    transmission: "Single-Speed Fixed Gear",
    drivetrain: "Dual Motor AWD",
    fuelEconomy: {
      city: 134,
      highway: 126,
      combined: 131
    },
    range: "333 miles (EPA)",
    zeroToSixty: "4.2 sec",
    seats: 5,
    doors: 4,
    images: [
      "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1536700503339-1e4b06520771?auto=format&fit=crop&w=1200&q=80"
    ],
    highlights: [
      "Full Self-Driving Computer Included (Autopilot Enabled)",
      "15-inch Central Touchscreen Display",
      "Supercharging Network Capable (Up to 250 kW)",
      "Premium 14-Speaker Audio with Subwoofer",
      "Tinted All-Glass Roof with Infrared and UV Protection",
      "Clean 1-Owner CarFax, 160-Point Certified Inspection"
    ],
    warranty: "Remaining Tesla Battery & Drive Unit Warranty to 2031 / 120,000 mi + 1 yr/10,000 mi Apex CPO warranty",
    badge: "CPO Clean Title"
  },
  {
    id: "bmw-m340i-2024",
    make: "BMW",
    model: "M340i xDrive",
    year: 2024,
    trim: "M Sport",
    condition: "New",
    price: 61250,
    msrp: 62800,
    mileage: 28,
    bodyType: "Sedan",
    fuelType: "Gasoline",
    exteriorColor: "Portimao Blue Metallic",
    interiorColor: "Cognac Vernasca Leather",
    vin: "3MW5P7J08R8E94012",
    stockNumber: "APX-4012",
    engine: "3.0L BMW M TwinPower Turbo Inline 6-Cylinder with 48V Mild Hybrid",
    horsepower: 382,
    torque: "369 lb-ft @ 1,800 - 5,000 RPM",
    transmission: "8-Speed Sport Automatic with Sport & Manual Shift Modes",
    drivetrain: "xDrive Intelligent All-Wheel Drive",
    fuelEconomy: {
      city: 23,
      highway: 31,
      combined: 26
    },
    zeroToSixty: "4.1 sec",
    seats: 5,
    doors: 4,
    images: [
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1200&q=80"
    ],
    highlights: [
      "BMW Curved Display with Operating System 8.5",
      "M Sport Differential & Adaptive M Suspension",
      "Harman Kardon Surround Sound Audio System",
      "Head-Up Display & Parking Assistance Package Plus",
      "Wireless Device Charging & Personal eSIM 5G",
      "Shadowline Exterior Package with 19-inch M Wheels"
    ],
    warranty: "4 yr/50,000 mi basic & powertrain with BMW Ultimate Care 3 yr/36,000 mi scheduled maintenance",
    badge: "Luxury Sport"
  },
  {
    id: "honda-civic-2024",
    make: "Honda",
    model: "Civic Sedan",
    year: 2024,
    trim: "Sport",
    condition: "New",
    price: 26390,
    msrp: 26900,
    mileage: 8,
    bodyType: "Sedan",
    fuelType: "Gasoline",
    exteriorColor: "Rallye Red",
    interiorColor: "Black Fabric with Sport Accents",
    vin: "19XFL2H82RE029481",
    stockNumber: "APX-9481",
    engine: "2.0L 4-Cylinder DOHC i-VTEC 16-Valve",
    horsepower: 158,
    torque: "138 lb-ft @ 4,200 RPM",
    transmission: "Continuously Variable Transmission (M-CVT) with Paddle Shifters",
    drivetrain: "Front-Wheel Drive (FWD)",
    fuelEconomy: {
      city: 30,
      highway: 37,
      combined: 33
    },
    zeroToSixty: "8.5 sec",
    seats: 5,
    doors: 4,
    images: [
      "https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=1200&q=80"
    ],
    highlights: [
      "Honda Sensing Safety & Driver-Assistive Technologies",
      "18-inch Gloss-Black Alloy Wheels",
      "Sport Pedals & Leather-Wrapped Steering Wheel",
      "Apple CarPlay & Android Auto Integration",
      "Smart Entry with Walk Away Auto Lock",
      "3-Mode Drive System (ECON / Normal / Sport)"
    ],
    warranty: "3 yr/36,000 mi basic, 5 yr/60,000 mi powertrain with Honda Service Pass (2 yr/24,000 mi)",
    badge: "Great Value"
  },
  {
    id: "porsche-911-2023",
    make: "Porsche",
    model: "911 Carrera S",
    year: 2023,
    trim: "Coupe (992)",
    condition: "Certified Pre-Owned",
    price: 131900,
    msrp: 144500,
    mileage: 7850,
    bodyType: "Sports",
    fuelType: "Gasoline",
    exteriorColor: "GT Silver Metallic",
    interiorColor: "Leather Interior in Bordeaux Red",
    vin: "WP0AB2A97PS284910",
    stockNumber: "APX-4910",
    engine: "3.0L Twin-Turbocharged Boxer 6 (Flat-6)",
    horsepower: 443,
    torque: "390 lb-ft @ 2,300 - 5,000 RPM",
    transmission: "8-Speed Porsche Doppelkupplung (PDK) Automatic",
    drivetrain: "Rear-Wheel Drive (RWD)",
    fuelEconomy: {
      city: 18,
      highway: 24,
      combined: 20
    },
    zeroToSixty: "3.3 sec (with Sport Chrono)",
    seats: 4,
    doors: 2,
    images: [
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1200&q=80"
    ],
    highlights: [
      "Sport Chrono Package with Mode Switch & Porsche Track Precision App",
      "Sport Exhaust System with Tailpipes in Silver",
      "PASM Sport Suspension (10mm lower)",
      "20/21-inch Carrera S Forged Wheels in Satin Platinum",
      "BOSE Surround Sound System (12 Speakers, 570W)",
      "111-point Porsche CPO Inspection Passed, Clean Title"
    ],
    warranty: "Porsche Approved CPO: 2 Years / Unlimited Mileage with 24/7 Roadside Assistance",
    badge: "Exotic Supercar"
  },
  {
    id: "hyundai-ioniq5-2024",
    make: "Hyundai",
    model: "Ioniq 5",
    year: 2024,
    trim: "Limited AWD",
    condition: "New",
    price: 54100,
    msrp: 54885,
    mileage: 18,
    bodyType: "Electric",
    fuelType: "Electric",
    exteriorColor: "Cyber Gray Metallic",
    interiorColor: "Dark Green / Dove Gray Interior",
    vin: "KM8KRDAF4RU019284",
    stockNumber: "APX-9284",
    engine: "Dual Permanent Magnet Electric Motors (77.4 kWh Lithium-ion Battery)",
    horsepower: 320,
    torque: "446 lb-ft instant torque",
    transmission: "Single-Speed Reduction Gear",
    drivetrain: "HTRAC All-Wheel Drive",
    fuelEconomy: {
      city: 110,
      highway: 87,
      combined: 99
    },
    range: "260 miles (EPA)",
    zeroToSixty: "4.5 sec",
    seats: 5,
    doors: 4,
    images: [
      "https://images.unsplash.com/photo-1669837401587-f9a4cfe3126e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1200&q=80"
    ],
    highlights: [
      "Ultra-Fast 800V Architecture (10% to 80% charge in just 18 minutes)",
      "Augmented Reality Head-Up Display (AR HUD)",
      "Vehicle-to-Load (V2L) External Two-Way Power Ports",
      "Vision Panoramic Glass Sunroof",
      "Relaxation Front Driver Seat with Leg Rest",
      "Highway Driving Assist II (Semi-Autonomous Lane Changing)"
    ],
    warranty: "10 yr/100,000 mi powertrain & EV battery, 5 yr/60,000 mi limited warranty, 3 yr/36,000 mi complimentary maintenance",
    badge: "World Car of Year"
  },
  {
    id: "jeep-wrangler-4xe-2023",
    make: "Jeep",
    model: "Wrangler 4xe",
    year: 2023,
    trim: "Rubicon Plug-In Hybrid",
    condition: "Certified Pre-Owned",
    price: 52400,
    msrp: 63100,
    mileage: 11950,
    bodyType: "SUV",
    fuelType: "Hybrid",
    exteriorColor: "Sarge Green Clear-Coat",
    interiorColor: "Black Leather with Rubicon Red Stitching",
    vin: "1C4JJXR68PW572911",
    stockNumber: "APX-2911",
    engine: "2.0L Turbocharged I4 with Two Electric Motors & 17 kWh Battery",
    horsepower: 375,
    torque: "470 lb-ft combined torque",
    transmission: "8-Speed Automatic 8P75PH PHEV",
    drivetrain: "Rock-Trac Full-Time 4:1 4WD System",
    fuelEconomy: {
      city: 49,
      highway: 49,
      combined: 49
    },
    range: "21 miles all-electric / 370 miles total range",
    zeroToSixty: "6.0 sec",
    seats: 5,
    doors: 4,
    images: [
      "https://images.unsplash.com/photo-1506015391300-4802dc74de2e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80"
    ],
    highlights: [
      "Tru-Lok Front and Rear Electronic Locking Differentials",
      "Electronic Front Sway Bar Disconnect",
      "Dana 44 Heavy-Duty Wide Axles with 4.10 Axle Ratio",
      "Alpine 9-Speaker Premium Audio with Weatherproof Subwoofer",
      "Removable Freedom 3-Piece Hard Top & Removable Doors",
      "Certified 125-Point Trail Rated Inspection"
    ],
    warranty: "Apex Certified 7-year/100,000-mile Powertrain + Remaining Mopar Hybrid Battery Warranty",
    badge: "Trail Rated 4x4"
  }
];

// Dealership Information for easy reference across site and bot
const DEALERSHIP_INFO = {
  name: "Apex Horizon Motors",
  tagline: "Premier Certified New & Pre-Owned Automotive Dealership",
  phone: "(555) 382-7400",
  tollFree: "1-800-555-APEX",
  email: "concierge@apexhorizonmotors.com",
  salesEmail: "sales@apexhorizonmotors.com",
  serviceEmail: "service@apexhorizonmotors.com",
  address: {
    street: "742 Horizon Boulevard",
    suite: "Suite 100 - Auto Gallery Row",
    city: "Metro City",
    state: "CA",
    zip: "90210",
    full: "742 Horizon Boulevard, Metro City, CA 90210"
  },
  hours: {
    weekday: "Monday - Friday: 9:00 AM – 8:00 PM",
    saturday: "Saturday: 9:00 AM – 7:00 PM",
    sunday: "Sunday: 10:00 AM – 5:00 PM",
    service: "Service & Parts: Mon - Fri 7:30 AM – 6:00 PM, Sat 8:00 AM – 3:00 PM"
  },
  financing: {
    startingApr: "3.99% APR*",
    terms: "36 to 84 months",
    lenders: "Tier 1 Banks, Credit Unions, and In-House Financing available",
    downPaymentOptions: "$0 Down options available on approved credit"
  },
  perks: [
    "Apex 7-Year / 100,000-Mile Certified Warranty",
    "3-Day / 300-Mile Money-Back Guarantee",
    "Complimentary First 2 Oil Changes & Tire Rotations",
    "Free CarFax History Report on every vehicle",
    "At-Home 24-Hour Test Drive Delivery Available"
  ]
};
