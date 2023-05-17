<template>
    <div class="container common_mt160 admin_wrap">
        <admin-sub-menu></admin-sub-menu>
        <div class="admin_content">
            <h1 class="mb-4">| 문의관리</h1>

            <!-- 검색 영역 -->
            <div class="mb-5">
                <h2 class="mb-4">문의 검색</h2>
                <div class="px-5">
                    <div class="row mb-3">
                        <div class="col-2 py-2">
                            문의번호
                        </div>
                        <div class="col-4">
                            <input type="text" class="form-control" v-model="state.searchId" placeholder="문의번호">
                        </div>
                        <div class="col-2 py-2">
                            문의유형
                        </div>
                        <div class="col-4">
                            <select class="form-select" v-model="state.searchCategory">
                                <option v-for="status in state.categoryList" :key="status" :value="status.id">{{ status.value }}</option>
                            </select>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-2 py-2">
                            회원번호
                        </div>
                        <div class="col-4">
                            <input type="text" class="form-control" v-model="state.searchMemberNumber" placeholder="회원번호">
                        </div>
                        <div class="col-2 py-2">
                            문의처리상태
                        </div>
                        <div class="col-4">
                            <select class="form-select" v-model="state.searchInquiryStatus">
                                <option v-for="status in state.inquiryStatusList" :key="status" :value="status.id">{{ status.value }}</option>
                            </select>
                        </div>
                    </div>
                    
                </div>
                <div class="d-flex justify-content-center mt-4">
                    <button class="btn btn-success btn-lg" @click="search()">검색</button>
                </div>
            </div>

            <!-- 검색 결과-->
            <div>
                <table class="table align-middle">
                    <thead>
                        <tr class="text-center">
                            <th scope="col" width="50px">
                                <input class="form-check-input" type="checkbox" :checked="state.checkAll" @change="checkAllEvnet()"> 
                            </th>
                            <th scope="col" width="100px">문의번호</th>
                            <th scope="col" width="100px">문의유형</th>
                            <th scope="col">문의제목</th>
                            <th scope="col" width="120px">문의작성자</th>
                            <th scope="col" width="120px">문의처리상태</th>
                            <th scope="col" width="120px">문의등록일</th>
                            <th scope="col" width="120px">문의답변일</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="text-center" v-for="data of state.rows" :key="data">
                            <td>
                                <input class="form-check-input" type="checkbox" :value="data.id" v-model="state.checkList" @change="checkEvnet()">
                            </td>
                            <td>{{ data.id }}</td>
                            <td>{{ data.category }}</td>
                            <td @click="moveInquiryReply(data.id)" style="cursor: pointer;">{{ data.title }}</td>
                            <td>
                                <el-popover placement="top-start" :title=data.name :width="300" trigger="hover" :content=data.email>
                                    <template #reference>
                                        {{ data.memberNumber }}
                                    </template> 
                                </el-popover>
                            </td>
                            <td>{{ data.inquiryStatusName }}</td>
                            <td>{{ changeDateFormat(data.inquiryRegistDate) }}</td>
                            <td>{{ changeDateFormat(data.answerRegistDate) }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
            <!-- 페이지 네이션-->
            <nav class="d-flex justify-content-center mt-4">
                <el-pagination background layout="prev, pager, next" @current-change="changePage" :total="state.total" />
            </nav>

            <div class="d-flex justify-content-center mt-5">
                <button class="btn btn-success btn-lg d-flex justify-content-start" @click="deleteInquiry()">문의삭제</button>
            </div>

        </div>
    </div>
</template>

<script>
import AdminSubMenu from '@/components/AdminSubMenu.vue'
import { onMounted, reactive } from 'vue'; 
import axios from 'axios';
import { useRouter } from 'vue-router';

export default {
    name: 'SubMenu',
    components: {
        AdminSubMenu
    },
    setup () {

        // 페이지 이동 라우트
        const router = useRouter();
        
        // 상태변수
        const state = reactive({
            rows : [],
            total : 0,
            page : 0,
            isSearch : false,
            checkAll : false,
            checkList : [],
            searchId : '', // 검색조건
            searchCategory : 0,
            searchMemberNumber : '', // 검색조건
            searchInquiryStatus : 0, // 검색조건
            categoryList : [
                { id : 0, value : '문의유형'},
                { id : 1, value : '구매관련'},
                { id : 2, value : '판매관련'},
                { id : 3, value : '기타'},
            ],
            inquiryStatusList : [
                { id : 0, value : '문의처리상태'},
                { id : 1, value : '처리중'},
                { id : 2, value : '처리완료'},
            ],
        })

        // 문의관리리스트페이지에 띄울 정보 모두 가져오기
        const loadData = () => {
            axios.get(`/api/admin/inquiry/getall?page=${state.page}`).then((res)=>{
                console.log(res.data);
                state.rows = res.data.inquiryList;
                state.total = res.data.total;
                state.checkAll = false;
                state.checkList = [];
                // 검색조건 초기화
                state.searchId = '';
                state.searchCategory = 0;
                state.searchMemberNumber = '';
                state.searchInquiryStatus = 0;
            }).catch(()=>{
            })
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

        // 검색하기
        const search = () => {

            if( isNaN(state.searchId)) {
                window.alert("문의번호는 숫자만 입력해주세요.");
                state.searchId = '';
                return false;
            }

            if( isNaN(state.searchMemberNumber)) {
                window.alert("회원번호는 숫자만 입력해주세요.");
                state.searchMemberNumber = '';
                return false;
            }

            // 검색플래그 설정
            if(state.searchId === '' && state.searchCategory === '' && 
                state.searchMemberNumber === '' && state.searchInquiryStatus === 0) {
                state.isSearch = false;
            } else {
                state.isSearch = true;
            }

            axios.get(`/api/admin/inquiry/search?page=${state.page}&id=${state.searchId}&category=${state.searchCategory}&memberNumber=${state.searchMemberNumber}&inquiryStatus=${state.searchInquiryStatus}`).then((res)=>{
                console.log(res.data);
                state.rows = res.data.inquiryList;
                state.total = res.data.total;
                state.checkAll = false;
                state.checkList = [];
            }).catch(()=>{
            })

        }

        // 전체선택 처리
        const checkAllEvnet = () => {
            if(state.checkAll === false) {
                for(let idx in state.rows) {

                    // 이미 선택되어 있는 경우에는 중복선택 제외하기
                    if(state.checkList.includes(state.rows[idx].id)) {
                        continue;
                    }
                    state.checkList.push(state.rows[idx].id);
                }
                state.checkAll = true;
            } else {
                state.checkList = [];
                state.checkAll = false;
            }
        }

        // 체크박스 개별 처리
        const checkEvnet = () => {
            if(state.checkList.length === state.rows.length) {
                state.checkAll = true;
            } else {
                state.checkAll = false;
            }
        }

        // 날짜형식변환 yyyy/mm/dd
        const changeDateFormat = (data) => {

            if(data === null) {
                return "-";
            }

            let date = new Date(data);
            let year = date.getFullYear();
            let month = ("0" + (1 + date.getMonth())).slice(-2);
            let day = ("0" + date.getDate()).slice(-2);

            return year + "/" + month + "/" + day;
        }

        // 문의삭제
        const deleteInquiry = () => {

            if(state.checkList.length === 0) {
                window.alert("대상을 1개 이상 선택해주세요.");
                return false;
            }

            if(confirm("선택한 문의를 삭제하겠습니까?")) {
                // 처리완료데이터는 삭제 안되게 사전 체크
                for(let idx in state.rows) {
                    if(state.checkList.includes(state.rows[idx].id)) {
                        if(state.rows[idx].inquiryStatus === 2) {
                            window.alert("문의번호" + state.rows[idx].id +"번은 처리완료된 번호로 삭제할 수 없습니다.");
                            return false;
                        }
                    }
                }

                //체크에 문제가 없으면 삭제처리 실행
                axios.delete(`/api/admin/inquiry/delete/${state.checkList}`).then((res)=>{
                    console.log(res.data);
                    window.alert("삭제처리가 정상적으로 처리되었습니다.");
                    loadData();
                }).catch(()=>{
                    window.alert("삭제처리 중 오류가 발생하였습니다.");
                })
            }

        }

        // 문의답변등록페이지로 이동
        const moveInquiryReply = (id) => {
            router.push({path:'/admin/inquiry/reply', query:{no : id}});
        }

        onMounted(() => {
            loadData();
        })

        return {
            state,
            checkAllEvnet,
            checkEvnet,
            changeDateFormat,
            changePage,
            search,
            deleteInquiry,
            moveInquiryReply
        }
    }
}
</script>

<style lang="css" scoped>
@import "../assets/css/common.css";

</style>