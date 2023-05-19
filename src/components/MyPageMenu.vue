<template>
    <div>
        <nav>
                <div class="p_tag_box">
                    <p>마이페이지</p>
                </div>
              
                <ul class="nav flex-column">
                    <h4>쇼핑정보</h4>
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="/mypage/buying">구매내역</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/mypage/selling">판매내역</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/mypage/inventory">보관판매</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/mypage/wish">관심상품</a>
                    </li>
                </ul>
                
                <br>

                <ul class="nav flex-column">
                    <h4>내정보</h4>
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="/mypage">프로필정보</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/mypage/inquiry">일대일문의</a>
                    </li>
                </ul>
            </nav>
    </div>
</template>

<script>
export default {
    setup () {
        

        return {}
    }
}
</script>

<style lang="css" scoped>
@import "../assets/css/common.css";
nav {
  padding: 20px;
  float: left;
  /* border: 1px solid green; */
}

a{
  text-decoration: none;
  color: gray;
}
 
a:hover{
  color: black;
  font-weight: bold;
}


 

.p_tag_box{
  text-align: center;
  font-size: x-large;
  font-weight: bold;
}
</style>