<template>
    <div class="common_mt160">
        <ul class="navbar-nav justify-content-end flex-grow-1 pe-3 " id="side_bar">
            <li v-if="state.searchWord !== '' && state.searchWord !== undefined" class="nav-item">
                <a class="nav-link active fs-5">검색어</a>
            </li>
            <li v-if="state.searchWord !== '' && state.searchWord !== undefined">
                <button class="fast_big" @click="removeSearchWord()">{{ state.searchWord }}&nbsp;&nbsp;×</button>
            </li>
            <hr v-if="state.searchWord !== '' && state.searchWord !== undefined" />

            <li class="nav-item">
                <a class="nav-link active fs-5">필터</a>
            </li>
            <li>
                <button class="fast_big" @click="handleInventoryDivList">
                <img src="@/assets/image/lightning.png" class="lightning"/>
                빠른배송</button>
            </li>

            <li class="nav-item">
                <a class="nav-link fs-5" 
                    data-bs-toggle="collapse" 
                    href="#collapse1" 
                    aria-expanded="false"
                    aria-controls="collapse1"
                > 카테고리
                </a>
            </li>
            <div class="collapse" id="collapse1">
                <div class="card card-body">
                    <label>
                        <input type="checkbox" name="category" value="1" v-model="state.categoryList"> 스니커즈
                    </label>
                    <label>
                        <input type="checkbox" name="category" value="2" v-model="state.categoryList"> 플랫
                    </label>
                    <label>
                        <input type="checkbox" name="category" value="3" v-model="state.categoryList"> 로퍼
                    </label>
                    <label>
                        <input type="checkbox" name="category" value="4" v-model="state.categoryList"> 더비/레이스업
                    </label>
                    <label>
                        <input type="checkbox" name="category" value="5" v-model="state.categoryList"> 샌들/슬리퍼
                    </label>
                    <label>
                        <input type="checkbox" name="category" value="6" v-model="state.categoryList"> 힐/펌프스/부츠/기타
                    </label>
                </div>
            </div>
            <hr />

            <li class="nav-item">
                <a class="nav-link fs-5" 
                    data-bs-toggle="collapse" 
                    href="#collapse2" 
                    aria-expanded="false"
                    aria-controls="collapse2"
                > 성별
                </a>
            </li>
            <div class="collapse" id="collapse2">
                <div class="card card-body">
                    <label>
                        <input type="checkbox" name="gender" value="1" v-model="state.genderList" @change="handleGenderList"> 여성
                    </label>
                    <label>
                        <input type="checkbox" name="gender" value="2" v-model="state.genderList" @change="handleGenderList"> 남성
                    </label>
                </div>
            </div>
            <hr />

            <li class="nav-item">
                <a class="nav-link fs-5" 
                    data-bs-toggle="collapse" 
                    href="#collapse3" 
                    aria-expanded="false"
                    aria-controls="collapse3"
                > 브랜드
                </a>
            </li>
            <div class="collapse" id="collapse3">
                <div class="card card-body scroll">
                    <label v-for="(tmp, i) in state.brandRows" :key="i">
                        <input  type="checkbox" name="brand" 
                            :value="tmp.brandId" 
                            :checked="tmp.brandId === state.mainSelectBrand"
                            @click="handleBrandIdList(tmp.brandId)"
                        > {{ tmp.brandName }} 
                    </label>
                </div>
            </div>
            <hr />
            <li class="nav-item">
                <a class="nav-link fs-5" 
                    data-bs-toggle="collapse" 
                    href="#collapse4" 
                    aria-expanded="false"
                    aria-controls="collapse4"
                > 사이즈
                </a>
            </li>
            <div class="collapse" id="collapse4">
                <div class="card card-body" id="collapse_size">
                    <button 
                    :class="{ 'button_size': true, 'button_active': state.sizeList.includes(size) }"
                    v-for="size in state.sizes" 
                    :key="size" 
                    @click="handleSizeList(size)">
                    {{ size }}
                </button>
                </div>
            </div>
            <hr />
            
            <li class="nav-item">
                <a class="nav-link fs-5" 
                    data-bs-toggle="collapse" 
                    href="#collapse5" 
                    aria-expanded="false"
                    aria-controls="collapse5"
                > 가격
                </a>
            </li>
            <div class="collapse" id="collapse5">
                <div class="card card-body">
                    <label v-for="price in prices" :key="price.id">
                        <input type="checkbox" :id="price.id" :checked="state.checkedPriceId === price.id" @change="handleWishPriceList(price)"> {{ price.label }}
                    </label>
                </div>
            </div>
            <hr />
        </ul>

        <div class="dropdown" id="sorting">
            <div class="btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">{{ sortText }}</div>
            <ul class="dropdown-menu">
                <li><a class="dropdown-item" @click="selectSort(1)">인기순</a></li>
                <li><a class="dropdown-item" @click="selectSort(2)">관심순</a></li>
                <li><a class="dropdown-item" @click="selectSort(3)">발매일순</a></li>
                <li><a class="dropdown-item" @click="selectSort(4)">리뷰순</a></li>
            </ul>
        </div>

        <div class="all_item_list">
            <div class="all_item" v-for="(tmp, i) in state.rows" :key="i" @click="handleProductOne(tmp.id)">
                <img :src="tmp.imagePath" class="all_item_img img_background">
                <p style="font-weight: bold;">{{ tmp.brandName }}</p>
                <p>{{ tmp.productEngName }}</p>
                <p style="color: #aeaeae;">{{ tmp.productKorName }}</p>
                <p v-if="tmp.inventoryDiv === 1">
                    <button class="fast_small"><img src="@/assets/image/lightning.png" class="lightning"/>빠른배송</button>
                </p>
                <p>&nbsp;</p>
                <div v-if="tmp.wishPrice">
                    <p style="font-weight: bold; font-size: large;">{{ changePriceFormat(tmp.wishPrice) }}원</p>
                    <p style="color: #aeaeae;">즉시 구매가</p>
                </div>
                <p v-else>-</p>
                <p><span>wish {{ tmp.wishCnt }} &nbsp;</span>
                <span>Review {{ tmp.reviewCnt }}</span></p>       
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { computed, onMounted, reactive, watch } from 'vue';
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router';

export default {

    setup () {
        const router = useRouter();
        const route = useRoute();

        const state = reactive({
            sizes : [],
            rows : [],
            brandRows : [],
            sort : 1,
            categoryList : [],
            genderList : [],
            brandIdList : [],
            inventoryDivList : [],
            sizeList : [],
            wishPriceList : [],
            checkedPriceId : '',
            fromMainBrandId : Number(route.query.brandId),
            mainSelectBrand : 0,
            searchWord : route.query.search,
        })

        // 가격대 나열
        const prices = [
            { id: 'price1', range: [0, 100000], label: '10만원 이하' },
            { id: 'price2', range: [100001, 300000], label: '10-30만원' },
            { id: 'price3', range: [300001, 500000], label: '30-50만원' },
            { id: 'price4', range: [500001, 1000000], label: '50-100만원' },
            { id: 'price5', range: [1000001, 3000000], label: '100-300만원' },
            { id: 'price6', range: [3000001, 2147483647], label: '300만원 이상' },
        ];

        // 정렬 기준 나열
        const sortText = computed(() => {
            switch (state.sort) {
                case 1:
                    return '인기순';
                case 2:
                    return '관심순';
                case 3:
                    return '발매일순';
                case 4:
                    return '리뷰순';
                default:
                    return '인기순';
            }
        });

        // 정렬
        const selectSort = (sortValue) => {
            state.sort = sortValue;
            handleData();
        };

        // 빠른배송 여부
        const handleInventoryDivList = () => {
            if (!state.inventoryDivList.length) {
                state.inventoryDivList.push(1);
            } else {
                state.inventoryDivList = [];
            }
            handleData();
        }

        // 성별 
        const handleGenderList = () => {
            if (state.genderList.includes("1") && !state.genderList.includes("3")) {
                state.genderList.push("3");
            } else if (state.genderList.includes("2") && !state.genderList.includes("3")) {
                state.genderList.push("3");
            } else {
                state.genderList = [];
            }
            handleData();
        }

        // 브랜드 
        const handleBrandIdList = (brandId) => {
            const index = state.brandIdList.indexOf(brandId);
            const newArray = [...state.brandIdList]; 
            if (index >= 0) {
                newArray.splice(index, 1); 
            } else {
                newArray.push(brandId); 
            }
            state.brandIdList = newArray; 
        }

        // 사이즈
        const handleSizeList = (size) => {
            const index = state.sizeList.indexOf(size);
            const newArray = [...state.sizeList]; 
            if (index >= 0) {
                newArray.splice(index, 1); 
            } else {
                newArray.push(size); 
            }
            state.sizeList = newArray; 
        };
        

        // 가격대
        const handleWishPriceList = (price) => {

            state.wishPriceList = []; // 가격리스트 초기화

            // 체크제어
            if(state.checkedPriceId === price.id) {
                // 클릭한 금액과 이전에 클릭한 금액이 같은 경우
                state.checkedPriceId = ''; // 체크 해제를 위해 초기화
            
            } else {
                // 클릭한 금액과 이전에 클릭한 금액이 다른 경우
                state.checkedPriceId = price.id; // 체크를 위해 아이디를 저장

                // 가격 리스트 설정
                const newPriceList = [...state.wishPriceList];
                const foundPrices = newPriceList.filter((p) => p === price.range[0] || p === price.range[1]);

                if (foundPrices.length > 0) {
                    foundPrices.forEach((p) => {
                        const index = newPriceList.indexOf(p);
                        newPriceList.splice(index, 1);
                    });
                } else {
                    newPriceList.push(price.range[0], price.range[1]);
                }

                state.wishPriceList = newPriceList;
            }
        };

        // 사이즈 생성
        const generateSizes = () => {
            for(let i = 215; i <= 330; i += 5) {
                state.sizes.push(i);
            }
        }
        
        //브랜드 목록 생성
        const handleDataBrand = async () => {
            const res = await axios.get(`/api/get/brand/list`);
            // console.log("브랜드리스트", res.data);
            state.brandRows = res.data;
                        
        }

        const handleData = async () => {

            let url = '';

            if(state.searchWord !== undefined && state.searchWord !== '') { 
                // 검색되어 상품리스트페이지로 이동한 경우
                url = `/api/get/product/all?sort=${state.sort}&&searchword=${state.searchWord}`;
            } else {
                // 그 외의 경우
                url = `/api/get/product/all?sort=${state.sort}`;
            }

            // 메인에서 이미지 클릭해서 이동한 경우 처리
            if(state.fromMainBrandId !== null && state.fromMainBrandId >= 0) {
                 state.mainSelectBrand = state.fromMainBrandId;
                handleBrandIdList(state.fromMainBrandId); // 두번 불려지는 문제가 있긴 함
                state.fromMainBrandId = null; // 초기화
                router.replace({'query': null}); //url의 쿼리 제거
            }

            try {
                // const url = `/api/get/product/all?sort=${state.sort}`;
                const headers = {"Content-Type":"application/json"};
                const body = {
                    categoryList : state.categoryList,
                    genderList : state.genderList,
                    brandIdList : state.brandIdList,
                    inventoryDivList : state.inventoryDivList,
                    sizeList : state.sizeList,
                    wishPriceList : state.wishPriceList       
                }
                const res = await axios.post(url, body, {headers});
                    
                console.log('상품전체리스트', res.data.productAllList);
                state.rows = res.data.productAllList;

                // 이미지 url설정
                for(let i = 0; i<state.rows.length; i++){
                    state.rows[i].imagePath = `/api/product/display?name=${state.rows[i].imagePath}`;
                }
                
            } catch (err) {
                console.error(err);
            }
        }

        const handleProductOne = (id) => {
            router.push({
                path: '/product/one',
                query: { productid: id }
            });
        }

        // 검색단어 삭제
        const removeSearchWord = () => {
            router.replace({'query': null}); //url의 쿼리 제거
            //state.beforSearchWord = '' ;
            state.searchWord = '';
        }

        // 금액형식변환 세자리마다 콤마추가
        const changePriceFormat = (data) => {
            if(!data) {
                return data
            }
            return data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }

        watch([ 
            () => state.categoryList, 
            () => state.brandIdList, 
            () => state.wishPriceList, 
            () => state.sizeList
        ], () => {
            handleData();
        });


        onMounted(()=>{
            handleData();
            handleDataBrand();
            generateSizes();
        })

        // url 변화 감지
        onBeforeRouteUpdate((to, from, next)=> {
            console.log(to);
            console.log(to.query.search);
            state.searchWord = to.query.search;
            next();
            handleData();
        })

        return {
            state,
            prices,
            sortText,
            selectSort,
            handleInventoryDivList,
            handleBrandIdList,
            handleGenderList,
            handleSizeList,
            handleWishPriceList,
            handleProductOne,
            removeSearchWord,
            changePriceFormat
        }
    }
}
</script>

<style lang="css" scoped>
@import "../assets/css/common.css";
#side_bar{
    float: left;
    width: 300px;
    margin: 30px;
    /* border: 1px solid #cccccc; */
}
label{
    margin: 3px;
}
#collapse_size{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}
.button_size{
    /* flex: auto; */
    width: 78px;
    height: 40px;
    border: 1px solid #cccccc;
    background-color: #ffffff;
    margin: 2px;
}
.button_active{
    border: 1.5px solid #000000;
    font-weight: bold;
}
.all_item_list{
    width: 1100px;
    padding: 0 5px; 
    display: flex;
    position: relative;
    flex-wrap : wrap;
}
.all_item{
    width: 250px;
    margin: 10px;
}
.all_item_img{
    width: 250px;
    height: 250px;
    margin: 5px;
    border-radius: 10px;
}
.all_item p{
    margin: 1px 8px;
}
.fast_big{
    width: 120px;
    height: 40px;
    background-color: white;
    border: 1px solid #cccccc;
    border-radius: 20px;

}
.fast_small{
    width: 70px;
    height: 30px;
    font-size: 12px;
    color: rgb(54, 186, 94);
    background-color: rgb(239, 255, 250);
    border: none;
}
#sorting {
    float: right;
    margin-right: 250px;
}

.img_background {
    width: 250px;
    background-color: #E0E0E0;
}
.scroll {
    max-height: 250px; 
    overflow-y: auto;
}
</style>