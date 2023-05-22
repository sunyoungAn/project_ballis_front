<template>
    <div class="black_bg_box">
        <div class="white_bg_box">
            <button type="button" class="btn-close float-end mx-3" @click="$emit('close')"></button>
            <div style="text-align: center;">
                <h4>주소록</h4>
            </div>
   
            <div class="addressList" v-for="(tmp, i) in state.addressList" :key="i">
                <div @click="$emit('select',tmp), $emit('close')">
                    <hr />
                    <button v-if="tmp.defaultAddress === 1" class="btn btn-sm float-end mx-5">기본배송지</button>
                    <p class="fw-bold mx-3 mt-2">{{ tmp.name }}</p>
                    <p class="mx-3 my-0">{{ tmp.phoneNumber }}</p>
                    <p class="mx-3 mb-2">({{ tmp.zipCode }}) {{ tmp.address }} {{ tmp.subAddress }}</p>
                </div>
            </div>
            
        </div>
    </div>
</template>
<script>
import { reactive } from 'vue';

export default {
    props: {
        addressList: {
            type: Array,
            required: true
        }
    },
    setup(props) {
        const state = reactive({
            memberNumber : 1, // 로그인 구현 후 수정
            addressList : props.addressList
        })

        return { 
            state
        };
    }
    
}
   
</script>
<style lang="css" scoped>
.black_bg_box{
    width:100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    position: fixed;
    z-index: 9999;
    top:0;
    left: 0;
}
.white_bg_box{
    width: 500px;
    margin: 80px auto;
    background: white;
    border-radius: 10px;
    padding: 20px 0;
}
.btn {
    border: 1px solid #cccccc
}
hr{
    width: 90%;
    margin: 15px auto;
}
</style>