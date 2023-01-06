import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

const baseUrl = `https://vue3-course-api.hexschool.io/v2`;
const api = `qwe1234`;

createApp({
    // 資料 data → 一定要用函式起手，回傳物件  
    data() {
        return {
            products: [],
            productDetail: {},
        }
    },
    // 方法(事件觸發) methods → 物件    
    methods: {
        isAdmin() {
            axios.post(`${baseUrl}/api/user/check`)
                .then((res) => {
                    console.log(res);
                    this.getProductList();
                })
                .catch((err) => {
                    console.log(err);
                    setTimeout(() => {
                        window.location.replace("login.html");
                    }, 100);
                })
        },
        getProductList() {
            axios.get(`${baseUrl}/api/${api}/admin/products/all`)
                .then((res) => {
                    console.log(res.data.products);
                    this.products = res.data.products;
                })
                .catch((err) => {
                    console.log(err.response.data.message);
                })
        },
        showProductDetail(item) {
            this.productDetail = { ...item };
            console.log(item);
        },
        singout() {
            var now = new Date();
            now.setMonth(now.getMonth() - 1);
            // axios.post(`${baseUrl}/logout`,{})
            // .then((res)=>{
            //     console.log(res.data);
            // })
            // .catch((err)=>{
            //     console.log(err);
            // })
        }
    },
    // 生命週期 created → 一定要用函式起手，回傳物件
    created() {
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)tokenId\s*=\s*([^;]*).*$)|^.*$/, '$1');
        axios.defaults.headers.common.Authorization = token;
        this.isAdmin();
    }
}).mount('#app')

