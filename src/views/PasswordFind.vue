<template>
   <!-- <body class="container">
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

     
    </body> -->

    <div class="container common_mt160 customer_wrap">
      <div class="row justify-content-center">
        <div class="fs-3 fw-bold text-center mt-5">비밀번호 찾기</div>
        <div class="mt-5 text-center">가입 시 등록하신 휴대폰 번호와 이메일을 입력하시면</div> 
        <div class="mt-0 text-center">이메일로 임시 비밀번호를 전송해 드립니다.</div>
      
        <div class="col-lg-4">
          <div class="mt-5">
            <span class="fw-bold">이메일 주소</span>
            <input class="form-control form-control-lg text-center mt-2 custom_placeholder" v-model="state.phoneNumber" type="text" placeholder="- 제외하고 가입하신 휴대폰 번호 입력" />
          </div>

          <div class="mt-3">
            <span class="fw-bold">휴대폰 번호</span>
            <input class="form-control form-control-lg text-center mt-2 custom_placeholder" v-model="state.email" type="text" b placeholder="가입하신 이메일 주소 입력">
          </div>

          <div class="button_box">
            <button type="button" class="btn btn-lg green_button" @click="sendPassword()">비밀번호 찾기</button>
          </div>
        </div>
      </div>
    </div>
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
 @import "../assets/css/common.css";
/* .container {
   width: 1280;
   margin: 0 auto;
 } */
/*  
 .div_box{
   text-align: center;
 } */
/*  
 .input_box{
   width: 40%;
   text-align: center;
   margin: 0 auto;
 } */
/*  
 .lbl{
   font-size: xx-large;
   font-weight: bolder;
   padding: 10px;
   font-style: italic;
 } */
/*  
 .button_box{
   padding-top: 20px;
   text-align: center;
   margin-bottom: 20px;
 } */
/* 
 .button_box2{
   text-align: center;
   margin-bottom: 20px;
 } */
 a{
   text-decoration: none;
   color: rgb(103, 194, 58);
 }
 a:hover{
  color:#ffffff;
  font-weight: normal;
 }
 .green_button {
  width: 100%;
  background-color: rgb(103, 194, 58);
  color: #ffffff;
  font-weight: bold;
}
.green_button:hover {
  background-color: rgb(149, 212, 117);
  color: #ffffff;
}
.green_button_outline {
  border: 1px solid rgb(103, 194, 58);
  color: rgb(103, 194, 58);
}
.green_button_outline:hover{
  background-color: rgb(103, 194, 58);
  color: #ffffff;
}
 /* .p_tag_box{
  text-align: center;
  margin-right: 33%;
  font-size: large;
  font-weight: bold;
  font-style: italic;
 } */
</style>