// //index.js

// const dotenv=require('dotenv')
// dotenv.config();    
// const express = require('express');
// const cors=require('cors')
// const server=express();
// const connectDB=require('./db/db')  //CONNECTING DB...
// const userRouter =require('./Routes/userRoutes')   //import here //#imp................
// const port=process.env.PORT || 3000
// const cookieParser = require('cookie-parser');


// server.use(cors()); 
// server.use(express.json());
// server.use(express.urlencoded({extended:true}));
// server.use(cookieParser());

// //config user Routes
// server.use('/users',userRouter);      //#imp................


// server.get('/home',(req,res)=>{
//     res.send('hello user');
// })

// connectDB();  //CONNECTDB...

// server.listen(port,()=>{
//     console.log(`listen...${port}`);
    
// })


const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./db/db');  
const userRouter = require('./Routes/userRoutes');

const port = process.env.PORT || 3000;
const server = express();

// Middleware
server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cookieParser());
server.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'An unexpected error occurred.' });
});


// Routes
server.use('/users', userRouter);

server.get('/home', (req, res) => {
    res.send('Hello user');
});

connectDB(); // Connecting to DB

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
