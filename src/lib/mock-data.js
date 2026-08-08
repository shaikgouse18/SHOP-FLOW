export const MOCK_PRODUCTS = [
    // --- MEN'S FASHION (4 Items) ---
    {
        id: "prod-1",
        name: "AeroShield Thermal Parka",
        description: "Engineered for harsh winter climates, featuring wind-resistant micro-twill fabric, recycled thermal insulation, and a water-repellent matte finish.",
        price: 18999,
        compareAtPrice: 24999,
        category: "Men's Fashion",
        tags: ["Bestseller", "Winter Essential"],
        stockStatus: "in_stock",
        stockCount: 18,
        rating: 4.9,
        reviewCount: 42,
        colors: ["Obsidian Black", "Graphite Gray", "Deep Navy"],
        sizes: ["S", "M", "L", "XL", "XXL"],
        images: [
            "https://images.unsplash.com/photo-1544441893-675973e31985?w=800&q=80",
            "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&q=80",
            "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800&q=80",
            "https://images.unsplash.com/photo-1548883354-7622d03aca27?w=800&q=80"
        ],
        reviews: [
            { id: "rev-1", userEmail: "alex.m@example.com", rating: 5, comment: "Incredible warmth and rain resistance. Worth every rupee!", createdAt: 1705000000000 },
            { id: "rev-2", userEmail: "sara.k@example.com", rating: 5, comment: "The dark minimalist aesthetic is perfect. Super comfortable.", createdAt: 1706000000000 }
        ]
    },
    {
        id: "prod-6",
        name: "Minimalist Italian Wool Blazer",
        description: "Slim-fit single-breasted suit blazer tailored from 100% Super 130s Merino wool with horn buttons and silk interior lining.",
        price: 16499,
        compareAtPrice: 21999,
        category: "Men's Fashion",
        tags: ["Formal", "Hand-Tailored"],
        stockStatus: "in_stock",
        stockCount: 15,
        rating: 4.8,
        reviewCount: 22,
        colors: ["Charcoal Grey", "Midnight Black", "Camel"],
        sizes: ["38R", "40R", "42R", "44R"],
        images: [
            "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80",
            "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80",
            "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80"
        ],
        reviews: [
            { id: "rev-7", userEmail: "greg.t@example.com", rating: 5, comment: "Fits like it was tailor-made for me right out of the box.", createdAt: 1706500000000 }
        ]
    },
    {
        id: "prod-9",
        name: "Artisan Japanese Denim Jacket",
        description: "14.5oz selvedge denim jacket woven on vintage looms in Kojima, Japan. Raw indigo finish with custom copper rivets.",
        price: 13999,
        compareAtPrice: 17999,
        category: "Men's Fashion",
        tags: ["Selvedge Denim", "Iconic"],
        stockStatus: "low_stock",
        stockCount: 3,
        rating: 4.8,
        reviewCount: 31,
        colors: ["Raw Indigo", "Washed Black"],
        sizes: ["S", "M", "L", "XL"],
        images: [
            "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&q=80",
            "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80",
            "https://images.unsplash.com/photo-1601333144130-8cbb312386b6?w=800&q=80"
        ],
        reviews: [
            { id: "rev-10", userEmail: "kenji.s@example.com", rating: 5, comment: "Authentic heavy selvedge denim. Will wear this for decades.", createdAt: 1705500000000 }
        ]
    },
    {
        id: "prod-15",
        name: "Heavyweight Oversized Hoodie",
        description: "480GSM organic French terry cotton hoodie featuring double-layered hood, drop-shoulder silhouette, and hidden side seam pockets.",
        price: 5499,
        compareAtPrice: 6999,
        category: "Men's Fashion",
        tags: ["Streetwear", "Essential"],
        stockStatus: "in_stock",
        stockCount: 28,
        rating: 4.8,
        reviewCount: 94,
        colors: ["Washed Onyx", "Sage Green", "Bone White"],
        sizes: ["S", "M", "L", "XL"],
        images: [
            "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&q=80",
            "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=800&q=80",
            "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=800&q=80"
        ],
        reviews: [
            { id: "rev-16", userEmail: "todd.f@example.com", rating: 5, comment: "Super heavy fabric that holds its boxy structure after multiple washes.", createdAt: 1707700000000 }
        ]
    },
    {
        id: "prod-23",
        name: "Classic Lambskin Leather Biker Jacket",
        description: "100% supple lambskin leather motorcycle jacket with asymmetric silver hardware zips and quilted interior lining.",
        price: 19999,
        compareAtPrice: 24999,
        category: "Men's Fashion",
        tags: ["Leather", "Timeless"],
        stockStatus: "in_stock",
        stockCount: 8,
        rating: 4.9,
        reviewCount: 47,
        colors: ["Jet Black", "Antique Brown"],
        sizes: ["S", "M", "L", "XL"],
        images: [
            "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80",
            "https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?w=800&q=80",
            "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&q=80"
        ],
        reviews: [
            { id: "rev-24", userEmail: "chloe.b@example.com", rating: 5, comment: "Lambskin is insanely soft yet structured. Perfect edge to any outfit.", createdAt: 1707400000000 }
        ]
    },

    // --- WOMEN'S FASHION (4 Items) ---
    {
        id: "prod-10",
        name: "Ethereal Silk Trench Coat",
        description: "Flowing double-breasted trench coat crafted from water-resistant Mulberry silk-blend fabric with adjustable waist belt and horn buttons.",
        price: 21999,
        compareAtPrice: 27999,
        category: "Women's Fashion",
        tags: ["Luxury Outerwear", "New Arrival"],
        stockStatus: "in_stock",
        stockCount: 14,
        rating: 4.9,
        reviewCount: 35,
        colors: ["Champagne Beige", "Midnight Onyx", "Sage Green"],
        sizes: ["XS", "S", "M", "L"],
        images: [
            "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&q=80",
            "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80",
            "https://images.unsplash.com/photo-1544441893-675973e31985?w=800&q=80"
        ],
        reviews: [
            { id: "rev-11w", userEmail: "sophia.t@example.com", rating: 5, comment: "Drapes beautifully and keeps rain off seamlessly. Truly elegant silhouette.", createdAt: 1706900000000 }
        ]
    },
    {
        id: "prod-12",
        name: "Velvet Evening Wrap Dress",
        description: "Sculpted wrap midi dress in plush deep emerald velvet with flared sleeves and a soft asymmetric hemline.",
        price: 12999,
        compareAtPrice: 16999,
        category: "Women's Fashion",
        tags: ["Evening Wear", "Bestseller"],
        stockStatus: "in_stock",
        stockCount: 16,
        rating: 4.8,
        reviewCount: 48,
        colors: ["Emerald Green", "Burgundy Wine", "Jet Black"],
        sizes: ["XS", "S", "M", "L", "XL"],
        images: [
            "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80",
            "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800&q=80",
            "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80"
        ],
        reviews: [
            { id: "rev-13w", userEmail: "aria.m@example.com", rating: 5, comment: "The velvet fabric feels so luxurious and rich. Fits like a glove!", createdAt: 1707100000000 }
        ]
    },
    {
        id: "prod-16",
        name: "Tailored Cashmere Knit Sweater",
        description: "100% Mongolian 2-ply cashmere sweater with ribbed crew neck collar and ultra-soft cloud finish.",
        price: 14999,
        compareAtPrice: 19999,
        category: "Women's Fashion",
        tags: ["Cashmere", "Knitwear"],
        stockStatus: "in_stock",
        stockCount: 18,
        rating: 4.9,
        reviewCount: 27,
        colors: ["Oatmeal Cream", "Charcoal Heather", "Blush Pink"],
        sizes: ["XS", "S", "M", "L"],
        images: [
            "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=800&q=80",
            "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&q=80",
            "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80"
        ],
        reviews: [
            { id: "rev-17w", userEmail: "hannah.g@example.com", rating: 5, comment: "Incredibly warm and soft against sensitive skin.", createdAt: 1706700000000 }
        ]
    },
    {
        id: "prod-19",
        name: "High-Waisted Structured Trousers",
        description: "Pinch-pleated high-waisted trousers woven from stretch crepe with a clean tapered ankle drape.",
        price: 7999,
        compareAtPrice: 9999,
        category: "Women's Fashion",
        tags: ["Workwear", "Chic"],
        stockStatus: "in_stock",
        stockCount: 22,
        rating: 4.7,
        reviewCount: 39,
        colors: ["Charcoal Slate", "Ivory Cream", "Deep Navy"],
        sizes: ["XS", "S", "M", "L"],
        images: [
            "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&q=80",
            "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80",
            "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80"
        ],
        reviews: [
            { id: "rev-20w", userEmail: "chloe.p@example.com", rating: 5, comment: "Extremely flattering waistline. Great for corporate or casual wear.", createdAt: 1707500000000 }
        ]
    },

    // --- ELECTRONICS (4 Items) ---
    {
        id: "prod-2",
        name: "Vanguard ANC Wireless Headphones",
        description: "Active Noise Cancelling over-ear headphones with custom 40mm titanium drivers, 40-hour battery life, and ultra-soft memory foam earcups.",
        price: 14999,
        compareAtPrice: 19999,
        category: "Electronics",
        tags: ["New", "Premium Audio"],
        stockStatus: "in_stock",
        stockCount: 25,
        rating: 4.8,
        reviewCount: 38,
        colors: ["Space Black", "Matte Silver"],
        sizes: ["Standard"],
        images: [
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
            "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&q=80",
            "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&q=80",
            "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&q=80"
        ],
        reviews: [
            { id: "rev-3", userEmail: "devon.r@example.com", rating: 5, comment: "The noise cancellation isolates everything on flights. Soundstage is wide and punchy.", createdAt: 1707000000000 }
        ]
    },
    {
        id: "prod-8",
        name: "Precision Mechanical Keyboard Pro",
        description: "Compact 75% hot-swappable wireless mechanical keyboard with CNC aluminum chassis, gasket mount, RGB backlighting, and lubricated switches.",
        price: 10999,
        compareAtPrice: 13999,
        category: "Electronics",
        tags: ["Setup Upgrade", "Bestseller"],
        stockStatus: "in_stock",
        stockCount: 35,
        rating: 4.9,
        reviewCount: 88,
        colors: ["Anodized Dark Gray", "Chalk White"],
        sizes: ["75% Layout"],
        images: [
            "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80",
            "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=800&q=80",
            "https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&q=80"
        ],
        reviews: [
            { id: "rev-9", userEmail: "vikram.r@example.com", rating: 5, comment: "The typing sound profile is deep and marble-like. Outstanding build quality.", createdAt: 1707500000000 }
        ]
    },
    {
        id: "prod-14",
        name: "Studio Reference Wireless Earbuds",
        description: "Compact true wireless earbuds with custom planar magnetic drivers, active transparency mode, and IPX7 sweat resistance.",
        price: 8499,
        compareAtPrice: 10999,
        category: "Electronics",
        tags: ["Compact Audio", "IPX7"],
        stockStatus: "in_stock",
        stockCount: 45,
        rating: 4.7,
        reviewCount: 52,
        colors: ["Midnight Dark", "Pearl Ceramic"],
        sizes: ["S/M/L Tips Included"],
        images: [
            "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80",
            "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=800&q=80",
            "https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=800&q=80"
        ],
        reviews: [
            { id: "rev-15", userEmail: "zoe.m@example.com", rating: 5, comment: "Bass response is super clean and treble is crisp without harshness.", createdAt: 1705800000000 }
        ]
    },
    {
        id: "prod-24",
        name: "Ultrawide Curved OLED Gaming Monitor 34\"",
        description: "34-inch 175Hz 0.03ms QD-OLED curved display with HDR True Black 400, 99.3% DCI-P3 color gamut, and ambient lighting.",
        price: 69999,
        compareAtPrice: 84999,
        category: "Electronics",
        tags: ["OLED", "Ultimate Display"],
        stockStatus: "in_stock",
        stockCount: 6,
        rating: 4.9,
        reviewCount: 29,
        colors: ["Dark Metallic Gray"],
        sizes: ["34 Inch Ultrawide"],
        images: [
            "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&q=80",
            "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80",
            "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=800&q=80"
        ],
        reviews: [
            { id: "rev-25", userEmail: "marcus.k@example.com", rating: 5, comment: "Black levels are infinite and motion handling is flawless. Insane display.", createdAt: 1708100000000 }
        ]
    },

    // --- ACCESSORIES (4 Items) ---
    {
        id: "prod-4",
        name: "Chronos Obsidian Automatic Watch",
        description: "Automatic mechanical wristwatch featuring a sapphire crystal glass, 316L stainless steel case, and 100m water resistance.",
        price: 22999,
        compareAtPrice: 28999,
        category: "Accessories",
        tags: ["Luxury", "Trending"],
        stockStatus: "in_stock",
        stockCount: 12,
        rating: 4.9,
        reviewCount: 56,
        colors: ["All Black", "Midnight Blue / Silver"],
        sizes: ["42mm"],
        images: [
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
            "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&q=80",
            "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?w=800&q=80",
            "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=800&q=80"
        ],
        reviews: [
            { id: "rev-5", userEmail: "marcus.v@example.com", rating: 5, comment: "Absolute masterpiece. Sweeping second hand is buttery smooth.", createdAt: 1708000000000 }
        ]
    },
    {
        id: "prod-11",
        name: "Polarized Aviator Sunglasses",
        description: "Ultralight titanium frame aviator sunglasses featuring scratch-resistant polarized lenses with 100% UV400 protection.",
        price: 4999,
        compareAtPrice: 6999,
        category: "Accessories",
        tags: ["UV Protection", "Classic"],
        stockStatus: "in_stock",
        stockCount: 40,
        rating: 4.6,
        reviewCount: 50,
        colors: ["Gunmetal / Dark Gray Lens", "Gold / G15 Green Lens", "Matte Black"],
        sizes: ["Standard"],
        images: [
            "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80",
            "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&q=80",
            "https://images.unsplash.com/photo-1508296695146-257a814070b4?w=800&q=80"
        ],
        reviews: [
            { id: "rev-12", userEmail: "claire.p@example.com", rating: 5, comment: "Featherlight on the face and crystal clear optics.", createdAt: 1704200000000 }
        ]
    },
    {
        id: "prod-18",
        name: "Minimalist Italian Calfskin Wallet",
        description: "Slim bifold wallet with RFID blocking technology, 6 card slots, and full-grain vegetable-tanned leather finish.",
        price: 2999,
        compareAtPrice: 3999,
        category: "Accessories",
        tags: ["RFID Protection", "Everyday Carry"],
        stockStatus: "in_stock",
        stockCount: 35,
        rating: 4.8,
        reviewCount: 63,
        colors: ["Matte Black", "Tobacco Brown"],
        sizes: ["Slim Bifold"],
        images: [
            "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80",
            "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
            "https://images.unsplash.com/photo-1606503153255-59d8b8b82176?w=800&q=80"
        ],
        reviews: [
            { id: "rev-19", userEmail: "derek.v@example.com", rating: 5, comment: "Super slim profile. Doesn't create any bulge in back pocket.", createdAt: 1706400000000 }
        ]
    },
    {
        id: "prod-25",
        name: "Architectural Matte Black Ring",
        description: "Laser-etched tungsten carbide band with bevelled matte edges and hypoallergenic comfort fit.",
        price: 3499,
        compareAtPrice: 4499,
        category: "Accessories",
        tags: ["Tungsten", "Minimalist"],
        stockStatus: "in_stock",
        stockCount: 20,
        rating: 4.9,
        reviewCount: 19,
        colors: ["Obsidian Matte"],
        sizes: ["US 8", "US 9", "US 10", "US 11"],
        images: [
            "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80",
            "https://images.unsplash.com/photo-1598560917505-59a3ad559071?w=800&q=80",
            "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80"
        ],
        reviews: [
            { id: "rev-25a", userEmail: "leo.k@example.com", rating: 5, comment: "Scratch resistant and has a great substantial weight to it.", createdAt: 1706300000000 }
        ]
    },

    // --- FOOTWEAR (4 Items) ---
    {
        id: "prod-5",
        name: "Phantom Stealth Running Sneakers",
        description: "Ultra-lightweight mesh sneakers with responsive nitro foam cushioning, carbon plate propulsion, and high-traction rubber outsole.",
        price: 8999,
        compareAtPrice: 11999,
        category: "Footwear",
        tags: ["Performance", "New Arrival"],
        stockStatus: "in_stock",
        stockCount: 30,
        rating: 4.7,
        reviewCount: 64,
        colors: ["Triple Black", "Cyber Green", "Neon Slate"],
        sizes: ["UK 7", "UK 8", "UK 9", "UK 10", "UK 11"],
        images: [
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
            "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&q=80",
            "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=800&q=80",
            "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80"
        ],
        reviews: [
            { id: "rev-6", userEmail: "trent.b@example.com", rating: 5, comment: "Running feels effortless. Perfect fit and zero blisters.", createdAt: 1707200000000 }
        ]
    },
    {
        id: "prod-12b",
        name: "Chelsea Leather Boots Obsidian Edition",
        description: "Sleek ankle-high Chelsea boots crafted from calfskin leather with Goodyear welt construction and durable Vibram rubber soles.",
        price: 11999,
        compareAtPrice: 15499,
        category: "Footwear",
        tags: ["Goodyear Welt", "Timeless"],
        stockStatus: "in_stock",
        stockCount: 14,
        rating: 4.8,
        reviewCount: 39,
        colors: ["Polished Black", "Dark Chestnut"],
        sizes: ["UK 7", "UK 8", "UK 9", "UK 10", "UK 11"],
        images: [
            "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=800&q=80",
            "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&q=80",
            "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=800&q=80"
        ],
        reviews: [
            { id: "rev-13b", userEmail: "nathan.k@example.com", rating: 5, comment: "Unbeatable quality. Versatile for both dressed up and casual wear.", createdAt: 1707900000000 }
        ]
    },
    {
        id: "prod-26",
        name: "AeroGrip Trail Hiking Boots",
        description: "Waterproof Vibram-sole trail hiking boots with Gore-Tex lining, reinforced rubber toe cap, and shock-absorbing EVA midsole.",
        price: 13499,
        compareAtPrice: 16999,
        category: "Footwear",
        tags: ["Outdoor", "Waterproof"],
        stockStatus: "in_stock",
        stockCount: 16,
        rating: 4.9,
        reviewCount: 28,
        colors: ["Charcoal / Orange", "All Black GTX"],
        sizes: ["UK 7", "UK 8", "UK 9", "UK 10"],
        images: [
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
            "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&q=80",
            "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=800&q=80"
        ],
        reviews: [
            { id: "rev-20b", userEmail: "mason.j@example.com", rating: 5, comment: "Tested on rugged muddy trails. Stayed completely dry and confident.", createdAt: 1707300000000 }
        ]
    },
    {
        id: "prod-27",
        name: "Urban Minimalist Leather Loafers",
        description: "Handcrafted penny loafers made from full-grain Nappa leather with memory foam insoles.",
        price: 9499,
        compareAtPrice: 12499,
        category: "Footwear",
        tags: ["Casual Luxury", "Nappa Leather"],
        stockStatus: "in_stock",
        stockCount: 22,
        rating: 4.8,
        reviewCount: 31,
        colors: ["Deep Espresso", "Midnight Black"],
        sizes: ["UK 7", "UK 8", "UK 9", "UK 10"],
        images: [
            "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=800&q=80",
            "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&q=80",
            "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=800&q=80"
        ],
        reviews: [
            { id: "rev-27a", userEmail: "clark.e@example.com", rating: 5, comment: "Fits true to size and feels soft from day one.", createdAt: 1706600000000 }
        ]
    },

    // --- BAGS (4 Items) ---
    {
        id: "prod-3",
        name: "Nomad Leather Weekender Duffle",
        description: "Handcrafted full-grain Italian leather duffle bag with reinforced brass hardware, shoe compartment, and padded laptop sleeve.",
        price: 12499,
        compareAtPrice: 15999,
        category: "Bags",
        tags: ["Handmade", "Travel"],
        stockStatus: "low_stock",
        stockCount: 4,
        rating: 4.9,
        reviewCount: 29,
        colors: ["Vintage Cognac", "Espresso Dark Brown", "Charcoal Black"],
        sizes: ["45L"],
        images: [
            "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
            "https://images.unsplash.com/photo-1547949003-9792a18a2601?w=800&q=80",
            "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800&q=80"
        ],
        reviews: [
            { id: "rev-4", userEmail: "priya.s@example.com", rating: 5, comment: "The leather smells amazing and gets a beautiful patina over time.", createdAt: 1704500000000 }
        ]
    },
    {
        id: "prod-21",
        name: "Apex Carbon Fiber Carry-On Suitcase",
        description: "Polycarbonate and carbon-fiber hard-shell carry-on with Japanese Hinomoto 360° silent spinner wheels and TSA magnetic latch locks.",
        price: 17999,
        compareAtPrice: 22999,
        category: "Bags",
        tags: ["Carbon Fiber", "TSA Approved"],
        stockStatus: "in_stock",
        stockCount: 11,
        rating: 4.9,
        reviewCount: 33,
        colors: ["Matte Carbon Black", "Stealth Silver"],
        sizes: ["21-Inch Carry-On"],
        images: [
            "https://images.unsplash.com/photo-1565026057447-ba90a3d07d6b?w=800&q=80",
            "https://images.unsplash.com/photo-1547949003-9792a18a2601?w=800&q=80",
            "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800&q=80"
        ],
        reviews: [
            { id: "rev-22", userEmail: "brandon.t@example.com", rating: 5, comment: "Glides effortlessly through airports. The wheels are dead quiet.", createdAt: 1707800000000 }
        ]
    },
    {
        id: "prod-28",
        name: "Urban Modular Tech Backpack",
        description: "Waterproof 30L expandable commuter backpack with magnetic Fidlock buckles, anti-theft hidden pockets, and TSA flat laptop compartment.",
        price: 7999,
        compareAtPrice: 9999,
        category: "Bags",
        tags: ["Waterproof", "Commuter"],
        stockStatus: "in_stock",
        stockCount: 22,
        rating: 4.7,
        reviewCount: 45,
        colors: ["Tactical Black", "Olive Drab", "Slate Grey"],
        sizes: ["30L"],
        images: [
            "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
            "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800&q=80",
            "https://images.unsplash.com/photo-1547949003-9792a18a2601?w=800&q=80"
        ],
        reviews: [
            { id: "rev-28a", userEmail: "david.c@example.com", rating: 5, comment: "Fidlock buckles are super convenient. Comfortably fits 16-inch MBP.", createdAt: 1706800000000 }
        ]
    },
    {
        id: "prod-29",
        name: "Minimalist Leather Tote Bag",
        description: "Spacious full-grain tote bag with magnetic clasp closure, internal zipper pouch, and key lanyard.",
        price: 8999,
        compareAtPrice: 11499,
        category: "Bags",
        tags: ["Work & Travel", "Full Grain"],
        stockStatus: "in_stock",
        stockCount: 17,
        rating: 4.8,
        reviewCount: 26,
        colors: ["Warm Tan", "Jet Black"],
        sizes: ["One Size"],
        images: [
            "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80",
            "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
            "https://images.unsplash.com/photo-1547949003-9792a18a2601?w=800&q=80"
        ],
        reviews: [
            { id: "rev-29a", userEmail: "monica.l@example.com", rating: 5, comment: "Holds laptop, water bottle, and notebooks easily without bulging.", createdAt: 1707000000000 }
        ]
    },

    // --- HOME (4 Items) ---
    {
        id: "prod-7",
        name: "Luminary Sculptural Ceramic Desk Lamp",
        description: "Architectural LED ambient desk lamp crafted from matte textured ceramic with touch-dimmable warm illumination (2700K - 5000K).",
        price: 6499,
        compareAtPrice: 8999,
        category: "Home",
        tags: ["Smart Lighting", "Design Icon"],
        stockStatus: "in_stock",
        stockCount: 20,
        rating: 4.6,
        reviewCount: 19,
        colors: ["Sand Stone", "Matte Charcoal", "Terracotta"],
        sizes: ["One Size"],
        images: [
            "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80",
            "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&q=80",
            "https://images.unsplash.com/photo-1540932239986-30128078f3c5?w=800&q=80"
        ],
        reviews: [
            { id: "rev-8", userEmail: "elena.h@example.com", rating: 4, comment: "Minimalist design looks stunning on my home office desk.", createdAt: 1703000000000 }
        ]
    },
    {
        id: "prod-13",
        name: "Modern Ergonomic Mesh Executive Chair",
        description: "High-back ergonomic task chair with dynamic lumbar support, breathable 3D mesh fabric, 4D adjustable armrests, and synchro-tilt mechanism.",
        price: 24999,
        compareAtPrice: 32999,
        category: "Home",
        tags: ["Ergonomic", "Workspace"],
        stockStatus: "in_stock",
        stockCount: 9,
        rating: 4.9,
        reviewCount: 71,
        colors: ["All Obsidian", "Space Grey / Chrome"],
        sizes: ["Adjustable"],
        images: [
            "https://images.unsplash.com/photo-1580481072645-022f9a6d83d0?w=800&q=80",
            "https://images.unsplash.com/photo-1505797149-43b0069ec26b?w=800&q=80",
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80"
        ],
        reviews: [
            { id: "rev-14", userEmail: "sam.l@example.com", rating: 5, comment: "Cured my lower back pain after long coding sessions. Highly recommend!", createdAt: 1706100000000 }
        ]
    },
    {
        id: "prod-20",
        name: "Pour-Over Precision Coffee Dripper Set",
        description: "Heat-resistant borosilicate glass coffee carafe with double-mesh stainless steel filter and matte black walnut collar.",
        price: 3999,
        compareAtPrice: 4999,
        category: "Home",
        tags: ["Coffee Culture", "Artisan"],
        stockStatus: "in_stock",
        stockCount: 24,
        rating: 4.8,
        reviewCount: 41,
        colors: ["Clear Glass / Black Walnut"],
        sizes: ["800ml / 4 Cups"],
        images: [
            "https://images.unsplash.com/photo-1517668808822-9ebe02f2a698?w=800&q=80",
            "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&q=80",
            "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80"
        ],
        reviews: [
            { id: "rev-21", userEmail: "olivia.d@example.com", rating: 5, comment: "Makes the cleanest cup of pour-over coffee I've ever brewed.", createdAt: 1705900000000 }
        ]
    },
    {
        id: "prod-30",
        name: "Acoustic Wood Slat Wall Panel",
        description: "Acoustic sound-absorbing wall panel crafted from natural oak slats over recycled felt backing.",
        price: 8499,
        compareAtPrice: 10999,
        category: "Home",
        tags: ["Studio Setup", "Acoustics"],
        stockStatus: "in_stock",
        stockCount: 15,
        rating: 4.9,
        reviewCount: 34,
        colors: ["Smoked Oak", "Natural Walnut"],
        sizes: ["240cm x 60cm"],
        images: [
            "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80",
            "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80",
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80"
        ],
        reviews: [
            { id: "rev-30a", userEmail: "felix.w@example.com", rating: 5, comment: "Dramatically improved room acoustics for recording and looks ultra sleek.", createdAt: 1707600000000 }
        ]
    }
];
