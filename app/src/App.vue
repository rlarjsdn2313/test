<template>
  <div class="image" v-if="viewer==true">
    <div class="image-background">
      <img :src="imageSrc" class="i">
      <button @click="pre()" :disabled="pre_btn">previous</button>
      <button @click="next()" :disabled="next_btn">next</button>
      <button @click="viewImage(-1)">close</button>
    </div>
  </div>
  <div>
    <input v-on:input="typing" v-bind:value="searchValue" placeholder="ex. 2021년 2학년 2학기 기말 수학" class="input">
  </div>
  <div class="test" v-for="(test, index) in response['testList']" :key="index" @click="viewImage(index)">
    <div class="desc">
      {{test['year']}}년
    </div>
    <div class="desc">
      {{test['grade']}} 학년
      {{test['semester'][0]}} 학기
    </div>
    <div class="desc">
        {{test['exam']}}
    </div>
    <div class="desc subject">
      {{test['subject']}}
    </div>
    <div class="desc">
      {{test['teacher']}} 선생님
    </div>
    <div @click="download(index)">
      download
    </div>
  </div>

</template>


<script>
import axios from 'axios';


export default {
  name: 'App',
  data() {
    return {
      searchValue: '',
      request: {
        year: '',
        grade: '',
        semester: '',
        exam: '',
        subject: '',
        teacher: ''
      },
      response: {},
      imageName: '',
      imageEnd: 0,
      imageNumber: 0,
      imageSrc: '',
      viewer: false,
      pre_btn: true,
      next_btn: true,
    }
  },
  mounted() {
      this.getData();
  },
  methods: {
    typing: function(e) {
      this.searchValue = e.target.value;
      this.filterInput();
      this.getData();
    },
    pre: function() {
  
      this.imageNumber -= 1;

      if (this.imageNumber == 1) {
        this.pre_btn = true;
      } else {
        this.pre_btn = false
      }
      if (this.imageNumber == this.imageEnd) {
        this.next_btn = true;
      } else {
        this.next_btn = false;
      }

      this.imageSrc = 'http://localhost:3000/api/image/' + this.imageName + '/' + String(this.imageNumber);
    },
    next: function() {
  
      this.imageNumber += 1;

      if (this.imageNumber == 1) {
        this.pre_btn = true;
      } else {
        this.pre_btn = false
      }
      if (this.imageNumber == this.imageEnd) {
        this.next_btn = true;
      } else {
        this.next_btn = false;
      }
      this.imageSrc = 'http://localhost:3000/api/image/' + this.imageName + '/' + String(this.imageNumber);
    },
    viewImage: function(index) {
      if (this.viewer == true) {
        this.viewer = false;
        return;
      }
      
      this.viewer = true;

      var end_number = this.response['testList'][index]['pages'];
      var name = this.response['testList'][index]['name']

      this.imageEnd = end_number;
      this.imageName = name;
      this.imageNumber = 1;

      this.imageSrc = 'http://localhost:3000/api/image/' + name + '/' + String(this.imageNumber);

      if (this.imageNumber == 1) {
        this.pre_btn = true;
      } else {
        this.pre_btn = false
      }
      if (this.imageNumber == this.imageEnd) {
        this.next_btn = true;
      } else {
        this.next_btn = false;
      }
      console.log(this.imageNumber, end_number)

    },
    getData: function() {
      let baseUrl = 'http://localhost:3000/api';
      axios.post(baseUrl, this.request).then(res => {
        this.response = res.data;
      });
    },
    download: function(e) {
      let test = this.response.testList[e];
      for (var i=0; i<test['pages']; i++) {
        var url = 'http://localhost:3000/api/image/' + test['name'] + '/' + String(i + 1);
        axios({
          url: url,
          method: 'GET',
          responseType: 'blob'
        }).then((response) => {
          var fileUrl = window.URL.createObjectURL(new Blob([response.data]));
          var fileLink = document.createElement('a');
          fileLink.href = fileUrl;

          fileLink.setAttribute('download', `${test['name']}-${i}.jpg`);
          document.body.appendChild(fileLink);

          fileLink.click();
        });
      }
    },
    filterInput: function() {
      let input = this.searchValue;
      input = input.split(' ');
      this.request = {
        year: '',
        grade: '',
        semester: '',
        exam: '',
        subject: '',
        teacher: ''
      };

      for (var i=0; i<input.length; i++) {
        switch (input[i]) {
          case '1학기':
            this.request.semester = '1st';
            break;
          case '2학기':
            this.request.semester = '2nd';
            break;

          case '1학년':
            this.request.grade = 1;
            break;
          case '2학년':
            this.request.grade = 2;
            break;
          case '3학년':
            this.request.grade = 3;
            break;

          case '수학':
            this.request.subject = '수학';
            break;
          case '과학':
            this.request.subject = input[i];
            break;
          case '사회':
            this.request.subject = input[i];
            break;
          case '역사':
            this.request.subject = input[i];
            break;
          case '정보':
            this.request.subject = input[i];
            break;
          case '체육':
            this.request.subject = input[i];
            break;
          case '음악':
            this.request.subject = input[i];
            break;
          case '한문':
            this.request.subject = input[i];
            break;
          case '미술':
            this.request.subject = input[i];
            break;
          case '영어':
            this.request.subject = input[i];
            break;
          case '국어':
            this.request.subject = input[i];
            break;
          case '도덕':
            this.request.subject = input[i];
            break;

          case '2018':
            this.request.year = 2018;
            break;
          case '2018년':
            this.request.year = 2018;
            break;
          case '2018년도':
            this.request.year = 2018;
            break;

          case '2019':
            this.request.year = 2019;
            break;
          case '2019년':
            this.request.year = 2019;
            break;
          case '2019년도':
            this.request.year = 2019;
            break;

          case '2020':
            this.request.year = 2020;
            break;
          case '2020년':
            this.request.year = 2020;
            break;
          case '2020년도':
            this.request.year = 2020;
            break;

          case '2021':
            this.request.year = 2021;
            break;
          case '2021년':
            this.request.year = 2021;
            break;
          case '2021년도':
            this.request.year = 2021;
            break;

          case '중간고사':
            this.request.exam = 'midterm';
            break;
          case '중간':
            this.request.exam = 'midterm';
            break;
          case '기말고사':
            this.request.exam = 'final';
            break;
          case '기말':
            this.request.exam = 'final';
            break;
        }
      }
    }
  },
  components: {
  }
}

</script>

<style>
@font-face {
    font-family: 'IM_Hyemin-Bold';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2106@1.1/IM_Hyemin-Bold.woff2') format('woff');
    font-weight: normal;
    font-style: normal;
}

body {
    margin: 0;
}

#app {
  font-family: IM_Hyemin-Bold;
}
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */

.test {
  border-radius: 20px;
  background-color: dodgerblue;
  float: left;
  margin: 30px;
  padding: 5px;
  width: 120px;
  height: 177px;;
  text-align: center;
}

.subject {
  font-size: 37px;
}

/* image view */
.image, .image-background {
  box-sizing: border-box;
}

.image {
  width: 100%;
  height: 100%;

  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  padding: 20px;
}

.image-background {
  width: 100%;
  background: white;
  border-radius: 8px;
  padding: 20px;
}

</style>