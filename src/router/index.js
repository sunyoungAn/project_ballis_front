import { createRouter, createWebHistory } from 'vue-router'

import store from '../store/index';

import MainView from '../views/MainView.vue'
import ProductListView from '../views/ProductListView'
import ProductOneView from '../views/ProductOneView'

import BuyingSizeView from '../views/BuyingSizeView'
import BuyingMethodView from '../views/BuyingMethodView'
import BuyingPaymentView from '../views/BuyingPaymentView'
import BuyingCompleteView from '../views/BuyingCompleteView'

import SellingSizeView from '../views/SellingSizeView'
import SellingMethodView from '../views/SellingMethodView'
import SellingPaymentView from '../views/SellingPaymentView'
import SellingCompleteView from '../views/SellingCompleteView'

import UserLogin from '../views/UserLogin.vue'
import UserJoin from '../views/UserJoin.vue'
import UserFind from '../views/UserFind.vue'
import PasswordFind from '../views/PasswordFind.vue'
import Notice from '../views/NoticeView.vue'
import NoticeContent from '../views/NoticeContent.vue'
import MyPage from '../views/MyPage.vue'
import MyPageInquiry from '../views/MyPageInquiry.vue'
import MyPageInquiryContent from '../views/MyPageInquiryContent.vue'
import MyPageInquiryInsert from '../views/MyPageInquiryInsert.vue'
import UserLogout from '../views/UserLogout.vue'
import Buying from '../views/BuyingView.vue'
import BuyingIng from '../views/BuyingIngView.vue'
import BuyingEnd from '../views/BuyingEndView.vue'
import Selling from '../views/SellingView.vue'
import SellingIng from '../views/SellingIngView.vue'
import SellingEnd from '../views/SellingEndView.vue'
import WishProduct from '../views/WishProductView.vue'
import Inventory from '../views/InventoryView.vue'
import ReviewInsert from '../views/ReviewInsertView.vue'

// 관리자기능
import AdminProductListView from '../views/AdminProductListView.vue'
import AdminMemberListView from '../views/AdminMemberListView.vue'
import AdminProductRegisterView from '../views/AdminProductRegisterView.vue'
import AdminMemberEditView from '../views/AdminMemberEditView.vue'
import AdminInquiryListView from '../views/AdminInquiryListView.vue'
import AdminInquiryReplyView from '../views/AdminInquiryReplyView.vue'
import AdminNoticeListView from '../views/AdminNoticeListView.vue'
import AdminReviewListView from '../views/AdminReviewListView.vue'
import AdminSellingListView from '../views/AdminSellingListView.vue'
import AdminBuyingListView from '../views/AdminBuyingListView.vue'
import AdminInventoryListView from '../views/AdminInventoryListView.vue'
import AdminContractListView from '../views/AdminContractListView.vue'
import AdminNoticeRegisterView from '../views/AdminNoticeRegisterView.vue'
import AdminNoticeEditView from '../views/AdminNoticeEditView.vue'
import AdminProductEditView from '../views/AdminProductEditView.vue'

const routes = [
  {
    path: '/',
    name: 'main',
    component: MainView
  },
  {
    path: '/product/list',
    name: 'productlist',
    component: ProductListView
  },
  {
    path: '/product/one',
    name: 'productone',
    component: ProductOneView
  },
  {
    path: '/buying/size',
    name: 'buyingsizes',
    component: BuyingSizeView
  },
  {
    path: '/buying/method',
    name: 'buyingmethod',
    component: BuyingMethodView
  },
  {
    path: '/buying/payment',
    name: 'buyingpaymnet',
    component: BuyingPaymentView
  },
  {
    path: '/buying/complete',
    name: 'buyingcomplete',
    component: BuyingCompleteView
  },
  {
    path: '/selling/size',
    name: 'sellingsizes',
    component: SellingSizeView
  },
  {
    path: '/selling/method',
    name: 'sellingmethod',
    component: SellingMethodView
  },
  {
    path: '/selling/payment',
    name: 'sellingpayment',
    component: SellingPaymentView
  },
  {
    path: '/selling/complete',
    name: 'sellingcomplete',
    component: SellingCompleteView
  },
  {path: '/member/login', component: UserLogin},
  {path: '/member/join', component: UserJoin},
  {path: '/email/find', component: UserFind},
  {path: '/password/find', component: PasswordFind},
  {path: '/notice', component: Notice},
  {path: '/notice/content', component: NoticeContent},
  {path: '/mypage', component: MyPage},
  {path: '/mypage/inquiry', component: MyPageInquiry},
  {path: '/mypage/inquiry/content', component: MyPageInquiryContent},
  {path: '/mypage/inquiry/insert', component: MyPageInquiryInsert},
  {path: '/member/logout', component: UserLogout},
  {path: '/mypage/buying', component: Buying},
  {path: '/mypage/buyinging', component: BuyingIng},
  {path: '/mypage/buyingend', component: BuyingEnd},
  {path: '/mypage/selling', component: Selling},
  {path: '/mypage/sellinging', component: SellingIng},
  {path: '/mypage/sellingend', component: SellingEnd},
  {path: '/mypage/wish', component: WishProduct},
  {path: '/mypage/inventory', component: Inventory},
  {path: '/mypage/buying/review', component: ReviewInsert},
  {
    path: '/admin/product/list',
    name: 'adminproductlist',
    component: AdminProductListView
  },
  {
    path: '/admin/member/list',
    name: 'adminmemberlist',
    component: AdminMemberListView
  },
  {
    path: '/admin/product/register',
    name: 'adminproductregister',
    component: AdminProductRegisterView
  },
  {
    path: '/admin/member/edit',
    name: 'adminmemberedit',
    component: AdminMemberEditView
  },
  {
    path: '/admin/inquiry/list',
    name: 'admininquirylist',
    component: AdminInquiryListView
  },
  {
    path: '/admin/inquiry/reply',
    name: 'admininquiryreply',
    component: AdminInquiryReplyView
  },
  {
    path: '/admin/notice/list',
    name: 'adminnoticelist',
    component: AdminNoticeListView
  },
  {
    path: '/admin/review/list',
    name: 'adminreviewlist',
    component: AdminReviewListView
  },
  {
    path: '/admin/selling/list',
    name: 'adminsellinglist',
    component: AdminSellingListView
  },
  {
    path: '/admin/buying/list',
    name: 'adminbuyinglist',
    component: AdminBuyingListView
  },
  {
    path: '/admin/inventory/list',
    name: 'admininventorylist',
    component: AdminInventoryListView
  },
  {
    path: '/admin/contract/list',
    name: 'admincontractlist',
    component: AdminContractListView
  },
  {
    path: '/admin/notice/register',
    name: 'adminnoticeregister',
    component: AdminNoticeRegisterView
  },
  {
    path: '/admin/notice/edit',
    name: 'adminnoticeedit',
    component: AdminNoticeEditView
  },
  {
    path: '/admin/product/edit',
    name: 'adminproductedit',
    component: AdminProductEditView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior () { // TODO 페이지 이동시 바로 위에 와있게끔 할 것
    return { 
      top:0
     }
  }
})




router.beforeEach((to, from, next)=>{
  console.log(to, from);
  // 홈에 있다가 주문하기 누를때 로그인이 안되어 있다면 로그인페이지로 가야하는데 
  // 로그인 이후 이전페이지로 보내면 로그인 페이지로 이동
  // 로그인, 로그아웃은 되돌아가려는 페이지가 아니다! 기록하면 안됨
  if(to.path !== '/login' && to.path !=='/logout'){
      // 서버 : 포트번호/itemcontent
      sessionStorage.setItem("CURRENT_PATH", to.path);
      // 저장소에는 object 타입 저장 불가능->stringify로 문자로 바꿔줌 ex) ? no=580
      sessionStorage.setItem("QUERY", JSON.stringify(to.query));
      // sessionStorage에 각각의 페이지 방문할때 마다 저장
      // url의 앞부분(/itemcontent)은 path에 ?뒷부분(no=580)은 query에 보관!

      // 주문하기 눌렀을때 바로 로그인 페이지로 넘어가면 로그인 이후 이전페이지로 보내면 다시 주문수량 선택하는 페이지(itemcontent)로 옴. 주문 정보가 기록이 안된것! 
      // 주문하는 정보 기록하기 위해 보여주지 않아도 주문페이지(order)로 갔다가 로그인 페이지로 가야함. 
      // 로그인 되어야 표시되는 페이지들 ex)주문페이지... or로 다른 페이지 더 넣어도됨!
      if(to.path === '/order' || to.path === "/test" ) { // ||는 or의 의미
          const logged = store.getters.getLogged;
          // 로그인 여부를 store에서 받아옴
          console.log(logged);
          if(logged === false) { // 로그인 되어 있지 않으면
              next({path:'/login'}); // 강제로 페이지 변경
              return; // 함수종료, 아래쪽 next 수행하지 않기 위해서
          }
      }

      // /boardselect = > /boardselect?page=1&text= (변경해야함)
      // /boardselect?page=2&text=a (변경하면 안됨)
      console.log('누르는 page', to.query)
      if((to.path === '/boardselect') && (Object.keys(to.query).length === 0)) {
          // next({path:'/boardselect1'});
          next({path:'/boardselect', query:{page:1, text:''}});
          return;
      }
      // if문 안에 들어간 이유는 현재 로그인, 로그아웃 창으로 이동하는 상황이 아니기 때문에 if문 돌아가게 되어있음
      // 이 상황에서 if문 바깥에 짜면 안에서 return되는 상황이라 boardselect로 보낼 수가 없다!

      if((to.path === '/itemselect') && (Object.keys(to.query).length === 0)) {
          next({path:'/itemselect', query:{page:1}});
          return;
      }
  }
  next(); // next가 없으면 페이지 이동이 안됨. () 안에 페이지가 없으면 기존에 이동하고자 하는 페이지로 이동.
});



// 로그인제어
router.beforeEach((to, from, next)=>{
  console.log(to, from);

  // 로그인, 로그아웃이 아닌경우에만
  if(to.path !== '/member/login' && to.path !== '/member/logout') {
    
    sessionStorage.setItem("CURRENT_PATH", to.path);
    sessionStorage.setItem("QUERY", JSON.stringify(to.query));

    if(to.path !== '/' && to.path !== '/product/list'
    && to.path !== '/product/one' && to.path !== '/member/join'
    && to.path !== '/email/find' && to.path !== '/password/find'
    && to.path !== '/notice' && to.path !== '/notice/content') {
      
      const logged = store.getters.getLogged;
      console.log(logged);

      // 로그인이 안되어 있다면 로그인페이지로 보냄
      if(logged === false) {
        window.alert('로그인 후 이용해주세요');
        next({path:'/member/login'}); // 강제로 로그인페이지로 변경
        return; // 함수종료, 아래쪽 next를 수행하지 않기 위해서
      }

      // 관리자 체크
      if(to.path === '/admin/product/list' || to.path === '/admin/member/list'
        || to.path === '/admin/product/register' || to.path === '/admin/member/edit'
        || to.path === '/admin/inquiry/list' || to.path === '/admin/inquiry/reply'
        || to.path === '/admin/notice/list' || to.path === '/admin/review/list'
        || to.path === '/admin/selling/list' || to.path === '/admin/buying/list'
        || to.path === '/admin/inventory/list' || to.path === '/admin/contract/list'
        || to.path === '/admin/notice/register' || to.path === '/admin/notice/edit'
        || to.path === '/admin/product/edit') {
        const memberStatus = store.getters.getMemberStatus;
        if(memberStatus !== 1) { // 로그인 유저가 관리자가 아닌경우
          window.alert('이용권한이 없습니다.');
          next({path:'/'}); // 강제로 메인페이지로 이동
          return; // 함수종료, 아래쪽 next를 수행하지 않기 위해서
        }
      }
    }
  }

  next();

})

export default router
