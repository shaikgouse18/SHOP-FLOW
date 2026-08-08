import { db } from './lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

const mockProducts = [
    // Electronics
    {
        name: "Wireless ANC Headphones",
        category: "Electronics",
        description: "Premium noise-canceling wireless headphones with 40-hour battery life and spatial audio support.",
        price: 14999,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
        reviews: []
    },
    {
        name: "4K Action Camera",
        category: "Electronics",
        description: "Waterproof action camera capable of recording 4K video at 60fps with image stabilization.",
        price: 24500,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&q=80",
        reviews: []
    },

    // Accessories
    {
        name: "Minimalist Leather Wallet",
        category: "Accessories",
        description: "Slim genuine leather wallet with RFID blocking and 6 card slots.",
        price: 1299,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80",
        reviews: []
    },
    {
        name: "Polarized Aviator Sunglasses",
        category: "Accessories",
        description: "Classic aviator sunglasses with polarized lenses and UV400 protection.",
        price: 1850,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80",
        reviews: []
    },

    // Bags
    {
        name: "Canvas Messenger Bag",
        category: "Bags",
        description: "Durable vintage canvas messenger bag for laptops up to 15.6 inches.",
        price: 2499,
        rating: 4.4,
        image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80",
        reviews: []
    },
    {
        name: "Hiking Backpack 45L",
        category: "Bags",
        description: "Waterproof outdoor hiking backpack with ergonomic straps and rain cover.",
        price: 3600,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
        reviews: []
    },

    // Clothing
    {
        name: "Men's Oxford Button-Down Shirt",
        category: "Clothing",
        description: "Classic fit oxford cotton shirt in light blue. Perfect for business casual setups.",
        price: 1450,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1596755094514-f87e32f85e2c?w=800&q=80",
        reviews: []
    },
    {
        name: "Women's Denim Jacket",
        category: "Clothing",
        description: "Vintage wash relaxed fit denim jacket with silver-tone buttons.",
        price: 2199,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1544441892-794166f1e31c?w=800&q=80",
        reviews: []
    },

    // Home
    {
        name: "Ceramic Coffee Pour-Over Set",
        category: "Home",
        description: "Elegant ceramic pour-over coffee dripper with matching mug.",
        price: 1890,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?w=800&q=80",
        reviews: []
    },
    {
        name: "Geometric Accent Pillow",
        category: "Home",
        description: "Soft velvet accent throw pillow with modern geometric patterns.",
        price: 850,
        rating: 4.3,
        image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=800&q=80",
        reviews: []
    },

    // Footwear
    {
        name: "Running Sneakers Pro",
        category: "Footwear",
        description: "Lightweight athletic sneakers with responsive foam cushioning.",
        price: 4999,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
        reviews: []
    },
    {
        name: "Leather Chelsea Boots",
        category: "Footwear",
        description: "Premium smooth leather chelsea boots with elastic side panels.",
        price: 5800,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=800&q=80",
        reviews: []
    },

    // Stationery
    {
        name: "Fountain Pen with Gold Nib",
        category: "Stationery",
        description: "Luxury matte black fountain pen with fine 14K gold nib.",
        price: 8500,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1585336261022-680e295ce3fe?w=800&q=80",
        reviews: []
    },
    {
        name: "Dot Grid Hardcover Journal",
        category: "Stationery",
        description: "160 pages of thick dot grid paper in a durable vegan leather cover.",
        price: 650,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&q=80",
        reviews: []
    }
];

export const seedDatabase = async () => {
    console.log("Seeding database...");
    try {
        for (const product of mockProducts) {
            const docRef = await addDoc(collection(db, 'products'), product);
            console.log("Added document with ID: ", docRef.id);
        }
        console.log("Seeding complete!");
    } catch (e) {
        console.error("Error adding document: ", e);
    }
};
