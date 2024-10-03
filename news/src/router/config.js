import Center from '@/views/Center'
import Home from '@/views/Home'
import NewsAdd from '@/views/news-manage/NewsAdd.vue'
import NewsList from '@/views/news-manage/NewsList.vue'
import NewsEdit from '@/views/news-manage/NewsEdit.vue'
import ProductAdd from '@/views/product-manage/ProductAdd.vue'
import ProductList from '@/views/product-manage/ProductList.vue'
import UserAdd from '@/views/user-manage/UserAdd.vue'
import UserList from '@/views/user-manage/UserList.vue'
import NotFound from '@/views/NotFound'

const routes = [
    {
        path: '/home',
        name: "Home",
        component: Home
    },
    {
        path: '/center',
        name: "Center",
        component: Center
    },
    {
        path: '/news-manage/addnews',
        name: "NewsAdd",
        component: NewsAdd
    },
    {
        path: '/news-manage/newslist',
        name: "NewsList",
        component: NewsList
    },
    {
        path: '/news-manage/newsedit',
        name: "NewsEdit",
        component: NewsEdit
    },
    {
        path: '/product-manage/addproduct',
        name: "ProductAdd",
        component: ProductAdd
    },
    {
        path: '/product-manage/productlist',
        name: "ProductList",
        component: ProductList
    },
    {
        path: '/user-manage/adduser',
        name: "UserAdd",
        component: UserAdd,
        flag:'user-manage'
    },
    {
        path: '/user-manage/userlist',
        name: "UserList",
        component: UserList,
        flag:'user-manage'
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound
    },
]

export default routes