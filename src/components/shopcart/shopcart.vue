﻿<template>
 <div>
    <div class="shopcart">
    	<div class="content" >
    		<div class="content-left"@click="toggleList">
    			<div class="logo-warpper">
    				<div class="logo"  :class="{'highlight':totalCount>0}">
    					<i class="icon-shopping_cart"  :class="{'highlight':totalCount>0}"></i>
    				</div>
    				<div class="num" v-show="totalCount>0">{{totalCount}}</div>
    			</div>
    			<div class="d-price"  :class="{'highlight':totalPrice>0}">{{totalPrice}}元</div>
    			<div class="d-desc">另需配送费￥{{deliveryPrice}}元</div>   			
    		</div>
    		<div class="content-right" @click="pay" >
    			<div class="pay" :class="payClass">{{payDesc}}</div>
    		</div>
    	</div>
    	<transition name="fold">
    	<div class="shopcart-list" v-show="listShow" >
    		<div class="list-header">
    			<h1 class="title">购物车</h1>
    			<span class="empty" @click="empty">清空</span>
    		</div>
    		<div class="list-content" ref="listContent">
    			<ul>
    				<li class="food" v-for="food in selectFoods">
    					<span class="name">{{food.name}}</span>
    					<div class="price">
    						<span>￥{{food.price*food.count}}</span>
    					</div>
    					<div class="cartcontrol-warpprer">
    						<cartcontrol :food="food"></cartcontrol>
    					</div>
    				</li>
    			</ul>
    		</div>
    	</div>
    	</transition>
    </div>
    <div class="list-mask" v-show="listShow" @click="hideList"></div>
 </div>
</template>
<script >
  import BScroll from 'better-scroll';
 import cartcontrol from '../cartcontrol/cartcontrol.vue';
    export default{
        	props : {
   	selectFoods :{
	    type :Array,
	    default(){
	    	return [ ];
	    }
    	},
	deliveryPrice : {
	    	type : Number,
	    	default:0
	},
	minPrice : {
	    	type : Number,
	    	default:0	    	
	}
	},
	data(){
		return {
		    fold:true
		};
	},
	computed :{
	    totalPrice:function(){
	    	let total = 0;
	    	this.selectFoods.forEach((food)=>{
	    		total += food.price *food.count;
	    	});
	    	return total;
	    },
	    totalCount:function(){
	    	let count = 0;
	    	this.selectFoods.forEach((food)=>{
	    		count += food.count;
	    	});
	    	return count ;
	    },
	    payDesc:function(){
	    	if (this.totalPrice===0) {
	    		return '￥'+this.minPrice+'元起送';
	    	}else if(this.totalPrice<this.minPrice){
	    		let diff = this.minPrice-this.totalPrice
	    		return '还差￥'+diff+'元起送';
	    	}else{
	    		return '去结算';
	    	}
	    },
	    payClass:function(){
			if(this.totalPrice<this.minPrice){
				return 'not-enough' ;
			}else{
				return 'enough';
			}
		},
	    listShow:function(){
	    		if(!this.totalCount){
	    			this.fold=true;
	    			return false;
	    		}
	    		let show=!this.fold;
	    		if(show){
	    			this.$nextTick(()=>{
	    				if(!this.scroll){
	    				this.scroll = new BScroll(this.$refs.listContent,{
	    					click : true
	    				});
	    			      }else{
	    			      	this.scroll.refresh();
	    			      }
	    			});
	    		}
	    		return show;
	    }
	},
	methods:{
		toggleList(){
			if(!this.totalCount){
				return;
			}
			this.fold = !this.fold;
		},
		hideList(){
			this.fold=true;
		},
		empty(){
			this.selectFoods.forEach((food)=>{
				food.count=0;
			});
		},
		pay(){
			if(this.totalPrice<this.minPrice){
				return ;
			}
			alert("需支付"+this.totalPrice+"元");
		},
	},
    	components :{
    		cartcontrol
    	}
    };
</script>
<style lang="stylus" rel="stylesheet/stylus">
    @import '../../common/stylus/mixin.styl'
.shopcart
	position:fixed
	left:0
	bottom:0
	z-index:50
	width:100%
	height:48px
	.content
		margin:0 
		display:flex
		background:#141d27
		font-size:0
		.content-left
			flex:1
			.logo-warpper
				display:inline-block
				position:relative
				top:-10px
				margin:0 12px
				padding:6px
				width:56px
				height:56px
				box-sizing:border-box
				vertical-align:top
				border-radius:50%
				background:#141d27
				.logo
					border-radius:50%
					text-align:center
					background:#2b343c
					&.highlight
						background:rgb(0,160,220)
					.icon-shopping_cart
						font-size:24px
						color:#80858a
						line-height:44px
						&.highlight
							color:#fff
				.num
					position:absolute
					top:0
					right:0
					width:24px
					height:16px
					line-height:16px
					text-align:center
					border-radius:16px
					font-size:9px
					font-weight:700
					color:#fff
					background:rgb(240,20,20)
					box-shadow: 0 4px 8px 0 rgba(0,0,0,.4)
			.d-price
				display:inline-block
				vertical-align:top
				margin-top:12px
				line-height:24px
				box-sizing:border-box
				padding-right:12px
				border-right:1px solid rgba(255,255,255,.1)
				font-size:16px
				font-weight:700
				color:rgba(255,255,255,.4)
			.d-desc
				display:inline-block
				vertical-align:top
				margin:12px 0 0 12px
				line-height:24px
				color:rgba(255,255,255,.4)
				font-size:10px
		.content-right
			flex:0 0 105px
			width:105px
			.pay
				height:48px
				line-height:48px
				text-align:center
				color:rgba(255,255,255,.4)
				font-size:12px
				font-weight:700
				background:#2b333b
				&.not-enough
					background:#2b333b
				&.enough
					background:#00b43c
					color:#fff
	.shopcart-list
		position:absolute
		top:0
		left:0
		z-index:-1
		width:100%
		transition:all 0.4s
		transform:translate3D(0,-100%,0)
		&.fold-enter-active, &.fold-leave-active
			transform:translate3D(0,0,0)
		.list-header
			height:40px
			padding:0 18px
			background:#f3f5f7
			border-bottom:1px solid rgba(7,17,27,.1)
			.title
				float:left
				font-size:14px
				color:rgb(7,17,27)
				margin-top:12px
			.empty
				margin-top:12px
				float:right
				font-size:12px
				color:rgb(0,160,220)
		.list-content
			width:100%
			padding:0 18px
			max-height:217px
			background:#fff
			overflow:hidden
			.food
				position:relative
				padding:12px 0
				box-sizing:border-box
				border-1px(rgba(7,17,27,.1))
				.name
					line-height:24px
					font-size:14px
					color:rgba(7,17,27,.6)
				.price
					position:absolute
					right:116px
					bottom:12px;
					line-height:24px
					font-size:14px
					font-weight:700
					color:rgb(140,20,20)
				.cartcontrol-warpprer
					position:absolute
					right:26px
					bottom:6px
.list-mask
	position:fixed
	top:0
	left:0
	z-index:40
	width:100%
	height:100%
	overflow:auto
	backdrop-filter:blur(10px)
	background:rgba(7,17,27,.8)

</style>