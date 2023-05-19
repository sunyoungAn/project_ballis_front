<template>
    <div class="common_mt160">
        <div class="container" id="wrap" v-if="state.row[0]">
            <div class="head d-flex align-items-center">
                <img :src="state.row[0].imagePath" class="head_img">
                <div class="d-flex flex-column ml-3">
                    <p style="font-weight: bold;">{{ state.row[0].modelNumber }}</p>
                    <p>{{ state.row[0].productEngName }}</p>
                    <p style="color: #aeaeae;">{{ state.row[0].productKorName }}</p>
                    <!-- 빠른배송 여부 -->
                </div>
            </div>
            <hr />
            <div class="body">
                <div class="d-flex justify-content-center flex-row flex-wrap">
                    <button class="button_size" v-for="(size, index) in state.sizes" :key="size" @click="handleMethod(size, index)">
                        <div class="button_size_body1" :class="{ 'active': activeIndex === index }">{{ size }}</div>
                        <div v-for="(tmp, i) in state.row" :key="i">
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
                        <div v-for="(tmp, i) in state.row" :key="i">
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
            row : [],
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

        const handleData = async() => {
            try {
                const res = await axios.get(`/api/get/product/sell?productid=${state.productid}`);
                console.log('상품한개', res.data);
                state.row = res.data;

                // 전체 사이즈 나열
                for(let i = state.row[0].sizeMin; i <= state.row[0].sizeMax; i += state.row[0].sizeUnit) {
                    state.sizes.push(i);
                }

            } catch (err) {
                console.error(err);
            }
        }
        
        const handleMethod = (size, index) => {
            // css 전환
            activeIndex.value = index;

            for(let i = 0; i < state.row.length; i++) {
                if(state.row[i].buyProductSize === size) {
                    state.size = size;
                    state.methodSelect = 1;
                    break;
                } else {
                    state.size = size;
                    state.methodSelect = 2;
                }
            }
            state.showMethod = true;
        }

        onMounted (()=> {
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