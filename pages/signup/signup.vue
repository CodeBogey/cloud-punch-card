<template>
	<view class="content">
		<modal @closeModal="closeModal" v-if="modal"></modal>
		<!-- 时间背景图 -->
		<view class="top-back-img">
			<view>
				<text>2020年8月2日-10月2日</text>
			</view>
		</view>
		<view style="background: rgb(84, 152, 239);">
			<view class="singup">
				<view class="wrap">
					<view class="text">
						<text>报名通道</text>
					</view>
					<view class="sign-name">
						<input :disabled="issignUp" type="text" @blur="judgeName" placeholder="姓名" v-model="userName">
					</view>
					<view class="sign-name">
						<input :disabled="issignUp" type="number" @blur="judgePhone" placeholder="联系电话" v-model="userPhone">
					</view>
					<view class="sign-name">
						<input :disabled="issignUp" type="idcard" @blur="judgeId" placeholder="身份证/护照/港澳通行证" v-model="userId">
					</view>
				</view>
			</view>
			<view class="submit">
				<view @click="modal = true"><image src="~@/static/explain.png"></image></view>
				<view @click="submitInfo"><image src="~@/static/confirm.png"></image></view>
			</view>
		</view>
		<!-- ending -->
		<view class="ending"><text>珠海传媒融创科技有限公司</text></view>
	</view>
</template>

<script>
	import modal  from '@/components/modal/modal.vue'
	export default {
		data() {
			return {
				userName: '',
				userPhone: '',
				userId: '',
				modal: false,
				issignUp: false
			}
		},
		components: {
			modal
		},
		mounted () {
			this.getUserInfo()
		},
		methods: {
			getUserInfo () {
				uni.request({
					url: 'https://wechat.ip885.cn/tvyun/?m=act&a=airShow2020&sa=myInfo',
					// url: 'https://wechat.ip885.cn/tvyun/?m=act&a=airShow2020&sa=myInfo&wxtoken=KhMTx7wPj8L6hX9XJdMYRQ0n3GJ73OGRv8dZZs4LOaoM0DPD',
					success: (res) => {
						console.log(res.data.data)
						if (res.data.data.phone.length > 0) {
							this.issignUp = true
							this.userName = res.data.data.name
							this.userPhone = res.data.data.phone
							this.userId = res.data.data.idNumber
							console.log(this.issignUp)
							uni.showModal({
								content: '您已经报名成功',
								showCancel: false
							})
						}
					}
				})
			},
			closeModal (event) {
				this.modal = event
			},
			judgeName () {
				var p1 = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/
				var p2 = /^[A-Z][a-z]*(\s[A-Z][a-z]*)*$/
				if (p1.test(this.userName)==false && p2.test(this.userName)==false) {
					uni.showToast({
						icon:"none",
						title: "请填写正确的姓名"
					})
					return false
				} else {
					return true
				}
			},
			judgePhone () {
				var p1 = /^1(?:3\d|4[4-9]|5[0-35-9]|6[67]|7[013-8]|8\d|9\d)\d{8}$/
				if (p1.test(this.userPhone)==false) {
					uni.showToast({
						icon:"none",
						title: "请填写正确的电话号码"
					})
					return false
				} else {
					true
				}
			},
			judgeId () {
				var p1 = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
				    p2 = /^1[45][0-9]{7}$|(^[P|p|S|s]\d{7}$)|(^[S|s|G|g|E|e]\d{8}$)|(^[Gg|Tt|Ss|Ll|Qq|Dd|Aa|Ff]\d{8}$)|(^[H|h|M|m]\d{8,10}$)/,
					p3 = /^[a-zA-Z0-9]{3,21}$/
				if (p1.test(this.userId)==false && p2.test(this.userId)==false && p3.test(this.userId) == false) {
					uni.showToast({
						icon:"none",
						title: "请填写正确的证件号码"
					})
					return false
				} else {
					return true
				}
			},
			
			submitInfo () {
				if (this.issignUp) {
					uni.showModal({
						content: '您已经报名了',
						showCancel: false
					})
				} else
				if (this.judgeName() == false || this.judgePhone() == false || this.judgeId() == false || this.userName == '' || this.userPhone == '' || this.userId == '') {
					uni.showToast({
						icon:"none",
						title:'请填写正确的信息'
					})
				} else {
					uni.request({
						url: 'https://wechat.ip885.cn/tvyun/?m=act&a=airShow2020&sa=addPerson',
						// url: 'https://wechat.ip885.cn/tvyun/?m=act&a=airShow2020&sa=addPerson&wxtoken=KhMTx7wPj8L6hX9XJdMYRQ0n3GJ73OGRv8dZZs4LOaoM0DPD',
						data: {
							name: this.userName,
							phone: this.userPhone,
							idNumber: this.userId
						},
						method: 'POST',
						header: {
							'Content-Type': 'application/x-www-form-urlencoded'
						},
						success: (res) => {
							console.log(res)
							if (res.data.code !== 1) {
								uni.showToast({
									icon: "none",
									title: res.data.message
								})
							} else {
								uni.showModal({
									content: '报名成功',
									showCancel: false,
									success: (res) => {
										if (res.confirm) {
											uni.navigateTo({
												url: '../index/index'
											})
										}
									}
								})
							}
						}
						
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
	}
	.content {
		width: 100%;
		height: 100%;
		.top-back-img {
			background: url(~@/static/title-back-img.png) no-repeat;
			background-size: 100% 100%;
			width: 100%;
			height: 100%;
			overflow: hidden;
			position: relative;
			top: 1px;
			view {
				width: 65%;
				height: 80upx;
				line-height: 80upx;
				margin: 280upx auto 100upx auto;
				border-radius: 15upx;
				background: #fff;
				color: #52a1fe;
				font-weight: bold;
				font-size: 30upx;
				text-align: center;
			}
		}
		.singup {
			width: 100%;
			.wrap {
				background: #fff;
				width: 90%;
				margin: 0 auto;
				border-radius: 16px;
				box-sizing: border-box;
				padding: 30upx 0 60upx 0;
				.text {
					color: #333;
					font-size: 36upx;
					font-weight: bold;
					text-align: center;
					// letter-spacing: 5upx;
				}
				.sign-name {
					width: 90%;
					height: 70upx;
					border: 1px solid #ccc;
					border-radius: 50upx;
					margin: 40upx auto 20upx auto;
					input {
						width: 100%;
						height: 100%;
						text-align: center;
					}
				}
			}
			
		}
		.submit {
			overflow: hidden;
			display: flex;
			justify-content: space-around;
			view {
				width: 28%;
				height: 90upx;
				margin: 40upx auto 360upx auto;
				image {
					width: 100%;
					height: 100%;
				}
			}
		}
		.ending {
			width: 100%;
			height: 80upx;
			background: #0067e7;
			line-height: 80upx;
			text-align: center;
			color: #fff;
			font-size: 24upx;
		}
	}
</style>
