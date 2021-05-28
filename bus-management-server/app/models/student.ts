import {IStudent } from '../interfaces/IStudent';
import mongoose from 'mongoose';

const Student = new mongoose.Schema(
    {
        name:{
            type: String,
            required: [true, 'Please provide full name'],
            index: true
        },
        systemId:{
            type: String,
            required: [true, 'Please provide correct Roll Number'],
            index: true
        },
        email:{
            type: String,
            unique: true,
            index: true,
            lowecase: true
        },
        password:{
            type: String
        },
        sex:{
            type: String, 
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
            required:false
        },
        department:{
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Department",
            required:false
        },
        verified:{
            type: Boolean,
            default: false
        },
        slipPhoto:{
            type: String,
            required: false
        },
        slipVerified: {
            type: Boolean,
            default: false,
            required: false
        }

}
,{
    timestamps: true
})

export default mongoose.model<IStudent & mongoose.Document>('Student', Student)