const STORAGE_KEYS = {
  missed: "tmm-missed-question-ids",
  progress: "tmm-study-progress-v2"
};

const SECTION_RULES = [
  ["Fundamentals", /metallic|condon|morse|hume|electro|thermal expansion|stiff|crystal structure|mg at room|diffus/i],
  ["Plasticity", /twinning|slip|schmid|crss|strain hardening|hall-petch|dislocation|stacking fault|cold work|formability/i],
  ["Heat Treatment", /ttt|hardenability|tempering|annealing|normalizing|spheroid|induction|nitriding|carburizing|surface hardening|quenching/i],
  ["Production", /blast furnace|bof|vod|deoxid|manganese|weldability|tmcp|reducing agent|pig iron/i],
  ["Corrosion & SS", /corrosion|stainless|sensitization|duplex|pren|galvanic|passivat|cathode|anodic/i],
  ["Al & Casting", /aluminium|aluminum|al-si|7xxx|2xxx|aging|precipitation|solidification|casting|eutectic|sr/i],
  ["Fe-C & Steels", /fe-c|eutect|austenite|ferrite|cementite|pearlite|aisi|steel|crmo|x40|14cr|1095|4140|1010/i]
];

const XP_PER_LEVEL = 120;
const RECENT_CARD_GAP = 3;
const OPTION_MARKERS = ["1", "2", "3", "4"];
const GRAPH_DECK = "graph-questions";
const LECTURE_PLAN_START = new Date(2026, 4, 20);
const LECTURE_BREAK_INTERVAL = 4;
const LECTURE_FINAL_BREAK_START_INDEX = 13;
const DAY_MS = 24 * 60 * 60 * 1000;
const CONFETTI_COLORS = ["#2f6fed", "#1f8f63", "#f59e0b", "#ef4444", "#7c3aed"];
const DATE_FORMATTER = new Intl.DateTimeFormat(undefined, {
  month: "short",
  day: "numeric"
});
const TTT_TUTORIAL_STEPS = [
  {
    id: "map",
    kicker: "Step 1",
    title: "Read the map before reading the path.",
    text: "A TTT diagram starts from fully austenitized steel. The vertical axis is temperature, the horizontal axis is time, and the C-shaped curves tell you when austenite starts and finishes transforming at a given temperature.",
    bullets: [
      "Above the start curve, the structure is still austenite, A.",
      "A1 is the eutectoid/austenite-pearlite reference line used in the professor's TTT questions.",
      "Ms, M90 and Mf are martensite reference lines, not equilibrium Fe-C phase boundaries."
    ],
    rule: "First name the field. Do not jump straight to the final answer until you know whether the path is still in A, inside product + A, or below Ms.",
    path: "M125 60 L250 60",
    point: [250, 60],
    label: ["100% A before transformation", 266, 54],
    badge: "Start with austenite",
    focus: "No product has formed until a start curve is crossed."
  },
  {
    id: "start-finish",
    kicker: "Step 2",
    title: "Crossing a start curve means product plus remaining austenite.",
    text: "The left C-curve is the start of transformation and the right curve or percentage line is completion. If the path enters but does not finish a region, only part of the austenite has transformed.",
    bullets: [
      "Inside the pearlite field, write P + A until pearlite is complete.",
      "Inside a ferrite field, write F + A until ferrite formation finishes.",
      "If a cooling path leaves the field early, the remaining A continues to the next lower reaction."
    ],
    rule: "The professor often asks for field names like P+A or M+A. The +A is the leftover austenite, not a new stable room-temperature phase.",
    path: "M125 60 L125 150 L280 150",
    point: [280, 150],
    label: ["P + remaining A", 300, 142],
    badge: "Partial transformation",
    focus: "Product amount is controlled by how far and how long the path sits inside the region."
  },
  {
    id: "bainite",
    kicker: "Step 3",
    title: "Place bainite between pearlite and martensite.",
    text: "Bainite forms below the pearlite region and above Ms. The course/exam labels usually split it into upper bainite, BU, at higher bainitic temperature and lower bainite, BL, closer to Ms.",
    bullets: [
      "BU is the higher-temperature bainite product.",
      "BL is the lower-temperature bainite product and is commonly grouped near martensite in exam mixtures.",
      "The bainitic bay is a delay/notch in the TTT curves; exam traps link it to fast nucleation but slow growth or to alloying elements such as Cr, Mo or Ni in the shown steel."
    ],
    rule: "If the path holds in the bainite range, call the transformed part BU or BL by height on the diagram. Carry any untransformed A onward.",
    path: "M125 60 L125 282 L245 282 L245 374",
    point: [245, 282],
    label: ["Partial bainite hold", 260, 272],
    badge: "Bainite range",
    focus: "Higher bainite field gives BU; lower bainite field gives BL."
  },
  {
    id: "martensite",
    kicker: "Step 4",
    title: "Below Ms, remaining austenite becomes martensite only partly.",
    text: "Martensite is diffusionless. It begins at Ms and increases as temperature falls toward M90 or Mf. If the path does not transform all austenite, the rest is residual or retained austenite, AR.",
    bullets: [
      "M means martensite formed from the austenite still left when the path crossed Ms.",
      "M + AR means some austenite transformed to martensite and some remained.",
      "More carbon and austenitizing alloying elements can lower Ms and increase residual austenite."
    ],
    rule: "Do not convert the whole steel to martensite if some austenite already became P, F or B earlier. Martensite only comes from the austenite still remaining.",
    path: "M125 60 L125 365 L390 365",
    point: [390, 365],
    label: ["M + AR", 408, 356],
    badge: "Quench below Ms",
    focus: "Residual austenite is the untransformed remainder at room temperature."
  },
  {
    id: "fractions",
    kicker: "Step 5",
    title: "For percentage questions, keep a running balance.",
    text: "The professor's diagram questions are usually approximate. You read a fraction from the curve or labeled path, subtract it from the remaining austenite, and then continue to the next segment.",
    bullets: [
      "Start at 100% A.",
      "If 50% becomes P, only the remaining 50% can later become BL, M or AR.",
      "Final answers often look like 50%P + 45%TM+BL + 5%AR because the path produced products in stages."
    ],
    rule: "The right answer is the best approximate mixture from the path, not the prettiest exact calculation. If the prompt says neglect below 5%, omit tiny products.",
    path: "M125 60 L125 150 L250 150 L250 292 L265 292 L265 374",
    point: [265, 292],
    label: ["Stage 2: BL/TM", 286, 280],
    badge: "Staged answer",
    focus: "Each product consumes only the austenite available at that moment."
  },
  {
    id: "traps",
    kicker: "Step 6",
    title: "Watch the professor's recurring traps.",
    text: "The graph questions mix TTT reading with Fe-C symbols, steel names and shorthand region labels. Most wrong answers come from treating every A as final austenite or forgetting which critical line is being shown.",
    bullets: [
      "A1, A3 and Acm are different critical lines; do not choose the familiar one automatically.",
      "P is pearlite, a ferrite + cementite microconstituent, not a single phase.",
      "Ni can lower Ms; hardenability promoters shift transformation curves to longer times, often down-right in the exam wording."
    ],
    rule: "Read the exact figure label first. Region names like R, G or C are not universal; they mean whatever field that label touches in the shown diagram.",
    path: "M125 60 L125 118 L356 118 M125 60 L125 340 L560 340",
    point: [560, 340],
    label: ["Labels depend on the exact figure", 474, 332],
    badge: "Exam traps",
    focus: "Use the diagram's fields, not memorized letter names."
  }
];

const LECTURE_SUMMARIES = [
  {
    moduleId: "lecture-1-intro",
    focus: "How metals are studied: structure, defects, diffusion and the link between processing and properties.",
    core: [
      "Use the processing -> structure -> properties -> performance chain when answering broad oral questions.",
      "Know the observation scale: OM for micrometre grains/phases, SEM for surface and fine microstructure, TEM for nanoscale defects, XRD for crystal structure, phases, lattice spacing and residual stress.",
      "Metallic bonding is non-directional; this explains ductility, electrical/thermal conductivity and why crystal defects can move.",
      "Crystal structure matters: FCC is close packed and usually very ductile; BCC is less close packed and often has faster diffusion; HCP has fewer easy slip systems.",
      "Point, line, surface and volume defects control real material behaviour: vacancies/interstitials, dislocations, grain boundaries and inclusions.",
      "Do not confuse solubility with diffusivity: larger interstitial sites help solubility, while available jump paths and activation energy control diffusion."
    ],
    oral: [
      "Start answers from length scale and instrument choice, then connect the observation to a property.",
      "When asked why metals deform plastically, say dislocation motion rather than whole planes sliding at once.",
      "If diffusion appears, mention temperature dependence and crystal structure before giving a one-line conclusion."
    ],
    traps: [
      "XRD is not mainly an imaging microscope.",
      "FCC having larger interstitial sites does not automatically mean faster diffusion than BCC.",
      "Perfect crystals are teaching models; engineering properties come from defects and microstructure."
    ]
  },
  {
    moduleId: "lecture-2-metals",
    focus: "Crystal structures, metallic properties, microstructure detection and why metals behave differently from ceramics and polymers.",
    core: [
      "BCC, FCC and HCP are the main metallic structures; packing, coordination and slip systems explain ductility and diffusion differences.",
      "FCC metals generally deform easily because they have many close-packed slip systems; BCC slip can be temperature sensitive.",
      "HCP metals can be less ductile at room temperature because fewer independent slip systems are available.",
      "Microstructure contains grains, grain boundaries, phases, precipitates, inclusions and pores; it is not only the chemical composition.",
      "Electrical and thermal conductivity come from mobile electrons; modulus and melting point come from bond strength and interatomic potential.",
      "A phase is a physically and chemically uniform region; a grain is a crystal region with one orientation."
    ],
    oral: [
      "For any structure question, answer using packing, slip, interstitial space and defect movement.",
      "For microscopy questions, state what each tool sees and why that scale matters.",
      "For property questions, connect atomic bonding to microstructure, then to macroscopic behaviour."
    ],
    traps: [
      "Do not call SEM/TEM manufacturing processes.",
      "Do not say optical microscopy reaches atomic spacing.",
      "Do not mix up grain boundaries with phase boundaries; they can coincide but are not the same concept."
    ]
  },
  {
    moduleId: "lecture-3-condon-morse",
    focus: "Atomic bonding, Condon-Morse potential, alloy formation and the Hume-Rothery rules.",
    core: [
      "The Condon-Morse curve links interatomic distance to potential energy; the minimum gives equilibrium spacing and bond energy.",
      "A deeper, steeper potential well means higher modulus, higher melting tendency and lower thermal expansion.",
      "Substitutional solid solutions replace solvent atoms; interstitial solid solutions put small atoms into interstitial sites.",
      "The Hume-Rothery rules for extensive substitutional solubility are atomic size similarity, same crystal structure, similar electronegativity and favourable valency.",
      "If atomic size mismatch is large, lattice strain increases and solubility decreases.",
      "Alloys can be single-phase solid solutions or multiphase microstructures; the phase diagram tells which is expected at equilibrium."
    ],
    oral: [
      "For Hume-Rothery, list all four rules and say what each one physically prevents.",
      "For Condon-Morse, sketch the idea verbally: attraction, repulsion, equilibrium distance and well depth.",
      "When explaining alloy formation, separate atomic-scale solubility from microstructure-scale phases."
    ],
    traps: [
      "High melting point is not only atomic mass; bond strength is central.",
      "Similar crystal structure helps substitutional solubility but does not guarantee unlimited solubility alone.",
      "Interstitial alloying needs small atoms; normal-size metal atoms do not fit interstitially."
    ]
  },
  {
    moduleId: "lecture-4-microplasticity",
    focus: "Dislocations, slip, twinning and the microscopic start of plastic deformation.",
    core: [
      "Plastic deformation in metals occurs mainly by dislocation motion on slip systems.",
      "A slip system is a slip plane plus slip direction; close-packed planes and directions are usually easiest.",
      "Schmid law uses resolved shear stress: tau = sigma cos(phi) cos(lambda); slip starts when tau reaches CRSS.",
      "Edge and screw dislocations have different line/Burgers-vector geometry but both allow plastic strain at much lower stress than ideal shear.",
      "Twinning reorients part of a crystal and becomes important when slip is limited, especially in some HCP metals.",
      "Stacking fault energy influences cross-slip, twinning tendency, work hardening and deformation mode."
    ],
    oral: [
      "If asked about yielding, describe resolved shear stress and CRSS rather than only macroscopic stress.",
      "For ductility differences, compare available slip systems and obstacles to dislocation motion.",
      "For twinning, say it changes orientation and can help deformation when ordinary slip is difficult."
    ],
    traps: [
      "Do not say plasticity requires breaking all bonds across a whole plane at once.",
      "Schmid factor is geometric; it is not a new material constant.",
      "More dislocations can make further deformation harder because they interact and block each other."
    ]
  },
  {
    moduleId: "lecture-5-strengthening",
    focus: "How metals are strengthened by blocking dislocation motion, and what is lost in return.",
    core: [
      "All main strengthening mechanisms work by making dislocation motion harder.",
      "Cold work increases dislocation density, raising strength and hardness while reducing ductility.",
      "Grain refinement strengthens by Hall-Petch: grain boundaries interrupt slip and shorten dislocation motion distance.",
      "Solid solution strengthening comes from lattice strain fields around solute atoms.",
      "Precipitation/age hardening uses fine particles that dislocations cut or bypass; overaging coarsens particles and lowers strength.",
      "Recovery, recrystallization and grain growth progressively reduce stored cold-work energy and change strength/ductility."
    ],
    oral: [
      "For any strengthening route, identify the obstacle to dislocations and the processing step that creates it.",
      "Always mention the tradeoff: strength usually rises at the cost of ductility or toughness.",
      "For precipitation hardening, say solution treatment, quench, age, then possible overaging."
    ],
    traps: [
      "Bigger precipitates are not always stronger; fine coherent particles are often best before overaging.",
      "Annealing after cold work can remove the strengthening you just created.",
      "Hall-Petch is grain-size strengthening, not precipitation hardening."
    ]
  },
  {
    moduleId: "lecture-6-fe-c",
    focus: "Fe-Fe3C equilibrium diagram, phases, invariant reactions and lever-rule style reasoning.",
    core: [
      "Key phases are ferrite alpha, austenite gamma, cementite Fe3C, liquid and mixtures such as pearlite and ledeburite.",
      "The eutectoid reaction is about 0.76 wt% C at about 727 C: austenite transforms to ferrite plus cementite, seen as pearlite.",
      "Hypoeutectoid steels form proeutectoid ferrite plus pearlite; hypereutectoid steels form proeutectoid cementite plus pearlite.",
      "A1 is the eutectoid temperature; A3 bounds austenite plus ferrite on the low-carbon side; Acm bounds austenite plus cementite on the high-carbon side.",
      "The lever rule estimates phase or microconstituent fractions by opposite tie-line lengths.",
      "Carbon content of a phase is read from the phase boundary at that temperature, not from the overall alloy composition unless the alloy is single phase."
    ],
    oral: [
      "First identify alloy carbon content, then locate the temperature region, then name phases and microconstituents.",
      "Say clearly whether you are calculating phase fraction or microconstituent fraction.",
      "For pearlite, say it is not a phase; it is a ferrite plus cementite lamellar microconstituent."
    ],
    traps: [
      "Do not answer 6.67% C unless the question is about cementite composition.",
      "Do not use A3 on the hypereutectoid side; use Acm there.",
      "At eutectoid composition the final slow-cooled product is pearlite, not pure ferrite."
    ]
  },
  {
    moduleId: "lecture-7-steel-designation",
    focus: "How steel names encode carbon, alloying and standard families in EN and AISI notation.",
    core: [
      "AISI/SAE plain-carbon and low-alloy steels use digit families; the last two digits usually indicate approximate carbon in hundredths of a percent.",
      "Examples: 1040 is roughly 0.40% C plain carbon steel; 4140 is a Cr-Mo steel with roughly 0.40% C.",
      "EN symbolic names distinguish non-alloy quality steels, alloy steels and high-alloy steels using prefixes such as C, X and element symbols.",
      "In high-alloy EN names, X indicates high alloy content and numbers/elements encode carbon and alloying elements.",
      "Steel designation is not a full recipe: heat treatment, cleanliness and processing still determine final properties.",
      "Alloying elements are chosen for hardenability, strength, corrosion resistance, deoxidation, grain refinement or carbide formation."
    ],
    oral: [
      "When given a steel code, decode carbon first, then the alloy family, then expected behaviour.",
      "For EN names, say whether it is non-alloy, low-alloy or high-alloy before interpreting elements.",
      "Connect designations to use: low carbon for forming/welding, medium carbon for heat treatment, high carbon for wear/hardness."
    ],
    traps: [
      "Do not read every number in AISI as percent alloying.",
      "Do not assume two steels with similar carbon have the same hardenability.",
      "Do not call stainless stainless because of nickel; chromium passivation is the core reason."
    ]
  },
  {
    moduleId: "lecture-8-steel-production",
    focus: "Industrial steelmaking route, refining and how processing controls cleanliness and final product.",
    core: [
      "Blast furnace produces hot metal/pig iron from iron ore, coke and flux; BOF converts hot metal into steel by oxidizing excess carbon and impurities.",
      "EAF mainly melts scrap or direct-reduced iron and is flexible for alloy and recycling routes.",
      "Secondary metallurgy adjusts composition, temperature, gases and inclusions before casting.",
      "Deoxidation controls oxygen and inclusion type; elements such as Al, Si and Mn are common deoxidizers depending on the route.",
      "Continuous casting solidifies steel into slabs, blooms or billets; rolling and controlled cooling then shape microstructure.",
      "TMCP combines deformation and cooling to refine grains and improve strength/toughness without relying only on alloy content."
    ],
    oral: [
      "For production-route questions, answer in sequence: ironmaking, steelmaking, refining, casting, rolling/heat treatment.",
      "For defects, connect the process stage to inclusions, segregation, porosity, cracks or grain size.",
      "For weldability, mention carbon equivalent and alloying/hardenability rather than only strength."
    ],
    traps: [
      "BOF and EAF are steelmaking routes, not heat treatments.",
      "Reducing iron ore and refining molten steel are different stages.",
      "Cleaner steel is not only lower carbon; gases and inclusions matter."
    ]
  },
  {
    moduleId: "lecture-9-heat-treatment",
    focus: "TTT/CCT reading, annealing, quenching, tempering, hardenability and transformation products.",
    core: [
      "Heat treatment changes microstructure by controlled heating, holding and cooling; composition sets what transformations are possible.",
      "Annealing softens and improves ductility; normalizing refines structure; quenching aims for martensite; tempering reduces brittleness and forms tempered martensite.",
      "TTT diagrams show isothermal transformation after rapid cooling to a chosen temperature; CCT diagrams show continuous cooling paths.",
      "Pearlite forms at higher transformation temperatures, bainite at intermediate temperatures, martensite below Ms by diffusionless transformation.",
      "Hardenability is ability to form martensite through section thickness; it is not the same as maximum hardness.",
      "Residual austenite remains when not all austenite transforms before the final temperature or because Ms/Mf are low."
    ],
    oral: [
      "For diagram paths, keep a balance of remaining austenite after each transformation step.",
      "Say martensite amount depends on temperature drop below Ms, not time at a constant temperature.",
      "For alloying effects, say many alloying elements shift TTT/CCT curves to longer times and increase hardenability."
    ],
    traps: [
      "Do not create bainite or pearlite unless the path enters the relevant transformation region.",
      "Do not convert already transformed pearlite/ferrite/bainite into martensite; only remaining austenite can transform.",
      "Tempering requires martensite first, then reheating/holding below A1."
    ]
  },
  {
    moduleId: "lecture-10-surface-treatment",
    focus: "Surface hardening and thermochemical treatments: hard case with a useful core.",
    core: [
      "Surface treatment aims to improve wear, fatigue or corrosion at the surface while keeping a tougher core.",
      "Induction, flame and laser hardening transform only the surface by rapid heating and quenching; composition is mostly unchanged.",
      "Carburizing adds carbon to low-carbon steel surface, then quenching creates a hard martensitic case.",
      "Nitriding introduces nitrogen at lower temperature and can form hard nitrides with less distortion than carburizing.",
      "Carbonitriding, boriding and other thermochemical routes depend on diffusing species, temperature, time and alloy chemistry.",
      "Important outputs are case depth, surface hardness, residual compressive stress, distortion and core toughness."
    ],
    oral: [
      "First say whether the process changes composition or only transforms existing composition.",
      "For process choice, match the component need: wear, fatigue, distortion limit, case depth and steel chemistry.",
      "For case hardening, explain why low-carbon core plus high-carbon/nitrogen surface is useful."
    ],
    traps: [
      "Induction hardening needs enough carbon to harden; it does not magically add carbon.",
      "Nitriding is not simply quenching; nitride formation and diffusion are key.",
      "A harder case is not automatically better if it causes cracking, distortion or poor core toughness."
    ]
  },
  {
    moduleId: "lecture-11-corrosion",
    focus: "Electrochemical corrosion mechanisms, galvanic effects, passivity and protection methods.",
    core: [
      "Corrosion is electrochemical: anodic metal dissolution is balanced by a cathodic reduction reaction.",
      "In a galvanic couple the more active metal is the anode and corrodes preferentially; zinc protects iron by acting as sacrificial anode.",
      "Passivation is formation of a protective surface film that lowers active corrosion if the film remains stable.",
      "Common forms include uniform corrosion, galvanic corrosion, pitting, crevice corrosion, intergranular corrosion and stress corrosion cracking.",
      "Pitting and crevice corrosion are dangerous because local chemistry breaks passivity and attack becomes localized.",
      "Protection methods include coatings, cathodic protection, inhibitors, material selection, design against crevices and control of environment."
    ],
    oral: [
      "For any corrosion cell, identify anode, cathode, electrolyte and electron/ion paths.",
      "For stainless or aluminium, explain passivity and what breaks the passive film.",
      "For prevention, choose a method that attacks the actual mechanism, not just a generic coating."
    ],
    traps: [
      "The anode is where oxidation/corrosion occurs; do not label the nobler metal as anode in a galvanic pair.",
      "Corrosion resistance is not just hardness or strength.",
      "Localized corrosion can be worse than uniform corrosion even if total mass loss is small."
    ]
  },
  {
    moduleId: "lecture-12-stainless",
    focus: "Why stainless steels are stainless and how stainless families differ.",
    core: [
      "Stainless behaviour comes mainly from sufficient chromium, about 11.5% in the course notes, forming a chromium oxide passive film.",
      "Austenitic stainless steels are typically Cr-Ni, non-magnetic in annealed state, very formable and corrosion resistant.",
      "Ferritic stainless steels are Cr-rich BCC, generally cheaper and less tough than austenitic grades but resistant in many environments.",
      "Martensitic stainless steels can be hardened but usually sacrifice corrosion resistance compared with austenitic/ferritic grades.",
      "Duplex stainless combines ferrite and austenite for strength and chloride resistance; Mo and N improve localized corrosion resistance.",
      "Sensitization occurs when chromium carbides form at grain boundaries, depleting nearby Cr and enabling intergranular corrosion."
    ],
    oral: [
      "Start with passivation: chromium oxide film protects the steel if it stays continuous and stable.",
      "Then classify the family by structure and alloying: ferritic, austenitic, martensitic, duplex or precipitation hardening.",
      "For failures, mention chlorides, sensitization, pitting/crevice corrosion and stress corrosion where relevant."
    ],
    traps: [
      "Nickel stabilizes austenite; it is not the primary passive film former.",
      "More carbon can help hardness but can damage corrosion resistance through carbide precipitation.",
      "Stainless does not mean corrosion-proof in every environment."
    ]
  },
  {
    moduleId: "lecture-13-cast-irons",
    focus: "Cast iron families, graphite morphology and why shape of carbon controls properties.",
    core: [
      "Cast irons are Fe-C-Si alloys with carbon high enough for excellent castability and graphite/carbide microstructures.",
      "Grey cast iron contains graphite flakes; it machines well and damps vibration but is weak in tension because flakes act as cracks.",
      "White cast iron contains cementite/carbides; it is hard and wear resistant but brittle.",
      "Ductile/nodular cast iron uses Mg treatment to form graphite nodules, improving toughness and strength.",
      "Malleable cast iron comes from heat treating white iron to form temper carbon aggregates.",
      "Silicon promotes graphitization, while cooling rate and inoculation control graphite and matrix."
    ],
    oral: [
      "For property questions, identify graphite shape first, then matrix, then mechanical consequence.",
      "For processing, say how Mg treatment, inoculation or cooling rate shifts graphite morphology.",
      "For applications, match damping/castability/wear/toughness to grey, white, ductile or malleable iron."
    ],
    traps: [
      "Cast iron is not just high-carbon steel; graphite morphology dominates properties.",
      "Cementite-rich white iron is hard but not ductile.",
      "Nodular graphite is why ductile iron is ductile compared with grey iron."
    ]
  },
  {
    moduleId: "lecture-14-aluminum",
    focus: "Aluminium alloy families, precipitation hardening, casting alloys and corrosion behaviour.",
    core: [
      "Aluminium is light, naturally passive by aluminium oxide and very useful where specific strength and corrosion resistance matter.",
      "Wrought alloy series use main alloying families: 1xxx pure Al, 2xxx Al-Cu, 3xxx Al-Mn, 5xxx Al-Mg, 6xxx Al-Mg-Si and 7xxx Al-Zn-Mg.",
      "Non-heat-treatable alloys strengthen mainly by solid solution and cold work; heat-treatable alloys strengthen by precipitation hardening.",
      "Precipitation hardening sequence is solution treatment, quench, natural/artificial ageing, with peak age and overage conditions.",
      "Al-Si casting alloys use silicon for fluidity and castability; modification/refinement improves eutectic shape and properties.",
      "Aluminium corrosion resistance depends on passive oxide stability; galvanic coupling and chloride environments can still be problems."
    ],
    oral: [
      "For any aluminium alloy, first say wrought/cast and heat-treatable/non-heat-treatable.",
      "For 2xxx/6xxx/7xxx, connect alloying to precipitation strengthening and typical property tradeoffs.",
      "For casting questions, mention fluidity, shrinkage, eutectic silicon morphology and heat treatment where relevant."
    ],
    traps: [
      "Aluminium is not strong just because it is light; strengthening route matters.",
      "Age hardening needs a supersaturated solid solution from quenching first.",
      "Natural oxide helps corrosion resistance but does not prevent all galvanic or pitting corrosion."
    ]
  }
];

const state = {
  allQuestions: [],
  graphQuestions: [],
  skippedQuestions: [],
  activeQuestions: [],
  contentMap: { decks: [], modules: [] },
  current: null,
  currentDeck: null,
  currentTitle: "Exam bank",
  currentSubtitle: "",
  shuffleQuestions: false,
  oralMode: false,
  summaryModuleId: null,
  correct: 0,
  wrong: 0,
  answered: false,
  seenIds: new Set(),
  recentIds: [],
  reviewIds: new Set(),
  progress: {
    xp: 0,
    streak: 0,
    bestStreak: 0,
    cards: {}
  }
};

const els = {
  homeScreen: document.querySelector("#homeScreen"),
  quizScreen: document.querySelector("#quizScreen"),
  tutorialScreen: document.querySelector("#tutorialScreen"),
  countdownDays: document.querySelector("#countdownDays"),
  countdownHours: document.querySelector("#countdownHours"),
  countdownMinutes: document.querySelector("#countdownMinutes"),
  homeLevelText: document.querySelector("#homeLevelText"),
  homeXpText: document.querySelector("#homeXpText"),
  allCardCount: document.querySelector("#allCardCount"),
  bankCardCount: document.querySelector("#bankCardCount"),
  dueCardCount: document.querySelector("#dueCardCount"),
  selfCardCount: document.querySelector("#selfCardCount"),
  graphCardCount: document.querySelector("#graphCardCount"),
  oralCardCount: document.querySelector("#oralCardCount"),
  dailyPlanBanner: document.querySelector("#dailyPlanBanner"),
  dailyBannerKicker: document.querySelector("#dailyBannerKicker"),
  dailyBannerTitle: document.querySelector("#dailyBannerTitle"),
  dailyBannerText: document.querySelector("#dailyBannerText"),
  dailyBannerButton: document.querySelector("#dailyBannerButton"),
  topicGrid: document.querySelector("#topicGrid"),
  lectureGrid: document.querySelector("#lectureGrid"),
  summaryTabs: document.querySelector("#summaryTabs"),
  summaryCard: document.querySelector("#summaryCard"),
  selfGrid: document.querySelector("#selfGrid"),
  lectureFocusButton: document.querySelector("#lectureFocusButton"),
  oralModeButton: document.querySelector("#oralModeButton"),
  lecturePicker: document.querySelector("#lecturePicker"),
  tttTutorialButton: document.querySelector("#tttTutorialButton"),
  tutorialHomeButton: document.querySelector("#tutorialHomeButton"),
  tutorialStepButtons: document.querySelectorAll("[data-ttt-step]"),
  tutorialKicker: document.querySelector("#tutorialKicker"),
  tutorialStepTitle: document.querySelector("#tutorialStepTitle"),
  tutorialStepText: document.querySelector("#tutorialStepText"),
  tutorialStepList: document.querySelector("#tutorialStepList"),
  tutorialProfessorRule: document.querySelector("#tutorialProfessorRule"),
  tutorialPathLine: document.querySelector("#tutorialPathLine"),
  tutorialPathGhost: document.querySelector("#tutorialPathGhost"),
  tutorialPathPoint: document.querySelector("#tutorialPathPoint"),
  tutorialPathLabel: document.querySelector("#tutorialPathLabel"),
  tutorialPathBadge: document.querySelector("#tutorialPathBadge"),
  tutorialLegendFocus: document.querySelector("#tutorialLegendFocus"),
  backHomeButton: document.querySelector("#backHomeButton"),
  activePath: document.querySelector("#activePath"),
  quizTitle: document.querySelector("#quizTitle"),
  questionProgress: document.querySelector("#questionProgress"),
  correctCount: document.querySelector("#correctCount"),
  wrongCount: document.querySelector("#wrongCount"),
  reviewCount: document.querySelector("#reviewCount"),
  levelText: document.querySelector("#levelText"),
  xpText: document.querySelector("#xpText"),
  xpMeter: document.querySelector("#xpMeter"),
  coachTip: document.querySelector("#coachTip"),
  sectionTitle: document.querySelector("#sectionTitle"),
  sectionGoal: document.querySelector("#sectionGoal"),
  sectionMeter: document.querySelector("#sectionMeter"),
  masteryText: document.querySelector("#masteryText"),
  questionSection: document.querySelector("#questionSection"),
  questionMastery: document.querySelector("#questionMastery"),
  questionSource: document.querySelector("#questionSource"),
  questionText: document.querySelector("#questionText"),
  questionVisual: document.querySelector("#questionVisual"),
  options: document.querySelector("#options"),
  feedback: document.querySelector("#feedback"),
  resultLine: document.querySelector("#resultLine"),
  explanation: document.querySelector("#explanation"),
  relevantTheory: document.querySelector("#relevantTheory"),
  nextButton: document.querySelector("#nextButton"),
  restartButton: document.querySelector("#restartButton")
};

function getExamDate() {
  const now = new Date();
  let examDate = new Date(now.getFullYear(), 5, 20, 11, 0, 0);
  if (now > examDate) examDate = new Date(now.getFullYear() + 1, 5, 20, 11, 0, 0);
  return examDate;
}

function updateCountdown() {
  const remaining = Math.max(0, getExamDate() - new Date());
  els.countdownDays.textContent = Math.floor(remaining / 86400000);
  els.countdownHours.textContent = Math.floor((remaining % 86400000) / 3600000);
  els.countdownMinutes.textContent = Math.floor((remaining % 3600000) / 60000);
}

function classifyQuestion(question) {
  const haystack = `${question.question} ${question.relevantTheory} ${question.source}`;
  const match = SECTION_RULES.find(([, pattern]) => pattern.test(haystack));
  return match ? match[0] : "Mixed Review";
}

function decorateQuestions(questions) {
  return questions.map((question) => ({
    ...question,
    deck: question.deck || "question-bank",
    moduleId: question.moduleId || null,
    section: question.section || classifyQuestion(question)
  }));
}

function isStudyReady(question) {
  return question.diagramRequired !== true;
}

function loadJson(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback));
  } catch {
    return fallback;
  }
}

function loadProgress() {
  const saved = loadJson(STORAGE_KEYS.progress, state.progress);
  state.progress = {
    xp: Number(saved.xp) || 0,
    streak: Number(saved.streak) || 0,
    bestStreak: Number(saved.bestStreak) || 0,
    cards: saved.cards && typeof saved.cards === "object" ? saved.cards : {}
  };

  const oldMissed = loadJson(STORAGE_KEYS.missed, []);
  state.reviewIds = new Set([
    ...oldMissed.filter(Number.isInteger),
    ...Object.entries(state.progress.cards)
      .filter(([, card]) => card.wrong > 0 && !card.mastered)
      .map(([id]) => Number(id))
  ]);
}

function saveProgress() {
  localStorage.setItem(STORAGE_KEYS.progress, JSON.stringify(state.progress));
  localStorage.setItem(STORAGE_KEYS.missed, JSON.stringify([...state.reviewIds]));
}

function cardProgress(id) {
  const key = String(id);
  if (!state.progress.cards[key]) {
    state.progress.cards[key] = {
      attempts: 0,
      correct: 0,
      wrong: 0,
      streak: 0,
      mastered: false,
      lastSeen: 0
    };
  }
  return state.progress.cards[key];
}

function deckQuestions(deck) {
  if (deck === GRAPH_DECK) return state.graphQuestions;
  if (deck === "all") return state.allQuestions;
  return state.allQuestions.filter((question) => question.deck === deck);
}

function formatSource(source) {
  return String(source || "")
    .split(";")
    .map((part) => {
      const trimmed = part.trim();
      const slash = trimmed.lastIndexOf("/");
      return slash >= 0 ? trimmed.slice(slash + 1) : trimmed;
    })
    .join("; ");
}

function shuffledOptionEntries(options) {
  const entries = Object.entries(options);
  for (let index = entries.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [entries[index], entries[swapIndex]] = [entries[swapIndex], entries[index]];
  }
  return entries;
}

function shuffledQuestions(questions) {
  const shuffled = [...questions];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }
  return shuffled;
}

function topicQuestions(topic) {
  return state.allQuestions.filter((question) => question.section === topic);
}

function moduleQuestions(moduleId) {
  return state.allQuestions.filter((question) => question.moduleId === moduleId);
}

function oralQuestionPool() {
  return [...state.allQuestions, ...state.graphQuestions];
}

function masteredIn(questions) {
  return questions.filter((question) => cardProgress(question.id).mastered).length;
}

function lectureModules() {
  return state.contentMap.modules.filter((module) => module.deck === "slides");
}

function startOfDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function lectureDueDate(index) {
  const breakDays = Math.floor((index + 1) / LECTURE_BREAK_INTERVAL);
  const finalBreakDays = index >= LECTURE_FINAL_BREAK_START_INDEX ? 1 : 0;
  return new Date(LECTURE_PLAN_START.getTime() + (index + breakDays + finalBreakDays) * DAY_MS);
}

function lectureScheduleStatus(dueDate, complete) {
  if (complete) return { text: "Done", state: "done" };
  const today = startOfDay(new Date());
  const dueDay = startOfDay(dueDate);
  if (today.getTime() > dueDay.getTime()) return { text: "You're behind", state: "behind" };
  if (today.getTime() === dueDay.getTime()) return { text: "Due today", state: "today" };
  return { text: "Upcoming", state: "upcoming" };
}

function addLectureSchedule(card, dueDate, complete) {
  const status = lectureScheduleStatus(dueDate, complete);
  const schedule = document.createElement("div");
  schedule.className = `lecture-schedule ${status.state}`;

  const due = document.createElement("span");
  due.textContent = `Due ${DATE_FORMATTER.format(dueDate)}`;

  const badge = document.createElement("strong");
  badge.textContent = status.text;

  schedule.append(due, badge);
  card.append(schedule);
}

function lecturePlanItem(lecture, index) {
  const questions = moduleQuestions(lecture.id);
  const mastered = masteredIn(questions);
  return {
    lecture,
    questions,
    mastered,
    complete: questions.length > 0 && mastered === questions.length,
    dueDate: lectureDueDate(index)
  };
}

function shortLectureTitle(title) {
  const match = String(title).match(/Lecture\s+\d+/i);
  return match ? match[0] : "lecture";
}

function startLectureSession(item, subtitle = "Lecture practice") {
  startSession({
    title: item.lecture.title,
    subtitle,
    questions: item.questions,
    emptyDeck: {
      deck: "slides",
      moduleId: item.lecture.id,
      source: item.lecture.source
    }
  });
}

function startLectureOralSession(item) {
  startSession({
    title: `Oral: ${item.lecture.title}`,
    subtitle: "Oral exam mode",
    questions: item.questions,
    deck: "slides",
    oralMode: true,
    emptyDeck: {
      deck: "slides",
      moduleId: item.lecture.id,
      source: item.lecture.source
    }
  });
}

function startGlobalOralMode() {
  startSession({
    title: "Oral exam mode",
    subtitle: "Fast theory pass",
    questions: oralQuestionPool(),
    deck: "oral",
    oralMode: true,
    shuffleQuestions: false,
    emptyDeck: { deck: "oral", moduleId: null }
  });
}

function renderDailyPlanBanner() {
  const today = startOfDay(new Date()).getTime();
  const dueItems = lectureModules()
    .map((lecture, index) => lecturePlanItem(lecture, index))
    .filter((item) => item.questions.length && !item.complete && startOfDay(item.dueDate).getTime() <= today);
  const target = dueItems[0];

  if (!target) {
    els.dailyPlanBanner.hidden = true;
    return;
  }

  const targetDay = startOfDay(target.dueDate).getTime();
  const isBehind = today > targetDay;
  const remaining = target.questions.length - target.mastered;
  els.dailyPlanBanner.hidden = false;
  els.dailyPlanBanner.classList.toggle("is-behind", isBehind);
  els.dailyBannerKicker.textContent = isBehind
    ? `${dueItems.length} overdue ${dueItems.length === 1 ? "lecture" : "lectures"}`
    : "Today's target";
  els.dailyBannerTitle.textContent = isBehind
    ? "Yo, you gotta catch up on this."
    : "Yo, today's lecture is still waiting.";
  els.dailyBannerText.textContent = `${target.lecture.title}: ${target.mastered}/${target.questions.length} locked in, ${remaining} to go. Due ${DATE_FORMATTER.format(target.dueDate)}.`;
  els.dailyBannerButton.textContent = `Start ${shortLectureTitle(target.lecture.title)}`;
  els.dailyBannerButton.onclick = () => startLectureSession(target, isBehind ? "Catch-up lecture" : "Today's lecture");
}

function updateHome() {
  const level = Math.floor(state.progress.xp / XP_PER_LEVEL) + 1;
  els.homeLevelText.textContent = `Level ${level}`;
  els.homeXpText.textContent = `${state.progress.xp} XP`;
  els.allCardCount.textContent = `${state.allQuestions.length} cards`;
  els.bankCardCount.textContent = `${deckQuestions("question-bank").length} cards`;
  els.dueCardCount.textContent = `${state.reviewIds.size} cards`;
  els.selfCardCount.textContent = `${deckQuestions("self-assessment").length} cards`;
  els.graphCardCount.textContent = `${deckQuestions(GRAPH_DECK).length} cards`;
  els.oralCardCount.textContent = `${oralQuestionPool().length} cards`;
  renderDailyPlanBanner();
  renderTopics();
  renderLectures();
  renderLectureSummaries();
  renderSelfAssessments();
}

function sections() {
  return [...new Set(state.allQuestions.map((question) => question.section))];
}

function renderTopics() {
  els.topicGrid.replaceChildren();
  sections().forEach((section) => {
    const questions = topicQuestions(section);
    const card = choiceCard(section, `${masteredIn(questions)}/${questions.length} locked in`, "Target this area.");
    card.addEventListener("click", () => startSession({
      title: section,
      subtitle: "Topic practice",
      questions
    }));
    els.topicGrid.append(card);
  });
}

function renderLectures() {
  els.lectureGrid.replaceChildren();
  lectureModules().forEach((lecture, index) => {
    const item = lecturePlanItem(lecture, index);
    const countText = item.questions.length
      ? `${item.mastered}/${item.questions.length} locked in`
      : "0 cards";
    const detailText = item.questions.length
      ? `${item.questions.length} cards total`
      : "Waiting for cards.";
    const card = choiceCard(lecture.title, countText, detailText);
    if (!item.questions.length) card.classList.add("empty");
    addLectureSchedule(card, item.dueDate, item.complete);
    card.addEventListener("click", () => startLectureSession(item));
    els.lectureGrid.append(card);
  });
}

function summaryForLecture(moduleId) {
  return LECTURE_SUMMARIES.find((summary) => summary.moduleId === moduleId);
}

function appendSummaryList(parent, title, items) {
  const block = document.createElement("section");
  block.className = "summary-block";
  const heading = document.createElement("h4");
  heading.textContent = title;
  const list = document.createElement("ul");
  items.forEach((text) => {
    const item = document.createElement("li");
    item.textContent = text;
    list.append(item);
  });
  block.append(heading, list);
  parent.append(block);
}

function renderLectureSummaryCard(lecture, index) {
  const item = lecturePlanItem(lecture, index);
  const summary = summaryForLecture(lecture.id);
  els.summaryCard.replaceChildren();

  if (!summary) {
    const missing = document.createElement("p");
    missing.textContent = "Summary not available yet.";
    els.summaryCard.append(missing);
    return;
  }

  const kicker = document.createElement("span");
  kicker.className = "kicker";
  kicker.textContent = `${item.mastered}/${item.questions.length} locked in`;

  const title = document.createElement("h3");
  title.textContent = lecture.title;

  const focus = document.createElement("p");
  focus.textContent = summary.focus;

  const columns = document.createElement("div");
  columns.className = "summary-columns";
  appendSummaryList(columns, "Core points", summary.core);
  appendSummaryList(columns, "Oral answer moves", summary.oral);
  appendSummaryList(columns, "Watch-outs", summary.traps);

  const actions = document.createElement("div");
  actions.className = "summary-actions";

  const oralButton = document.createElement("button");
  oralButton.type = "button";
  oralButton.textContent = "Oral drill this lecture";
  oralButton.disabled = !item.questions.length;
  oralButton.addEventListener("click", () => startLectureOralSession(item));

  const practiceButton = document.createElement("button");
  practiceButton.type = "button";
  practiceButton.className = "secondary";
  practiceButton.textContent = "Practice cards";
  practiceButton.disabled = !item.questions.length;
  practiceButton.addEventListener("click", () => startLectureSession(item));

  actions.append(oralButton, practiceButton);
  els.summaryCard.append(kicker, title, focus, columns, actions);
}

function renderLectureSummaries() {
  const modules = lectureModules();
  if (!modules.length) return;

  if (!state.summaryModuleId || !modules.some((module) => module.id === state.summaryModuleId)) {
    state.summaryModuleId = modules[0].id;
  }

  els.summaryTabs.replaceChildren();
  modules.forEach((lecture, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "summary-tab";
    button.textContent = `L${index + 1}`;
    button.title = lecture.title;
    const isActive = lecture.id === state.summaryModuleId;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
    button.addEventListener("click", () => {
      state.summaryModuleId = lecture.id;
      renderLectureSummaries();
    });
    els.summaryTabs.append(button);
  });

  const activeIndex = modules.findIndex((module) => module.id === state.summaryModuleId);
  renderLectureSummaryCard(modules[activeIndex] || modules[0], activeIndex >= 0 ? activeIndex : 0);
}

function renderSelfAssessments() {
  els.selfGrid.replaceChildren();
  const modules = state.contentMap.modules.filter((module) => module.deck === "self-assessment");
  modules.forEach((module) => {
    const questions = moduleQuestions(module.id);
    const mastered = masteredIn(questions);
    const card = choiceCard(module.title, questions.length
      ? `${mastered}/${questions.length} locked in`
      : "0 cards", questions.length
      ? `${questions.length} cards total`
      : "Waiting for cards."
    );
    if (!questions.length) card.classList.add("empty");
    card.addEventListener("click", () => startSession({
      title: module.title,
      subtitle: "Self-assessment",
      questions,
      emptyDeck: {
        deck: "self-assessment",
        moduleId: module.id,
        source: module.source
      }
    }));
    els.selfGrid.append(card);
  });
}

function choiceCard(title, count, detail) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "choice-card";
  button.innerHTML = "<strong></strong><span></span><small></small>";
  button.querySelector("strong").textContent = title;
  button.querySelector("span").textContent = count;
  button.querySelector("small").textContent = detail;
  return button;
}

function renderTutorialStep(index) {
  const step = TTT_TUTORIAL_STEPS[index] || TTT_TUTORIAL_STEPS[0];
  els.tutorialScreen.dataset.step = step.id;
  els.tutorialStepButtons.forEach((button) => {
    const isActive = Number(button.dataset.tttStep) === index;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-selected", String(isActive));
  });

  els.tutorialKicker.textContent = step.kicker;
  els.tutorialStepTitle.textContent = step.title;
  els.tutorialStepText.textContent = step.text;
  els.tutorialStepList.replaceChildren();
  step.bullets.forEach((bullet) => {
    const item = document.createElement("li");
    item.textContent = bullet;
    els.tutorialStepList.append(item);
  });
  els.tutorialProfessorRule.textContent = step.rule;
  els.tutorialPathLine.setAttribute("d", step.path);
  els.tutorialPathGhost.setAttribute("d", step.path);
  els.tutorialPathPoint.setAttribute("cx", step.point[0]);
  els.tutorialPathPoint.setAttribute("cy", step.point[1]);
  els.tutorialPathLabel.textContent = step.label[0];
  els.tutorialPathLabel.setAttribute("x", step.label[1]);
  els.tutorialPathLabel.setAttribute("y", step.label[2]);
  els.tutorialPathBadge.textContent = step.badge;
  els.tutorialLegendFocus.textContent = step.focus;
}

function showTutorial(index = 0) {
  els.homeScreen.hidden = true;
  els.quizScreen.hidden = true;
  els.tutorialScreen.hidden = false;
  renderTutorialStep(index);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function startSession({ title, subtitle, questions, emptyDeck = null, deck = null, shuffleQuestions = false, oralMode = false }) {
  state.currentTitle = title;
  state.currentSubtitle = subtitle;
  state.currentDeck = deck;
  state.shuffleQuestions = shuffleQuestions;
  state.oralMode = oralMode;
  state.activeQuestions = shuffleQuestions ? shuffledQuestions(questions) : questions;
  state.correct = 0;
  state.wrong = 0;
  state.seenIds.clear();
  state.recentIds = [];
  state.current = null;
  els.homeScreen.hidden = true;
  els.tutorialScreen.hidden = true;
  els.quizScreen.hidden = false;
  els.quizScreen.classList.toggle("oral-mode", oralMode);
  els.activePath.textContent = subtitle;
  els.quizTitle.textContent = title;
  els.nextButton.textContent = oralMode ? "Next theory card" : "Next";

  if (!questions.length) {
    renderEmptyDeck(emptyDeck);
    return;
  }

  renderQuestion();
}

function scoreCandidate(question) {
  const progress = cardProgress(question.id);
  let score = Math.random();
  if (state.reviewIds.has(question.id)) score += 35;
  if (!progress.attempts) score += 26;
  if (progress.wrong > progress.correct) score += 18;
  if (!progress.mastered) score += 10;
  score -= progress.streak * 8;
  return score;
}

function chooseNextQuestion() {
  if (state.oralMode) {
    return state.activeQuestions.find((question) => !state.seenIds.has(question.id)) || null;
  }

  const recent = new Set(state.recentIds.slice(-RECENT_CARD_GAP));
  const spaced = state.activeQuestions.filter((question) => !recent.has(question.id));
  const poolBase = spaced.length ? spaced : state.activeQuestions;
  const unseen = poolBase.filter((question) => !state.seenIds.has(question.id));
  const pool = unseen.length ? unseen : poolBase;
  if (state.currentDeck === "question-bank") return chooseWeightedRandomQuestion(pool);
  return [...pool].sort((a, b) => scoreCandidate(b) - scoreCandidate(a))[0] || null;
}

function chooseWeightedRandomQuestion(pool) {
  const scored = pool.map((question) => ({
    question,
    weight: Math.max(1, scoreCandidate(question))
  }));
  const total = scored.reduce((sum, item) => sum + item.weight, 0);
  let pick = Math.random() * total;

  for (const item of scored) {
    pick -= item.weight;
    if (pick <= 0) return item.question;
  }

  return scored[scored.length - 1]?.question || null;
}

function svgElement(name, attrs = {}) {
  const element = document.createElementNS("http://www.w3.org/2000/svg", name);
  Object.entries(attrs).forEach(([key, value]) => element.setAttribute(key, value));
  return element;
}

function addSvgText(svg, text, x, y, className, anchor = "middle") {
  const label = svgElement("text", { x, y, class: className, "text-anchor": anchor });
  label.textContent = text;
  svg.append(label);
  return label;
}

function graphTicks(range, count = 4) {
  const [min, max] = range;
  const step = (max - min) / count;
  return Array.from({ length: count + 1 }, (_, index) => ({
    value: min + step * index,
    label: Number.isInteger(min + step * index)
      ? String(min + step * index)
      : (min + step * index).toFixed(2).replace(/0+$/, "").replace(/\.$/, "")
  }));
}

function graphPointMapper(visual, width, height, margin) {
  const [xMin, xMax] = visual.xRange;
  const [yMin, yMax] = visual.yRange;
  const plotWidth = width - margin.left - margin.right;
  const plotHeight = height - margin.top - margin.bottom;

  return {
    x: (value) => margin.left + ((value - xMin) / (xMax - xMin)) * plotWidth,
    y: (value) => margin.top + (1 - (value - yMin) / (yMax - yMin)) * plotHeight
  };
}

function renderQuestionVisual(visual) {
  els.questionVisual.replaceChildren();

  if (!visual) {
    els.questionVisual.hidden = true;
    return;
  }

  if (visual.type === "image") {
    const figure = document.createElement("figure");
    const caption = document.createElement("figcaption");
    const image = document.createElement("img");
    image.src = visual.src;
    image.alt = visual.alt || visual.title || "Question diagram";
    image.loading = "lazy";
    caption.textContent = visual.title || "Question diagram";
    figure.append(caption, image);
    els.questionVisual.append(figure);
    els.questionVisual.hidden = false;
    return;
  }

  if (visual.type !== "svg-graph") {
    els.questionVisual.hidden = true;
    return;
  }

  const width = 680;
  const height = 360;
  const margin = { top: 34, right: 24, bottom: 56, left: 68 };
  const map = graphPointMapper(visual, width, height, margin);
  const figure = document.createElement("figure");
  const caption = document.createElement("figcaption");
  const svg = svgElement("svg", {
    viewBox: `0 0 ${width} ${height}`,
    role: "img",
    "aria-label": visual.title || "Question graph"
  });

  caption.textContent = visual.title || "Question graph";
  figure.append(caption, svg);

  svg.append(svgElement("rect", {
    x: margin.left,
    y: margin.top,
    width: width - margin.left - margin.right,
    height: height - margin.top - margin.bottom,
    class: "graph-plot"
  }));

  const xAxisY = height - margin.bottom;
  const yAxisX = margin.left;
  svg.append(svgElement("line", { x1: yAxisX, y1: margin.top, x2: yAxisX, y2: xAxisY, class: "graph-axis" }));
  svg.append(svgElement("line", { x1: yAxisX, y1: xAxisY, x2: width - margin.right, y2: xAxisY, class: "graph-axis" }));

  (visual.xTicks || graphTicks(visual.xRange)).forEach((tick) => {
    const x = map.x(tick.value);
    svg.append(svgElement("line", { x1: x, y1: xAxisY, x2: x, y2: xAxisY + 5, class: "graph-axis" }));
    addSvgText(svg, tick.label, x, xAxisY + 20, "graph-tick");
  });

  (visual.yTicks || graphTicks(visual.yRange)).forEach((tick) => {
    const y = map.y(tick.value);
    svg.append(svgElement("line", { x1: yAxisX - 5, y1: y, x2: yAxisX, y2: y, class: "graph-axis" }));
    addSvgText(svg, tick.label, yAxisX - 10, y + 4, "graph-tick", "end");
  });

  (visual.series || []).forEach((series) => {
    if (series.kind !== "polyline") return;
    const points = series.points.map(([x, y]) => `${map.x(x)},${map.y(y)}`).join(" ");
    svg.append(svgElement("polyline", { points, class: `graph-line ${series.className || ""}`.trim() }));
  });

  (visual.markers || []).forEach((marker) => {
    const x = map.x(marker.x);
    const y = map.y(marker.y);
    svg.append(svgElement("circle", { cx: x, cy: y, r: marker.r ?? 5, class: `graph-marker ${marker.className || ""}`.trim() }));
    addSvgText(svg, marker.label, x + (marker.dx ?? 12), y + (marker.dy ?? -10), "graph-marker-label", marker.anchor || "start");
  });

  (visual.labels || []).forEach((label) => {
    addSvgText(svg, label.text, map.x(label.x), map.y(label.y), `graph-label ${label.className || ""}`.trim(), label.anchor || "middle");
  });

  addSvgText(svg, visual.xLabel || "x", width / 2, height - 14, "graph-axis-label");
  const yLabel = addSvgText(svg, visual.yLabel || "y", 16, height / 2, "graph-axis-label");
  yLabel.setAttribute("transform", `rotate(-90 16 ${height / 2})`);

  els.questionVisual.append(figure);
  els.questionVisual.hidden = false;
}

function courseMastery() {
  if (!state.activeQuestions.length) return 0;
  return Math.round((masteredIn(state.activeQuestions) / state.activeQuestions.length) * 100);
}

function masteryLabel(question) {
  const progress = cardProgress(question.id);
  if (progress.mastered) return "Locked in";
  if (state.reviewIds.has(question.id)) return "Coming back";
  if (!progress.attempts) return "New";
  if (progress.streak === 1) return "Almost";
  return "Learning";
}

function updateStats() {
  const answered = state.oralMode ? state.seenIds.size : state.correct + state.wrong;
  const total = state.activeQuestions.length;
  const accuracy = answered ? Math.round((state.correct / answered) * 100) : 0;
  els.questionProgress.textContent = `${answered}/${total}`;
  els.correctCount.textContent = state.oralMode ? "-" : state.correct;
  els.wrongCount.textContent = state.oralMode ? "-" : state.wrong;
  els.reviewCount.textContent = state.activeQuestions.filter((question) => state.reviewIds.has(question.id)).length;

  const level = Math.floor(state.progress.xp / XP_PER_LEVEL) + 1;
  const levelXp = state.progress.xp % XP_PER_LEVEL;
  els.levelText.textContent = `Level ${level}`;
  els.xpText.textContent = `${state.progress.xp} XP`;
  els.xpMeter.style.width = `${Math.round((levelXp / XP_PER_LEVEL) * 100)}%`;

  const roundProgress = total ? Math.min(100, Math.round((answered / total) * 100)) : 0;
  els.sectionTitle.textContent = state.oralMode ? "Oral pass" : "Round progress";
  els.sectionGoal.textContent = state.oralMode ? `${roundProgress}% seen` : `${roundProgress}% done`;
  els.sectionMeter.style.width = `${roundProgress}%`;
  const mastered = masteredIn(state.activeQuestions);
  els.masteryText.textContent = state.oralMode
    ? `Theory pass: ${answered}/${total} cards viewed. Mastery stats stay unchanged.`
    : `This set: ${mastered}/${total} locked in. Accuracy: ${accuracy}%`;
  els.coachTip.textContent = coachTip();
}

function coachTip() {
  if (state.oralMode) return "Read the question, say the answer aloud, then use the explanation as the mini oral-exam answer.";
  const answered = state.correct + state.wrong;
  if (state.wrong > 0) return "Missed cards will return soon, after a few other cards give your memory room to work.";
  if (!answered) return "Choose an answer first. The explanation is the mini-lecture.";
  if (state.progress.streak >= 5) return `Streak ${state.progress.streak}. Keep it rolling for bonus XP.`;
  return "Nice. A card locks in after two correct answers on separate appearances.";
}

function renderQuestion() {
  state.current = chooseNextQuestion();
  state.answered = false;

  if (!state.current) {
    renderEmptyDeck(null);
    return;
  }

  updateStats();
  const question = state.current;
  els.questionSource.textContent = formatSource(question.source);
  els.questionSection.textContent = question.section;
  els.questionMastery.textContent = masteryLabel(question);
  els.questionText.textContent = question.question;
  renderQuestionVisual(question.visual);
  els.feedback.hidden = true;
  els.resultLine.className = "result-line";
  els.explanation.textContent = "";
  els.relevantTheory.textContent = "";
  els.nextButton.disabled = true;
  els.options.replaceChildren();

  shuffledOptionEntries(question.options).forEach(([letter, text], index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "option-button";
    button.dataset.option = letter;
    button.innerHTML = `
      <span class="option-letter">${OPTION_MARKERS[index]}</span>
      <span class="option-text"></span>
    `;
    button.querySelector(".option-text").textContent = text;
    button.addEventListener("click", () => answerQuestion(letter));
    els.options.append(button);
  });

  if (state.oralMode) revealOralQuestion(question);
}

function answerQuestion(selected) {
  if (state.answered || !state.current) return;

  const question = state.current;
  const progress = cardProgress(question.id);
  const isCorrect = selected === question.correctAnswer;
  state.answered = true;
  state.seenIds.add(question.id);
  state.recentIds.push(question.id);
  if (state.recentIds.length > RECENT_CARD_GAP * 2) state.recentIds.shift();
  progress.attempts += 1;
  progress.lastSeen = Date.now();

  if (isCorrect) {
    state.correct += 1;
    state.progress.streak += 1;
    state.progress.bestStreak = Math.max(state.progress.bestStreak, state.progress.streak);
    progress.correct += 1;
    progress.streak += 1;
    state.progress.xp += 10 + Math.min(10, state.progress.streak);
    if (progress.streak >= 2) {
      progress.mastered = true;
      state.reviewIds.delete(question.id);
    }
  } else {
    state.wrong += 1;
    state.progress.streak = 0;
    progress.wrong += 1;
    progress.streak = 0;
    progress.mastered = false;
    state.reviewIds.add(question.id);
    state.progress.xp += 2;
  }

  saveProgress();
  paintAnsweredOptions(selected, question.correctAnswer, isCorrect);
  showFeedback(question, isCorrect);
  triggerAnswerEffects(question, isCorrect);
  updateStats();
}

function revealOralQuestion(question) {
  state.answered = true;
  state.seenIds.add(question.id);
  state.recentIds.push(question.id);
  if (state.recentIds.length > RECENT_CARD_GAP * 2) state.recentIds.shift();
  paintOralOptions(question.correctAnswer);
  showOralFeedback(question);
  updateStats();
}

function paintOralOptions(correct) {
  document.querySelectorAll(".option-button").forEach((button) => {
    const option = button.dataset.option;
    button.disabled = true;
    button.querySelector(".option-letter").textContent = option;
    if (option === correct) button.classList.add("correct");
  });
}

function paintAnsweredOptions(selected, correct, isCorrect) {
  document.querySelectorAll(".option-button").forEach((button) => {
    const option = button.dataset.option;
    button.disabled = true;
    button.querySelector(".option-letter").textContent = option;
    if (option === correct) button.classList.add("correct");
    if (option === selected && !isCorrect) button.classList.add("wrong");
  });
}

function showOralFeedback(question) {
  els.resultLine.textContent = `Oral answer: ${question.correctAnswer}.`;
  els.resultLine.className = "result-line oral";
  els.explanation.textContent = question.explanation;
  els.relevantTheory.textContent = question.relevantTheory;
  els.feedback.hidden = false;
  els.nextButton.disabled = false;
}

function showFeedback(question, isCorrect) {
  els.resultLine.textContent = isCorrect
    ? `Correct. Answer ${question.correctAnswer}.`
    : `Wrong. Correct answer: ${question.correctAnswer}.`;
  els.resultLine.classList.add(isCorrect ? "correct" : "wrong");
  els.explanation.textContent = question.explanation;
  els.relevantTheory.textContent = question.relevantTheory;
  els.feedback.hidden = false;
  els.nextButton.disabled = false;
}

function prefersReducedMotion() {
  return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches === true;
}

function isCoolingProductQuestion(question) {
  const haystack = [
    question.question,
    question.explanation,
    question.relevantTheory,
    question.cardType,
    ...(question.trapTags || [])
  ].join(" ").toLowerCase();
  return /cooling[- ]?products?|cooling[- ]?product fractions?|stepped isothermal transformations?/.test(haystack);
}

function isPastExamOrGraphQuestion(question) {
  return question.deck === GRAPH_DECK || question.deck === "question-bank" || question.sourceType === "past-exam";
}

function isEasyMistakeQuestion(question) {
  const tags = (question.trapTags || []).join(" ").toLowerCase();
  const difficulty = String(question.difficulty || "").toLowerCase();
  return difficulty === "easy" || tags.includes("very easy") || (isPastExamOrGraphQuestion(question) && tags.includes("basic"));
}

function triggerAnswerEffects(question, isCorrect) {
  if (prefersReducedMotion()) return;
  if (isCorrect && isCoolingProductQuestion(question)) launchConfetti();
  if (!isCorrect && isEasyMistakeQuestion(question)) launchEasyWrongEffect();
}

function launchConfetti() {
  const overlay = document.createElement("div");
  overlay.className = "answer-effect confetti-effect";
  overlay.setAttribute("aria-hidden", "true");

  for (let index = 0; index < 54; index += 1) {
    const piece = document.createElement("span");
    piece.className = "confetti-piece";
    piece.style.setProperty("--x", `${Math.random() * 100}vw`);
    piece.style.setProperty("--drift", `${Math.random() * 120 - 60}px`);
    piece.style.setProperty("--rot", `${Math.random() * 360}deg`);
    piece.style.setProperty("--duration", `${1.25 + Math.random() * 0.8}s`);
    piece.style.setProperty("--delay", `${Math.random() * 0.18}s`);
    piece.style.setProperty("--color", CONFETTI_COLORS[index % CONFETTI_COLORS.length]);
    overlay.append(piece);
  }

  document.body.append(overlay);
  window.setTimeout(() => overlay.remove(), 2400);
}

function launchEasyWrongEffect() {
  const overlay = document.createElement("div");
  overlay.className = "answer-effect easy-wrong-effect";
  overlay.setAttribute("aria-hidden", "true");

  const mark = document.createElement("div");
  mark.className = "easy-wrong-x";
  mark.textContent = "X";
  overlay.append(mark);

  for (let index = 0; index < 22; index += 1) {
    const drop = document.createElement("span");
    drop.className = "easy-wrong-splatter";
    drop.style.setProperty("--x", `${Math.random() * 78 - 39}vw`);
    drop.style.setProperty("--y", `${Math.random() * 58 - 29}vh`);
    drop.style.setProperty("--s", `${10 + Math.random() * 28}px`);
    drop.style.setProperty("--delay", `${Math.random() * 0.18}s`);
    overlay.append(drop);
  }

  document.body.append(overlay);
  window.setTimeout(() => overlay.remove(), 1600);
}

function renderEmptyDeck(emptyDeck) {
  state.answered = true;
  updateStats();
  const isComplete = !emptyDeck && state.activeQuestions.length > 0 && state.seenIds.size >= state.activeQuestions.length;
  els.questionSource.textContent = emptyDeck?.source ? formatSource(emptyDeck.source) : "Content architecture ready";
  els.questionSection.textContent = state.currentSubtitle || "Study set";
  els.questionMastery.textContent = isComplete ? "Complete" : "No cards yet";
  const isDueReview = state.currentTitle === "Due review";
  els.questionText.textContent = isComplete
    ? `${state.currentTitle} complete.`
    : isDueReview
    ? "No review cards are due right now."
    : `${state.currentTitle} does not have generated cards yet.`;
  els.options.replaceChildren();
  renderQuestionVisual(null);
  els.feedback.hidden = false;
  els.resultLine.className = "result-line";
  els.resultLine.textContent = isComplete
    ? "You reached the end of this set."
    : isDueReview
    ? "Missed cards will appear here automatically after a practice session."
    : "This study set is ready for generated professor-style questions.";
  els.explanation.textContent = isComplete
    ? "Restart this session or go home and choose another lecture, summary or deck."
    : isDueReview
    ? "Use Everything, Exam bank, a topic, or a lecture to keep studying. Any card answered incorrectly is saved here until you answer it correctly twice in a row."
    : emptyDeck
    ? `Future cards should use deck="${emptyDeck.deck}" and moduleId="${emptyDeck.moduleId}". The AI must create questions from the lecture theory; the slides do not contain the questions.`
    : "Future cards should be added to data/questions.json using the shared schema.";
  els.relevantTheory.textContent = isComplete
    ? "Oral mode is for fast recall and explanation practice; normal practice is still what updates spaced review and mastery."
    : "For slide lectures, questions should be based on what the professor would ask after teaching the slide content. Notes are support material only, used to fill in missing explanation.";
  els.nextButton.disabled = true;
}

function goHome() {
  els.quizScreen.hidden = true;
  els.tutorialScreen.hidden = true;
  els.homeScreen.hidden = false;
  els.quizScreen.classList.remove("oral-mode");
  els.nextButton.textContent = "Next";
  state.current = null;
  state.answered = false;
  state.oralMode = false;
  updateHome();
}

async function init() {
  updateCountdown();
  window.setInterval(updateCountdown, 60 * 1000);
  const decoratedQuestions = decorateQuestions(window.TMM_QUESTIONS || []);
  state.skippedQuestions = decoratedQuestions.filter((question) => !isStudyReady(question));
  const readyQuestions = decoratedQuestions.filter(isStudyReady);
  state.graphQuestions = readyQuestions.filter((question) => question.deck === GRAPH_DECK);
  state.allQuestions = readyQuestions.filter((question) => question.deck !== GRAPH_DECK);
  state.contentMap = window.TMM_CONTENT_MAP || { decks: [], modules: [] };
  loadProgress();
  updateHome();
}

document.querySelectorAll("[data-study]").forEach((button) => {
  button.addEventListener("click", () => {
    const study = button.dataset.study;
    if (study === "all") {
      startSession({ title: "Everything", subtitle: "Mixed review", questions: state.allQuestions });
    } else if (study === "due") {
      startSession({
        title: "Due review",
        subtitle: "Spaced review",
        questions: state.allQuestions.filter((question) => state.reviewIds.has(question.id))
      });
    } else {
      const isPastExam = study === "question-bank";
      const isSelfAssessment = study === "self-assessment";
      const isGraph = study === GRAPH_DECK;
      startSession({
        title: button.querySelector("strong").textContent,
        subtitle: isPastExam ? "Past exam bank" : isSelfAssessment ? "Self-test bank" : isGraph ? "Graph practice" : "Study set",
        questions: deckQuestions(study),
        deck: study,
        shuffleQuestions: isPastExam,
        emptyDeck: { deck: study, moduleId: null }
      });
    }
  });
});

els.nextButton.addEventListener("click", renderQuestion);
els.restartButton.addEventListener("click", () => startSession({
  title: state.currentTitle,
  subtitle: state.currentSubtitle,
  questions: state.activeQuestions,
  deck: state.currentDeck,
  shuffleQuestions: state.shuffleQuestions,
  oralMode: state.oralMode
}));
els.backHomeButton.addEventListener("click", goHome);
els.tutorialHomeButton.addEventListener("click", goHome);
els.tttTutorialButton.addEventListener("click", () => showTutorial());
els.oralModeButton.addEventListener("click", startGlobalOralMode);
els.tutorialStepButtons.forEach((button) => {
  button.addEventListener("click", () => renderTutorialStep(Number(button.dataset.tttStep)));
});
els.lectureFocusButton.addEventListener("click", () => {
  els.lecturePicker.open = true;
  els.lecturePicker.scrollIntoView({ behavior: "smooth", block: "start" });
});

init().catch((error) => {
  els.questionText.textContent = error.message;
  els.questionSource.textContent = "Load error";
});
