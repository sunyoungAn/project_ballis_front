<template>
    <div class="container common_mt160 admin_wrap">
        <admin-sub-menu></admin-sub-menu>
        <div class="admin_content">
            <h1 class="mb-4">| 문의답변등록</h1>

             <!-- 입력 영역 -->
             <div class="admin_reply_wrap my-5">
                <table class="table table-bordered">
                    <tr style="height: 55px;">
                        <th style="width:150px">문의등록일</th>
                        <td style="width:350px">{{ changeDateFormat(state.data.inquiryRegistDate) }}</td>
                        <th style="width:150px">문의처리상태</th>
                        <td>{{ state.data.inquiryStatusName }}</td>
                    </tr>
                    <tr style="height: 55px;">
                        <th style="width:150px">문의등록자</th>
                        <td style="width:350px">{{ state.data.name }}</td>
                        <th>이메일</th>
                        <td>{{ state.data.email }}</td>
                    </tr>
                    <tr style="height: 55px;">
                        <th>문의제목</th>
                        <td colspan="3">
                            {{ state.data.title }}
                        </td>
                    </tr>
                    <tr style="height: 55px;">
                        <th>문의내용</th>
                        <td class="py-2" colspan="3">
                            {{ state.data.content }}
                        </td>
                    </tr>
                    <tr style="height: 55px;">
                        <th>첨부이미지</th>
                        <td v-if="state.data.pathList !== null"  colspan="3">
                            <ul class="mb-0">
                                 <li v-for="(item, idx) in state.data.pathList" :key="idx">
                                    <!-- <a :href ="'http://localhost:8088/api/download?pathName='+item">첨부이미지 {{ idx+1 }} </a> -->
                                    <a :href =state.downlosturl+item>첨부이미지 {{ idx+1 }} </a>
                                </li>
                            </ul>
                        </td>
                        <td v-else colspan="3">
                            첨부이미지가 없습니다.
                        </td>
                    </tr>
                </table>

                <div class="mb-4">
                    <label class="form-label fs-5">| 답변내용</label>
                    <div class="px-2">
                        <textarea class="form-control" v-model="state.form.answer" placeholder="답변내용입력" style="height: 300px"></textarea>
                    </div>
                </div>
             </div>

            <!-- 버튼 영역 -->
            <div class="d-flex justify-content-center mt-3">
                <button class="btn btn-success btn-lg d-flex justify-content-end me-2" @click="registerReply()">답변등록</button>
                <button class="btn btn-success btn-lg d-flex justify-content-start ms-2" @click="moveInquiryList()">목록으로</button>
            </div>

        </div>

    </div>
</template>

<script>
import AdminSubMenu from '@/components/AdminSubMenu.vue'
import { useRoute,useRouter } from 'vue-router';
import { onMounted, reactive } from 'vue';
import axios from 'axios';

export default {
    name: 'SubMenu',
    components: {
        AdminSubMenu
    },
    setup () {
        // 페이지 이동 라우트
        const route = useRoute();
        const router = useRouter();

        const state = reactive({
            id : Number(route.query.no),
            data : '',
            form : {
                answer : ''
            },
            downlosturl : '/api/download?pathName='
        })

        // 문의상세내용
        const loadData = () => {
            axios.get(`/api/admin/inquiry/getone/${state.id}`).then((res)=>{
                console.log(res.data);
                state.data = res.data;
                state.form.answer = res.data.answer;
            }).catch(()=>{
            })
        }

        // 날짜형식변환 yyyy/mm/dd
        const changeDateFormat = (data) => {
            let date = new Date(data);
            let year = date.getFullYear();
            let month = ("0" + (1 + date.getMonth())).slice(-2);
            let day = ("0" + date.getDate()).slice(-2);

            return year + "/" + month + "/" + day;
        }

        // 답변등록
        const registerReply = () => {
            // 유효성체크
            // 답변입력체크
            if(state.form.answer === '') {
                alert('답변을 입력해주세요.');
                return false;
            }

            axios.put(`/api/admin/inquiry/reply/${state.id}`, state.form).then((res)=>{
                console.log(res);
                window.alert("답변이 성공적으로 등록되었습니다.");
                router.push({path:'/admin/inquiry/list'});
            }).catch(()=>{
                window.alert("답변등록 중 오류가 발생하였습니다. 다시 시도해주세요.");
            })


        }

        // 문의리스트로 이동
        const moveInquiryList = () =>{
            router.push({path:'/admin/inquiry/list'});
        }

        onMounted(()=>{
            loadData();
        });

        return {
            state,
            moveInquiryList,
            changeDateFormat,
            registerReply
        }
    }
}
</script>

<style lang="css" scoped>
@import "../assets/css/common.css";

.admin_reply_wrap {
    width: 1000px;
    margin-left: auto;
    margin-right: auto;
}


</style>