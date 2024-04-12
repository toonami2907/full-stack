import mongoose from "mongoose";


const ProductSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'please enter product name']
        },
        quantity: {
            type: Number,
            required: [true, 'please provide product quantity'],
            default: 0
        },
        price: {
            type: Number,
            required: [true, 'please provide product price'],
            default: 0
        },
    },
    {
        timestamps: true,
    }
);
const Product = mongoose.model('Product', ProductSchema);

export default Product;




