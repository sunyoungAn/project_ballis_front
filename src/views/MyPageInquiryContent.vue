<template>
    <div class="container common_mt160 cutomer_wrap">
        <section>
            <my-page-menu></my-page-menu>
            <article>
                <div class="p_tag_box">
                    <p>일대일문의</p>
                    <hr>
                </div>

                <div class="border border-dark-subtle p-2 mb-2 border-opacity-50">
                    <h4 class="text_title">{{ state.content.title}}</h4><br>
                    <span style="float: right; margin-right: 20px;">작성일 : {{ formatDate(state.content.inquiryRegistDate) }}</span><br><br>
                    <div style="margin-left: 20px;">
                        <span>{{ state.content.content}}</span>
                        <br><br><br>
                        <div v-for="tmp of state.images" :key="tmp">
                            <img :src="`http://localhost:8088/api/inquiry/display/image?imagePath=${tmp.imagePath}`" class="rounded" style="width: 150px;" />
                        </div>
                    </div>
                    
                    <div class="button_box3">
                        <button type="button" class="btn btn-outline-dark" style="margin-right: 20px;">수정</button>
                        <button type="button" class="btn btn-outline-dark" style="margin-right: 20px;" @click="handleDelete()">삭제</button>
                        <button type="button" class="btn btn-outline-dark" style="margin-right: 20px;"><a href="/mypage/inquiry">목록</a> </button>
                    </div>
                </div>

                
            </article>
          
        </section>

    </div>
</template>

<script>
import { onMounted, reactive } from 'vue'
import MyPageMenu from '../components/MyPageMenu.vue'
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'

export default {
  components: { MyPageMenu },
    setup () {
        
        const route = useRoute();
        const router = useRouter();

        const state = reactive({
            id:Number(route.query.id),
            content:'',
            images:[],
            image:[],

        })

        const targetId = state.id
        const handleData=()=>{
            axios.get(`/api/get/inquiry/${state.id}/${targetId}`).then((res)=>{
                console.log(res);
                state.content = res.data.inquiry;
                state.images = res.data.image;
                console.log(state.content);
                console.log(state.images);
            })
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

        const handleDelete= async ()=>{
           if(confirm('삭제하시겠습니까?')){
            const url = `/api/delete/inquiry/${state.content.id}`;
            const headers = {"Content-Type":"application/json"};
            const body={};
            const {data} = await axios.delete(url, {headers:headers, data:body});
            console.log(data);
           } 
           router.push({path:'/mypage/inquiry'});
        }

        onMounted(()=>{
            handleData();
        })


        return {
            state,
            targetId,
            formatDate,
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
  font-weight: bold;
}



.button_box3{
    /* float: right; */
    margin-left: 75%;
    padding: 10px;
}

.text_title{
    text-align: center;
    font-weight: bolder; 
    text-decoration: underline;
    text-underline-offset: 10px;
}

</style>