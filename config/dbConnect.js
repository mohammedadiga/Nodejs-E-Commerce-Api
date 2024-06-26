const { default: mongoose} = require("mongoose");

const dbConnect = () => {
    try {
        const conn = mongoose.connect(process.env.MONGODB_URL)
        console.log("Database connected Successfully");
    } catch (error) {
        console.log("database connection error");
    }
}

module.exports = dbConnect;