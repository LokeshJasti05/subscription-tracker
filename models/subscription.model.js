import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Subscription Name is required"],
        trim: true,
        minLength:2,
        maxLength: 100,
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
        min: [0, "Price must be positive"],
    },
    currency: {
        type: String,
        enum: ['USD','EUR','INR'],
        default: 'INR',
    },
    frequency: {
        type: String,
        enum: ['daily','weekly','monthly','yearly'],
        required: [true, "Frequency is required"],
    },
    Category:{
        type: String,
        enum: ['food','music','entertainment','news','transportation','other'],
        required: [true, "Category is required"],
    },
    paymentMethod: {
        type: String,
        trim: true,
        required: [true, "Payment Method is required"],
    },
    status: {
        type: String,
        enum: ['active','inactive'],
        default: 'active',
    },
    startDate: {
        type: Date,
        validate: {
            validator: (value) => value <= new Date(),
            message: "Start Date must be in the past",
        }
    },
    renewalDate: {
        type: Date,
        validate: {
            validator: function(value) {
                return value > this.startDate;
            },
            message: "Renewal Date must be after Start Date",
        },
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "User is required"],
        index: true,
    },
}, { timestamps: true });

subscriptionSchema.pre('save', function(next) {
    if(!this.renewalDate) {
        const renewalPeriods = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365,
        };

        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]);
    }
    if(this.renewalDate < new Date()) {
        this.status = 'expired';
    }
    next();
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;