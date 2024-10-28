const express = require("express")
const mongoose = require('mongoose');
const cors = require("cors")
require('dotenv').config()
const app = express()

const port = process.env.PORT || 5000;

// middleware
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5173', 'https://book-app-frontend-rouge.vercel.app'],
    credentials: true
}))

// routes
const bookRoutes = require('./src/books/book.route')
const orderRoutes = require("./src/orders/order.route")
const userRoutes = require("./src/users/user.route")
const adminRoutes = require("./src/stats/admin.stats")
app.use("/api/books", bookRoutes)
app.use("/api/orders", orderRoutes)
app.use("/api/auth", userRoutes)
app.use("/api/admin", adminRoutes)

async function main() {
    await mongoose.connect(process.env.DB_URL);
  
    app.use("/", (req, res) => {
        res.send("Welcome to my server")
    })
    
}

main().then(() => console.log("MongoDB connect successfully!")).catch(err => console.log(err));

app.listen(port, () => {
    console.log(`Example app is listening on port ${port}`)
})