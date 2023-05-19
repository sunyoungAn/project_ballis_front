<template>
    <article>
        <div class="p_tag_box">
                <p>판매내역</p>
                <hr>

                <ul class="ul_box">
                    <a class="nav-link active" aria-current="page" href="/mypage/selling">판매입찰</a>
                    <a class="nav-link active" aria-current="page" href="/mypage/sellinging">진행중</a>
                    <a class="nav-link active" aria-current="page" href="/mypage/sellingend">완료</a>
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

</style>