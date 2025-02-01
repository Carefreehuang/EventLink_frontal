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

export const logoutAPI = () => {
    return httpInstance({
        url:'/user/logout',
        method:'POST',
    })
}

export const fetchUserInfo = (id) => {
    // params是查询参数
    // return httpInstance({
    //     url:'/user',
    //     params:{
    //         id
    //     }
    // })
    return httpInstance({
        url:`/user/${id}`,
        method:'GET'
    })
}

export const updateUserInfo = (id, userData) => {
    console.log('userData',userData)
    // 解构赋值
    const {username, email, phone, schoolName, className, major} = userData
    return httpInstance({
        url:`/user/update/${id}`,
        method:'POST',
        data:{
            username,
            email,
            phone,
            schoolName,
            className,
            major
        }
    })
}
export const updateAvatar = (id, avatar) => {
    return httpInstance({
        url:`/user/updateUserAvatar/${id}?avatar=${avatar}`,
        method:'POST'
    })
}