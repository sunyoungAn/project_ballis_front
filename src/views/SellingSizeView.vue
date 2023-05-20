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
                        <div v-for="(tmp, i) in state.rowSell" :key="i">
                            <div v-if="tmp.buyProductSize === size">
                                <div class="button_size_body3" :class="{ 'active': activeIndex === index }">{{ tmp.buyWishPrice }}</div>
                            </div>
                        </div> 
                    </button>
                </div>

                <div class="shipping_method" v-show="state.showMethod">
                    <hr />

                    <div class="shipping_method_body" v-show="state.methodSelect === 1">
                        <div>
                            <button @click="handleType(state.size, 'keep')">
                                <p>보관 신청</p>
                            </button>
                        </div>  
                        <div v-for="(tmp, i) in state.rowSell" :key="i">
                            <button v-if="tmp.buyProductSize === state.size" @click="handleType(state.size, 'normal', tmp)">
                                <p>{{ tmp.buyWishPrice }}</p>
                                <p>즉시 판매</p>
                            </button>
                        </div>
                    </div>

                    <div class="shipping_method_body" v-show="state.methodSelect === 2">
                        <button @click="handleType(state.size, 'keep')">
                            <p>보관 신청</p>
                        </button>
                        <button @click="handleType(state.size, 'bid')">
                            <p>판매 입찰</p>
                        </button>
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
            rowFast : [],
            rowSell : [],
            sizes : [],
            showMethod : false,
            methodSelect : 0,
            size : 0,
        })

        const activeIndex = ref(null);

        const handleType = (size, type, tmp) => {
            if(type === 'normal') {
                store.commit('setSelectedItem', tmp)
            }
            router.push({
                path : '/selling/method',
                query : {
                    productid: state.productid,
                    size : size,
                    type : type
                }
            })
        }

        // 상품 정보 데이터 -> 구매입찰 데이터 없을때도 출력할수있도록
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

        // 빠른배송 여부 확인
        const handleFast = async() => {
            try {
                const res = await axios.get(`/api/get/product/buy?productid=${state.productid}`);
                state.rowFast = res.data.fast; 
            } catch (err) {
                console.error(err);
            }
        }

        // 구매입찰 데이터 존재
        const handleData = async() => {
            try {
                const res = await axios.get(`/api/get/product/sell?productid=${state.productid}`);
                console.log('구매입찰 데이터', res.data);
                state.rowSell = res.data;

            } catch (err) {
                console.error(err);
            }
        }
        
        const handleMethod = (size, index) => {
            // css 전환
            activeIndex.value = index;

            let hasMatchingSize = false;
            if(state.rowSell) { // 구매입찰 존재
                for(let i = 0; i < state.rowSell.length; i++) {
                    if(state.rowSell[i].buyProductSize === size) {
                        state.size = size;
                        state.methodSelect = 1;
                        hasMatchingSize = true;
                        break;
                    } 
                }
            } 
            
            if(!hasMatchingSize) {
                state.size = size;
                state.methodSelect = 2;
            }
            
            state.showMethod = true;
        }

        onMounted (()=> {
            handleInfo();
            handleFast();
            handleData();
        })

        return {
            state,
            activeIndex,
            handleMethod,
            handleType
        }
    }
}
</script>

<style lang="css" scoped>
@import "../assets/css/common.css";
#wrap {
    border: 1px solid #cccccc;
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
.button_size_body1.active, .button_size_body3.active {
    font-weight: bold;
}
</style>