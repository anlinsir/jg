<template>
	
	<div class="warp">
	
		<!-- 图片 -->



		<header>
			<span @click='toIndex' class="back"><img style="width: 2.66vw;height: 4.8vw;transform: translateY(4vw);" src="/static/img/businessservice_icon_return_whitess.png"></span>
			<span>{{title}}</span>
			<p @click='goToIndex'>
				<img class="aa" src="/static/img/home_icon_home_gray.png">
			</p>

		</header>

		<!--  图片展示页面 -->

		<main class="main" v-if='imgShow' >
			
			<div class="mainConent">
				<ul>
					<li v-for='(item,index) in imgs' :key='index'><img :src="item.image + '200_200.jpg' " alt="图片还在路上哦"></li>
			


				</ul>
			</div>
			<div class="mainFooter">
				查看更多图片，请	<span @touchstart='down'  @touchend='down'>下载简购生活APP</span>	
			</div>
		</main> 





		<main v-if='!imgShow' v-for='(item,index) in data' :key='index'>
			<div @touchstart='showImg' class="bigImg">
				<img :src="item.image + '200_200.jpg' ">
				<span v-if="query != 'jour'" class="viewM" @touchstart='down'>查看商家</span>
				<span class="photoNum"><img src="/static/img/businessservice_icon_photo.png">共{{item.mci_count ? item.mci_count : item.img_count ? item.img_count : "0"}}张照片</span>
			</div>
			<div class="infomation">
				<!-- title -->
				<p class="zh_name">
					<span>{{item.zh_name ? item.zh_name : item.title}}</span>
					<span>营业中</span>
				</p>

				<!-- .. -->
				<p class="en_name">
					<span>{{item.en_name || item.title_en}}</span>
				</p>
				<!-- .. -->
				<p class="star">
					<span class="starIMG"><span :style="{width: Number(item.score)*10 + '%'}"><img src="/static/img/vehicle_icon_star.png"></span></span> 
					<span style="display: inline-block;transform: translateY(-0.5vw) translateX(-1vw);font-size: 3vw"> {{item.star? item.star :item.score}} &nbsp;&nbsp;&nbsp;{{item.mc_count || item.comments}}评价</span>
					<span style="font-size: 3vw;">{{item.cate_title}}</span>
				</p>
					<!-- ... -->
				<p class="score" v-if="query != jour">
					<span>{{item.in_score ? '经验' + item.in_score : '游玩时间' + item.playtime}} </span>
					<span>{{item.se_score ? '水平' +item.se_score  :'' }}</span>
					<span> {{item.se_score ? '质量' + item.se_score : ''}}</span> 
					<span style="float: right;transform: translateX(8vw);">{{item.price && item.price.indexOf('$') == -1 ? '$' + item.price + '/人': item.distance + '英里'}} </span>
					<!-- |'  : ''}}{{item.distance + '英里' -->
				</p>
				<p class="palyTime" v-if="query == jour">
					<span>游玩时长：{{item.playtime  || '1-2小时'}}</span>
					<i>{{item.distance || '0'}} 英里</i>

				</p>

			</div>
			<div  class="discounts">
				<p  @touchstart='down' @touchend='down' @touchmove='down' :data-id='item.privilege_id'  v-for='(item,index) in item.activity' :key='index'>
					<span v-if='item.verify || item.has_game '>{{item.verify ? item.verify == 1 ? '券' :'惠' : item.has_game ? '玩' : ''}}</span>
					<span>{{item.title}}</span>
					<span class="spanBtn" v-if='item.has_game' style="float: right;display: inline-block;transform: translateY(2vw);">游戏</span>
					<span class="rows" v-if='!item.has_game' style="float: right;">></span> 
				</p>

				<p @touchstart='down' @touchend='down' @touchmove='down'>下载简购生活APP，享受更多优惠</p>

			</div>

			<div class="mapWarp">
				<div class="map" >
					<div style="width: 100%;height: 50vw;"  id='maps'>
  						  <!-- <baidu-map :center="center" :zoom="zoom" @ready="handler" style="width: 100%;height: 45vw;"></baidu-map> -->
						 <div id="mapsss" :data-id='lat' style="width:100%;height:40vw"></div>
					</div>
				</div>
				<div class="other">
					<p class="infomation">{{item.info ? item.info : '还没有介绍哦'}}</p>
					<p class="poenMore" v-if='item.info'>展开全文</p>
					<p class="phone">电话  <span class="text">{{item.tel}}</span><span @touchstart='down' @touchend='down' @touchmove='down' class="call">拨号</span></p>
					<p class="add"><span class="adddd">地址</span> <span class="text">{{item.address}}</span></p>
				</div>


			</div>

 

			<div class="comment" >
				
					<dl  class="down">
						<dt><img src="/static/img/phone.png"></dt>
						<dd @touchstart='down' @touchend='down' @touchmove='down'>
							<p>想参加{{item.zh_name ? item.zh_name : item.title}}的评论？</p>
							<p>下载简购生活APP立即参与</p>
						</dd>

					</dl>

				
				<p class="commentNum">
					<span>
						评论 · {{comment.length}}
					</span>
				</p>
				 <p class="noComment" v-if="comment.length == 0">目前还没有评论哦</p>

		 		<dl :data-id='items.comment_id' class="hasComment" v-if="comment.length != 0" v-for='(items,index) in comment.length ? comment : 1' :key='index'>  
					<dt><img :src="items.user_header" ></dt>
						<dd>
							<p><span class="naem">{{items.user_nickname}}</span><span class="tiime">{{items.create_time}}</span></p>
							<p class="starrr" style="margin-top: 2vw;">
								<span>
									<span :style="{width: items.score ? Number(items.score) * 10 + '%' : Number(items.star) * 10 + '%'}">
										<img style="width: 20.8vw;height: 3.73vw" src="/static/img/vehicle_icon_star.png">
									</span>
								</span>

								<span style="    float: none;
    transform: translateY(-0.25vw) translateX(1vw);
    display: inline-block;
">{{item.score ?item.score :item.star}}</span>
							</p>
							<p class="diration">{{items.comments}}</p>
							<div class="imgComent" style="width: 100%;
							display: flex;
							justify-content: space-between;
							">
								
								<img style="width: 25.5vw;
								height: 19.7vw;" :src="props.image + '200_200.jpg'" v-for='(props,index) in items.imgs' :key='index'>
								
							</div>
						</dd>
						
					</dl> 
				<p class="moreComment" @touchstart='down' @touchend='down' @touchmove='down'>更多评论，请用简购生活APP查看</p>

			</div>

			<div class="recommend">
				<div class="recommendHeader">
					<span>推荐商家</span>
				</div>

				<div class="moreCommends">



					<div @touchstart='moreDetail(it.id,$event)'  @touchend='moreDetail(it.id,$event)'  @touchmove='moreDetail(it.id,$event)' :data-id='it.id' class="commends" v-for='(it,index) in recommend'>
						<img :src="it.image + '200_200.jpg'">
						<p class="commendsTitle">{{it.zh_name ? it.zh_name : it.title}}</p>
						<p class="commendsStar">
							<span class="comstartIMg">
								<span :style="{width: Number(it.score) ? Number(it.score) * 10 + '%' : Number(it.star) * 10 + '%'}">
									<img src="/static/img/vehicle_icon_star.png">
								</span>
							</span>
							<span>${{it.price}}/人</span>
						</p>
						<p class="commendsWhere"><span style="display: inline-block;
    width: 22vw;
    height: 4vw;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;">{{it.cate_title ? it.cate_title : it.category_title ? it.category_title : '游玩时长：' + it.playtime}}</span><span>{{it.distance}}英里</span></p>

					</div>





				</div>

			</div>

			<div @touchstart='down' @touchend='down' @touchmove='down' class="bottomTip">
				<div  class="Warptext">
					<p >
					更多华人资讯，安装简购生活APP即可获得
					</p>
					<p>工作.房屋.车辆.二手.美食.优惠 本非生活</p>
					<p>只在简购生活APP！</p>
				</div>
			</div>


		</main>


		<Footer isShow='true'></Footer>




	</div>
</template>

 
<script>
	import axios from 'axios'
	import Footer from '../../components/footer'



 
	export default {
		components:{
			Footer
		},
		updated(){
			console.log(this.query)
			if(document.getElementById('mapsss')){
				var mapType = google.maps.MapTypeId.ROADMAP;
					var lat = this.lat, lng = this.lng, zoom = 15;
					var mapOptions = {
					    center: new google.maps.LatLng(lat, lng),  //地图的中心点
					    zoom: zoom,               　　　　　　　　　　//地图缩放比例
					    mapTypeId: mapType,       　　　　　　　　　　//指定地图展示类型：卫星图像、普通道路
					    scrollwheel: true          　　　　　　　　　 //是否允许滚轮滑动进行缩放
					};
					var map = new google.maps.Map(document.getElementById("mapsss"), mapOptions); //创建谷歌地图
					var marker = new google.maps.Marker({
					    map: map,
					    position: new google.maps.LatLng(lat, lng)
					});
			}
		},
		methods:{
			down(e){
				console.log(e.type)
			 switch (e.type) {
	                case 'touchstart':
	                    this.flag = true;
	                    break;

	                case 'touchmove':
	                    this.flag = false;
	                    break;
	                case 'touchend':
	                    if(this.flag){
	                     this.imgShow = false
									if( window.navigator.userAgent.indexOf('iPhone' || 'iPad' || 'iPod') != -1){
								 	
							
											if(this.$route.query.tyep == 'mer'){
											 	// window.location.href =`jglist://deeplinks/openWith?grand_id=12&id=${this.$route.params.id}`
											 	window.location.href =`com.ziqi.easylife://12&${this.$route.params.id}`;
											}else if(this.$route.query.tyep == 'cate'){
												window.location.href =`com.ziqi.easylife://6&${this.$route.params.id}`;
											 	// window.location.href =`jglist://deeplinks/openWith?grand_id=6&id=${this.$route.params.id}`
											}else if(this.$route.query.tyep == 'jour'){
												window.location.href =`com.ziqi.easylife://8&$${this.$route.params.id}`;
											 	// window.location.href =`jglist://deeplinks/openWith?grand_id=8&id=${this.$route.params.id}`
											}
										setTimeout(()=>{
											window.location.href = 'https://itunes.apple.com/cn/app/id1192657874?mt=8'
										},2000)
										
									}else if(window.navigator.userAgent.indexOf('Android') != -1){
											if(this.$route.query.tyep == 'mer'){
											 	window.location.href =`jglist://deeplinks/openWith?grand_id=12&id=${this.$route.params.id}`
											}else if(this.$route.query.tyep == 'cate'){
											 	window.location.href =`jglist://deeplinks/openWith?grand_id=6&id=${this.$route.params.id}`
											}else if(this.$route.query.tyep == 'jour'){
											 	window.location.href =`jglist://deeplinks/openWith?grand_id=8&id=${this.$route.params.id}`
											}
											setTimeout(()=>{
												window.location.href = 'https://jglist.onelink.me/1789171185?pid=mobileWebPage'
											},2000)
									}
	                    }else{
	                    // 滑动事件
	                    

	                    }
	                        default:
	                            break;
	                    } 


				
			},
			jour(){

			},	
			moreDetail(id,e){
				console.log(e.type)
				console.log(id)
				 switch (e.type) {
	                case 'touchstart':
	                    this.flag = true;
	                    break;
	                case 'touchmove':
	                    this.flag = false;
	                    break;
	                case 'touchend':
	                	console.log(this.flag)
	                    if(this.flag == true){
	                       if(this.$route.query.tyep == 'jour'){
								this.$router.push({path:`/detailT/${id}`,query:{tyep:"jour"}})
								location.reload()
								return
							}else if(this.$route.query.tyep == 'mer'){

								this.$router.push({path:`/detailT/${id}`,query:{tyep:"mer"}})
									location.reload()
								}else{
									this.$router.push({path:`/detailT/${id}`,query:{tyep:"cate"}})
									location.reload()
								}

	                    }else{
	                    // 滑动事件
	                    return
	                    

	                    }
	                        default:
	                            break;
	                    } 
			

			},

			toIndex(){
				//this.$router.push('/index')
				//退后
				if(this.imgShow){
					this.imgShow = false
					return
				}
				history.back(1)
				setTimeout(()=>{
					if(this.$route.params.id){
						location.reload()
					}
				},200)
				
			},
			showImg(e){
				if(e.target.className == 'viewM'){
					if( window.navigator.userAgent.indexOf('iPhone' || 'iPad' || 'iPod') != -1){
											if(this.$route.query.tyep == 'mer'){
											 	window.location.href =`jglist://deeplinks/openWith?grand_id=12&id=${this.$route.params.id}`
											}else if(this.$route.query.tyep == 'cate'){
											 	window.location.href =`jglist://deeplinks/openWith?grand_id=6&id=${this.$route.params.id}`
											}else if(this.$route.query.tyep == 'jour'){
											 	window.location.href =`jglist://deeplinks/openWith?grand_id=8&id=${this.$route.params.id}`
											}
										setTimeout(()=>{
											window.location.href = 'https://jglist.onelink.me/1789171185?pid=mobileWebPage'
										},1500)
										
									}else if(window.navigator.userAgent.indexOf('Android') != -1){
											if(this.$route.query.tyep == 'mer'){
											 	window.location.href =`jglist://deeplinks/openWith?grand_id=12&id=${this.$route.params.id}`
											}else if(this.$route.query.tyep == 'cate'){
											 	window.location.href =`jglist://deeplinks/openWith?grand_id=6&id=${this.$route.params.id}`
											}else if(this.$route.query.tyep == 'jour'){
											 	window.location.href =`jglist://deeplinks/openWith?grand_id=8&id=${this.$route.params.id}`
											}
											setTimeout(()=>{
												window.location.href = 'https://jglist.onelink.me/1789171185?pid=mobileWebPage'
											},1500)
									}
					return
				}

				
				this.imgShow = true
			if(this.$route.query.tyep == 'mer'){


				axios.get(`https://time2.jglist.com/index.php?r=merchant/shop/images&auth_name=name&name=1&shop_id=${this.$route.params.id}&tx=3f556f66353c5945a3633ae209a3e0ff`)
								.then(res=>{
									this.imgs = res.data.data
				})
			}
			if(this.$route.query.tyep == 'cate'){
				axios.get(`https://time2.jglist.com/index.php?r=delicacy/food/images&auth_name=name&food_id=${this.$route.params.id}&name=1&tx=3f556f66353c5945a3633ae209a3e0ff`)
					.then(res=>{
						this.imgs = res.data.data
				})		

			}
			if(this.$route.query.tyep == 'jour'){
				axios.get(`https://time2.jglist.com/index.php?r=newtravel/travel/images&auth_name=name&name=1&travel_id=${this.$route.params.id}&tx=3f556f66353c5945a3633ae209a3e0ff`)
					.then(res=>{
						console.log(res.data.data)
						this.imgs = res.data.data
				})
			}



				
			},
			goToIndex(){
				this.$router.push('/index')
			},
			 
		},
		data(){
			return({
				data:[],
				comment:[],
				recommend:[],
				imgs:[],
				title:null,
				query:null,
				imgShow:false,
				flag:true,
				lat: 39.915168, 
				lng:116.403875
				
					
			})
		},
		created(){
				this.query =  this.$route.query.tyep

			if(this.$route.query.tyep == 'mer'){
				axios.get(`https://time2.jglist.com/index.php?r=merchant/shop/shopinfo&auth_name=name&name=1&shop_id=${this.$route.params.id}&tx=3f556f66353c5945a3633ae209a3e0ff&user_id=1402`)
					.then(res=>{

						this.data = [res.data.data]
						this.title =res.data.data.zh_name
						console.table(this.data)
						this.lat = this.data[0].lat
						this.lng =  this.data[0].lng
					})
				axios.get(`https://time2.jglist.com/index.php?r=merchant/shop/commentlist&auth_name=name&merchant_id=0&name=1&shop_id=${this.$route.params.id}&tx=3f556f66353c5945a3633ae209a3e0ff`)//评论列表
					.then(res=>{
						this.comment = res.data.data
					})
				axios.get(`https://time2.jglist.com/index.php?r=merchant/shop/recommend&auth_name=name&name=1&shop_id=${this.$route.params.id}&tx=3f556f66353c5945a3633ae209a3e0ff`) // 推荐
					.then(res=>{
						this.recommend = res.data.data
				})

			
					
			}


			if(this.$route.query.tyep == 'cate'){
																																			//变量
				axios.get(`https://time2.jglist.com/index.php?r=delicacy/food/details&auth_name=name&food_id=${this.$route.params.id}&lat=30.55102013717875&lng=104.06901177707833&name=1&tx=3f556f66353c5945a3633ae209a3e0ff`)
						.then(res=>{
							console.table(res.data.data)
							this.data = [res.data.data]
							this.title = res.data.data.title
							this.lat = this.data[0].lat
						this.lng =  this.data[0].lng
					})
				axios.get(`https://time2.jglist.com/index.php?r=delicacy/food/comments&auth_name=name&food_id=${this.$route.params.id}&name=1&tx=3f556f66353c5945a3633ae209a3e0ff`)
					.then(res=>{
						this.comment = res.data.data
					})
					
				axios.get(`https://time2.jglist.com/index.php?r=delicacy/food/recommend&auth_name=name&id=${this.$route.params.id}&lat=30.55102013717875&lng=104.06901177707833&name=1&tx=3f556f66353c5945a3633ae209a3e0ff`)
					.then(res=>{
						this.recommend = res.data.data
				})
				

					// https://time2.jglist.com/index.php?r=delicacy/food/images&auth_name=name&food_id=9600&name=1&tx=3f556f66353c5945a3633ae209a3e0ff
			}

			//周边  ajax
			// 

			if(this.$route.query.tyep == 'jour'){
				axios.get(`https://time2.jglist.com/index.php?r=newtravel/travel/details&auth_name=name&name=1&travel_id=${this.$route.params.id}&tx=3f556f66353c5945a3633ae209a3e0ff&user_id=1402`)
						.then(res=>{
							this.data = [res.data.data]
							this.title = res.data.data.title
							this.lat = this.data[0].lat
						this.lng =  this.data[0].lng

				})
				axios.get(`https://time2.jglist.com/index.php?r=newtravel/travel/comments&auth_name=name&name=1&travel_id=${this.$route.params.id}&tx=3f556f66353c5945a3633ae209a3e0ff`)
					.then(res=>{
						this.comment = res.data.data
				})


				axios.get(`https://time2.jglist.com/index.php?r=newtravel/travel/recommend&auth_name=name&id=${this.$route.params.id}&name=1&tx=3f556f66353c5945a3633ae209a3e0ff`)
					.then(res=>{
						this.recommend = res.data.data
				})
				
					// https://time2.jglist.com/index.php?r=newtravel/travel/images&auth_name=name&name=1&travel_id=49&tx=3f556f66353c5945a3633ae209a3e0ff


			}


	
		}
	}


</script>



<style scoped lang="scss">
.warp{
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		background-color: #f3f3f3;

		>header{
			width: 100%;
			height: 11.73vw;
			background-color: #fff;
			padding: 0 4vw;
			box-sizing: border-box;
			font-size: 4vw;
			text-align: center;
			line-height: 11.73vw;
			overflow: hidden;
				:nth-child(1){
				float: left;
				width: 10vw;
				display: inline-block;
			}
			:nth-child(3){
				float: right;
				:nth-child(1){
					transform: translateX(0vw);
					width: 7vw;
					margin-top: 2.5vw;
					display:inline-block;
				}
				.aa{
					display: inline-block;
					width: 8vw;
					margin-top: 2.5vw;


				}

			}
			.back{
				display: inline-block;
				width: 5vw;
				font-size: 8vw;
				color: #00d1b2;
				
			}

		}
		>.main{
			width: 100%;
			height: 100%;
			background-color: #fff;
			border-top: 1px solid #eee;
			display: flex;
			flex-direction: column;
			padding: 0 4vw;
			box-sizing: border-box;
			>.mainConent{
				flex:1;	
				>ul{
					width: 100%;
					min-height: 60vw;
					display: flex;
					padding: 2vw 0;
					box-sizing: border-box;
					flex-wrap: wrap;
					justify-content: space-between;
					>li{
						width: 29.46vw;
						margin-bottom: 1.86vw;
						height: 29.46vw;
						>img{
							width: 100%;
							height: 100%;
						}


					}
				}
			}
			>.mainFooter{
				text-align: center;
				margin-bottom: 3vw;
				font-size: 3.33vw;
				color: #333333;
				>span{
					color: #00d1b2;
				}
			
			}

		}

		>main{
			overflow: auto;
			flex: 1;
			>.bigImg{
				width: 100%;
				height: 68VW;
				position: relative;

				>img{
					width: 100%;
					height: 100%;
						background-color: #111;

				}
				>span{
					position: absolute;
					bottom: 4vw;
				}
				>.viewM{
					left: 4vw;
					display: inline-block;
					width: 18.92vw;
					height: 6.66vw;
					background-color: #f9c951;
					font-size: 3.06vw;
					color: #353535;
					text-align: center;
					line-height: 6.66vw;

					border-radius: 1vw;
				}
				>.photoNum{
					right: 4vw;
					font-size: 2.4vw;
					color: #fff;

					>img{
						width: 4.26vw;
						height: 3.33vw;
						margin-right: 1.33vw;
						vertical-align: middle;
					}
				}

			}

			>.infomation{
				background-color: #fff;
				width: 100%;
				height: 30.92vw;
				box-sizing: border-box;
				padding: 0 4vw;
				overflow: hidden;
				>.zh_name{
					width: 92vw;
					font-size: 4.26vw;
					margin-top: 4vw;
					overflow: hidden;
overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

					>:nth-child(1){}

					>:nth-child(2){
						float: right;
						display: inline-block;
						width:10vw;
						background: linear-gradient(to right ,#41e9d0, #01d1b2);
						font-size: 1vw;
						color: #fff;
						text-align: center;
						font-size: 2.26vw;
						line-height: 4vw;
						height: 4vw;


					}
				}
				>.en_name,.star , .score,.palyTime{
					font-size: 2.8vw;
					color: #999999;
				}
				>.en_name, .star{
					margin-bottom: 3.2vw;
				}
				>.star{
					>.starIMG{
						display: inline-block;
						height: 3.73vw;
						width: 20.8vw;
						background-image: url(/static/img/unstar.png);
						background-size: 20.8vw 3.73vw;
						background-repeat: no-repeat;
						>span{
							display: inline-block;
							width: 10.8vw;
							overflow:hidden;
							height: 3.73vw;

							>img{
								width: 20.8vw;
								height: 100%;
							}
						}
					}
					>:nth-child(1){
						margin-right: 3vw;
					}
					>:nth-child(3){
						float: right;
					}

				}
				>.palyTime{
					>i{
						float: right;
					}
				}
				>.score{
					>span{
						margin-right: 8vw;

					}
					>i{
						float: right;
					}
				}

			}
			>.discounts{
				background-color: #fff;

				width: 100%;
				margin-top: 2.66vw;
				min-height: 11vw;
				box-sizing: border-box;
				>p:not(:nth-last-child(1)){
					border-bottom: 1px dashed #dbdbdb;

				}
				>:nth-last-child(1){
					text-align: center;
					color: #00d1b2;
					font-size: 4vw;
				}
				>p{
					height: 11.73vw;
					width: 100%;
					padding: 0 4vw;
					box-sizing: border-box;
					line-height: 11.73vw;
					font-size: 3.33vw;
					color: #666666;
				}
				>p{
					>:nth-child(1){
						width: 5.06vw;
						height: 5.06vw;
						background-color: #70bc46;
						display: inline-block;
						text-align: center;
						line-height: 5.06vw;
						color: #fff;
						font-size: 2.8vw;
						margin-right: 2.8vw;
					}
					>:nth-child(2){
						font-size: 3.06vw;
						color: #666666;
					}
					>.spanBtn{
						width: 13.33vw;
						height: 6.66vw;
						background-color: #ffa84b;
						color: #fff;
						font-size: 3.33vw;
						display: inline-block;
						text-align: center;line-height: 6.66vw;
						border-radius: 1vw;
					}
				}

			}
			>.mapWarp{
				background-color: #fff;
				margin: 2.66vw 0;
				width: 100%;
				min-height: 77vw;
				box-sizing: border-box;
				>.map{
					height: 44.4vw;
					box-sizing: border-box;
					>img{
						width: 100%;
						height: 100%;
						background-color: #111;
					}
				}
				>.other{
					min-height: 30.6vw;
					padding: 4vw 4vw;
					box-sizing: border-box;
					>p{
						font-size: 3.06vw;
						color: #666666;

					}
					>.infomation{
						height: 8.5vw;
						overflow: hidden;
					}
					>.poenMore{
						margin-bottom:5.33vw;
						margin-top: 2.66vw; 
					}
					>.phone{
						margin-bottom: 3.33vw;
						>.call{
							float: right;
							color: #31aefe;
						}
					}
					>.add{
						position: relative;
						>.adddd{
							width: 10%;
							position: absolute;
							top: 0;
						}
						>.text{
							position: absolute;
							right: 1vw;
							display: inline-block;
							width: 90%;
							min-height: 3.06vw;
							word-break: break-all;
						}
					}


				}
			}
			>.comment{
		
				margin-bottom: 2.66vw;
				width: 100%;
				min-height: 77.33vw;
				background-color: #fff;
				p,dl{
					font-size: 3.2vw;
					color: #666666;
				
				}
				>.down{
					display: flex;
					height: 18vw;
					border-bottom:1px solid #eeeeee;
					padding: 0  4vw;
					padding-top: 3.73vw;					
					box-sizing: border-box;
					overflow: hidden;
					>dt{
						width: 6.93vw;
						height: 10.66vw;
						margin-right: 2.66vw;
						>img{
								width: 6.93vw;
						height: 10.66vw;
						}
					}
					>dd{
						width: 100%;
						>p:nth-child(1){
							color: #333333;
							overflow: hidden;
							text-overflow:ellipsis;
							width: 100%;
							margin-bottom: 1.5vw;
							white-space: nowrap;
							word-break: break-all;

						}
						>p:nth-child(2){
							color: #00d1b2;
							font-size: 4vw;

						}
					}

					
				}
				>.commentNum{
					padding: 0 4vw;
					box-sizing: border-box;
					width: 100%;
					height: 13.33vw;
					line-height: 13.33vw;
					border-bottom:1px solid #eeeeee;
					>span{
						display: inline-block;
						line-height: 5.33vw;
						padding-left:1.33vw; 
						height: 5.33vw;
						font-size: 3.2vw;
						border-left: 4px solid #00d1b2;
					}

				}
				>.noComment{
					padding: 0 4vw;
					box-sizing: border-box;
					width: 100%;
					height:54.26vw;
					color: #00d1b2;
					font-size: 5vw;
					text-align: center;
					line-height: 54.26vw;
					border-bottom:1px solid #eeeeee;

				}
				>.hasComment{
					min-height: 32vw;
					width: 100%;
					border-bottom:1px solid #eeeeee;
					display: flex;
					padding:4vw;
					box-sizing: border-box;
					position: relative;
					>dt{
						width: 9.33vw;
						height: 9.33vw;
						border-radius: 50%;
						margin-right: 2.66vw;

						>img{
							width: 9.33vw;
							height: 9.33vw;
							border-radius: 50%;
						}
					}
					>dd{
						width: 87%;
						min-height: 9.33vw;
					
						>p{
							>:nth-child(2){
								float: right;
							}	
						}
						.starrr{
							>:nth-child(1){
								display: inline-block;
								width: 20.8vw;
								height: 3.73vw;
								overflow: hidden;
								background-image: url(/static/img/unstar.png);
								background-repeat: no-repeat;
								background-size: 20.8vw 3.73vw;
								>span{
										display: inline-block;
										width: 20.8vw;
										height: 3.73vw;
										overflow: hidden;

								}
							}

						}
						.diration{
							margin-top: 1vw;
							width: 100%;
							min-height: 5vw; 
							/*height: 5vw;*//* 点击展开待实现*/ 

							overflow: hidden;
							
						}
						>imgComent{
							width: 100%;
							display: flex;

							justify-content: space-between;
							border: 1px solid red;
							>img{
								width: 25.5vw;
								height: 19.7vw;
							}
						}
						
					}
				
				}

				>.moreComment{
					width: 100%;
					height: 13.33vw;
					font-size: 3.2vw;
					color: #00d1b2;
					text-align: center;
					line-height: 13.33vw;

				}
			}
			>.recommend{
				width: 100%;
				background-color: #fff;
				min-height:72vw;
				box-sizing: border-box;
				padding: 0vw 4vw 0 ;
				font-size: 3.33vw;
				>.recommendHeader{
					width: 100%;
					height: 13.33vw;
					line-height: 13.33vw;
					>span{
						display: inline-block;
						height: 5.33vw;
						border-left: 4px solid #00d1b2;
						color: #999999;
						line-height: 5.33vw;
						padding-left: 2.13vw;
						box-sizing: border-box;
					}
				}
				>.moreCommends{
					width: 100%;
					display: flex;	
					flex-wrap: wrap;
					min-height: 59vw;
					box-sizing: border-box;
					justify-content: space-between;
					>.commends{
						width: 44vw;
						height: 56vw;
						box-sizing: border-box;
						margin-bottom: 2.26vw;
						>img{
							width: 100%;
							height: 35.6vw;
						}
						>p{
							margin-bottom: 2.26vw;
						}
						>.commendsTitle{
							font-weight: 600;
							    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
							font-size: 3.06vw;
							color: #353535;
						}
						>.commendsStar{
							font-size: 2.26vw;
							color: #999999;
							>.comstartIMg{
								width: 20.8vw;
								display: inline-block;
								height: 3.73vw;
								background-image: url(/static/img/unstar.png);
								background-repeat: no-repeat;
								background-size: 20.8vw 3.73vw;
								>span{
									display: inline-block;
									height: 3.73vw;
									overflow: hidden;
									>img{
										width: 20.8vw;
									height: 3.73vw;
									}
								}

							}
							>:nth-child(2){
								float: right;
							}
						}
						>.commendsWhere{
							font-size: 3vw;
							color: #999999;
							>:nth-child(2){
								float: right;
							}
						}

					}
				}
			}
			>.bottomTip{
				width: 100%;
				height: 22.26vw;
				>.Warptext{
					width: 100%;
					text-align: center;
					margin-top: 6.5vw;
					font-size: 3.2vw;
					color: #00d1b2;

				}
			}

		}

}
	


</style>