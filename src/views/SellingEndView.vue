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
                        <li>
                            <div>
                                <img :src="getImagePath(tmp)" class="item_img main_img_background">
                                <div>사이즈 : {{ tmp.contract.productSize }}</div>
                                <div v-if="tmp.contract.paidPrice != null">정산금액 : {{ changePriceFormat(tmp.contract.paidPrice) }}원</div>
                            </div>
                        </li>
                        <p class="fw-bolder product_name">{{ tmp.productName }}</p>
                        <li style="margin-top: 20px;">{{ formatDate(tmp.contract.registDate) }}</li>
                        <span class="badge rounded-pill text-bg-success item_badge">
                            {{ 
                                tmp.contract.sellingStatus === 50 ? '정산완료' :
                                // tmp.contract.sellingStatus === 51 ? '취소완료' : TODO 취소 완료 정보도 완료탭에 뜨게 끔 추후 수정하기
                                tmp.contract.sellingStatus === 52 ? '불합격반송' : '회수완료'
                            }}
                        </span>
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
            const endDate = new Date(state.endDate + 'T00:00:00');
            endDate.setDate(endDate.getDate() + 1);
            const endDateISO = endDate.toISOString().split('T')[0];
            const url = `/api/sellingend/date/${state.token}`;
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
        
        //날짜설정
        const formatDate = (dateString) => {
                const date = new Date(dateString);
                const year = date.getFullYear();
                const month = ('0' + (date.getMonth() + 1)).slice(-2);
                const day = ('0' + date.getDate()).slice(-2);
                return `${year}-${month}-${day}`;
        };

        //셀렉박스
        const statusOptions = computed(() => {
            const options = [
                { label: "전체", value: "" },
                { label: "정산완료", value: 50 },
                // { label: "취소완료", value: 51 }, TODO 취소 완료 정보도 완료탭에 뜨게 끔 추후 수정하기
                { label: "불합격반송", value: 52 },
                { label: "회수완료", value: 53 }
            ];
            return options;
        });

        // 금액형식변환 세자리마다 콤마추가
        const changePriceFormat = (data) => {
            return data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }

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
            getImagePath,
            changePriceFormat
        }
    }
}
</script>

<style lang="css" scoped>
@import "../assets/css/common.css";

.ul_item_box{
    padding: 15px;
    display: grid;
    grid-template-columns: 15% 55% 15% 15%;
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