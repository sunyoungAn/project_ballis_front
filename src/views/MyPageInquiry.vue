<template>
    <div class="container common_mt160 cutomer_wrap">
        <section>
            <my-page-menu></my-page-menu>
            <article>
                <div class="p_tag_box">
                    <p>일대일문의</p>
                    <hr>
                </div>

                <div style="float: right; margin-bottom: 30px;">
                    <button type="button" class="btn btn-outline-dark" @click="handleInsert()">글쓰기</button>
                </div>

                <div>
                    <table class="table">
                    <thead>
                        <tr style="text-align: center;">
                        <th scope="col" style="width:100px">문의번호</th>
                        <th scope="col" style="width:300px">글제목</th>
                        <th scope="col" style="width:100px">문의유형</th>
                        <th scope="col" style="width:100px">작성날짜</th>
                        <th scope="col" style="width:100px">문의답변</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="tmp of state.list" :key="tmp"  @click="handleContent(tmp.id)" style="cursor: pointer;">
                        <th scope="row" style="text-align: center;">{{ tmp.id }}</th>
                        <td>{{ tmp.title }}</td>
                        <td style="text-align: center;">{{ tmp.category === 1 ? '구매관련' :
                               tmp.category === 2 ? '판매관련' : '기타'  }}</td>
                        <td>{{ formatDate(tmp.inquiryRegistDate) }}</td>
                        <td style="text-align: center;">{{ tmp.inquiryStatus === 1 ? 'X' : 'O' }}</td>
                        </tr>
                    </tbody>
                    </table>
                </div>
            </article>
        </section>

    </div>
</template>

<script>
import { onMounted, reactive } from 'vue';
import MyPageMenu from '../components/MyPageMenu.vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
export default {
    components: { MyPageMenu },
    setup () {
        
        const router = useRouter();

        const state = reactive({
            list:[],
            member : sessionStorage.getItem("TOKEN"),
            
        })

        const handleData = async () => {
            const url = `/api/get/inquirys/${state.member}`;
            const headers = {"Content-Type":"application/json", "auth" : state.member};
            const {data} = await axios.get(url, {headers});
            state.list = data.sort((a, b) => b.id - a.id);
            console.log(state.list);
        }

        const formatDate = (dateString) => {
            const date = new Date(dateString);
            const year = date.getFullYear();
            const month = ('0' + (date.getMonth() + 1)).slice(-2);
            const day = ('0' + date.getDate()).slice(-2);
            const hour = ('0' + date.getHours()).slice(-2);
            const minute = ('0' + date.getMinutes()).slice(-2);
            return `${year}-${month}-${day} ${hour}:${minute}`;
        };

        const handleContent = (no) =>{
            router.push({path:'/mypage/inquiry/content', query:{id:no}})
        };

        const handleInsert = () => {
            router.push({path:'/mypage/inquiry/insert'});
        }

        onMounted(()=>{
            handleData();
        })
        

        return {
            state,
            formatDate,
            handleContent,
            handleInsert
            
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

a{
  text-decoration: none;
  color: black;
}

a:hover{
  color: white;
  background-color: none; 
}


</style>