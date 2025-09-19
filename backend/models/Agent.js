import mongoose from "mongoose";
import bcrypt from "bcryptjs";


const agentSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Please enter your name"],
        trim: true
    },
    email:{
        type: String,
        required: [true, "Please enter your email"],
        unique: true
    },
    mobile:{
        type: String,
        required: [true, "Please enter your mobile number"]
    },
    password:{
        type: String,
        required: [true, "Please enter your password"],
        select: false
    }
}, {timestamps: true});


// Hash password before saving
agentSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

export default mongoose.model("Agent", agentSchema);