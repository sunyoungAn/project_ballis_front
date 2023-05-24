<template>
    <div class="review_blackBg d-flex justify-content-center">
        <div class="row review_wrap align-items-center"> 
        <!-- 이전 후기로 이동 -->
            <div class="col-1">
                <img src="@/assets/image/arrow-trans.png" class="outter_left" @click="handleLeft()"  />
            </div>

            <!-- 후기 정보 -->
            <div class="col-10 review_whiteBg mx-auto">
                
                <!-- 닫기 버튼 -->
                <div class="modal-header mt-0">
                    <h3 class="modal-title"></h3>
                    <button type="button" class="btn-close" id="close_btn" aria-label="Close" @click="$emit('close'), state.productOne = false"></button>
                </div>

                <!-- 후기 이미지와 후기 내용 정보 -->
                <div class="row h-100">
                    <!-- 후기이미지 부분 -->
                    <div class="col-6 mx-auto d-flex align-items-center overflow-hidden">                 
                        <div id="carouselExampleIndicators1" class="carousel slide" data-bs-ride="true">
                            <div class="carousel-indicators">
                                <button v-for="(tmp, i) in state.reviewRows" :key="i" data-bs-target="#carouselExampleIndicators1" 
                                    :data-bs-slide-to="i" :class="{ active: i === 0 }">
                                </button>
                            </div>
                            <div class="carousel-inner">
                                <div v-for="(tmp, i) in state.reviewRows" :key="i" :class="['carousel-item', { active: i === 0 }]">
                                    <img :src="tmp.imagePath" :data-bs-slide-to="i" class="d-block w-100">
                                </div>
                            </div>
                            <button class="carousel-control-prev" data-bs-target="#carouselExampleIndicators1" data-bs-slide="prev">
                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Previous</span>
                            </button>
                            <button class="carousel-control-next" data-bs-target="#carouselExampleIndicators1" data-bs-slide="next">
                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Next</span>
                            </button>
                        </div>
                    </div>

                    <!-- 후기 내용, 상품 정보 부분-->
                    <div class="col-5 mx-auto mt-5 review_content">
                        <!-- 후기 내용 -->
                        <div class="mb-3 scroll" v-if="state.reviewRows.length">
                            {{ state.reviewRows[0].content }}
                        </div>

                        <!-- 상품 정보 -->
                        <div class="item_info" v-if="state.productRows.length" @click="handleProductOne(state.productRows[0].id)">
                            <img :src="state.productRows[0].imagePath" class="img-thumbnail" style="width: 100px; height:100px;">
                            <p class="m-0">&nbsp;</p>
                            <p class="m-0">{{ state.productRows[0].productEngName }}</p>
                            <p class="m-0 fw-bold">{{ changePriceFormat(state.productRows[0].sellWishPrice) }}원</p>
                        </div>
                    </div>
                </div>
            </div> 
            <!-- 다음 후기로 이동 -->
            <div class="col-1">
                <img src="@/assets/image/arrow-trans.png" class="outter_right" @click="handleRight()" />
            </div>

        </div>
            

    </div>
</template>

<script>
import { onMounted, reactive, watchEffect } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

export default {
    props: {
        reviewId: {
            type: Number,
            required: true,
        },
        productId: {
            type: Number,
            required: true,
        },
        productOne: {
            type: Boolean,
            default: false
        }
    },
    setup(props) {
        const router = useRouter(); 

        const state = reactive({
            reviewId: 0,
            productId: 0,
            productOne: false,
            reviewRows: [],
            productRows: [],
        });

        watchEffect(()=> {
            state.reviewId = props.reviewId
            state.productId = props.productId
            state.productOne = props.productOne
        })

        const handleRight = async() => {
            try {    
                let res;
                if(state.productOne) {
                    res = await axios.get(`/api/get/review/right?reviewId=${state.reviewId}&productId=${state.productId}`);    
                } else {
                    res = await axios.get(`/api/get/review/right?reviewId=${state.reviewId}`);
                }
                state.reviewId = res.data.review.reviewId;
                state.productId = res.data.review.productId;
                
                receiveReview();
                handleData();
            } catch (err) {
                if (err.response && err.response.status === 404) {
                    alert("마지막 리뷰입니다.");
                } else {
                    console.error(err);
                }
            }
        }

        const handleLeft = async() => {
            try {    
                let res;
                if(state.productOne) {
                    res = await axios.get(`/api/get/review/left?reviewId=${state.reviewId}&productId=${state.productId}`);
                } else {
                    res = await axios.get(`/api/get/review/left?reviewId=${state.reviewId}`);
                }
                state.reviewId = res.data.review.reviewId;
                state.productId = res.data.review.productId;
                
                state.index = 0;
                receiveReview();
                handleData();
            } catch (err) {
                if (err.response && err.response.status === 404) {
                    alert("첫번째 리뷰입니다.");
                } else {
                    console.error(err);
                }
            }
        }

        const handleProductOne = (id) => {
            router.push({
                path: '/product/one',
                query: { productid: id }
            });
        }

        const receiveReview = async () => {
            try {
                const res = await axios.get(`/api/get/review/one?reviewid=${state.reviewId}`);
                state.reviewRows = res.data;
                console.log('1개리뷰', res.data);

                // 리뷰 이미지 불러오기
                for(let i = 0; i<state.reviewRows.length; i++){
                    state.reviewRows[i].imagePath = `/api/review/display?name=${state.reviewRows[i].imagePath}`;
                }

            } catch (err) {
                console.error(err);
            }
        };

        const handleData = async () => {
            try {
                const res = await axios.get(`/api/get/product/one?productid=${state.productId}`);
                console.log('리뷰내 한개상품', res.data);
                state.productRows = res.data;
                state.productRows[0].imagePath = `/api/product/display?name=${state.productRows[0].imagePath}`;
            } catch (err) {
                console.error(err);
            }
        };

        // 금액형식변환 세자리마다 콤마추가
        const changePriceFormat = (data) => {
            if(!data) {
                return data
            }
            return data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }

        onMounted(() => {
            receiveReview();
            handleData();
        });

        return {
            state,
            handleRight,
            handleLeft,
            handleProductOne,
            changePriceFormat
        };
    },
};

</script>

<style lang="css" scoped>
@import "../assets/css/common.css";
#close_btn {
    margin-bottom: 10px;
}
.modal_body {
    display: flex;
    flex: 1;
}
.left_wrap {
    flex-basis: 65%;
    /* border: 1px solid #cccccc; */
}
.right_wrap {
    position: relative;
    flex-basis: 35%;
    flex-direction: column;
    overflow: hidden;
    padding: 20px;
    /* border: 1px solid #cccccc; */
}
.visually-hidden {
    z-index:1;
}
.review_content {
    position: relative;    
}
.item_info {
    position: absolute;
    bottom: 100px;
    left: 20px;
}
.outter_btn{
    position: relative;
}
.outter_btn:hover{
    cursor: pointer;
}
.outter_right{
    width: 50px;
}
.outter_left{
    transform: scaleX(-1);
    width: 50px;
}
.carousel-item img {
  display: block;
  margin: auto;
}
.scroll{
    max-height: 300px; 
    overflow-y: auto;
}
</style>