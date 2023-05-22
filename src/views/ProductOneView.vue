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

                    <div class="product" id="product_name">
                        <h4 class="fw-bold text-decoration-underline">{{ tmp.brandName }}</h4>
                        <h4>{{ tmp.productEngName }}</h4>
                        <p style="color: #aeaeae;">{{ tmp.productKorName }}</p>
                    </div>

                    <div class="product" id="product_size">
                        <span>사이즈</span>
                        <span class="float-end fs-5 fw-bold">모든 사이즈</span>
                        <hr />
                    </div>
                    
                    <div class="product" id="product_price" v-if="tmp.price">
                        <span>최근거래가</span>
                        <span class="float-end fs-4 fw-bold">{{ tmp.price }}원</span>
                    </div>

                    <div class="product d-flex align-items-center justify-content-around gap-2 mx-auto" id="product_wish_price">
                        <button class="btn btn-lg flex-grow-1 green_button green_button_size" type="button" @click="handleBuying(state.productid)">
                            <div class="d-flex justify-content-between align-items-center">
                                <p>구매</p>
                                <div v-if="tmp.sellWishPrice" class="text-end">
                                    <p>{{ tmp.sellWishPrice }}원</p>
                                    <p style="font-size: 15px;">즉시 구매가</p>
                                </div>
                                <div v-else class="text-end">
                                    <p>-원</p>
                                </div>
                            </div>
                        </button>
                        <button class="btn btn-lg flex-grow-1 blue_button blue_button_size" type="button" @click="handleSelling(state.productid)">
                            <div class="d-flex justify-content-between align-items-center">
                                <p>판매</p>
                                <div v-if="tmp.buyWishPrice" class="text-end">
                                    <p>{{ tmp.buyWishPrice }}원</p>
                                    <p style="font-size: 15px;">즉시 판매가</p>
                                </div>
                                <div v-else class="text-end">
                                    <p>-원</p>
                                </div>
                            </div>
                        </button>
                    </div>

                    <div class="product d-grid gap-2 col-13" id="product_wish">
                        <button type="button" class="btn btn-outline-secondary btn-lg">관심 상품</button>
                    </div>

                    <div class="product mt-5" id="product_info">
                        <h4 class="fw-bold">상품 정보</h4>
                        <hr />

                        <div class="product_info_body">
                            <div class="info_box">
                                <p class="info_box_name">모델번호</p>
                                <p>{{ tmp.modelNumber }}</p>
                            </div>
                            <div class="info_box">
                                <p class="info_box_name">출시일</p>
                                <p v-if="tmp.launchingDate">{{ tmp.launchingDate }}</p>
                                <p v-else>-</p>
                            </div>
                            <div class="info_box">
                                <p class="info_box_name">컬러</p>
                                <p>{{ tmp.color }}</p>
                            </div>
                            <div class="info_box_last">
                                <p class="info_box_name">발매가</p>
                                <p>{{ tmp.launchingPrice }}원</p>
                            </div>
                        </div>
                        <hr />
                    </div>

                    <div class="product" id="product_delivery">
                        <p>배송 정보</p>
                        
                        <div v-if="tmp.inventoryDiv === 1">
                            <span class="fw-bold">빠른배송&nbsp;</span> 
                            <span>5,000원</span>
                            <p>지금 결제시 내일(날짜출력) 도착 예정</p>
                            <hr />
                        </div>
                        
                        <span class="fw-bold">일반배송&nbsp;</span> 
                        <span>3,000원</span>
                        <p>검수 후 배송 ・ 5-7일 내 도착 예정</p>
                        <hr />

                        <span class="fw-bold">창고보관&nbsp;</span> 
                        <span>기본 30일</span>
                        <p>배송 없이 창고에 보관 ・ 빠르게 판매 가능</p>
                    </div>
                    
                    <div class="product mt-5" id="product_chart">
                        <h4 class="fw-bold">시세</h4>
                        <line-chart :product-id="state.productid"/>
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
@import "../assets/css/common.css";
.left_wrap, .right_wrap{
    width: 550px;
    margin: 10px;
}
.sec_review{
    width: 1100px;
    margin: 10px;
}
.product {
    margin: 10px;
}
#product_wish_price{
    width: 96%;
    margin-top: 30px;
}
/* 구매 관련 버튼 */
.green_button {
  background-color: rgb(103, 194, 58);
}
.green_button:hover {
  background-color: rgb(149, 212, 117);
}
/* 판매 관련 버튼 */
.blue_button {
  background-color: rgb(64, 158, 255);
}
.blue_button:hover {
  background-color: rgb(121, 187, 255);
}
.green_button_size, .blue_button_size {
    width: 250px;
    height: 70px;
    margin: 5x;
}
.green_button p, .blue_button p {
    margin: 0;
    color: #ffffff;
}
.product_info_body{
    display: flex;
}
.info_box{
    margin-right: 10px;
    flex: 1;
    border-right: 1px solid #cecece;
    padding: 10px 20px 10px 10px;
}
.info_box_last{
    margin-right: 10px;
    flex: 1;
    padding: 10px 20px 10px 10px;
}
.info_box_name{
    color: #8d8d8d;
    margin: 0;
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