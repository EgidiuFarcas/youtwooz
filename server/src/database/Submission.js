import mongoose from 'mongoose';

/**
 * type (2d/3d/2-3d)
 * hasBox
 * name
 * description
 * categoryID
 * price
 * height
 * submitterID
 * 2dartist
 * 3dartist
 * image2d
 * image3d
 * imagebox
 * status (pending/published/suspended)
 * statusMessage
 */

const submissionSchema = new mongoose.Schema({
    type: { type: Number, required: true, min: 0, max: 2},
    hasBox: { type: Boolean, required: true, default: false},
    name: { type: String, required: true, min: 6, max: 255 },
    description: { type: String, required: true, min: 255, max: 5120},
    categoryID: { type: String, required: true},
    priceID: { type: String, required: true},
    height: { type: Number, required: true},
    submitterID: { type: String, required: true},
    artist2d: { type: String},
    artist3d: { type: String},
    image2d: { type: String},
    image3d: { type: String},
    imageBox: { type: String},
    status: { type: String, required: true, default: "pending"},
    statusMessage: { type: String, required: true, default: "New submission"}
}, {timestamps: true});

export default mongoose.model('Submission', submissionSchema);