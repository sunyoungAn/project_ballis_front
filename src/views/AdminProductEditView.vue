<template>
    <div class="container common_mt160 admin_wrap">
        <admin-sub-menu></admin-sub-menu>
        <div class="admin_content">
            <h1 class="mb-4">| 상품수정</h1>

            <!-- 입력 영역 -->
            <div class="admin_input_wrap my-5">
                <div class="mb-4">
                    <label class="form-label fs-5">| 상품명(영문)</label>
                    <div class="px-2">
                        <input type="text" class="form-control" ref="uproductEngName" placeholder="상품명(영문)" v-model="state.data.productEngName" maxlength="100">
                    </div>
                </div>
                <div class="mb-4">
                    <label class="form-label fs-5">| 상품명(한글)</label>
                    <div class="px-2">
                        <input type="text" class="form-control" ref="uproductKorName" placeholder="상품명(한글)" v-model="state.data.productKorName" maxlength="100">
                    </div>
                </div>
                <div class="mb-4">
                    <label class="form-label fs-5">| 브랜드</label>
                    <div class="px-2 col-5">
                        <select class="form-select" v-model="state.selectBrand" ref="uselectBrand">
                            <option :value=0>브랜드선택</option>
                            <option v-for="brand in state.brandList" :key="brand" :value="brand.brandId" >{{ brand.brandName }}</option>
                        </select>
                    </div>
                </div>
                <div class="mb-4">
                    <label class="form-label fs-5">| 카테고리</label>
                    <div class="px-2 col-5">
                        <select class="form-select" v-model="state.selectCategory" ref="uselectCategory">
                            <option v-for="category in state.categoryList" :key="category" :value="category.id">{{ category.value }}</option>
                        </select>
                    </div>
                </div>
                <div class="mb-4">
                    <label class="form-label fs-5">| 모델번호</label>
                    <div class="px-2 col-5">
                        <input type="text" class="form-control" placeholder="모델번호" v-model="state.data.modelNumber" maxlength="50">
                    </div>
                </div>
                <div class="mb-4">
                    <label class="form-label fs-5">| 출시일</label>
                    <div class="px-2 col-5">
                        <input type="date" class="form-control" v-model="state.data.launchingDate">
                    </div>
                </div>
                <div class="mb-4">
                    <label class="form-label fs-5">| 컬러</label>
                    <div class="px-2 col-5">
                        <input type="text" class="form-control" placeholder="컬러" v-model="state.data.color" maxlength="100">
                    </div>
                </div>
                <div class="mb-4">
                    <label class="form-label fs-5">| 발매가</label>
                    <div class="px-2 col-5">
                        <input type="number" class="form-control" v-model="state.data.launchingPrice">
                    </div>
                </div>
                <div class="mb-4">
                    <label class="form-label fs-5">| 사이즈</label>
                    <div class="row px-2">
                        <div class="col-4">
                            <label class="form-label fs-6">| 최소값</label>
                            <input type="number" class="form-control" v-model="state.data.sizeMin">
                        </div>
                        <div class="col-4">
                            <label class="form-label fs-6">| 최대값</label>
                            <input type="number" class="form-control" v-model="state.data.sizeMax">
                        </div>
                        <div class="col-4">
                            <label class="form-label fs-6">| 단위</label>
                            <input type="number" class="form-control" v-model="state.data.sizeUnit">
                        </div>
                    </div>
                </div>
                <div class="mb-4">
                    <label class="form-label fs-5">| 성별</label>
                    <div class="px-2">
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" v-model="state.data.gender" value=3>
                            <label class="form-check-label">공용</label>
                        </div>
                        <div class="form-check form-check-inline me-5">
                            <input class="form-check-input" type="radio" v-model="state.data.gender" value=2>
                            <label class="form-check-label">남</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" v-model="state.data.gender" value=1>
                            <label class="form-check-label">여</label>
                        </div>
                    </div>
                </div>
                <div class="mb-4">
                    <label class="form-label fs-5">| 리셀등록가능여부</label>
                    <div class="px-2">
                        <div class="form-check form-check-inline me-5">
                            <input class="form-check-input" type="radio" v-model="state.data.resellTarget" value=1>
                            <label class="form-check-label">리셀등록가능</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" v-model="state.data.resellTarget" value=2>
                            <label class="form-check-label">브랜드배송전용</label>
                        </div>
                    </div>
                </div>
                <div class="mb-4">
                    <label class="form-label fs-5">| 설명</label>
                    <div class="px-2">
                        <input type="text" class="form-control" placeholder="설명" v-model="state.data.explanation" maxlength="255">
                    </div>
                </div>
                <div class="mb-4">
                    <label class="form-label fs-5">| 이미지</label>
                    <div>
                        <label class="form-label">대표이미지</label>
                        <div class="my-2 px-2">
                            <img :src="state.mainImageUrl" class="rounded me-3" style="width: 200px; height: 200px;">
                        </div>
                        <div v-if="state.selectMainFlag === false" style="width: 200px;">
                            <div class="d-flex justify-content-center">
                                <button class="btn btn-outline-success btn-lg" @click="deleteMainImage(state.mainImageId)">삭제</button>
                            </div>
                        </div>
                        <div v-if="state.selectMainFlag === true" class="my-3 col-6">
                            <input class="form-control" type="file" @change="handleMainImage($event)" >
                        </div>
                    </div>

                    <div class="mt-5">
                        <label class="form-label">서브이미지</label>
                        <div v-if="state.tmpSubImageUrls.length === 0" class="my-2 px-2">
                            <img :src="state.subImageUrl" class="rounded me-3" style="width: 200px; height: 200px;">
                        </div>
                        <div v-else class="my-2 px-2">
                            <img v-for="image of state.tmpSubImageUrls" :key="image" :src="image" class="rounded me-3" style="width: 200px; height: 200px;">
                        </div>
                        <div v-if="state.subImageUrls.length !== 0" class="d-flex justify-content-start">
                            <div class="me-3" v-for="(id, idx) of state.subImageIds" :key="idx" style="width: 200px;">
                                <div class="d-flex justify-content-center">
                                    <button class="btn btn-outline-success btn-lg" @click="deleteSubImage(id, idx)">삭제</button>
                                </div>
                            </div>
                        </div>
                        <div v-if="state.selectSubFlag === true" class="mb-3 col-6">
                            <label class="form-label">*최대 2개까지 등록가능합니다.</label>
                            <input class="form-control" type="file" multiple @change="handleSubImage($event)">
                        </div>
                    </div>
                </div>
            </div>

            <!-- 버튼 영역 -->
            <div class="d-flex justify-content-center mt-3">
                <button class="btn btn-success btn-lg d-flex justify-content-end me-2" @click="editProduct()">상품수정</button>
                <button class="btn btn-success btn-lg d-flex justify-content-start ms-2" @click="moveProductList()">목록으로</button>
            </div>
        </div>

    </div>
</template>

<script>
import AdminSubMenu from '@/components/AdminSubMenu.vue'
import { useRoute, useRouter } from 'vue-router';
import { onMounted, reactive, ref } from 'vue';
import axios from 'axios';

export default {
    name: 'SubMenu',
    components: {
        AdminSubMenu
    },

    setup () {
        // 페이지 이동 라우트
        const route = useRoute();
        const router = useRouter();
        
        const state = reactive({
            url : '/api/display',
            id : Number(route.query.id),
            data : '',
            mainImagedata : null,
            mainImageUrl : require('../assets/image/upload.png'),
            subImagedata : null,
            subImageUrl : require('../assets/image/upload.png'),
            subImageUrls : [],
            categoryList : [
                { id : 0 , value : '카테고리선택' },
                { id : 1 , value : '스니커즈' },
                { id : 2 , value : '플랫' },
                { id : 3 , value : '로퍼' },
                { id : 4 , value : '더비/레이스업' },
                { id : 5 , value : '샌들/슬리퍼' },
                { id : 6 , value : '힐/펌프스/부츠/기타' }
            ],
            selectCategory : 0,
            brandList : [],
            selectMainFlag : true,
            mainImageId : null,
            selectSubFlag : true,
            subImageIds : [],
            tmpSubImageUrls : []
        })

        const uproductEngName = ref();
        const uproductKorName = ref();
        const uselectBrand = ref();
        const uselectCategory = ref();

        // 물품상세내용
        const loadData = () => {
            axios.get(`/api/admin/product/getone/${state.id}`).then((res)=>{
                console.log(res.data);
                state.data = res.data;
                state.selectCategory = state.data.category;
                state.selectBrand = state.data.brandId;

                let count = 0;

                if(state.data.imageDtoList.length !== 0) {
                    for(let i=0; i<state.data.imageDtoList.length; i++) {
                        if(state.data.imageDtoList[i].mainImageDiv === 1) {
                            state.mainImageUrl = `/api/admin/product/display?name=${state.data.imageDtoList[i].imagePath}`;
                            state.mainImageId = state.data.imageDtoList[i].id;
                        } else {
                            state.subImageUrls.push(`/api/admin/product/display?name=${state.data.imageDtoList[i].imagePath}`);
                            state.subImageIds.push(state.data.imageDtoList[i].id);
                            count = count + 1;
                        }
                    }
                }

                console.log("메인이미지아이디"+state.mainImageId);
                if(state.mainImageId !== null) {
                    state.selectMainFlag = false;
                }

                if(count === 2) {
                    state.selectSubFlag = false;
                }

                if(state.subImageUrls.length>0) {
                    state.tmpSubImageUrls = [...state.subImageUrls]
                }


            }).catch(()=>{
            })
        }

        // 브랜드정보 가져오기
        const loadBrandData = () => {
            axios.get(`/api/admin/product/getbrand`).then((res)=>{
                console.log(res.data);
                state.brandList = res.data;
            }).catch(()=>{
            })
        }

        // 이미지처리
        const handleMainImage = (e) => {
            console.log('handleMainImage', e.target.files);
            if(e.target.files.length > 0) {
                state.mainImagedata = e.target.files[0];
                state.mainImageUrl = URL.createObjectURL(e.target.files[0]);
            } else {
                state.mainImagedata = null;
                state.mainImageUrl = require('../assets/image/upload.png');
            }
        }

        // 서브이미지처리
        const handleSubImage = (e) => {
            console.log('handleSubImage', e.target.files);
            state.tmpSubImageUrls = [];

            // db에 저장된 서브이미지가 존재하는경우
            if(state.subImageUrls.length>0) {
                state.tmpSubImageUrls = [...state.subImageUrls]
            }

            if(e.target.files.length > 0) {
                state.subImagedata = e.target.files;
                for(let i = 0;  i < e.target.files.length; i++) {
                    state.tmpSubImageUrls.push(URL.createObjectURL(e.target.files[i]));
                }
            } else {
                state.subImagedata = null;
            }
        }

        // 메인이미지삭제
        const deleteMainImage = (id) => {
            
            if(confirm("이미지를 삭제하시겠습니까?")) {
                // 이미지 삭제 처리
                axios.delete(`/api/admin/product/deleteimage/${id}`).then((res)=>{
                    console.log(res.data);
                    window.alert("삭제처리가 정상적으로 처리되었습니다.");
                    //상태변수 초기화
                    state.mainImagedata = null;
                    state.mainImageUrl = require('../assets/image/upload.png');
                    state.selectMainFlag = true;
                    state.mainImageId = null;
                    state.subImageUrls = [];
                    state.subImageIds = [];
                    loadData();
                }).catch(()=>{
                    window.alert("삭제처리 중 오류가 발생하였습니다.");
                })
            }
        } 

        // 서브이미지삭제
        const deleteSubImage = (id, idx) => {

            console.log(id);
            console.log(idx);
            
            if(confirm("이미지를 삭제하시겠습니까?")) {
                // 이미지 삭제 처리
                axios.delete(`/api/admin/product/deleteimage/${id}`).then((res)=>{
                    console.log(res.data);
                    window.alert("삭제처리가 정상적으로 처리되었습니다.");
                    //상태변수 초기화
                    state.selectSubFlag = true;
                    state.tmpSubImageUrls = [];
                    state.subImageUrls = [];
                    state.subImageIds = [];
                    loadData();
                }).catch(()=>{
                    window.alert("삭제처리 중 오류가 발생하였습니다.");
                })
            }
        } 

        // 상품수정
        const editProduct = () => {

            // 유효성체크
            // 상품명(영문) 필수입력체크
            if(state.data.productEngName === '') {
                alert('상품명(영문)을 입력해주세요.');
                uproductEngName.value.focus();
                window.scrollTo({top:'0', behavior:'smooth'});
                return false;
            }

            // 상품명(한글) 필수입력체크
            if(state.data.productKorName === '') {
                alert('상품명(한글)을 입력해주세요.');
                uproductKorName.value.focus();
                window.scrollTo({top:'0', behavior:'smooth'});
                return false;
            }

            // 브랜드 필수선택체크
            if(state.selectBrand === 0) {
                alert('브랜드를 선택해주세요.');
                uselectBrand.value.focus();
                window.scrollTo({top:'0', behavior:'smooth'});
                return false;
            }

            // 카테고리 필수선택체크
            if(state.selectCategory === 0) {
                alert('카테고리를 선택해주세요.');
                uselectCategory.value.focus();
                window.scrollTo({top:'0', behavior:'smooth'});
                return false;
            }

            // 메인이미지 필수체크
            if(state.selectMainFlag === true && state.mainImagedata === null) {
                alert('메인이미지를 선택해주세요.');
                return false;
            }

            console.log(state.subImageIds.length );

            // 서브이미지 갯수체크
            let size = 0;
            if(state.selectSubFlag === true) {
                if(state.subImagedata !== null) {
                    size = state.subImagedata.length;
                }
                let total = size + state.subImageIds.length;
                if(total > 2) {
                    alert('서브이미지는 최대 2개까지 등록가능합니다.');
                    return false;
                }
            }

            const url = `/api/admin/product/edit/${state.id}`;
            const headers = {"Content-Type":"multipart/form-data"};
            let body = new FormData();

            const data = {
                'productEngName' : state.data.productEngName,
                'productKorName': state.data.productKorName,
                'brandId': state.selectBrand,
                'category':state.selectCategory,
                'modelNumber': state.data.modelNumber,
                'launchingDate': state.data.launchingDate,
                'color' : state.data.color,
                'launchingPrice': state.data.launchingPrice,
                'sizeMin': state.data.sizeMin,
                'sizeMax' : state.data.sizeMax,
                'sizeUnit': state.data.sizeUnit,
                'gender' : state.data.gender,
                'resellTarget': state.data.resellTarget,
                'explanation': state.data.explanation,
            }

            body.append('data', new Blob([JSON.stringify(data)], { type: "application/json"}));
            
            if(state.mainImagedata !== null) {
                body.append('mainImage', state.mainImagedata );
            }
            
            if(state.subImagedata !== null) {
                for(let i=0; i <state.subImagedata.length; i++) {
                    body.append('subImage', state.subImagedata[i] );
                }
            }
            
            axios.post(url, body, {headers}).then((res) => {
                console.log(res);
                window.alert("상품정보가 수정되었습니다.");
                router.push({path:'/admin/product/list'});
            }).catch(()=>{
                window.alert("상품정보 수정 중 오류가 발생하였습니다.");
            })

        }

        // 상품리스트로 이동
        const moveProductList = () =>{
            router.push({path:'/admin/product/list'});
        }


        onMounted(()=>{
            loadData();
            loadBrandData();
        });

        return {
            state,
            moveProductList,
            uproductEngName,
            uproductKorName,
            uselectBrand,
            uselectCategory,
            handleMainImage,
            handleSubImage,
            deleteMainImage,
            deleteSubImage,
            editProduct
        }
    }
}
</script>

<style lang="css" scoped>
@import "../assets/css/common.css";

</style>