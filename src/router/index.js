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

// 로그인제어
router.beforeEach((to, from, next)=>{
  console.log(to, from);

  // 로그인, 로그아웃이 아닌경우에만
  if(to.path !== '/member/login' && to.path !== '/member/logout') {

    // 로그인 되어 있어야 하는 페이지들체크
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
    }

  }

  next();

})

export default router
