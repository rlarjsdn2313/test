// import router
var express = require('express');
var router = express.Router();

// import lib
var checkReqList = require('../lib/checkReqList').checkReqList;
var createConn = require('../lib/mysqlConn');
var fs = require('fs');


router.post('/', (req, res) => {
    /*
    1. check ReqList
    */
    var neededKey = ['grade', 'semester', 'exam', 'subject', 'year', 'teacher'];
    var result = checkReqList(req.body, neededKey);
    let data = result[0];

    if (!result[1]) {
        res.send({
            error: true,
            message: 'Request Error'
        });

        return;
    }

    /*
    2. get code
    */
    let connection = createConn.createConnection();
    connection.connect();

    var v = 'WHERE ';
    for (var i=0; i<neededKey.length; i++) {
        if (data[neededKey[i]] == '') {
            continue;
        }
        if (i == neededKey.length - 2) {
            if (typeof(data[neededKey[i]]) == 'string') {
                v += `${neededKey[i]}='${data[neededKey[i]]}'`;
            } else {
                v += `${neededKey[i]}=${data[neededKey[i]]}`;
            }
        } else {
            if (typeof(data[neededKey[i]]) == 'string') {
                v += `${neededKey[i]}='${data[neededKey[i]]}' and `;
            } else {
                v += `${neededKey[i]}=${data[neededKey[i]]} and `;
            }
        }

    }

    connection.query(`SELECT * FROM tests ${v};`, (err, result) => {
        if (err) throw err;

        let testList = [];

        for (var i=0; i<result.length; i++) {

            testList.push(
                {
                    name: result[i]['name'],
                    pages: fs.readdirSync('./data/').length,
                    year: result[i]['year'],
                    grade: result[i]['grade'],
                    semester: result[i]['semester'],
                    subject: result[i]['subject'],
                    test_range: result[i]['test_range'],
                    teacher: result[i]['teacher'],
                    exam: result[i]['exam']
                }
            );
        }
        res.send({testList: testList});
        return;
    });
});


// export router
module.exports = router;
