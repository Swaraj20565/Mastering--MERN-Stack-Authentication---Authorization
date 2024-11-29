// const mongoose=require('mongoose');

// const connectDB=async()=>{
//      await mongoose.connect(process.env.DB_CONNECT)
//      .then(()=>{
//         console.log('connect MongoDb...'); 
//      })
//      .catch((err)=>{
//         console.log('Not connect MongoDb...');
        
//      })
// }
// module.exports=connectDB;


const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECT, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB...');
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
        process.exit(1); // Exit on failure
    }
};

module.exports = connectDB;
