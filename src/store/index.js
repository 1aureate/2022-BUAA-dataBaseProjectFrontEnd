Vue.use(Vuex);
 
//  store.js 中都mutation中增加添加和删除token的方法
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
	uid:localStorage.getItem('uid') ? localStorage.getItem('uid'):'',
	isLogin:localStorage.getItem('isLogin') ? localStorage.getItem('isLogin'):'',
	identity:localStorage.getItem('identity') ? localStorage.getItem('identity'):'',
	token:localStorage.getItem('token') ? localStorage.getItem('token'):'',   // token
	username:localStorage.getItem('username') ? localStorage.getItem('username'):'',   // token
	formal:localStorage.getItem('formal') ? localStorage.getItem('formal'):'', 
}

export default new Vuex.Store({
	state,
	mutations:{
		$_setInfo(state, value) {
			state.info = value;
			localStorage.setItem('info', value);
		}
		,
		$_setStorage(state, value) {
			state.isLogin = 'true';
			state.identity = value.identity;
			console.log(state.identity);
			state.username = value.uname; 
			state.token = value.token;
			state.uid = value.uid;
			state.formal = value.formal;
			localStorage.setItem('isLogin', 'true');
			localStorage.setItem('identity', value.identity);
			localStorage.setItem('token', value.token);
			localStorage.setItem('username', value.uname);
			localStorage.setItem('uid', value.uid);
			localStorage.setItem('formal', value.formal);
		},
		$_removeStorage(state) {
			state.isLogin = false;
			state.identity = 'not-login';
			state.username = '';
			state.token = '';
			state.info = {};
			state.uid = '';
			state.formal = false;
			localStorage.setItem('isLogin', 'false');
			localStorage.setItem('identity', 'not-login');
			localStorage.setItem('token', '');
			localStorage.setItem('username', '');
			localStorage.setItem('info', {});
			localStorage.setItem('uid', '');
			localStorage.setItem('formal', false);
		}
	}
})
