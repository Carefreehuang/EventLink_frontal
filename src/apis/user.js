import httpInstance from "@/utils/http"

export const loginAPI = ({username, password}) => {
    return httpInstance({
        url:'/user/login',
        method:'POST',
        // 就是使用的对象形式来进行发送
        data:{
            username,
            password
        }
    })
}