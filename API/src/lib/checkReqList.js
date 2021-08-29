var checkReqList = (reqList, neededList) => {
    for (var i=0; i<neededList.length; i++) {
        var check = false;

        for (var a=0; a<reqList.length; a++) {
            if (reqList[a] == neededList[i]) {
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
