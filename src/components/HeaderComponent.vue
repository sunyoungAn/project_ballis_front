<template>
    <div id="header_wrap" class="container-fluid">
        <div id="header_logo">
            <!-- <a href="/"><img alt="site logo" src="../assets/image/logo_temp.png"></a> -->
            <router-link to="/"><img alt="site logo" src="../assets/image/logo_temp.png"></router-link>
        </div>
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container">
                <!-- <a class="navbar-brand" href="#">Navbar</a> -->
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="#">추천</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">브랜드</a>
                        </li>
                        <li class="nav-item">
                            <!-- <a class="nav-link" href='/product/list'>전체</a> -->
                            <router-link class="nav-link" to="/product/list">전체</router-link>
                        </li>
                    </ul>
                    <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li class="nav-item" v-if="state.logged===true && state.memberStatus === 1">
                            <!-- <a class="nav-link" href="/admin/product/list">관리자메뉴</a> -->
                            <router-link class="nav-link" to="/admin/product/list">관리자메뉴</router-link>
                        </li>
                        <li class="nav-item">
                            <!-- <a class="nav-link" href="/notice">고객센터</a> -->
                            <router-link class="nav-link" to="/notice">고객센터</router-link>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">관심상품</a>
                        </li>
                        <li class="nav-item" v-if="state.logged===false">
                            <!-- <a class="nav-link" href="/member/login">로그인</a> -->
                            <router-link class="nav-link" to="/member/login">로그인</router-link>
                        </li>
                        <li class="nav-item" v-if="state.logged===false">
                            <!-- <a class="nav-link" href="/member/join">회원가입</a> -->
                            <router-link class="nav-link" to="/member/join">회원가입</router-link>
                        </li>
                        <li class="nav-item" v-if="state.logged===true">
                            <!-- <a class="nav-link" href="/member/logout">로그아웃</a> -->
                            <router-link class="nav-link" to="/member/logout">로그아웃</router-link>
                        </li>
                        <li class="nav-item" v-if="state.logged===true">
                            <!-- <a class="nav-link" href="/mypage">마이페이지</a> -->
                            <router-link class="nav-link" to="/mypage">마이페이지</router-link>
                        </li>
                        <li class="nav-item me-2">
                            <input class="form-control" placeholder="Search" aria-label="Search">
                        </li>
                        <li class="nav-item">
                            <button class="btn btn-outline-success" type="submit">Search</button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
import { computed, reactive } from 'vue';
import { useStore } from 'vuex';

export default {
    setup () {
        const store = useStore();

        const state = reactive({
            logged : computed(()=>store.state.logged),
            memberStatus : computed(()=>store.state.memberStatus)
        })

        return {
            state
        }
    }
}
</script>

<style lang="css">
#header_wrap {
    /* width: 1280px;
    height: 160px;
    margin: 0px auto; */
    background-color: white;
    padding: 0px;
}



#header_logo {
    width: 200px;
    margin: 10px auto;
}
</style>