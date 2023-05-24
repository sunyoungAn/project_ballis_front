<template>
    <div class="container common_mt160 customer_wrap">
        <section>
            <nav>
                <div class="p_tag_box">
                    <p>고객센터</p>
                </div>
        
                <ul class="nav flex-column">
                    <li class="nav-item">
                        <a class="nav-link" href="/notice">공지사항</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/mypage/inquiry">일대일문의</a>
                    </li>
                </ul>
            </nav>

            <article>
                <div class="p_tag_box">
                    <p>공지사항</p>
                    <hr>
                </div>

                <div>
                    <p class="fs-3">{{ state.content.title }}</p>
                    <p class="text-end">등록일 : {{ formatDate(state.content.registDate) }}</p>
                    <br>
                    <div v-html="state.content.content"></div> 
                </div>
            </article>
        </section>

    </div>
</template>

<script>
import { onMounted, reactive } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'
export default {
    setup () {

        const route = useRoute();
        
        const state = reactive({
            id:Number(route.query.id),
            content:'',
        })

        const handleData = ()=>{
            axios.get(`/api/get/notice/${state.id}`).then((res)=>{
                console.log(res);
                state.content = res.data;
                console.log(state.content)
            })
        }

        const formatDate = (dateString) => {
                const date = new Date(dateString);
                const year = date.getFullYear();
                const month = ('0' + (date.getMonth() + 1)).slice(-2);
                const day = ('0' + date.getDate()).slice(-2);
                return `${year}-${month}-${day}`;
        };

        onMounted(()=>{
            handleData();
        })

    
        return {state,formatDate}
    }
}
</script>

<style lang="css" scoped>
@import "../assets/css/common.css";

a{
  text-decoration: none;
  color: gray;
}
 
a:hover{
  color: black;
  font-weight: bold;
}


section{
   display: grid;
   grid-template-columns: 200px auto;
   /* border: 1px solid gray; */
}

nav {
   padding: 20px;
   float: left;
   /* border: 1px solid green; */
}

article {
   padding:20px;
   /* border: 1px solid blue; */
}



</style>