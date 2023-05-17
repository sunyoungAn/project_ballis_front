<template>
    <div class="admin_submenu">
        <div class>
            <h2>관리자메뉴</h2>
        </div>
        <nav>
            <ul class="list-unstyled">
                <li class="mb-3">
                    <router-link to="/admin/member/list">회원관리</router-link>
                </li>
                <li class="mb-3">
                    <router-link to="/admin/product/list">상품관리</router-link>
                </li>
                <li class="mb-3">
                    <router-link to="/admin/inventory/list">보관상품관리</router-link>
                </li>
                <li class="mb-3">
                    <router-link to="/admin/selling/list">판매관리</router-link>
                </li>
                <li class="mb-3">
                    <router-link to="/admin/buying/list">구매관리</router-link>
                </li>
                <li class="mb-3">
                    <router-link to="/admin/contract/list">거래관리</router-link>
                </li>
                <li class="mb-3">
                    <router-link to="/admin/inquiry/list">문의관리</router-link>
                </li>
                <li class="mb-3">
                    <router-link to="/admin/notice/list">공지관리</router-link>
                    <!-- <router-link active-class="active-link" exact-active-class="exact-active-link" to="/admin/notice">공지관리</router-link> -->
                </li>
                <li class="mb-3">
                    <router-link to="/admin/review/list">리뷰관리</router-link>
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
.admin_submenu {
    width: 180px;
    margin-right: 20px;
    float: left;
}

a {
    font-weight: bold;
    text-decoration: none;
    color : #2c3e50;
}

li {
    font-size: large;
}

nav {
    margin-top: 30px;
    margin-left: 10px;
}

nav a.router-link-exact-active {
  color: #42b983;
} 


/* .active-link {
    color: #42b983;
}

.exact-active-link {
    color: #42b983;
    /* font-weight: bold; */
/* } */ 

</style>