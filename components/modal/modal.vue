<template>
	<view class="modal">
		<view class="content-text">
			<view style="height: 100%; overflow-y: scroll;">
				<view class="title"><text>活动说明</text></view>
				<view class="red-text"><text>请各位跑友熟悉完赛规则，以下完赛要求，缺一不可:</text></view>
				<view><text>1.请在9月20日24:00前发送完赛认证，之后不接受登记，无完赛认证无法参与奖品抽奖；</text></view>
				<view><text>2.完赛:</text></view>
				<view><text>三等奖奖品</text></view>
				<view><text>7月20日~9月20日活动期间内，任意时间任意地点、任意运动APP≤5次记录完成13公里跑步距离，即可参与三等奖奖品抽奖资格；</text></view>
				<view><text>二等奖奖品</text></view>
				<view><text>7月20日~9月20日活动期间内，任意时间任意地点、任意运动APP≤3次记录完成13公里跑步距离，即可参与二等奖奖品抽奖资格；</text></view>
				<view><text>一等奖奖品</text></view>
				<view><text>7月20日~9月20日活动期间内，任意时间任意地点、任意运动APP≤1次记录完成13公里跑步距离，即可参与一等奖奖品抽奖资格；</text></view>
				<view><text>3.完赛认证: 完成后即时将运动轨迹(显示日期距离)或活动视频(航展祝福打Call视频)，上传至报名系统APP，文字内容自创（每个参赛者单独发, 不能一人代替多人发) ；</text></view>
				<view><text>4.活动结束后3个工作日内(即9月23日前)公示中奖名单，活动方客服人员会通知中奖者领取奖品；</text></view>
				<view><text>5.免责说明: 奖品图片仅为效果展示，最终以活动方提供的奖品实物为准。</text></view>
			</view>
			<view class="close" @click="closeModal"><text>X</text></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			closeModal () {
				this.$emit('closeModal', false)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.modal {
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
		position: fixed;
		left: 0;
		top: 0;
		z-index: 10;
		display: flex;
		align-items: center;
		.content-text {
			width: 90%;
			height: 70%;
			margin: 0 auto;
			background: #fff;
			border-radius: 16px;
			font-size: 24upx;
			box-sizing: border-box;
			padding: 40upx 40upx 20upx 40upx;
			line-height: 40upx;
			position: relative;
			.title {
				font-size: 36upx;
				text-align: center;
			}
			.red-text {
				color: rgb(225, 11, 23);
			}
			.close {
				background: rgb(225, 11, 23);
				width: 60upx;
				height: 60upx;
				text-align: center;
				line-height: 60upx;
				border-radius: 50%;
				position: absolute;
				left: 50%;
				margin-left: -30upx;
				bottom: -24upx;
				color: #fff;
				font-size: 30upx;
			}
		}
	}
</style>
