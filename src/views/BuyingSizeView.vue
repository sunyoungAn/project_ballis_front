<template>
    <div class="common_mt160">
        <div class="container" id="wrap" v-if="state.row">
            <div class="head d-flex align-items-center">
                <img :src="state.row.imagePath" class="head_img">
                <div class="d-flex flex-column ml-3">
                    <p style="font-weight: bold;">{{ state.row.modelNumber }}</p>
                    <p>{{ state.row.productEngName }}</p>
                    <p style="color: #aeaeae;">{{ state.row.productKorName }}</p>
                    <p v-if="state.rowFast.length > 0">
                        <button class="fast_small">
                            <img src="@/assets/image/lightning.png" class="lightning"/>
                            빠른배송
                        </button>
                    </p>
                </div>
            </div>
            <hr />
            <div class="body">
                <div class="d-flex justify-content-center flex-row flex-wrap">
                    <button class="button_size" v-for="(size, index) in state.sizes" :key="size" @click="handleMethod(size, index)">
                        <div class="button_size_body1" :class="{ 'active': activeIndex === index }">{{ size }}</div>
                        <div class="button_bottom">
                            <div v-for="(tmp, i) in state.rowFast" :key="i">
                                <div v-if="tmp.sellProductSize === size" class="button_size_body2">
                                    <img src="@/assets/image/lightning.png" class="lightning"/>
                                </div>
                            </div>
                            <div v-for="(tmp, i) in state.rowCheaper" :key="i">
                                <div v-if="tmp.sellProductSize === size">
                                    <div class="button_size_body3" :class="{ 'active': activeIndex === index }">{{ tmp.sellWishPrice }}</div>
                                </div>
                            </div> 
                        </div>
                    </button>
                </div>

                <div v-show="state.showMethod">
                    <hr />

                    <div v-show="state.methodSelect === 1">
                        <div class="d-flex align-items-center justify-content-around gap-2 mx-auto w-100">

                            <button class="del_button btn btn-warning flex-grow-1 mx-1 mb-3" type="button">

                                <div v-for="(tmp, i) in state.rowFast" :key="i">
                                    <div v-if="tmp.sellProductSize === state.size" @click="handleFast(state.size, tmp)">
                                        <p class="fs-5 fw-bold">{{ tmp.sellWishPrice }}</p>
                                        <p>빠른배송(1-2일 소요)</p>
                                    </div>
                                </div>
                            </button>
                            
                            <button class="del_button btn btn-secondary flex-grow-1 mx-1 mb-3" type="button">
                                <div v-for="(tmp, i) in state.rowNormal" :key="i">
                                    <div v-if="tmp.sellProductSize === state.size" @click="handleType(state.size, 'normal', tmp)">
                                        <p class="fs-5 fw-bold">{{ tmp.sellWishPrice }}</p>
                                        <p>일반배송(5-7일 소요)</p>
                                    </div>
                                </div>
                            </button>
                        </div>
                    </div>

                    <div v-show="state.methodSelect === 2">    
                        <div class="d-flex align-items-center justify-content-around mx-auto w-100">
                            <button class="del_button btn btn-warning flex-grow-1 mx-1 mb-3" type="button">
                                <div v-for="(tmp, i) in state.rowFast" :key="i">
                                    <div v-if="tmp.sellProductSize === state.size" @click="handleFast(state.size, tmp)">
                                        <p class="fs-5 fw-bold">{{ tmp.sellWishPrice }}</p>
                                        <p>빠른배송(1-2일 소요)</p>
                                    </div>
                                </div>
                            </button>
                        </div>
                    </div>

                    <div v-show="state.methodSelect === 3">
                        <div class="d-flex align-items-center justify-content-around mx-auto w-100">
                            <button class="del_button btn btn-secondary flex-grow-1 mx-1 mb-3" type="button">

                                <div v-for="(tmp, i) in state.rowNormal" :key="i">
                                    <div v-if="tmp.sellProductSize === state.size" @click="handleType(state.size, 'normal', tmp)">
                                        <p class="fs-5 fw-bold">{{ tmp.sellWishPrice }}</p>
                                        <p>일반배송(5-7일 소요)</p>
                                    </div>
                                </div>
                            </button>
                        </div>
                    </div>

                    <div v-show="state.methodSelect === 4">
                        <div class="d-flex align-items-center justify-content-around mx-auto w-100">
                            <button class="del_button btn btn-secondary flex-grow-1 mx-1 mb-3" type="button" 
                            @click="handleType(state.size, 'bid')">
                                <p class="fs-5 fw-bold">구매입찰</p>
                                <p>일반배송(5-7일 소요)</p>
                            </button>
                        </div>                        
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import axios from 'axios';
import { onMounted, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
export default {
    setup () {
        const route = useRoute();
        const router = useRouter();
        const store = useStore();

        const state = reactive({
            productid : Number(route.query.productid),
            row : {},
            sizes : [],
            rowFast : [],
            rowNormal : [],
            rowBoth : [],
            rowCheaper : [],
            showMethod : false,
            methodSelect : 0,
            size : 0,
        })

        const activeIndex = ref(null);

        const handleFast = (size, tmp) => {
            store.commit('setSelectedItem', tmp)
            router.push({
                path : '/buying/payment',
                query : {
                    productid: state.productid,
                    size : size,
                    type : 'fast'
                }
            })
        }

        const handleType = (size, type, tmp) => {
            store.commit('setSelectedItem', tmp)
            router.push({
                path : '/buying/method',
                query : {
                    productid: state.productid,
                    size : size,
                    type : type
                }
            })
        }

        // 상품 정보 데이터 -> 판매 데이터 없을때도 출력할수있도록
        const handleInfo = async() => {
            try{
                const res = await axios.get(`/api/get/product/one?productid=${state.productid}`);
                state.row = res.data[0];
                console.log("출력용 데이터", state.row);
                state.row.imagePath = `/api/product/display?name=${state.row.imagePath}`;
            
                // 전체 사이즈 나열
                for(let i = state.row.sizeMin; i <= state.row.sizeMax; i += state.row.sizeUnit) {
                    state.sizes.push(i);
                }
            }catch(err){
                console.error(err);
            }
        }

        // 판매 데이터
        const handleData = async() => {
            try {
                const res = await axios.get(`/api/get/product/buy?productid=${state.productid}`);
                console.log('판매용 데이터', res.data);
                
                state.rowFast = res.data.fast; // 빠른배송
                state.rowNormal = res.data.normal; // 일반배송
                state.rowBoth = res.data.both; // 둘 중 더 저렴한 데이터
                state.rowCheaper = res.data.cheaper; // 둘 중 더 저렴한 데이터, 둘 중 하나만 존재시 그 데이터
                // console.log("빠른배송", state.rowFast)
                // console.log("일반배송", state.rowNormal)
                // console.log("둘중 저렴", state.rowBoth)
                // console.log("사이즈별 가장 저렴", state.rowCheaper)
            } catch (err) {
                console.error(err);
            }
        }

        const handleMethod = (size, index) => {
            // css 전환
            activeIndex.value = index;
            
            let hasMatchingSize = false;
            // 빠른배송, 일반배송 모두 존재
            if(state.rowBoth) {                
                for (let i = 0; i < state.rowBoth.length; i++) {
                    if (state.rowBoth[i].sellProductSize === size) {
                        state.size = size;
                        state.methodSelect = 1;
                        hasMatchingSize = true;
                        break;
                    }
                }
            }

            // 빠른배송만 존재
            if (!hasMatchingSize) {
                for (let i = 0; i < state.rowFast.length; i++) {
                    if (state.rowFast[i].sellProductSize === size) {                        
                        state.size = size;
                        state.methodSelect = 2;
                        hasMatchingSize = true;
                        break;
                    }
                }
            }

            // 일반배송만 존재
            if (!hasMatchingSize) {
                for (let i = 0; i < state.rowNormal.length; i++) {
                    if (state.rowNormal[i].sellProductSize === size) {
                        state.size = size;
                        state.methodSelect = 3;
                        hasMatchingSize = true;
                        break;
                    }
                }
            }

            // 판매상품 존재 x -> 구매입찰
            if (!hasMatchingSize) {
                state.size = size;
                state.methodSelect = 4;
            }
            
            state.showMethod = true;
        }

        onMounted (()=> {
            handleInfo();
            handleData();
        })

        return {
            state,
            activeIndex,
            handleMethod,
            handleFast,
            handleType
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
.button_size{
    width: 230px;
    height: 70px;
    border: 1px solid #cccccc;
    border-radius: 10px;
    background-color: #ffffff;
    margin: 7px;
}
.button_size:focus{
    border: 1.5px solid #000000;
}
.button_bottom {
    display: flex;
    justify-content: center;
    position: relative;
}
.button_size_body2 {
    position: absolute;
    left: 50px;
}
.button_size_body1.active, .button_size_body3.active {
    font-weight: bold;
}
.del_button p{
    margin: 0;
}
</style>