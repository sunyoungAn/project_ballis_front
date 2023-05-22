<template>
    <div class="common_mt160">
        <!-- 즉시판매 -->
        <div v-if="state.type === 'normal' && state.item" class="container" id="wrap">
            <div class="top d-flex flex-column align-items-center justify-content-center">
                <div class="top_info">
                    <p class="fw-bold fs-3">즉시 판매가 완료되었습니다.</p>
                    <p>일요일, 공휴일 제외 2일 이내에 아래 주소로 상품을 발송한 후,</p>
                    <p>'MY>판매 내역>진행 중'에서 발송정보를 입력하세요.</p>                
                </div>
                <div>
                    <img :src="state.item.imagePath" class="top_img" />
                </div>

                <div class="d-flex align-items-center justify-content-around gap-2 mx-auto w-100">
                    <button class="btn btn-outline-secondary flex-grow-1 mx-0 mb-3 p-2">
                        <p><a href="/mypage/selling">판매 내역 보기</a></p>
                    </button>
                    <button class="btn btn-outline-secondary flex-grow-1 mx-0 mb-3 p-2">
                        <p><a href="/product/list">SHOP 바로가기</a></p>
                    </button>
                </div>

                <div>
                    <p class="gray_font">즉시 판매는 취소가 불가능합니다.</p>
                </div>
            </div>
            <div class="bottom">
                <div class="d-flex justify-content-between flex-wrap mt-5">
                    <p class="text-start fs-4 fw-bold">총 정산 금액</p>
                    <p class="text-end fs-4 fw-bold" style="color: rgb(64, 158, 255);">
                        {{ changePriceFormat(Math.floor(Number(state.item.buyWishPrice) - Number(state.item.buyWishPrice*0.02))) }}원
                    </p>
                </div>
                <hr />
                
                <div class="d-flex justify-content-between mt-3">   
                    <span class="fw-bold">즉시 판매가</span>
                    <span class="text-end fw-bold">{{ changePriceFormat(Number(state.item.buyWishPrice)) }}원</span>
                </div>
                <div class="d-flex justify-content-between mt-2">   
                    <span class="gray_font">검수비</span>
                    <span class="text-end">무료</span>
                </div>
                <div class="d-flex justify-content-between mt-2">   
                    <span class="gray_font">수수료</span>
                    <span class="text-end">{{ -changePriceFormat(Math.floor(Number(state.item.buyWishPrice*0.02))) }}원</span>
                </div>
                <div class="d-flex justify-content-between mt-2">   
                    <span class="gray_font">배송비</span>
                    <span class="text-end">선불, 판매자 부담</span>
                </div>
                <hr />

                <p class="fs-4 fw-bold mt-5">보내실 곳</p>
                <p class="fs-5">부산광역시 부산진구 동성직업전문학교 A1프라자 6층</p>
            </div>
        </div>

        <!-- 판매입찰 -->
        <div v-if="state.type === 'bid' && state.row[0] " class="container" id="wrap">
            <div class="top d-flex flex-column align-items-center justify-content-center">
                <div class="top_info">
                    <p class="fw-bold fs-3">판매 입찰이 완료되었습니다.</p>
                    <p>거래가 체결되고 상품이 검수에 합격한 후,</p>
                    <p>등록한 계좌로 정산이 진행됩니다.</p>
                </div>
                <div>
                    <img :src="state.row[0].imagePath" class="top_img" />
                </div>

                <div class="d-flex align-items-center justify-content-around gap-2 mx-auto w-100">
                    <button class="btn btn-outline-secondary flex-grow-1 mx-0 mb-3 p-2">
                        <p><a href="/mypage/selling">판매 내역 보기</a></p>
                    </button>
                    <button class="btn btn-outline-secondary flex-grow-1 mx-0 mb-3 p-2">
                        <p><a href="/product/list">SHOP 바로가기</a></p>
                    </button>
                </div>
                
                <div>
                    <p class="gray_font">'판매내역>입찰 중'상태일 때는 입찰 지우기가 가능합니다.</p>
                </div>
            </div>

            <div class="bottom">
                <div class="d-flex justify-content-between flex-wrap mt-5">
                    <p class="text-start fs-4 fw-bold">총 정산 금액</p>
                    <p class="text-end fs-4 fw-bold" style="color: rgb(64, 158, 255);">
                        {{ changePriceFormat(Math.floor(state.bidPrice - state.bidPrice*0.02)) }}원
                    </p>
                </div>
                <hr />
                
                <div class="d-flex justify-content-between mt-3">   
                    <span class="fw-bold">판매 희망가</span>
                    <span class="text-end fw-bold">{{ state.bidPrice }}원</span>
                </div>
                <div class="d-flex justify-content-between mt-2">   
                    <span class="gray_font">검수비</span>
                    <span class="text-end">무료</span>
                </div>
                <div class="d-flex justify-content-between mt-2">   
                    <span class="gray_font">수수료</span>
                    <span class="text-end">{{ -changePriceFormat(Math.floor(state.bidPrice*0.02)) }}원</span>
                </div>
                <div class="d-flex justify-content-between mt-2">   
                    <span class="gray_font">배송비</span>
                    <span class="text-end">선불, 판매자 부담</span>
                </div>
                <hr />

                <div class="d-flex justify-content-between"> 
                    <span>입찰 마감 기한</span>
                    <span class="text-end">{{ state.bidDays }}일 - {{ state.bidFormattedDate }} 까지</span>
                </div>
            </div>
        </div>

        <!-- 보관판매 -->
        <div v-if="state.type === 'keep' && state.row[0]" class="container" id="wrap">
            <div class="top d-flex flex-column align-items-center justify-content-center">
                <div class="top_info">
                    <p class="fw-bold fs-3">보관 신청이 완료되었습니다.</p>
                    <p>일요일, 공휴일 제외 2일 이내에 아래 주소로 상품을 발송한 후,</p>
                    <p>'MY>보관 판매 내역>신청'에서 발송정보를 입력하세요.</p>                    
                </div>
                <div>
                    <img :src="state.row[0].imagePath" class="top_img" />
                </div>

                <div class="d-flex align-items-center justify-content-around gap-2 mx-auto w-100">
                    <button class="btn btn-outline-secondary flex-grow-1 mx-0 mb-3 p-2">
                        <p><a href="/mypage/inventory">보관 판매 내역 보기</a></p>
                    </button>
                    <button class="btn btn-outline-secondary flex-grow-1 mx-0 mb-3 p-2">
                        <p><a href="/product/list">SHOP 바로가기</a></p>
                    </button>
                </div>

                <div>
                    <p class="gray_font">신청일시 기준 1시간 이후 취소 시 결제금액이 환불되지 않습니다.</p>
                </div>
            </div>

            <div class="bottom">
                <div class="d-flex justify-content-between flex-wrap mt-5">
                    <p class="text-start fs-4 fw-bold">총 정산 금액</p>
                    <p class="text-end fs-4 fw-bold" style="color: rgb(64, 158, 255);">
                        {{ changePriceFormat(Math.floor(state.bidPrice - state.bidPrice*0.02)) }}원
                    </p>
                </div>
                <hr />
                
                <div class="d-flex justify-content-between mt-3">   
                    <span class="fw-bold">판매 희망가</span>
                    <span class="text-end fw-bold">{{ changePriceFormat(state.bidPrice) }}원</span>
                </div>
                <div class="d-flex justify-content-between mt-2">   
                    <span class="gray_font">검수비</span>
                    <span class="text-end">무료</span>
                </div>
                <div class="d-flex justify-content-between mt-2">   
                    <span class="gray_font">수수료</span>
                    <span class="text-end">{{ -changePriceFormat(Math.floor(state.bidPrice*0.02)) }}원</span>
                </div>
                <div class="d-flex justify-content-between mt-2">   
                    <span class="gray_font">배송비</span>
                    <span class="text-end">선불, 판매자 부담</span>
                </div>
                <hr />

                <div class="d-flex justify-content-between flex-wrap mt-5">
                    <p class="text-start fs-4 fw-bold">총 결제 금액</p>
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
                
                <p class="fs-4 fw-bold mt-5">보내실 곳</p>
                <p class="fs-5">부산광역시 부산진구 동성직업전문학교 A1프라자 6층</p>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { onMounted, reactive, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

export default {
    setup () {
        const route = useRoute();
        const store = useStore();
        
        const state = reactive({
            productid: Number(route.query.productid),
            type : route.query.type,

            item : '',
            row : [],

            bidPrice : 0,
            bidFormattedDate : '',
            bidDays : ''
        })

        watchEffect(() => {
            state.item = store.getters.getSelectedItem;
            state.bidPrice = Number(store.getters.getSelectedPrice);
            state.bidFormattedDate = store.getters.getSelectedFormattedDate;
            state.bidDays = store.getters.getSelectedDays;
        });
        
        // 판매입찰, 보관판매 시 데이터 필요
        if(state.type === 'bid' || state.type === 'keep') {
            const handleData = async() => {
                try {
                    const res = await axios.get(`/api/get/product/one?productid=${state.productid}`);
                    state.row = res.data;
                    console.log("판매입찰 또는 보관판매", state.row)
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
        
        return {
            state,
            changePriceFormat
        }
    }
}
</script>

<style lang="css" scoped>
@import "../assets/css/common.css";
#wrap {
    /* border: 1px solid #cccccc; */
    width: 600px;
}
a, a:hover{
    text-decoration: none;
    color: inherit;
}
.top_info{
    text-align: center;
    margin: 20px;
}
.top_img{
    width: 300px;
    height: 300px;
    margin: 5px;
    border-radius: 10px;
}
.top p{
    margin: 1px 8px;
}

</style>