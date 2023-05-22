<template>
 <div class="black_bg_box">
    <div class="white_bg_box">
       <div style="text-align: center;">
         <h4>주소 찾기</h4>
        </div>
       <div class="address_input_box">
            <input class="form-control" type="text" v-model="state.form.name" style="margin-right: 15px; width: 200px;" id="name" placeholder="이름" aria-label="default input example"><br>

            <div style="display: flex; align-items: center;">
                <input class="form-control" type="text" v-model="state.form.zipCode" style="margin-right: 15px; width: 200px;" placeholder="우편번호" aria-label="default input example">
                <button type="button" class="btn btn-outline-dark" style="float: right;" @click="execDaumPostcode()" >우편번호 찾기</button>
            </div>
            <br>
            <input class="form-control" type="text" v-model="state.form.address" style="margin-right: 15px; width: 350px;" id="address" placeholder="주소" aria-label="default input example"><br>
            <input class="form-control" type="text" v-model="state.form.subAddress" style="margin-right: 15px; width: 350px;" id="detailAddress" placeholder="상세주소" aria-label="default input example"><br>
            <input class="form-control" type="text" v-model="state.form.phoneNumber" style="margin-right: 15px; width: 350px;" id="detailAddress" placeholder="전화번호" aria-label="default input example"><br>

            <div class="form-check">
                <input class="form-check-input" type="checkbox" v-model="state.form.defaultAddress" value="2" id="flexCheckDefault">
                <label class="form-check-label" for="flexCheckDefault">
                    기본 배송지로 설정
                </label>
            </div>
       </div>

       <div style="text-align: center;">
        <button type="button" class="btn btn-outline-success" @click="submit()">등록</button>
        <button type="button" class="btn btn-outline-success" @click="$emit('close')">닫기</button>
       </div>
      
    </div>
 </div>
</template>
<script>
import axios from 'axios';
import { reactive } from 'vue';


export default {
  setup(props, { emit }) {

        
        const state = reactive({
            // isModalViewed:true,
            form:{
                name:"",
                zipCode: "",
                address: "",
                subAddress:"",
                phoneNumber:"",
                memberNumber: sessionStorage.getItem("TOKEN"),
                defaultAddress:2
            }
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

        // const submit=()=> {
        //     emit('close');
        //     const headers = {"Content-Type":"application/json"};
        //     axios.post(`/api/add/address/${state.form.memberNumber}`, state.form,{headers}).then((res)=>{
        //         console.log(res);
        //         alert("주소가 등록되었습니다.");
        //         router.push({path:"/mypage", query:{memberNumber:state.token}});
        //     })
        // }

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

        return { state, execDaumPostcode,submit };
    },

    watch: {
            'state.form.defaultAddress': function (val) {
            if (val) {
                this.state.form.defaultAddress = 1;
            } else {
                this.state.form.defaultAddress = 2;
            }
        }    
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
    width: 50%;
    margin: 80px auto;
    background: white;
    border-radius: 10px;
    padding: 20px 0;
}

.address_input_box{
    margin: 0px auto;
    padding: 20px;
}
</style>