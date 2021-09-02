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

    var possible = [];
    for (var i=0; i<neededKey.length; i++) {
        if (data[neededKey[i]] == '') {
            continue;
        }
        possible.push(neededKey[i]);
    }

    for (var i=0; i<possible.length; i++) {

        var v = 'WHERE ';
        if (i == possible.length - 1) {
            if (typeof(data[neededKey[i]]) == 'string') {
                v += `${possible[i]}='${data[possible[i]]}'`;
            } else {
                v += `${possible[i]}=${data[possible[i]]}`;
            }
        } else {
            if (typeof(data[possible[i]]) == 'string') {
                v += `${possible[i]}='${data[possible[i]]}' and `;
            } else {
                v += `${possible[i]}=${data[possible[i]]} and `;
            }
        }

    }


    try {
        connection.query(`SELECT * FROM tests ${v};`, (err, result) => {
            if (err) {
                return;
            }
            let testList = [];
    
            for (var i=0; i<result.length; i++) {
    
                testList.push(
                    {
                        name: result[i]['name'],
                        pages: fs.readdirSync('./data/' + result[i]['name']).length,
                        year: result[i]['year'],
                        grade: result[i]['grade'],
                        semester: result[i]['semester'],
                        subject: result[i]['subject'],
                        teacher: result[i]['teacher'],
                        exam: result[i]['exam']
                    }
                );
            }
            res.send({testList: testList});
            return;
        });
    } catch {
        res.send({testList: []});
        return;
    }

});


// export router
module.exports = router;
