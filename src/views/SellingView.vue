<template>
    <div class="container common_mt160 cutomer_wrap">
      <section>
        <my-page-menu></my-page-menu>
  
        <article>
          <selling-tab></selling-tab>
          <br>
          <div style="margin-bottom: 20px;">
            <select class="form-select form-select-sm" v-model="state.selectedStatus" style="width: 150px; height: 50px;">
              <option v-for="option in statusOptions" :value="option.value" :key="option.value">{{ option.label }}</option>
            </select>
          </div>
  
          <div class="item_box">
            <ul class="ul_item_box" v-for="tmp of filteredList" :key="tmp.id">
              <li>이미지</li>
              <li>{{ tmp.productName }}</li>
              <li>{{ tmp.selling.sellingStatus === 1 ? '입찰중' : '기한만료' }}</li>
            </ul>
          </div>
        </article>
      </section>
    </div>
  </template>
  
  <script>
  import { onMounted, reactive, computed } from 'vue';
  import MyPageMenu from '../components/MyPageMenu.vue';
  import SellingTab from '@/components/SellingTab.vue';
  import axios from 'axios';
  
  export default {
    components: { MyPageMenu, SellingTab },
  
    setup() {
      const state = reactive({
        list: [],
        token: sessionStorage.getItem("TOKEN"),
        selectedStatus: "",
      });
  
      const handleData = async () => {
        const url = `/api/get/sellingall/${state.token}`;
        const headers = { "Content-Type": "application/json", "auth": state.token };
        const { data } = await axios.get(url, { headers });
        state.list = data;
      };
  
      const filteredList = computed(() => {
        if (state.selectedStatus === "") {
          return state.list;
        } else {
          const status = parseInt(state.selectedStatus);
          return state.list.filter(product => product.selling.sellingStatus === status);
        }
      });
  
      const statusOptions = computed(() => {
        const options = [
          { label: "전체", value: "" },
          { label: "입찰중", value: 1 },
          { label: "기한만료", value: 2 },
        ];
        return options;
      });
  
      onMounted(() => {
        handleData();
      });
  
      return {
        state,
        filteredList,
        statusOptions,
      };
    },
  };
  </script>

<style lang="css" scoped>
@import "../assets/css/common.css";
.ul_item_box{
    padding: 15px;
    display: grid;
    grid-template-columns:  20% 60% 20%;
    list-style-type: none;
    text-align: center;
}

.item_box{
    width: 1100px;
    height: 600px;
    margin: 0px auto;
    border: 1px solid black;
    display: inline-block;
}

</style>