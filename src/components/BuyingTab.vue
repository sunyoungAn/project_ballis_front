<template>
    <article>
        <div class="p_tag_box">
                <p>구매내역</p>
                <hr>

                <ul class="ul_box">
                  <router-link to="/mypage/buying">구매입찰</router-link>
                  <router-link to="/mypage/buyinging">진행중</router-link>
                  <router-link to="/mypage/buyingend">완료</router-link>
                    <!-- <a class="nav-link active" aria-current="page" href="/mypage/buying">구매입찰</a>
                    <a class="nav-link active" aria-current="page" href="/mypage/buyinging">진행중</a>
                    <a class="nav-link active" aria-current="page" href="/mypage/buyingend">완료</a> -->
                </ul>
        </div>
    </article>
</template>

<script>

export default {
  setup() {

    return {
    
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

a {
  text-decoration: none;
  color: gray;
}

a:hover{
  color: black;
  font-weight: bold;
}

</style>