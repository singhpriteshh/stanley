require("dotenv").config();
const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser")
const authRouter = require('./routes/auth/auth-route')
const visitRoutes = require('./routes/SaveData/saveData-routes');


mongoose
    .connect("mongodb+srv://pritesh:A4209806@service01.cl7hg.mongodb.net/")
    .then(() => console.log("MongoDB connected"))
    .catch((error) => console.log("error"));
    
        
const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors({
    origin: "http://localhost:5173",
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    allowedHeaders: [
        "Content-Type",
        'Authorization',
        'Cache-Control',
        'Expires',
        'Pragma'
    ],
    credentials: true
}));


app.use(cookieParser());
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/visit', visitRoutes);


app.listen(PORT, () => console.log(`Server is running on ${PORT}`)
)