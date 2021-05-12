<template>
	<view class="content" id="capture">
		<img :src="msg" class="msg">
		<view class="top-back-img">
			<view class="user-name">
				<view><text>我是 {{username || wxname}}</text></view>
			</view>
			<view class="timer">
				<text>2021年9月28日-10月3日</text>
			</view>
		</view>
		<view style="background: rgb(84, 152, 239); position: relative;">
			<view class="qrcode">
				<image src="~@/static/text-code.png"></image>
			</view>
			<view class="participant">
				<view v-if="username !== ''"><text>我是第{{rownum}}位参与者</text></view>
				<view><text>邀请您一起为中国航展加油!</text></view>
			</view>
			<view class="plane"></view>
		</view>
	</view>
</template>

<script>
	import html2canvas from '@/components/html2canvas/html2canvas.js'
	import axios from '../../components/jwx/axios.min.js'
	export default {
		data() {
			return {
				username: '',
				wxname: '',
				msg: '',
				rownum: ''
			}
		},
		onLoad() {
			this.getUserInfo()
		},
		mounted() {
			
		},
		methods: {
			getUserInfo () {
				var obj = JSON.parse(this.getCookie('wxuserinfo'))
				this.wxname = obj.nickname
				axios({
					// url: 'https://wechat.ip885.cn/tvyun/?m=act&a=airShow2020&sa=myInfo&wxtoken=KhMTx7wPj8L6hX9XJdMYRQ0n3GJ73OGRv8dZZs4LOaoM0DPD',
					url: 'https://wechat.ip885.cn/tvyun/?m=act&a=airShow2020&sa=myInfo',
				}).then((res) => {
					console.log(res.data.data)
					this.username = res.data.data.name
					this.rownum = res.data.data.rownum
				}).then(() => {
					html2canvas(document.querySelector("#capture")).then(canvas => {
						this.msg = canvas.toDataURL()
						uni.showToast({
							title: '海报已生成，长按保存相册',
							duration: 3000
						})
					})
				})
			},
			getCookie (c_name) {
				if (document.cookie.length > 0) {
					let c_start = document.cookie.indexOf(c_name + "=");
					if (c_start != -1) {
						c_start = c_start + c_name.length + 1;
					let c_end = document.cookie.indexOf(";", c_start);
						if (c_end == -1)
							c_end = document.cookie.length;
						return unescape(document.cookie.substring(c_start, c_end));
					}
				}
				return "";
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		width: 100%;
		height: 100%;
		.msg {
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			opacity: 0;
			z-index: 111;
		}
		.top-back-img {
			background: #52a1fe url(~@/static/title-back-img.png) no-repeat;
			background-size: 100% 100%;
			width: 100%;
			height: 100%;
			overflow: hidden;
			position: relative;
			top: 1px;
			.user-name {
				position: absolute;
				left: 29%;
				top: 3%;
				width: 46%;
				height: 60upx;
				line-height: 60upx;
				background: #f9d900;
				text-align: center;
				border-radius:50upx;
				color: #0067e7;
				font-size: 32upx;
				display: inline-block;
				padding: 6upx 10upx;
				view {
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}
			}
			.timer {
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
		.qrcode {
			overflow: hidden;
			width: 50%;
			height: 380upx;
			margin: 0 auto;
			position: relative;
			z-index: 100;
			image {
				width: 100%;
				height: 100%;
			}
		}
		.plane {
			background: url(~@/static/plane1.png) no-repeat;
			background-size: 100% 100%;
			width: 100%;
			height: 460upx;
			position: relative;
			top: -100upx;
		}
		.participant {
			width: 80%;
			height: 270upx;
			border-radius: 30upx;
			margin: 0 auto;
			background: #0067e7;
			text-align: center;
			color: #fff;
			font-size: 36upx;
			overflow: hidden;
			position: relative;
			top: -90upx;
			view:nth-child(1) {
				margin-top: 120upx;
			}
			view:nth-child(2) {
				margin-top: 10upx;
			}
			
		}
	}
</style>
