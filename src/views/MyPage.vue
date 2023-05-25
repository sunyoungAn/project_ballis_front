<template>
    <address-modal v-if="showAddressAdd" @close="showAddressAdd = false"/>
    <div class="container common_mt160">
      
        <section>
            <my-page-menu></my-page-menu>
            
            <article>
                <div class="p_tag_box">
                    <p>프로필정보</p>
                    <hr>
                </div>
                <br>
                <div class="p_tag_box_2">
                    <p class="p_title">이메일</p>
                    <p class="p_text">{{ state.member.email }}</p>

                    <p class="p_title">비밀번호</p>
                    <p class="p_text">{{ state.member.password ? '*'.repeat(state.member.password.length) : '' }}</p>
                </div>                
               
                <hr>

                <div class="p_tag_box_2">
                    <p class="p_title">이름</p>
                    <p class="p_text">{{ state.member.name }}</p>
                    
                    <p class="p_title">휴대폰 번호</p>
                    <p class="p_text">{{ state.member.phoneNumber }}</p>
                </div>                
                
                <hr>
                
                <div class="p_tag_box_2">
                    <p class="p_title" style="float: left;">배송지</p>
                    <button type="button" style="float: right;" class="btn btn-outline-dark mypage_button" @click="showAddressAdd = true">+새 배송지 추가</button>
                </div>

                <div  v-for="tmp of state.address" :key="tmp">
                    <br>
                    <br>
                    <div  v-show="tmp.defaultAddress===1">
                        <span>{{ tmp.name }}  {{ tmp.phoneNumber }}</span><span class="badge rounded-pill bg-secondary">기본배송지</span><br>
                        <span>({{ tmp.zipCode }}){{ tmp.address }}  {{ tmp.subAddress }}</span>
                        <button type="button" class="btn btn-outline-dark mypage_button" @click="handleDeleteAddress(index, tmp.id)" >삭제</button>
                    </div>
                    <div  v-show="tmp.defaultAddress===2">
                        <span>{{ tmp.name }}  {{ tmp.phoneNumber }}</span><br>
                        <span>({{ tmp.zipCode }}){{ tmp.address }}  {{ tmp.subAddress }}</span>
                        <button type="button" class="btn btn-outline-dark mypage_button" @click="handleDeleteAddress(index, tmp.id)" >삭제</button>
                        <button type="button" class="btn btn-outline-dark mypage_button" @click="updateDefaultAddress(tmp.id)">기본배송지등록</button>
                    </div>
                </div>

                <br>
                <br>


                <hr>
                <div class="p_tag_box_2" v-show="state.div1 === 1">
                    <button type="button" style="float: right;" class="btn btn-outline-dark mypage_button" @click="state.div1 = 2" v-if="!state.cards.length">추가</button>
                    <button type="button" style="float: right;" class="btn btn-outline-dark mypage_button" @click="handleDeletecard(state.cards[0].id)" v-if="state.cards.length">삭제</button>
                    <p class="p_title">결제카드</p>
                    <div v-for="tmp of state.cards" :key="tmp">
                        <span>{{ tmp.name }}</span> <br> <br>
                        <span>카드번호 : {{ tmp.cardNumber }} 유효일 : {{ tmp.expiryMonth }} / {{ tmp.expiryYear }} </span>
                    </div>
                </div>

                <div class="p_tag_box_2" v-show="state.div1 === 2">
                    <p class="p_title">카드추가</p>
                    <div class="input_box_card">
                        <input class="form-control form-control-lg text-center" style=" margin-bottom: 5px; text-align: start;" type="text" v-model="state.card.cardNumber" placeholder="카드번호 입력(-포함)">
                        <input class="form-control form-control-lg text-center" style=" margin-bottom: 5px; text-align: start;" type="text" v-model="state.card.expiryYear" placeholder="카드 유효년(YY) 입력">
                        <input class="form-control form-control-lg text-center" style=" margin-bottom: 5px; text-align: start;" type="text" v-model="state.card.expiryMonth" placeholder="카드 유효월(MM) 입력">
                        <input class="form-control form-control-lg text-center" style=" margin-bottom: 5px; text-align: start;" type="text" v-model="state.card.name" placeholder="카드 소유주 입력">
                    </div>
                    <button type="button" style="float: right;" class="btn btn-outline-dark mypage_button" @click="state.div1 = 1">취소</button>
                    <button type="button" style="float: right;" class="btn btn-outline-dark mypage_button" @click=handleInsertcard()>등록</button>
                </div>
                
                <br>

                <hr>
                <div class="p_tag_box_2" v-show="state.div === 1">
                    <button type="button" style="float: right;" class="btn btn-outline-dark mypage_button" @click="state.div = 2" v-if="!state.member.accountNumber">추가</button>
                    <button type="button" style="float: right;" class="btn btn-outline-dark mypage_button" @click="handleDeleteAccount(state.member.memberNumber)" v-if="state.member.accountNumber">삭제</button>
                    <p class="p_title">정산계좌</p>
                    <span>{{state.member.depositor}} {{state.member.bankName}} {{ state.member.accountNumber }}</span>
                </div>

                <div class="p_tag_box_2" v-show="state.div === 2">
                    <p class="p_title">계좌추가</p>
                    <div class="input_box_card">
                        <input class="form-control form-control-lg text-center" style=" margin-bottom: 5px; text-align: start;" type="text" v-model="state.account.accountNumber" placeholder="계좌번호 입력(-포함)">
                        <input class="form-control form-control-lg text-center" style=" margin-bottom: 5px; text-align: start;" type="text" v-model="state.account.bankName" placeholder="은행 입력">
                        <input class="form-control form-control-lg text-center" style=" margin-bottom: 5px; text-align: start;" type="text" v-model="state.account.depositor" placeholder="계좌주 입력">
                    </div>
                    <button type="button" style="float: right;" class="btn btn-outline-dark mypage_button" @click="state.div = 1">취소</button>
                    <button type="button" style="float: right;" class="btn btn-outline-dark mypage_button" @click=handleInsertAccount()>등록</button>
                </div>
            </article>
        </section>
    </div>
   
</template>

<script>
import { onMounted, reactive, ref } from 'vue'
import axios from 'axios';
import MyPageMenu from '../components/MyPageMenu.vue';
import AddressModal from '../components/AddressModal.vue';


export default {
  components: { MyPageMenu, AddressModal },
    setup () {
        const state = reactive({
            token : sessionStorage.getItem("TOKEN"),
            member : [],
            isModalViewed:false,
            address:[],
            defaultAddress:"",
            cards:[],
            div : 1,
            div1 : 1,
            accounts:[],
            account :{
                accountNumber:"",
                bankName:"",
                depositor:""
            },
            card : {
                cardNumber:"",
                expiryMonth:"",
                expiryYear:"",
                name:""
            }
        });


        const showAddressAdd = ref(false);





        //멤버 정보 불러오기
        const handleData = async()=> {
            const url = `/api/get/member?memberNumber=${state.token}`;
            const headers = {"Content-Type":"application/json", "auth" : state.token};
            const { data } = await axios.get(url,{headers});
            state.member = data;
            state.cards = data.cards;
            console.log("회원정보: ", state.member);
            console.log("카드정보: ", state.cards);
        };

        //주소 불러오기
        const handleData1 = async()=> {
            const url = `/api/get/address/${state.token}`;
            const headers = {"Content-Type":"application/json", "auth" : state.token};
            const { data } = await axios.get(url,{headers});
            state.address = data;
            console.log("주소: ", state.address);
        }
        
        //배송지 삭제
        const handleDeleteAddress= async (index, id)=>{
           if(confirm('삭제하시겠습니까?')){
            const url = `/api/delete/address/${id}`;
            const headers = {"Content-Type":"application/json"};
            const body={};
            const {data} = await axios.delete(url, {headers:headers, data:body});
            console.log(data);
            state.address.splice(index, 1);
           } 
        }

        //기본배송지설정
        const updateDefaultAddress = async (id) => {
            const url = `/api/update/address/${state.token}/${id}`;
            const headers = {"Content-Type":"application/json"};
            const body = new FormData();
            body.append("defaultAddress", state.defaultAddress);
            const {data} = await axios.put(url,body,{headers});
            console.log(data);
            handleData1();
        }

        //계좌 등록
        const handleInsertAccount = ()=>{
           axios.post(`/api/add/account/${state.token}`, state.account).then((res)=>{
            console.log(res);
            window.alert("계좌 등록 완료");
            state.div=1;
            handleData();
           }).catch((err)=>{
            console.log(err);
            window.alert("등록 실패");
           })
        }

        //계좌삭제
        const handleDeleteAccount = async (id) => {
            if(confirm('삭제하시겠습니까?')){
            const url = `/api/delete/account/${id}`;
            const headers = {"Content-Type":"application/json"};
            const body={};
            const {data} = await axios.delete(url, {headers:headers, data:body});
            console.log(data);
            state.div=1;
            handleData();
           } 
        }

        //카드 등록
        const handleInsertcard = () => {
            axios.post(`/api/add/card/${state.token}`, state.card).then((res)=>{
            console.log(res);
            window.alert("카드 등록 완료");
            state.div1=1;
            handleData();
           }).catch((err)=>{
            console.log(err);
            window.alert("등록 실패");
           })
        }

        const handleDeletecard = async (id) => {
            if(confirm('삭제하시겠습니까?')){
            const url = `/api/delete/card/${id}`;
            const headers = {"Content-Type":"application/json"};
            const body={};
            const {data} = await axios.delete(url, {headers:headers, data:body});
            console.log(data);
            state.div1=1;
            handleData();
           } 
        }
        onMounted(()=>{
            handleData();
            handleData1();
        })

        return {
            state,
            showAddressAdd,
            handleDeleteAddress,
            updateDefaultAddress,
            handleInsertAccount,
            handleDeleteAccount,
            handleInsertcard,
            handleDeletecard
        }
    },

}



</script>

<style lang="css" scoped>
 @import "../assets/css/common.css";

section{
  display: grid;
  grid-template-columns: 200px auto;

}

article {
  padding:20px;
  /* border: 1px solid blue; */
}

.mypage_button{
  float: right;
  border-radius: 0;
  margin-right : 5px
}

.input_box_card{
  width: 40%;
  height: 50%;
  display: inline-block; 
}
</style>