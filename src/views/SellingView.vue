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
                        <option value="1">입찰중</option>
                        <option value="2">기한만료</option>
                    </select>
                </div>


                <div class="item_box">
                    <ul class="ul_item_box">
                        <li>이미지</li>
                        <li>상품명</li>
                        <li>진행상태</li>
                    </ul>
                </div>
            </article>

        </section>
    </div>
</template>

<script>
import MyPageMenu from '../components/MyPageMenu.vue';
import SellingTab from '@/components/SellingTab.vue';

export default {
    components: { MyPageMenu, SellingTab },

    setup () {
        

        return {}
    }
}
</script>

<style lang="css" scoped>
@import "../assets/css/common.css";
.ul_item_box{
    padding: 15px;
    display: grid;
    grid-template-columns:  auto 60% auto;
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