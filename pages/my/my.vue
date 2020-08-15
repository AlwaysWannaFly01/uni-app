<template>
	<view>

	</view>
</template>

<script>
	let loginRes;
	export default {
		data() {
			return {

			}
		},
		onLoad(options) {
			loginRes = this.checkLogin('../../my/my', '2');
			if (!loginRes) {
				return;
			}
		},
		methods: {

		}
	}
</script>

<style>

</style>
