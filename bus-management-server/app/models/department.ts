import {IDepartment } from '../interfaces/IDepartment';
import mongoose from 'mongoose';

const Department = new mongoose.Schema(
    {
        title:{
            type: String,
            required: [true, 'Please provide complete title'],
            index: true
        }
},{
    timestamps: true
})
// Department.index({ "location": "2dsphere" });

export default mongoose.model<IDepartment & mongoose.Document>('Department', Department)