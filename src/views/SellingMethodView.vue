<template>
    <div class="common_mt160">
        <div class="container" id="wrap" v-if="state.row.length > 0">
            <div class="head d-flex align-items-center">
                <img :src="state.row[0].imagePath" class="head_img">
                <div class="d-flex flex-column ml-3">
                    <p style="font-weight: bold;">{{ state.row[0].modelNumber }}</p>
                    <p>{{ state.row[0].productEngName }}</p>
                    <p style="color: #aeaeae;">{{ state.row[0].productKorName }}</p>
                    <p>{{ state.size }}</p>
                </div>
            </div>
            <hr />
            <div class="body">
                <div class="d-flex align-items-center justify-content-center">
                    <div class="price_box d-flex flex-column align-items-center text-center" id="price_box1">
                        <p class="price_name">즉시 구매가</p>
                        <p v-if="state.row[0].sellWishPrice" class="fs-5">{{ state.row[0].sellWishPrice }}원</p>
                        <p v-else class="fs-5">- 원</p> 
                    </div>
                    <div class="price_box d-flex flex-column align-items-center text-center"> 
                        <p class="price_name">즉시 판매가</p>
                        <p v-if="state.row[0].buyWishPrice" class="fs-5">{{ state.row[0].buyWishPrice }}원</p>
                        <p v-else class="fs-5">- 원</p> 
                    </div>
                </div>

                <div class="btn-group w-100 my-4" role="group" data-toggle="buttons">
                    <label class="btn p-3" v-bind:class="state.type === 'keep'? 'blue_button' : 'not_checked'" @click="state.type = 'keep'">
                        보관 판매
                        <input type="radio" class="d-none" id="keep" name="price" :checked="state.type === 'keep'">
                    </label>
                    <label class="btn p-3" v-bind:class="state.type === 'bid'? 'blue_button' : 'not_checked'" @click="state.type = 'bid'">
                        판매 입찰
                        <input type="radio" class="d-none" id="bid" name="price" :checked="state.type === 'bid'">
                    </label>
                    <label class="btn p-3" v-bind:class="[state.type === 'normal'? 'blue_button' : 'not_checked']" @click="state.onlyBid === false ? state.type = 'normal' : state.type = 'bid'">
                        즉시 판매
                        <input type="radio" class="d-none" id="normal" name="price" :checked="state.type === 'normal'" :disabled="state.onlyBid">
                    </label>
                </div>

                <!-- 즉시 판매 -->
                <div v-show="state.type === 'normal'">
                    <p class="fw-bold">즉시 판매가</p>
                    <p class="fs-4 fw-bold text-end">{{ state.row[0].buyWishPrice }}원</p>
                    <hr />

                    <div class="d-flex justify-content-between mt-2">   
                        <span class="gray_font">검수비</span>
                        <span class="text-end">무료</span>
                    </div>
                    <div class="d-flex justify-content-between">   
                        <span class="gray_font">수수료</span>
                        <span class="text-end">{{ -Math.floor(Number(state.row[0].buyWishPrice)*0.02) }}원</span>
                    </div>
                    <div class="d-flex justify-content-between">   
                        <span class="gray_font">배송비</span>
                        <span class="text-end">선불, 판매자 부담</span>
                    </div>
                    <hr />

                    <div class="d-flex justify-content-between mt-5"> 
                        <p class="fw-bold">정산 금액</p>
                        <p class="fs-4 fw-bold text-end" style="color: rgb(64, 158, 255);">{{ Math.floor(Number(state.row[0].buyWishPrice) - Number(state.row[0].buyWishPrice)*0.02) }}원</p>
                    </div>

                    <button class="btn btn-secondary w-100 my-3 fs-5 fw-bold p-3" 
                    @click="handleNext('normal')">
                    즉시 판매 계속</button>
                </div>      

                <!-- 판매 입찰 -->
                <div v-show="state.type === 'bid'">
                    <p class="fw-bold">판매 희망가</p>
                    <div class="input-group">
                        <input type="text" class="form-control form-control-lg text-end" v-model="state.inputValue" @input="handleInput">
                        <div class="input-group-append">
                            <span class="fs-4 fw-bold mx-2">원</span>
                        </div>
                    </div>

                    <p v-if="state.errorMessage" class="mt-3" style="color: #e25d5d;">
                        {{ state.errorMessage }}
                    </p>

                    <div class="d-flex justify-content-between mt-5">   
                        <span class="gray_font">검수비</span>
                        <span class="text-end">무료</span>
                    </div>
                    <div class="d-flex justify-content-between">   
                        <span class="gray_font">수수료</span>
                        <span class="text-end">{{ -Math.floor(Number(state.inputValue)*0.02) }}원</span>
                    </div>
                    <div class="d-flex justify-content-between">   
                        <span class="gray_font">배송비</span>
                        <span class="text-end">선불, 판매자 부담</span>
                    </div>
                    <hr />

                    <p class="fw-bold mt-5">입찰 마감기한</p>
                    <p>{{ state.days }}일 ({{ state.formattedDate }}마감)</p>
                    <div class="btn-group w-100 mb-2" role="group" data-toggle="buttons">
                        <input type="radio" class="btn-check" id="1" autocomplete="off" name="date" :checked="state.days === 1">
                        <label class="btn btn-outline-secondary rounded p-3 mx-1" for="1" @click="handleDate(1)">1일</label>
                        <input type="radio" class="btn-check" id="3" autocomplete="off" name="date" :checked="state.days === 3">
                        <label class="btn btn-outline-secondary rounded p-3 mx-1" for="3" @click="handleDate(3)">3일</label>
                        <input type="radio" class="btn-check" id="7" autocomplete="off" name="date" :checked="state.days === 7">
                        <label class="btn btn-outline-secondary rounded p-3 mx-1" for="7" @click="handleDate(7)">7일</label>
                        <input type="radio" class="btn-check" id="30" autocomplete="off" name="date" :checked="state.days === 30">
                        <label class="btn btn-outline-secondary rounded p-3 mx-1" for="30" @click="handleDate(30)">30일</label>
                        <input type="radio" class="btn-check" id="60" autocomplete="off" name="date" :checked="state.days === 60">
                        <label class="btn btn-outline-secondary rounded p-3 mx-1" for="60" @click="handleDate(60)">60일</label>
                    </div>
                    <hr />

                    <div class="d-flex justify-content-between mt-5"> 
                        <p class="fw-bold">정산 금액</p>
                        <p class="fs-4 fw-bold text-end" style="color: rgb(64, 158, 255);">{{ Math.floor(Number(state.inputValue) - Number(state.inputValue)*0.02) }}원</p>
                    </div>
                    
                    <button class="btn btn-secondary w-100 my-3 fs-5 fw-bold p-3" 
                    :disabled="!state.inputValue || state.errorMessage.length > 0"
                    @click="handleNext('bid')">
                    판매 입찰 계속</button>
                </div>

                <!-- 보관 판매 -->
                <div v-show="state.type === 'keep'">
                    <p class="fw-bold">판매 희망가</p>
                    <div class="input-group">
                        <input type="text" class="form-control form-control-lg text-end" v-model="state.inputValue" @input="handleInput">
                        <div class="input-group-append">
                            <span class="fs-4 fw-bold mx-2">원</span>
                        </div>
                    </div>

                    <p v-if="state.errorMessage" class="mt-3" style="color: #e25d5d;">
                        {{ state.errorMessage }}
                    </p>                      

                    <div class="d-flex justify-content-between mt-5">   
                        <span class="gray_font">검수비</span>
                        <span class="text-end">무료</span>
                    </div>
                    <div class="d-flex justify-content-between">   
                        <span class="gray_font">수수료</span>
                        <span class="text-end">{{ -Math.floor(Number(state.inputValue)*0.02) }}원</span>
                    </div>
                    <div class="d-flex justify-content-between">   
                        <span class="gray_font">배송비</span>
                        <span class="text-end">선불, 판매자 부담</span>
                    </div>
                    <hr />

                    <div class="d-flex justify-content-between mt-2">   
                        <span class="gray_font">창고 이용료</span>
                        <span class="text-end">3,000원</span>
                    </div>
                    <div class="d-flex justify-content-between">   
                        <span class="gray_font">보관 기한</span>
                        <span class="text-end">기본 {{ state.days }}일 ({{ state.formattedDate }}까지)</span>
                    </div>
                    <div class="d-flex justify-content-end">
                        <span>이후 월 3,000원/건 자동 결제</span>
                    </div>

                    <hr />

                    <div class="d-flex justify-content-between mt-5"> 
                        <p class="fw-bold">정산 금액</p>
                        <p class="fs-4 fw-bold text-end" style="color: rgb(64, 158, 255);">
                            {{ Math.floor(Number(state.inputValue) - Number(state.inputValue)*0.02) }}원
                        </p>
                    </div>
                    <hr />    

                    <div class="d-flex justify-content-between mt-5">
                        <p class="fw-bold">결제 금액</p>
                        <p class="fs-4 fw-bold text-end" style="color: rgb(103, 194, 58)">3,000원</p>
                    </div>
                    <hr />
                    
                    <button class="btn btn-secondary w-100 my-3 fs-5 fw-bold p-3" 
                    :disabled="!state.inputValue || state.errorMessage.length > 0"
                    @click="handleNext('keep')">
                    보관 판매 계속</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { onMounted, reactive, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default {
    setup () {
        const route = useRoute();
        const router = useRouter();
        const store = useStore();

        const state = reactive({
            productid: Number(route.query.productid),
            size : Number(route.query.size),
            type : route.query.type,
            row : [],
            sellNow : false,

            inputValue : '',
            errorMessage : '',
            
            days : 30,
            date : null,
            formattedDate : null,
        })

        watchEffect(() => {
            if(state.type) {
                state.inputValue = '';
                state.errorMessage = '';
                state.days = 30;
            }
        });

        const handleDate = (days) => {
            state.days = days;
            const now = new Date();
            const dateAfterDays = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);
            state.date = dateAfterDays;

            const yyyy = state.date.getFullYear();
            const mm = String(state.date.getMonth() + 1).padStart(2, '0');
            const dd = String(state.date.getDate()).padStart(2, '0');
            state.formattedDate = `${yyyy}/${mm}/${dd}`;
        };

        const handleInput = (event) => {
            const input = event.target.value;
            const regex = /^[0-9]*$/;

            if (regex.test(input)) {
                state.inputValue = input;
                
                if (state.inputValue< 30000) {
                    state.errorMessage = '3만원 이상 입력 가능합니다.';
                } else if (state.inputValue % 1000 !== 0) {
                    state.errorMessage = '1000원 단위로 입력 가능합니다.';
                } else {
                    state.errorMessage = '';
                }

            } else {
                state.inputValue = input.replace(/[^\d]/g, '')
                state.errorMessage = '숫자만 입력 가능합니다.';
            }
        };

        const handleNext = (type) => {
            // 유효성 검사 통과
            if(state.errorMessage.length === 0) {
                // store에 판입찰 가격, 마감기한 보관
                store.commit('setSelectedPrice', state.inputValue)
                store.commit('setSelectedDate', state.date)
                store.commit('setSelectedFormattedDate', state.formattedDate)
                store.commit('setSelectedDays', state.days)
                
                router.push({
                    path : '/selling/payment',
                    query : {
                        productid: state.productid,
                        size : state.size,
                        type : type
                    }
                })
            } else {
                console.log("에러메시지 존재")
            }
        }

        const handleData = async() => {
            try {
                const res = await axios.get(`/api/get/product/method?productid=${state.productid}&size=${state.size}`);
                const filteredData = res.data.filter(item => item.buyProductSize === state.size);
                
                if(filteredData.length > 0) { // query와 일치하는 사이즈 데이터 존재 -> 즉시 구매
                    state.row = filteredData;
                    state.sellNow = true;
                    console.log("즉시판매", state.row)
                } else { // else -> 구매입찰
                    state.row = res.data;
                    console.log("구매입찰, 보관판매", state.row)
                }
                state.row[0].imagePath = `/api/product/display?name=${state.row[0].imagePath}`;
            
            } catch (err) {
                console.error(err);
            }
        }

        onMounted(()=>{
            handleData();
            handleDate(30);
        })

        return {
            state,
            handleNext,
            handleInput,
            handleDate,
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
.price_box{
    flex: 1;
    padding: 10px 20px 10px 10px;
}
#price_box1{
    border-right: 1px solid #cecece;
}
.price_name{
    color: #8d8d8d;
    margin: 0;
}
.blue_button {
  background-color: rgb(64, 158, 255);
  height: 60px;
  color: #ffffff;
}
.blue_button:hover {
  background-color: rgb(121, 187, 255) !important;
  color: #ffffff !important; 
}
.not_checked{
    border-color:rgb(64, 158, 255);
    color: rgb(64, 158, 255);
}
.not_checked:hover {
    border-color:rgb(121, 187, 255) !important;
    color: rgb(121, 187, 255) !important;
}
/* disabled 넣기 */
</style>