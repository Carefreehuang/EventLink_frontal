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

export const registerAPI = ({username, password, email, phone, schoolName, major}) => {
    return httpInstance({
        url:'/user/register',
        method:'POST',
        data:{
            username,
            password,
            email,
            phone,
            schoolName,
            major
        }
    })
}