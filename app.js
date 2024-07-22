const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();

const connectOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

dotenv.config();

app.use(express.json())

// ConnectDB
mongoose.connect(process.env.MONGO_URI, connectOptions)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));
// Define Route

const productRoutes = require('./routes/product');
app.use("/api", productRoutes)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on mongodb://localhost:${PORT}`));