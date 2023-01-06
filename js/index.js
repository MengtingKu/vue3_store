const baseUrl = `https://vue3-course-api.hexschool.io/v2`;
const api = ``;
import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

createApp({
    data() {
        return {
            user: {
                "username": "",
                "password": "",
            },
        }
    },
    methods: {
        signin() {
            if (this.user.username === "" || this.user.password === "") {
                alert(`請先填寫資料再登入`);
                return;
            };
            axios.post(`${baseUrl}/admin/signin`, this.user)
                .then((res) => {
                    alert(res.data.message);
                    const { token, expired } = res.data;
                    document.cookie = `tokenId=${ token }; expires=${ new Date(expired) }`;
                    const myCookie = document.cookie.replace(/(?:(?:^|.*;\s*)tokenId\s*\=\s*([^;]*).*$)|^.*$/, "$1");
                    axios.defaults.headers.common['Authorization'] = token;
                    console.log(token, expired);
                    setTimeout(() => {
                        window.location.replace("productList.html");
                    }, 100);

                })
                .catch((err) => {
                    alert(err.response.data.error.message);
                })
        }
    },
}).mount('#app')