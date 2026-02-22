module.exports = app => {
    const downloads = require("../controllers/download.controller.js");
    var router = require("express").Router();

    router.get("/:platform", downloads.getDownloadByPlatform);
    router.get("/:platform/download", downloads.downloadFile);
    app.use('/api/downloads', router);
};