const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const jobRoutes = require('./routes/jobRoutes');
const dotenv = require('dotenv');


dotenv.config();

const app = express();
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use('/api/auth', authRoutes);  // ✅ Correct usage
app.use('/api/jobs', jobRoutes);   // ✅ Correct usage

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('✅ MongoDB Connected');
        app.listen(5002, () => {
            console.log('🚀 Server running at http://localhost:5000');
        });
    })
    .catch(err => console.log(err));
