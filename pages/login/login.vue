<template>
	<view>

	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		onLoad(options) {
			console.log(options)
			//app
			// #ifdef APP-PLUS
			uni.login({
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
		}

	}
</script>

<style lang="scss">

</style>
