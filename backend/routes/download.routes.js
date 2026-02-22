module.exports = app => {
    const downloads = require("../controllers/download.controller.js");
    var router = require("express").Router();

    router.get("/:platform", downloads.getDownloadByPlatform);
    app.use('/api/downloads', router);
};