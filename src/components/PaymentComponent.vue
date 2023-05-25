<template>
    <div v-if="state.type === 'sell'">
        <button class="btn btn-secondary w-100 fs-5 fw-bold p-3" @click="requestPay">즉시 판매하기</button>
    </div>
    <div v-else>
        <button class="btn btn-secondary w-100 fs-5 fw-bold p-3" @click="requestPay">결제하기</button>
    </div>
</template>

<script>
import { reactive, watchEffect, onMounted } from 'vue';
import axios from 'axios';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
    props : {
        address : {
            type : Object,
            required : true
        },
        type : {
            type : String,
            required : true
        },
        sellingDto : {
            type : Object,
            default : null
        },
        showPayment: {
            type: Boolean,
            required: true
        },
        delivery: {
            type: String,
            default : ''
        },
        payMethod: {
            type: Number,
            default: 0
        },
        depositor: {
            type: String,
            default : ''
        }
    },
    setup (props) {

        const store = useStore();
        const router = useRouter();
        
        const state = reactive({
            item : "",
            address : {},
            message : "",
            merchantUid: "", // 주문번호
            impUid: "", // 결제번호
            
            type : "",
            contract : {}, 
            selling : {},
            
            memberNumber : sessionStorage.getItem("TOKEN"),
            member : "",
            buyer: "",
            depositor: "",
            
            paymentType : 0, // 1:카드 간편결제 2:일반카드 3:카카오페이 4:네이버페이
            finalPrice : 0,
        })


        watchEffect(() => {
            state.item = store.getters.getSelectedItem;
            state.address = props.address;
            state.type = props.type;
            state.selling = props.sellingDto;
            state.message = props.delivery;
            state.paymentType = props.payMethod;
            state.depositor = props.depositor;
            if(state.type === 'fast' || state.type === 'normal') { // 구매-빠른배송, 즉시구매
                state.contract = {
                    productId : state.item.id,
                    buyingId : null,
                    sellingId : state.item.sellingId,
                    buyerNumber : state.memberNumber,
                    sellerNumber : state.item.sellerNumber,
                    price : state.item.sellWishPrice,
                    productSize : state.item.sellProductSize
                }
            } else if(state.type === 'sell') { // 판매-즉시판매 (보관판매는 null)
                state.contract = {
                    productId : state.item.id,
                    buyingId : state.item.buyingId,
                    sellingId : null,
                    buyerNumber : state.item.buyerNumber,
                    sellerNumber : state.memberNumber,
                    price : state.item.buyWishPrice,
                    productSize : state.item.buyProductSize // 이게 있나?
                }
            }
            // console.log("선택한주소", state.address.address)
            // console.log("멤버정보", state.member)
            // console.log("셀링받아왔나", state.selling);
            // console.log("콘트랙트", state.contract);
            console.log("아이템 정보", state.item);
            // console.log("배송요청", state.message);
        });

        // 주문번호 생성
        const setMerchantUid = () => {
            const timestamp = Date.now();
            state.merchantUid = `${timestamp}_${state.memberNumber}`;
        }
        // 카드 간편 결제시 결제번호 생성
        const setImpUid = () => {
            const timestamp = Math.floor(Date.now()/100).toString(); // 11자리 맞추기
            state.impUid = `imp_${timestamp}${state.memberNumber}`;
        }

        // 빠른배송 구매 and 즉시구매 and 즉시판매->거래체결 테이블에 저장, 보관판매->거래체결 테이블에 저장x
        const contractDto = state.type === 'keep' ? null : state.contract;
        const sellingDto = state.type === 'keep' ? state.selling : null;

        // 구매시 최종가격
        if(state.type === 'fast') { // 빠른배송
            state.finalPrice = Math.floor(state.item.sellWishPrice + state.item.sellWishPrice*0.015 + 5000);
        } else if(state.type === 'normal') { // 즉시구매
            state.finalPrice = Math.floor(state.item.sellWishPrice + state.item.sellWishPrice*0.015 + 3000);
        } else if(state.type ==='sell') { // 즉시판매
            state.finalPrice = Math.floor(state.item.buyWishPrice + state.item.buyWishPrice*0.03 + 3000);
        } else { // 보관판매-창고 이용료만 결제
            state.finalPrice = 0;
        }

        // 회원 데이터 
        const handleData = async()=> {
            const url = `/api/get/member?memberNumber=${state.memberNumber}`;
            const headers = {"Content-Type":"application/json", "auth" : state.memberNumber};
            const { data } = await axios.get(url,{headers});
            state.member = data;
            console.log("회원정보: ", state.member);
        };

        // 즉시판매의 경우 구매자 데이터 필요
        if(state.type === 'sell') {
            const handleBuyer = async() => {
                const url = `/api/get/member?memberNumber=${state.item.buyerNumber}`;
                const headers = {"Content-Type":"application/json", "auth" : state.item.buyerNumber};
                const { data } = await axios.get(url,{headers});
                state.buyer = data;
                console.log("구매자정보: ", state.buyer);
                // console.log("구매자 주소", state.buyer.addresss);
            }

            onMounted(()=>{
                handleBuyer();
            })
        }


        const IMP = window.IMP; 
        IMP.init("imp26282104"); // 상점id

        const requestPay = async() => {
            if(!state.address.address) {
                alert('주소를 입력하세요.')
                return false
            }
            if(state.paymentType === 0) {
                alert('결제 방법을 선택하세요.')
                return false
            }
            if(state.type === 'fast' || state.type === 'normal') {// 구매-빠른배송, 즉시구매
                if(state.paymentType === 1) { // 카드 간편 결제
                    if(confirm('확인을 누르면 선택하신 카드로 즉시 결제됩니다.')) {
                        const url = `/api/add/payment?type=${state.type}`;
                        const headers = { "Content-Type": "application/json" };
                        const data = {
                            contractDto,
                            sellingDto,
                            paymentDto : {        
                                impUid: state.impUid, // 결제번호
                                merchantUid: state.merchantUid, // 주문번호
                                contractId : null,
                                sellingId : state.item.sellingId,
                                memberNumber : state.memberNumber,
                                name : state.member.name, 
                                address : state.address.address,
                                subAddress : state.address.subAddress,
                                zipCode : state.address.zipCode,
                                phoneNumber : state.address.phoneNumber, 
                                message : state.message, 
                                paymentType : state.paymentType,
                                price : state.finalPrice
                            }
                        }
                        console.log("간편결제 바디",data);
                        const res = await axios.post(url, data, {headers});
                        console.log("간편결제 완료", res);
                        if(res.status === 200) {
                            router.push({
                                path : '/buying/complete',
                                query : {
                                    productid: state.item.id,
                                    type : state.type
                                }
                            })
                        }
                    }
                } else { // 카카오 페이
                    IMP.request_pay(
                        {
                            pg: 'kakaopay',
                            pay_method: 'card',
                            merchant_uid: state.merchantUid,
                            name: state.item.productKorName, // 상품명
                            amount: state.finalPrice, // 결제가격
                            buyer_email: state.member.email, 
                            buyer_name: state.member.name,  
                            buyer_tel: state.member.phoneNumber, 
                            buyer_addr: state.address.address + state.address.subAddress,
                            buyer_postcode: state.address.zipCode,
                        },

                        async (rsp) => {
                            console.log("알에스피", rsp);
                            if (rsp.success) {
                                const url = `/api/add/payment?type=${state.type}`;
                                const headers = { "Content-Type": "application/json" };
                                const data = {
                                    contractDto,
                                    sellingDto,
                                    paymentDto : {        
                                        impUid: rsp.imp_uid, // 결제번호
                                        merchantUid: rsp.merchant_uid, // 주문번호
                                        contractId : null,
                                        sellingId : state.item.sellingId,
                                        memberNumber : state.memberNumber,
                                        name : state.member.name, 
                                        address : state.address.address,
                                        subAddress : state.address.subAddress,
                                        zipCode : state.address.zipCode,
                                        phoneNumber : state.address.phoneNumber, 
                                        message : state.message, 
                                        paymentType : state.paymentType,
                                        price : state.finalPrice
                                    }
                                }
                                console.log("카카오 바디",data);
                                const res = await axios.post(url, data, {headers});
                                console.log("카카오 결제 완료", res);
                                if(res.status === 200) {
                                    router.push({
                                        path : '/buying/complete',
                                        query : {
                                            productid: state.item.id,
                                            type : state.type
                                        }
                                    })
                                }
                            } else {
                                alert(`결제에 실패하였습니다. 에러 내용: ${rsp.error_msg}`);
                            }
                        } 
                    )
                }
            } else if (state.type ==='keep') { // 판매-보관판매
                if(!state.depositor) {
                    alert('판매 정산 계좌를 입력하세요.')
                    return false
                }
                if(state.paymentType === 1) { // 카드 간편 결제
                    if(confirm('확인을 누르면 선택하신 카드로 즉시 결제됩니다.')) {
                        const url = `/api/add/payment?type=${state.type}`;
                        const headers = { "Content-Type": "application/json" };
                        const data = {
                            contractDto,
                            sellingDto,
                            paymentDto : {        
                                impUid: state.impUid, // 결제번호
                                merchantUid: state.merchantUid, // 주문번호
                                contractId : null,
                                sellingId : null,
                                memberNumber : state.memberNumber,
                                name : state.member.name, 
                                address : state.address.address,
                                subAddress : state.address.subAddress,
                                zipCode : state.address.zipCode,
                                phoneNumber : state.address.phoneNumber, 
                                message : state.message, 
                                paymentType : state.paymentType,
                                price : 3000
                            }
                        }
                        console.log("간편결제 바디",data);
                        const res = await axios.post(url, data, {headers});
                        console.log("간편 결제 완료", res);
                        if(res.status === 200) {
                            router.push({
                                path : '/selling/complete',
                                query : {
                                    productid: state.selling.productId,
                                    type : state.type
                                }
                            })
                        }
                    }
                } else { // 카카오 페이
                    IMP.request_pay(
                        {
                            pg: 'kakaopay',
                            pay_method: 'card',
                            merchant_uid: state.merchantUid,
                            name: '창고 이용료', // 상품명
                            amount: 3000, // 창고이용료 
                            buyer_email: state.member.email, 
                            buyer_name: state.member.name,  
                            buyer_tel: state.member.phoneNumber, 
                            buyer_addr: state.address.address + state.address.subAddress,
                            buyer_postcode: state.address.zipCode,
                        },

                        async (rsp) => {
                            console.log("알에스피", rsp);
                            if (rsp.success) {
                                const url = `/api/add/payment?type=${state.type}`;
                                const headers = { "Content-Type": "application/json" };
                                const data = {
                                    contractDto,
                                    sellingDto,
                                    paymentDto : {        
                                        impUid: rsp.imp_uid, // 결제번호
                                        merchantUid: rsp.merchant_uid, // 주문번호
                                        contractId : null,
                                        sellingId : null,
                                        memberNumber : state.memberNumber,
                                        name : state.member.name, 
                                        address : state.address.address,
                                        subAddress : state.address.subAddress,
                                        zipCode : state.address.zipCode,
                                        phoneNumber : state.address.phoneNumber, 
                                        message : state.message, 
                                        paymentType : state.paymentType,
                                        price : 3000
                                    }
                                }
                                console.log("카카오 바디",data);
                                const res = await axios.post(url, data, {headers});
                                console.log("카카오 결제 완료", res);
                                if(res.status === 200) {
                                    router.push({
                                        path : '/selling/complete',
                                        query : {
                                            productid: state.selling.productId,
                                            type : state.type
                                        }
                                    })
                                }
                            } else {
                                alert(`결제에 실패하였습니다. 에러 내용: ${rsp.error_msg}`);
                            }
                        } 
                    )
                }
            } else if (state.type === 'sell') { // 즉시판매
                if(!state.depositor) {
                    alert('판매 정산 계좌를 입력하세요.')
                    return false
                }
                const url = `/api/add/payment?type=${state.type}`;
                const headers = { "Content-Type": "application/json" };
                const data = {
                    contractDto,
                    sellingDto,
                    paymentDto : {        
                        impUid: state.ImpUid, // 결제번호
                        merchantUid: state.merchantUid, // 주문번호
                        contractId : null,
                        sellingId : null,
                        memberNumber : state.item.buyerNumber,
                        name : state.buyer.name,
                        address : state.buyer.addresss[0].address,
                        subAddress : state.buyer.addresss[0].subAddress,
                        zipCode : state.buyer.addresss[0].zipCode,
                        phoneNumber : state.buyer.addresss[0].phoneNumber, 
                        message : state.message, 
                        paymentType : state.paymentType,
                        price : state.finalPrice
                    }
                }
                console.log("즉시판매 바디",data);
                const res = await axios.post(url, data, {headers});
                console.log("즉시판매 결제 완료", res);
                if(res.status === 200) {
                    router.push({
                        path : '/selling/complete',
                        query : {
                            productid: state.selling.productId,
                            type : state.type
                        }
                    })
                }     
            }
        }

        onMounted(()=>{
            if(props.showPayment){
                requestPay();
            }
            handleData();
            setMerchantUid();
            setImpUid();
        })

        return {
            state,
            requestPay
        }
    }
}
</script>

<style lang="scss" scoped>

</style>