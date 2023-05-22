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
                    <button type="button" style="float: right;" class="btn btn-outline-dark search_button" @click="showAddressAdd = true">+새 배송지 추가</button>
                </div>

                <div  v-for="tmp of state.address" :key="tmp">
                    <br>
                    <br>
                    <div  v-show="tmp.defaultAddress===1">
                        <span>{{ tmp.name }}  {{ tmp.phoneNumber }}</span><span class="badge rounded-pill bg-secondary">기본배송지</span><br>
                        <span>({{ tmp.zipCode }}){{ tmp.address }}  {{ tmp.subAddress }}</span>
                    </div>
                    <div  v-show="tmp.defaultAddress===2">
                        <span>{{ tmp.name }}  {{ tmp.phoneNumber }}</span><br>
                        <span>({{ tmp.zipCode }}){{ tmp.address }}  {{ tmp.subAddress }}</span>
                        <button type="button" class="btn btn-outline-dark search_button" @click="handleDelete(index, tmp.id)" >삭제</button>
                        <button type="button" class="btn btn-outline-dark search_button" @click="setDefaultAddress">기본배송지등록</button>
                    </div>
                </div>



                <hr>
                
                <div class="p_tag_box_2">
                    <p class="p_title">결제카드</p>
                    <p class="p_text">101-124-456-7594</p>
                    <p class="p_title">정산계좌</p>
                    <p class="p_text">000-00000-000000-0000</p>
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
            member : '',
            isModalViewed:false,
            address:[],
            defaultAddress:2,
        });


        const showAddressAdd = ref(false);





        //멤버 정보 불러오기
        const handleData = async()=> {
            const url = `/api/get/member?memberNumber=${state.token}`;
            const headers = {"Content-Type":"application/json", "auth" : state.token};
            const { data } = await axios.get(url,{headers});
            state.member = data;
            console.log(state.member);
          


            

        };

        //주소 불러오기
        const handleData1 = async()=> {
            const url = `/api/get/address/${state.token}`;
            const headers = {"Content-Type":"application/json", "auth" : state.token};
            const { data } = await axios.get(url,{headers});
            console.log(data);
            state.address = data;
            console.log(state.address);
        }
        
        const handleDelete= async (index, id)=>{
           if(confirm('삭제하시겠습니까?')){
            const url = `/api/delete/address/${id}`;
            const headers = {"Content-Type":"application/json"};
            const body={};
            const {data} = await axios.delete(url, {headers:headers, data:body});
            console.log(data);
            state.address.splice(index, 1);
           } 
        }

        onMounted(()=>{
            handleData();
            handleData1();
        })

        return {
            state,
            showAddressAdd,
            handleDelete
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

.search_button{
  float: right;
  border-radius: 0;
  margin-right : 5px
}
</style>