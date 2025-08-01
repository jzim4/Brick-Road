import express from "express";
import cors from "cors";
import { getBricks, updateBrick, deleteBrick, createBrick, getBrickLocations } from "./bricks/server.js";
import { signInWithEmail } from "./admin/server.js";
import { saveReport, getReports, updateReport } from "./report/server.js";
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv';

const app = express();

dotenv.config({ path: './.env' });
const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)


app.use(cors({
    origin: [
        'http://localhost:8080',
        'https://brick-road.vercel.app'
    ]
}));
app.use(express.json()); // Add this to parse JSON request bodies

app.listen(8000, () => {
    console.log("Server is running on port 8000");
})

app.get("/", (req, res) => {
    res.send("Yay backend is working");
});

app.get("/bricks", (req, res) => {
    getBricks(supabase).then(data => {
        res.json(data);
    }).catch(err => {
        console.log("Error fetching bricks:", err);
        res.status(500).json({ error: "Failed to fetch bricks" });
    });
});

app.get("/brick", async (req, res) => {
    try {
        const { Panel_Number, Col_Number, Row_Number } = req.query;

        const data = await getBricks(supabase);

        const matchingBrick = data.find(brick =>
            String(brick.Panel_Number) === String(Panel_Number) &&
            String(brick.Col_Number) === String(Col_Number) &&
            String(brick.Row_Number) === String(Row_Number)
        );

        if (matchingBrick) {
            res.json(matchingBrick);
        } else {
            res.status(404).json({ error: "Brick not found" });
        }

    } catch (err) {
        console.error("Error fetching brick:", err);
        res.status(500).json({ error: "Failed to fetch bricks" });
    }
});

app.put("/bricks/:id", (req, res) => {
    const { id } = req.params;
    const { data } = req.body;
    updateBrick(supabase, id, data).then(data => {
        console.log("Brick updated:", data);
        res.json(data);
    }).catch(err => {
        console.error("Error updating brick:", err);
        res.status(500).json({ error: "Failed to update brick" });
    });
});

app.delete("/bricks/:id", (req, res) => {
    const { id } = req.params;
    deleteBrick(supabase, id).then(data => {
        console.log("Brick deleted:", data);
        res.json(data);
    }).catch(err => {
        console.error("Error deleting brick:", err);
        res.status(500).json({ error: "Failed to delete brick" });
    });
});

app.post("/create-brick", (req, res) => {
    const { data } = req.body;
    createBrick(supabase, data).then(data => {
        console.log("Brick created:", data);
        res.json(data);
    });
});

app.get("/brick-locations", (req, res) => {
    getBrickLocations(supabase).then(data => {
        console.log("Brick locations:", data);
        res.json(data);
    });
});

app.post("/signin", (req, res) => {
    const { email, password } = req.body;
    
    // Add some logging for debugging
    console.log("Sign in attempt for email:", email);
    
    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }
    
    signInWithEmail(supabase, email, password).then(data => {
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

app.post("/report", (req, res) => {
    const { purchaserName, reporterEmail, panel, errorExplanation, comment } = req.body;
    saveReport(supabase, purchaserName, reporterEmail, panel, errorExplanation, comment).then(data => {
        console.log("Saving report message:" + purchaserName + reporterEmail + panel + errorExplanation + comment);
        res.send("Success");
    }).catch(err => {
        console.log("Error saving report:", err);
        res.status(500).json({ error: err.message });
    });
})

app.get("/reports", (req, res) => {
    getReports(supabase).then(data => {
        res.json(data);
    }).catch(err => {
        console.log("Error fetching reports:", err);
        res.status(500).json({ error: err.message });
    });
})

app.put("/update-report/:id", (req, res) => {
    const { id } = req.params;
    const { isFixed } = req.body;
    console.log("Updating report:", id, isFixed);
    updateReport(supabase, id, isFixed)
    .then(data => {
        console.log("Report updated:", data);
        res.json(data);
    })
    .catch(err => {
        console.log("Error updating report:", err);
        res.status(500).json({ error: err.message });
    });
})