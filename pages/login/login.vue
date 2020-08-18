<template>
	<view>
		<!-- #ifdef MP-WEIXIN -->
		<button type="primary" open-type="getUserInfo" @getuserinfo="getUserInfo">使用微信登录</button>
		<!-- #endif -->
	</view>
</template>

<script>
	let sign = require('../../commons/sign.js');
	let session_key, openid, pageOptions;
	export default {
		data() {
			return {

			};
		},
		onLoad(options) {
			sign.sign(this.apiServer);

			console.log(options)
			pageOptions = options;
			//微信
			// #ifdef MP-WEIXIN
			uni.login({
				success: (res) => {
					console.log(res);
					uni.request({
						url: this.apiServer + 'member&m=codeToSession&code=' + res.code,
						method: 'GET',
						success: res => {
							// console.log(res);
							session_key = res.data.session_key;
							openid = res.data.openid;
						},
						fail: () => {},
						complete: () => {}
					});
				}
			})
			// #endif
			//app
			// #ifdef APP-PLUS
			uni.login({
				/* 登录服务提供商，通过 uni.getProvider 获取，如果不设置则弹出登录列表选择界面 */
				provider: 'weixin',
				success: (res) => {
					console.log(JSON.stringify(res));
					uni.getUserInfo({
						success: (info) => {
							console.log(info);
							let sign = uni.getStorageSync('sign')
							uni.request({
								url: this.apiServer + 'member&m=login',
								method: 'POST',
								header: {
									'content-type': "application/x-www-form-urlencoded"
								},
								data: {
									openid: info.userInfo.openId,
									name: info.userInfo.nickName,
									face: info.userInfo.avatarUrl,
									sign:sign
								},
								success: res => {
									console.log(JSON.stringify(res));
								},
								fail: (e) => {
									console.log(JSON.stringify(e));
								},
								complete: () => {}
							});
						},
						fail: () => {
							uni.showToast({
								title: "微信登录授权失败",
								icon: 'none'
							})
						}
					})
				},
				fail: () => {
					uni.showToast({
						title: "微信登录授权失败",
						icon: 'none'
					})
				}
			})
			// #endif
		},
		methods: {
			getUserInfo(info) {
				let sign = uni.getStorageSync('sign')
				console.log(sign);
				console.log(info);
				// //通过getUserInfo获取微信加密的信息
				// var encryptedData = info.mp.detail.encryptedData;
				// var iv = info.mp.detail.iv;
				// info = info.mp.detail.userInfo;

				// //与服务器交互进行解密
				// uni.request({
				// 	url: this.apiServer + 'member&m=wxaes',
				// 	method: 'POST',
				// 	header: {
				// 		'content-type': "application/x-www-form-urlencoded"
				// 	},
				// 	data: {
				// 		session_key: session_key,
				// 		encryptedData: encryptedData,
				// 		iv: iv
				// 	},
				// 	success: res => {
				// 		console.log(res, 'res');
				// 		//通过UnionID机制来在多个应用进行用户帐号互通

				// 		//此处可以成功获取 unionId 利用 unionId 完成登录即可
				// 	},
				// 	fail: () => {},
				// 	complete: () => {}
				// });

				uni.request({
					url: this.apiServer + 'member&m=login',
					method: 'POST',
					header: {
						'content-type': "application/x-www-form-urlencoded"
					},
					data: {
						openid: openid,
						name: info.detail.userInfo.nickName,
						face: info.detail.userInfo.avatarUrl,
						sign: sign
					},
					success: res => {
						console.log(res);
						// 登录成功 记录会员信息到本地
						if (res.data.status === 'ok') {
							uni.showToast({
								title: "登录成功"
							});
							uni.setStorageSync('SUID', res.data.data.u_id + '');
							uni.setStorageSync('SRAND', res.data.data.u_random + '');
							uni.setStorageSync('SNAME', res.data.data.u_name + '');
							uni.setStorageSync('SFACE', res.data.data.u_face + '');
							let url = pageOptions.backpage;
							url = '/pages' + url.substring(5)
							// 跳转
							if (pageOptions.backtype === '1') {
								uni.redirectTo({
									url
								});
							} else {
								uni.switchTab({
									url
								});
							}
						}
					},
					fail: (e) => {
						console.log(JSON.stringify(e));
					},
					complete: () => {}
				});
			}
		}

	}
</script>

<style lang="scss">

</style>
