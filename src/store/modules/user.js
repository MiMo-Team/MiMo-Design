// import {loginByEmail, logout, getInfo} from 'api/login';
import Cookies from 'js-cookie';

const user = {
    state: {
        info: {
            token: '',
            account: '',
            pass: '',
            name: '',
            jobNum: '',
            email: '',
            sex: '',
            birthday: '',
            WeChat: '',
            mobile: '',
            status: '',
            roles: [],
            remarks: '',
            sign: '',
            avatar: '',
            entry_date: ''
        }
    },

    mutations: {
        SET_TOKEN: (state, token) => {
            state.info.token = token;
        },
        SET_ACCOUNT: (state, account) => {
            state.info.account = account;
        },
        SET_PASS: (state, pass) => {
            state.info.pass = pass;
        },
        SET_NAME: (state, name) => {
            state.info.name = name;
        },
        SET_JOBNUM: (state, jobNum) => {
            state.info.jobNum = jobNum;
        },
        SET_EMAIL: (state, email) => {
            state.info.email = email;
        },
        SET_SEX: (state, sex) => {
            state.info.sex = sex;
        },
        SET_BIRTHDAY: (state, birthday) => {
            state.info.birthday = birthday;
        },
        SET_WECHAT: (state, WeChat) => {
            state.info.WeChat = WeChat;
        },
        SET_MOBILE: (state, mobile) => {
            state.info.mobile = mobile;
        },
        SET_STATUS: (state, status) => {
            state.info.status = [];
            state.info.status = status;
        },
        SET_ROLES: (state, roles) => {
            state.info.roles.push(roles);
        },
        SET_REMARKS: (state, remarks) => {
            state.info.remarks = remarks;
        },
        SET_SIGN: (state, sign) => {
            state.info.sign = sign;
        },
        SET_AVATAR: (state, avatar) => {
            state.info.avatar = avatar;
        },
        ENTRYDATE: (state, date) => {
            state.info.entry_date = date;
        },
    },

    actions: {
        //挂载token
        Set_token({commit}, token) {
            commit('SET_TOKEN', token);
        },
        //登录
        Login({commit}, data) {
            commit('SET_TOKEN', data.token);
            commit('SET_ACCOUNT', data.account);
            commit('SET_PASS', data.pass);
            commit('SET_NAME', data.name);
            commit('SET_JOBNUM', data.jobNum);
            commit('SET_EMAIL', data.email);
            commit('SET_SEX', data.sex);
            commit('SET_BIRTHDAY', data.birthday);
            commit('SET_WECHAT', data.WeChat);
            commit('SET_MOBILE', data.mobile);
            commit('SET_STATUS', data.status);
            commit('SET_ROLES', data.roles);
            commit('SET_REMARKS', data.remarks);
            commit('SET_SIGN', data.sign);
            commit('SET_AVATAR', data.avatar);
            commit('ENTRYDATE', data.entry_date);
        },

        // 登出，清除store-token，userInfo，和localStorage-token
        LogOut({commit}) {
            commit('SET_TOKEN', '');
            Cookies.set('userInfo', '');
            localStorage.removeItem('mimo_broccoliSpringGcx_t_s');
        },

    }
};

export default user;
