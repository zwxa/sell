<template>
	<div class="goods">
	     <div class="menu-warpper" ref="menuWarpper">
	     	<ul>
	     		<li v-for="(item,index) in goods" class="menu-item" :class="{'current':currentIndex===index}" @click="selectMenu(index,$event)">
 				<span class="text border-1px">
 				<span v-show="item.type>0"  class="icon" :class="classMap[item.type]"></span>{{item.name}}</span>
	     		</li >
	     	</ul>
	     </div>
	     <div class="foods-warpper" ref="foodsWarpper">
	     	<ul>
	     		<li v-for="(item,index) in goods" class="food-list food-list-hook">
 			      <h1 class="title">{{item.name}} </h1>
 			      <ul>
 			      	<li v-for="food in item.foods" class="food-item" @click="selectFood(food,$event)">
					<div class="icon">
						<img width="57" height="57" :src="food.icon">
					</div>
					<div class="content">
						<h2 class="name">{{food.name}} </h2>
						<p class="desc">{{food.description}} </p>
						<div class="extra">
							<span class="count">月售{{food.sellCount}}份</span>
							<span>好评率{{food.rating}}%</span>
						</div>
						<div class="price">
							<span class="now">￥{{food.price}}</span>
							<span  class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
						</div>
						<div class="cartcontrol-warpper">
							<cartcontrol :food="food"></cartcontrol>
						</div>
					</div>
 			      	</li >
 			      </ul>
	     		</li >
	     	</ul>
	     </div>
	     <shopcart :selectFoods="selectFoods" :deliveryPrice="seller.deliveryPrice" :min-price="seller.minPrice">
	     	
	     </shopcart>
	     <food :food="selectedFood" ref="food"></food>	
	</div>
</template>
<script >
  import BScroll from 'better-scroll';
  import shopcart from '../shopcart/shopcart.vue' ;
  import cartcontrol from '../cartcontrol/cartcontrol.vue';
  import food from '../food/food.vue';
       export default{ 
	props : {
	    seller : {
	    	type : Object
	    }
	},
	data() {
	    return{
	     goods : [],
	     listHeight : [],
	     scrollY: 0,
	     selectedFood:{}
	     };
	},
	computed :{
		currentIndex(){

			for(let i=0;i<this.listHeight.length;i++){
				let height1 = this.listHeight[i];
				let height2 = this.listHeight[i+1];
				if(!height2||(this.scrollY>=height1&&this.scrollY<height2)){
					return i; 
				}		    
			}
		return 0;
	             },
	             selectFoods(){
	             	let foods= [];
	             	this.goods.forEach((good)=>{
	             		good.foods.forEach((food)=>{
	             			if(food.count){
	             				foods.push(food);
	             			}
	             		});
	             	});
	             	return foods;
	             }
	},	
	created() {
	this.classMap = ['decrease','discount','special','invoice','guarantee'];

            this.$http.get('/api/goods').then( (response) => {
                response = response.body;
                this.goods = response.data;

                this.$nextTick(()=>{
                	this._initScroll();
                	this._calculateHeight();
                });
         
          	    });
    	},
    	methods: {
    	    selectMenu(index,event){
    	    	if(!event._constructed){
    	    		return;
    	    	}
    	    	let foodList = this.$refs.foodsWarpper.getElementsByClassName('food-list-hook');
    	    	let el = foodList[index];
    	    	this.foodsScroll.scrollToElement(el,300);
    	    	
    	    },
    	    selectFood(food,event){
    	    	if(!event._constructed){
    	    		return;
    	    	}
    	    	this.selectedFood = food;
    	    	this.$refs.food.show(); 
    	    },
    	    _initScroll (){
    	    	this.menuScroll = new BScroll(this.$refs.menuWarpper,{
    	    		click : true
    	    	});
    	    	this.foodsScroll = new BScroll(this.$refs.foodsWarpper,{
    	    		probeType:3,
    	    		click : true
    	    	});

    	    	this.foodsScroll.on('scroll',(pos)=>{
    	    		this.scrollY = Math.abs(Math.round(pos.y));
    	    	});
    	    	
    	    },
    	    _calculateHeight (){
    	    	let foodList = this.$refs.foodsWarpper.getElementsByClassName('food-list-hook');
    	    	let height = 0;
    	    	this.listHeight.push(height);
    	    	for(let i=0; i< foodList.length;i++){
    	    		let item = foodList[i];
    	    		height += item.clientHeight;
    	    		this.listHeight.push(height);
    	    	}

    	    }
    	},
    	components :{
    		shopcart,
    		cartcontrol,
    		food
    	}

       };
</script>
<style lang="stylus" rel="stylesheet/stylus">
	@import '../../common/stylus/mixin.styl'
.goods{
	display:flex;
	position: absolute;
	top:175px;
	left: 0;
	bottom: 46px;
	width: 100%;	
	overflow: hidden;
}
.goods .menu-warpper{
	flex: 0 0 80px;
	width: 80px;
	background: #f3f5f7;
}
.foods-warpper{
	flex: 1;
}
.goods .menu-item{
	display: table;
	height: 54px;
	width: 80px;
	line-height: 14px;
}      
.goods .description{
	margin-bottom: 10px;
	line-height: 12px;
	font-size: 12px;
}
.goods .decrease{
	bg-image('decrease_3');
	display : inline-block;
	vertical-align:top;
	width : 12px;
	height : 12px;
	margin-right : 2px;
	background-size : 12px; 12px;
	background-repeat : no-repeat;}
.goods .discount{
	bg-image('discount_3');
	display : inline-block;
	vertical-align:top;
	width : 12px;
	height : 12px;
	margin-right : 2px;
	background-size : 12px; 12px;
	background-repeat : no-repeat;}        	
.goods .guarantee{
	bg-image('guarantee_3');
	display : inline-block;
	vertical-align:top;
	width : 12px;
	height : 12px;
	margin-right : 2px;
	background-size : 12px; 12px;
	background-repeat : no-repeat;}
.goods .invoice{bg-image('invoice_3');
	display : inline-block;
	vertical-align:top;
	width : 12px;
	height : 12px;
	margin-right : 2px;
	background-size : 12px; 12px;
	background-repeat : no-repeat;}
.goods .special{
	bg-image("special_3");
	display : inline-block;
	vertical-align:top;
	width : 12px;
	height : 12px;
	margin-right : 2px;
	background-size : 12px; 12px;
	background-repeat : no-repeat;}
.goods .menu-warpper .text{	
	color:#474343;
	font-size:12px;
	display:table-cell;	
	vertical-align:middle;
	border-1px(rgba(7,17,27,.1))
}
.foods-warpper .title{
	padding-left:14px;
	height:26px;
	line-height:26px;
	border-left:2px solid #d9dde1;
	font-size:12px;
	color:rgb(147,153,159);
	background:#f3f5f7;
}
.food-item{
 	display : flex;
	margin : 18px;
	border-1px(rgba(7,17,27,.1));
	padding-bottom:18px;
}
.food-item:last-child{
	border-none();
	margin-bottom:0;
}
.food-item .icon{
	flex:0 0 57px;
	margin-right:10px;

}
.food-item .content{
	flex:1;
}
.food-item .content .name{
	margin: 2px 0 8px 0 ;
	height:14px;
	line-height:14px;
	font-size:14px;
	color:rgb(7,17,27);
}
.food-item .content .desc{
	margin-bottom:8px;
	line-height:10px;
	font-size:10px;
	color:rgb(147,153,159);

}
.food-item .content .extra{
	line-height:10px;
	font-size:10px;
	color:rgb(147,153,159);

}
.food-item .content .extra .count{
	margin-right:12px;
}
.food-item .content .price{
	font-weight:700;
	line-height:24px;
	display:inline-block;
}
.food-item .content .price .now{
	margin-right:8px;
	font-size:14px;
	color:rgb(240,20,20);

}
.food-item .content .price .old{
	text-decoration:line-through;
	font-size:10px;
	color:rgb(147,153,159);
}
.current{
	position:relative;
	z-index:10;
	margin-top: -1px;
	background:#fff;
	font-weight:700;
}
.current .text{
	border-none()
}
.cartcontrol-warpper{
	position:absolute;
	right : 0;
	bottom:12px;

}
</style>