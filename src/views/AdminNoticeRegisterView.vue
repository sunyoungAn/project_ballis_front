<template>
    <div class="container common_mt160 admin_wrap">
        <admin-sub-menu></admin-sub-menu>
        <div class="admin_content">
            <h1 class="mb-4">| 공지사항등록</h1>

            <!-- 입력 영역 -->
            <div class="admin_input_wrap my-5">
                <div class="mb-4">
                    <label class="form-label fs-5">| 공지제목</label>
                    <div class="px-2">
                        <input type="text" class="form-control" v-model="state.form.title" placeholder="공지제목">
                    </div>
                </div>
                <div class="my-4">
                    <label class="form-label fs-5">| 공지내용</label>
                    <QuillEditor ref="editor" v-model:content="state.form.content" content-type="html" toolbar="minimal" theme="snow" style="height:500px;"/>
                </div>
            </div>

            <!-- 버튼 영역 -->
            <div class="d-flex justify-content-center mt-3">
                <button class="btn btn-success btn-lg d-flex justify-content-end me-2" @click="save()">공지등록</button>
                <button class="btn btn-success btn-lg d-flex justify-content-start ms-2" @click="moveNoticeList()">목록으로</button>
            </div>

        </div>
    </div>
</template>

<script>
import AdminSubMenu from '@/components/AdminSubMenu.vue'
import { useRouter } from 'vue-router';
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { reactive } from 'vue';
import axios from "axios";

export default {
    name: 'SubMenu',
    components: {
        AdminSubMenu,
        QuillEditor
    },

    setup () {

        // 페이지 이동 라우트
        const router = useRouter();

        const state = reactive({
            form: {
                title : "",
                content : ""
            }
        })

        // 공지등록
        const save = () => {
            axios.post("/api/admin/notice/register", state.form).then((res)=>{
                console.log(res);
                window.alert("공지사항이 성공적으로 등록되었습니다.");
                router.push({path:'/admin/notice/list'});
            }).catch(()=>{
                window.alert("공지사항등록 중 오류가 발생하였습니다. 다시 시도해주세요.");
            })
        }
        
        // 목록으로
        const moveNoticeList = () =>{
            router.push({path:'/admin/notice/list'});
        }

        return {
            state,
            save,
            moveNoticeList
        }
    }
}
</script>

<style lang="css" scoped>
@import "../assets/css/common.css";

</style>