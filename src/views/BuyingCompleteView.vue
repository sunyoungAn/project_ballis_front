<template>
    <div class="common_mt160">
        <div v-if="state.type === 'fast' && state.item" class="container" id="wrap">
            <div class="top d-flex flex-column align-items-center justify-content-center">
                <div class="top_info">
                    <p class="fw-bold fs-3">구매가 완료되었습니다.</p>
                    <p>구매한 상품은 자정전까지 결제한건에 대하여</p>
                    <p>다음날 즉시 출고될 예정입니다.</p>                
                </div>
                <div>
                    <img :src="state.item.imagePath" class="top_img" />
                </div>

                <div class="d-flex align-items-center justify-content-around gap-2 mx-auto w-100">
                    <button class="btn btn-outline-secondary flex-grow-1 mx-0 mb-3 p-2">
                        <p><a href="/mypage/buying">내역 상세보기</a></p>
                    </button>
                    <button class="btn btn-outline-secondary flex-grow-1 mx-0 mb-3 p-2">
                        <p><a href="/product/list">SHOP 바로가기</a></p>
                    </button>
                </div>

                <div>
                    <p class="gray_font">구매는 취소가 불가능합니다.</p>
                </div>
            </div>
            <div class="bottom">
                <div class="d-flex justify-content-between flex-wrap mt-5">
                    <p class="text-start fs-4 fw-bold">총 결제금액</p>
                    <p class="text-end fs-4 fw-bold" style="color: rgb(103, 194, 58);">
                        {{ Math.floor(state.item.sellWishPrice + state.item.sellWishPrice*0.015 + 5000) }}원
                    </p>
                </div>
                <hr />
                
                <div class="d-flex justify-content-between mt-3">   
                    <span class="fw-bold">구매가</span>
                    <span class="text-end fw-bold">{{ state.item.sellWishPrice }}원</span>
                </div>
                <div class="d-flex justify-content-between mt-2">   
                    <span class="gray_font">검수비</span>
                    <span class="text-end">무료</span>
                </div>
                <div class="d-flex justify-content-between mt-2">   
                    <span class="gray_font">수수료</span>
                    <span class="text-end">{{ Math.floor(state.item.sellWishPrice*0.015) }}원</span>
                </div>
                <div class="d-flex justify-content-between mt-2">   
                    <span class="gray_font">배송비</span>
                    <span class="text-end">5,000원</span>
                </div>
            </div>
        </div>

        <div v-if="state.type === 'normal' && state.item" class="container" id="wrap">
            <div class="top d-flex flex-column align-items-center justify-content-center">
                <div class="top_info">
                    <p class="fw-bold fs-3">즉시 구매가 완료되었습니다.</p>
                    <p>구매한 상품은 전문가의 검수 완료 후,</p>
                    <p>안전하게 배송될 예정입니다.</p>
                </div>
                <div>
                    <img :src="state.item.imagePath" class="top_img" />
                </div>

                <div class="d-flex align-items-center justify-content-around gap-2 mx-auto w-100">
                    <button class="btn btn-outline-secondary flex-grow-1 mx-0 mb-3 p-2">
                        <p><a href="/mypage/buying">내역 상세보기</a></p>
                    </button>
                    <button class="btn btn-outline-secondary flex-grow-1 mx-0 mb-3 p-2">
                        <p><a href="/product/list">SHOP 바로가기</a></p>
                    </button>
                </div>

                <div>
                    <p class="gray_font">즉시 구매는 취소가 불가능합니다.</p>
                </div>
            </div>
            <div class="bottom">
                <div class="d-flex justify-content-between flex-wrap mt-5">
                    <p class="text-start fs-4 fw-bold">총 결제금액</p>
                    <p class="text-end fs-4 fw-bold" style="color: rgb(103, 194, 58);">
                        {{ Math.floor(state.item.sellWishPrice + state.item.sellWishPrice*0.015 + 3000) }}원
                    </p>
                </div>
                <hr />

                <div class="d-flex justify-content-between mt-3">   
                    <span class="fw-bold">즉시 구매가</span>
                    <span class="text-end fw-bold">{{ state.item.sellWishPrice }}원</span>
                </div>
                <div class="d-flex justify-content-between mt-2">   
                    <span class="gray_font">검수비</span>
                    <span class="text-end">무료</span>
                </div>
                <div class="d-flex justify-content-between mt-2">   
                    <span class="gray_font">수수료</span>
                    <span class="text-end">{{ Math.floor(state.item.sellWishPrice*0.015) }}원</span>
                </div>
                <div class="d-flex justify-content-between mt-2">   
                    <span class="gray_font">배송비</span>
                    <span class="text-end">3,000원</span>
                </div>
            </div>
        </div>

        <div v-if="state.type === 'bid' && state.row[0]" class="container" id="wrap">
            <div class="top d-flex flex-column align-items-center justify-content-center">
                <div class="top_info">
                    <p class="fw-bold fs-3">구매 입찰이 완료되었습니다.</p>
                    <p>결제는 거래가 성사되는 시점에</p>
                    <p>등록하신 결제 정보로 자동 처리 됩니다.</p>                    
                </div>
                <div>
                    <img :src="state.row[0].imagePath" class="top_img" />
                </div>

                <div class="d-flex align-items-center justify-content-around gap-2 mx-auto w-100">
                    <button class="btn btn-outline-secondary flex-grow-1 mx-0 mb-3 p-2">
                        <p><a href="/mypage/buying">내역 상세보기</a></p>
                    </button>
                    <button class="btn btn-outline-secondary flex-grow-1 mx-0 mb-3 p-2">
                        <p><a href="/product/list">SHOP 바로가기</a></p>
                    </button>
                </div>

                <div>
                    <p class="gray_font">'구매내역>입찰 중'상태일 때는 입찰 지우기가 가능합니다.</p>
                </div>
            </div>
            <div class="bottom">
                <div class="d-flex justify-content-between flex-wrap mt-5">
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
                <div class="d-flex justify-content-between mt-2">   
                    <span class="gray_font">검수비</span>
                    <span class="text-end">무료</span>
                </div>
                <div class="d-flex justify-content-between mt-2">   
                    <span class="gray_font">수수료</span>
                    <span class="text-end">{{ Math.floor(state.bidPrice*0.03) }}원</span>
                </div>
                <div class="d-flex justify-content-between mt-2">   
                    <span class="gray_font">배송비</span>
                    <span class="text-end">3,000원</span>
                </div>
                <hr />

                <div class="d-flex justify-content-between"> 
                    <span>입찰 마감 기한</span>
                    <span class="text-end">{{ state.bidDays }}일 - {{ state.bidFormattedDate }} 까지</span>
                </div>
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
        
        // 구매 입찰 시 데이터 필요
        if(state.type === 'bid') {
            const handleData = async() => {
                try {
                    const res = await axios.get(`/api/get/product/one?productid=${state.productid}`);
                    state.row = res.data;
                    console.log("구매입찰", state.row)
                    state.row[0].imagePath = `/api/product/display?name=${state.row[0].imagePath}`;
                } catch (err) {
                    console.error(err);
                }
            }

            onMounted(()=>{
                handleData();
            })
        }
        
        return {
            state
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