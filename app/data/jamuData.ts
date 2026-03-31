export interface JamuItem {
  id: string;
  category: "Jamu Gendong" | "Ingredients" | "Functional Jamu" | "Loloh Series";
  name: string;
  scientific: string;
  img: string;
  lifePhase?: string;
  description: string;
  philosophy?: string;
  stats: Record<string, string>;
  benefits: string[];
  mainIngredients?: { item: string; amount: string; percentage: string }[];
  steps?: string[];
  equipment?: string[];
  madeJamu?: string[];
  tastes?: string[];
}

export const jamuData: JamuItem[] = [
  // --- THE 8 JAMU GENDONG (SACRED COLLECTION) ---
  {
    id: "kunyit-asam",
    category: "Jamu Gendong",
    name: "Kunyit Asam",
    scientific: "Curcuma longa & Tamarindus indica",
    img: "https://images.unsplash.com/photo-1615485925600-97237c4fc1ec?q=80&w=400",
    lifePhase: "Birth to Early Childhood [cite: 10]",
    description: "Turmeric represents the yellowish-tan skin color. The sweet-sour taste symbolizes life's sweetness in infancy that gradually becomes sour as one begins experiencing reality.",
    philosophy: "Philosophically aligned with the Javanese Sinom song tradition celebrating the colors of youth.",
    stats: { sweet: "~40%", sour: "~40%", "herbal-savory": "~20%" },
    benefits: ["Menstrual pain", "Hormonal imbalance", "Immune system", "Dull skin complexion"],
    mainIngredients: [
      { item: "Palm/coconut sugar", amount: "20g", percentage: "~40%" },
      { item: "Tamarind", amount: "5 seeds", percentage: "~40%" },
      { item: "Turmeric", amount: "25g", percentage: "~20%" }
    ],
    steps: [
      "Boil water with palm sugar, tamarind, and spices",
      "Peel, wash, and roast turmeric",
      "Pound/blend turmeric with boiled water and strain",
      "Add lime juice and sea salt [cite: 32]"
    ],
    equipment: ["Mortar and pestle", "Pot", "Strainer", "Bottle"]
  },
  {
    id: "beras-kencur",
    category: "Jamu Gendong",
    name: "Beras Kencur",
    scientific: "Kaempferia galanga & Oryza sativa",
    img: "https://images.unsplash.com/photo-1662111166343-2287f347895e?q=80&w=400",
    lifePhase: "Adolescence",
    description: "The slightly spicy taste provides warming effect to the body.",
    philosophy: "Bebering Alas Tan Kena Diukur (the vastness of the world cannot be measured).",
    stats: { sweet: "~50%", "spicy-warming": "~30%", "slightly-sour": "~20%" },
    benefits: ["Physical fatigue", "Hoarse voice", "Poor appetite", "Cough & flu"],
    mainIngredients: [
      { item: "Palm/coconut sugar", amount: "20g", percentage: "~50%" },
      { item: "Aromatic ginger (kencur)", amount: "25g", percentage: "~30%" },
      { item: "Rice", amount: "2 tsp", percentage: "~20%" }
    ],
    steps: [
      "Boil water with sugar and spices",
      "Peel kencur, ginger, and roast with rice",
      "Pound kencur, ginger, and rice until smooth",
      "Mix, strain with cloth, and add lime juice"
    ],
    equipment: ["Mortar and pestle", "Fabric strainer", "Pot"]
  },
  {
    id: "cabe-puyang",
    category: "Jamu Gendong",
    name: "Cabe Puyang",
    scientific: "Piper retrofractum & Zingiber zerumbet",
    img: "https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?q=80&w=400",
    lifePhase: "Early Adulthood (ages 19-21) [cite: 59]",
    description: "Spicy-bitter taste represents early adult life that is unstable, demanding self-discipline.",
    philosophy: "Representing maturity and responsibility for one's words.",
    stats: { spicy: "~50%", bitter: "~30%", "slightly-savory": "~20%" },
    benefits: ["Body aches", "Blood circulation", "Stamina", "Skin problems"],
    mainIngredients: [
      { item: "Bitter ginger (lempuyang)", amount: "25g", percentage: "~50%" },
      { item: "Turmeric", amount: "20g", percentage: "~30%" },
      { item: "Java pepper (cabe jawa)", amount: "5 pieces", percentage: "~20%" }
    ],
    steps: [
      "Wash and extract juice from turmeric and lempuyang",
      "Add water, Java pepper, and salt",
      "Boil until liquid reduces, then strain"
    ],
    equipment: ["Pot", "Strainer", "Bottle"]
  },
  {
    id: "paitan",
    category: "Jamu Gendong",
    name: "Paitan",
    scientific: "Curcuma aeruginosa & Tinospora crispa",
    img: "https://images.unsplash.com/photo-1596753048935-8c44000b1446?q=80&w=400",
    lifePhase: "Prime of Life / Climax Phase",
    description: "Represents the climax of facing life - though bitter, it must be swallowed.",
    philosophy: "Armed with character, one becomes stronger through endurance.",
    stats: { bitter: "~70%", "slightly-sweet": "~20%", herbal: "~10%" },
    benefits: ["Infections", "Heart disease", "Diabetes", "Digestive problems"],
    mainIngredients: [
      { item: "Black turmeric (temu hitam)", amount: "1 segment", percentage: "~70%" },
      { item: "Brotowali vine", amount: "1 segment", percentage: "~20%" },
      { item: "Betel leaves", amount: "2 leaves", percentage: "~10%" }
    ],
    steps: [
      "Pound rhizomes and brotowali until smooth",
      "Boil in earthenware/enamel pot with betel leaves",
      "Add palm sugar and tamarind, boil briefly",
      "Strain and cool"
    ],
    equipment: ["Earthenware pot", "Mortar and pestle", "Strainer"]
  },
  {
    id: "kunci-suruh",
    category: "Jamu Gendong",
    name: "Kunci Suruh",
    scientific: "Boesenbergia rotunda & Piper betle",
    img: "https://images.unsplash.com/photo-1541443131876-44b03de101c5?q=80&w=400",
    lifePhase: "Life Success from Knowledge & Growth",
    description: "Represents life becoming smooth as resolution.",
    philosophy: "Kunci (key lock) and Suruh (betel) symbolize benefits and life success.",
    stats: { "herbal-savory": "~50%", "slightly-sour": "~30%", sweet: "~20%" },
    benefits: ["Vaginal discharge", "Feminine flora balance", "Unpleasant odor"],
    mainIngredients: [
      { item: "Fingerroot (temu kunci)", amount: "2 segments", percentage: "~50%" },
      { item: "Betel leaves", amount: "2 leaves", percentage: "~30%" },
      { item: "Palm sugar", amount: "20g", percentage: "~20%" }
    ],
    steps: [
      "Grate/pound fingerroot, turmeric, and kencur",
      "Strain to extract juice",
      "Boil with beluntas, tamarind, and lemongrass",
      "Stir well, boil, cool and strain"
    ],
    equipment: ["Ladle", "Pan", "Fabric strainer"]
  },
  {
    id: "kudu-laos",
    category: "Jamu Gendong",
    name: "Kudu Laos",
    scientific: "Morinda citrifolia & Alpinia galanga",
    img: "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?q=80&w=400",
    lifePhase: "Reminder to Be More Grateful [cite: 125]",
    description: "A warming jamu capable of reviving family feeling.",
    philosophy: "Countering ungratefulness for blessings received.",
    stats: { "bitter-astringent": "~40%", "warm-spicy": "~40%", sweet: "~20%" },
    benefits: ["High blood pressure", "High cholesterol", "Poor blood circulation"],
    mainIngredients: [
      { item: "Noni fruit (mengkudu)", amount: "1/2 fruit", percentage: "~40%" },
      { item: "Galangal (laos)", amount: "2 segments", percentage: "~40%" },
      { item: "Palm sugar", amount: "20g", percentage: "~20%" }
    ],
    steps: [
      "Boil water with noni, coriander, galangal, ginger, and kencur",
      "Reduce liquid to 250ml",
      "Strain and add palm sugar"
    ],
    equipment: ["Pot", "Ladle", "Strainer"]
  },
  {
    id: "uyup-uyup",
    category: "Jamu Gendong",
    name: "Uyup-Uyup (Gepyokan)",
    scientific: "Zingiberaceae Blend",
    img: "https://images.unsplash.com/photo-1563220302-602925b448a3?q=80&w=400",
    lifePhase: "Complete Devotion to God",
    description: "A cooling, neutralizing, and rehabilitative jamu.",
    philosophy: "Shows the sincere surrender of a servant to God.",
    stats: { "neutral-cooling": "~50%", "slightly-warming": "~30%", "mild-sweet": "~20%" },
    benefits: ["Breast milk production", "Unpleasant body odor", "Hot stomach recovery"],
    mainIngredients: [
      { item: "8 types of rhizomes", amount: "1 segment each", percentage: "~50%" },
      { item: "Ginger", amount: "1 segment", percentage: "~30%" },
      { item: "Palm sugar", amount: "20g", percentage: "~20%" }
    ],
    steps: [
      "Peel, wash, and pound/grate 8 rhizomes",
      "Strain to extract juice",
      "Boil juice, add palm sugar, and stir"
    ],
    equipment: ["Mortar and pestle", "Pot", "Cheesecloth"]
  },
  {
    id: "sinom",
    category: "Jamu Gendong",
    name: "Sinom",
    scientific: "Tamarindus indica (Leaves)",
    img: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=400",
    lifePhase: "Return to Original Nature",
    description: "Neutral state (sleep/death) without asking for anything.",
    philosophy: "If humans are born pure (fitrah), they must return to God in the same state.",
    stats: { "neutral-bland": "~40%", "slightly-sweet": "~40%", "slightly-sour": "~20%" },
    benefits: ["Fever & chills", "Constipation", "High blood pressure", "Respiratory problems"],
    mainIngredients: [
      { item: "Young tamarind leaves", amount: "25g", percentage: "~40%" },
      { item: "Turmeric", amount: "20g", percentage: "~40%" },
      { item: "Tamarind", amount: "5 seeds", percentage: "~20%" }
    ],
    steps: [
      "Peel, wash, and cut turmeric",
      "Boil water with all ingredients",
      "Strain and serve"
    ],
    equipment: ["Pot", "Strainer", "Glass cup"]
  },

  // --- LOLOH SERIES (BALI STYLE) ---
  {
    id: "loloh-cemcem",
    category: "Loloh Series",
    name: "Loloh Cemcem",
    scientific: "Tamarindus indica & Moringa oleifera",
    img: "https://images.unsplash.com/photo-1546173159-315724a31696?q=80&w=400",
    description: "Bali exclusive herbal drink, usually served with ice.",
    stats: { spicy: "mixed", sour: "mixed", sweet: "mixed" },
    benefits: ["Lowering blood sugar", "Heart health", "Constipation"],
    mainIngredients: [
      { item: "Fresh tamarind leaves (don cemcem)", amount: "100g", percentage: "main" },
      { item: "Young coconut water", amount: "250ml", percentage: "base" }
    ],
    steps: [
      "Wash and pound leaves half smooth",
      "Mix with coconut water and tamarind",
      "Squeeze juice out and strain",
      "Add lime, salt, and coconut flesh"
    ],
    equipment: ["Mortar and pestle", "Strainer", "Bottle"]
  },

  // --- FUNCTIONAL JAMU ---
  {
    id: "jamu-maag",
    category: "Functional Jamu",
    name: "Maag (Gastritis Relief)",
    scientific: "Aloe vera & Curcuma",
    img: "https://images.unsplash.com/photo-1596515107351-432f63d73a21?q=80&w=400",
    description: "Balances acidity and heals mucous membranes throughout the digestive system.",
    stats: { cooling: "high", "anti-inflammatory": "high" },
    benefits: ["Relieving stomach inflammation", "Improving liver function"],
    mainIngredients: [
      { item: "Aloe vera", amount: "1 piece", percentage: "active" },
      { item: "Turmeric", amount: "2 rhizomes", percentage: "base" }
    ],
    steps: [
      "Boil sliced turmeric and Javanese turmeric",
      "Reduce water to 250ml",
      "Mix in aloe vera pieces",
      "Divide in two, drink with honey"
    ],
    equipment: ["Pan", "Knife", "Bottle"]
  },

  // --- INGREDIENTS (CORE RHIZOMES) ---
  {
    id: "kunyit",
    category: "Ingredients",
    name: "Kunyit (Turmeric)",
    scientific: "Curcuma longa",
    img: "https://static.vecteezy.com/system/resources/thumbnails/035/998/108/small/ai-generated-hyperrealistic-of-turmeric-root-and-sliced-isolated-on-a-white-background-photo.jpg",
    description: "Rimpang inti yang melambangkan warna kulit kuning langsat dan mengandung kurkumin sebagai anti-inflamasi alami.",
    stats: { "anti-inflammatory": "100%", antioxidant: "High" },
    benefits: ["Nyeri haid", "Imunitas", "Kanker kolon", "Alzheimer"],
    madeJamu: ["Kunyit Asam", "Cabe Puyang", "Paitan", "Kunci Suruh", "Uyup-Uyup", "Temulawak", "Maag", "Immunity", "Anti Toxic"],
    tastes: ["Earthy", "Bitter"]
  },
  {
    id: "temulawak",
    category: "Ingredients",
    name: "Temulawak (Javanese Turmeric)",
    scientific: "Curcuma zanthorrhiza",
    img: "https://labijo.com/wp-content/uploads/2023/12/Fresh-Javanese-Turmeric-Root.webp",
    description: "Rimpang favorit pekerja keras yang mengandung lebih dari 40 senyawa aktif termasuk xanthorrhizol.",
    stats: { hepatoprotective: "100%", stamina: "High" },
    benefits: ["Masalah liver", "Batu ginjal", "Kelelahan stamina", "Antimikroba"],
    madeJamu: ["Temulawak", "Paitan", "Uyup-Uyup", "Maag", "Immunity", "Anti Toxic"],
    tastes: ["Bitter", "Refreshing"]
  },
  {
    id: "kencur",
    category: "Ingredients",
    name: "Kencur (Aromatic Ginger)",
    scientific: "Kaempferia galanga",
    img: "https://cdn.digitaldesa.com/uploads/marketplace/products/0d57ce17ebc023e91195dc0127f86068.jpg",
    description: "Memberikan efek hangat pada tubuh dan mengandung senyawa antioksidan fungisida.",
    stats: { warming: "High", fungicidal: "High" },
    benefits: ["Batuk dan flu", "Nafsu makan", "Kelelahan fisik", "Diabetes"],
    madeJamu: ["Beras Kencur", "Kunci Suruh", "Kudu Laos", "Uyup-Uyup"],
    tastes: ["Spicy", "Warming"]
  },
  {
    id: "jahe",
    category: "Ingredients",
    name: "Jahe (Ginger)",
    scientific: "Zingiber officinale",
    img: "https://image.astronauts.cloud/product-images/2025/9/JaheEkonomis1_a8cf3e87-971e-4d99-b9be-9f7c5a3e1498_900x900.jpg",
    description: "Rimpang penghangat tubuh yang krusial untuk meningkatkan sirkulasi darah.",
    stats: { warming: "100%", circulation: "High" },
    benefits: ["Sirkulasi darah", "Keseimbangan elemen tubuh", "Anti-inflamasi"],
    madeJamu: ["Beras Kencur", "Kunci Suruh", "Kudu Laos", "Uyup-Uyup", "Immunity", "Anti Depressant"],
    tastes: ["Spicy", "Sharp"]
  },
  {
    id: "lempuyang",
    category: "Ingredients",
    name: "Lempuyang (Bitter Ginger)",
    scientific: "Zingiber zerumbet",
    img: "https://awsimages.detik.net.id/community/media/visual/2023/09/11/1451377719.jpeg?w=600&q=90",
    description: "Dikenal sebagai 'bitter ginger', mengandung zerumbone dengan sifat antitumor.",
    stats: { bitter: "100%", antitumor: "High" },
    benefits: ["Nyeri tubuh", "Sirkulasi darah", "Masalah kulit"],
    madeJamu: ["Cabe Puyang", "Paitan", "Uyup-Uyup"],
    tastes: ["Very Bitter"]
  },
  {
    id: "sirih",
    category: "Ingredients",
    name: "Sirih (Betel Leaf)",
    scientific: "Piper betle",
    img: "https://mysiloam-api.siloamhospitals.com/public-asset/website-cms/website-cms-16771199596118035.webp",
    description: "Daun antiseptik yang telah digunakan sejak era Majapahit untuk pengobatan wanita.",
    stats: { antiseptic: "100%", herbal: "High" },
    benefits: ["Keputihan", "Bau tidak sedap", "Flora kewanitaan"],
    madeJamu: ["Paitan", "Kunci Suruh"],
    tastes: ["Astringent", "Herbal"]
  },
  {
    id: "kayu-manis",
    category: "Ingredients",
    name: "Kayu Manis (Cinnamon)",
    scientific: "Cinnamomum verum",
    img: "https://i0.wp.com/raisa.aeonstore.id/wp-content/uploads/2023/08/1097597.png?fit=1080%2C1080&ssl=1",
    description: "Rempah aromatik yang memberikan rasa manis alami dan aroma yang menenangkan.",
    stats: { aromatic: "High", sweet: "Medium" },
    benefits: ["Menyeimbangkan rasa", "Aroma terapi", "Anti-inflamasi"],
    madeJamu: ["Kunyit Asam", "Beras Kencur", "Kunci Suruh", "Immunity"],
    tastes: ["Sweet", "Woody"]
  },
  {
    id: "asam-jawa",
    category: "Ingredients",
    name: "Asam Jawa (Tamarind)",
    scientific: "Tamarindus indica",
    img: "https://lapakbuah.com/wp-content/uploads/2021/07/asam-jawa.jpg",
    description: "Buah yang melambangkan realitas hidup yang asam dan kaya akan Vitamin C.",
    stats: { sour: "100%", vitaminC: "High" },
    benefits: ["Pencernaan", "Antiseptik alami", "Penurun demam"],
    madeJamu: ["Kunyit Asam", "Beras Kencur", "Sinom", "Kunci Suruh", "Paitan", "Temulawak", "Anti Toxic", "All Loloh"],
    tastes: ["Sour", "Tangy"]
  },

  // --- LOLOH SERIES (BALI STYLE) ---
  {
    id: "loloh-piduh",
    category: "Loloh Series",
    name: "Loloh Piduh",
    scientific: "Centella asiatica",
    img: "https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?q=80&w=400",
    description: "Minuman herbal Bali yang menggunakan pegagan untuk kesehatan saraf.",
    stats: { brainHealth: "High", cooling: "Medium" },
    benefits: ["Meningkatkan daya ingat", "Hipertensi", "Wasir"],
    mainIngredients: [
      { item: "Pegagan (Piduh)", amount: "1 ikat", percentage: "60%" },
      { item: "Coconut Water", amount: "200ml", percentage: "40%" }
    ],
    steps: ["Cuci daun pegagan", "Tumbuk dan campur dengan air kelapa", "Saring dan minum segar"],
    equipment: ["Mortar", "Strainer"]
  },
  {
    id: "loloh-don-kayu-manis",
    category: "Loloh Series",
    name: "Loloh Don Kayu Manis",
    scientific: "Sauropus androgynus",
    img: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=400",
    description: "Menggunakan daun katuk, sangat populer untuk ibu menyusui di Bali.",
    stats: { lactation: "High", vitamins: "High" },
    benefits: ["Produksi ASI", "Anemia", "Sembelit"],
    mainIngredients: [
      { item: "Daun Katuk", amount: "100g", percentage: "70%" },
      { item: "Garam & Asam", amount: "secukupnya", percentage: "30%" }
    ],
    steps: ["Remas daun katuk dengan air", "Saring cairannya", "Tambahkan sedikit asam dan garam"],
    equipment: ["Bowl", "Fabric Strainer"]
  },

  // --- FUNCTIONAL JAMU ---
  {
    id: "jamu-immunity",
    category: "Functional Jamu",
    name: "Immunity Booster",
    scientific: "Curcuma & Zingiber Blend",
    img: "https://images.unsplash.com/photo-1544145945-f904253d0c7b?q=80&w=400",
    description: "Kombinasi kuat untuk memperkuat sistem pertahanan tubuh.",
    stats: { immunity: "100%", energy: "Medium" },
    benefits: ["Mencegah flu", "Anti-oksidan tinggi", "Vitalitas"],
    mainIngredients: [
      { item: "Temulawak", amount: "30g", percentage: "40%" },
      { item: "Jahe Merah", amount: "20g", percentage: "30%" },
      { item: "Meniran", amount: "10g", percentage: "30%" }
    ],
    steps: ["Rebus semua rimpang", "Tambahkan meniran di akhir", "Saring dan minum hangat"],
    equipment: ["Pot", "Strainer"]
  },
  {
    id: "jamu-anti-toxic",
    category: "Functional Jamu",
    name: "Anti Toxic / Detox",
    scientific: "Tinospora crispa & Curcuma",
    img: "https://images.unsplash.com/photo-1512149177596-f817c7ef5d4c?q=80&w=400",
    description: "Ramuan khusus untuk membersihkan racun dari aliran darah.",
    stats: { detox: "High", bitter: "High" },
    benefits: ["Membersihkan darah", "Alergi kulit", "Jerawat"],
    mainIngredients: [
      { item: "Brotowali", amount: "1 batang", percentage: "40%" },
      { item: "Sambiloto", amount: "5 lembar", percentage: "30%" },
      { item: "Temu Hitam", amount: "20g", percentage: "30%" }
    ],
    steps: ["Rebus brotowali dan temu hitam", "Masukkan sambiloto sebentar saja", "Saring"],
    equipment: ["Pot", "Strainer"]
  }
];