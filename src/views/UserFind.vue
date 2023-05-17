<template>
    <body class="container">
     <div class="div_box">
         <label class="lbl">이메일 찾기</label>
         <p>가입 시 등록한 휴대폰 번호를 입력하면
            이메일 주소의 일부를 알려드립니다.</p>
     </div>
     <br>
     <div class="p_tag_box">
      <p>휴대폰 번호</p>
     </div>
     <div class="input_box">
       <input class="form-control form-control-lg text-center" type="text" v-model="state.phoneNumber" placeholder="가입하신 휴대폰 번호를 -제외하고 입력해주세요">
     </div>

     <!-- Button trigger modal -->
     <div class="button_box">
      <button type="button" class="btn btn-outline-success" data-bs-toggle="modal" @click="findEmail()" data-bs-target="#exampleModal">
        이메일찾기
      </button>
     </div>

      <!-- Modal -->
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">이메일 주소</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              {{ maskedEmail }}
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-success" data-bs-dismiss="modal"><a href="/login">로그인</a></button>
              <button type="button" class="btn btn-outline-success">비밀번호찾기</button>
            </div>
          </div>
        </div>
      </div>

     <!-- <div class="button_box">
       <button type="button" class="btn btn-outline-success" @click="findEmail()">이메일 찾기</button>
     </div> -->
    </body>
 </template>
 
 <script>
import { reactive } from 'vue'
import axios from 'axios'
 export default {
     setup () {
      
      const state = reactive({
        phoneNumber:"",
        email:""
      })

      const findEmail = () =>{
        axios.get(`/api/find/member/${state.phoneNumber}`).then((res)=>{
          state.email=res.data;
        }).catch(()=>{
          window.alert("찾기 실패");
        })
      }
      
 
      return {
        state,
        findEmail
      }
     },

     computed: {
    maskedEmail() {
      if (!this.state.email) {
        return null;
      }
      const [username, domain] = this.state.email.split('@');
      const maskedUsername = `${username.charAt(0)}***${username.charAt(username.length - 1)}`;
      return `${maskedUsername}@${domain}`;
    },
  },
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