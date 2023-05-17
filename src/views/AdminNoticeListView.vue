<template>
    <div class="container common_mt160 admin_wrap">
        <admin-sub-menu></admin-sub-menu>
        <div class="admin_content">
            <h1 class="mb-4">| 공지관리</h1>

            <!-- 검색 영역 -->
            <div class="mb-5">
                <h2 class="mb-4">공지 검색</h2>
                <div class="px-5">
                    <div class="row mb-3">
                        <div class="col-2 py-2">
                        </div>
                        <div class="col-2">
                            <select class="form-select" v-model="state.select">
                                <option :value=1>제목</option>
                                <option :value=2>내용</option>
                                <option :value=3>제목+내용</option>
                            </select>
                        </div>
                        <div class="col-7">
                            <input type="text" class="form-control" v-model="state.form.searchCondition" placeholder="검색내용">
                        </div>
                    </div>
                    
                </div>
                <div class="d-flex justify-content-center mt-4">
                    <button class="btn btn-success btn-lg" @click="search()">검색</button>
                </div>
            </div>

            <!-- 검색 결과-->
            <div>
                <table class="table align-middle" >
                    <thead>
                        <tr class="text-center">
                            <th scope="col" width="50px"></th>
                            <th scope="col" width="150px">공지번호</th>
                            <th scope="col">제목</th>
                            <th scope="col" width="200px">등록일</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="data of state.rows" :key="data">  
                            <td class="text-center"><input class="form-check-input" type="checkbox" :value="data.id" v-model="state.check"></td>
                            <td class="text-center">{{ data.id }}</td>
                            <td @click="moveNoticeEdit(data.id)" style="cursor: pointer;">{{ data.title }}</td>
                            <td class="text-center">{{ changeDateFormat(data.registDate) }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
            <!-- 페이지네이션-->
            <nav class="d-flex justify-content-center my-4">
                <el-pagination background layout="prev, pager, next" @current-change="changePage" :total="state.total" />
            </nav>

            <div class="d-flex justify-content-center mt-5">
                <button class="btn btn-success btn-lg d-flex justify-content-end me-2" @click="moveNoticeRegister()">공지등록</button>
                <button class="btn btn-success btn-lg d-flex justify-content-start ms-2" @click="deleteNotice()">공지삭제</button>
            </div>  
        </div>

    </div>
</template>

<script>
import AdminSubMenu from '@/components/AdminSubMenu.vue'
import { onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

export default {
    name: 'SubMenu',
    components: {
        AdminSubMenu
    },
    setup () {
       
        // 페이지 이동 라우트
        const router = useRouter();

        const state = reactive({
            rows : [],
            total : 0,
            page: 0,
            select : 1,
            form : {
                selectNumber : 1,
                searchCondition: ''
            },
            check:[],
            isSearch : false
        })
        
        // 공지사항 전체 가져오기
        const loadData = () => {
            axios.get(`/api/admin/notice/getall?page=${state.page}`).then((res)=>{
                console.log(res.data);
                state.rows = res.data.content;
                state.total = res.data.totalElements;
                state.check = [];
            }).catch(()=>{
            })
        }

        // 검색하기
        const search = () => {

            state.form.selectNumber = state.select;

            if(state.form.searchCondition === '') {
                state.isSearch = false;
            } else {
                state.isSearch = true;
            }

            axios.post(`/api/admin/notice/search?page=${state.page}`, state.form).then((res)=>{
                console.log(res.data);
                state.rows = res.data.content;
                state.total = res.data.totalElements;
                state.check = [];
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

        // 페이징기능
        const changePage = (page) => {
            console.log(page);
            state.page = page - 1; // 상태변수값 변경
            if(state.isSearch === false) {
                loadData(); // 데이터가져오기
            } else {
                search();
            }
        }

        // 공지수정페이지로 이동
        const moveNoticeEdit = (no) => {
            router.push({path:'/admin/notice/edit', query:{no : no} });
        }

        // 공지등록페이지로 이동
        const moveNoticeRegister = () => {
            router.push({path:'/admin/notice/register'});
        }

        // 공지삭제
        const deleteNotice = () => {
            
            if(state.check.length === 0) {
                window.alert("삭제할 대상을 1개 이상 선택해주세요.");
                return false;
            }

            if(confirm("선택한 공지사항을 삭제하시겠습니까?")) {
                axios.delete(`/api/admin/notice/delete/${state.check}`).then((res)=>{
                    console.log(res.data);
                    window.alert("공지사항이 정상적으로 삭제되었습니다.");
                    loadData();
                    // 내용 초기화
                    state.check = [];
                    state.select = 1;
                    state.form.searchCondition = '';
                }).catch(()=>{
                    window.alert("공지사항 삭제중 오류가 발생하였습니다.");
                })
            }
            

        }

        // 페이지로드
        onMounted(() => {
            loadData();
        })

        // 리턴값
        return {
            state,
            search,
            changeDateFormat,
            moveNoticeEdit,
            moveNoticeRegister,
            changePage,
            deleteNotice
        }
    }
}
</script>

<style lang="css" scoped>
@import "../assets/css/common.css";

</style>