import Vue from 'vue'
import App from './App'
import api from 'common/api.js'
import store from './store/store.js'  
import util from 'common/util.js'  
let WebIM = require("utils/WebIM")["default"];

let conn = {
	closed: false,
	curOpenOpt: {},
	open(opt) {
        console.log("connconnconnconnconn")
		this.curOpenOpt = opt;
		WebIM.conn.open(opt);
		this.closed = false;
	},
	reopen() {
		if (this.closed) {
			//this.open(this.curOpenOpt);
			WebIM.conn.open(this.curOpenOpt);
			this.closed = false;
		}
	}
};

Vue.prototype.$im = WebIM;
Vue.prototype.$conn = conn;
Vue.prototype.$api = api;
Vue.prototype.$store = store
Vue.prototype.$util = util


Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
