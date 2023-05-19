<template>
    <div class="container common_mt160 cutomer_wrap">
        <div class="p_tag_box">
            <p>일대일문의</p>
            <hr>
        </div>
        <div class="input_box">
            <input class="form-control form-control-lg" style="text-align: center;" v-model="state.form.title"
                type="text" placeholder="문의 제목 입력" aria-label=".form-control-lg example">
            
            <br>

            <select class="form-select" v-model="state.form.category" style="width:150px" aria-label="Default select example">
                <option value="1">구매관련</option>
                <option value="2">판매관련</option>
                <option value="3">기타</option>
            </select>
             <br>
            <div class="form-floating">
                <textarea rows="6" class="form-control" v-model="state.form.content" id="floatingTextarea2" style="height: 300px;" ></textarea>
            </div>

            <br>

            <div class="mb-3">
             <input class="form-control" type="file" style="width: 300px;" @change="previewFiles($event)" multiple>
                {{state.imagePath}}
             <div class="image_box" style="display: flex; flex-wrap: wrap;">
                <div v-if="state.imagePreviews.length < 4" style="display: flex; flex-wrap: wrap;">
                    <div v-for="(preview, index) in state.imagePreviews" :key="index" style="flex: 1;">
                        <img :src="preview" alt="Preview Image" style="width: 100px; height: 100px;">
                    </div>
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
import { reactive, ref } from 'vue'
import axios from 'axios';
import { useRouter } from 'vue-router';

export default {
    setup () {
        
        const router = useRouter();

        const state = reactive({
            imagePreviews:[],
            form:{
                category:"",
                title : "",
                content: "",
                inquiryStatus:1,
                memberNumber: sessionStorage.getItem("TOKEN"),
                mainImageDiv:0,
                pageDiv:3,
                targetId:5, //임의의 값
                imagePath:[],
                uploadfiles:""
            },
            
        })

        const selectedFile =ref(null);

        const previewFiles = (event) =>{

            selectedFile.value = event.target.files;

            if(selectedFile.value.length > 3 ){
                alert("이미지는 최대 3개까지 등록 가능합니다.");
                event.target.files = null;
                return false;
            } 


            state.form.imagePath=[];
            for(let i=0; i<selectedFile.value.length; i++){
                //선택한 파일의 미리보기 이미지 생성
                const file = selectedFile.value[i];
                const reader = new FileReader();
                reader.onload=(event)=>{
                    const imagePreview =event.target.result;
                    if(state.imagePreviews.length<3){
                        state.imagePreviews.push(imagePreview);
                        state.form.imagePath.push(file.name); //이미지 파일 경로 추가
                    } else{
                        alert("이미지는 최대 3개까지만 등록 가능합니다.");
                    }
                };
                reader.readAsDataURL(file);
            }
        }
       
        const handleInsert = async () => {
            const url = `/api/add/inquiry`;
            const headers = {"Content-Type":"multipart/form-data"};
            const body = new FormData();
            body.append("title", state.form.title);
            body.append("category", state.form.category);
            body.append("content",state.form.content);
            body.append("inquiryStatus", state.form.inquiryStatus);
            body.append("memberNumber", state.form.memberNumber);
            body.append("mainImageDiv",state.form.mainImageDiv);
            body.append("pageDiv",state.form.pageDiv);
            body.append("targetId",state.form.targetId);
            
            for (let i = 0; i < selectedFile.value.length; i++) {
                const file = selectedFile.value[i];
                body.append("imagePath", file);
            }

            const {data} = await axios.post(url,body,{headers});
            console.log(data);
            window.alert("등록되었습니다");
            router.push({path:'/mypage/inquiry'});

        }

        return {
            state,
            previewFiles,
            selectedFile,
            handleInsert
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