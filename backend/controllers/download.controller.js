const db = require("../models");
const Download = db.downloads;
const path = require("path");
const { Op } = require("sequelize");

exports.getDownloadByPlatform = async (req, res) => {
    try {
        const { platform } = req.params;
        
        const download = await Download.findOne({
            where: { 
                platform: platform,
                is_active: true 
            }
        });

        if (!download) {
            return res.status(404).json({
                success: false,
                message: `Download not found for platform: ${platform}`
            });
        }

        res.status(200).json({
            success: true,
            data: {
                platform: download.platform,
                filename: download.filename,
                version: download.version,
                size_mb: download.size_mb,
                release_notes: download.release_notes,
                file_url: download.file_url
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Error fetching download"
        });
    }
};

exports.downloadFile = async (req, res) => {
    try {
        const { platform } = req.params;
        
        const download = await Download.findOne({
            where: { 
                platform: platform,
                is_active: true 
            }
        });

        if (!download) {
            return res.status(404).json({
                success: false,
                message: `Download not found for platform: ${platform}`
            });
        }

        // Increment download count
        download.download_count += 1;
        await download.save();

        // Get the file path - adjust this based on where your files are
        const filePath = path.join(
            __dirname, 
            '../downloads', 
            platform, 
            download.filename
        );

        // Send the file
        res.download(filePath, download.filename, (err) => {
            if (err) {
                console.error('Download error:', err);
                if (!res.headersSent) {
                    res.status(500).json({
                        success: false,
                        message: 'Error downloading file'
                    });
                }
            }
        });
    } catch (error) {
        console.error('Download error:', error);
        res.status(500).json({
            success: false,
            message: error.message || "Error processing download"
        });
    }
};