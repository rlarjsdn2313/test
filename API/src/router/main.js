// import router
var express = require('express');
var router = express.Router();

// import lib
var checkReqList = require('../lib/checkReqList').checkReqList;


router.post('/', (req, res) => {
    /*
    1. check ReqList
    */
    if (!checkReqList(Object.keys(req.body), ['grade', 'semester', 'exam', 'subject', 'year'])) {
        res.send({
            error: true,
            message: 'Request Error'
        });

        return;
    }
});


// export router
module.exports = router;
