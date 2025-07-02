import express from "express";
import cors from "cors";
import { getBricks } from "./bricks/server.js";

const app = express();

app.use(cors());

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