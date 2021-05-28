import {IBus } from '../interfaces/IBus';
import mongoose from 'mongoose';

const Bus = new mongoose.Schema(
    {
        name:{
            type: String,
            required: [true, 'Please provide complete title'],
            index: true
        },
        capacity:{
            type: Number,
            required:false
        },
        assignedRoute:{
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Route",
            required: false
        },
        assignedDriver:{
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Driver",
            required: false
        }

},{
    timestamps: true
})

export default mongoose.model<IBus & mongoose.Document>('Bus', Bus)