/**
 * PAWFORM - Central Data Store
 * Fictional Pet Food Nutrition Discovery & Exploration Platform
 */

const PAWFORM_DATA = {
  // Brand metadata
  brand: {
    name: "PAWFORM",
    tagline: "Discover Better Nutrition for Every Paw.",
    disclaimer: "PAWFORM provides educational information and is not a substitute for veterinary advice."
  },

  // Creators with reliable, high-res photos
  creators: [
    {
      id: "dr-maya-lin",
      name: "Dr. Maya Lin, MS, DVM",
      handle: "@mayalinnutrition",
      verification: true,
      specialty: "Canine Clinical Nutritionist",
      category: "veterinarians",
      followers: 142500,
      followingCount: 312,
      contentCount: 48,
      avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=300&q=80",
      coverImage: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1200&q=80",
      bio: "Board-certified veterinary nutritionist dedicated to demystifying pet food ingredients, protein bioavailability, and renal diet formulations. Bridging clinical science with accessible home feeding wisdom.",
      featuredTopic: "Protein Bioavailability & Label Decoder",
      speciesFocus: ["Dogs", "Puppies", "Senior Pets"],
      location: "San Francisco, CA",
      website: "https://mayalinnutrition.example.com",
      badges: ["Certified Nutritionist", "Vet Science Lead", "Top Educator"],
      socials: { youtube: "mayalinvideos", instagram: "mayalinnutrition" }
    },
    {
      id: "chef-tyler-brooks",
      name: "Chef Tyler Brooks",
      handle: "@freshpetchef",
      verification: true,
      specialty: "Fresh Pet Culinary & Formulation",
      category: "chefs",
      followers: 98300,
      followingCount: 180,
      contentCount: 62,
      avatar: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=300&q=80",
      coverImage: "https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?auto=format&fit=crop&w=1200&q=80",
      bio: "Former restaurant chef turned pet whole-food formulator. Specializing in gently cooked home prep, organ meat ratios, and natural toppers to elevate commercial kibble bowls.",
      featuredTopic: "Whole Food Toppers & Gentle Cooking",
      speciesFocus: ["Dogs", "Cats"],
      location: "Austin, TX",
      website: "https://freshpetchef.example.com",
      badges: ["Culinary Formulator", "Fresh Food Pioneer"],
      socials: { youtube: "freshpetcheftv", instagram: "freshpetchef" }
    },
    {
      id: "dr-aris-thorne",
      name: "Dr. Aris Thorne, DVM",
      handle: "@felinenutritionist",
      verification: true,
      specialty: "Feline Nutrition Specialist",
      category: "veterinarians",
      followers: 86400,
      followingCount: 145,
      contentCount: 39,
      avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=300&q=80",
      coverImage: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=1200&q=80",
      bio: "Dedicated solely to obligate carnivore biology. Championing moisture-rich feeding, urinary health, taurine balance, and species-appropriate feline meal planning.",
      featuredTopic: "Obligate Carnivore Hydration & Taurine",
      speciesFocus: ["Cats", "Kittens", "Senior Pets"],
      location: "Seattle, WA",
      website: "https://felinenutrition.example.com",
      badges: ["Feline Specialist", "Author"],
      socials: { youtube: "drthornefeline", instagram: "aristhorne.dvm" }
    },
    {
      id: "elena-rostova",
      name: "Elena Rostova",
      handle: "@petlabelinvestigator",
      verification: true,
      specialty: "Pet Food Label Analyst",
      category: "reviewers",
      followers: 121000,
      followingCount: 220,
      contentCount: 74,
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80",
      coverImage: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=1200&q=80",
      bio: "Independent pet food industry watchdog. Uncovering ingredient splitting, rendering practices, AAFCO labeling loopholes, and marketing jargon so you buy with confidence.",
      featuredTopic: "AAFCO Guarantees & Industry Deep Dives",
      speciesFocus: ["Dogs", "Cats"],
      location: "Chicago, IL",
      website: "https://petlabelinvestigator.example.com",
      badges: ["Independent Analyst", "Community Pick"],
      socials: { youtube: "labelinvestigatortv", instagram: "elena.petlabels" }
    },
    {
      id: "marcus-vance",
      name: "Marcus Vance",
      handle: "@caninerawnutrition",
      verification: true,
      specialty: "Canine Raw & Whole Food Coach",
      category: "educators",
      followers: 74900,
      followingCount: 95,
      contentCount: 44,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
      coverImage: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=1200&q=80",
      bio: "BARF & Prey Model Raw educator. Helping pet owners transition safely to whole foods with strict hygiene, calcium:phosphorus balancing, and raw feeding protocols.",
      featuredTopic: "Prey Model & Calcium:Phosphorus Balance",
      speciesFocus: ["Dogs", "Puppies"],
      location: "Denver, CO",
      website: "https://marcusvancecanine.example.com",
      badges: ["Raw Food Certified", "Coach"],
      socials: { youtube: "marcuscanine", instagram: "marcusvance" }
    },
    {
      id: "chloe-bennett",
      name: "Chloe Bennett",
      handle: "@holisticpawwellness",
      verification: true,
      specialty: "Holistic Pet Wellness & Herbs",
      category: "wellness",
      followers: 63200,
      followingCount: 160,
      contentCount: 35,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
      coverImage: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=1200&q=80",
      bio: "Certified veterinary herbalist and gut microbiome advocate. Focused on medicinal mushrooms, bone broths, kefir, and anti-inflammatory nutrition for chronic wellness.",
      featuredTopic: "Gut Microbiome & Medicinal Mushrooms",
      speciesFocus: ["Dogs", "Cats", "Senior Pets"],
      location: "Portland, OR",
      website: "https://holisticpawwellness.example.com",
      badges: ["Herbalist", "Gut Health Guide"],
      socials: { youtube: "chloepawwellness", instagram: "chloebennett" }
    },
    {
      id: "dr-kenji-sato",
      name: "Dr. Kenji Sato, PhD",
      handle: "@seniordogdietitian",
      verification: true,
      specialty: "Senior Pet Metabolic Nutrition",
      category: "veterinarians",
      followers: 51800,
      followingCount: 110,
      contentCount: 29,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
      coverImage: "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=1200&q=80",
      bio: "Animal nutritional biochemist researching cellular aging, joint mobility lipid profiles, cognitive health support (MCTs), and lean mass preservation in geriatric companions.",
      featuredTopic: "Geriatric Metabolism & Cognitive Lipids",
      speciesFocus: ["Senior Pets", "Dogs", "Cats"],
      location: "Boston, MA",
      website: "https://kenjisatonutrition.example.com",
      badges: ["PhD Biochemist", "Senior Specialist"],
      socials: { youtube: "drkenjinutrition", instagram: "drkenjisato" }
    },
    {
      id: "sophia-alvarez",
      name: "Sophia Alvarez",
      handle: "@puppyfeedingguide",
      verification: true,
      specialty: "Puppy & Kitten Early Development",
      category: "educators",
      followers: 89100,
      followingCount: 215,
      contentCount: 52,
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
      coverImage: "https://images.unsplash.com/photo-1591160690555-5debfba289f0?auto=format&fit=crop&w=1200&q=80",
      bio: "Specializing in large-breed skeletal growth, DHA supplementation for cognitive development, and positive weaning transitions for puppies and kittens.",
      featuredTopic: "Growth Curve Calcium Calibration",
      speciesFocus: ["Puppies", "Kittens", "Dogs"],
      location: "San Diego, CA",
      website: "https://puppydevelopment.example.com",
      badges: ["Growth Specialist", "Parent Guide"],
      socials: { youtube: "sophiapuppyfeed", instagram: "sophia_alvarez" }
    }
  ],

  // Videos
  videos: [
    {
      id: "vid-1",
      title: "How to Read a Pet Food Label: Beyond Marketing Buzzwords",
      slug: "how-to-read-a-pet-food-label",
      creatorId: "dr-maya-lin",
      duration: "14:25",
      durationSec: 865,
      views: "184K",
      publishedDate: "October 12, 2025",
      category: "Food Labels",
      topic: "Food Labels",
      species: "Dogs",
      thumbnail: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&w=800&q=80",
      bannerImage: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&w=1600&q=80",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      description: "Learn how to look past 'human-grade', 'grain-free', and 'wild-crafted' buzzwords. Dr. Maya Lin breaks down the Guaranteed Analysis, ingredient splitting techniques, and how to compute dry matter protein percentages accurately.",
      isFeatured: true,
      isTrending: true,
      isEditorPick: true,
      tags: ["Labels", "Guaranteed Analysis", "AAFCO", "Protein Calculation", "Pet Wellness"],
      chapters: [
        { time: "00:00", title: "Introduction & Common Marketing Myths", sec: 0 },
        { time: "02:15", title: "The First 5 Ingredients Rule vs Reality", sec: 135 },
        { time: "05:40", title: "What is Ingredient Splitting?", sec: 340 },
        { time: "08:15", title: "Decoding the Guaranteed Analysis", sec: 495 },
        { time: "11:30", title: "Converting to Dry Matter Basis (Formula)", sec: 690 },
        { time: "13:20", title: "Summary & Free Checklist", sec: 800 }
      ],
      transcript: [
        { time: "00:10", speaker: "Dr. Maya Lin", text: "Welcome back to PAWFORM. Today we are unpacking one of the most requested topics: deciphering pet food packaging." },
        { time: "01:05", speaker: "Dr. Maya Lin", text: "When you walk into an aisle, bags show whole cuts of wild salmon and fresh blueberries. But what's legally on the back label?" },
        { time: "02:30", speaker: "Dr. Maya Lin", text: "Ingredients are listed by weight prior to cooking. Raw deboned chicken is roughly 70% water, meaning once processed, its dry protein rank changes." },
        { time: "06:00", speaker: "Dr. Maya Lin", text: "Watch out for split peas, pea flour, pea fiber, and pea protein. Separately listed, each sits lower on the ingredient panel, but combined they may outweigh the meat." },
        { time: "09:00", speaker: "Dr. Maya Lin", text: "To calculate dry matter, subtract the moisture percentage from 100%, then divide the nutrient percentage by that dry fraction." },
        { time: "13:40", speaker: "Dr. Maya Lin", text: "Always remember: whole ingredients are wonderful, but nutrient density and balance are what truly nourish your companion." }
      ]
    },
    {
      id: "vid-2",
      title: "Protein Sources Explained: Bioavailability, Meal vs Whole Meat",
      slug: "protein-sources-explained",
      creatorId: "dr-maya-lin",
      duration: "18:10",
      durationSec: 1090,
      views: "142K",
      publishedDate: "November 3, 2025",
      category: "Protein",
      topic: "Protein",
      species: "Dogs",
      thumbnail: "https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=800&q=80",
      bannerImage: "https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=1600&q=80",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      description: "Not all protein is created equal. Dive deep into the biological value of eggs, novel meats (venison, rabbit), single-source poultry meal, and plant-based concentrates.",
      isFeatured: false,
      isTrending: true,
      isEditorPick: true,
      tags: ["Protein", "Bioavailability", "Meat Meal", "Canine Health", "Amino Acids"],
      chapters: [
        { time: "00:00", title: "Amino Acids & Biological Value", sec: 0 },
        { time: "03:45", title: "Eggs: The Gold Standard Protein", sec: 225 },
        { time: "07:10", title: "Named Meat Meals vs Generic Byproducts", sec: 430 },
        { time: "12:00", title: "Novel Proteins for Sensitive Stomachs", sec: 720 },
        { time: "16:15", title: "Key Takeaways for Daily Bowls", sec: 975 }
      ],
      transcript: [
        { time: "00:15", speaker: "Dr. Maya Lin", text: "Dogs require 10 essential amino acids that their bodies cannot synthesize independently." },
        { time: "04:00", speaker: "Dr. Maya Lin", text: "Whole eggs possess a biological value score of 100, providing an exceptional amino acid profile." },
        { time: "08:15", speaker: "Dr. Maya Lin", text: "A named meal like 'Dehydrated Lamb Meal' is concentrated protein without water weight, unlike vague 'animal meal'." }
      ]
    },
    {
      id: "vid-3",
      title: "Inside a Fresh Pet Food Kitchen: Batch Prep & Safety Protocols",
      slug: "inside-a-fresh-pet-food-kitchen",
      creatorId: "chef-tyler-brooks",
      duration: "16:40",
      durationSec: 1000,
      views: "210K",
      publishedDate: "December 1, 2025",
      category: "Feeding",
      topic: "Feeding",
      species: "Dogs",
      thumbnail: "https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?auto=format&fit=crop&w=800&q=80",
      bannerImage: "https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?auto=format&fit=crop&w=1600&q=80",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      description: "Chef Tyler walks through an inspected commercial fresh kitchen. Learn how whole muscle cuts, organs, steamed veggies, and vitamin-mineral pre-mixes are gently cooked at 165°F to preserve delicate nutrients.",
      isFeatured: true,
      isTrending: true,
      isEditorPick: false,
      tags: ["Fresh Food", "Culinary", "Gentle Cooking", "Meal Prep", "Safety"],
      chapters: [
        { time: "00:00", title: "Touring the Kitchen Station", sec: 0 },
        { time: "03:10", title: "Sourcing Human-Grade Meats", sec: 190 },
        { time: "06:50", title: "The 165°F Gentle Steam Method", sec: 410 },
        { time: "10:30", title: "Adding Cold-Sensitive Omegas & Zinc", sec: 630 },
        { time: "14:15", title: "Flash Freezing & Storage Tips", sec: 855 }
      ],
      transcript: [
        { time: "00:05", speaker: "Chef Tyler", text: "Today we take you behind the stainless steel doors to see how real fresh pet food is batched." },
        { time: "07:00", speaker: "Chef Tyler", text: "We gently steam at 165 degrees Fahrenheit. This eliminates pathogens while keeping enzyme structures largely intact." }
      ]
    },
    {
      id: "vid-4",
      title: "The Feline Hydration Crisis: Why Cats Need Wet & Moisture-Rich Diets",
      slug: "feline-hydration-crisis",
      creatorId: "dr-aris-thorne",
      duration: "12:50",
      durationSec: 770,
      views: "167K",
      publishedDate: "January 15, 2026",
      category: "Hydration",
      topic: "Hydration",
      species: "Cats",
      thumbnail: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=80",
      bannerImage: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=1600&q=80",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
      description: "Domestic cats evolved from desert ancestors and possess a naturally low thirst drive. Dr. Thorne demonstrates why chronic dry food feeding challenges renal and urinary systems.",
      isFeatured: false,
      isTrending: true,
      isEditorPick: true,
      tags: ["Feline Health", "Hydration", "Wet Food", "Kidney Support", "Cats"],
      chapters: [
        { time: "00:00", title: "Desert Ancestry & Low Thirst Drive", sec: 0 },
        { time: "03:15", title: "Kibble vs Wet Food Moisture Comparison", sec: 195 },
        { time: "06:40", title: "Urinary Tract Health & Specific Gravity", sec: 400 },
        { time: "09:50", title: "5 Creative Ways to Add Bone Broths", sec: 590 }
      ],
      transcript: [
        { time: "00:20", speaker: "Dr. Aris Thorne", text: "In the wild, a cat's prey consists of approximately 70 to 75 percent water." },
        { time: "03:30", speaker: "Dr. Aris Thorne", text: "Kibble contains only 8 to 10 percent moisture. Cats rarely drink enough water bowl volume to compensate." }
      ]
    },
    {
      id: "vid-5",
      title: "Raw Feeding 101: Understanding the 80:10:10 Ratio & Calcium",
      slug: "raw-feeding-101-understanding-ratios",
      creatorId: "marcus-vance",
      duration: "21:30",
      durationSec: 1290,
      views: "115K",
      publishedDate: "February 2, 2026",
      category: "Ingredients",
      topic: "Ingredients",
      species: "Dogs",
      thumbnail: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=800&q=80",
      bannerImage: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=1600&q=80",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
      description: "Marcus breaks down the Prey Model Raw (PMR) guidelines: 80% muscle meat, 10% raw bone, 5% liver, and 5% other secreting organ, plus safe handling in a home kitchen.",
      isFeatured: false,
      isTrending: false,
      isEditorPick: false,
      tags: ["Raw Diet", "BARF", "PMR", "Calcium", "Organ Meat"],
      chapters: [
        { time: "00:00", title: "The 80/10/10 Breakdown", sec: 0 },
        { time: "05:10", title: "Edible Raw Bone Safety", sec: 310 },
        { time: "11:20", title: "Why Liver & Secreting Organs are Non-Negotiable", sec: 680 },
        { time: "17:00", title: "Freezing & Bacterial Management", sec: 1020 }
      ],
      transcript: [
        { time: "00:30", speaker: "Marcus Vance", text: "Raw feeding isn't just throwing a steak in a bowl; it requires precise calcium to phosphorus ratios." }
      ]
    },
    {
      id: "vid-6",
      title: "Senior Dog Nutrition: MCT Oils, Omega-3s, and Joint Protection",
      slug: "senior-dog-nutrition-mct-omega3",
      creatorId: "dr-kenji-sato",
      duration: "17:45",
      durationSec: 1065,
      views: "93K",
      publishedDate: "February 18, 2026",
      category: "Senior Pets",
      topic: "Senior Pets",
      species: "Senior Pets",
      thumbnail: "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=800&q=80",
      bannerImage: "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=1600&q=80",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4",
      description: "As pets age, brain glucose uptake declines. Dr. Sato explains how Medium Chain Triglycerides (MCTs) provide alternative ketone fuel for aging canine brains.",
      isFeatured: false,
      isTrending: true,
      isEditorPick: true,
      tags: ["Senior Dogs", "Cognitive Health", "MCT Oil", "Joints", "Geriatric Care"],
      chapters: [
        { time: "00:00", title: "The Aging Canine Metabolism", sec: 0 },
        { time: "04:10", title: "MCTs: Brain Energy Without Carbs", sec: 250 },
        { time: "09:30", title: "Marine Omega-3 EPA vs DHA for Arthritis", sec: 570 },
        { time: "14:20", title: "Preventing Sarcopenia (Muscle Loss)", sec: 860 }
      ],
      transcript: [
        { time: "00:40", speaker: "Dr. Kenji Sato", text: "Senior dogs often lose lean muscle mass even while maintaining the same body weight. We need higher quality protein, not less." }
      ]
    },
    {
      id: "vid-7",
      title: "Puppy Calcium Ratios: Why Large Breed Puppies Need Special Care",
      slug: "puppy-calcium-ratios-large-breeds",
      creatorId: "sophia-alvarez",
      duration: "13:15",
      durationSec: 795,
      views: "108K",
      publishedDate: "March 1, 2026",
      category: "Puppy Food",
      topic: "Puppy Food",
      species: "Puppies",
      thumbnail: "https://images.unsplash.com/photo-1591160690555-5debfba289f0?auto=format&fit=crop&w=800&q=80",
      bannerImage: "https://images.unsplash.com/photo-1591160690555-5debfba289f0?auto=format&fit=crop&w=1600&q=80",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
      description: "Excess calcium in rapidly growing large-breed puppies can lead to severe developmental orthopedic diseases. Understand the tight calcium window required during months 2 through 14.",
      isFeatured: false,
      isTrending: false,
      isEditorPick: false,
      tags: ["Puppies", "Calcium", "Growth", "Large Breeds", "Skeletal Health"],
      chapters: [
        { time: "00:00", title: "Puppy Skeletal Regulation Explained", sec: 0 },
        { time: "03:30", title: "The Danger of Over-Supplementing Calcium", sec: 210 },
        { time: "07:45", title: "Checking AAFCO Large Breed Statements", sec: 465 },
        { time: "11:00", title: "Optimal Caloric Density", sec: 660 }
      ],
      transcript: [
        { time: "00:15", speaker: "Sophia Alvarez", text: "Unlike adult dogs, young puppies cannot regulate how much intestinal calcium they absorb. Everything you feed gets absorbed." }
      ]
    },
    {
      id: "vid-8",
      title: "Gut Microbiome & Fermented Foods: Kefir, Goat Milk & Inulin",
      slug: "gut-microbiome-fermented-foods",
      creatorId: "chloe-bennett",
      duration: "15:05",
      durationSec: 905,
      views: "79K",
      publishedDate: "March 10, 2026",
      category: "Supplements",
      topic: "Supplements",
      species: "Dogs",
      thumbnail: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=800&q=80",
      bannerImage: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=1600&q=80",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
      description: "Over 70% of a pet's immune system resides in the gut lining. Chloe shows how raw fermented goat milk, water kefir, and prebiotic fiber feed beneficial short-chain fatty acid producers.",
      isFeatured: false,
      isTrending: true,
      isEditorPick: false,
      tags: ["Gut Health", "Microbiome", "Kefir", "Supplements", "Prebiotics"],
      chapters: [
        { time: "00:00", title: "The Canine & Feline Microbiome", sec: 0 },
        { time: "04:10", title: "Fermented Goat Milk vs Cow Milk", sec: 250 },
        { time: "08:20", title: "Prebiotic Inulin & Pumpkin Fiber", sec: 500 },
        { time: "12:15", title: "Dosing for Itchy Skin & Digestion", sec: 735 }
      ],
      transcript: [
        { time: "00:30", speaker: "Chloe Bennett", text: "Fermented foods introduce live probiotic strains along with enzymes that help break down dry starch." }
      ]
    },
    {
      id: "vid-9",
      title: "Essential Fatty Acids: Balancing Omega-6 to Omega-3 Ratios",
      slug: "essential-fatty-acids-omega3-omega6",
      creatorId: "dr-maya-lin",
      duration: "11:50",
      durationSec: 710,
      views: "128K",
      publishedDate: "March 22, 2026",
      category: "Ingredients",
      topic: "Ingredients",
      species: "Dogs",
      thumbnail: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80",
      bannerImage: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=1600&q=80",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      description: "Understand why high-heat kibble often leaves fats oxidized. Dr. Maya Lin demonstrates how to balance the pro-inflammatory omega-6s in commercial diets with fresh marine EPA and DHA oils.",
      isFeatured: false,
      isTrending: true,
      isEditorPick: true,
      tags: ["Omega-3", "Fish Oil", "Skin & Coat", "Inflammation", "Lipids"],
      chapters: [
        { time: "00:00", title: "Omega-6 vs Omega-3 In Pet Diets", sec: 0 },
        { time: "03:15", title: "Why Plant Oils (Flax) Don't Convert Well", sec: 195 },
        { time: "06:40", title: "Selecting Sardine, Krill, and Wild Salmon Oils", sec: 400 },
        { time: "09:30", title: "Protecting Oils from Rancidity & Oxidation", sec: 570 }
      ],
      transcript: [
        { time: "00:25", speaker: "Dr. Maya Lin", text: "Dogs and cats lack the delta-6 desaturase enzyme efficiency needed to convert plant ALA into active EPA and DHA." }
      ]
    }
  ],

  // Guides
  guides: [
    {
      id: "guide-1",
      title: "The Definitive Pet Food Label Decoder: A Step-by-Step Field Guide",
      slug: "pet-food-label-decoder-guide",
      authorId: "elena-rostova",
      readingTime: "9 min read",
      category: "Food Labels",
      species: ["Dogs", "Cats"],
      summary: "Understand what legal AAFCO definitions actually require, decode deceptive ingredient splitting, and calculate dry matter macronutrients like a veterinary nutritionist.",
      heroImage: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&w=800&q=80",
      publishedDate: "March 15, 2026",
      isFeatured: true,
      isEditorPick: true,
      keyTakeaways: [
        "Ingredients are listed in order of pre-cooked weight, which heavily favors high-moisture meats.",
        "Ingredient splitting artificially keeps whole meats as the first ingredient.",
        "Guaranteed Analysis numbers must be converted to Dry Matter Basis (DMB) to compare wet and dry diets."
      ],
      sections: [
        {
          heading: "1. The 95%, 25%, 3%, and 'With' Labeling Rules",
          content: `<p>Under AAFCO standards, the naming of a product dictates minimum meat percentages. For example:</p>
          <ul>
            <li><strong>The 95% Rule:</strong> 'Beef Dog Food' must contain at least 95% beef excluding water.</li>
            <li><strong>The 25% 'Dinner/Platter/Formula' Rule:</strong> 'Salmon & Sweet Potato Dinner' only requires 25% primary named meats.</li>
            <li><strong>The 3% 'With' Rule:</strong> 'Cat Food with Tuna' only requires a minimal 3% tuna content.</li>
            <li><strong>The Flavor Rule:</strong> 'Chicken Flavor' has no minimum requirement other than passing a flavor detection test.</li>
          </ul>`
        },
        {
          heading: "2. Decoding Ingredient Splitting",
          content: `<p>Pet food formulators often break a single agricultural commodity into multiple sub-ingredients. For example, a manufacturer may split peas into:</p>
          <ul>
            <li>Split Peas (8%)</li>
            <li>Pea Starch (6%)</li>
            <li>Pea Flour (6%)</li>
            <li>Pea Fiber (4%)</li>
          </ul>
          <p>Individually, these 4 pea fractions appear much lower on the label than 'Deboned Chicken (18%)'. However, together peas make up 24% of the recipe!</p>`
        },
        {
          heading: "3. How to Calculate Dry Matter Basis (DMB)",
          content: `<p>To compare a wet canned food (78% moisture) to a dry kibble (10% moisture), you must remove the water component:</p>
          <div class="editorial-callout">
            <h5>Formula:</h5>
            <p><strong>Dry Matter % = 100% - Moisture %</strong></p>
            <p><strong>Nutrient on DMB = (Nutrient % on Label / Dry Matter %) × 100</strong></p>
          </div>
          <p>A wet food showing 10% crude protein with 80% moisture actually boasts <strong>50% protein on a dry matter basis</strong> (10 / 20 × 100 = 50%), vastly outperforming typical 28% kibble.</p>`
        }
      ],
      comparisonTable: {
        title: "Guaranteed Analysis vs. Dry Matter Comparison",
        headers: ["Nutrient", "Wet Can Label", "Wet (DMB)", "Dry Kibble Label", "Kibble (DMB)"],
        rows: [
          ["Crude Protein", "10.0%", "50.0%", "28.0%", "31.1%"],
          ["Crude Fat", "6.0%", "30.0%", "15.0%", "16.6%"],
          ["Moisture", "80.0%", "0.0%", "10.0%", "0.0%"],
          ["Crude Fiber", "1.5%", "7.5%", "4.0%", "4.4%"],
          ["Est. Carbs", "2.5%", "12.5%", "43.0%", "47.7%"]
        ]
      },
      relatedVideoId: "vid-1"
    },
    {
      id: "guide-2",
      title: "The Canine Protein Masterclass: Bioavailability, Novel Meats & Digestion",
      slug: "canine-protein-masterclass",
      authorId: "dr-maya-lin",
      readingTime: "11 min read",
      category: "Protein",
      species: ["Dogs", "Puppies", "Senior Pets"],
      summary: "Explore the biological value scale of animal vs plant proteins, novel hypoallergenic proteins (venison, rabbit, kangaroo), and how processing heat alters amino acid integrity.",
      heroImage: "https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=800&q=80",
      publishedDate: "March 20, 2026",
      isFeatured: false,
      isEditorPick: true,
      keyTakeaways: [
        "Protein quantity on a label does not guarantee digestibility or bioavailability.",
        "Egg and whole muscle meats rank highest on biological value for carnivores.",
        "Novel single-source proteins reduce inflammatory immune responses in sensitive canines."
      ],
      sections: [
        {
          heading: "1. The Biological Value Scale for Canines",
          content: `<p>Biological Value (BV) measures the proportion of absorbed protein that is retained and synthesized into body tissues. Egg white and whole egg form the baseline benchmark at 100 BV, followed by whey isolate, fish muscle, and poultry muscle.</p>`
        },
        {
          heading: "2. Novel Proteins vs Common Allergens",
          content: `<p>The most frequent canine food sensitivities stem from overexposed proteins like conventional factory-farmed chicken and beef. Transitioning to novel options such as venison, rabbit, duck, or brushtail can reset gastrointestinal inflammation.</p>`
        }
      ],
      relatedVideoId: "vid-2"
    },
    {
      id: "guide-3",
      title: "The Feline Hydration & Renal Guide: Safeguarding Kidney Function",
      slug: "feline-hydration-renal-guide",
      authorId: "dr-aris-thorne",
      readingTime: "8 min read",
      category: "Hydration",
      species: ["Cats", "Kittens", "Senior Pets"],
      summary: "Understand why dry kibble presents evolutionary challenges to domestic felines and how moisture-dense feeding patterns preserve nephron health over a lifetime.",
      heroImage: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=80",
      publishedDate: "March 28, 2026",
      isFeatured: false,
      isEditorPick: false,
      keyTakeaways: [
        "Cats possess a blunted thirst sensation and naturally obtain 70%+ of water from food.",
        "High specific gravity urine from chronic dry food concentrates mineral crystals.",
        "Adding low-sodium bone broths and rotating canned foods reduces renal stress."
      ],
      sections: [
        {
          heading: "1. The Desert Cat Ancestry",
          content: `<p>Felis lybica, the African wildcat ancestor of all modern house cats, adapted to arid desert environments by concentrating their urine and deriving metabolic water almost entirely from fresh prey.</p>`
        }
      ],
      relatedVideoId: "vid-4"
    },
    {
      id: "guide-4",
      title: "Safe Transitioning Protocol: Changing Pet Foods Without Digestive Upset",
      slug: "safe-pet-food-transition-guide",
      authorId: "chef-tyler-brooks",
      readingTime: "6 min read",
      category: "Feeding",
      species: ["Dogs", "Cats", "Puppies"],
      summary: "A practical 10-day gradual transition timeline with digestive support buffers (pumpkin puree, slippery elm, and digestive enzymes) to eliminate diarrhea and vomiting.",
      heroImage: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=800&q=80",
      publishedDate: "April 1, 2026",
      isFeatured: false,
      isEditorPick: true,
      keyTakeaways: [
        "A 7 to 10 day gradual switch allows gut microbiome enzymes to adapt.",
        "Cold-pressed kibble and raw digest at different speeds than extruded kibble.",
        "Pure pumpkin puree provides soluble fiber that moderates stool consistency."
      ],
      sections: [
        {
          heading: "1. The 10-Day Step-Down Protocol",
          content: `<p>Days 1-3: 75% Old Food + 25% New Food<br>Days 4-6: 50% Old Food + 50% New Food<br>Days 7-9: 25% Old Food + 75% New Food<br>Day 10: 100% New Food</p>`
        }
      ],
      relatedVideoId: "vid-3"
    },
    {
      id: "guide-5",
      title: "Omega-3 Fatty Acids Decoded: Marine EPA/DHA vs Plant-Based ALA",
      slug: "omega-3-fatty-acids-epa-dha-guide",
      authorId: "chloe-bennett",
      readingTime: "7 min read",
      category: "Supplements",
      species: ["Dogs", "Cats"],
      summary: "Why dogs and cats cannot efficiently convert flaxseed or chia ALA into active anti-inflammatory EPA/DHA, and how to source clean krill and sardine oils without rancidity.",
      heroImage: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=800&q=80",
      publishedDate: "April 3, 2026",
      isFeatured: false,
      isEditorPick: false,
      keyTakeaways: [
        "Flaxseed ALA conversion to EPA in dogs is under 1% and virtually 0% in cats.",
        "Small cold-water forage fish (sardines, anchovies, mackerel) contain lower heavy metals.",
        "Store all liquid fish oils in dark glass in the refrigerator to avoid lipid peroxidation."
      ],
      sections: [
        {
          heading: "1. The Biochemical Conversion Barrier",
          content: `<p>Felines lack the delta-6-desaturase enzyme pathway entirely, making marine-derived preformed EPA and DHA biologically essential nutrients for coat, joints, and cellular membranes.</p>`
        }
      ],
      relatedVideoId: "vid-8"
    },
    {
      id: "guide-6",
      title: "Senior Companion Metabolic Transitions: Lean Muscle Preservation",
      slug: "senior-companion-metabolic-transitions",
      authorId: "dr-kenji-sato",
      readingTime: "10 min read",
      category: "Senior Pets",
      species: ["Senior Pets", "Dogs", "Cats"],
      summary: "Counteracting sarcopenia with high-quality digestible protein, managing phosphorus in kidney-sparing diets, and adding functional antioxidant blends for cognitive longevity.",
      heroImage: "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=800&q=80",
      publishedDate: "April 5, 2026",
      isFeatured: false,
      isEditorPick: true,
      keyTakeaways: [
        "Geriatric animals actually require higher protein quality to prevent muscle wasting.",
        "Glucosamine & chondroitin work synergistically with green-lipped mussel lipid extracts.",
        "Warm moisture-enhanced meals restore appetite in pets with diminished olfactory senses."
      ],
      sections: [
        {
          heading: "1. Overcoming Olfactory and Taste Blunting",
          content: `<p>As pets reach their golden years, sensory receptor density diminishes. Gently warming food to body temperature (approx 100°F) releases volatile aromatic lipids that stimulate appetite naturally.</p>`
        }
      ],
      relatedVideoId: "vid-6"
    }
  ],

  // Topic Categories for filters & chips
  topics: [
    { id: "nutrition", name: "Nutrition", icon: "bi-heart-pulse", count: 42 },
    { id: "protein", name: "Protein", icon: "bi-egg-fried", count: 28 },
    { id: "ingredients", name: "Ingredients", icon: "bi-basket3", count: 35 },
    { id: "food-labels", name: "Food Labels", icon: "bi-card-checklist", count: 24 },
    { id: "hydration", name: "Hydration", icon: "bi-droplet-half", count: 19 },
    { id: "feeding", name: "Feeding", icon: "bi-cup-hot", count: 31 },
    { id: "puppy-food", name: "Puppy Food", icon: "bi-stars", count: 16 },
    { id: "senior-pets", name: "Senior Pets", icon: "bi-hourglass-split", count: 22 },
    { id: "supplements", name: "Supplements", icon: "bi-capsule", count: 18 }
  ]
};

// Expose globally
if (typeof window !== "undefined") {
  window.PAWFORM_DATA = PAWFORM_DATA;
}
