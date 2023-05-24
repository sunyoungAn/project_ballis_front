<template>
    <div class="container common_mt160 customer_wrap">
        <section>
            <nav>
                <div class="p_tag_box text-start">
                    <p>고객센터</p>
                </div>
        
                <ul class="nav flex-column">
                    <li class="nav-item">
                        <router-link to="/notice">공지사항</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/mypage/inquiry">일대일문의</router-link>
                    </li>
                </ul>
            </nav>
            <article>
                <div class="p_tag_box">
                    <p>공지사항</p>
                    <hr>
                </div>

                <div>
                    <table class="table">
                    <thead>
                        <tr class="text-center">
                        <th scope="col" style="width:150px">글번호</th>
                        <th scope="col">글제목</th>
                        <th scope="col" style="width:300px">작성날짜</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="list of state.list" :key="list" @click="handleContent(list.id)" style="cursor: pointer;">
                        <th class="text-center" scope="row">{{ list.id }}</th>
                        <td>{{ list.title }}</td>
                        <td class="text-center">{{ formatDate(list.registDate) }}</td>
                        </tr>
                    </tbody>
                    </table>
                </div>
            </article>
        </section>

    </div>
</template>

<script>
import { onMounted, reactive } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
export default {
    setup () {
        
        const router = useRouter();

        const state = reactive({
            list:""
        })

        const handleData = () => {
            axios.get("/api/get/notice").then((data)=>{
                console.log(data);
                state.list=data.data;
                console.log(state.list)

            })
        }

        const handleContent = (no) =>{
            router.push({path:'/notice/content', query:{id:no}})
        };

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

        return {
            state,
            handleContent,
            formatDate
        }
    }
}
</script>

<style lang="css" scoped>
@import "../assets/css/common.css";

a{
  text-decoration: none;
  color: gray;
}
 

ul > li {
    margin-top: 15px;
    font-weight: bolder;
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