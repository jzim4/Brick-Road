import express from "express";
import cors from "cors";
import { getBricks, getBricksBySection, getBricksByPurchaser } from "./bricks/server.js";
const app = express();

app.use(cors());

app.listen(8080, () => {
    console.log("Server is running on port 8080");
})

app.get("/", (req, res) => {
    res.send("Yay backend is working");
});

app.get("/bricks", (req, res) => {
    const bricks = getBricks();
    res.json(bricks);
    console.log("Bricks sent to client");
});

app.get("/bricks/section/:section", (req, res) => {
    const section = req.params.section;
    const bricks = getBricksBySection(section);
    res.json(bricks);
});

app.get("/bricks/purchaser/:purchaser", (req, res) => {
    const purchaser = req.params.purchaser;
    const bricks = getBricksByPurchaser(purchaser);
    res.json(bricks);
});