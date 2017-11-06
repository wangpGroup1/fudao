// import tools from "./tools";
import userStore from "../mobx/userStore";

/**
 * network request
 */
const request = {

	/**
	 * GET请求，返回Json数据。
	 *
	 * 支持方法重载：
	 * getJson(url, callback)
	 * getJson(url, params, callback)
	 *
	 * @param url 请求地址，type：string
	 * @param params 请求类型
	 * @param callback 回调方法， type: function
	 */
	getJson(url, params){
		return this._fetchGet(url, params);
	},

	_fetchGet(url, params){
		let _fetchGet2 = this._fetchGet2;
		return new Promise(function (resolve, reject) {
			let successCallback = (result) => {
				resolve(result)
			};
			let errorCallback = (error) => {
				if (error.status == 450) {
					userStore.relogin(() => {
						_fetchGet2(url, params, successCallback, errorCallback);
					});
				}
			};
			_fetchGet2(url, params, successCallback, errorCallback)
		})
	},

	_fetchGet2(url, params, successCallback, errorCallback){
		if (params) {
			let paramsArray = []
			Object.keys(params).forEach(key => paramsArray.push(key + '=' + encodeURIComponent(params[key])))
			if (url.search(/\?/) === -1) {
				url += '?' + paramsArray.join('&')
			} else {
				url += '&' + paramsArray.join('&')
			}
		}

		fetch(url, {
			method: 'GET',
			headers: {
				'Cache-Control': 'no-cache',
				'authorization': userStore.token
			}
		}).then((response) => {
			let status = response.status;
			if (status == 200) {
				let result = response.json();
				if (successCallback)
					successCallback(result)
			} else {
				errorCallback(response);
			}
		}).catch((error) => {
			// tools.showToast('网络异常，请重试！')
		});
	},


	/**
	 * POST请求，返回Json数据。
	 *
	 * 支持方法重载：
	 * postJson(url, callback)
	 * postJson(url, body, callback)
	 * postJson(url, headers, body, callback)
	 *
	 * @param url 请求地址，type：string
	 * @param headers 请求头，type：json
	 * @param body 请求类型，type：string or json
	 * @param callback 回调方法， type: function
	 */
	postJson(url, params){
		return this._fetchPost(url, params, 'json');
	},

	_fetchPost(url, params, type){
		let headers = {
				'authorization': '1106775f-0d7d-11e7-9b59-000c293e6828',
			},
			body = null;

		if (params) {
			if (typeof params == 'object' && params.constructor == Object) {
				let paramsArray = []
				Object.keys(params).forEach(key => paramsArray.push(key + '=' + encodeURIComponent(params[key])))
				body = paramsArray.join('&');
				headers = {
					"Content-Type": "application/x-www-form-urlencoded"
				};
			} else if (typeof params == 'object' && params instanceof FormData) {
				body = params;
				headers = {
					'Content-Type': 'multipart/form-data',
				};
			}
			else {
				body = params;
			}
		}

		return new Promise(function (resolve, reject) {
			fetch(url, {
				method: 'POST',
				headers,
				body
			})
				.then((response) => type == 'text' ? response.text() : response.json())
				.then((result) => {
					if (resolve)
						resolve(result)
				})
				.catch((error) => {
					// tools.showToast('服务器异常，请重试!');
					if (reject) {
						reject(error);
					}
				}).done();
		})
	},
};
export default request;