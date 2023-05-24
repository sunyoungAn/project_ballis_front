<template>
    <div class="container common_mt160 cutomer_wrap">
      <section>
        <my-page-menu></my-page-menu>
  
        <article>
          <div class="p_tag_box">
            <p>보관판매</p>
            <hr>
          </div>
          <br>

          <div style="margin-bottom: 20px;">
            <select class="form-select form-select-sm" v-model="state.selectedStatus" style="width: 150px; height: 50px;">
                <option v-for="option in statusOptions" :value="option.value" :key="option.value">{{ option.label }}</option>
            </select>
            <br>
            <span style="color: gray;">
                취소를 원하시면 일대일 문의를 남겨주세요.
            </span>
          </div>

          <div class="p_tag_box">
              <hr>
          </div>

          <div class="item_box">
            <ul class="ul_item_box" v-for="tmp in filteredList" :key="tmp.id">
              <li>
                <div>
                  <img :src="tmp.imagelist[0].imagePath" class="item_img main_img_background">
                </div>
                <div>
                  <div>사이즈 : {{ tmp.selling.productSize }}</div>
                  <!-- <div>가격 : {{ changePriceFormat(tmp.buying.wishPrice) }}원</div> -->
                </div>
              </li>
              <p class="fw-bolder product_name">{{ tmp.productName }}</p>
              <span class="badge rounded-pill text-bg-success item_badge">
                {{ 
                  tmp.sellingStatus === 11 ? '발송요청' :
                  tmp.sellingStatus === 12 ? '입고대기' :
                  tmp.sellingStatus === 13 ? '입고완료' :
                  tmp.sellingStatus === 14 ? '검수중' :
                  tmp.sellingStatus === 15 ? '검수완료' :
                  tmp.sellingStatus === 16 ? '창고이동' :
                  tmp.sellingStatus === 17 ? '판매중' :
                  tmp.sellingStatus === 18 ? '판매완료' : 
                  tmp.sellingStatus === 19 ? '보관만료' : 
                  tmp.sellingStatus === 50 ? '정산완료' : ''
                }}
              </span>

              <span style="margin-top: 20px;">{{ formatDate(tmp.selling.expiryDate) }}</span>
            </ul>
          </div>
        </article>
      </section>
    </div>
</template>

<script>
import MyPageMenu from '../components/MyPageMenu.vue';
import { computed, onMounted, reactive } from 'vue';
import axios from 'axios';
export default {
  components: { MyPageMenu },
    setup () {
      const state = reactive({
        list: [],
        token: sessionStorage.getItem("TOKEN"),
        selectedStatus: "",
        contractlist:[],
        images : [],
      });

      const handleData = async () => {
        const url = `/api/get/sellingall/${state.token}/1`;
        const headers = { "Content-Type": "application/json", "auth": state.token };
        const { data } = await axios.get(url, { headers });
        state.list = data;
        console.log("데이터", state.list);

        for (let i = 0; i < state.list.length; i++) {
          const imagelist = state.list[i].imagelist;
          for (let j = 0; j < imagelist.length; j++) {
            imagelist[j].imagePath = `/api/wish/display/image?imagePath=${imagelist[j].imagePath}`;
          }
        }
      };
        
      const filteredList = computed(() => {
          if (state.selectedStatus === "") {
            return state.list;
          } else {
            const status = parseInt(state.selectedStatus);
            return state.list.filter(product => product.sellingStatus === status);
          }
      });

      const statusOptions = computed(() => {
        const options = [
          { label: "전체", value: "" },
          { label: "발송요청", value: 11 },
          { label: "입고대기", value: 12 },
          { label: "입고완료", value: 13 },
          { label: "검수중", value: 14 },
          { label: "검수완료", value: 15 },
          { label: "창고이동", value: 16 },
          { label: "판매중", value: 17 },
          { label: "판매완료", value: 18 },
          { label: "보관만료", value: 19 },
          { label: "정산완료", value: 50 }
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
        formatDate,
      }
    }
}
</script>

<style lang="css" scoped>
@import "../assets/css/common.css";

.ul_box {
    list-style-type: none;
    color: gray;
    list-style-type: none;
}

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

.item_img{
    width: 70px;
    height: 70px;
 }
 .main_img_background {
    width:100px;
    background-color: #E0E0E0;
}

.product_name{
  font-size: large;
  margin-top:20px;
  font-weight: bold;
}

.item_badge{
  margin-top: 20px; 
  width:70px; 
  height: 25px;
}

.delete_button{
  border-radius: 0; 
  margin-top: 13px;
  margin-left: 70px;
  height: 40px;
}

</style>