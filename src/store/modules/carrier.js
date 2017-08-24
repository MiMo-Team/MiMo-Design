// import {loginByEmail, logout, getInfo} from 'api/login';
import Cookies from 'js-cookie';

const carrier = {
    state: {
        userInfoCarrier:'',
        depot:{
            type:'',
            carrierData:null,
            searchVal:'',
            searchTit:'',
            searchUrl:''
        }
    },
    mutations: {
        //赋值 给 user-info-Carrier 载体，方便传递 user-info 值
        USERINFOCARRIER: (state, data) => {
            state.userInfoCarrier = data;
        },
        //传递 库类型
        DEPOTTYPECARRIER: (state, data) => {
            state.depot.type = data;
        },
        //传递 库数据
        DEPOTDATACARRIER: (state, data) => {
            state.depot.carrierData = data;
        },
        //传递出入库信息搜索值
        DEPOTSEARCHTITCARRIER: (state, data) => {
            state.depot.searchTit = data;
        },
        //传递出入库信息搜索标题
        TODEPOTSEARCHVALCARRIER: (state, data) => {
            state.depot.searchVal = data;
        },
        //传递出入库信息搜索路径
        TODEPOTSEARCHURLCARRIER: (state, data) => {
            state.depot.searchUrl = data;
        },
    },

    actions: {
        //挂载  userInfoCarrier
        userInfoCarrier({commit}, data) {
            commit('USERINFOCARRIER', data);
        },
        //挂载  库类型
        depotTypeCarrier({commit}, data) {
            commit('DEPOTTYPECARRIER', data);
        },
        //挂载  库数据
        depotDataCarrier({commit}, data) {
            commit('DEPOTDATACARRIER', data);
        },
        //挂载  传递出入库信息
        toDepotSearch({commit}, data) {
            commit('DEPOTSEARCHTITCARRIER', data.tit);
            commit('TODEPOTSEARCHVALCARRIER', data.val);
            commit('TODEPOTSEARCHURLCARRIER', data.url);
        },

    }
};

export default carrier;
