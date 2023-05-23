<template>
    <div class="black_bg_box">
        <div class="white_bg_box">
            <div style="text-align: center;">
                <h4>계좌 등록</h4>
            </div>
            <div class="input_box_card">
                <input class="form-control text-center mt-5" type="text" v-model="state.account.accountNumber" placeholder="계좌번호 입력(-포함)">
                <input class="form-control text-center mt-3" type="text" v-model="state.account.bankName" placeholder="은행 입력">
                <input class="form-control text-center my-3" type="text" v-model="state.account.depositor" placeholder="계좌주 입력">
            </div>
    
            <div style="text-align: center;">
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
    props : {
        member : {
            type : Object,
            required : true
        },
    },
    setup(props, { emit }) {
        const state = reactive({
            member
            account: {}
        })

        const  execDaumPostcode=() => {
            new window.daum.Postcode({
                oncomplete: (data) => {
                if (data.userSelectedType === "R") {
                    // 사용자가 도로명 주소를 선택했을 경우
                    state.form.address = data.roadAddress;
                } else {
                    // 사용자가 지번 주소를 선택했을 경우(J)
                    state.form.address = data.jibunAddress;
                }
        
                // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
                if (data.userSelectedType === "R") {
                // 우편번호를 입력한다.
                state.form.zipCode = data.zonecode;}
                },
            }).open();
        }

        const submit = async () => {
            emit('close');
            const url = `/api/add/address/${state.form.memberNumber}`;
            const headers = {"Content-Type":"application/json"};
            const data = {
                name: state.form.name,
                zipCode: state.form.zipCode,
                address: state.form.address,
                subAddress: state.form.subAddress,
                phoneNumber: state.form.phoneNumber,
                memberNumber: state.form.memberNumber,
                defaultAddress: state.form.defaultAddress,
            };

            try {
                await axios.post(url, data, { headers });
                alert("주소가 등록되었습니다.");
                state.isModalViewed = false;
                location.reload();
            } catch (error) {
                if (error.response && error.response.status === 400) {
                    alert("주소는 3개까지만 등록 가능합니다.");
                } else {
                    alert("주소 등록에 실패했습니다.");
                }
            }
        }

        return { 
            state, 
            execDaumPostcode,
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
.address_input_box{
    margin: 0px auto;
    padding: 20px;
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