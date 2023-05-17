<template>
    <div class="container common_mt160 admin_wrap">
        <admin-sub-menu></admin-sub-menu>
        <div class="admin_content">
            <h1 class="mb-4">| 회원상세관리</h1>

            <!-- 입력 영역 -->
            <div class="admin_input_wrap my-5">
                <h3 class="mb-4">회원기본정보</h3>
                <div class="mb-4">
                    <label class="form-label fs-5">| 회원번호</label>
                    <div class="px-2 col-5">
                        <label class="form-label fs-5">{{ state.memberNumber }}</label>
                    </div>
                </div>
                <div class="mb-4">
                    <label class="form-label fs-5">| 이름</label>
                    <div class="px-2 col-5">
                        <input type="text" class="form-control" ref="uname" v-model="state.data.name"  maxlength="50">
                    </div>
                </div>
                <div class="mb-4">
                    <label class="form-label fs-5">| 이메일</label>
                    <div class="px-2 col-5">
                        <label class="form-label fs-5">{{ state.data.email }}</label>
                    </div>
                </div>
                <div class="mb-4">
                    <label class="form-label fs-5">| 비밀번호</label>
                    <div class="px-2 col-5">
                        <input type="password" class="form-control" placeholder="값을 입력한 경우에만 수정됩니다." v-model="state.password" maxlength="255">
                    </div>
                </div>
                <div class="mb-4">
                    <label class="form-label fs-5">| 휴대폰번호</label>
                    <div class="px-2 col-5">
                        <input type="text" class="form-control" ref="uphone" v-model="state.data.phoneNumber" maxlength="11" placeholder="-를 제외하고 입력해주세요">
                    </div>
                </div>
                <div class="mb-4">
                    <label class="form-label fs-5">| 성별</label>
                    <div class="px-2">
                        <div class="form-check form-check-inline me-5">
                            <input class="form-check-input" type="radio" v-model="state.data.gender" value=2>
                            <label class="form-check-label">남</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" v-model="state.data.gender" value=1>
                            <label class="form-check-label">여</label>
                        </div>
                    </div>
                </div>
                <div class="mb-4">
                    <label class="form-label fs-5">| 생년월일</label>
                    <div class="px-2 col-5">
                        <input type="date" class="form-control" v-model="state.data.birthDate">
                    </div>
                </div>
                <div class="mb-4">
                    <label class="form-label fs-5">| 가입일</label>
                    <div class="px-2 col-5">
                        <label class="form-label fs-5">{{ changeDateFormat(state.data.registDate) }}</label>
                    </div>
                </div>
                <div class="mb-4">
                    <label class="form-label fs-5">| 회원상태</label>
                    <div class="px-2 col-5">
                        <select class="form-select" v-model="state.data.memberStatus">
                            <option :value=1>관리자</option>
                            <option :value=2>일반회원</option>
                            <option :value=3>탈퇴</option>
                        </select>
                    </div>
                </div>

                <hr class="my-5">

                <h3 class="mb-4">회원정산계좌정보</h3>
                <div class="mb-4">
                    <label class="form-label fs-5">| 은행명</label>
                    <div class="px-2 col-4">
                        <input type="text" class="form-control" v-model="state.data.bankName" maxlength="20">
                    </div>
                </div>
                <div class="mb-4">
                    <label class="form-label fs-5">| 계좌번호</label>
                    <div class="px-2 col-5">
                        <input type="text" class="form-control" ref="uaccount" v-model="state.data.accountNumber" placeholder="-를 제외하고 입력해주세요" maxlength="20">
                    </div>
                </div>
                <div class="mb-4">
                    <label class="form-label fs-5">| 예금주</label>
                    <div class="px-2 col-4">
                        <input type="text" class="form-control" v-model="state.data.depositor" maxlength="50">
                    </div>
                </div>
                
                <hr class="my-5">

                <h3 class="mb-4">회원배송주소정보</h3>
                <ul class="list-group list-group-flush">
                    <li v-for="address of state.data.addressDtoList" :key="address" class="list-group-item my-1 px-0" >
                        <div class="row">
                            <div class="col-10">
                                <label class="fs-5 fw-bold me-1">{{ address.name }}</label><span v-if="address.defaultAddress === 1" class="badge rounded-pill bg-secondary">기본배송지</span><br>
                                <label class="fs-6">{{ changePhoneNumberFormat(address.phoneNumber) }}</label><br>
                                <label class="fs-6">({{ address.zipCode }})&nbsp;</label>
                                <label class="fs-6">{{ address.address }}&nbsp;</label>
                                <label class="fs-6">{{ address.subAddress }}</label>
                            </div>
                            <div class="col-2 d-flex align-items-center justify-content-center">
                                <div class="d-flex justify-content-center">
                                    <button class="btn btn btn-outline-success d-flex justify-content-center" @click="deleteAddress(address.id, address.defaultAddress)" >삭제</button>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
                
                <hr class="my-5">

                <h3 class="mb-4">회원카드정보</h3>
                <ul class="list-group list-group-flush">
                        <li v-for="card of state.data.cardDtoList" :key="card" class="list-group-item my-1 px-0" >
                            <div class="row">
                                <div class="col-10">
                                    <label class="fs-6 fw-bold">{{ changeCardFormat(card.cardNumber) }}</label><br>
                                    <label class="fs-6">{{ card.expiryYear }}&nbsp;/&nbsp;</label>
                                    <label class="fs-6">{{ card.expiryMonth }}</label>
                                </div>
                                <div class="col-2 d-flex align-items-center justify-content-center">
                                    <div class="d-flex justify-content-center">
                                        <button class="btn btn btn-outline-success d-flex justify-content-center" @click="deleteCard(card.id)">삭제</button>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>              
            </div>

            <!-- 버튼 영역 -->
            <div class="d-flex justify-content-center mt-3">
                <button class="btn btn-success btn-lg d-flex justify-content-end me-2" @click="edit()">수정하기</button>
                <button class="btn btn-success btn-lg d-flex justify-content-start ms-2" @click="moveMemberList()">목록으로</button>
            </div>

        </div>

    </div>
</template>

<script>
import AdminSubMenu from '@/components/AdminSubMenu.vue'
import { useRoute,useRouter } from 'vue-router';
import { reactive, ref } from 'vue';
import axios from "axios";
import { onMounted } from '@vue/runtime-core';

export default {
    name: 'SubMenu',
    components: {
        AdminSubMenu
    },
    setup () {

        const route = useRoute();
        const router = useRouter();

        const state = reactive({
            memberNumber : Number(route.query.memberNumber),
            data : '',
            password : '',
            form : {
                name : '',
                password : '',
                phoneNumber: '',
                gender : null,
                birthDate : '',
                memberStatus : null,
                bankName : '',
                accountNumber : '',
                depositor : ''
            }
        })

        const uname = ref();
        const uphone = ref();
        const uaccount = ref();

        // 회원상세내용
        const loadData = () => {

            console.log(state.memberNumber);

            axios.get(`/api/admin/member/getone/${state.memberNumber}`).then((res)=>{
                console.log(res.data);
                state.data = res.data;
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

        // 휴대폰번호형식변환 000-0000-0000
        const changePhoneNumberFormat = (data) => {
            return data.replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
        }
        
        // 카드번호 마스킹처리
        const changeCardFormat = (data) => {
            // return data.replace(/(?<=^(.{4})+)(?=.+)/g, '-'); // 0000-0000-0000-0000 형식
            let card1 = String(data.slice(0, 4));
            let mask_value = String(data.slice(4, 12));
            let card2 = String(data.slice(12, 16));
            let mask = '';

            for(var i=0; i < mask_value.length; i++){
                mask += '*';
            }

            return String(card1) + String(mask) + String(card2);
        }

        // 회원정보수정
        const edit = () => {

            // 유효성체크처리
            // 이름 필수입력체크
            if(state.data.name === '') {
                alert('이름을 입력해주세요.');
                uname.value.focus();
                window.scrollTo({top:'0', behavior:'smooth'});
                return false;
            }

            // 휴대폰번호 필수입력체크
            if(state.data.phoneNumber === '') {
                alert('휴대폰번호를 입력해주세요.');
                uphone.value.focus();
                window.scrollTo({top:'0', behavior:'smooth'});
                return false;
            }

            // 휴대폰번호 숫자체크
            if(isNaN(state.data.phoneNumber)) {
                alert('휴대폰번호는 숫자만 입력해주세요.');
                uphone.value.focus();
                window.scrollTo({top:'0', behavior:'smooth'});
                return false;
            }

            // 휴대폰번호 자릿수체크
            if(state.data.phoneNumber.length !== 11) {
                alert('휴대폰번호를 11자리 숫자로 입력해주세요.');
                uphone.value.focus();
                window.scrollTo({top:'0', behavior:'smooth'});
                return false;
            }

            // 계좌번호 숫자체크
            if(isNaN(state.data.accountNumber)) {
                alert('계좌번호는 숫자만 입력해주세요.');
                uaccount.value.focus();
                window.scrollTo({top:'1000', behavior:'smooth'});
                return false;
            }

            // form에 값 설정
            state.form.name = state.data.name;

            if(state.password === '') {
                state.form.password = null;
            } else {
                state.form.password = state.password;
            }
            state.form.phoneNumber = state.data.phoneNumber;
            state.form.gender = state.data.gender;
            state.form.birthDate = state.data.birthDate;
            state.form.memberStatus = state.data.memberStatus;
            state.form.bankName = state.data.bankName;
            state.form.accountNumber = state.data.accountNumber;
            state.form.depositor = state.data.depositor;

            axios.put(`/api/admin/member/edit/${state.memberNumber}`, state.form).then((res)=>{
                console.log(res);
                window.alert("회원정보가 성공적으로 수정되었습니다.");
                // 비밀번호값 초기화
                state.form.password = null;
                state.password = null;
                window.scrollTo({top:'0', behavior:'smooth'});
            }).catch(()=>{

                // 비밀번호값 초기화
                state.form.password = null;
                state.password = null;

                window.alert("회원정보수정 중 오류가 발생하였습니다. 다시 시도해주세요.");
            })

        }

        // 배송정보삭제
        const deleteAddress = (id, defaultAddress) => {

            if(confirm("선택한 주소를 삭제하시겠습니까?")) {

                // 기본배송지인경우는 삭제 불가
                if(defaultAddress === 1) {
                    window.alert("기본배송지로 설정된 주소는 삭제 할 수 없습니다.");
                    return false;
                }
            
                axios.delete(`/api/admin/member/delete/address/${id}`).then((res)=> {
                    console.log(res.data);
                    window.alert("주소정보가 정상적으로 삭제되었습니다.");
                    // window.location.reload(true)
                    loadData();
                }).catch(()=>{
                    window.alert("주소정보 삭제 중 오류가 발생하였습니다.");
                })
            }
        }

        // 카드정보삭제
        const deleteCard = (id) => {
            if(confirm("선택한 카드를 삭제하시겠습니까?")) {

                axios.delete(`/api/admin/member/delete/card/${id}`).then((res)=> {
                    console.log(res.data);
                    window.alert("카드정보가 정상적으로 삭제되었습니다.");
                    // window.location.reload(true)
                    loadData();
                }).catch(()=>{
                    window.alert("카드정보 삭제 중 오류가 발생하였습니다.");
                })
            }
        }

        // 목록으로
        const moveMemberList = () => {
            router.push({path:'/admin/member/list'});
        }

        // 화면로드시처리
        onMounted(()=>{
            loadData();
        });

        return {
            state,
            moveMemberList,
            changeDateFormat,
            changePhoneNumberFormat,
            changeCardFormat,
            edit,
            uname,
            uphone,
            uaccount,
            deleteAddress,
            deleteCard
        }
    }
}
</script>

<style lang="css" scoped>
@import "../assets/css/common.css";

</style>