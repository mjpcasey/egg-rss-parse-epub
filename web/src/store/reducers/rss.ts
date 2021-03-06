/**
 * 根据action的不同返回不同的state值给store
 * action对象 = {
 *   type: action的类别
 *   payload: 新的数据
 * }
 */

// 用来持久化数据的方法
import { getUserInfo, setUserInfo } from "../storage";
// 初始数据
let initState = {
    // 登录信息
    userInfo: getUserInfo()
}
export const rss = (state = initState, action: { type: any; payload: { userInfo: any; }; }) => {
    switch (action.type) {
        // 登录
        case 'LOGIN_IN':
            return { ...state, userInfo: setUserInfo(action.payload.userInfo) }
        // 退出账号
        case 'LOGIN_OUT':
            return { ...state, userInfo: null }
        // 修改账号资料
        case 'CHANGE_ACCOUNT':
            return { ...state, userInfo: setUserInfo(action.payload.userInfo) }
        default:
            return { ...state }
    }
}
