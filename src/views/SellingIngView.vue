<template>
    <div class="container common_mt160 cutomer_wrap">
        <section>
            <my-page-menu></my-page-menu>

            <article>
                <selling-tab></selling-tab>
                <br>

                <div style="margin-bottom: 20px;">
                    <select class="form-select form-select-sm" aria-label=".form-select-sm example" style="width: 150px; height: 50px;">
                        <option selected>전체</option>
                        <option value="1">발송요청</option>
                        <option value="2">발송완료</option>
                        <option value="3">입고대기</option>
                        <option value="4">입고완료</option>
                        <option value="5">검수중</option>
                        <option value="6">검수불합격</option>
                        <option value="7">검수합격</option>
                    </select>
                </div>

                <div class="item_box">
                    <ul class="ul_item_box" v-for="tmp of state.list" :key="tmp">
                        <li>이미지</li>
                        <li>{{tmp.productName}}</li>
                        <li>{{tmp.selling.sellingStatus === 1 ? '입찰중' : '기한만료'}}</li>
                    </ul>
                </div>
            </article>

        </section>
    </div>
</template>

<script>
import MyPageMenu from '../components/MyPageMenu.vue';
import SellingTab from '../components/SellingTab.vue';
import { onMounted, reactive } from 'vue';
import axios from 'axios';

export default {
    components: { MyPageMenu, SellingTab },

    setup () {
        const state = reactive({
            list:[],
            token : sessionStorage.getItem("TOKEN")
        })

        const handleData = async () =>{
            const url = `/api/get/sellingall/${state.token}`;
            const headers = {"Content-Type":"application/json", "auth" : state.token};
            const { data } = await axios.get(url,{headers});
            state.list = data;
            console.log(state.list)
        }

        

        onMounted(()=>{
            handleData();
        })

        return {
            state
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
    border: 1px solid black;
    display: inline-block;
}

</style>