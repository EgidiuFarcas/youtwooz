import mongoose from 'mongoose';
import randToken from 'rand-token';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, min: 6, max: 255 },
    email: { type: String, required: true, min: 6, max: 255, unique: true },
    password: { type: String, require: true, min: 6, max: 1024 },
    verified: { type: Boolean, default: false },
    verifyToken: { type: String, default: () => randToken.generate(64)}
}, {timestamps: true});

export default mongoose.model('User', userSchema);