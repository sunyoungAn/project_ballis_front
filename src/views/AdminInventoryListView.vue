<template>
    <div class="container common_mt160 admin_wrap">
        <admin-sub-menu></admin-sub-menu>
        <div class="admin_content">
            <h1 class="mb-4">| 보관상품관리</h1>

            <!-- 검색 영역 -->
            <div class="mb-5">
                <h2 class="mb-4">보관상품 검색</h2>
                <div class="px-5">
                    <div class="row mb-3">
                        <div class="col-2 py-2">
                            보관상품번호
                        </div>
                        <div class="col-4">
                            <input type="text" class="form-control" v-model="state.searchId" placeholder="판매입찰번호">
                        </div>
                        <div class="col-2 py-2">
                            상품번호
                        </div>
                        <div class="col-4">
                            <input type="text" class="form-control" v-model="state.searchProductId" placeholder="상품번호">
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-2 py-2">
                            판매자번호
                        </div>
                        <div class="col-4">
                            <input type="text" class="form-control" v-model="state.searchMemberNumber" placeholder="판매자번호">
                        </div>
                        <div class="col-2 py-2">
                            보관상태
                        </div>
                        <div class="col-4">
                            <select class="form-select" v-model="state.searchSellingStatus">
                                <option v-for="status in state.statusList" :key="status" :value="status.id">{{ status.value }}</option>
                            </select>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-2 py-2">
                            만료일
                        </div>
                        <div class="col-4">
                            <input type="date" class="form-control" v-model="state.searchExpiryDateStart">
                        </div>
                        <div class="col-2 py-2">
                            <p class="text-center">~</p>
                        </div>
                        <div class="col-4">
                            <input type="date" class="form-control" v-model="state.searchExpiryDateEnd">
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
                            <th scope="col" width="120px">보관상품번호</th>
                            <th scope="col">상품번호</th>
                            <th scope="col">사이즈</th>
                            <th scope="col">가격</th>
                            <th scope="col">판매자번호</th>
                            <th scope="col" width="150px">상태</th>
                            <th scope="col">만료일</th>
                            <th scope="col">결제정보</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="text-center" v-for="data of state.rows" :key="data">
                            <td><input class="form-check-input" type="checkbox" :value="data.id" v-model="state.checkList" @change="checkEvnet()"></td>
                            <td>{{ data.id }}</td>
                            <td>
                                <el-popover placement="top-start" :title=data.productEngName :width="400" trigger="hover" :content=data.productKorName>
                                    <template #reference>
                                        {{ data.productId }}
                                    </template> 
                                </el-popover>
                            </td>
                            <td>{{ data.productSize }}</td>
                            <td>{{ changePriceFormat(data.wishPrice) }}</td>
                            <td>
                                <el-popover placement="top-start" :title=data.name :width="300" trigger="hover" :content=data.email>
                                    <template #reference>
                                        {{ data.memberNumber }}
                                    </template> 
                                </el-popover>
                            </td>
                            <td>
                                <select class="form-select" v-model="data.sellingStatus">
                                    <option v-for="status in state.statusList" :key="status" :value="status.id">{{ status.value }}</option>
                                </select>
                            </td>
                            <td>{{ changeDateFormat(data.expiryDate) }}</td>
                            <td>
                                <button type="button" class="btn btn-outline-success btn-sm" @click="state.isModalShow=true; state.modalTargetId=data.id;">결제정보</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
            <!-- 페이지 네이션-->
            <nav class="d-flex justify-content-center mt-4">
                <el-pagination background layout="prev, pager, next" @current-change="changePage" :total="state.total" />
            </nav>

            <div class="d-flex justify-content-center mt-5">
                <button class="btn btn-success btn-lg d-flex justify-content-end me-2" @click="editSellingStatus()">상태변경</button>
                <button class="btn btn-success btn-lg d-flex justify-content-start ms-2" @click="deleteSelling()">보관삭제</button>
            </div>

        </div>

    </div>

    <!-- 모달영역 -->
    <admin-payment-modal v-if="state.isModalShow" :openmodal="state.isModalShow" :id="state.modalTargetId" @closemodal="modalClose"></admin-payment-modal>

</template>

<script>
import AdminSubMenu from '@/components/AdminSubMenu.vue'
import AdminPaymentModal from '@/components/AdminPaymentModal.vue'
import { onMounted, reactive } from 'vue'; 
import axios from 'axios';

export default {
    name: 'SubMenu',
    components: {
        AdminSubMenu,
        AdminPaymentModal
    },
    setup () {
        
        // 상태변수
        const state = reactive({
            isModalShow : false, // 모달창 제어 변수
            modalTargetId : 0,
            rows : [],
            total : 0,
            page : 0,
            isSearch : false,
            checkAll : false,
            checkList : [],
            statusList : [
                { id : 0, value : '보관상태선택'},
                { id : 11, value : '발송요청'},
                { id : 12, value : '입고대기'},
                { id : 13, value : '입고완료'},
                { id : 14, value : '검수중'},
                { id : 15, value : '검수완료'},
                { id : 16, value : '창고이동'},
                { id : 17, value : '판매중'},
                { id : 18, value : '판매완료'},
                { id : 19, value : '보관만료'},
                { id : 51, value : '취소완료'},
                { id : 52, value : '불합격반송'},
                { id : 53, value : '회수완료'},
            ],
            searchId : '', // 검색조건
            searchProductId : '', // 검색조건
            searchMemberNumber : '', // 검색조건
            searchSellingStatus : 0, // 검색조건
            searchExpiryDateStart : '', // 검색조건
            searchExpiryDateEnd : '', // 검색조건
            originalDatas : []
        })

        // 보관상품관리리스트페이지에 띄울 정보 모두 가져오기
        const loadData = () => {
            axios.get(`/api/admin/inventory/getall?page=${state.page}`).then((res)=>{
                console.log(res.data);
                state.rows = res.data.sellingList;
                state.total = res.data.total;
                state.checkAll = false;
                state.checkList = [];
                state.originalDatas = res.data.sellingList;
                // 검색조건 초기화
                state.searchId = '';
                state.searchProductId = '';
                state.searchMemberNumber = '';
                state.searchSellingStatus = 0;
                state.searchExpiryDateStart = '';
                state.searchExpiryDateEnd = '';
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
            
            // 유효성검사
            if( isNaN(state.searchId)) {
                window.alert("보관상품번호는 숫자만 입력해주세요.");
                state.searchId = '';
                return false;
            }

            if( isNaN(state.searchProductId)) {
                window.alert("상품번호는 숫자만 입력해주세요.");
                state.searchProductId = '';
                return false;
            }

            if( isNaN(state.searchMemberNumber)) {
                window.alert("판매자번호는 숫자만 입력해주세요.");
                state.searchMemberNumber = '';
                return false;
            }

            // 날짜 유효성체크
            if(state.searchExpiryDateStart !== '' && state.searchExpiryDateEnd !== '') {
                let startDate = new Date(state.searchExpiryDateStart);
                let endDate = new Date(state.searchExpiryDateEnd);
                if(startDate>endDate) {
                    window.alert("만료일(부터)은 만료일(까지)보다 빠른날짜로 설정해주세요.");
                    state.searchExpiryDateStart = '';
                    state.searchExpiryDateEnd = '';
                    return false;
                }
            }

            // 검색플래그 설정
            if(state.searchId === '' && state.searchProductId === '' && 
                state.searchMemberNumber === '' && state.searchBrand === 0 &&
                state.searchExpiryDateStart === '' && state.searchExpiryDateEnd === '') {
                state.isSearch = false;
            } else {
                state.isSearch = true;
            }

            axios.get(`/api/admin/inventory/search?page=${state.page}&id=${state.searchId}&productId=${state.searchProductId}&memberNumber=${state.searchMemberNumber}&sellingStatus=${state.searchSellingStatus}&expiryDateStart=${state.searchExpiryDateStart}&expiryDateEnd=${state.searchExpiryDateEnd}`).then((res)=>{
                console.log(res.data);
                state.rows = res.data.sellingList;
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
            let date = new Date(data);
            let year = date.getFullYear();
            let month = ("0" + (1 + date.getMonth())).slice(-2);
            let day = ("0" + date.getDate()).slice(-2);

            return year + "/" + month + "/" + day;
        }

        // 금액형식변환 세자리마다 콤마추가
        const changePriceFormat = (data) => {
            return data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }

        // 보관상태변경
        const editSellingStatus = () => {
            if(state.checkList.length === 0) {
                window.alert("대상을 1개 이상 선택해주세요.");
                return false;
            }

            if(confirm("선택한 보관상품의 상태를 변경하겠습니까?")) {

                let updateData = [];

                for(let idx in state.rows) {

                    if(state.checkList.includes(state.rows[idx].id)) {

                        if(state.rows[idx].sellingStatus === 0) {
                            window.alert("보관상품번호" + state.rows[idx].id +"번의 변경할 상태를 선택해주세요.");
                            return false;
                        }
                        updateData.push({id : state.rows[idx].id, sellingStatus : state.rows[idx].sellingStatus });
                    }
                }

                axios.put(`/api/admin/selling/edit`, updateData).then((res)=>{
                    console.log(res.data);
                    window.alert("상태변경처리가 정상적으로 처리되었습니다.");
                    loadData();
                }).catch(()=>{
                    window.alert("상태변경처리 중 오류가 발생하였습니다.");
                })
            }
        }

        // 보관상품삭제
        const deleteSelling = () => {

            if(state.checkList.length === 0) {
                window.alert("대상을 1개 이상 선택해주세요.");
                return false;
            }

            if(confirm("선택한 보관상품을 삭제하겠습니까?")) {
                // 발송요청,보관만료 이외에는 삭제 할 수 없기 때문에 체크
                for(let idx in state.originalDatas) {
                    if(state.checkList.includes(state.originalDatas[idx].id)) {
                        if(state.originalDatas[idx].sellingStatus !== 11 && state.originalDatas[idx].sellingStatus !== 19) {
                            window.alert("보관상품번호" + state.originalDatas[idx].id +"번은 보관처리 진행중인 번호로 삭제할 수 없습니다.");
                            return false;
                        }
                    }
                }

                //체크에 문제가 없으면 삭제처리 실행
                axios.put(`/api/admin/selling/delete`, state.checkList).then((res)=>{
                    console.log(res.data);
                    window.alert("삭제처리가 정상적으로 처리되었습니다.");
                    loadData();
                }).catch(()=>{
                    window.alert("삭제처리 중 오류가 발생하였습니다.");
                })
            }
        }

        // 모달창 닫기
        const modalClose = (value) => {
            state.isModalShow = value;
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
            changePriceFormat,
            editSellingStatus,
            deleteSelling,
            modalClose
        }
    }
}
</script>

<style lang="css" scoped>
@import "../assets/css/common.css";



</style>