<template>
    <div class="container common_mt160 admin_wrap">
        <admin-sub-menu></admin-sub-menu>
        <div class="admin_content">
            <h1 class="mb-4">| 상품관리</h1>
            
            <!-- 검색 영역 -->
            <div class="mb-5">
                <h2 class="mb-4">상품 검색</h2>
                <div class="px-5">
                    <div class="row mb-3">
                        <div class="col-2 py-2">
                            상품번호
                        </div>
                        <div class="col-4">
                            <input type="text" class="form-control" v-model="state.searchId" placeholder="상품번호">
                        </div>
                        <div class="col-2 py-2">
                            상품명
                        </div>
                        <div class="col-4">
                            <input type="text" class="form-control" v-model="state.searchName" placeholder="상품명" maxlength="100">
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-2 py-2">
                            브랜드
                        </div>
                        <div class="col-4">
                            <select class="form-select" v-model="state.searchBrand">
                                <option :value=0>브랜드선택</option>
                                <option v-for="brand in state.brandList" :key="brand" :value="brand.brandId" >{{ brand.brandName }}</option>
                            </select>
                        </div>
                        <div class="col-2 py-2">
                            카테고리
                        </div>
                        <div class="col-4">
                            <select class="form-select" v-model="state.searchCategory">
                                <option v-for="category in state.categoryList" :key="category" :value="category.id">{{ category.value }}</option>
                            </select>
                        </div>
                    </div>
                    
                </div>
                <div class="d-flex justify-content-center mt-4">
                    <button class="btn btn-success btn-lg" @click="search()" >검색</button>
                </div>
            </div>

            <!-- 검색 결과-->
            <div>
                <table class="table align-middle">
                    <thead>
                        <tr class="text-center">
                            <th scope="col" width="50px">
                                <input class="form-check-input" type="checkbox" :checked="state.checkAll" @change="checkAllEvnet()">
                            </th>
                            <th scope="col" width="100px">상품번호</th>
                            <th scope="col">상품명(영문)</th>
                            <th scope="col">상품명(한글)</th>
                            <th scope="col" width="110px">브랜드</th>
                            <th scope="col" width="100px">카테고리</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="data of state.rows" :key="data">
                            <td class="text-center"><input class="form-check-input" type="checkbox" :value="data.id" v-model="state.checkList" @change="checkEvnet()"></td>
                            <td class="text-center">{{ data.id }}</td>
                            <td>{{ data.productEngName }}</td>
                            <td @click="moveProductEdit(data.id)" style="cursor: pointer;">{{ data.productKorName }}</td>
                            <td class="text-center">{{ setBrandName(data.id) }}</td>
                            <td class="text-center">{{ setCategoryName(data.category) }}</td>
                        </tr>
                        
                    </tbody>
                </table>
            </div>
            
            <!-- 페이지 네이션-->
            <nav class="d-flex justify-content-center mt-4">
                <el-pagination background layout="prev, pager, next" @current-change="changePage" :total="state.total" />
            </nav>

            <div class="d-flex justify-content-center mt-5">
                <button class="btn btn-success btn-lg d-flex justify-content-end me-2" @click="moveProductRegister()">상품등록</button>
                <button class="btn btn-success btn-lg d-flex justify-content-start ms-2" @click="deleteProduct()">상품삭제</button>
            </div>  
        </div>
    </div>
    
</template>

<script>
import AdminSubMenu from '@/components/AdminSubMenu.vue'
import { onMounted, reactive } from 'vue'; 
import { useRouter } from 'vue-router';
import axios from 'axios';


export default {
    name: 'SubMenu',
    components: {
        AdminSubMenu
    },
    setup () {

        // 페이지 이동 라우트
        const router = useRouter();

        const state = reactive({
            rows : [],
            total : 0,
            page : 0,
            brandList : [],
            productBrand : {},
            categoryList : [
                { id : 0 , value : '카테고리선택' },
                { id : 1 , value : '스니커즈' },
                { id : 2 , value : '플랫' },
                { id : 3 , value : '로퍼' },
                { id : 4 , value : '더비/레이스업' },
                { id : 5 , value : '샌들/슬리퍼' },
                { id : 6 , value : '힐/펌프스/부츠/기타' }
            ],
            searchBrand : 0, // 검색조건
            searchCategory : 0, // 검색조건
            searchId : '', // 검색조건
            searchName : '', // 검색조건
            isSearch : false,
            checkAll : false,
            checkList : []
        })

        // 상품관리리스트페이지에 띄울 정보 모두 가져오기
        const loadData = () => {
            axios.get(`/api/admin/product/getall?page=${state.page}`).then((res)=>{
                console.log(res.data);
                state.rows = res.data.productList.content;
                state.total = res.data.productList.totalElements;
                state.brandList = res.data.brandList;
                state.productBrand = res.data.productBrandMap;
                state.checkAll = false;
                state.checkList = [];
                // 검색조건 초기화
                state.searchBrand = 0;
                state.searchCategory = 0;
                state.searchId = '' ;
                state.searchName = '';
            }).catch(()=>{
            })
        }

        // 브랜드 이름 설정하기
        const setBrandName = (id) => {
            return state.productBrand[id];
        }

        // 카테고리 이름 설정하기
        const setCategoryName = (id) => {
            return state.categoryList[id].value;
        }

        // 페이징기능
        const changePage = (page) => {
            console.log(page);
            state.page = page - 1; // 상태변수값 변경
            if(state.isSearch === false) {
                loadData(); // 데이터가져오기
            } else {
                search();
            }
        }

        // 검색하기
        const search = () => {
            if( isNaN(state.searchId)) {
                window.alert("상품번호는 숫자만 입력해주세요");
                state.searchId = '';
                return false;
            }

            if(state.searchId === '' && state.searchName === '' && state.searchBrand === 0 && state.searchCategory === 0) {
                state.isSearch = false;
            } else {
                state.isSearch = true;
            }

            axios.get(`/api/admin/product/search?page=${state.page}&id=${state.searchId}&name=${state.searchName}&brandId=${state.searchBrand}&category=${state.searchCategory}`).then((res)=>{
                console.log(res.data);
                state.rows = res.data.productList.content;
                state.total = res.data.productList.totalElements;
                state.productBrand = res.data.productBrandMap;
                state.checkAll = false;
                state.checkList = [];
            }).catch(()=>{
            })
        }

        // 전체선택 처리
        const checkAllEvnet = () => {
            if(state.checkAll === false) {
                for(let idx in state.rows) {

                    // 이미 선택되어 있는 상품인 경우에는 중복선택 제외하기
                    if(state.checkList.includes(state.rows[idx].id)) {
                        continue;
                    }
                    state.checkList.push(state.rows[idx].id);
                }
                state.checkAll = true;
            } else {
                state.checkList = [];
                state.checkAll = false;
            }
        }

        // 체크박스 개별 처리
        const checkEvnet = () => {
            if(state.checkList.length === state.rows.length) {
                state.checkAll = true;
            } else {
                state.checkAll = false;
            }
        }

        // 상품등록페이지로 이동
        const moveProductRegister = () =>{
            router.push({path:'/admin/product/register'});
        }

        // 상품삭제
        const deleteProduct = () => {
            if(state.checkList.length === 0) {
                window.alert("상품을 1개 이상 선택해주세요.");
                return false;
            }

            if(confirm("선택한 상품을 삭제하겠습니까?")) {
                axios.put(`/api/admin/product/delete`, state.checkList).then((res)=>{
                    console.log(res.data);
                    window.alert("삭제처리가 정상적으로 처리되었습니다.");
                    loadData();
                }).catch(()=>{
                    window.alert("삭제처리 중 오류가 발생하였습니다.");
                })
             }
        }

        // 상품수정페이지로 이동
        const moveProductEdit = (id) => {
            router.push({path:'/admin/product/edit', query:{id : id}});
        }

        onMounted(() => {
            loadData();
        })

        return {
            state,
            moveProductRegister,
            changePage,
            setBrandName,
            setCategoryName,
            search,
            checkAllEvnet,
            checkEvnet,
            deleteProduct,
            moveProductEdit
        }
    }
}
</script>

<style lang="css">
@import "../assets/css/common.css";

</style>