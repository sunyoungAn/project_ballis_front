<template>
    <div class="container common_mt160 cutomer_wrap">
        <section>
            <my-page-menu></my-page-menu>
            <article>
                <div class="p_tag_box">
                    <p>일대일문의</p>
                    <hr>
                </div>

                <div v-show="state.div===1">
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
                            <button type="button" class="btn btn-outline-dark" style="margin-right: 20px;" @click="state.div=2">수정</button>
                            <button type="button" class="btn btn-outline-dark" style="margin-right: 20px;" @click="handleDelete()">삭제</button>
                            <button type="button" class="btn btn-outline-dark" style="margin-right: 20px;"><router-link to="/mypage/inquiry">목록</router-link></button>
                        </div>
                    </div>
                </div>

                <div v-show="state.div===2">
                    <div class="input_box">
                        <input class="form-control form-control-lg" v-model="state.content.title" style="text-align: center;" 
                            type="text" placeholder="문의 제목 입력" aria-label=".form-control-lg example">
                        
                        <br>

                        <select class="form-select" style="width:150px" v-model="state.content.category" aria-label="Default select example">
                            <option value="1">구매관련</option>
                            <option value="2">판매관련</option>
                            <option value="3">기타</option>
                        </select>
                        <br>
                        <div class="form-floating">
                            <textarea rows="6" class="form-control" v-model="state.content.content"  id="floatingTextarea2" style="height: 300px;" ></textarea>
                        </div>

                        <br>
                    </div>
                    <div style="float: right; margin-right: 15%;">
                        <button type="button" class="btn btn-outline-success" @click="handleEdit(state.content.id)" >수정</button>
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
            div:1
        })

        //문의글 1개 조회
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

        //날짜 상태 변경
        const formatDate = (dateString) => {
            const date = new Date(dateString);
            const year = date.getFullYear();
            const month = ('0' + (date.getMonth() + 1)).slice(-2);
            const day = ('0' + date.getDate()).slice(-2);
            const hour = ('0' + date.getHours()).slice(-2);
            const minute = ('0' + date.getMinutes()).slice(-2);
            return `${year}-${month}-${day} ${hour}:${minute}`;
        };

        //문의 삭제
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

        const handleEdit = (id) => {
            axios.put(`/api/edit/inquiry/${id}`, state.content).then((res)=>{
            console.log(res);
            window.alert("문의글이 수정되었습니다.");
            state.div=1;
            handleData();
           }).catch((err)=>{
            console.log(err);
            window.alert("등록 실패");
           })
        }

        onMounted(()=>{
            handleData();
        })


        return {
            state,
            targetId,
            formatDate,
            handleDelete,
            handleEdit
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