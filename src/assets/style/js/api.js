import Http from './axios'
// import http from './axios_mock'

export async function Login (login){
    const Login = await Http({

        // url:'/position/40.10038,116.36867'
        url:'/login',
        method:'POST',
        data:{
            username:login.name,
            password:login.psd
        }
    })
    // console.log(position);
    return Login;
    
}

export async function left_menus (){
    const menus = await Http({
        url:'/menus'
    })
    return menus.data;
    
}

export async function user (queryInfo){
    const user = await Http({
        url:'/users',
        params:
            queryInfo
        
    })
    // console.log(user);
    return user;
    
}

export async function Switch (id,type){
    const Switch = await Http({
        url:`users/${id}/state/${type}`,
        method:'PUT',
        
    })
    return Switch;
    
}


export async function addUser (info){
    const userInfo = await Http({
        url:'/users',
        method:'POST',
        data:info
        
    })
    return userInfo;
    
}


export async function editUser (v){
    const editUser = await Http({
        url:`/users/${v.id}`,
        method:'PUT',
        data:{
            email:v.email,
            mobile:v.mobile
        }
    })
    return editUser;
}

export async function getUser (id){
    const getUser = await Http({
        url:`/users/${id}`,
    })
    return getUser;
}

export async function delUser (id){
    const delUser = await Http({
        url:`/users/${id}`,
        method:'delete'
    })
    return delUser;
}

export async function getRight (){
    const getRight = await Http({
        url:`rights/list`,
        method:'GET'
    })
    return getRight;
}

export async function getRightT (){
    const getRightT = await Http({
        url:`rights/tree`,
        method:'GET'
    })
    return getRightT;
}

export async function getRoles (){
    const getRoles = await Http({
        url:`roles`,
        method:'GET'
    })
    return getRoles;
}
export async function addRoles (data){
    const addRoles = await Http({
        url:`roles`,
        method:'POST',
        data:data
    })
    return addRoles;
}
export async function RemoveRoles (role){
    const RemoveRoles = await Http({
        url:`roles/${role.id}`,
        method:'delete',
    })
    return RemoveRoles;
}

export async function removeDuty(roleId,rightId){
    const removeD = await Http(
        {
            url:`roles/${roleId}/rights/${rightId}`,
            method:'delete',

        }
    )
    return removeD
}

export async function registerDuty(roleId,rids){
    const registerDuty = await Http(
        {
            url:`roles/${roleId}/rights`,
            method:'POST',
            data:{
                rids
            }
        }
    )
    return registerDuty
}

export async function setRoles(roleId,rid){
    const setRoles = await Http(
        {
            url:`users/${roleId}/role`,
            method:'PUT',
            data:{
                rid
            }
        }
    )
    return setRoles
}

/* 商品分类 */

export async function getCategories (queryInfo){
    const getCategories = await Http({
        url:`categories`,
        params:queryInfo
    })
    return getCategories;
}

export async function GetSecondCategories (queryInfo){
    const GetSecondCategories = await Http({
        url:`categories`,
        params:{
            type:2
        }
    })
    return GetSecondCategories;
}

export async function addCategories (queryInfo){
    const addCategories = await Http({
        url:`categories`,
        method:'POST',
        data:queryInfo
    })
    return addCategories;
}