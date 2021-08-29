<template>
  <input v-model="searchValue">
  <button v-on:click="filterInput"></button>
</template>

<script>

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
        subject: ''
      }
    }
  },
  methods: {
    filterInput: function() {
      let input = this.searchValue;
      input = input.split(' ');

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
            this.request.subject = input[i];
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
      console.log(this.request)
    }
  },
  components: {
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
