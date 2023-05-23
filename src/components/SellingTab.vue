<template>
    <article>
        <div class="p_tag_box">
                <p>판매내역</p>
                <hr>

                <ul class="ul_box">
                  <router-link to="/mypage/selling">판매입찰</router-link>
                  <router-link to="/mypage/sellinging">진행중</router-link>
                  <router-link to="/mypage/sellingend">완료</router-link>
                </ul>
            </div>
    </article>
</template>

<script>
import { reactive } from 'vue';
export default {
    setup() {
    const state = reactive({
      minDate: '',
    });

    function setMinDate(event) {
      // 입력된 날짜 이후의 날짜를 선택할 수 있도록 설정
      state.minDate = event.target.value;
    }

    return {
      state,
      setMinDate
    };
  }
};
</script>

<style lang="css" scoped>
@import "../assets/css/common.css";

.ul_box {
    display: grid;
    grid-template-columns: 33% 33% 33%;
    list-style-type: none;
    color: gray;
    list-style-type: none;
}

a{
  text-decoration: none;
  color: gray;
}

a:hover{
  color: black;
  font-weight: bold;
}

</style>