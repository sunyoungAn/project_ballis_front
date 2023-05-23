<template>
    <div class="container common_mt160 cutomer_wrap">
        <section>
            <my-page-menu></my-page-menu>

            <article>
                <buying-tab></buying-tab>
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

                <div class="item_box" >
                    <ul class="ul_item_box" v-for="tmp of filteredList" :key="tmp.id">
                      <li><img :src="getImagePath(tmp)" class="item_img main_img_background"></li>
                      <p class="fw-bolder product_name">{{ tmp.productName }}</p>
                      <li style="margin-top: 20px;">{{ formatDate(tmp.buying.registDate) }}</li>
                      <div v-show="tmp.buying.buyingStatus === 1">
                        <span class="badge rounded-pill text-bg-success item_badge">{{ tmp.buying.buyingStatus === 1 ? '입찰중' : '기한만료' }}</span>
                      </div>
                      <div v-show="tmp.buying.buyingStatus === 1" >
                        <button type="button" class="btn btn-outline-dark delete_button" @click="handleDelete(tmp.buying.id)">입찰삭제</button>
                      </div>
                      <div v-show="tmp.buying.buyingStatus === 2">
                        <span class="badge rounded-pill text-bg-secondary item_badge">{{ tmp.buying.buyingStatus === 1 ? '입찰중' : '기한만료' }}</span>
                      </div>
                    </ul>
                </div>
            </article>

        </section>
    </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue';
import BuyingTab from '../components/BuyingTab.vue';
import MyPageMenu from '../components/MyPageMenu.vue';
import axios from 'axios';

export default {
    components: { MyPageMenu, BuyingTab },

    setup() {
      const state = reactive({
        list: [],
        token: sessionStorage.getItem("TOKEN"),
        selectedStatus: "",
        minDate:'',
        startDate:'',
        endDate:''
      });
  
      //구매입찰 전체 출력
      const handleData = async () => {
        const url = `/api/get/buying/${state.token}`;
        const headers = { "Content-Type": "application/json", "auth": state.token };
        const { data } = await axios.get(url, { headers });
        console.log(data);
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
        const url = `/api/buying/date/${state.token}`;
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
          return state.list.filter(product => product.buying.buyingStatus === status);
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
          { label: "입찰중", value: 1 },
          { label: "기한만료", value: 2 },
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

      //입찰삭제
      const handleDelete =  async (id) => {
        if(confirm('삭제하시겠습니까?')){
            const url = `/api/delete/buying/${id}`;
            const headers = {"Content-Type":"application/json"};
            const body={};
            const {data} = await axios.delete(url, {headers:headers, data:body});
            console.log(data);
            handleData();
          } 
      }
  
      onMounted(() => {
        handleData();
      });
  
      return {
        state,
        filteredList,
        statusOptions,
        searchDate,
        setMinDate,
        formatDate,
        getImagePath,
        handleDelete
      };
    },
}
</script>

<style lang="css" scoped>
@import "../assets/css/common.css";

.ul_item_box{
    padding: 15px;
    display: grid;
    grid-template-columns: 15% 45% 15% 10% 15%;
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

.delete_button{
  border-radius: 0; 
  margin-top: 13px;
  margin-left: 70px;
}

</style>