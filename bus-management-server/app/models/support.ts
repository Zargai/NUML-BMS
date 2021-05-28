import {ISupport } from '../interfaces/ISupport';
import mongoose from 'mongoose';

const Support = new mongoose.Schema(
    {
        title:{
            type: String,
            required: [true, 'Please provide complete title'],
            index: true
        },
        message:{
            type: String, 
            required: true
        },
        status:{
            type: String,
            required: false,
            default:'active'
        },
        studentId:{
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Student",
            required: false
        }
},{
    timestamps: true
})
// Support.index({ "location": "2dsphere" });

export default mongoose.model<ISupport & mongoose.Document>('Support', Support)