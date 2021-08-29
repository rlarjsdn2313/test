# 장승 기출 문제

## 시험지 API
* Request
    * grade: 학년(ex. 1, 2, 3)
    * semester: 학기(ex. '1st', '2nd')
    * exam: 기말, 중간(ex. 'midterm', 'final')
    * subject: 과목(ex. 수학, 정보)
    * year: 년도(ex. 2021)

* Response
    * testList: [{title: 제목(ex. 2021년 2학년 2학기 중간고사 수학), test: 시험지 이미지 리스트}]

* Method
    * POST

* DB
    * tests
        * name char(60)
        * year int
        * grade int
        * semester char(10)
        * subject char(30)
        * test_range char(200)
        * teacher char(20)
    * test
        * page int key
        * src char(200) (ex. url + name + page)