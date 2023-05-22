<template>
    <div class="black_bg_box">
        <div class="white_bg_box">
            <button type="button" class="btn-close" id="close_btn" aria-label="Close" @click="$emit('close')"></button>

            <div class="head d-flex align-items-center" v-if="state.row">
                <h4>시세</h4>
                <img :src="state.row.imagePath" class="head_img" />
                <div class="d-flex flex-column ml-3">
                    <p>{{ state.row.productEngName }}</p>
                    <p style="color: #aeaeae;">{{ state.row.productKorName }}</p>
                </div>
            </div>
            
            <ul class="nav nav-pills nav-justified" id="pills-tab" role="tablist">
                <li class="nav-item" role="presentation">
                    <button class="nav-link active" id="pills-con-tab" data-bs-toggle="pill" data-bs-target="#con"
                    @click="state.type = 'con'">체결 거래</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="pills-sell-tab" data-bs-toggle="pill" data-bs-target="#sell"
                    @click="state.type = 'sell'">판매 입찰</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="pills-buy-tab" data-bs-toggle="pill" data-bs-target="#buy"
                    @click="state.type = 'buy'">구매 입찰</button>
                </li>
            </ul>
            
            <div class="tab-content" id="pills-tabContent">
                <div v-show="state.type === 'con'" class="tab-pane fade show active" id="con" role="tabpanel">
                    <ul class="info_head">
                        <li class="info_box">사이즈</li>
                        <li class="info_box">거래가</li>
                        <li class="info_box">거래일</li>
                    </ul>
                    <hr />
                    <div class="scroll">
                        <ul v-for="(tmp, i) in state.conRow.slice().reverse()" :key="i" class="info_body">
                            <li class="info_box" v-if="tmp.sellSize">{{ tmp.sellSize }}</li>
                            <li class="info_box" v-else>{{ tmp.buySize }}</li>
                            <li class="info_box">{{ changePriceFormat(tmp.price) }}원</li>
                            <li class="info_box">{{ tmp.contractDate }}</li>
                        </ul>
                    </div>
                </div>

                <div v-show="state.type === 'sell'" class="tab-pane fade" id="sell" role="tabpanel">
                    <ul class="info_head">
                        <li class="info_box">사이즈</li>
                        <li class="info_box">판매 희망가</li>
                        <li class="info_box">수량</li>
                    </ul>
                    <hr />
                    <div class="scroll">
                        <ul v-for="(tmp, i) in state.sellRow" :key="i" class="info_body">
                            <li class="info_box">{{ tmp.productSize }}</li>
                            <li class="info_box">{{ changePriceFormat(tmp.wishPrice) }}원</li>
                            <li class="info_box">{{ tmp.cnt }}</li>
                        </ul>
                    </div>
                </div>

                <div v-show="state.type === 'buy'" class="tab-pane fade" id="buy" role="tabpanel">
                    <ul class="info_head">
                        <li class="info_box">사이즈</li>
                        <li class="info_box">구매 희망가</li>
                        <li class="info_box">수량</li>
                    </ul>
                    <hr />
                    <div class="scroll">
                        <ul v-for="(tmp, i) in state.buyRow" :key="i" class="info_body">
                            <li class="info_box">{{ tmp.productSize }}</li>
                            <li class="info_box">{{ changePriceFormat(tmp.wishPrice) }}원</li>
                            <li class="info_box">{{ tmp.cnt }}</li>
                        </ul>
                    </div> 
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import { onMounted, reactive } from 'vue';

export default {
    props: {
        productId: {
            type: String,
            required: true
        },
        conRow: {
            type: Array,
            default: function() {
                return [];
            }
        },
        buyRow: {
            type: Array,
            default: function() {
                return [];
            }
        },
        sellRow: {
            type: Array,
            default: function() {
                return [];
            }
        },
    },
    setup(props) {

        const state = reactive({
            productId : props.productId,
            conRow: props.conRow,
            buyRow: props.buyRow,
            sellRow: props.sellRow,
            row: {},
            type: 'con'
        })

        const handleInfo = async() => {
            try{
                const res = await axios.get(`/api/get/product/one?productid=${state.productId}`);
                state.row = res.data[0];
                console.log("출력용 데이터", state.row);
                state.row.imagePath = `/api/product/display?name=${state.row.imagePath}`;
            }catch(err){
                console.error(err);
            }
        }

        // 금액형식변환 세자리마다 콤마추가
        const changePriceFormat = (data) => {
            if(!data) {
                return data
            }
            return data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }

        onMounted(()=>{
            handleInfo();
        })

        return { 
            state,
            changePriceFormat
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
    z-index: 9999;
    top:0;
    left: 0;
}
.white_bg_box {
    width: 30%;
    margin: 80px auto;
    background: white;
    border-radius: 10px;
    padding: 20px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
}

#close_btn {
    margin-left: auto; /* 수정: 버튼을 오른쪽에 위치 */
    margin-right: 10px;
}

.head {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin: 20px;
    justify-content: center;
}

.head h4 {
    flex-basis: 100%;
    text-align: center;
}
.head_img{
    width: 100px;
    height: 100px;
    margin: 5px;
    border-radius: 10px;
}
.head p{
    margin: 1px 8px;
}
.nav-link{
    margin: 10px;
}
.tab-content{
    width: 80%;
}
.info_head{
    display: flex;
    margin-top: 15px;
}
.scroll{
    max-height: 250px; 
    overflow-y: auto;
}
.info_body{
    display: flex;
}
.info_box{
    margin-right: 10px;
    flex: 1;
}
ul{
    list-style: none;
    margin: 0;
}
</style>