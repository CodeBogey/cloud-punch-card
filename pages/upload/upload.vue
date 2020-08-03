<template>
	<view class="content">
		<view class="top-back-img">
			<view>
				<text>2020年8月2日-10月2日</text>
			</view>
		</view>
		<view style="background: rgb(84, 152, 239);">
			<view class="upImg">
				<view class="wrap">
					<view class="text"><text>13公里截图</text></view>
					<view class="s-text"><text>最多上传5张打卡照片</text></view>
					<view class="img-wrap">
						<view class="img-item" v-for="(item, index) in tempImgFilePath" :key="item" @click="upImg">
							<image :src="item" @click.stop="preImg(index)"></image>
							<view @click.stop="closeImg(index)"><text>-</text></view>
						</view>
						<view class="img-item" v-for="(item, index) in 5 - tempImgFilePath.length" :key="index" @click="upImg">
							<text>+</text>
						</view>
					</view>
				</view>
			</view>
			<view class="upVideo">
				<view class="wrap">
					<view class="text"><text>打CALL视频</text></view>
					<view class="s-text"><text>视频长度15-30秒，不大于5M</text></view>
					<view class="video-item" @click="upVideo">
						<video id="Fvideo" @fullscreenchange="outFullScreen" @play="fullScreen" :src="tempVideoFilePath" controls v-if="tempVideoFilePath !== '' "></video>
						<view @click.stop="closeVideo" class="close" v-if="tempVideoFilePath !== '' ">
							<text>-</text>
						</view>
						<text v-else>+</text>
					</view>
				</view>
			</view>
			<view class="submit" @click="submit">
				<view><image src="~@/static/upfile.png"></image></view>
			</view>
		</view>
		<view class="ending"><text>珠海传媒融创科技有限公司</text></view>
	</view>
</template>

<script>
	import axios from '@/components/jwx/axios.min.js'
	export default {
		data() {
			return {
				tempVideoFilePath: '',
				tempImgFilePath: [],
				upState: ''
			}
		},
		mounted() {
			this.getfileList()
		},
		methods: {
			getfileList () {
				uni.request({
					// url: 'https://wechat.ip885.cn/tvyun/?m=act&a=airShow2020&sa=myInfo&wxtoken=KhMTx7wPj8L6hX9XJdMYRQ0n3GJ73OGRv8dZZs4LOaoM0DPD',
					url: 'https://wechat.ip885.cn/tvyun/?m=act&a=airShow2020&sa=myInfo',
					success: (res) => {
						// console.log(this.tempImgFilePath)
						// console.log(res.data)
						this.upState = res.data.code
						console.log(this.upState)
						if (Object.keys(res.data.data).length == 0 || res.data.data.p1 === '' || res.data.data.p1 === null) {
							console.log(1)
						} else {
							this.tempImgFilePath.push(res.data.data.p1)
						}
						if (Object.keys(res.data.data).length == 0 || res.data.data.p2 === '' || res.data.data.p2 === null) {
							console.log(2)
						} else {
							this.tempImgFilePath.push(res.data.data.p2)
						}
						if (Object.keys(res.data.data).length == 0 || res.data.data.p3 === '' || res.data.data.p3 === null) {
							console.log(3)
						} else {
							this.tempImgFilePath.push(res.data.data.p3)
						}
						if (Object.keys(res.data.data).length == 0 || res.data.data.p4 === '' || res.data.data.p4 === null) {
							console.log(4)
						} else {
							this.tempImgFilePath.push(res.data.data.p4)
						}
						if (Object.keys(res.data.data).length == 0 || res.data.data.p5 === '' || res.data.data.p5 === null) {
							console.log(5)
						} else {
							this.tempImgFilePath.push(res.data.data.p5)
						}
						if (Object.keys(res.data.data).length == 0 || res.data.data.video === '' || res.data.data.video === null) {
							console.log(6)
						} else {
							this.tempVideoFilePath = res.data.data.video
						}
						console.log(this.tempImgFilePath)
					}
				})
			},
			upVideo () {
				if (this.upState == 1) {
					uni.chooseVideo({
						count: 1,
						compressed: true,
						success: (res) => {
							if (res.size > 5242880) {
								uni.showToast({
									title:"视频大小超过5M，请重新上传！",
									icon:'none'
								})
								return false
							} else {
								var formData = new FormData()
								formData.append('file', res.tempFile)
								uni.showToast({
									icon: "loading",
									title: '请稍等'
								})
								axios({
									url: 'https://wechat.ip885.cn/tvyun/?m=act&a=airShow2020&sa=upload_file',
									// url: 'https://wechat.ip885.cn/tvyun/?m=act&a=airShow2020&sa=upload_file&wxtoken=KhMTx7wPj8L6hX9XJdMYRQ0n3GJ73OGRv8dZZs4LOaoM0DPD',
									data: formData,
									method: "post",
									headers: {
										'Content-Type': 'multipart/form-data'
									}
								}).then((res) => {
									console.log(res.data.data)
									this.tempVideoFilePath = res.data.data
									uni.showToast({
										icon: "success",
										title: "完成"
									})
								})
							}
						}
					})
				} else {
					uni.showModal({
						content: '报名后才能参加活动',
						showCancel: false,
						success: (res) => {
							if (res.confirm) {
								uni.navigateTo({
									url: '../signup/signup'
								})
							}
						}
					})
				}
			},
			upImg () {
				if (this.upState == 1) {
					uni.chooseImage({
						count: 5,
						sizeType: ['original', 'compressed'],
						success: (res) => {
							if (res.tempFilePaths.length > 5) {
								uni.showToast({
									icon: "none",
									title: "最多上传5张图片"
								})
							} else {
								for (let i = 0; i < res.tempFilePaths.length; i ++) {
									if (res.tempFiles[i].size > 5242880) {
										uni.showToast({
											title:"图片大小超过5M，请重新上传！",
											icon:'none'
										})
										return false
									} else {
										var formData = new FormData()
										formData.append('file', res.tempFiles[i])
										axios({
											url: 'https://wechat.ip885.cn/tvyun/?m=act&a=airShow2020&sa=upload_file',
											// url: 'https://wechat.ip885.cn/tvyun/?m=act&a=airShow2020&sa=upload_file&wxtoken=KhMTx7wPj8L6hX9XJdMYRQ0n3GJ73OGRv8dZZs4LOaoM0DPD',
											data: formData,
											method: "post",
											headers: {
												'Content-Type': 'multipart/form-data'
											}
										}).then((res) => {
											console.log(res.data.data)
											this.tempImgFilePath.push(res.data.data)
										})
									}
								}
							}
						}
					})
				} else {
					uni.showModal({
						content: '报名后才能参加活动',
						showCancel: false,
						success: (res) => {
							if (res.confirm) {
								uni.navigateTo({
									url: '../signup/signup'
								})
							}
						}
					})
				}
			},
			closeVideo () {
				this.tempVideoFilePath = ''
			},
			closeImg (index) {
				return this.tempImgFilePath.splice(index, 1)
			},
			fullScreen () {
				var videoContext = uni.createVideoContext('Fvideo')
				videoContext.requestFullScreen()
			},
			outFullScreen (e) {
				console.log(e.detail.fullScreen)
				var videoContext = uni.createVideoContext('Fvideo')
				if (!e.detail.fullScreen) {
					videoContext.pause()
				}
			},
			preImg (index) {
				uni.previewImage({
					urls: this.tempImgFilePath,
					current: index
				})
			},
			submit () {
				var formData = new FormData()
				var p1 = this.tempImgFilePath[0] || ''
				var p2 = this.tempImgFilePath[1] || ''
				var p3 = this.tempImgFilePath[2] || ''
				var p4 = this.tempImgFilePath[3] || ''
				var p5 = this.tempImgFilePath[4] || ''
				formData.append('video', this.tempVideoFilePath)
				formData.append('p1', p1)
				formData.append('p2', p2)
				formData.append('p3', p3)
				formData.append('p4', p4)
				formData.append('p5', p5)
				axios({
					url: 'https://wechat.ip885.cn/tvyun/?m=act&a=airShow2020&sa=updatePerson',
					// url: 'https://wechat.ip885.cn/tvyun/?m=act&a=airShow2020&sa=updatePerson&wxtoken=KhMTx7wPj8L6hX9XJdMYRQ0n3GJ73OGRv8dZZs4LOaoM0DPD',
					data: formData,
					method: "post",
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then((res) => {
					console.log(res.data)
					if (res.data.code == 1) {
						uni.showToast({
							icon: "success",
							title: '上传成功'
						})
					} else {
						uni.showToast({
							icon: "none",
							title: res.data.message
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.wrap {
		background: #fff;
		width: 90%;
		margin: 0 auto;
		border-radius: 16px;
		box-sizing: border-box;
		padding: 30upx 0 60upx 0;
		text-align: center;
	}
	.text {
		color: #333;
		font-size: 36upx;
		font-weight: bold;
	}
	.s-text {
		font-size: 24upx;
		margin: 10upx 0 20upx 0;
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
	.content {
		width: 100%;
		height: 100%;
		.top-back-img {
			background: url(~@/static/title-back-img.png) no-repeat;
			background-size: 100% 100%;
			width: 100%;
			height: 100%;
			position: relative;
			top: 1px;
			overflow: hidden;
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
		.upImg {
			width: 100%;
			.img-wrap {
				display: flex;
				flex-wrap: wrap;
				.img-item {
					width: 25%;
					border: 1px solid #ccc;
					height: 168upx;
					line-height: 168upx;
					text-align: center;
					font-size: 60upx;
					font-weight: 100;
					color: #ccc;
					margin-left: 6%;
					margin-bottom: 6%;
					position: relative;
					image {
						width: 100%;
						height: 100%;
					}
					view {
						background: rgb(236, 13, 25);
						width: 45upx;
						height: 45upx;
						text-align: center;
						border-radius: 50%;
						position: absolute;
						right: -15upx;
						top: -15upx;
						color: #fff;
						line-height: 35upx;
						z-index: 10;
					}
				}
			}
		}
		.upVideo {
			width: 100%;
			margin-top: 40upx;
			.video-item {
				width: 60%;
				margin: 0 auto;
				border: 1px solid #ccc;
				height: 268upx;
				line-height: 268upx;
				text-align: center;
				font-size: 60upx;
				font-weight: 100;
				color: #ccc;
				position: relative;
				video {
					width: 100%;
					height: 100%;
				}
				.close {
					background: rgb(236, 13, 25);
					width: 45upx;
					height: 45upx;
					text-align: center;
					border-radius: 50%;
					position: absolute;
					right: -38upx;
					top: -38upx;
					color: #fff;
					line-height: 35upx;
					z-index: 100;
				}
			}
		}
		.submit {
			overflow: hidden;
			view {
				width: 28%;
				height: 90upx;
				margin: 40upx auto;
				image {
					width: 100%;
					height: 100%;
				}
			}
		}
	}
</style>
