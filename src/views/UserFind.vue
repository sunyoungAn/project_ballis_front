<template>
    <!-- <body class="container">
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

     Button trigger modal
     <div class="button_box">
      <button type="button" class="btn btn-outline-success" data-bs-toggle="modal" @click="findEmail()" data-bs-target="#exampleModal">
        이메일찾기
      </button>
     </div>

      Modal
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

    </body> -->

  <div class="container common_mt160 customer_wrap">
    <div class="row justify-content-center">
      <div class="fs-3 fw-bold text-center mt-5">이메일 아이디 찾기</div>
      <div class="mt-5 text-center">가입 시 등록한 휴대폰 번호를 입력하면</div> 
      <div class="mt-0 text-center">이메일 주소의 일부를 알려드립니다.</div>
    
      <div class="col-lg-4">
        <div class="mt-5">
          <span class="fw-bold">휴대폰 번호</span>
          <input class="form-control form-control-lg text-center mt-2 custom_placeholder" type="text" v-model="state.phoneNumber" placeholder="- 제외하고 가입하신 휴대폰 번호 입력" />
        </div>

        <div class="button_box">
          <button class="btn btn-lg green_button" data-bs-toggle="modal" @click="findEmail()" data-bs-target="#exampleModal">
            이메일 아이디 찾기
          </button>
        </div>
      </div>
    </div>

    <!-- 모달  -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div v-if="state.email">
        <div class="modal-header">
        <div class="d-flex justify-content-end">
          <button class="btn-close text-end" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="fs-4 fw-bold mt-3 mx-auto text-center" id="exampleModalLabel">이메일 주소 찾기 성공</div>
      </div>
      <div class="row justify-content-center">
        <div class="col-lg-6">
          <div class="modal-body text-center fs-5 mt-2">
            {{ maskedEmail }}
          </div>
          <div class="modal-footer mb-3">
            <button class="btn green_button_outline mt-4 mb-3" data-bs-dismiss="modal"><router-link to="/member/login">로그인</router-link></button>
            <button class="btn green_button_outline mt-4 mb-3" data-bs-dismiss="modal"><router-link to="/password/find">비밀번호찾기</router-link></button>
          </div>
        </div>
      </div>
      </div>

      <div v-if="!state.email">
        <div class="modal-header">
        <div class="d-flex justify-content-end">
          <button class="btn-close text-end" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="fs-4 fw-bold mt-3 mx-auto text-center" id="exampleModalLabel">이메일 주소 찾기 실패</div>
      </div>
      <div class="row justify-content-center">
        <div class="col-lg-6">
          <div class="modal-body text-center fs-5 mt-2">
            {{ state.error }}
          </div>
          <div class="modal-footer mb-3">
            <button class="btn green_button_outline mt-4 mb-3" style="margin-right: 30%" data-bs-dismiss="modal" aria-label="Close">돌아가기</button>
          </div>
        </div>
      </div>
      </div>
      
    </div>
  </div>
</div>
  </div>
</template>
 
 <script>
import { reactive } from 'vue'
import axios from 'axios'
 export default {
     setup () {
      
      const state = reactive({
        phoneNumber:"",
        email:"",
        error : "회원 정보가 없습니다"
      })

      const findEmail = () =>{
        axios.get(`/api/find/email/${state.phoneNumber}`).then((res)=>{
          state.email=res.data;
        }).catch(()=>{
          state.error;
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
 @import "../assets/css/common.css";
 /* .container {
   width: 1280;
   margin: 0 auto;
 } */
 
 /* .div_box{
   text-align: center;
 } */
 
 /* .input_box{
   width: 40%;
   text-align: center;
   margin: 0 auto;
 } */
 
 /* .lbl{
   font-size: xx-large;
   font-weight: bolder;
   padding: 10px;
   font-style: italic;
 } */
 
 /* .button_box{
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

 /* .p_tag_box{
  text-align: center;
  margin-right: 33%;
  font-size: large;
  font-weight: bold;
  font-style: italic;
 } */
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
 </style>