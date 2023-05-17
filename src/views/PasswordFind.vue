<template>
   <body class="container">
     <div class="div_box">
         <label class="lbl">비밀번호 찾기</label>
         <p>가입 시 등록하신 휴대폰 번호와 이메일을 입력하시면,
            이메일로 임시 비밀번호를 전송해 드립니다.
         </p>
     </div>
     <br>

     <div class="p_tag_box">
      <p>휴대폰 번호</p>
     </div>
     <div class="input_box">
       <input class="form-control form-control-lg text-center" v-model="state.phoneNumber" type="text" placeholder="가입하신 휴대폰 번호를 -제외하고 입력해주세요">
     </div>

     <br/>

     <div class="p_tag_box">
      <p>이메일 주소</p>
     </div>
     <div class="input_box">
       <input class="form-control form-control-lg text-center" v-model="state.email" type="text" b placeholder="가입하신 이메일 주소를 입력해주세요">
     </div>


     <div class="button_box">
       <button type="button" class="btn btn-outline-success" @click="sendPassword()">비밀번호찾기</button>
     </div>

     
    </body>
</template>

<script>
import { reactive } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
export default {
    setup () {

        const router = useRouter();
        const state = reactive({
          phoneNumber:"",
          email:""
        })
        
        const sendPassword = () => {
          axios.get(`/api/find/password/${state.email}/${state.phoneNumber}`).then((res)=>{
            console.log(res);
            axios.post(`/api/send/password?email=${state.email}`,{}).then((res)=>{
              console.log(res);
              alert('임시 비밀번호가 전송되었습니다');
              router.push({path:"/member/login"});
            })
          })
        }

        return {
          state,
          sendPassword
        }
    }
}
</script>

<style lang="css" scoped>
.container {
   width: 1280;
   margin: 0 auto;
 }
 
 .div_box{
   text-align: center;
 }
 
 .input_box{
   width: 40%;
   text-align: center;
   margin: 0 auto;
 }
 
 .lbl{
   font-size: xx-large;
   font-weight: bolder;
   padding: 10px;
   font-style: italic;
 }
 
 .button_box{
   padding-top: 20px;
   text-align: center;
   margin-bottom: 20px;
 }

 .button_box2{
   text-align: center;
   margin-bottom: 20px;
 }
 
 a{
   text-decoration: none;
   color: green;
 }

 a:hover{
  color:white
 }

 .p_tag_box{
  text-align: center;
  margin-right: 33%;
  font-size: large;
  font-weight: bold;
  font-style: italic;
 }
</style>