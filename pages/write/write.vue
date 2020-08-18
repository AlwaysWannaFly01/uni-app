<template>
	<view>
		WRITE
	</view>
</template>

<script>
	let loginRes;
	export default {
		data() {
			return {

			};
		},
		onLoad(options) {
			// console.log(options);
			loginRes = this.checkLogin('../../write/write', '2');
			// console.log(loginRes);	
			if (!loginRes) {
				return;
			}
		}
	}
</script>

<style lang="scss">

</style>
