// backend/server.js
const express = require("express");
const cors = require("cors");
const app = express();

var corsOptions = {
    origin: "http://localhost:5173"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
const db = require("./models");

// Test database connection first
db.sequelize.authenticate()
    .then(() => {
        console.log('Database connection established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

// Sync database and seed data
const initializeDatabase = async () => {
    try {
        // Sync all models
        await db.sequelize.sync({ force: false });
        console.log("Database synced.");
        
        // Check if downloads table exists and has data
        if (db.downloads) {
            const count = await db.downloads.count();
            console.log(`Current download entries: ${count}`);
            
            if (count === 0) {
                console.log("Seeding initial download data...");
                await db.downloads.bulkCreate([
                    {
                        platform: 'windows',
                        filename: 'synapse-visionlab-windows.exe',
                        file_url: 'https://github.com/yourusername/SynapseVisionLab-website/releases/download/v1.0.0/synapse-visionlab-windows.exe',
                        version: '1.0.0',
                        size_mb: 150.5,
                        release_notes: 'Initial release for Windows',
                        download_count: 0,
                        is_active: true
                    },
                    {
                        platform: 'macos',
                        filename: 'synapse-visionlab-macos.dmg',
                        file_url: 'https://github.com/yourusername/SynapseVisionLab-website/releases/download/v1.0.0/synapse-visionlab-macos.dmg',
                        version: '1.0.0',
                        size_mb: 145.2,
                        release_notes: 'Initial release for macOS',
                        download_count: 0,
                        is_active: true
                    }
                ]);
                console.log("Seed data inserted successfully.");
                
                // Verify the data was inserted
                const newCount = await db.downloads.count();
                console.log(`Total download entries after seeding: ${newCount}`);
            }
        } else {
            console.error("Downloads model not initialized properly");
        }
    } catch (error) {
        console.error("Failed to sync database:", error.message);
        console.error("Full error:", error);
    }
};

// Call the initialization function
initializeDatabase();

// Simple test route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to SynapseVisionLab API" });
});

// Test route to check downloads
app.get("/api/test/downloads", async (req, res) => {
    try {
        const downloads = await db.downloads.findAll();
        res.json({
            success: true,
            count: downloads.length,
            data: downloads
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Import routes
require("./routes/download.routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});