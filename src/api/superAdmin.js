import service from '../utils/request.js'

/**
 *  角色管理
 * ***/
// 角色列表
export const getAuthorityList = (data) => {
    return service({
        url: '/authority/getAuthorityList',
        method: 'post',
        data
    })
}

// 创建角色
export const createAuthority = (data) => {
    return service({
        url: '/authority/createAuthority',
        method: 'post',
        data
    })
}

// 修改角色
export const updateAuthority = (data) => {
    return service({
        url: '/authority/updateAuthority',
        method: 'put',
        data
    })
}

// 删除角色
export const deleteAuthority = (data) => {
    return service({
        url: '/authority/deleteAuthority',
        method: 'post',
        data
    })
}
