<template>
	<div>
		<ul v-show='sets'>
			<li @touchend="getDetails(index,$event,item.id,item.shop_id)" @touchstart='getDetails(index,$event)' @touchmove='getDetails(index,$event)' :data-id='item.shop_id && item.shop_id !=0 ? item.shop_id : item.id' v-for='(item,index) in data' :key='index' :style="{minHeight: change ? '24.9vw' : '25vw' }"  class='dataid'>
				<dl :data-id='item.shop_id'>
					<dt><img  :data-id='item.shop_id' :src="item.image + '200_200.jpg'"></dt>
					<dd>
						<div :data-id='item.shop_id' class="top"  :style="{borderBottom: change ? 'none': item.activity  &&  item.activity.length == 0 ? 'none' :  '1px dashed #eee' , padding: change ? '0':'0 0 1vw 0'}">
							<p :data-id='item.shop_id' class="title"><span v-if='item.recommend == 1' class="recommend">推荐</span><span class="zh_name">{{item.zh_name || item.title}}</span>
							<img :data-id='item.shop_id' v-if='item.license == 2' src="/static/img/businessservice_icon_vip.png">
							</p>
							<p class="star" :data-id='item.shop_id'>
								<span class="starNUm">
									<div>
										<p :style="{ width	: item.score?  item.score * (10) + '%':item.star * (10) + '%' }"><img src="/static/img/vehicle_icon_star.png"></p>
									</div>
								{{item.score || item.star}}
								</span>
								<span>评论{{item.comments}}条</span>
								<span v-if='item.open && item.open.length' class="isOpen">营业中</span>
								<span v-if='item.open && !item.open.length' class="isOpens">歇业中</span>

							</p>
							<p class="where" :data-id='item.shop_id'>
								<span class="cate_title" v-if='item.cate_title || item.category_title'>{{item.cate_title  || item.category_title | re}}</span>
								<span v-if='item.playtime'>游玩时长：{{item.playtime}}</span>
								<span class="right">
									<span class="mon" v-if='item.price'>{{'$' + item.price}}/人 |</span>
									<span class="distance">{{item.distance}}英里</span>
								</span>
							</p>
						</div>
						<!-- 一条线 -->
						<div :data-id='item.shop_id'  v-if='item.activity' class="more" :class="show == index ? 'ismore' : ''" >
							<p v-for='(item,index) in item.activity'>
								<span v-if='item.verify == 1' class="juan">劵</span>
								<span v-if='item.verify == 0' class="hui">惠</span>
								<span class="activityCon" :data-id='item.id'>{{item.info || item.title}}</span>
								<span @click='showMore(index)' id='more' >8个活动▼</span>
							</p>
							 <!-- <p :data-id='item.shop_id' v-if='item.activity.length == 0' style="text-align: center;">此商家还没有活动和优惠哟</p> -->
							

						</div>
					</dd>
				</dl>
			</li>
		</ul>


	<div v-show='!sets' id="set">
				<div class="in">
					<span class="o"></span>
					<span class="t"></span>
					<span class="e"></span>
					<i id="texxxt">加载中 ...</i>
				</div>
			</div>

		<div v-show='sets && !none' id='next' @touchstart='next'>
					<div v-show='showff' class="fff"></div>

					<span id='xia' data-iid='id'>点击加载更多...</span>

		</div>
			<div style="width: 30vw;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
  	text-align: center;
  	line-height: 30vw;
    height: 30vw;
    background-image: -webkit-gradient(linear, 0 0, 0 bottom, from(#00d1b2), to(#fff));
	 -webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	font-size:5vw ;
}" v-if='none == 1'>
			<p>没有了</p>
		</div>


		</div>





</template>


<script>

	export default {
		data(){
			return({
				show:-1,
				change:0,
				id:null,
				sets:0,
				flag:1,
				count:0,
				showff:false,
				none:null

				
		
			})
		},
		methods:{
			next(){
				this.showff = 1
				setTimeout(()=>{
					this.showff = 0
				},3000)
				this.$emit('next',1)				

			},
			showMore(index){
				if(this.show == index && this.show != -1 ){
					this.show = -1
					return
				}
				this.show = index
			},

			getDetails(index,e,id,sid){
				 switch (e.type) {
	                case 'touchstart':
	                    this.flag = true;
	                    break;
	                case 'touchmove':
	                    this.flag = false;
	                    break;
	                case 'touchend':
	                    if(this.flag){
	                    	var qid;
	                     	  this.id = document.getElementsByClassName('dataid')[index].dataset.id
	                     	  if(this.$route.name == 'cate' || this.$route.name == 'jour'){
	                     	  		qid =	 id
	                     	  }else {
	                     	  	qid = sid	
	                     	  }
	                     	    
	                     	 
	                    		console.log(qid)
								this.$emit('toDetails',qid)
	                    }else{
	                    // 滑动事件
	                    console.log('move')
	                    }
	                        default:
	                            break;
	                    } 
				// if(!this.flag){
				// this.id = document.getElementsByClassName('dataid')[index].dataset.id

				// 	this.$emit('toDetails',this.id)

				// }
				// this.flag = 0




			

			}
		},
		props:{
			data:{
				type:Array
			},
			textNext:{
				type:String
			}
		},
		mounted(){
			console.log(this.$route.name)
			var duration = this.$route.name == 'cate' ? 5000 : 3500; 
			
			if(!this.data.length){
				var timer =  setTimeout(()=>{
					// setInterval


			 		if(this.data.length){ 
			 			clearInterval(timer) ;
			 			this.sets = 1
			 		}else if(localStorage.None == '1'){
			 			this.none = localStorage.None
			 			 this.sets = 1	
			 			clearInterval(timer);
			 		}
			 		
			 		
		 		},duration)



			 }
			 if(this.data.length){this.sets = 1}
		},
		filters:{
			re(va){
				var r = /,/;
				return va.replace(r,' | ')
			}
		},
		created(){
			if(this.$route.path.substring(6) =='jour'){
				this.change = 1
				console.log(this.change)
			}
		}
	}
</script>



<style scoped lang="scss">
#next{
	width: 100%;
	height: 20vw;
	background-color: #eee;
	position: relative;
	color: #334;
	text-align: center;
	line-height: 20vw;
	#xia{
		display: inline-block;
		font-size: 5vw;
		color: #01d2b3;
	}
	.fff{
			position: absolute;
			top: 0;
			width: 100%;
			height: 20vw;
			background-color: #00d1b2;
			opacity: .7;
			animation: change 5s infinite;
		}
}

#set{
		width: 100%;
			height: 60vw;
			position: relative;
	>.in{
			width: 26vw;
			height: 26vw;
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			text-align: center;
			line-height: 26vw;
			margin:auto;
			bottom: 0;
			/*animation: tr 5s infinite;*/
			transform-origin: center center ;
				>span{
					width: 6.66vw;
					height: 6.66vw;
					background-color: #334;
					display: inline-block;
					border-radius: 50%; 

				}
				>:nth-child(2){
					background-color: #00d1b2;
					transform: translateY(-11.4vw);
				}
				>:nth-child(1){
					animation: o 1s infinite;
				}
				>:nth-child(2){
					animation: t 1s infinite;

				}
				>:nth-child(3){
					animation: e 1s infinite;

				}
			>#texxxt{
				display: inline-block;
				color: red;
				font-size: 5vw;
				font-style: normal;
				font-weight: 600;	
				/*font-size: 20vw;*/
				animation:  aa 1s infinite;
				background-image: -webkit-gradient(linear, 0 0, 0 bottom, from(#00d1b2), to(#fff));
			    -webkit-background-clip: text;
			    -webkit-text-fill-color: transparent;
			}

		}

}
.ismore{
	height: 20vw !important;
}
	ul{
		width: 100%;
		border-top: 1px solid #eee;
		box-sizing: border-box;
		padding-left:4vw; 
		>li:not(:nth-child(1)){
			border-top: 1px solid #EEE;

		}
		>:nth-last-child(1){
			border-bottom: 1px solid #eee;

		}
		>li{
			padding-top: 4.5vw ;
			min-height: 36.66vw;
			box-sizing: border-box;
			font-size: 2.66vw;
			color: #666666;
			padding-right:4vw; 

			>dl{
				display: flex;
				>dt{
					width: 17.33vw;
					height: 17.33vw;
					margin-right: 2.66vw;
					>img{
						width: 17.33vw;
						height: 17.33vw;
					}
				}
				>dd{
					width: 80%;
					>.top{
						width: 100%;
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						height: 18vw;
						padding: 0 0 1vw 0;
						border-bottom: 1px dashed #eee;
						margin-bottom: 1vw;

						>.title{
							overflow: hidden;
							    text-overflow: ellipsis;
							    white-space: nowrap;
							>.recommend{
								display: inline-block;
								width: 7.2vw;
								height: 4vw;
								background-color: #ffec12;
								color: #6f3f15;
								line-height: 5vw;
								border-radius: 1vw;
								text-align: center;
								margin-right: 1.6vw;
							}
							>.zh_name{
								font-size: 3.73vw;
								color: #333333;
								font-weight: 600;
							}
							> img{
								width: 3.46vw;
								height: 3.46vw;
								float: right;
							}

						}
						>.star{
							>.isOpen,.isOpens{
								width: 8.93vw;
								height: 3.2vw;
								display: inline-block;
								color: #fff;
								font-size: 2.66vw;
								background: linear-gradient(to right ,#41e9d0, #01d1b2);
								float: right;
								text-align: center;
								line-height: 4vw;
							}
							>.isOpens{
								background: linear-gradient(to right ,#ff8777, #fb6b5c);

							}
							>.starNUm{
								margin-right: 5vw;
								background-image: url(/static/img/unstar.png);
								background-size: 15.66vw 2.66vw;
								background-repeat: no-repeat;

								>div{
									display: inline-block;
									width: 15.46vw;
									height: 2.66vw;

									>p{
										width: 15.46vw;
										height: 2.66vw;
										text-align: center;
										line-height: 2.66vw;
										display: inline-block;
										overflow: hidden;
										    transform: translateY(0.3vw);
										>img{
											width: 15.46vw;
											height: 2.66vw;
										}
									}
								}
							}
						}
						>.where{

							>.right{
								float: right;
							}
						}

					}
					>.more{
						height: 4vw;
						overflow: hidden;
						position: relative;
						>p{
							height: 4vw;
						}
						>:nth-child(1){
							>:nth-last-child(1){
								float: right;
							}
						}
						.juan,.hui{
							display: inline-block;
							width: 3.46vw;
							height: 3.46vw;
							background-color: #46bc9f;
							color: #fff;
							line-height: 3.46vw;
							font-size: 2.53vw;
							text-align: center;
							border-radius:.5vw; 
							margin-right: 1.06vw;
						}
						.hui{
							background-color: #f07f73;
						}
					}
				}
			}
		}

	}
	

</style>