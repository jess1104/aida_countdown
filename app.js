const myAudio = new Audio('./aidaSound.mp3')
const app = Vue.createApp({
  data() {
      return{
          nowTime:'',// 現在標準時間
          year:'',
          month:'',
          date:'',
          hour:'',
          mins:'',
          setTimeObject:{},// 定時器
          setTimeAry:[],// 顯示於畫面的列表
          isRun:false
      }
  },
  mounted() {
      // 現在時間
      setInterval(() => {
          this.nowTime = new Date().toLocaleString();
      }, 1000);
  },
  methods: {
      setDay() {
          if(this.hour === 24) {this.hour = 0}
          let alertTime = (new Date(this.year, this.month, this.date, this.hour, this.mins)).getTime();//觸發的時間
          let timerName = `name_${alertTime}`;
          let time = new Date(this.year, this.month, this.date, this.hour, this.mins).toLocaleString()//顯示於畫面的時間

          this.setTimeObject[timerName] = {alertTime, timerName, time}
          this.setTimeAry.push(time);
          this.hour='';
          this.mins='';


      },
      run() {
          this.isRun = true;
          for (let key in this.setTimeObject){
              // console.log(key, this.setTimeObject[key]);
              this.setTimeObject[key].timerName = setInterval(() => {
                  // console.log(`我是時間器${key}`);
                  // myAudio.currentTime = 0;
                  if(new Date().getTime() >= this.setTimeObject[key].alertTime) {
                      // console.log('時間相同');
                      myAudio.currentTime = 0;
                      myAudio.play();
                      clearInterval(this.setTimeObject[key].timerName);
                  }
              }, 1000);
              // console.log(value, this.setTimeObject[value]);
          }

      },
      pause() {
        // console.log('stop');
        myAudio.pause();
        myAudio.currentTime = 0;
        history.go(0);
      }
  }
}).mount('#app')