<template>
    <div class="container common_mt160 cutomer_wrap">
        <div class="p_tag_box">
            <p>리뷰 작성</p>
            <hr>
        </div>
        <div class="input_box">
            <br>
            <div class="form-floating">
                <textarea rows="6" class="form-control" v-model="state.form.content" id="floatingTextarea2" style="height: 300px;" ></textarea>
            </div>

            <br>

            <!-- <div class="mb-3">
             <input class="form-control" type="file" style="width: 300px;" @change="mainImage($event)" >
             <div class="image_box" style="display: flex; flex-wrap: wrap;">
                <div v-if="state.imagePreviews.length < 4" style="display: flex; flex-wrap: wrap;">
                    <div v-for="(preview, index) in state.imagePreviews" :key="index" style="flex: 1;">
                        <img :src="preview" alt="Preview Image" style="width: 100px; height: 100px;">
                    </div>
                </div>
             </div>
            </div>
            <div class="mb-3">
             <input class="form-control" type="file" style="width: 300px;" @change="subImage($event)" multiple>
            </div> -->

            <div class="mb-3">
                <input class="form-control" type="file" style="width: 300px;" @change="mainImage($event)">
                <div class="image_box" style="display: flex; flex-wrap: wrap;">
                    <div v-show="state.mainImagePreview" style="flex: 1;">
                        <img :src="state.mainImagePreview"  style="width: 100px; height: 100px;">
                    </div>
                </div>
                </div>

                <div class="mb-3">
                <input class="form-control" type="file" style="width: 300px;" @change="subImage($event)" multiple>
                <div class="image_box" style="display: flex; flex-wrap: wrap;">
                    <div v-for="(preview, index) in state.subImagePreviews" :key="index" style="flex: 1;">
                    <img :src="preview" :alt="'Sub Image ' + (index + 1)" style="width: 100px; height: 100px;">
                    </div>
                </div>
            </div>
        </div>
        <div style="float: right; margin-right: 15%;">
            <button type="button" class="btn btn-outline-success" @click="handleInsert()">등록</button>
        </div>
       
    </div>
</template>

<script>
import { reactive } from 'vue'
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';

export default {
    setup () {
        
        const router = useRouter();
        const route = useRoute();

        const state = reactive({
            mainImagePreview:null,
            subImagePreviews:[],
            subImagedata : [],
            form:{
                memberNumber: sessionStorage.getItem("TOKEN"),
                name:"",
                productId: Number(route.query.productid),
                content: "",
                dataStatus:1,
                mainImageDiv:1,
                pageDiv:3,
                targetId:5, //임의의 값
                imagePath:[],
                subImages:[],
                uploadfiles:""
            },
            
        })

        const selectedFile =[];

        const mainImage = (event) => {
            selectedFile.value = event.target.files;

            if (selectedFile.value.length > 1) {
                alert("메인 이미지는 1개만 등록 가능합니다.");
                event.target.value = null;
                return false;
            }

            const file = selectedFile.value[0];
            state.mainImagePreview = [];
            const reader = new FileReader();
            reader.onload = (event) => {
                const imagePreview = event.target.result;
                state.mainImagePreview = imagePreview;
                state.form.imagePath = [file.name]; // 메인 이미지 파일 경로 추가
                console.log("대표이미지", state.form.imagePath);
            };
            reader.readAsDataURL(file);
            };

            const subImage = (event) => {
                const files = event.target.files;

                if (files.length > 2) {
                    alert("서브 이미지는 최대 2개까지 등록 가능합니다.");
                    event.target.value = null;
                    return false;
                }
                console.log(files);

                state.subImagePreviews = [];
                state.subImagedata = [];
                for (let i = 0; i < files.length; i++) {
                    const file = files[i];
                    console.log("파일", file);
                    const reader = new FileReader();
                    reader.onload = (event) => {
                        const imagePreview = event.target.result;
                        state.subImagePreviews.push(imagePreview);
                        state.subImagedata.push(file); // 서브 이미지 파일 경로 추가
                        console.log("서브이미지:", state.subImagedata);
                    };
                    reader.readAsDataURL(file);
                }
            };


        const handleInsert = async () => {
            const url = `/api/add/review?productid=${state.form.productId}`;
            const headers = {"Content-Type":"multipart/form-data"};
            const body = new FormData();
            body.append("memberNumber", state.form.memberNumber);
            body.append("name", state.form.name);
            body.append("productId", state.form.productId);
            body.append("content",state.form.content);
            body.append("dataStatus", state.form.dataStatus);
            body.append("mainImageDiv",state.form.mainImageDiv);
            body.append("pageDiv",state.form.pageDiv);
            body.append("targetId",state.form.targetId);

            // for (let i = 0; i < selectedFile.value.length; i++) {
            //     const file = selectedFile.value[i];
            //     body.append("imagePath", file);
            //     body.append("subImage", file);
            // }

            // 메인 이미지 등록
            if (selectedFile.value && selectedFile.value.length > 0) {
                const mainImageFile = selectedFile.value[0];
                body.append("imagePath", mainImageFile);
                console.log("메인이미지파일등록", mainImageFile);
            }

            // 서브 이미지 등록
            if (state.subImagedata && state.subImagedata.length > 0) {
                for (let i = 0; i < state.subImagedata.length; i++) {
                    const subImageFile = state.subImagedata[i];
                    body.append("subImage", subImageFile);
                }
            }
            const {data} = await axios.post(url,body,{headers});
            console.log(data);
            alert("등록되었습니다");
            router.push({path:'/mypage/buyingend'});
        }

        return {
            state,
            mainImage,
            subImage,
            selectedFile,
            handleInsert,
        }
    }
}
</script>

<style lang="css" scoped>
@import "../assets/css/common.css";

textarea {
  resize: none;
}


</style>