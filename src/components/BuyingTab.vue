<template>
    <article>
        <div class="p_tag_box">
                <p>구매내역</p>
                <hr>

                <ul class="ul_box">
                    <a class="nav-link active" aria-current="page" href="/mypage/buying">구매입찰</a>
                    <a class="nav-link active" aria-current="page" href="/mypage/buyinging">진행중</a>
                    <a class="nav-link active" aria-current="page" href="/mypage/buyingend">완료</a>
                </ul>
            </div>
            <div>
                <ul style=" list-style-type: none;">
                    <div>
                        <input type="date" @change="setMinDate"/> ~ <input type="date" :min="minDate"/>
                    </div>
                    <li style="color: gray;">
                        한 번에 조회 가능한 기간은 최대 6개월입니다.
                    </li>
                </ul>
            </div>
    </article>
</template>

<script>
export default {
  data() {
    return {
      minDate: "",
    };
  },
  methods: {
    setMinDate(event) {
      // 입력된 날짜 이후의 날짜를 선택할 수 있도록 설정
      this.minDate = event.target.value;
    },
  },
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