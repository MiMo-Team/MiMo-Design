import Cookies from 'js-cookie';

const test = {
    state: {
        showInFather2:false,
        showInFatherInfo:{
            childName:  '新视窗',
            childNumber: '0',
        }
    },
    mutations: {
        SHOWINFATHER2: (state, data) => {
            state.showInFather2 = data;
        },
        SHOWINFATHERNAME: (state, data) => {
            state.showInFatherInfo.childName = data;
        },
        SHOWINFATHERNUMBER: (state, data) => {
            state.showInFatherInfo.childNumber = data;
        },
    },

    actions: {
        //挂载  showInFather2
        showInFather2({commit}, data) {
            commit('SHOWINFATHER2', data);
        },
        showInFatherInfo({commit}, data) {
            commit('SHOWINFATHERNAME', data.childName);
            commit('SHOWINFATHERNUMBER', data.childNumber);
        },
    }
};

export default test;
