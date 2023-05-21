<template>
    <div class="container common_mt160 cutomer_wrap">
       
       <section>
           <my-page-menu></my-page-menu>
           
           <article>
                <div class="p_tag_box">
                    <p>관심상품</p>
                    <hr>
                </div>
                 <div class="item_box">
                     <ul class="ul_item_box" v-for="tmp of state.list" :key="tmp">
                         <li><img :src="`http://localhost:8088/api/wish/display/image?imagePath=${tmp.imagelist[0].imagePath}`" class="item_img main_img_background"></li>
                         <p class="fw-bolder product_name">{{ tmp.productName }}</p>
                         <div class="button-group">
                             <button type="button" class="btn btn-outline-success" @click="handleBuying(tmp.productId)">구매하기</button>
                             <button type="button" class="btn btn-outline-success" @click="handleDelete(index, tmp.wish.id)">삭제하기</button>
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
import { useRouter } from 'vue-router'
 export default {
   components: { MyPageMenu },
     setup () {

        const router = useRouter();

         const state = reactive({
             url : require('../assets/logo.png'),
             list:[],
             image:[],
             token : sessionStorage.getItem("TOKEN"),
             targetId : 3
         })
 
         //관심상품 출력
         const handleData = async () =>{
             const url = `/api/get/wish/${state.token}`;
             const headers = {"Content-Type":"application/json", "auth" : state.token};
             const { data } = await axios.get(url,{headers});
             state.list = data;
             console.log(state.list)
         }
         //상품구매이동
         const handleBuying = async(id) =>{
            router.push({path:'/product/one', query:{productid:id}});
         }
 
         //관심상품 삭제
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
             handleDelete,
             handleBuying
         }
     }
 }
 </script>
 
 <style lang="css" scoped>
 @import "../assets/css/common.css";
 
 section{
   display: grid;
   grid-template-columns: 200px auto;
 }
 
 article {
   padding:20px;
   /* border: 1px solid blue; */
 }
 
 .ul_item_box{
     font-size:large;
     padding: 15px;
     display: grid;
     grid-template-columns: auto 75% auto;
     list-style-type: none;
 }

 .product_name{
  font-size: large;
  margin-top:20px;
  font-weight: bold;
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

 .item_img{
    width: 70px;
    height: 70px;
 }
 .main_img_background {
    width:100px;
    background-color: #E0E0E0;
}
 
 </style>