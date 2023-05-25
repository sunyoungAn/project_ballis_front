<template>
    <div class="black_bg_box">
        <div class="white_bg_box">
            <div class="d-flex justify-content-center">
                <h4>카드 등록</h4>
            </div>
            <div class="input_box_card mx-3 ">
                <input class="form-control text-center mt-5" type="text" v-model="state.card.cardNumber" placeholder="카드 번호 입력(-제외)">
                <input class="form-control text-center mt-3" type="text" v-model="state.card.expiryYear" placeholder="카드 유효년(YY) 입력">
                <input class="form-control text-center my-3" type="text" v-model="state.card.expiryMonth" placeholder="카드 유효월(MM) 입력">
                <input class="form-control text-center my-3" type="text" v-model="state.card.name" placeholder="카드 소유주 입력">
            </div>
    
            <div class="d-flex justify-content-center mt-5">
                <button type="button" class="green_button btn mx-1" @click="submit()">등록</button>
                <button type="button" class="green_button btn" @click="$emit('close')">닫기</button>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import { reactive } from 'vue';

export default {
    emits: ['close', 'reload'],
    props : {
        member : {
            type : Object,
            required : true
        },
    },
    setup(props, { emit }) {
        const state = reactive({
            member: props.member,
            card: {}
        })

        const submit = async () => {
            axios.post(`/api/add/card/${state.member.memberNumber}`, state.card).then((res)=>{
                console.log(res);
                alert("카드 등록 완료");
                emit('reload');
                emit('close');
            }).catch((err)=>{
                console.log(err);
                window.alert("등록 실패");
            })
        }

        return { 
            state, 
            submit 
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
    z-index: 9999999;
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
.green_button {
    background-color: rgb(103, 194, 58);
    color: #ffffff;
}
.green_button:hover {
    background-color: rgb(149, 212, 117);
    color: #ffffff;
}
</style>