<template>
    <!-- 계좌 모달 -->
    <account-add-modal v-if="showAccountAdd" :member="state.member" @close="showAccountAdd = false" @reload="handleReload"/>
    <!-- 주소 모달 -->
    <address-modal v-if="showAddressAdd" @close="showAddressAdd = false"/>
    <address-list-modal v-if="showAddressList" :addressList="state.addressList" @close="showAddressList = false" @select="selectAdd"/>
    <!-- 카드 모달 -->
    <card-add-modal v-if="showCardAdd" :member="state.member" @close="showCardAdd = false" @reload="handleReload"/>

    <div class="common_mt160">
        <!-- 즉시판매 -->
        <div class="container" id="wrap" v-if="state.type === 'sell' && state.item">
            <div class="head d-flex align-items-center">
                <img :src="state.item.imagePath" class="head_img">
                <div class="d-flex flex-column ml-3">
                    <p style="font-weight: bold;">{{ state.item.modelNumber }}</p>
                    <p>{{ state.item.productEngName }}</p>
                    <p style="color: #aeaeae;">{{ state.item.productKorName }}</p>
                    <p>{{ state.size }}</p>
                </div>
            </div>
            
            <div class="d-flex justify-content-between mt-5 flex-wrap">
                <span class="fw-bold fs-4">판매 정산 계좌</span>
                <span v-if="!state.member.depositor" class="text-end gray_font" @click="showAccountAdd = true">+ 계좌 추가</span>
                <span v-else class="text-end gray_font">등록된 계좌는 마이페이지에서 변경 가능합니다.</span>
            </div>

            <div v-if="!state.member.depositor">
                <p class="mt-3">계좌를 추가하세요.</p>
            </div>

            <div v-else>
                <div class="d-flex mt-3">
                    <span class="col-2 gray_font">계좌</span>
                    <span class="col-8 text-start">{{ state.member.bankName }}&nbsp;{{ state.member.accountNumber }}</span>
                </div>
                <div class="d-flex">
                    <span class="col-2 gray_font">예금주</span>
                    <span class="col-8 text-start">{{ state.member.depositor }}</span>
                </div>
            </div>
            <hr />

            <div class="d-flex justify-content-between mt-5 flex-wrap">
                <span class="fw-bold fs-4">반송 주소</span>
                <span v-if="state.addressList.length === 3" class="text-end gray_font">주소는 3개까지 등록 가능합니다.</span>
                <span v-else class="text-end gray_font" @click="showAddressAdd = true">+ 새 주소 추가</span>
            </div>

            <div v-if="state.addressList.length === 0">
                <p class="mt-3">주소를 추가하세요.</p>
            </div>

            <div v-else>
                <button class="btn btn-secondary float-end" @click="showAddressList = true">변경</button>
                <div class="d-flex mt-3">
                    <span class="col-2 gray_font">받는 분</span>
                    <span class="col-8 text-start">{{ state.selectedAddress.name }}</span>
                </div>
                <div class="d-flex">
                    <span class="col-2 gray_font">연락처</span>
                    <span class="col-8 text-start">{{ state.selectedAddress.phoneNumber }}</span>
                </div>
                <div class="d-flex">
                    <span class="col-2 gray_font">반송 주소</span>
                    <span class="col-8 text-start">{{ state.selectedAddress.address }} {{ state.selectedAddress.subAddress }}</span>
                </div>
            </div>
            <hr />

            <p class="fw-bold fs-4 mt-5">발송 방법</p>
            <div class="d-flex justify-content-between flex-wrap">
                <p class="text-start">택배발송 선불</p>
                <p class="text-end gray_font">착불 발송시 정산금액에서 차감</p>
            </div>
            <hr />

            <p class="fw-bold fs-4 mt-5">최종 주문 정보</p>
            <div class="d-flex justify-content-between flex-wrap">
                <p class="text-start fw-bold">총 정산 금액</p>
                <p class="text-end fs-4 fw-bold" style="color: rgb(64, 158, 255);">
                    {{ changePriceFormat(Math.floor(Number(state.item.buyWishPrice) - Number(state.item.buyWishPrice*0.02))) }}원
                </p>
            </div>
            <hr />

            <div class="d-flex justify-content-between mt-3">   
                <span class="fw-bold">즉시 판매가</span>
                <span class="text-end fw-bold">{{ changePriceFormat(Number(state.item.buyWishPrice)) }}원</span>
            </div>
            <div class="d-flex justify-content-between">   
                <span class="gray_font">검수비</span>
                <span class="text-end">무료</span>
            </div>
            <div class="d-flex justify-content-between">   
                <span class="gray_font">수수료</span>
                <span class="text-end">-{{ changePriceFormat(Math.floor(Number(state.item.buyWishPrice*0.02))) }}원</span>
            </div>
            <div class="d-flex justify-content-between">   
                <span class="gray_font">배송비</span>
                <span class="text-end">선불, 판매자 부담</span>
            </div>
            <hr />

            <p class="fw-bold fs-4 mt-5">결제 방법</p>
            <div class="d-flex justify-content-between mt-3 flex-wrap">
                <span class="fw-bold">카드 간편 결제</span>
                <span v-if="state.cards.length === 0" class="text-end gray_font" @click="showCardAdd = true">+ 새 카드 추가</span>
                <span v-else class="text-end gray_font">등록된 카드는 마이페이지에서 변경 가능합니다.</span>
            </div>

            <div v-if="state.cards.length === 0">
                <p class="mt-2">카드를 추가하세요.</p>
            </div>
            <div v-else>
                <input type="checkbox" class="btn-check" id="1" autocomplete="off" name="pay" :checked="state.payMethod === 1">
                <label class="btn btn-outline-secondary mt-3 w-100" @click="handlePay(1)">
                    <div class="d-flex">
                        <span class="col-2 gray_font">카드번호</span>
                        <span class="col-10 text-start">{{ state.cards[0].cardNumber }}</span>
                    </div>
                    <div class="d-flex">
                        <span class="col-2 gray_font">유효일</span>
                        <span class="col-10 text-start">{{ state.cards[0].expiryMonth }} / {{ state.cards[0].expiryYear }}</span>
                    </div>
                </label>
            </div>
            <hr />

            <!-- <p class="fw-bold fs-4 mt-5">판매 조건 확인</p> -->
            <!-- 결제 컴포넌트-->
            <payment-component 
            :address="state.selectedAddress" 
            :type="state.type" 
            :sellingDto="state.sellingDto"
            :payMethod="state.payMethod"
            />
        </div>

        <!-- 판매입찰, 보관판매 -->
        <div class="container" id="wrap" v-if="state.row[0]">
            <div class="head d-flex align-items-center">
                <img :src="state.row[0].imagePath" class="head_img">
                <div class="d-flex flex-column ml-3">
                    <p style="font-weight: bold;">{{ state.row[0].modelNumber }}</p>
                    <p>{{ state.row[0].productEngName }}</p>
                    <p style="color: #aeaeae;">{{ state.row[0].productKorName }}</p>
                    <p>{{ state.size }}</p>
                </div>
            </div>

            <div class="d-flex justify-content-between mt-5 flex-wrap">
                <span class="fw-bold fs-4">판매 정산 계좌</span>
                <span v-if="!state.member.depositor" class="text-end gray_font" @click="showAccountAdd = true">+ 계좌 추가</span>
                <span v-else class="text-end gray_font">등록된 계좌는 마이페이지에서 변경가능합니다.</span>
            </div>

            <div v-if="!state.member.depositor">
                <p class="mt-3">계좌를 추가하세요.</p>
            </div>

            <div v-else>
                <div class="d-flex mt-3">
                    <span class="col-2 gray_font">계좌</span>
                    <span class="col-8 text-start">{{ state.member.bankName }}&nbsp;{{ state.member.accountNumber }}</span>
                </div>
                <div class="d-flex">
                    <span class="col-2 gray_font">예금주</span>
                    <span class="col-8 text-start">{{ state.member.depositor }}</span>
                </div>
            </div>
            <hr />

            <div class="d-flex justify-content-between mt-5 flex-wrap">
                <span class="fw-bold fs-4">반송 주소</span>
                <span v-if="state.addressList.length === 3" class="text-end gray_font">주소는 3개까지 등록 가능합니다.</span>
                <span v-else class="text-end gray_font" @click="showAddressAdd = true">+ 새 주소 추가</span>
            </div>

            <div v-if="state.addressList.length === 0">
                <p class="mt-3">주소를 추가하세요.</p>
            </div>

            <div v-else>
                <button class="btn btn-secondary float-end" @click="showAddressList = true">변경</button>
                <div class="d-flex mt-3">
                    <span class="col-2 gray_font">받는 분</span>
                    <span class="col-8 text-start">{{ state.selectedAddress.name }}</span>
                </div>
                <div class="d-flex">
                    <span class="col-2 gray_font">연락처</span>
                    <span class="col-8 text-start">{{ state.selectedAddress.phoneNumber }}</span>
                </div>
                <div class="d-flex">
                    <span class="col-2 gray_font">반송 주소</span>
                    <span class="col-8 text-start">{{ state.selectedAddress.address }} {{ state.selectedAddress.subAddress }}</span>
                </div>
            </div>
            <hr />

            <div v-if="state.type === 'bid'">  
                <p class="fw-bold fs-4 mt-5">최종 주문 정보</p>
                <div class="d-flex justify-content-between flex-wrap">
                    <p class="text-start fw-bold">총 정산 금액</p>
                    <p class="text-end fs-4 fw-bold" style="color: rgb(64, 158, 255);">
                        {{ changePriceFormat(Math.floor(state.bidPrice - state.bidPrice*0.02)) }}원
                    </p>
                </div>
                <hr />

                <div class="d-flex justify-content-between mt-3">   
                    <span class="fw-bold">판매 희망가</span>
                    <span class="text-end fw-bold">{{ state.bidPrice }}원</span>
                </div>
                <div class="d-flex justify-content-between">   
                    <span class="gray_font">검수비</span>
                    <span class="text-end">무료</span>
                </div>
                <div class="d-flex justify-content-between">   
                    <span class="gray_font">수수료</span>
                    <span class="text-end">-{{ changePriceFormat(Math.floor(state.bidPrice*0.02)) }}원</span>
                </div>
                <div class="d-flex justify-content-between">   
                    <span class="gray_font">배송비</span>
                    <span class="text-end">선불, 판매자 부담</span>
                </div>
                <hr />

                <div class="d-flex justify-content-between"> 
                    <span>입찰 마감 기한</span>
                    <span class="text-end">{{ state.bidDays }}일 - {{ state.bidFormattedDate }} 까지</span>
                </div>
                <hr />

                <p class="fw-bold fs-4 mt-5">결제 방법</p>
                <div class="d-flex justify-content-between mt-3 flex-wrap">
                    <span class="fw-bold">카드 간편 결제</span>
                    <span v-if="state.cards.length === 0" class="text-end gray_font" @click="showCardAdd = true">+ 새 카드 추가</span>
                    <span v-else class="text-end gray_font">등록된 카드는 마이페이지에서 변경 가능합니다.</span>
                </div>

                <div v-if="state.cards.length === 0">
                    <p class="mt-2">카드를 추가하세요.</p>
                </div>

                <div v-else>
                    <input type="checkbox" class="btn-check" id="1" autocomplete="off" name="pay" :checked="state.payMethod === 1">
                    <label class="btn btn-outline-secondary mt-3 w-100" @click="handlePay(1)">
                        <div class="d-flex">
                            <span class="col-2 gray_font">카드번호</span>
                            <span class="col-10 text-start">{{ state.cards[0].cardNumber }}</span>
                        </div>
                        <div class="d-flex">
                            <span class="col-2 gray_font">유효일</span>
                            <span class="col-10 text-start">{{ state.cards[0].expiryMonth }} / {{ state.cards[0].expiryYear }}</span>
                        </div>
                    </label>
                </div>
                <hr />

                <!-- <p class="fw-bold fs-4 mt-5">판매 조건 확인</p> -->
                <button class="btn btn-secondary w-100 fs-5 fw-bold p-3" @click="handleSellLater">판매 입찰하기</button>
            </div>

            <div v-if="state.type ==='keep'">
                <p class="fw-bold fs-4 mt-5">최종 신청 정보</p>
                <div class="d-flex justify-content-between flex-wrap">
                    <p class="text-start fw-bold">총 정산 금액</p>
                    <p class="text-end fs-4 fw-bold" style="color: rgb(64, 158, 255);">
                        {{ changePriceFormat(Math.floor(state.bidPrice - state.bidPrice*0.02)) }}원
                    </p>
                </div>
                <hr />
                
                <div class="d-flex justify-content-between mt-3">   
                    <span class="fw-bold">판매 희망가</span>
                    <span class="text-end fw-bold">{{ state.bidPrice }}원</span>
                </div>
                <div class="d-flex justify-content-between">   
                    <span class="gray_font">검수비</span>
                    <span class="text-end">무료</span>
                </div>
                <div class="d-flex justify-content-between">   
                    <span class="gray_font">수수료</span>
                    <span class="text-end">-{{ changePriceFormat(Math.floor(state.bidPrice*0.02)) }}원</span>
                </div>
                <div class="d-flex justify-content-between">   
                    <span class="gray_font">배송비</span>
                    <span class="text-end">선불, 판매자 부담</span>
                </div>
                <hr />
   
                <div class="d-flex justify-content-between flex-wrap">
                    <p class="text-start fw-bold">총 결제 금액</p>
                    <p class="text-end fs-4 fw-bold" style="color: rgb(103, 194, 58)">3,000원</p>
                </div>
                <hr />

                <div class="d-flex justify-content-between mt-3">   
                    <span class="fw-bold">창고 이용료</span>
                    <span class="text-end fw-bold">3,000원</span>
                </div>
                <div class="d-flex justify-content-end">
                    <span>30일마다 월 3,000원/건 자동 결제</span>
                </div>
                <div class="d-flex justify-content-between mt-3">   
                    <span class="gray_font">보관 기한</span>
                    <span class="text-end">{{ state.bidDays }}일 - {{ state.bidFormattedDate }} 까지</span>
                </div>
                <hr />

                <p class="fw-bold fs-4 mt-5">결제 방법</p>
                <div class="d-flex justify-content-between mt-3 flex-wrap">
                    <span class="fw-bold">카드 간편 결제</span>
                    <span v-if="state.cards.length === 0" class="text-end gray_font" @click="showCardAdd = true">+ 새 카드 추가</span>
                    <span v-else class="text-end gray_font">등록된 카드는 마이페이지에서 변경 가능합니다.</span>
                </div>

                <div v-if="state.cards.length === 0">
                    <p class="mt-2">카드를 추가하세요.</p>
                </div>

                <div v-else>
                    <input type="radio" class="btn-check" id="2" autocomplete="off" name="pay" :checked="state.payMethod === 1">
                    <label class="btn btn-outline-secondary mt-3 w-100" @click="handlePay(1)">
                        <div class="d-flex">
                            <span class="col-2 gray_font">카드번호</span>
                            <span class="col-10 text-start">{{ state.cards[0].cardNumber }}</span>
                        </div>
                        <div class="d-flex">
                            <span class="col-2 gray_font">유효일</span>
                            <span class="col-10 text-start">{{ state.cards[0].expiryMonth }} / {{ state.cards[0].expiryYear }}</span>
                        </div>
                    </label>
                </div>
                <hr />

                <div class="mt-3">
                    <p class="fw-bold">일반 결제</p>
                    <div class="btn-group mb-2" role="group" data-toggle="buttons">
                        <input type="radio" class="btn-check" id="3" autocomplete="off" name="pay" :checked="state.payMethod === 3">
                        <label class="btn btn-outline-warning rounded mx-1" for="3" @click="handlePay(3)">카카오 페이</label>
                    </div>
                </div>
                <hr />

                <!-- <p class="fw-bold fs-4 mt-5">보관 판매 조건 확인</p> -->

                <!-- 결제 컴포넌트-->
                <payment-component 
                :address="state.selectedAddress" 
                :type="state.type" 
                :sellingDto="state.sellingDto"
                :payMethod="state.payMethod"
                />
            </div>
        </div>
    </div>
</template>

<script>
import AccountAddModal from '@/components/AccountAddModal.vue';
import AddressModal from '@/components/AddressModal.vue';
import AddressListModal from '@/components/AddressListModal.vue';
import CardAddModal from '@/components/CardAddModal.vue';
import PaymentComponent from '@/components/PaymentComponent.vue';
import axios from 'axios';
import { onMounted, reactive, ref, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default {
    components: {
        AccountAddModal,
        AddressModal,
        AddressListModal,
        CardAddModal,
        PaymentComponent
    },
    setup () {
        const route = useRoute();
        const router = useRouter();
        const store = useStore();

        const showAccountAdd = ref(false);
        const showAddressAdd = ref(false);
        const showAddressList = ref(false);
        const showCardAdd = ref(false);

        const state = reactive({
            productid: Number(route.query.productid),
            size : Number(route.query.size),
            type : route.query.type,
            item : '',
            addressList : [],
            selectedAddress : '',
            memberNumber : sessionStorage.getItem("TOKEN"),
            member : '',
            cards : '',
            
            row : [],
            sellingStatus : null,
            buyingStatus : null,
            
            bidPrice : 0,
            bidDate : '',
            bidFormattedDate : '',
            bidDays : '',
            
            payMethod: 0,
            sellingDto : {}
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

        // 계좌, 카드 등록 후 업데이트
        const handleReload = () => {
            handleMember();
        };

        // 주소 리스트
        const handleAddressList = async() => {
            try {
                const res = await axios.get(`/api/get/address?member=${state.memberNumber}`)
                state.addressList = res.data
                // console.log("주소목록", state.addressList)

                const defaultAddress = state.addressList.find(address => address.defaultAddress === 1)
                if(defaultAddress) { // 기본 배송지 존재
                    state.selectedAddress = defaultAddress 
                } else if(state.addressList.length === 1) { // 처음 주소 추가
                    state.selectedAddress = state.addressList[0]
                } else if(state.addressList.length === 2) { // 두번째 주소 추가
                    state.selectedAddress = state.addressList[1]
                } else if(state.addressList.length === 3) { // 세번째 주소 추가 
                    state.selectedAddress = state.addressList[2]
                }
            } catch(err) {
                console.error(err);
            }
        }

        // 선택한 주소 출력
        const selectAdd = (selectedAddress) => {
            state.selectedAddress = selectedAddress;
            console.log("선택주소",selectedAddress)
        }

        // 보관판매시 결제 컴포넌트에 데이터 전달
        if(state.type ==='keep') {
            state.sellingDto = {                
                memberNumber : state.memberNumber,
                productId : state.productid,
                productSize : state.size,
                wishPrice : state.bidPrice,
                expiryDate : state.bidDate,
            }
        }

        // 판매입찰 - 판매테이블
        const handleSellLater = async() => {
            // 유효성 검사 통과
            if(!state.member.depositor) {
                alert('판매 정산 계좌를 입력하세요.')
                return false
            }
            if(!state.selectedAddress) { 
                alert('주소를 입력하세요.')
                return false
            } 
            if(state.payMethod === 0) {
                alert('결제 방법을 선택하세요')
                return false
            }   
            try {
                const url = `/api/post/sell?type=${state.type}`;
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

                router.push({
                    path : '/selling/complete',
                    query : {
                        productid: state.productid,
                        type : state.type
                    }
                })
            } catch(err) {
                console.error(err);
            }
        }

        // 멤버 정보 읽어오기
        const handleMember = async()=> {
            const url = `/api/get/member?memberNumber=${state.memberNumber}`;
            const headers = {"Content-Type":"application/json", "auth" : state.memberNumber};
            const { data } = await axios.get(url,{headers});
            state.member = data;
            state.cards = data.cards;
            console.log("회원정보: ", state.member);
            console.log("카드정보: ", state.cards);
        };

        // 판매 입찰, 보관 판매 시 상품 정보 출력용 데이터 필요
        if(state.type === 'bid' || state.type === 'keep') {
            const handleData = async() => {
                try {
                    const res = await axios.get(`/api/get/product/one?productid=${state.productid}`);
                    state.row = res.data;
                    console.log("판매입찰이나 보관판매", state.row)                
                    state.row[0].imagePath = `/api/product/display?name=${state.row[0].imagePath}`;
                } catch (err) {
                    console.error(err);
                }
            }

            onMounted(()=>{
                handleData();
            })
        }

        // 금액형식변환 세자리마다 콤마추가
        const changePriceFormat = (data) => {
            if(typeof data !== 'number' || isNaN(data)) {
                return data
            }
            return data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }

        onMounted(()=>{
            handleMember();
            handleAddressList();
        })

        return {
            state,
            showAccountAdd,
            showAddressAdd,
            showAddressList,
            showCardAdd,
            selectAdd,
            handleSellLater,
            changePriceFormat,
            handlePay,
            handleReload
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