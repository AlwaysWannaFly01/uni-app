import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
Vue.prototype.checkLogin = function(backpage, backtype) {
	var SUID = uni.getStorageSync('SUID');
	var SRAND = uni.getStorageSync('SRAND');
	var SNAME = uni.getStorageSync('SNAME');
	var SFACE = uni.getStorageSync('SFACE');

	// backpage : 登录后返回的页面
	// backtype : 打开页面的类型[1 : redirectTo 2 : switchTab]

	if (SUID === '' || SRAND === '' || SFACE === '') {
		uni.redirectTo({
			url: "/pages/login/login?backpage=" + backpage + '&backtype=' + backtype
		})
		return false;
	}
	return [SUID, SRAND, SNAME, SFACE];
}
let APITOKEN = 'api2020';
Vue.prototype.apiServer = 'http://192.168.2.95/index.php?token=' + APITOKEN + '&c='
// Vue.prototype.apiServer = 'http://3o355g2195.wicp.vip/index.php?token=' + APITOKEN + '&c='

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()


