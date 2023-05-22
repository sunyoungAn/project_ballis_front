<template>
    <div v-if="state.openmodal" class="admin_blackBg">
        <div class="admin_whiteBg_payment">
            <div class="modal-header">
                <h3 class="modal-title">결제상세정보</h3>
                <button type="button" class="btn-close" @click="closeModal()"></button>
            </div>
            <div class="modal-body">
                <hr>
                <div class="mb-3 ms-3">
                    <h4>| 결제수단</h4>
                    <h5 v-if="state.paymentType === 1" class="ps-5 py-2">카드 간편결제</h5>
                    <h5 v-else-if="state.paymentType === 2" class="ps-5 py-2">일반카드</h5>
                    <h5 v-else-if="state.paymentType === 3" class="ps-5 py-2">카카오페이</h5>
                    <h5 v-else class="ps-5 py-2">네이버페이</h5>
                </div>
                <div class="mb-3 ms-3">
                    <h4>| 결제금액</h4>
                    <h5 class="ps-5 py-2">{{ state.price }}원</h5>
                </div>
                <div class="mb-3 ms-3">
                    <h4>| 결제일</h4>
                    <h5 class="ps-5 py-2">{{ state.paymentDate }}</h5>
                </div>
                
            </div>

            <div class="modal-footer">   
                <button type="button" class="btn btn-success btn-lg" @click="closeModal()">닫기</button>
            </div>
        </div>
    </div>
</template>

<script>
import { onMounted, reactive } from 'vue'; 
import axios from 'axios';

export default {

    props : {
        openmodal : {
            type : Boolean
        },
        id : {
            type : Number
        }
    },
    

    setup (props, context) {
        const state = reactive({
            id : props.id,
            openmodal : props.openmodal,
            paymentType : '',
            price : 0,
            paymentDate : ''
        })

        const loadData = () => {

            console.log(state.id);
            console.log(state.openmodal);

            axios.get(`/api/admin/inventory/getpayment/${state.id}`).then((res)=>{
                console.log(res.data);
                state.paymentType = res.data.paymentType;
                state.price = changePriceFormat(res.data.price);
                state.paymentDate = changeDateFormat(res.data.registDate);
            }).catch(()=>{
            })

        }

        // 날짜형식변환 yyyy/mm/dd
        const changeDateFormat = (data) => {
            let date = new Date(data);
            let year = date.getFullYear();
            let month = ("0" + (1 + date.getMonth())).slice(-2);
            let day = ("0" + date.getDate()).slice(-2);

            return year + "/" + month + "/" + day;
        }

        // 금액형식변환 세자리마다 콤마추가
        const changePriceFormat = (data) => {
            return data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }

        const closeModal = () => {
            context.emit('closemodal', false);
        }

        // 모달창 열릴 때 불러와질예정
        onMounted(() => {
            loadData();
        })

        return {
            state,
            closeModal,
            changeDateFormat,
            changePriceFormat
        }
    }
}
</script>

<style lang="css" scoped>
@import "../assets/css/common.css";

</style>