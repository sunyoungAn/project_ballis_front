<template>
    <div class="container common_mt160 cutomer_wrap">
        <section>
            <my-page-menu></my-page-menu>

            <article>
                <buying-tab></buying-tab>
                <br>

                <div style="margin-bottom: 20px;">
                    <select class="form-select form-select-sm" aria-label=".form-select-sm example" style="width: 150px; height: 50px;">
                        <option selected>전체</option>
                        <option value="1">대기중</option>
                        <option value="2">발송완료</option>
                        <option value="3">입고대기</option>
                        <option value="4">입고완료</option>
                        <option value="5">검수중</option>
                        <option value="6">거래실패</option>
                        <option value="7">검수합격</option>
                        <option value="8">배송중</option>
                        <option value="9">상품준비중</option>
                        <option value="10">반품신청</option>
                        <option value="11">접수완료</option>
                        <option value="12">회수중</option>
                        <option value="13">회수완료</option>
                        <option value="14">교환신청</option>
                        <option value="15">교환중</option>
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
import BuyingTab from '../components/BuyingTab.vue';
import MyPageMenu from '../components/MyPageMenu.vue';

export default {
    components: { MyPageMenu, BuyingTab },

    setup () {
        

        return {}
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