<template>
	<view>
		<!-- #ifdef MP-WEIXIN -->
		<button type="primary" open-type="getUserInfo" @getuserinfo="getUserInfo">使用微信登录</button>
		<!-- #endif -->
	</view>
</template>

<script>
	let session_key, openid, pageOptions;
	export default {
		data() {
			return {

			};
		},
		onLoad(options) {
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
				console.log(info);
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
					},
					success: res => {
						console.log(res);
						// console.log(JSON.parse(res.data));
						let resData = res.data
						console.log(resData);
						let str = resData.substring(9, resData.length - 1)
						console.log(str);
						// console.log(JSON.parse(str));
						return;
						// 登录成功 记录会员信息到本地
						// uni.showToast({
						// 	title: "登录成功"
						// });
						// uni.setStorageSync('SUID', res.data.u_id + '');
						// uni.setStorageSync('SRAND', res.data.u_random + '');
						// uni.setStorageSync('SNAME', res.data.u_name + '');
						// uni.setStorageSync('SFACE', res.data.u_face + '');
						// // 跳转
						// if (pageOptions.backtype == 1) {
						// 	uni.redirectTo({
						// 		url: pageOptions.backpage
						// 	});
						// } else {
						// 	uni.switchTab({
						// 		url: pageOptions.backpage
						// 	});
						// }

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
