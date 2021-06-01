<template>
	<view class="content">
		<!-- 时间背景图 -->
		<view class="top-back-img">
			<view>
				<text>2021年9月28日-10月3日</text>
			</view>
		</view>
		<view style="background: #4187f1;">
			<!-- 倒计时 -->
			<view class="count-down">
				<view class="line"><image src="~@/static/line.png" mode="aspectFit"></image></view>
				<view class="text-title"><text>距离航展开幕还有</text></view>
				<view class="days">
					<!-- 图片 -->
					<view class="num">
						<image :src="leftImgUrl"></image>
					</view>
					<view class="long-dots"></view>
					<view class="num">
						<image :src="rightImgUrl"></image>
					</view>
					<view class="tian"><text>天</text></view>
				</view>
			</view>
			<!-- 打卡赢好礼 -->
			<view class="card-wrap">
				<view class="common-text"><text>- 打卡赢好礼 -</text></view>
				<view class="jp">
					<view class="jp-item">
						<image src="~@/static/ydj.png"></image>
						<view><text>一等奖</text></view>
						<view><text>航展双人<br>成人门票<br>10名</text></view>
					</view>
					<view class="jp-item">
						<image src="~@/static/edj.png" mode="aspectFit"></image>
						<view><text>二等奖</text></view>
						<view><text>航展单人<br>成人门票<br>30名</text></view>
					</view>
					<view class="jp-item">
						<image src="~@/static/clothes.png" mode="aspectFit"></image>
						<view><text>三等奖</text></view>
						<view><text>航展专属徽章+<br>专属T恤<br>130名</text></view>
					</view>
				</view>
			</view>
			<!-- 报名、说明、上传、分享 -->
			<view class="user-btn">
				<view @click="judge('../signup/signup')"><image src="~@/static/signup.png"></image></view>
				<!-- <view @click="modal = true"><text>活动说明</text></view> -->
				<view @click="judge('../upload/upload')"><image src="~@/static/zpsc.png"></image></view>
				<view @click="judge('../poster/poster')"><image src="~@/static/share.png"></image></view>
			</view>
		</view>
		
		<view style="background: #52a1fe;">
			<!-- 打卡地图 -->
			<view class="card-map">
				<view class="common-text"><text>- 打卡地图 -</text></view>
				<view style="position: relative;">
					<swiper :autoplay="autoplay" :interval="3000" :duration="1000" :circular="true" :display-multiple-items="3" :current="current" @change="swiperChange">
						<swiper-item v-for="(item, index) in mapList" :key="index">
							<view>
								<image :src="item.photo" class="image-item" @click="preview(index)"></image>
							</view>
							<text>{{item.title}}</text>
						</swiper-item>
					</swiper>
					<view class="pre" @click="preImg"></view>
					<view class="next" @click="nextImg"></view>
				</view>
				<view class="more" @click="moreData('../mapImgList/mapImgList')"><text>查看更多</text></view>
			</view>
			<!-- 打卡视频 -->
			<view class="card-video">
				<view class="common-text"><text>- 打卡视频 -</text></view>
				<view class="video-wrap">
					<view class="video-item" v-for="(item, index) in videoList" :key="item.id">
						<video :src="item.video" :id="'Fvideo' + index" @fullscreenchange="outFullScreen" @play="fullScreen('Fvideo' + index)" controls></video>
						<!-- <video :src="item.video" :id="'Fvideo' + index" controls></video> -->
						<text>{{item.title}}</text>
					</view>
				</view>
				<view class="more" @click="moreData('../videoList/videoList')"><text>查看更多</text></view>
			</view>
			<!-- 最新航展动态 -->
			<view class="air-show">
				<view class="common-text"><text>- 最新航展动态 -</text></view>
				<view class="air-wrap">
					<view class="air-item" v-for="(item, index) in airList" :key="index" @click="airNews(item.link)">
						<image :src="item.photo"></image>
						<text>{{item.title}}</text>
					</view>
				</view>
				<view class="more" @click="moreData('../airShowList/airShowList')"><text>查看更多</text></view>
			</view>
		</view>
		<!-- ending -->
		<view class="ending"><text>珠海传媒融创科技有限公司</text></view>
	</view>
</template>
<script type="text/javascript" src="https://res.wx.qq.com/open/js/jweixin-1.4.0.js"></script>
<script>
	import axios from '../../components/jwx/axios.min.js'
	export default {
		data () {
			return {
				actEndTime: '2021/09/09',
				autoplay: true,
				leftImgUrl: '',
				rightImgUrl: '',
				countDownNum: '',
				videoList: [],
				current: 0,
				airList: [],
				mapList: [],
				videoContext: '',
				token: ''
			}
		},
		onLoad() {
			let _hmt = _hmt || [];
			(function() {
			  let hm = document.createElement("script");
			  hm.src = "https://hm.baidu.com/hm.js?367540f994109ead8f0483c77b78e799";
			  let s = document.getElementsByTagName("script")[0]; 
			  s.parentNode.insertBefore(hm, s);
			})();
			
			var href = "https://res.wx.qq.com/open/js/jweixin-1.4.0.js";
			var head= document.getElementsByTagName('head')[0];
			var script= document.createElement('script');
			script.type= 'text/javascript';
			script.src= href;
			head.appendChild(script);
			
			if (this.getCookie("wxtoken") == "") {
				window.location.href = "https://wechat.ip885.cn/tvyun/?m=act&a=airShow2020&sa=auth&reffer=" + encodeURIComponent(window.location.href)
			} else {
				console.log('wxtoken', this.getCookie("wxtoken"))
			}
			// this.token = localStorage.getItem("wechat_token") ? localStorage
			// 	.getItem("wechat_token") : this.getCookie("wechat_token");
			// // 如果token为空，则重定向到微信授权页面
			// if (!this.token) {
			// 	window.location.href = '/wechat/oauth/8'
			// 			+ "?rdurl=" + encodeURIComponent(window.location.href)
			// }
			// console.log('this.token',this.token)
			
			var title = encodeURIComponent("云相约 再翱翔")
			var description = encodeURIComponent("第十三届中国国际航空航天博览会云打卡！")
			var thumb = encodeURIComponent("https://wechat.ip885.cn/2021/airshow2021/static/title-back-img.png")
			var url = encodeURIComponent(window.location.href)
			var href = "https://wechat.ip885.cn/tvyun/?m=act&a=share&sa=wxJsSdkWithShare&rand="+(new Date()).valueOf()
			+"&reffer=" +encodeURIComponent(window.location.href) + "&title=" + title + "&description=" + description
			+"&thumb=" + thumb + "&url=" + url;
			var head= document.getElementsByTagName('head')[0];
			var script= document.createElement('script');
			script.type= 'text/javascript';
			script.src= href;
			head.appendChild(script);
		},
		mounted() {
			this.getVideoList()
			this.getAirList()
			this.getMapList()
			this.countDown()
		},
		methods: {
			getVideoList () {
				axios({
					url: 'https://wechat.ip885.cn/tvyun/sites/record/?m=api&a=airShowData&type=home&source=video',
				}).then((res) => {
					this.videoList = res.data.data.list
				})
			},
			getAirList () {
				axios({
					url: 'https://wechat.ip885.cn/tvyun/sites/record/?m=api&a=airShowData&type=home&source=link',
				}).then((res) => {
					this.airList = res.data.data.list
				})
			},
			getMapList () {
				axios({
					url: 'https://wechat.ip885.cn/tvyun/sites/record/?m=api&a=airShowData&type=home&source=photo',
				}).then((res) => {
					this.mapList = res.data.data.list
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
			},
			judge (url) {
				// if(this.getCookie("wxtoken") == ""){
				// 	// window.location.href = "https://wechat.ip885.cn/tvyun/?m=act&a=airShow2020&sa=auth&reffer=" + encodeURIComponent(window.location.href);
				// 	window.location.href = '/wechat/oauth/8'
				// 		    + "?rdurl=" + encodeURIComponent(window.location.href)
				// } else {
				// 	uni.navigateTo({
				// 		url: url
				// 	})
				// }
				uni.navigateTo({
					url: url
				})
			},
			fullScreen (data) {
				this.videoContext = uni.createVideoContext(data)
				this.videoContext.requestFullScreen()
			},
			outFullScreen (e) {
				console.log(e.detail.fullScreen)
				if (!e.detail.fullScreen) {
					this.videoContext.pause()
				}
			},
			swiperChange (e) {
				this.current = e.detail.current
			},
			preImg () {
				this.current = this.current < (this.mapList.length - 1) ? this.current + 1 : 0
				console.log(this.current)
			},
			nextImg () {
				this.current = this.current > 0 ? this.current - 1 : (this.mapList.length - 1)
				console.log(this.current)
			},
			preview (index) {
				var newarr = this.mapList.map((res) => {
					return res.photo
				})
				uni.previewImage({
					urls: newarr,
					current: index
				})
			},
			airNews (data) {
				console.log(data)
				window.location.href = data
			},
			moreData (url) {
				uni.navigateTo({
					url: url
				})
				// uni.showToast({
				// 	icon:"none",
				// 	title:"暂无更多数据"
				// })
			},
			timeFormat(param) {
				return param < 10 ? '0' + param : param;
			},
			countDown () {
				// 获取当前时间，同时得到活动结束时间数组
				let newTime = new Date().getTime()
				// 对结束时间进行处理渲染到页面
				let endTime = new Date(this.actEndTime).getTime()
				// console.log('endTime',endTime)
				let time = (endTime - newTime) / 1000
				let day = parseInt(time / (60 * 60 * 24))
				// console.log(this.timeFormat(day) + '天')
				this.countDownNum = this.timeFormat(day).toString().split('')
				// console.log(this.countDownNum)
				this.leftImgUrl = `https://wechat.ip885.cn/tvyun//sites/act/airshow2020/numbers/${this.countDownNum[0]}.png`
				this.rightImgUrl = `https://wechat.ip885.cn/tvyun//sites/act/airshow2020/numbers/${this.countDownNum[1]}.png`
			}
		}
	}
</script>

<style lang="scss" scoped>
	.common-text {
		color: #fff;
		font-size: 35upx;
		text-align: center;
		margin-bottom: 40upx;
	}
	.more {
		width: 90%;
		height: 60upx;
		margin: 36upx auto;
		line-height: 60upx;
		border-radius: 50upx;
		border: 1px solid #fff;
		text-align: center;
		color: #fff;
		font-size: 28upx;
	}
	.content {
		width: 100%;
		height: 100%;
		.top-back-img {
			width: 100%;
			height: 100%;
			background: url(~@/static/title-back-img.png) no-repeat;
			background-size: 100% 100%;
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
		.count-down {
			background: #4187f1 url(~@/static/plane1.png) no-repeat;
			background-size: 100% 100%;
			width: 100%;
			// height: 460upx;
			// margin-top: -60upx;
			.line {
				width: 100%;
				height: 50upx;
				text-align: center;
				background-image: linear-gradient(rgb(89, 156, 250), #4187f1);
				image {
					width: 40%;
					margin: 0 auto;
					height: 100%;
				}
			}
			.text-title {
				color: #fff;
				text-align: center;
				font-size: 34upx;
				margin: 30upx 0;
			}
			.days {
				display: flex;
				position: relative;
				width: 400upx;
				margin: 0 auto;
				.num {
					width: 180upx;
					height: 250upx;
					background: #fff;
					border: 3px solid #4c85f2;
					border-radius: 10px;
					margin-left: 20upx;
					text-align: center;
					image {
						width: 70%;
						height: 70%;
						margin-top: 20%;
					}
					text {
						color: #4c85f2;
						font-size: 220upx;
						font-weight: bold;
						line-height: 250upx;
					}
				}
				.long-dots {
					width: 50upx;
					height: 20upx;
					border-radius: 30px;
					background: #4c85f2;
					position: absolute;
					left: 46%;
					top: 50%;
					margin-top: -10upx;
				}
				.tian {
					color: #fff;
					position: absolute;
					right: -60upx;
					bottom: 0;
					font-size: 35upx;
				}
			}
			
		}
		.card-wrap {
			padding-top: 50upx;
			.jp {
				display: flex;
				padding-bottom: 40upx;
				.jp-item {
					width: 33%;
					text-align: center;
					image {
						width: 50%;
						height: 120upx;
						margin-bottom: 25upx;
					}
					view:nth-child(2) {
						color: #fff;
						font-size: 40upx;
					}
					view:nth-child(3) {
						color: #fff;
						font-size: 26upx;
						line-height: 45upx;
					}
				}
			}
		}
		.user-btn {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-around;
			padding-bottom: 50upx;
			view {
				width: 29%;
				height: 90upx;
				margin: 10upx 0;
				image {
					width: 100%;
					height: 100%;
				}
			}
		}
		.card-map {
			padding-top: 40upx;
			overflow: hidden;
			swiper {
				height: 340upx;
				padding: 0 80upx;
				swiper-item {
					text-align: center;
					view {
						width: 94%;
						height: 85%;
						margin-left: 3%;
						text-align: center;
						.image-item {
							width: 100%;
							height: 100%;
						}
					}
					text {
						color: #fff;
						font-size: 28upx;
					}
				}
			}
			.pre {
				width: 40upx;
				height: 50upx;
				background: url(~@/static/pre.png) no-repeat;
				background-size: 100% 100%;
				position: absolute;
				left: 20upx;
				top: 50%;
				margin-top: -28upx;
			}
			.next {
				width: 40upx;
				height: 50upx;
				background: url(~@/static/next.png) no-repeat;
				background-size: 100% 100%;
				position: absolute;
				right: 20upx;
				top: 50%;
				margin-top: -28upx;
			}
		}
		.card-video {
			padding-top: 40upx;
			overflow: hidden;
			.video-wrap {
				display: flex;
				justify-content: space-around;
				flex-wrap: wrap;
				.video-item {
					width: 42%;
					// height: 260upx;
					text-align: center;
					margin-bottom: 40upx;
					video {
						width: 100%;
						// height: 85%;
						height: 220upx;
					}
					text {
						color: #fff;
						font-size: 28upx;
					}
				}
			}
		}
		.air-show {
			padding-top: 40upx;
			overflow: hidden;
			.air-wrap {
				display: flex;
				justify-content: space-around;
				flex-wrap: wrap;
				.air-item {
					width: 42%;
					height: 220upx;
					text-align: center;
					margin-bottom: 90upx;
					image {
						width: 100%;
						height: 100%;
					}
					text {
						display: inline-block;
						width: 100%;
						color: #fff;
						font-size: 28upx;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
					}
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
