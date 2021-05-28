import {IStop } from '../interfaces/IStop';
import mongoose from 'mongoose';

const Shop = new mongoose.Schema(
    {
        number:{
            type: String,
            required: [true, 'Please provide complete title'],
            index: true
        },
        title:{
            type: String,
            lowecase: true,
            required:false
        },
        location: {
            type: { type: String },
            coordinates: []
          }

},{
    timestamps: true
})
Shop.index({ "location": "2dsphere" });

export default mongoose.model<IStop & mongoose.Document>('Shop', Shop)