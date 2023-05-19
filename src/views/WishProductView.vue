<template>
    <div class="container common_mt160 cutomer_wrap">
       
       <section>
           <my-page-menu></my-page-menu>
           
           <article>
                 <div class="item_box">
                     <ul class="ul_item_box" v-for="tmp of state.list" :key="tmp">
                         <li><img :src="state.url" style="width: 50px; height: 50px;"></li>
                         <li>{{tmp.productKorName}}</li>
                         <div class="button-group">
                             <button type="button" class="btn btn-outline-success">구매하기</button>
                             <button type="button" class="btn btn-outline-success" @click="handleDelete(index, tmp.wishs[0].id)">삭제하기</button>
                         </div>
                     </ul>
                 </div>
           </article>
       </section>
   </div>
 </template>
 
 <script>
 import { onMounted, reactive } from 'vue'
 import MyPageMenu from '../components/MyPageMenu.vue'
 import axios from 'axios'
 export default {
   components: { MyPageMenu },
     setup () {
         const state = reactive({
             url : require('../assets/logo.png'),
             list:[],
             wishs:[],
             token : sessionStorage.getItem("TOKEN")
         })
 
         const handleData = async () =>{
             const url = `/api/get/wish/${state.token}`;
             const headers = {"Content-Type":"application/json", "auth" : state.token};
             const { data } = await axios.get(url,{headers});
             state.list = data;
             console.log(state.list)
             state.wishs = data.wishs
             console.log(state.wishs);
         }
 
         const handleDelete = async (index, id) => {
             if (confirm('삭제하시겠습니까?')) {
                 const url = `/api/delete/wish/${id}`;
                 const headers = {"Content-Type":"application/json"};
                 const body = {};
                 const {data} = await axios.delete(url, {headers:headers, data:body});
                 console.log(data);
                 // 삭제된 항목을 state에서도 제거
                 state.list.splice(index, 1);
             }
         }
         onMounted(()=>{
             handleData();
         })
 
         return {
             state,
             handleDelete
         }
     }
 }
 </script>
 
 <style lang="css" scoped>
 @import "../assets/css/common.css";
 
 section{
   display: grid;
   grid-template-columns: 200px auto;
   border: 2px solid gray;
 }
 
 article {
   padding:20px;
   /* border: 1px solid blue; */
 }
 
 .ul_item_box{
     text-align: center;
     padding: 15px;
     display: grid;
     grid-template-columns: auto 75% auto;
     list-style-type: none;
 }
 
 .item_box{
     width: 1000px;
     margin: 0px auto;
     display: inline-block;
 }
 
 .button-group {
   display: flex;
   flex-direction: column;
   align-items: center;
 }
 
 </style>