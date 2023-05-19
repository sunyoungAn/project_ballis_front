<template>
    <div class="common_mt160">
        <div class="row justify-content-center">
            <div class="left_wrap">
                <div id="carouselExampleIndicators2" class="carousel slide" data-bs-ride="false">
                    <div class="carousel-indicators">
                        <button v-for="(tmp, i) in state.row.images" :key="i" type="button" data-bs-target="#carouselExampleIndicators2" 
                            :data-bs-slide-to="i" :class="{ active: i === 0 }">
                        </button>
                    </div>
                    <div class="carousel-inner">
                        <div v-for="(tmp, i) in state.row.images" :key="i" :class="['carousel-item', { active: i === 0 }]">
                            <img :src="tmp.imagePath" class="img-fluid img_background">
                        </div>
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators2" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators2" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>
            </div>

            <div class="right_wrap">
                <div class="col" v-for="(tmp, i) in state.row.product" :key="i">
                    <h4 style="font-weight: bold; text-decoration : underline;">{{ tmp.brandName }}</h4>
                    <h4>{{ tmp.productEngName }}</h4>
                    <p style="color: #aeaeae;">{{ tmp.productKorName }}</p>

                    <div class="product" id="product_size">
                        <span>사이즈</span>
                        <span style="float: right; font-size: 20px; font-weight: bold;">모든 사이즈</span>
                        <hr />
                    </div>
                    
                    <div class="product" id="product_price" v-if="tmp.price">
                        <span>최근거래가</span>
                        <span style="float: right; font-size: 25px; font-weight: bold;">{{ tmp.price }}원</span>
                    </div>

                
                    <div class="product d-flex align-items-center justify-content-around gap-2 mx-auto" id="product_wish_price">
                        <button class="btn btn-lg flex-grow-1 left_wish_price_button" type="button" @click="handleBuying(state.productid)">
                            <div class="d-flex justify-content-between align-items-center">
                                <div>구매</div>
                                <div v-if="tmp.sellWishPrice" class="text-end">
                                    <p>{{ tmp.sellWishPrice }}원</p>
                                    <p style="font-size: 15px;">즉시 구매가</p>
                                </div>
                            </div>
                        </button>
                        <button class="btn btn-lg flex-grow-1 right_wish_price_button" type="button" @click="handleSelling(state.productid)">
                            <div class="d-flex justify-content-between align-items-center">
                                <div>판매</div>
                                <div v-if="tmp.buyWishPrice" class="text-end">
                                    <p>{{ tmp.buyWishPrice }}원</p>
                                    <p style="font-size: 15px;">즉시 판매가</p>
                                </div>
                            </div>
                        </button>
                    </div>

                    <div class="product d-grid gap-2 col-13" id="product_wish">
                        <button type="button" class="btn btn-outline-success btn-lg">관심 상품</button>
                    </div>

                    <div class="product" id="product_info">
                        <h4>상품 정보</h4>
                        <hr />
                        <div class="product_info_body">
                            <div class="info_box">
                                <p>모델번호</p>
                                <p>{{ tmp.modelNumber }}</p>
                            </div>
                            <div class="info_box">
                                <p>출시일</p>
                                <p v-if="tmp.launchingDate">{{ tmp.launchingDate }}</p>
                                <p v-else>-</p>
                            </div>
                            <div class="info_box">
                                <p>컬러</p>
                                <p>{{ tmp.color }}</p>
                            </div>
                            <div class="info_box">
                                <p>발매가</p>
                                <p>{{ tmp.launchingPrice }}원</p>
                            </div>
                        </div>
                        <hr />
                    </div>

                    <div class="product" id="product_delivery">
                        <p>배송 정보</p>
                        <div v-if="tmp.inventoryDiv === 1">
                            <p>빠른배송 5,000원</p>
                            <p>지금 결제시 내일 __ 도착 예정</p>
                        </div>
                        <hr />
                        <p>일반배송 3,000원</p>
                        <p>검수 후 배송 ・ 5-7일 내 도착 예정</p>
                        <hr />
                        <p>창고보관 첫 30일 무료</p>
                        <p>배송 없이 창고에 보관 ・ 빠르게 판매 가능</p>
                        <hr />
                    </div>
                    
                    <div class="product" id="product_chart">
                        <h4>시세</h4>
                        <line-chart :product-id="state.productid"/>
                    </div>
                </div>
            </div>
        </div>
        <div class="sec_review">
            <div class="review_title">
                <h4 style="font-weight: bold;">Review</h4>
                <h5 style="color: #aeaeae;">후기</h5>
            </div>
            <div class="review_list">
                <div class="review_main" v-for="(tmp, i) in state.reviewRows" :key="i">
                    <img v-if="tmp.mainImageDiv === 1" 
                        @click="state.showModal = true; 
                        state.reviewid=tmp.reviewId; 
                        state.productid=tmp.productId" 
                        :src="tmp.imagePath" class="review_main_img"
                    >
                </div>
            </div>      
            <!-- 모달 영역 -->  
            <review-modal v-if="state.showModal" 
                :review-id="state.reviewid" 
                :product-id="state.productid"
                :product-one="true" 
                @close="state.showModal = false" 
            />
        </div>
    </div>
</template>

<script>
import LineChart from '@/components/LineChart.vue'
import ReviewModal from '@/components/ReviewModal.vue'
import axios from 'axios';
import { onMounted, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default {
    components: {
        LineChart,
        ReviewModal
    },
    setup () {
        
        const route = useRoute();
        const router = useRouter();

        const state = reactive({
            productid : Number(route.query.productid),
            row : [],
            showModal : false
        })

        const handleBuying = (id) => {
            router.push({path:"/buying/size", query:{productid:id}})
        }

        const handleSelling = (id) => {
            router.push({path:"/selling/size", query:{productid:id}})
        }

        
        const handleDataReview = () => {
            const url = `/api/get/review/product?productid=${state.productid}`;
            const headers = { "Content-Type" : "application/json" };
            axios.get(url, { headers })
                .then(res => {
                    console.log('리뷰', res.data);
                    state.reviewRows = res.data;
                })
                .catch(error => {
                    console.error('API 호출 오류', error);
                });
        }


        const handleData = () => {
            axios.get(`/api/get/product/one/images?productid=${state.productid}`).then((res)=> {
                console.log("상품정보,이미지", res.data);
                state.row = res.data;
                for(let i = 0; i<state.row.images.length; i++){
                    state.row.images[i].imagePath = `/api/product/display?name=${state.row.images[i].imagePath}`;
                }
            }).catch((err)=>{
                console.log(err);
            })
        }

        onMounted(()=>{
            handleDataReview();
            handleData();
        })

        return {
            state,
            handleBuying,
            handleSelling
        }
    }
}
</script>

<style lang="css" scoped>
.top_container{
    border: 1px solid #cccccc;
}
.left_wrap, .right_wrap{
    width: 650px;
    margin: 10px;
}
.col{
    border: 1px solid #cccccc;
}
.product {
    margin: 10px;
}
#product_wish_price{
    width: 96%;
    margin: 10px;
    /* border: 1px solid #cccccc; */
}
.left_wish_price_button, .right_wish_price_button {
  height: 70px;
  margin: 5x;
}
.left_wish_price_button {
    background-color: #bcf780;
}
.left_wish_price_button:hover {
    background-color: #deffbd;
}
.right_wish_price_button {
    background-color: #80ebf7;
}
.right_wish_price_button:hover {
    background-color: #b7f2f9;
}
.left_wish_price_button p, .right_wish_price_button p {
    margin: 0;
}
.product_info_body{
    display: flex;
}
.info_box{
    margin-right: 10px;
    flex: 1;
}

.review_list{
    display: flex;
    flex-wrap : wrap;
}
.review_main_img{
    width: 160px;
    height: 160px;
    margin: 5px;
    border-radius: 10px;
}

.img_background {
    background-color: #E0E0E0;
}


</style>