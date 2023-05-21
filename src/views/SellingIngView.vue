<template>
    <div class="container common_mt160 cutomer_wrap">
        <section>
            <my-page-menu></my-page-menu>

            <article>
                <selling-tab></selling-tab>
                <div>
                    <ul style=" list-style-type: none;">
                      <div style=" display: flex; text-align: center;">
                          <input type="date" v-model="state.startDate" @change="setMinDate"/> ~ <input type="date" v-model="state.endDate" :min="state.minDate"/>
                          <button type="button" class="btn btn-outline-dark search_button" @click="searchDate" >조회</button>
                      </div>
                      <li style="color: gray;">
                          한 번에 조회 가능한 기간은 최대 6개월입니다.<br>
                          기간별 조회 결과는 입찰일 기준으로 노출됩니다.
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
                        <li><img :src="getImagePath(tmp)" class="item_img main_img_background"></li>
                        <p class="fw-bolder product_name">{{ tmp.productName }}</p>
                        <li style="margin-top: 20px;">{{ formatDate(tmp.contract.registDate) }}</li>
                        <span class="badge rounded-pill text-bg-success item_badge">
                            {{ 
                            tmp.contract.sellingStatus === 21 ? '발송요청' :
                            tmp.contract.sellingStatus === 22 ? '발송완료' :
                            tmp.contract.sellingStatus === 23 ? '입고대기' :
                            tmp.contract.sellingStatus === 24 ? '입고완료' :
                            tmp.contract.sellingStatus === 25 ? '검수중' :
                            tmp.contract.sellingStatus === 26 ? '검수불합격' : '검수합격'
                            }}
                        </span>
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
            const endDate = new Date(state.endDate + 'T00:00:00');
            endDate.setDate(endDate.getDate() + 1);
            const endDateISO = endDate.toISOString().split('T')[0];
            const url = `/api/sellinging/date/${state.token}`;
            const headers = {"Content-Type": "application/json", "auth": state.token};
            const params = { startDate, endDate: endDateISO };
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

        //이미지 불러오기
        const getImagePath = (tmp) => {
            if (tmp.imagelist && tmp.imagelist.length > 0) {
            return `http://localhost:8088/api/wish/display/image?imagePath=${tmp.imagelist[0].imagePath}`;
            } else {
            // 이미지 리스트가 없는 경우에는 null을 반환하여 아무 항목도 출력되지 않도록 함
            return null;
            }
        };

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

        //날짜설정
        const formatDate = (dateString) => {
                const date = new Date(dateString);
                const year = date.getFullYear();
                const month = ('0' + (date.getMonth() + 1)).slice(-2);
                const day = ('0' + date.getDate()).slice(-2);
                return `${year}-${month}-${day}`;
        };

        onMounted(()=>{
            handleData();
        })

        return {
            state,
            statusOptions,
            filteredList,
            setMinDate,
            searchDate,
            formatDate,
            getImagePath
        }
    }
}
</script>

<style lang="css" scoped>
@import "../assets/css/common.css";

.ul_item_box{
    padding: 15px;
    display: grid;
    grid-template-columns:  15% 55% 15% 15%;
    list-style-type: none;
}

.item_box{
    width: 1100px;
    height: 600px;
    margin: 0px auto;
    display: inline-block;
}

.product_name{
  font-size: large;
  margin-top:20px;
  font-weight: bold;
}

.item_img{
    width: 70px;
    height: 70px;
 }
 .main_img_background {
    width:100px;
    background-color: #E0E0E0;
}
 
.item_badge{
  margin-top: 20px; 
  width:70px; 
  height: 25px;
}

.search_button{
  margin-left: 5px; 
  border-radius: 0; 
  justify-content: center;
  align-items: center;
  height: 100%; 
}

</style>