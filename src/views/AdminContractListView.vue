<template>
    <div class="container common_mt160 admin_wrap">
        <admin-sub-menu></admin-sub-menu>
        <div class="admin_content">
            <h1 class="mb-4">| 거래관리</h1>

            <!-- 검색 영역 -->
            <div class="mb-5">
                <h2 class="mb-4">거래 검색</h2>
                <div class="px-5">
                    <div class="row mb-3">
                        <div class="col-2 py-2">
                            거래번호
                        </div>
                        <div class="col-4">
                            <input type="text" class="form-control" v-model="state.searchId" placeholder="거래번호">
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
                            <input type="text" class="form-control" v-model="state.searchSellerMemberNumber" placeholder="판매자번호">
                        </div>
                        <div class="col-2 py-2">
                            구매자번호
                        </div>
                        <div class="col-4">
                            <input type="text" class="form-control" v-model="state.searchBuyerMemberNumber" placeholder="구매자번호">
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-2 py-2">
                            판매상태
                        </div>
                        <div class="col-4">
                            <select class="form-select" v-model="state.searchSellingStatus">
                                <option v-for="status in state.sellingStatusList" :key="status" :value="status.id">{{ status.value }}</option>
                            </select>
                        </div>
                        <div class="col-2 py-2">
                            구매상태
                        </div>
                        <div class="col-4">
                            <select class="form-select" v-model="state.searchBuyingStatus">
                                <option v-for="status in state.buyingStatusList" :key="status" :value="status.id">{{ status.value }}</option>
                            </select>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-2 py-2">
                            거래체결일
                        </div>
                        <div class="col-4">
                            <input type="date" class="form-control" v-model="state.searchContractDateStart">
                        </div>
                        <div class="col-2 py-2">
                            <p class="text-center">~</p>
                        </div>
                        <div class="col-4">
                            <input type="date" class="form-control" v-model="state.searchContractDateEnd">
                        </div>
                    </div>
                    
                    
                </div>
                <div class="d-flex justify-content-center mt-4">
                    <button class="btn btn-success btn-lg" @click="search()">검색</button>
                </div>
            </div>

            <!-- 검색 결과-->
            <div>
                <table class="table  align-middle">
                    <thead>
                        <tr class="text-center">
                            <th scope="col" width="50px">
                                <input class="form-check-input" type="checkbox" :checked="state.checkAll" @change="checkAllEvnet()">
                            </th>
                            <th scope="col">거래번호</th>
                            <th scope="col">상품번호</th>
                            <th scope="col">판매자번호</th>
                            <th scope="col">구매자번호</th>
                            <th scope="col" width="107px">거래체결일</th>
                            <th scope="col" width="150px">판매상태</th>
                            <th scope="col" width="150px">구매상태</th>
                            <th scope="col" width="107px">정산일</th>
                            <th scope="col">결제&배송정보</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="text-center" v-for="data of state.rows" :key="data">
                            <td><input class="form-check-input" type="checkbox" :value="data.id" v-model="state.checkList" @change="checkEvnet()"></td>
                            <td>
                                <el-popover placement="left" :title=state.contractDiv[data.contractDiv] :width="200" trigger="hover" content="">
                                    <template #reference>
                                        {{ data.id }}
                                    </template> 
                                </el-popover>
                            </td>
                            <td>
                                <el-popover placement="top-start" :title=data.productEngName :width="400" trigger="hover" :content=data.productKorName+state.sizeLabel+data.productSize>
                                    <template #reference>
                                        {{ data.productId }}
                                    </template> 
                                </el-popover>
                            </td>
                            <td v-if="data.sellerNumber != null">
                                <el-popover placement="top-start" :title=data.sellerName :width="300" trigger="hover" :content=data.sellerEmail>
                                    <template #reference>
                                        {{ data.sellerNumber }}
                                    </template> 
                                </el-popover>
                            </td>
                            <td v-else>
                                -
                            </td>
                            <td>
                                <el-popover placement="top-start" :title=data.buyerName :width="300" trigger="hover" :content=data.buyerEmail>
                                    <template #reference>
                                        {{ data.buyerNumber }}
                                    </template> 
                                </el-popover>
                            </td>
                            <td>{{ changeDateFormat(data.contractDate) }}</td>

                            <!-- 판매상태 -->
                            <!-- 보관판매인 경우 -->
                            <td v-if="data.sellingStatus !== null && data.contractDiv === 1">
                                <select class="form-select" v-model="data.sellingStatus">
                                    <option v-for="status in state.inventorySellingStatusList" :key="status" :value="status.id">{{ status.value }}</option>
                                </select>
                            </td>
                            <!-- 입찰거래인 경우 -->
                            <td v-else-if="data.sellingStatus !== null && data.contractDiv === 2">
                                <select class="form-select" v-model="data.sellingStatus">
                                    <option v-for="status in state.sellingStatusList" :key="status" :value="status.id">{{ status.value }}</option>
                                </select>
                            </td>
                            <!-- 브랜드배송인 경우 -->
                            <td v-else>
                                브랜드배송
                            </td>

                            <!-- 구매상태 -->
                            <!-- 빠른배송(보관판매물건구매)인 경우 -->
                            <td v-if="data.contractDiv === 1">
                                <select class="form-select" v-model="data.buyingStatus">
                                    <option v-for="status in state.inventoryBuyingStatusList" :key="status" :value="status.id">{{ status.value }}</option>
                                </select>
                            </td>
                            <!-- 입찰거래인 경우 -->
                            <td v-else-if="data.contractDiv === 2">
                                <select class="form-select" v-model="data.buyingStatus">
                                    <option v-for="status in state.buyingStatusList" :key="status" :value="status.id">{{ status.value }}</option>
                                </select>
                            </td>
                            <!-- 브랜드배송인 경우 -->
                            <td v-else>
                                <select class="form-select" v-model="data.buyingStatus">
                                    <option v-for="status in state.brandStatusList" :key="status" :value="status.id">{{ status.value }}</option>
                                </select>
                            </td>
                            
                            <td v-if="data.paidDate !== null">
                                <el-popover placement="top-start" title="정산금액" :width="150" trigger="hover" :content=changePriceFormat(data.paidPrice)>
                                    <template #reference>
                                        {{ changeDateFormat(data.paidDate) }}
                                    </template> 
                                </el-popover>
                            </td>
                            <td v-else>-</td>
                            <td>
                                <button type="button" class="btn btn-outline-success btn-sm" @click="state.isModalShow=true; state.modalTargetId=data.id;">상세보기</button>
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
                <button class="btn btn-success btn-lg d-flex justify-content-start" @click="editStatus()">상태변경</button>
            </div> 
        </div>

    </div>

    <!-- 모달영역 -->
    <admin-payment-delivery-modal v-if="state.isModalShow" :openmodal="state.isModalShow" :id="state.modalTargetId" @closemodal="modalClose"></admin-payment-delivery-modal>

</template>

<script>
import AdminSubMenu from '@/components/AdminSubMenu.vue'
import AdminPaymentDeliveryModal from '@/components/AdminPaymentDeliveryModal.vue'
import { onMounted, reactive } from 'vue'; 
import axios from 'axios';

export default {
    name: 'SubMenu',
    components: {
        AdminSubMenu,
        AdminPaymentDeliveryModal
    },
    setup () {

        const state = reactive({
            isModalShow : false, // 모달창 제어 변수
            modalTargetId : 0,
            rows : [],
            total : 0,
            page : 0,
            isSearch : false,
            checkAll : false,
            checkList : [],
            sellingStatusList : [ // 판매입찰상태
                { id : 0, value : '판매상태선택'}, 
                { id : 21, value : '발송요청'},
                { id : 22, value : '발송완료'},
                { id : 23, value : '입고대기'},
                { id : 24, value : '입고완료'},
                { id : 25, value : '검수중'},
                { id : 26, value : '검수불합격'},
                { id : 27, value : '검수합격'},
                { id : 50, value : '정산완료'},
                // { id : 51, value : '취소완료'},
                { id : 52, value : '불합격반송'},
                { id : 53, value : '회수완료'},
            ],
            inventorySellingStatusList : [ // 보관판매상태
                { id : 0, value : '판매상태선택'}, 
                { id : 50, value : '정산완료'},
                // { id : 51, value : '취소완료'},
                // { id : 52, value : '불합격반송'},
                // { id : 53, value : '회수완료'},
            ],
            buyingStatusList : [ // 구매입찰 상태
                { id : 0, value : '구매상태선택'},
                { id : 31, value : '대기중'}, 
                { id : 32, value : '발송완료'},
                { id : 33, value : '입고대기'},
                { id : 34, value : '입고완료'},
                { id : 35, value : '검수중'},
                { id : 36, value : '거래실패'},
                { id : 37, value : '검수합격'},
                { id : 38, value : '배송중'}, 
                { id : 60, value : '배송완료'}, 
                { id : 61, value : '취소완료'},
                { id : 62, value : '반품완료'},
                { id : 63, value : '교환완료'},
            ],
            inventoryBuyingStatusList : [ // 보관판매의 물건 구매한 경우 상태
                { id : 0, value : '구매상태선택'},
                { id : 38, value : '배송중'}, 
                { id : 60, value : '배송완료'}, 
                // { id : 61, value : '취소완료'},
                // { id : 62, value : '반품완료'},
                // { id : 63, value : '교환완료'},
            ],
            brandStatusList : [ // 브랜드 상품 구매시 상태
                { id : 0, value : '구매상태선택'},
                { id : 38, value : '배송중'},
                { id : 39, value : '상품준비중'},
                { id : 40, value : '반품신청'},
                { id : 41, value : '접수완료'},
                { id : 42, value : '회수중'},
                { id : 43, value : '회수완료'},
                { id : 44, value : '교환신청'},
                { id : 45, value : '교환중'},
                { id : 60, value : '배송완료'},
                { id : 61, value : '취소완료'},
                { id : 62, value : '반품완료'},
                { id : 63, value : '교환완료'},
            ],

            contractDiv :
                { 1 : '거래구분 - 보관판매' , 2 : '거래구분 - 입찰거래', 3 : '거래구분 - 브랜드배송' },
            searchId : '', // 검색조건
            searchProductId : '', // 검색조건
            searchSellerMemberNumber : '', // 검색조건
            searchBuyerMemberNumber : '', // 검색조건
            searchSellingStatus : 0, // 검색조건
            searchBuyingStatus : 0, // 검색조건
            searchContractDateStart : '', // 검색조건
            searchContractDateEnd : '', // 검색조건
            originalDatas : [],
            sizeLabel : ' - size : ' 
        })
        
        // 거래관리리스트페이지에 띄울 정보 모두 가져오기
        const loadData = () => {
            axios.get(`/api/admin/contract/getall?page=${state.page}`).then((res)=>{
                console.log(res.data);
                state.rows = res.data.contractList;
                state.total = res.data.total;
                state.checkAll = false;
                state.checkList = [];
                state.originalDatas = res.data.contractList;
                // 검색조건 초기화
                state.searchId = '';
                state.searchProductId = '';
                state.searchSellerMemberNumber = '';
                state.searchBuyerMemberNumber = '';
                state.searchSellingStatus = 0;
                state.searchBuyingStatus = 0;
                state.searchContractDateStart = '';
                state.searchContractDateEnd = '';
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

            if( isNaN(state.searchSellerMemberNumber)) {
                window.alert("판매자번호는 숫자만 입력해주세요.");
                state.searchSellerMemberNumber = '';
                return false;
            }

            if( isNaN(state.searchBuyerMemberNumber)) {
                window.alert("구매자번호는 숫자만 입력해주세요.");
                state.searchBuyerMemberNumber = '';
                return false;
            }

            // 날짜 유효성체크
            if(state.searchContractDateStart !== '' && state.searchContractDateEnd !== '') {
                let startDate = new Date(state.searchContractDateStart);
                let endDate = new Date(state.searchContractDateEnd);
                if(startDate>endDate) {
                    window.alert("거래체결일(부터)은 거래체결일(까지)보다 빠른날짜로 설정해주세요.");
                    state.searchContractDateStart = '';
                    state.searchContractDateEnd = '';
                    return false;
                }
            }

            // 검색플래그 설정
            if(state.searchId === '' && state.searchProductId === '' && 
                state.searchSellerMemberNumber === '' && state.searchBuyerMemberNumber === '' &&
                state.searchSellingStatus === 0 && state.searchBuyingStatus === 0 &&
                state.searchContractDateStart === '' && state.searchContractDateEnd === '') {
                state.isSearch = false;
            } else {
                state.isSearch = true;
            }

            axios.get(`/api/admin/contract/search?page=${state.page}&id=${state.searchId}&productId=${state.searchProductId}&sellerMemberNumber=${state.searchSellerMemberNumber}&buyerMemberNumber=${state.searchBuyerMemberNumber}&sellingStatus=${state.searchSellingStatus}&buyingStatus=${state.searchBuyingStatus}&contractDateStart=${state.searchContractDateStart}&contractDateEnd=${state.searchContractDateEnd}`).then((res)=>{
                console.log(res.data);
                state.rows = res.data.contractList;
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

        // 상태변경 
        const editStatus = () => {

            if(state.checkList.length === 0) {
                window.alert("대상을 1개 이상 선택해주세요.");
                return false;
            }

            if(confirm("선택한 거래의 상태를 변경하겠습니까?")) {

                let updateData = [];

                for(let idx in state.rows) {
                    
                    if(state.checkList.includes(state.rows[idx].id)) {

                        // 구매상태 미선택 체크
                        if(state.rows[idx].buyingStatus === 0) {
                                window.alert("거래번호" + state.rows[idx].id +"번의 변경할 구매상태를 선택해주세요.");
                                return false;
                            }

                        if (state.rows[idx].contractDiv === 2) {
                            // 입찰거래의 경우

                            // 판매상태 미선택 체크
                            if(state.rows[idx].sellingStatus === 0) {
                                window.alert("거래번호" + state.rows[idx].id +"번의 변경할 판매상태를 선택해주세요.");
                                return false;
                            }

                        } 
                        updateData.push({id : state.rows[idx].id, sellingStatus : state.rows[idx].sellingStatus, buyingStatus : state.rows[idx].buyingStatus });
                    }
                }

                axios.put(`/api/admin/contract/edit`, updateData).then((res)=>{
                    console.log(res.data);
                    window.alert("상태변경처리가 정상적으로 처리되었습니다.");
                    loadData();
                }).catch(()=>{
                    window.alert("상태변경처리 중 오류가 발생하였습니다.");
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
            modalClose,
            changePage,
            search,
            checkAllEvnet,
            checkEvnet,
            changeDateFormat,
            changePriceFormat,
            editStatus
        }
    }
}
</script>

<style lang="css" scoped>
@import "../assets/css/common.css";

</style>