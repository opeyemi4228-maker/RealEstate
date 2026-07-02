// ════════════════════════════════════════════════════════════════════
// Prime Homes, data layer (Abuja, Nigeria)
//
// Central source of demo data for the marketing site: property listings,
// agents, service offerings, and testimonials. Prices are in Nigerian
// Naira (₦). Images are served from Unsplash (allowed in next.config.mjs).
// Replace with your CMS / DB feed for production.
// ════════════════════════════════════════════════════════════════════

const img = (id, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

// ─────────────────────────────────────────────────────────────────────
// Agents
// ─────────────────────────────────────────────────────────────────────
export const agentsData = [
  {
    _id: "agent_1",
    name: "Amaka Okeke",
    title: "Principal Agent · Luxury Homes",
    photo: img("photo-1573496359142-b8d87734a5a2", 600),
    email: "amaka@primehomes.ng",
    phone: "+234 803 000 0142",
    license: "RE-882041",
    experienceYears: 12,
    sales: 340,
    rating: 4.9,
    specialties: ["Luxury", "Detached Duplex", "New Builds"],
    areas: ["Maitama", "Asokoro"],
    bio: "Amaka leads our luxury division with a record of high-value sales across Maitama and Asokoro. She pairs sharp negotiation with white-glove service.",
  },
  {
    _id: "agent_2",
    name: "Tunde Bello",
    title: "Senior Agent · Residential Sales",
    photo: img("photo-1507003211169-0a1dd7228f2d", 600),
    email: "tunde@primehomes.ng",
    phone: "+234 805 000 0193",
    license: "RE-771230",
    experienceYears: 9,
    sales: 210,
    rating: 4.8,
    specialties: ["Family Homes", "First-Time Buyers", "Relocation"],
    areas: ["Gwarinpa", "Lokogoma"],
    bio: "Tunde makes first homes feel within reach. He guides buyers through financing, documentation, and closing with patience and clarity.",
  },
  {
    _id: "agent_3",
    name: "Zainab Ibrahim",
    title: "Lettings & Property Management",
    photo: img("photo-1580489944761-15a19d654956", 600),
    email: "zainab@primehomes.ng",
    phone: "+234 807 000 0177",
    license: "RE-665914",
    experienceYears: 7,
    sales: 480,
    rating: 4.9,
    specialties: ["Rentals", "Landlord Services", "Serviced Apartments"],
    areas: ["Jabi", "Wuse 2"],
    bio: "Zainab manages a portfolio of rental homes and helps landlords maximise yield while keeping tenants happy and properties impeccable.",
  },
  {
    _id: "agent_4",
    name: "Emeka Nwosu",
    title: "Commercial & Investment Advisor",
    photo: img("photo-1519085360753-af0119f7cbe7", 600),
    email: "emeka@primehomes.ng",
    phone: "+234 809 000 0158",
    license: "RE-540027",
    experienceYears: 15,
    sales: 95,
    rating: 5.0,
    specialties: ["Commercial", "Office", "Mixed-Use"],
    areas: ["Central Business District", "Guzape"],
    bio: "Emeka advises investors and businesses on commercial acquisitions, leasing, and portfolio strategy across the FCT.",
  },
];

export const getAgentById = (id) => agentsData.find((a) => a._id === id);

// ─────────────────────────────────────────────────────────────────────
// Properties (prices in Naira)
// ─────────────────────────────────────────────────────────────────────
export const productsDummyData = [
  {
    _id: "prop_001",
    agentId: "agent_1",
    name: "Modern Family Home in Maitama",
    description:
      "A charming 4-bedroom family home with a landscaped garden, fitted kitchen, and fully finished bathrooms. Close to schools, malls, and the city centre.",
    price: 270000000,
    offerPrice: 255000000,
    status: "For Sale",
    featured: true,
    image: [
      img("photo-1568605114967-8130f3a36994"),
      img("photo-1570129477492-45c003edd2be"),
      img("photo-1493809842364-78817add7ffb"),
    ],
    category: "House",
    bedrooms: 4,
    bathrooms: 4,
    garage: 2,
    areaSqFt: 3200,
    yearBuilt: 2019,
    amenities: ["Garden", "Fitted Kitchen", "Borehole", "24/7 Security"],
    location: { address: "14 Gana Street", city: "Maitama", state: "Abuja", lat: 9.0875, lng: 7.4951 },
    date: 1710000000000,
  },
  {
    _id: "prop_002",
    agentId: "agent_1",
    name: "Luxury Apartment, Wuse 2",
    description:
      "Bright 3-bedroom serviced apartment with city views, 24-hour power, concierge, and gym access. Designed for elevated city living.",
    price: 180000000,
    offerPrice: 172000000,
    status: "For Sale",
    featured: true,
    image: [
      img("photo-1502672260266-1c1ef2d93688"),
      img("photo-1522708323590-d24dbb6b0267"),
      img("photo-1560448204-e02f11c3d0e2"),
    ],
    category: "Apartment",
    bedrooms: 3,
    bathrooms: 3,
    garage: 1,
    areaSqFt: 1600,
    yearBuilt: 2021,
    amenities: ["Concierge", "Gym", "24/7 Power", "Swimming Pool"],
    location: { address: "Plot 12, Aminu Kano Crescent", city: "Wuse 2", state: "Abuja", lat: 9.0820, lng: 7.4690 },
    date: 1710001000000,
  },
  {
    _id: "prop_003",
    agentId: "agent_2",
    name: "Cozy Starter Home, Lokogoma",
    description:
      "Beautifully finished 2-bedroom home with open-plan living, en-suite rooms, and a private compound. The perfect low-maintenance starter home.",
    price: 75000000,
    offerPrice: 72000000,
    status: "For Sale",
    featured: true,
    image: [
      img("photo-1572120360610-d971b9d7767c"),
      img("photo-1583608205776-bfd35f0d9f83"),
      img("photo-1484154218962-a197022b5858"),
    ],
    category: "House",
    bedrooms: 2,
    bathrooms: 2,
    garage: 1,
    areaSqFt: 1100,
    yearBuilt: 2018,
    amenities: ["Private Compound", "En-suite Rooms", "Open Plan"],
    location: { address: "Crystal Estate, Lokogoma", city: "Lokogoma", state: "Abuja", lat: 8.9870, lng: 7.4360 },
    date: 1710002000000,
  },
  {
    _id: "prop_004",
    agentId: "agent_4",
    name: "Penthouse Loft, Guzape",
    description:
      "Striking open-plan penthouse loft with soaring ceilings, panoramic city views, and oversized windows flooding the space with natural light.",
    price: 195000000,
    offerPrice: 188000000,
    status: "For Sale",
    featured: true,
    image: [
      img("photo-1502005229762-cf1b2da7c5d6"),
      img("photo-1524758631624-e2822e304c36"),
      img("photo-1503174971373-b1f69850bded"),
    ],
    category: "Loft",
    bedrooms: 2,
    bathrooms: 2,
    garage: 1,
    areaSqFt: 1400,
    yearBuilt: 2022,
    amenities: ["City Views", "High Ceilings", "Smart Home"],
    location: { address: "Guzape Hills, Guzape", city: "Guzape", state: "Abuja", lat: 9.0410, lng: 7.5160 },
    date: 1710003000000,
  },
  {
    _id: "prop_005",
    agentId: "agent_2",
    name: "Spacious Family Duplex, Gwarinpa",
    description:
      "Generous 4-bedroom detached duplex with a large compound, two-car garage, and a recently updated kitchen. Located in a quiet, secure estate.",
    price: 145000000,
    offerPrice: 139000000,
    status: "For Sale",
    featured: true,
    image: [
      img("photo-1564013799919-ab600027ffc6"),
      img("photo-1580587771525-78b9dba3b914"),
      img("photo-1576941089067-2de3c901e126"),
    ],
    category: "House",
    bedrooms: 4,
    bathrooms: 4,
    garage: 2,
    areaSqFt: 2400,
    yearBuilt: 2017,
    amenities: ["Large Compound", "2-Car Garage", "Updated Kitchen", "Estate Security"],
    location: { address: "7th Avenue, Gwarinpa", city: "Gwarinpa", state: "Abuja", lat: 9.1100, lng: 7.4060 },
    date: 1710004000000,
  },
  {
    _id: "prop_006",
    agentId: "agent_3",
    name: "Serviced Apartment, Jabi Lakefront",
    description:
      "Sun-filled 2-bedroom serviced apartment near Jabi Lake, with a private balcony, pool, and secure parking. Modern living by the water.",
    price: 1300000,
    offerPrice: 1250000,
    status: "For Rent",
    featured: true,
    image: [
      img("photo-1512917774080-9991f1c4c750"),
      img("photo-1613490493576-7fde63acd811"),
      img("photo-1502672023488-70e25813eb80"),
    ],
    category: "Apartment",
    bedrooms: 2,
    bathrooms: 2,
    garage: 1,
    areaSqFt: 1200,
    yearBuilt: 2020,
    amenities: ["Swimming Pool", "Balcony", "Lake View", "Secure Parking"],
    location: { address: "Jabi Lakefront, Jabi", city: "Jabi", state: "Abuja", lat: 9.0710, lng: 7.4220 },
    date: 1710005000000,
  },
  {
    _id: "prop_007",
    agentId: "agent_4",
    name: "Office Space, Central Business District",
    description:
      "Flexible Grade-A commercial office space in Abuja's Central Business District with excellent access, ample parking, and standby power.",
    price: 320000000,
    offerPrice: 310000000,
    status: "For Sale",
    featured: false,
    image: [
      img("photo-1497366216548-37526070297c"),
      img("photo-1497366811353-6870744d04b2"),
      img("photo-1604328698692-f76ea9498e76"),
    ],
    category: "Commercial",
    bedrooms: 0,
    bathrooms: 4,
    garage: 0,
    areaSqFt: 5200,
    yearBuilt: 2016,
    amenities: ["Open Floorplan", "Standby Power", "Ample Parking"],
    location: { address: "Central Business District", city: "CBD", state: "Abuja", lat: 9.0578, lng: 7.4951 },
    date: 1710006000000,
  },
  {
    _id: "prop_008",
    agentId: "agent_3",
    name: "Terraced Townhouse, Lugbe",
    description:
      "A stylish 3-bedroom terraced townhouse with a private garden, smart-home features, and an attached carport in a quiet, gated estate.",
    price: 950000,
    offerPrice: 900000,
    status: "For Rent",
    featured: false,
    image: [
      img("photo-1576941089067-2de3c901e126"),
      img("photo-1600585154340-be6161a56a0c"),
      img("photo-1600566753086-00f18fb6b3ea"),
    ],
    category: "Townhouse",
    bedrooms: 3,
    bathrooms: 3,
    garage: 1,
    areaSqFt: 1700,
    yearBuilt: 2021,
    amenities: ["Private Garden", "Smart Home", "Gated Estate"],
    location: { address: "Sunnyvale Estate, Lugbe", city: "Lugbe", state: "Abuja", lat: 8.9760, lng: 7.3720 },
    date: 1710007000000,
  },
  {
    _id: "prop_009",
    agentId: "agent_1",
    name: "Luxury Villa, Asokoro",
    description:
      "An exceptional 5-bedroom villa with a swimming pool, cinema room, staff quarters, and floor-to-ceiling glass throughout. Diplomatic-zone living.",
    price: 850000000,
    offerPrice: 820000000,
    status: "For Sale",
    featured: false,
    image: [
      img("photo-1613977257363-707ba9348227"),
      img("photo-1600596542815-ffad4c1539a9"),
      img("photo-1600607687939-ce8a6c25118c"),
    ],
    category: "Villa",
    bedrooms: 5,
    bathrooms: 6,
    garage: 4,
    areaSqFt: 7800,
    yearBuilt: 2022,
    amenities: ["Swimming Pool", "Cinema Room", "Staff Quarters", "Smart Home"],
    location: { address: "Yedseram Street, Asokoro", city: "Asokoro", state: "Abuja", lat: 9.0330, lng: 7.5260 },
    date: 1710008000000,
  },
];

export const getPropertyById = (id) =>
  productsDummyData.find((p) => p._id === id);

export const propertyCategories = [
  "All",
  "House",
  "Apartment",
  "Townhouse",
  "Loft",
  "Villa",
  "Commercial",
];

export const propertyStatuses = ["All", "For Sale", "For Rent"];

// ─────────────────────────────────────────────────────────────────────
// Services
// ─────────────────────────────────────────────────────────────────────
export const servicesData = [
  {
    number: "01",
    slug: "sourcing",
    title: "Property Sourcing & Acquisition",
    summary:
      "Secure, well-structured, high-value properties matched to your needs and budget.",
    detail:
      "We source land and homes for individuals, corporate organisations, and diaspora investors, handling search, inspection, and acquisition end to end so you buy right, the first time.",
  },
  {
    number: "02",
    slug: "investment",
    title: "Investment Advisory & Portfolio Guidance",
    summary:
      "Informed, profitable real estate decisions backed by data and market expertise.",
    detail:
      "From single acquisitions to growing portfolios, our advisors guide you on where, when, and how to invest for the strongest, most secure returns.",
  },
  {
    number: "03",
    slug: "development",
    title: "Development & Project Supervision",
    summary:
      "Real estate development delivered to the highest standards of quality and infrastructure.",
    detail:
      "We manage projects from concept to completion, design, build, and on-site supervision, ensuring every development meets the Prime Homes benchmark.",
  },
  {
    number: "04",
    slug: "legal",
    title: "Legal Verification & Documentation",
    summary:
      "Thorough due diligence and clean documentation on every transaction.",
    detail:
      "Title verification, perfection of documents, and end-to-end legal checks eliminate uncertainty, so you enjoy complete security, clarity, and peace of mind.",
  },
  {
    number: "05",
    slug: "management",
    title: "Property Management & Consultancy",
    summary:
      "Hands-off ownership with professional management and expert consultancy.",
    detail:
      "Rent collection, maintenance, facility and tenant management, plus strategic consultancy, protecting and growing the value of your asset.",
  },
];

// Company facts for About / structured data
export const companyInfo = {
  name: "Prime Homes",
  tagline: "Do it right, deliver value, and build trust.",
  vision:
    "To be the most trusted and sought-after real estate brand in Nigeria, setting the benchmark for excellence, transparency, and value-driven property delivery.",
  mission:
    "To redefine real estate in Nigeria by delivering secure, high-quality, and value-oriented property solutions backed by integrity, professionalism, and exceptional service.",
};

export const strategicGoals = [
  {
    number: "01",
    title: "Excellence in Delivery",
    copy: "To consistently deliver real estate projects that meet the highest standards in quality, design, and infrastructure.",
  },
  {
    number: "02",
    title: "Trust & Transparency Leadership",
    copy: "To become a leading authority in ethical real estate practices, eliminating uncertainty and building investor confidence.",
  },
  {
    number: "03",
    title: "Client Satisfaction & Retention",
    copy: "To achieve a high level of repeat business by delivering outstanding service and measurable value.",
  },
  {
    number: "04",
    title: "Market Expansion",
    copy: "To expand our footprint across key cities in Nigeria and position Prime Homes as a global investment partner for diaspora clients.",
  },
  {
    number: "05",
    title: "Technology Integration",
    copy: "To develop a digital ecosystem that simplifies property search, verification, and acquisition.",
  },
];

// ─────────────────────────────────────────────────────────────────────
// Testimonials
// ─────────────────────────────────────────────────────────────────────
export const testimonialsData = [
  {
    name: "Chika & Tobi Adeyemi",
    role: "Bought in Gwarinpa",
    quote:
      "Our agent found us the perfect family duplex and negotiated below asking. The whole process felt effortless from start to finish.",
    rating: 5,
  },
  {
    name: "Musa Abdullahi",
    role: "Sold in Maitama",
    quote:
      "Sold within weeks, above my target price. The marketing and photography were genuinely best in class. I couldn't recommend them more.",
    rating: 5,
  },
  {
    name: "Ngozi Eze",
    role: "Landlord, Jabi",
    quote:
      "Their management team takes everything off my plate, rent, repairs, tenants. I haven't had a single sleepless night since.",
    rating: 5,
  },
];
