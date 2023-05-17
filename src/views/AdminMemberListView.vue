<template>
    <div class="container common_mt160 admin_wrap">
        <admin-sub-menu></admin-sub-menu>
        <div class="admin_content">
            <h1 class="mb-4">| 회원관리</h1>

            <!-- 검색 영역 -->
            <div class="mb-5">
                <h2 class="mb-4">회원 검색</h2>
                <div class="px-5">
                    <div class="row mb-3">
                        <div class="col-2 py-2">
                            회원번호
                        </div>
                        <div class="col-4">
                            <input type="text" class="form-control" v-model="state.memberNumber" placeholder="회원번호">
                        </div>
                        <div class="col-2 py-2">
                            회원이름
                        </div>
                        <div class="col-4">
                            <input type="text" class="form-control" v-model="state.name" placeholder="회원이름">
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-2 py-2">
                            이메일
                        </div>
                        <div class="col-4">
                            <input type="email" class="form-control" v-model="state.email" placeholder="이메일">
                        </div>
                        <div class="col-2 py-2">
                            휴대폰번호
                        </div>
                        <div class="col-4">
                            <input type="text" class="form-control" maxlength="11" v-model="state.phoneNumber" placeholder="-를 제외하고 입력해주세요">
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
                            <th scope="col">회원번호</th>
                            <th scope="col">회원이름</th>
                            <th scope="col">이메일</th>
                            <th scope="col">휴대폰번호</th>
                            <th scope="col">가입일</th>
                            <th scope="col">회원상태</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="data of state.rows" :key="data">
                            <td class="text-center"><input class="form-check-input" type="checkbox" :value="data.memberNumber" v-model="state.checkList" :disabled="data.memberStatus === 3" @change="checkEvnet()"></td>
                            <td class="text-center">{{ data.memberNumber }}</td>
                            <td class="text-center" @click="moveMemberEdit(data.memberNumber)" style="cursor: pointer;">{{ data.name}}</td>
                            <td>{{ data.email }}</td>
                            <td class="text-center">{{ changePhoneNumberFormat(data.phoneNumber) }}</td>
                            <td class="text-center">{{ changeDateFormat(data.registDate) }}</td>
                            <td class="text-center">{{ changeMemberStatusFormat(data.memberStatus) }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
            <!-- 페이지 네이션-->
            <nav class="d-flex justify-content-center mt-4">
                <el-pagination background layout="prev, pager, next" @current-change="changePage" :total="state.total" />
            </nav>

            <div class="d-flex justify-content-center mt-5">
                <button class="btn btn-success btn-lg d-flex justify-content-start" @click="withdrawal()" >회원탈퇴</button>
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
            memberNumber : '', // 검색조건
            name : '', // 검색조건
            email : '', // 검색조건
            phoneNumber : '', // 검색조건
            checkList:[],
            checkAll : false,
            targetMemberList : 0,
            isSearch : false
        })

        // 회원 전체 가져오기
        const loadData = () => {
            axios.get(`/api/admin/member/getall?page=${state.page}`).then((res)=>{
                console.log(res.data);
                state.rows = res.data.content;
                state.total = res.data.totalElements;
                state.checkAll = false;
                state.checkList = [];
                // 검색조건 초기화
                state.memberNumber = '';
                state.name = '';
                state.email = ''; 
                state.phoneNumber = '';

                for(let idx in state.rows) {
                    if(state.rows[idx].memberStatus !== 3) {
                        state.targetMemberList = state.targetMemberList + 1;
                    }
                }

            }).catch(()=>{
            })
        }

        // 페이징기능
        const changePage = (page) => {
            console.log(page);
            state.page = page - 1; // 상태변수값 변경
            state.checkList = [];
            state.checkAll = false;
            if(state.isSearch === false) {
                loadData(); // 게시물 읽기
            } else {
                search();
            }
        }

        // 검색하기
        const search = () => {

            // 유효성체크
            if( isNaN(state.memberNumber)) {
                window.alert("회원번호는 숫자만 입력해주세요");
                state.memberNumber = '';
                return false;
            }

            if(state.memberNumber === '' && state.name === '' && state.email === '' && state.phoneNumber === '') {
                state.isSearch = false;
            } else {
                state.isSearch = true;
            }

            axios.get(`/api/admin/member/search?page=${state.page}&memberNumber=${state.memberNumber}&name=${state.name}&email=${state.email}&phoneNumber=${state.phoneNumber}`).then((res)=>{
                console.log(res.data);
                state.rows = res.data.content;
                state.total = res.data.totalElements;
                state.checkAll = false;
                state.checkList = [];
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

        // 휴대폰번호형식변환 000-0000-0000
        const changePhoneNumberFormat = (data) => {
            return data.replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
        }

        // 회원상태형식변환
        const changeMemberStatusFormat = (data) => {
            if(data === 1) {
                return "관리자";
            } else if (data === 2) {
                return "일반회원";
            } else if (data === 3) {
                return "탈퇴";
            }
        }

        // 회원수정페이지로 이동
        const moveMemberEdit = (memberNumber) => {
            router.push({path:'/admin/member/edit', query:{memberNumber : memberNumber}});
        }

        // 회원 탈퇴
        const withdrawal = () => {
            if(state.checkList.length === 0) {
                window.alert("회원을 1명 이상 선택해주세요.");
                return false;
            }

             if(confirm("선택한 회원을 탈퇴처리하겠습니까?")) {
                axios.put(`/api/admin/member/withdrawal`, state.checkList).then((res)=>{
                    console.log(res.data);
                    window.alert("탈퇴처리가 정상적으로 처리되었습니다.");
                    loadData();
                }).catch(()=>{
                    window.alert("탈퇴처리 중 오류가 발생하였습니다.");
                })
             }
        }

        // 전체선택 처리
        const checkAllEvnet = () => {
            if(state.checkAll === false) {
                for(let idx in state.rows) {
                    // 이미 탈퇴한 회원은 선택 안되게 하기
                    if(state.rows[idx].memberStatus === 3) {
                        continue;
                    }

                    // 이미 선택되어 있는 회원인 경우에는 중복선택 제외하기
                    if(state.checkList.includes(state.rows[idx].memberNumber)) {
                        continue;
                    }

                    state.checkList.push(state.rows[idx].memberNumber);
                }
                state.checkAll = true;

            } else {
                state.checkList = [];
                state.checkAll = false;
            }
        }

        // 체크박스 개별 처리
        const checkEvnet = () => {
            if(state.checkList.length === state.targetMemberList) {
                state.checkAll = true;
            } else {
                state.checkAll = false;
            }
        }

        onMounted(() => {
            loadData();
        })

        // 리턴값
        return {
            state,
            search,
            changePage,
            moveMemberEdit,
            changeDateFormat,
            changePhoneNumberFormat,
            changeMemberStatusFormat,
            withdrawal,
            checkAllEvnet,
            checkEvnet
        }

    }
}
</script>

<style lang="css">
@import "../assets/css/common.css";

</style>