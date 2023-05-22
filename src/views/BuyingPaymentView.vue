<template>
    <!-- 모달영역 -->
    <address-modal v-if="showAddressAdd" @close="showAddressAdd = false"/>
    <address-list-modal v-if="showAddressList" :addressList="state.addressList" @close="showAddressList = false" @select="selectAdd"/>
    <div class="common_mt160">
        <!-- 빠른배송, 즉시구매 -->
        <div class="container" id="wrap" v-if="state.type === 'fast' || state.type === 'normal' && state.item">
            <div class="head d-flex align-items-center">
                <img :src="state.item.imagePath" class="head_img">
                <div class="d-flex flex-column ml-3">
                    <p style="font-weight: bold;">{{ state.item.modelNumber }}</p>
                    <p>{{ state.item.productEngName }}</p>
                    <p style="color: #aeaeae;">{{ state.item.productKorName }}</p>
                    <p>{{ state.item.sellProductSize }}</p>
                    <p v-if="state.item.inventoryDiv === 1">
                        <button class="fast_small">
                            <img src="@/assets/image/lightning.png" class="lightning"/>
                            빠른배송
                        </button>
                    </p>    
                </div>
            </div>

            <div class="d-flex justify-content-between mt-5 flex-wrap">
                <span class="fw-bold fs-4">배송 주소</span>
                <span class="text-end gray_font" @click="showAddressAdd = true">+ 새 주소 추가</span>
            </div>
            <button v-show="state.selectedAddress" class="btn btn-secondary float-end" @click="showAddressList = true">변경</button>
            
            <div v-show="state.addressList.length === 0">
                <p>주소를 추가하세요</p>
            </div>

            <div v-show="state.selectedAddress">
                <div class="d-flex mt-5">
                    <span class="col-2 gray_font">받는 분</span>
                    <span class="col-8 text-start">{{ state.selectedAddress.name }}</span>
                </div>
                <div class="d-flex">
                    <span class="col-2 gray_font">연락처</span>
                    <span class="col-8 text-start">{{ state.selectedAddress.phoneNumber }}</span>
                </div>
                <div class="d-flex">
                    <span class="col-2 gray_font">배송 주소</span>
                    <span class="col-8 text-start">{{ state.selectedAddress.address }} {{ state.selectedAddress.subAddress }}</span>
                </div>
            </div>
            <hr />

            <p class="fw-bold fs-4 mt-5">배송 방법</p>
            <div class="d-flex justify-content-between flex-wrap" v-if="state.type === 'fast'">
                <p class="text-start">빠른배송 5,000원</p>
                <p class="text-end gray_font">지금 결제시 1-2일 내 도착예정</p>
            </div>
            <div class="d-flex justify-content-between flex-wrap" v-else>
                <p class="text-start">일반배송 3,000원</p>
                <p class="text-end gray_font">검수 후 배송, 5-7일 내 도착예정</p>
            </div>

            <hr />
            
            <p class="fw-bold fs-4 mt-5">최종 주문 정보</p>
            <div v-if="state.type === 'fast'">
                <div class="d-flex justify-content-between flex-wrap">
                    <p class="text-start fw-bold">총 결제금액</p>
                    <p class="text-end fs-4 fw-bold" style="color: rgb(103, 194, 58);">
                        {{ Math.floor(state.item.sellWishPrice + state.item.sellWishPrice*0.015 + 5000) }}원
                    </p>
                </div>
                <hr />

                <div class="d-flex justify-content-between mt-3">   
                    <span class="fw-bold">구매가</span>
                    <span class="text-end fw-bold">{{ state.item.sellWishPrice }}원</span>
                </div>
                <div class="d-flex justify-content-between">   
                    <span class="gray_font">검수비</span>
                    <span class="text-end">무료</span>
                </div>
                <div class="d-flex justify-content-between">   
                    <span class="gray_font">수수료</span>
                    <span class="text-end">{{ Math.floor(state.item.sellWishPrice*0.015) }}원</span>
                </div>
                <div class="d-flex justify-content-between">   
                    <span class="gray_font">배송비</span>
                    <span class="text-end">5,000원</span>
                </div>
                <hr />
            </div>

            <div v-if="state.type === 'normal'">
                <div class="d-flex justify-content-between flex-wrap">
                    <p class="text-start fw-bold">총 결제금액</p>
                    <p class="text-end fs-4 fw-bold" style="color: rgb(103, 194, 58);">
                        {{ Math.floor(state.item.sellWishPrice + state.item.sellWishPrice*0.015 + 3000) }}원
                    </p>
                </div>
                <hr />

                <div class="d-flex justify-content-between mt-3">   
                    <span class="fw-bold">즉시 구매가</span>
                    <span class="text-end fw-bold">{{ state.item.sellWishPrice }}원</span>
                </div>
                <div class="d-flex justify-content-between">   
                    <span class="gray_font">검수비</span>
                    <span class="text-end">무료</span>
                </div>
                <div class="d-flex justify-content-between">   
                    <span class="gray_font">수수료</span>
                    <span class="text-end">{{ Math.floor(state.item.sellWishPrice*0.015) }}원</span>
                </div>
                <div class="d-flex justify-content-between">   
                    <span class="gray_font">배송비</span>
                    <span class="text-end">3,000원</span>
                </div>
                <hr />
            </div>

            <p class="fw-bold fs-4 mt-5">결제 방법</p>
            <div class="d-flex justify-content-between flex-wrap">
                <span class="fw-bold">카드 간편 결제</span>
                <span class="text-end gray_font" @click="showAddressAdd = true">+새 카드 추가</span>
            </div>

            <div> 
                <p class="mt-2">카드를 추가하세요</p>
            </div>

            <div class="mt-3">
                <p class="fw-bold">일반 결제</p>
                <div class="btn-group mb-2" role="group" data-toggle="buttons">
                    <input type="radio" class="btn-check" id="3" autocomplete="off" name="pay" :checked="state.payMethod === 3">
                    <label class="btn btn-outline-warning rounded mx-1" for="3" @click="handlePay(3)">카카오 페이</label>
                </div>
            </div>
            <hr />
            
            <p class="fw-bold fs-4 mt-5">구매 조건 확인</p>
            <!-- 결제 컴포넌트 -->
            <payment-component 
            :address="state.selectedAddress" 
            :type="state.type" 
            :contractDto="state.contractDto"
            />
        </div>

        <!-- 구매입찰 -->
        <div class="container" id="wrap" v-if="state.row[0]">
            <div class="head d-flex align-items-center">
                <img :src="state.row[0].imagePath" class="head_img">
                <div class="d-flex flex-column ml-3">
                    <p style="font-weight: bold;">{{ state.row[0].modelNumber }}</p>
                    <p>{{ state.row[0].productEngName }}</p>
                    <p style="color: #aeaeae;">{{ state.row[0].productKorName }}</p>
                    <p>{{ state.size }}</p>
                    <p v-if="state.row[0].inventoryDiv === 1">
                        <button class="fast_small">
                            <img src="@/assets/image/lightning.png" class="lightning"/>
                            빠른배송
                        </button>
                    </p>
                </div>
            </div>

            <div class="d-flex justify-content-between mt-5 flex-wrap">
                <span class="fw-bold fs-4">배송 주소</span>
                <span class="text-end gray_font" @click="showAddressAdd = true">+ 새 주소 추가</span>
            </div>
            <button v-show="state.selectedAddress" class="btn btn-secondary float-end" @click="showAddressList = true">변경</button>
            
            <div v-show="state.addressList.length === 0">
                <p>주소를 추가하세요</p>
            </div>

            <div v-show="state.selectedAddress">
                <div class="d-flex mt-5">
                    <span class="col-2 gray_font">받는 분</span>
                    <span class="col-8 text-start">{{ state.selectedAddress.name }}</span>
                </div>
                <div class="d-flex">
                    <span class="col-2 gray_font">연락처</span>
                    <span class="col-8 text-start">{{ state.selectedAddress.phoneNumber }}</span>
                </div>
                <div class="d-flex">
                    <span class="col-2 gray_font">배송 주소</span>
                    <span class="col-8 text-start">{{ state.selectedAddress.address }} {{ state.selectedAddress.subAddress }}</span>
                </div>
            </div>
            <hr />

            <p class="fw-bold fs-4 mt-5">배송 방법</p>
            <div class="d-flex justify-content-between flex-wrap">
                <p class="text-start">일반배송 3,000원</p>
                <p class="text-end gray_font">검수 후 배송, 5-7일 내 도착예정</p>
            </div>
            <hr />

            <p class="fw-bold fs-4 mt-5">최종 주문 정보</p>
            <div class="d-flex justify-content-between flex-wrap">
                <p class="text-start fw-bold">총 결제금액</p>
                <p class="text-end fs-4 fw-bold" style="color: rgb(103, 194, 58);">
                    {{ Math.floor(state.bidPrice + state.bidPrice*0.03 + 3000) }}원
                </p>
            </div>
            <hr />

            <div class="d-flex justify-content-between mt-3">   
                <span class="fw-bold">구매 희망가</span>
                <span class="text-end fw-bold">{{ state.bidPrice }}원</span>
            </div>
            <div class="d-flex justify-content-between">   
                <span class="gray_font">검수비</span>
                <span class="text-end">무료</span>
            </div>
            <div class="d-flex justify-content-between">   
                <span class="gray_font">수수료</span>
                <span class="text-end">{{ Math.floor(state.bidPrice*0.03) }}원</span>
            </div>
            <div class="d-flex justify-content-between">   
                <span class="gray_font">배송비</span>
                <span class="text-end">3,000원</span>
            </div>
            <hr />

            <div class="d-flex justify-content-between"> 
                <span>입찰 마감 기한</span>
                <span class="text-end">{{ state.bidDays }}일 - {{ state.bidFormattedDate }} 까지</span>
            </div>
            <hr />

            <p class="fw-bold fs-4 mt-5">결제 방법</p>
            <div class="d-flex justify-content-between flex-wrap">
                <span class="fw-bold">카드 간편 결제</span>
                <span class="text-end gray_font" @click="showAddressAdd = true">+새 카드 추가</span>
            </div>

            <div> 
                <p class="mt-2">카드를 추가하세요</p>
            </div>

            <div class="mt-3">
                <p class="fw-bold">일반 결제</p>
                <div class="btn-group mb-2" role="group" data-toggle="buttons">
                    <input type="radio" class="btn-check" id="3" autocomplete="off" name="pay" :checked="state.payMethod === 3">
                    <label class="btn btn-outline-warning rounded mx-1" for="3" @click="handlePay(3)">카카오 페이</label>
                </div>
            </div>
            <hr />
            
            <p class="fw-bold fs-4 mt-5">구매 조건 확인</p>

            <button class="btn btn-secondary w-100 fs-5 fw-bold p-3" @click="handleBid">구매 입찰하기</button>
        </div>
    </div>
</template>

<script>
import AddressModal from '@/components/AddressModal.vue';
import PaymentComponent from '@/components/PaymentComponent.vue';
import AddressListModal from '@/components/AddressListModal.vue';
import axios from 'axios';
import { onMounted, reactive, ref, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default {
    components: {
        AddressModal,
        PaymentComponent,
        AddressListModal
    },
    setup () {
        const route = useRoute();
        const router = useRouter();
        const store = useStore();

        const showAddressAdd = ref(false);
        const showAddressList = ref(false);

        const state = reactive({
            productid: Number(route.query.productid),
            size : Number(route.query.size),
            type : route.query.type,
            item : '',
            itemImagePath : '',
            addressList : [],
            selectedAddress : {},
            memberNumber : sessionStorage.getItem("TOKEN"),
            
            row : [],
            sellingStatus : null,
            buyingStatus : null,
            
            bidPrice : 0,
            bidDate : '',
            bidFormattedDate : '',
            bidDays : '',

            contractDto : {},

            payMethod : 0
        })
        

        watchEffect(() => {
            state.item = store.getters.getSelectedItem;
            if(state.item) {
                state.item.imagePath = `/api/product/display?name=${state.item.imagePath}`;
            }
            state.bidPrice = Number(store.getters.getSelectedPrice);
            state.bidDate = store.getters.getSelectedDate;
            state.bidFormattedDate = store.getters.getSelectedFormattedDate;
            state.bidDays = store.getters.getSelectedDays;
        });

        // 결제 방법 선택
        const handlePay = (payMethod) => {
            state.payMethod = payMethod;
        }

        // 주소 추가 모달
        const clickModal = () => {
            state.isModalViewed = true;
        }

        // 주소 리스트
        const handleAddressList = async() => {
            try {
                const res = await axios.get(`/api/get/address?member=${state.memberNumber}`)
                console.log("주소목록", res.data)
                state.addressList = res.data
                const defaultAddress = state.addressList.find(address => address.defaultAddress === 1)
                if(defaultAddress) {
                    state.selectedAddress = defaultAddress
                }
            } catch(err) {
                console.error(err);
            }
        }

        const selectAdd = (selectedAddress) => {
            state.selectedAddress = selectedAddress;
            console.log("선택주소",selectedAddress)
        }

        // 빠른배송, 즉시구매 시 결제창에 데이터 전달
        if(state.type === 'fast' || state.type === 'normal') {
            state.contractDto = {
                productId : state.productid,
                buyingId : null,
                sellingId : state.item.sellingId,
                buyerNumber : state.memberNumber,
                sellerNumber : state.item.sellerNumber,
                price : state.item.sellWishPrice,
                productSize : state.size
            }
            console.log("전달되니컨트랙트", state.contractDto)
        }
            
        // 구매입찰
        const handleBid = async() => {
            // 유효성 검사 통과 > 구매 조건 확인 all check
            // if(state.errorMessage.length === 0) { 
    
                try {
                    const url = `/api/post/buy`;
                    const headers = {"Content-Type":"application/json"};
                    const body = {
                        memberNumber : state.memberNumber,
                        productId : state.productid,
                        productSize : state.size,
                        wishPrice : state.bidPrice,
                        expiryDate : new Date(state.bidDate).toISOString()
                    }
                    const res = await axios.post(url, body, {headers});
                    console.log("보냄", res);
                } catch(err) {
                    console.error(err);
                }
                    
                router.push({
                    path : '/buying/complete',
                    query : {
                        productid: state.productid,
                        type : state.type
                    }
                })
            // }
        }

        // 구매 입찰 시 데이터 필요
        if(state.type === 'bid') {
            const handleData = async() => {
                try {
                    const res = await axios.get(`/api/get/product/one?productid=${state.productid}`);
                    state.row = res.data;
                    state.row[0].imagePath = `/api/product/display?name=${state.row[0].imagePath}`;
                    console.log("구매입찰", state.row)
                } catch (err) {
                    console.error(err);
                }
            }

            onMounted(()=>{
                handleData();
            })
        }

        onMounted(()=>{
            handleAddressList();
        })

        return {
            state,
            handlePay,
            showAddressAdd,
            showAddressList,
            clickModal,
            selectAdd,
            handleBid,
        }
    }
}
</script>

<style lang="css" scoped>
@import "../assets/css/common.css";
#wrap {
    /* border: 1px solid #cccccc; */
    width: 800px;
}
.head_img{
    width: 150px;
    height: 150px;
    margin: 5px;
    border-radius: 10px;
}
.head p{
    margin: 1px 8px;
}
</style>