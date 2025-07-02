import express from "express";
import cors from "cors";
import { getBricks } from "./bricks/server.js";
import { signInWithEmail } from "./admin/server.js";

const app = express();

app.use(cors());
app.use(express.json()); // Add this to parse JSON request bodies

app.listen(8000, () => {
    console.log("Server is running on port 8000");
})

app.get("/", (req, res) => {
    res.send("Yay backend is working");
});

app.get("/bricks", (req, res) => {
    getBricks().then(data => {
        console.log("Sending bricks data to frontend:", data);
        res.json(data);
    }).catch(err => {
        console.log("Error fetching bricks:", err);
        res.status(500).json({ error: "Failed to fetch bricks" });
    });
});

app.post("/signin", (req, res) => {
    const { email, password } = req.body;
    
    // Add some logging for debugging
    console.log("Sign in attempt for email:", email);
    
    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }
    
    signInWithEmail(email, password).then(data => {
        console.log("Sign in successful");
        res.json(data);
    }).catch(err => {
        console.log("Sign in error:", err);
        res.status(500).json({ 
            error: "Failed to sign in",
            message: err.message || "Unknown error"
        });
    });
});

// app.get("/bricks/section/:section", (req, res) => {
//     const section = req.params.section;
//     const bricks = getBricksBySection(section);
//     res.json(bricks);
// });

// app.get("/bricks/purchaser/:purchaser", (req, res) => {
//     const purchaser = req.params.purchaser;
//     const bricks = getBricksByPurchaser(purchaser);
//     res.json(bricks);
// });