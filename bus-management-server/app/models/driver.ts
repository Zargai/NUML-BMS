import {IDriver } from '../interfaces/IDriver';
import mongoose from 'mongoose';

const Driver = new mongoose.Schema(
    {
        name:{
            type: String,
            required: [true, 'Please provide full name'],
            index: true
        },
        phone:{
            type: String,
            required: false
        },
        photo:{
            type:String,
            required: false
        },
        assignedBus:{
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Bus",
            required: false
        }
}
,{
    timestamps: true
})

export default mongoose.model<IDriver & mongoose.Document>('Driver', Driver)