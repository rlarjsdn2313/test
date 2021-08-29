const e = require("express");

var checkReqList = (req, neededList) => {
    let reqList = Object.keys(req);

    for (var i=0; i<neededList.length; i++) {
        var check = false;

        for (var a=0; a<reqList.length; a++) {
            if (reqList[a] == neededList[i]) {
                // grade
                if (neededList[i] == 'grade') {
                    if (typeof(req[reqList[a]]) != 'number') {
                        return false;
                    }
                    else if (!(1<=req[reqList[a]]<=3)) {
                        return false;
                    }
                }

                // semester
                else if (neededList[i] == 'semester') {
                    if (req[reqList[a]] != '1st' && req[reqList[a]] != '2nd') {
                        return false;
                    }
                }

                // exam
                else if (neededList[i] == 'exam') {
                    if (req[reqList[a]] != 'midterm' && req[reqList[a]] != 'final') {
                        return false;
                    }
                }

                // subject
                else if (neededList[i] == 'subject') {
                    var subjects = ['수학', '과학', '사회', '역사', '정보', '사회', '체육', '음악', '한문', '미술', '영어', '국어', '도덕']
                    if (!(subjects.includes(req[reqList[a]]))) {
                        return false;
                    }
                }

                // year
                else if (neededList[i] == 'year') {
                    if (typeof(req[reqList[a]]) != 'number') {
                        return false;
                    }
                }

                check = true;
                break;
            }
        }

        if (!check) {
            return false;
        }
    }

    return true;
}

exports.checkReqList = checkReqList;
