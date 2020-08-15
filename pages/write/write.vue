<template>
	<view>

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
			loginRes = this.checkLogin('../../write/write', '2');
			if (!loginRes) {
				return;
			}
		}
	}
</script>

<style lang="scss">

</style>
