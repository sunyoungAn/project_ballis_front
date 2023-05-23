<template>
    <body class="container common_mt160 customer_wrap">
     <div class="div_box">
         <label class="lbl">이메일 주소</label>
     </div>
     <div class="input_box">
       <input class="form-control form-control-lg text-center" v-model="state.email" type="text" placeholder="이메일 주소를 입력해주세요">
     </div>
 
     <div class="div_box">
         <label class="lbl">비밀번호</label>
     </div>
     <div class="input_box">
       <input class="form-control form-control-lg text-center" v-model="state.password" type="password" placeholder="비밀번호를 입력해주세요">
     </div>

     <div class="button_box">
       <button type="button" class="btn btn-outline-success" @click="handleLogin()">로그인</button>
     </div>

     <div class="button_box2">
        <button type="button" style="margin-right: 15px;" class="btn btn-outline-success"><router-link to="/member/join">회원가입</router-link></button>
        <button type="button" style="margin-right: 15px;" class="btn btn-outline-success"><router-link to="/email/find">아이디찾기</router-link></button>
        <button type="button" style="margin-right: 15px;" class="btn btn-outline-success"><router-link to="/password/find">비밀번호찾기</router-link></button>
     </div>
    </body>
 </template>
 
 <script>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios';
import { useStore } from 'vuex';
 export default {
     setup () {

      const router = useRouter();

      const store = useStore();
         
      const state = reactive({
        email : "",
        password: ""
      })

 
      // const handleLogin = async ()=>{
      //   if(state.email === ''){
      //     alert('이메일을 입력하세요');
      //     return false;
      //   }

      //   if(state.password === ''){
      //     alert('비밀번호를 입력하세요');
      //     return false;
      //   }

      //   const url = `/api/login/member`;
      //   const headers = {"Content-Type":"application/json"};
      //   const body = { email:state.email, password:state.password};
      //   const { data } = await axios.post(url, body, {headers});
      //   console.log(data);
      //   try {
      //     const res = await axios.post(url, body, { headers });
      //     // console.log(res.data);
      //     console.log(res.data.memberNumber);
      //     // sessionStorage.setItem("TOKEN", res.data);
      //     sessionStorage.setItem("TOKEN", res.data.memberNumber);
      //     store.commit('setLogged', true);
      //     store.commit('setMemberStatus', res.data.memberStatus);
      //     alert('로그인 되었습니다');
      //     router.push({ path: '/' });
      //   } catch (error) {
      //     alert('로그인 실패');
      //   }
      // }

      const handleLogin = async () => {
        if (state.email === '') {
          alert('이메일을 입력하세요');
          return false;
        }

        if (state.password === '') {
          alert('비밀번호를 입력하세요');
          return false;
        }

        const url = `/api/login/member`;
        const headers = { "Content-Type": "application/json" };
        const body = { email: state.email, password: state.password };
        
        try {
          const { data } = await axios.post(url, body, { headers });
          console.log(data);
          
          if (data.memberNumber) {
            sessionStorage.setItem("TOKEN", data.memberNumber);
            store.commit('setLogged', true);
            store.commit('setMemberStatus', data.memberStatus);
            alert('로그인 되었습니다');
            
            // 로그인 이전페이지 주소 정보 가져오기
            const path = sessionStorage.getItem("CURRENT_PATH");
            const query = JSON.parse (sessionStorage.getItem("QUERY"));
            
            if(path === '/product/one'){ // 로그인 이후 다시 돌아와야하는 페이지
              router.push({path:path, query:query});
            } else { // 나머지는 홈으로
              router.push({ path: '/' });
            }  

          } else {
            window.alert("이메일과 비밀번호가 일치하지 않습니다");
          }
        } catch (error) {
          console.error(error);
          alert('회원 정보가 없습니다');
        }
      }
      return {
        state,
        handleLogin
      }
    }
 }
 </script>
 
 <style lang="css" scoped>
 @import "../assets/css/common.css";

 a{
    text-decoration: none;
    color: green;
  }
 
  a:hover{
   color:white
  }
 
 
 </style>