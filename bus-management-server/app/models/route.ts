import {IRoute } from '../interfaces/IRoute';
import mongoose from 'mongoose';

const Route = new mongoose.Schema(
    {
        name:{
            type: String,
            required: [true, 'Please provide complete title'],
            index: true
        },
        stops:[mongoose.Schema.Types.Mixed],

},{
    timestamps: true
})
// Route.index({"stops": "2dsphere"})


export default mongoose.model<IRoute & mongoose.Document>('Route', Route)