const db = require("../models");
const Download = db.downloads;
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