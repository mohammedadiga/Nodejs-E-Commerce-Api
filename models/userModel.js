const mongoose = require('mongoose'); // Erase if already required
const bcrypt = require('bcrypt');

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
    },
    lastname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    mobile:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        default:"user",
    },
    isBlocked:{
        type:Boolean,
        default:false,
    },
    cart: {
        type: Array,   
        default: []
    },
    address:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'Address' }],
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Wishlist'}],
    refreshToken: {
        type: String,
    }
},{
    timestamps: true,
});

// Password encryption
userSchema.pre('save', async function (next){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Compare encryption during login
userSchema.methods.isPasswordMatched = async function (enterPassword) {
    return await bcrypt.compare(enterPassword, this.password);
}

//Export the model
module.exports = mongoose.model('User', userSchema);