// dependencies and their uses
// 1 using cloudinary we can store image and mp3 files
// 2 using cors we can connect frontend and backend
// 3 dotenv for secure keys
// 4 express for backend API
// 5 mongoose for databases
// 6 using multer we can upload image and mp3 that we get from frontend
// 7 nodemon which makes ease to run project
// src
// controller all API logics
// mongodb concept
// for multiple routes concept
// install react toastify in admin for toast notification
// axios : using this we can api

import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import songRouter from './src/routes/songRoute.js';
import connectDB from './src/config/mongodb.js';
import connectCloudinary from './src/config/cloudinary.js';
import albumRouter from './src/routes/albumRouter.js';
import PlaylistRouter from './src/routes/playlistRouter.js';

// app config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();


//middleware
app.use(express.json()) // whenever we get any req that req pass from this express method
app.use(cors()) // using this if or backend and frontend running diff number even we can run
app.use('/api/playlist', (req, res, next) => {
    console.log(`Request received at ${req.method} ${req.path}`);
    next();
  }, PlaylistRouter);

// intitializing routes
app.use('/api/song',songRouter);
app.use('/api/album',albumRouter)
app.use('/api/playlist',PlaylistRouter)

app.get('/',(req,res)=>{
    res.send("API Working");
})

app.listen(port,()=>{
    console.log(`Server started on ${port}`)
})