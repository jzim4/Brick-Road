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

// Simple auth middleware to protect routes using Supabase JWT
async function verifyAuth(req, res, next) {
    try {
        const authHeader = req.headers.authorization || '';
        const [scheme, token] = authHeader.split(' ');
        if (scheme !== 'Bearer' || !token) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const { data, error } = await supabase.auth.getUser(token);
        console.log(data, error);
        if (error || !data?.user) {
            return res.status(401).json({ error: 'Invalid or expired token' });
        }

            // attach verified user and raw access token to the request so
            // route handlers can create a per-request Supabase client that
            // forwards the user's JWT for Row Level Security (RLS) checks
            req.user = data.user;
        req.accessToken = token;

        // Build and attach a per-request Supabase client that forwards
        // the user's access token in the Authorization header. Attaching
        // the client here avoids creating it in every route and keeps
        // routes clean while still ensuring per-request headers.
        req.supabase = createClient(supabaseUrl, supabaseKey, {
            global: {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
        });
        next();
    } catch (err) {
        console.error('Auth verification failed:', err);
        return res.status(401).json({ error: 'Unauthorized' });
    }
}

// For local development, start the server. On Vercel, just export the app for the serverless runtime.
if (!process.env.VERCEL) {
    app.listen(8000, () => {
        console.log("Server is running on port 8000");
    });
}

export default app;

app.get("/", (req, res) => {
    res.send("Yay backend is working");
});

app.get("/bricks", (req, res) => {
    getBricks(supabase).then(data => {
        res.json(data);
    }).catch(err => {
        console.error("Error fetching bricks:", err);
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

app.put("/bricks/:id", verifyAuth, (req, res) => {
    const { id } = req.params;
    const { data } = req.body;
    updateBrick(req.supabase, id, data).then(data => {
        console.error("Brick updated:", data);
        res.json(data);
    }).catch(err => {
        console.error("Error updating brick:", err);
        res.status(500).json({ error: "Failed to update brick" });
    });
});

app.delete("/bricks/:id", verifyAuth, (req, res) => {
    const { id } = req.params;
    deleteBrick(req.supabase, id).then(data => {
        res.json(data);
    }).catch(err => {
        console.error("Error deleting brick:", err);
        res.status(500).json({ error: "Failed to delete brick" });
    });
});

app.post("/create-brick", verifyAuth, (req, res) => {
    const { data } = req.body;
    createBrick(req.supabase, data).then(data => {
        res.json(data);
    });
});

app.get("/brick-locations", (req, res) => {
    getBrickLocations(supabase).then(data => {
        res.json(data);
    });
});

app.post("/report", (req, res) => {
    const { purchaserName, reporterEmail, panel, errorExplanation, comment } = req.body;
    saveReport(supabase, purchaserName, reporterEmail, panel, errorExplanation, comment).then(data => {
        res.send("Success");
    }).catch(err => {
        console.error("Error saving report:", err);
        res.status(500).json({ error: err.message });
    });
})

app.get("/reports", verifyAuth, (req, res) => {
    // Use the per-request client created in verifyAuth so RLS policies
    // run with the authenticated user's identity.
    getReports(req.supabase).then(data => {
        res.json(data);
    }).catch(err => {
        if (err.message === "User not authenticated") {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }
        console.error("Error fetching reports:", err);
        res.status(500).json({ error: err.message });
    });
})

app.put("/update-report/:id", verifyAuth, (req, res) => {
    const { id } = req.params;
    const { isFixed } = req.body;
    updateReport(req.supabase, id, isFixed)
    .then(data => {
        res.json(data);
    })
    .catch(err => {
        console.error("Error updating report:", err);
        res.status(500).json({ error: err.message });
    });
})