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

                <div class="item_box">
                    <ul class="ul_item_box" v-for="tmp of filteredList" :key="tmp.id">
                        <li>이미지</li>
                        <li>{{tmp.productName}}</li>
                        <li>
                            {{ 
                            tmp.contract.sellingStatus === 50 ? '정산완료' :
                            tmp.contract.sellingStatus === 51 ? '취소완료' :
                            tmp.contract.sellingStatus === 52 ? '불합격반송' : '회수완료'
                            }}
                        </li>
                    </ul>
                </div>
            </article>

        </section>
    </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue';
import MyPageMenu from '../components/MyPageMenu.vue';
import SellingTab from '../components/SellingTab.vue';
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

        //종료 데이터 출력
        const handleData = async () =>{
            const url = `/api/get/sellingend/${state.token}`;
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
            const url = `/api/selling/date/${state.token}`;
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
                { label: "정산완료", value: 50 },
                { label: "취소완료", value: 51 },
                { label: "불합격반송", value: 52 },
                { label: "회수완료", value: 53 }
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
    grid-template-columns: auto 60% auto;
    list-style-type: none;
}

.item_box{
    width: 1100px;
    height: 600px;
    margin: 0px auto;
    border: 1px solid black;
    display: inline-block;
}

</style>