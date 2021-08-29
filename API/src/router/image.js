// import router
var express = require('express');
var router = express.Router();


router.get('/:name/:page', (req, res) => {
    let name = req.params.name;
    let page = req.params.page;

    try {
        res.sendFile(`/media/dev07/D/coding/test/API/data/${name}/${page}.jpg`);
    } catch {
        res.send({
            error: true,
        });
    }
    return;
});


module.exports = router;
