<template>
    <address-modal v-if="state.isModalViewed"></address-modal>
    <div class="container common_mt160 cutomer_wrap">
      
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
                    <button type="button" style="float: right;" class="btn btn-success" @click="clickModal()">+새 배송지 추가</button>
                </div>

                <div  v-for="tmp of state.address" :key="tmp">
                    <br>
                    <div  v-if="tmp.defaultAddress===1">
                        <span>{{ tmp.name }}  {{ tmp.phoneNumber }}</span><br>
                        <span>({{ tmp.zipCode }}){{ tmp.address }}  {{ tmp.subAddress }}</span>
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
import { onMounted, reactive } from 'vue'
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
            address:'',
        });




        const clickModal = () =>{
            if(state.isModalViewed === true) {
                state.isModalViewed = false;
            } else {
                state.isModalViewed = true;
            }
        }

        const handleData = async()=> {
            const url = `/api/get/member/${state.token}`;
            const headers = {"Content-Type":"application/json", "auth" : state.token};
            const { data } = await axios.get(url,{headers});
            state.member = data;
            console.log(state.member);
            
            // try {
            //     const response = await axios.get(url, { headers });
            //     const data = response.data;
            //     console.log(data);
            //     state.member = data;
            // } catch (error) {
            //     console.log(error);
            // }
            
            
            
        };

        const handleData1 = async()=> {
            const url = `/api/get/address/${state.token}`;
            const headers = {"Content-Type":"application/json", "auth" : state.token};
            const { data } = await axios.get(url,{headers});
            console.log(data);
            state.address = data;
            console.log(state.address);
        }

        onMounted(()=>{
            handleData();
            handleData1();
        })

        return {
            state,
            clickModal,
        }
    },

}



</script>

<style lang="css" scoped>
 @import "../assets/css/common.css";

section{
  display: grid;
  grid-template-columns: 200px auto;
  border: 2px solid gray;
}

article {
  padding:20px;
  /* border: 1px solid blue; */
}
</style>