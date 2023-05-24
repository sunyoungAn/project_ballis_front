<template>
   <!-- <body class="container common_mt160 customer_wrap">
    <div class="div_box">
        <label class="lbl">이메일 주소</label>
    </div>
    <div class="input_box_1">
      <input class="form-control form-control-lg text-center" type="text" @keyup="checkEmail()" v-model="state.email" placeholder="aa@test.com">
    </div>

    <div style="display: inline-block; margin-left: 5px;">
      <button type="button" class="btn btn-outline-success" @click="sendMail()">인증번호</button>
    </div>

    <div style="text-align: center;">
      <p v-if="state.emailValid===false" style="color: red;">유효하지 않은 이메일입니다</p>
    </div>

    <div class="div_box">
      <label class="lbl">인증코드</label>
    </div>
    <div class="input_box_1">
      <input class="form-control form-control-lg text-center" type="text" v-model="state.joinCode" :disabled="state.isVerified" placeholder="인증코드를 입력해주세요"> 
    </div>

    <div style="display: inline-block; margin-left: 5px;">
      <button type="button" class="btn btn-outline-success"  @click="checkEmailCode()">인증확인</button>
    </div>

    <div class="div_box">
        <label class="lbl">휴대폰 번호</label>
    </div>
    <div class="input_box">
      <input class="form-control form-control-lg text-center" type="text" v-model="state.phoneNumber" placeholder="-제외한 휴대폰 번호를 입력해주세요">
    </div>

    <div class="div_box">
        <label class="lbl">비밀번호</label>
    </div>
    <div class="input_box">
      <input class="form-control form-control-lg text-center" type="password" maxlength="11" @keyup="checkPassword()" v-model="state.password" placeholder="8~20 영문 대소문자와 숫자로 입력해주세요">
      <p v-if="state.passwordValid===false" style="color: red;">사용할 수 없는 비밀번호입니다.</p>
    </div>

    <div class="div_box">
        <label class="lbl">비밀번호 확인</label>
    </div>
    <div class="input_box">
      <input class="form-control form-control-lg text-center" type="password" @keyup="checkPassword2()" v-model="state.password2" placeholder="비밀번호를 한번 더 입력해주세요">
      <p v-if="state.passwordValid2===false" style="color:red;">비밀번호가 일치하지 않습니다.</p>
    </div>

    <div class="div_box">
        <label class="lbl">성별</label>
    </div>

    <div class="button_box_1">
      <input type="radio" class="btn-check" name="options-outlined" id="success-outlined" v-model="state.gender" value="2" autocomplete="off" >
      <label class="btn btn-outline-success" for="success-outlined" name="gender" style="width: 100px; margin-right: 20px;">남성</label>
      <input type="radio" class="btn-check" name="options-outlined" id="danger-outlined" v-model="state.gender" value="1" autocomplete="off">
      <label class="btn btn-outline-success" for="danger-outlined" name="gender" style="width: 100px;">여성</label>
    </div>

    <div class="div_box">
      <label class="lbl">이름</label>
    </div>
    <div class="input_box">
      <input class="form-control form-control-lg text-center" type="text" v-model="state.name" placeholder="이름을 입력해 주세요">
    </div>

    
    <div class="button_box">
      <button type="button" class="btn btn-outline-success" @click="handleJoin()">회원가입</button>
    </div>
   </body> -->

  <div class="container common_mt160 customer_wrap">
    <div class="row justify-content-center">
      <div class="fs-3 fw-bold text-center mt-5">회원가입</div>
      
      <div class="col-lg-5">
        <div class="mt-5">
          <span class="fw-bold">이메일 주소</span>
          <div class="input-group mt-2">
            <input class="form-control form-control-lg text-center mx-2 custom_placeholder" type="text" @keyup="checkEmail()" v-model="state.email" placeholder="aa@test.com" />
            <button class="btn green_button_outline" @click="sendMail()">인증코드 발급</button>
          </div>
          <p class="mt-2" v-if="state.emailValid === false" style="color: #e25d5d;">유효하지 않은 이메일입니다.</p>
        </div>

        <div class="mt-3">
          <span class="fw-bold">인증코드</span>
          <div class="input-group mt-2">
            <input class="form-control form-control-lg text-center mx-2 custom_placeholder" type="text" v-model="state.joinCode" :disabled="state.isVerified" placeholder="인증코드 입력"> 
            <button class="btn green_button_outline" @click="checkEmailCode()">인증코드 확인</button>
          </div>
        </div>

        <div class="mt-3">
          <span class="fw-bold">휴대폰 번호</span>
          <input class="form-control form-control-lg mt-2 text-center custom_placeholder" type="text" v-model="state.phoneNumber" placeholder="- 제외한 휴대폰 번호 입력"> 
        </div>

        <div class="mt-3">
          <span class="fw-bold">비밀번호</span>
          <input class="form-control form-control-lg mt-2 text-center custom_placeholder" type="password" maxlength="11" @keyup="checkPassword()" v-model="state.password" placeholder="영문 대소문자, 숫자 조합 8-20자">
          <p class="mt-2" v-if="state.passwordValid===false" style="color: #e25d5d;">사용할 수 없는 비밀번호입니다.</p>
        </div>

        <div class="mt-3">
          <span class="fw-bold">비밀번호 확인</span>
          <input class="form-control form-control-lg mt-2 text-center custom_placeholder" type="password" maxlength="11" @keyup="checkPassword2()" v-model="state.password2" placeholder="비밀번호 재입력">
          <p class="mt-2" v-if="state.passwordValid2===false" style="color:#e25d5d;">비밀번호가 일치하지 않습니다.</p>
        </div>

        <div class="mt-3">
          <div class="row">
            <div class="col fw-bold">
              <span>성별</span>
            </div>
          
            <div class="btn-group w-100 mt-2" role="group" data-toggle="buttons">
              <label class="btn p-2" v-bind:class="state.gender === '2'? 'green_button' : 'not_checked'" @click="state.gender = '2'">
                남성
                <input type="radio" class="btn-check" name="options-outlined" v-model="state.gender" value="2" autocomplete="off" >
              </label>
              <label class="btn p-2" v-bind:class="state.gender === '1'? 'green_button' : 'not_checked'" @click="state.gender = '2'">
                여성
                <input type="radio" class="btn-check" name="options-outlined" v-model="state.gender" value="1" autocomplete="off" />
              </label>
          </div>
          </div>
        </div>

        <div class="mt-3">
          <span class="fw-bold">이름</span>
          <input class="form-control form-control-lg mt-2 text-center custom_placeholder"  type="text" v-model="state.name" placeholder="이름">
        </div>

        <button class="btn btn-lg w-100 mt-4 green_button fw-bold" @click="handleJoin()">회원가입</button>
      </div>
    </div>
  </div>



</template>

<script>
import { reactive } from 'vue'
import axios from "axios";
import { useRouter } from 'vue-router';

export default {
    setup(){

      const router = useRouter();

      const state = reactive({
        email:"",
        phoneNumber:"",
        password:"",
        password2:"",
        name:"",
        emailValid:true,
        passwordValid:true,
        passwordValid2:true,
        emailcodeValid:true,
        gender:"",
        joinCode:'',
        isVerified:false
      })



      const regMail = /^\w+([._-]?\w+)*@\w+([._-]?\w+)*\.\w{2,3}$/i;
      const regPassword = /^[a-zA-Z0-9]{8,20}$/;

     
      const checkEmail = () => {
        if(state.email===""){
          state.emailValid=true
        }
        else if(regMail.test(state.email)==true){
          state.emailValid=true
        } else if(regMail.test(state.email)==false){ 
          state.emailValid=false;
          }  
        }

        const checkPassword = () => {
          if(state.password===""){
            state.passwordValid=true
          } else if(regPassword.test(state.password)==true){
            state.passwordValid=true
          }else if(regPassword.test(state.password)==false){
            state.passwordValid=false;
          }
        }
      
        const checkPassword2 = () => {
          if(state.password2===""){
            state.passwordValid2=true
          } else if(state.password===state.password2) {
            state.passwordValid2=true
          } else if(state.password!==state.password2){
            state.passwordValid2=false
          }
        }
        
        const handleJoin = () =>{

          if(state.email === ""){
            window.alert("이메일 주소를 입력해 주세요");
            return false;
          }

          if (state.isVerified === false) {
           window.alert("이메일 인증을 완료해주세요.");
            return;
          }

          if(state.phoneNumber === ""){
            window.alert("휴대폰 번호를 입력해 주세요");
            return false;
          }

          if(state.password === ""){
            window.alert("비밀번호를 입력해 주세요");
            return false;
          }

          if(state.password2 === ""){
            window.alert("비밀번호를 한번 더 입력해 주세요");
            return false;
          }

          if(state.gender === ""){
            window.alert("성별을 선택해 주세요");
            return false;
          }

          if(state.name === ""){
            window.alert("이름을 입력해 주세요");
            return false;
          }

          axios.post("/api/join/member",state).then((res)=>{
            console.log(res);
            window.alert("회원가입이 완료되었습니다.");
            router.push({ path: '/member/login' });
          }).catch(()=>{
            window.alert("중복된 이메일 주소입니다.");
          })
        }
      
        const sendMail = ()=>{
          axios.post(`/api/email/member?email=${state.email}`).then((res)=>{
            console.log(res);
            window.alert("인증코드가 발송되었습니다.")
          }).catch(()=>{
            window.alert("발송 실패");
          })
        }

        const checkEmailCode = () => {
          
          axios.post(`/api/email/verify?email=${state.email}&joinCode=${state.joinCode}` ).then((res)=>{
            console.log(res);
            alert("인증이 완료되었습니다.")
            state.isVerified = true;
          }).catch(()=>{
            alert("인증이 실패하였습니다.")
          })
          
        
        }

      return{
        state,
        checkEmail,
        regMail,
        regPassword,
        checkPassword,
        checkPassword2,
        handleJoin,
        sendMail,
        checkEmailCode,
      }
    }
}
</script>

<style lang="css" scoped>
@import "../assets/css/common.css";
.green_button {
  background-color: rgb(103, 194, 58);
  color: #ffffff;
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
.not_checked {
    border-color: rgb(103, 194, 58);
    color: rgb(103, 194, 58);
}
.not_checked:hover {
    border-color: rgb(149, 212, 117) !important;
    color: rgb(149, 212, 117) !important;
}
</style>