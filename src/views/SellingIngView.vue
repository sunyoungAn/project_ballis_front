<template>
    <div class="container common_mt160 cutomer_wrap">
        <section>
            <my-page-menu></my-page-menu>

            <article>
                <selling-tab></selling-tab>
                <div>
                    <ul style=" list-style-type: none;">
                    <div>
                        <input type="date" v-model="state.startDate" @change="setMinDate"/> ~ <input type="date" v-model="state.endDate" :min="state.minDate"/>
                        <button @click="searchDate">검색</button>
                    </div>
                    <li style="color: gray;">
                        한 번에 조회 가능한 기간은 최대 6개월입니다.
                    </li>
                    </ul>
                </div>
                <br>

                <div style="margin-bottom: 20px;">
                    <select class="form-select form-select-sm" v-model="state.selectedStatus" style="width: 150px; height: 50px;">
                        <option v-for="option in statusOptions" :value="option.value" :key="option.value">{{ option.label }}</option>
                    </select>
                </div>

                <div class="p_tag_box">
                    <hr>
                </div>

                <div class="item_box">
                    <ul class="ul_item_box" v-for="tmp of filteredList" :key="tmp.id">
                        <li><img :src="`http://localhost:8088/api/wish/display/image?imagePath=${tmp.imagelist[0].imagePath}`" class="item_img main_img_background"></li>
                        <li style="margin-top: 15px;">{{tmp.productName}}</li>
                        <li style="margin-top: 15px;">{{ 
                            tmp.contract.sellingStatus === 21 ? '발송요청' :
                            tmp.contract.sellingStatus === 22 ? '발송완료' :
                            tmp.contract.sellingStatus === 23 ? '입고대기' :
                            tmp.contract.sellingStatus === 24 ? '입고완료' :
                            tmp.contract.sellingStatus === 25 ? '검수중' :
                            tmp.contract.sellingStatus === 26 ? '검수불합격' : '검수합격'
                            }}
                        </li>
                    </ul>
                </div>
            </article>

        </section>
    </div>
</template>

<script>
import MyPageMenu from '../components/MyPageMenu.vue';
import SellingTab from '../components/SellingTab.vue';
import { computed, onMounted, reactive } from 'vue';
import axios from 'axios';

export default {
    components: { MyPageMenu, SellingTab },

    setup () {
        const state = reactive({
            list:[],
            token : sessionStorage.getItem("TOKEN"),
            selectedStatus: "",
            minDate:'',
            startDate:'',
            endDate:''
        })

        //진행중 데이터 출력
        const handleData = async () =>{
            const url = `/api/get/sellinging/${state.token}`;
            const headers = {"Content-Type":"application/json", "auth" : state.token};
            const { data } = await axios.get(url,{headers});
            state.list = data;
            console.log(state.list)
        };

        // 입력된 날짜 이후의 날짜를 선택할 수 있도록 설정
        function setMinDate(event) {
            state.minDate = event.target.value;
        }

        //날짜 검색
        const searchDate = async () => {
            const startDate = new Date(state.startDate + 'T00:00:00').toISOString().split('T')[0];
            const endDate = new Date(state.endDate + 'T00:00:00').toISOString().split('T')[0];
            const url = `/api/sellinging/date/${state.token}`;
            const headers = {"Content-Type": "application/json", "auth": state.token};
            const params = { startDate, endDate };
            const {data} = await axios.get(url, {headers, params});
            console.log("date=>", data);
            state.list = data;
        }

        //상태 검색
        const filteredList = computed(() => {
            if (state.selectedStatus === "") {
            return state.list;
            } else {
            const status = parseInt(state.selectedStatus);
                return state.list.filter(product => product.contract.sellingStatus === status);
            }
        });

        //셀렉박스
        const statusOptions = computed(() => {
            const options = [
                { label: "전체", value: "" },
                { label: "발송요청", value: 21 },
                { label: "발송완료", value: 22 },
                { label: "입고대기", value: 23 },
                { label: "입고완료", value: 24 },
                { label: "검수중", value: 25 },
                { label: "검수불합격", value: 26 },
                { label: "검수합격", value: 27 },
            ];
            return options;
        });

        onMounted(()=>{
            handleData();
        })

        return {
            state,
            statusOptions,
            filteredList,
            setMinDate,
            searchDate
        }
    }
}
</script>

<style lang="css" scoped>
@import "../assets/css/common.css";

.ul_item_box{
    text-align: center;
    padding: 15px;
    display: grid;
    grid-template-columns: 20% 60% 20%;
    list-style-type: none;
}

.item_box{
    width: 1100px;
    height: 600px;
    margin: 0px auto;
    display: inline-block;
}

.item_img{
    width: 70px;
    height: 70px;
 }
 .main_img_background {
    width:100px;
    background-color: #E0E0E0;
}
 

</style>