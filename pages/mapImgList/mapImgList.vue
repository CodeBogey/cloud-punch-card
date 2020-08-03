<template>
	<view class="content">
		<view class="view-list">
			<view class="img-item" v-for="(item, index) in dataList" :key="index">
				<image :src="item.photo" controls @click="preview(index)"></image>
				<view><text>{{item.title}}</text></view>
			</view>
		</view>
		<view>
			<uni-load-more :status="loading" :contentText="contentText" @clickLoadMore="loadMore"></uni-load-more>
		</view>
	</view>
</template>

<script>
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue'
	import axios from '../../components/jwx/axios.min.js'
	export default {
		data() {
			return {
				contentText: {contentdown: "点击加载更多",contentrefresh: "正在加载...",contentnomore: "没有更多数据了"},
				loading: '',
				num: 8,
				dataList: [],
				page: 1
			}
		},
		mounted() {
			this.getList()
		},
		methods: {
			getList () {
				this.loading = 'loading'
				axios({
					url: `https://wechat.ip885.cn/tvyun/sites/record/?m=api&a=airShowData&type=all&source=photo&page=${this.page}`
				}).then((res) => {
					console.log(res.data.data.list)
					this.dataList = this.dataList.concat(res.data.data.list)
					if(this.dataList.length < 10) {
						this.loading = 'noMore'
					} else {
						this.loading = 'more'
					}
				})
			},
			loadMore (e) {
				if (this.loading == 'more') {
					this.loading = 'loading',
					this.page += 1
					this.getList()
				} else {
					return false
				}
			},
			preview (index) {
				var newarr = this.dataList.map((res) => {
					return res.photo
				})
				uni.previewImage({
					urls: newarr,
					current: index
				})
			}
		},
		components: {
			uniLoadMore
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		width: 100%;
		height: 100%;
		overflow: hidden;
		border-top: 1px solid #ddd;
		.view-list {
			display: flex;
			flex-wrap: wrap;
			margin-top: 60upx;
			.img-item {
				width: 36%;
				height: 380upx;
				text-align: center;
				margin-bottom: 100upx;
				margin-left: 9%;
				image {
					width: 100%;
					height: 100%;
				}
				view {
					font-size: $uni-font-size-lg;
				}
			}
		}
	}
</style>
