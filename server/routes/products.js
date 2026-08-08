import { Router } from 'express';
import mongoose, { Schema } from 'mongoose';

const ProductSchema = new Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true, index: true },
    price: { type: Number, required: true },
    currency: { type: String, default: 'INR' },
    colors: [String],
    sizes: [String],
    images: [String],
    isNewRelease: { type: Boolean, default: false },
    isBestseller: { type: Boolean, default: false },
}, { timestamps: true });

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

const router = Router();

// GET /api/products — Query with filters
router.get('/', async (req, res) => {
    try {
        const { category, search, minPrice, maxPrice, sort, page = '1', limit = '12' } = req.query;

        const queryFilter = {};

        if (category) {
            queryFilter.category = category;
        }

        if (search) {
            queryFilter.$or = [
                { name: { $regex: search, $options: 'i' } },
                { category: { $regex: search, $options: 'i' } },
            ];
        }

        if (minPrice || maxPrice) {
            queryFilter.price = {};
            if (minPrice) queryFilter.price.$gte = Number(minPrice);
            if (maxPrice) queryFilter.price.$lte = Number(maxPrice);
        }

        let sortOption = { createdAt: -1 };
        if (sort === 'price-asc') sortOption = { price: 1 };
        if (sort === 'price-desc') sortOption = { price: -1 };

        const pageNum = parseInt(page, 10);
        const limitNum = parseInt(limit, 10);
        const skip = (pageNum - 1) * limitNum;

        const [products, total] = await Promise.all([
            Product.find(queryFilter).sort(sortOption).skip(skip).limit(limitNum).lean(),
            Product.countDocuments(queryFilter),
        ]);

        return res.status(200).json({
            success: true,
            data: products,
            pagination: {
                total,
                page: pageNum,
                pages: Math.ceil(total / limitNum),
            },
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Server error retrieving products', error });
    }
});

export default router;
