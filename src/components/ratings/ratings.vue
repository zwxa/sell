<template>
	<div class="ratings" ref="ratings">
		<div class="ratings-content">
			<div class="overview">
				<div class="overview-left">
					<h1 class="score">{{seller.score}}</h1>
					<div class="title">综合评分</div>
					<div class="rank">高于周边商家{{seller.rankRate}}%</div>
				</div>
				<div class="overview-right">
					<div class="score-wrapper">
						<span class="title">服务态度</span>
						<star :size="36" :score="seller.serviceScore"></star>
						<span class="score">{{seller.serviceScore}}</span>
					</div>
					<div class="score-wrapper">
						<span class="title">商品评分</span>
						<star :size="36" :score="seller.foodScore"></star>
						<span class="score">{{seller.foodScore}}</span>
					</div>
					<div class="delivery-warpper">
						<span class="title">送达时间</span>
						<span class="delivery">{{seller.deliveryTime}}分钟</span>
					</div>
				</div>
			</div>
			<split></split>
			<ratingselect :selectType="selectType" :onlyContent="onlyContent"  :ratings="ratings" @ratingtype="rt" :msg="msg" @changecontent="cc"></ratingselect>
			<div class="rating-warpper">
				<ul>
					<li v-for="rating in ratings" v-show="needShow(rating.rateType,rating.text)" class="rating-item">
						<div class="avatar">
							<img width="28" height="28" :src="rating.avatar">
						</div>
						<div class="content">
							<h1 class="username">{{rating.username}}</h1>
							<div class="star-warpper">
								<star :size="24" :score="rating.score"></star>
								<span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}</span>
							</div>
							<p class="text">{{rating.text}}</p>
							<div class="recommend" v-show="rating.recommend && rating.recommend.length">
								<span class="icon-thumb_up"></span>
								<span  class="item" v-for="item in rating.recommend">{{item}}</span>
							</div>
							<div class="time">
								{{rating.rateTime | formatDate}}
							</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import star from '../../components/star/star';
  import split from '../spilt/split.vue';
  import ratingselect from '../ratingselect/ratingselect.vue';
  import {formatDate} from '../../common/js/date.js'  

    const POSOTIVE = 0;
    const NEGATIVE = 1;
    const ALL = 2; 
    const ERR_OK=0; 

	export default{ 
		props:{
			seller:{
				type:Object
			}
		},
		created(){
			this.$http.get('/api/ratings').then( (response) => {
                		response = response.body;
                		this.ratings = response.data;

                		this.$nextTick(()=>{
                			this.menuScroll = new BScroll(this.$refs.ratings,{
	    	    		click : true
	    	    	});
              		});
                		});
		
		},
		data(){
			return {
    				ratings:[],
    				selectType: ALL,
    				onlyContent :true,
    				msg:''
    			};
		},
		methods:{
			needShow(type,text){
    				if(this.onlyContent&&!text) {
    					return false;
    				}
    				if(this.selectType===ALL){
    					return true;
    				}else{
    					return type ===this.selectType;
    				}
    			},
			rt(msg){
    			this.selectType = msg;
    			this.$nextTick(()=>{
    				this.scroll.refresh();
    			});
    			
    			},
    			cc(msg){
    			this.onlyContent=msg;
    			this.$nextTick(()=>{
    				this.scroll.refresh();
    			});
    			
    			}   
		},
		filters :{
    		formatDate(time){
    			let date = new Date(time);
    			return formatDate(date,'yyyy-MM-dd hh:mm');
    			}
    		},
		components:{
			star,
			split,
			ratingselect
		}
	};
</script>
<style lang="stylus" rel="stylesheet/stylus">
    @import '../../common/stylus/mixin.styl'
    .ratings
    	position:absolute
    	top:174px
    	bottom:0
    	left:0
    	width:100%
    	overflow:hidden
    	.overview
    		display:flex
    		padding:18px 0
    		.overview-left
    			flex:0  0 137px
    			width:137px
    			border-right:1px solid rgba(7,17,27,.1)
    			text-align:center
    			padding-bottom:6px 0
    			.score
    				line-height:28px
    				font-size:24px
    				color:rgb(255,153,0)
    				margin-bottom:6px
    			.title
    				margin-bottom:8px
    				font-size:12px
    				line-height:12px
    				color:rgb(7,17,27)
    			.rank
    				font-size:10px
    				color:rgb(147,153,159)
    				line-height:10px
    		.overview-right
    			flex:1
    			padding:6px 0 6px 24px
    			.score-wrapper
    				margin-bottom:8px
    				font-size:0px
    				.title
    					display:inline-block
    					font-size:12px
    					color:rgb(7,17,27)
    					line-height:12px
    					vertical-align:top
    				.star
    					display:inline-block
    					vertical-align:top
    					margin-left: 12px
    					.star-item
    						margin-right: 10px
    				.score
    					display:inline-block
    					vertical-align:top
    					font-size:12px
    					line-height:18px
    					color:rgb(255,153,0)
    			.delivery-warpper
    				font-size:0px
    				.title
    					font-size:12px
    					color:rgb(7,17,27)
    					line-height:12px
    				.delivery
    					font-size:12px
    					margin-left:12px
    					color:rgb(147,153,159)
    	.rating-warpper
    		padding:0 18px
    		.rating-item
    			display:flex
    			padding:18px 0
    			border-1px(rgba(7,17,27,.1))
    			.avatar
    				flex:0 0 28px
    				width:28px
    				margin-right:12px
    				img
    					border-raduis:50%
    			.content
    				position:relative
    				flex:1
    				margin:0
    				.username
    					line-height:12px
    					font-size:10px
    					margin-bottom:4px
    					color:rgb(7,17,27)
    					display:inline-block
    				.star-warpper
    					margin-bottom:6px
    					margin:0
    					font-size:0px
    					text-align: left;
    					.star
    						display:inline-block
    						vertical-align:top
    						margin-right:6px
    					.delivery
    						display:inline-block
    						vertical-align:top
    						line-height:12px
    						font-size:10px
    						color:rgb(147,153,159)
    				.text
    					line-height:18px
    					color:rgb(7,17,27)
    					font-size:12px
    					margin: 8px 0
    					padding:0
    				.recommend
    					line-height:16px
    					.icon-thumb_up,.item
    						display:inline-block
    						margin: 0 8px 4px 0
    						font-size:9px
    					.icon-thumb_up
    						color:rgb(0,160,220)
    					.item
    						padding:0 6px
    						border:1px solid rgba(7,17,27,.1)
    						border-raduis:1px
    						color:rgb(147,153,159)
    						background:#fff
    				.time
    					position:absolute
    					top:0
    					right:0
    					line-height:10px
    					font-size:10px
    					color:rgb(147,153,159)



</style>