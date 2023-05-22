<template>
    <div>

    </div>
</template>

<script>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex'
import axios from 'axios';
export default {
    setup () {
        
        const store = useStore();
        const router = useRouter();

        onMounted(()=>{
            if(confirm('로그아웃 하시겠습니까?')) {
                axios.post("/api/logout/member").then(()=>{
                    sessionStorage.removeItem("TOKEN");
                    store.commit('setLogged',false);
               });
            }
            router.push({path:'/'})
        });

        return {}
    }
}
</script>

<style lang="scss" scoped>

</style>