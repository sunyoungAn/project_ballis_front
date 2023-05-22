<template>
    <div v-if="state.openmodal" class="admin_blackBg">
        <div class="admin_whiteBg_payment_delivery">
            <div class="modal-header">
                <h3 class="modal-title">결제/배송상세정보</h3>
                <button type="button" class="btn-close" @click="closeModal()"></button>
            </div>
            <div class="modal-body">
                <hr>
                <!-- 결제정보 -->
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

                <!-- 배송정보 -->
                <div class="mb-3 ms-3">
                    <h4>| 받는사람</h4>
                    <h5 class="ps-5 py-2">{{ state.name }}</h5>
                </div>
                <div class="mb-3 ms-3">
                    <h4>| 휴대폰번호</h4>
                    <h5 class="ps-5 py-2">{{ changePhoneNumberFormat(state.phoneNumber) }}</h5>
                </div>
                <div class="mb-3 ms-3">
                    <h4>| 배송주소</h4>
                    <h5 class="ps-5 py-2">{{ '(' + state.zipCode +') ' + state.address + ' ' + state.subAddress }}</h5>
                </div>
                <div class="mb-3 ms-3">
                    <h4>| 배송메세지</h4>
                    <h5 v-if="state.message !== null && state.message !== ''" class="ps-5 py-2">{{ state.message }}</h5>
                    <h5 v-else class="ps-5 py-2">없음</h5>
                </div>
            </div>
            <div class="modal-footer">   
                <button type="button" class="btn btn-success btn-lg" @click="closeModal()">Close</button>
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

    setup ( props, context ) {
        
        const state = reactive({
            id : props.id,
            openmodal : props.openmodal,
            paymentType : '',
            price : '',
            paymentDate : '',
            name : '',
            phoneNumber : '',
            address : '',
            subAddress : '',
            zipCode : '',
            message : ''
        })

        const loadData = () => {

            axios.get(`/api/admin/contract/getpayment/${state.id}`).then((res)=>{
                console.log(res.data);
                state.paymentType = res.data.paymentType;
                state.price = changePriceFormat(res.data.price);
                state.paymentDate = changeDateFormat(res.data.registDate);
                state.name = res.data.name;
                state.phoneNumber = res.data.phoneNumber;
                state.address = res.data.address;
                state.subAddress = res.data.subAddress;
                state.zipCode = res.data.zipCode;
                state.message = res.data.message;
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

        // 휴대폰번호형식변환 000-0000-0000
        const changePhoneNumberFormat = (data) => {
            return data.replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
        }

        // 모달창 닫기
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
            changePhoneNumberFormat
        }
    }
}
</script>

<style lang="css" scoped>
@import "../assets/css/common.css";

.modal_input {
    width: 250px;
}

.modal_input_long {
    width: 600px;
}

.modal_input_address {
    width: 700px;
}
</style>