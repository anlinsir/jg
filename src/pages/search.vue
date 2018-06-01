<template>
	<div class="warp">
		
		<Header left='2' color='#00d1b2' @backk='backk'  @getVal='getVal'></Header>

		<main>
			 <dl v-if='part != 3 && part != 7'  @click='down(item.id,item.privilege_id,item.shop_id)' v-for='(item,index) in productList' :key='index' >
				<dt><img v-if='item.image' :src="item.image+'200_200.jpg'"></dt>
				<dd>
					<p><span v-if='item.isStick' style="display: inline-block;display: inline-block;
							width: 7.2VW;
							height: 4vw;
							font-size: 2.5vw;
							transform: translateY(-0.5vw);
							margin-right: 1vw;
							background-color: #ffef07;
							color: #6f3f15;
							border-radius: 1vw;

							text-align: center;
							line-height: 4.5vw;">置顶</span>{{item.title || item.zh_name}}</p>
					<p  style="marginBottom: 5vw;marginTop:1vw; ">

						<span class="starB" v-if='(item.score || item.star)' :style="{color: (item.score || item.star) ? '#999' :''}">
							<span class="starW" :style="{width:(Number(item.score) || Number(item.star)) * 10 + '%'}">
								<img src="/static/img/vehicle_icon_star.png">
							</span>
						</span>




						<span :style="{color: (item.score || item.star) ? '#999' :'',float:'none'}" class="star">{{ item.price && item.price !='$' && item.price.indexOf('.') != -1 ? item.price =='0.00' ? '面议' : '$' + item.price : (item.score? item.score + '分' :  item.star? item.star : '')   +' &nbsp; 评论' + (item.comments || item.recommend)  + '条' }}</span><span v-if='item.role || item.open'  id='role'

					 :style="{color: item.role ?  item.role == 1 ? '#00d1b2' : item.role == 2 ? '#fb6b5c' :'#ffa84b' : item.open  ?  item.open.length ?'#fff' :'#fff' :'',background:item.open? item.open.length ? 'linear-gradient(to right, #41e9d0, #01d1b2)':'linear-gradient(to right, #ff8777, #fb6b5c)' : '' ,float:'right'}">


					{{item.role ? item.role == 1 ? '个人' : item.role == 2 ? '商家' :  '经纪人' : item.open  ? item.open.length ? '营业中' :'歇业中' :'' }}</span></p>
					<p><span>{{item.city ||item.cate_title || item.category_title || '游玩时长 ' + item.playtime}}</span><span>{{item.area}}</span><span>{{item.price&& item.price.indexOf('.') == -1 ?  '$'+ item.price + '/人 | ' : ''}}{{item.create_time  ? item.create_time : item.distance +'公里'}}</span></p>
				</dd>
			</dl> 



		<div  v-if='part == 3'	@click='todetails(item.id)' :data-id='item.id' id='id' class="workBaseWarp" v-for='(item,index) in productList' :key='index'>
			<div class="workBase bx">
				<div class="top">
					<p class="topOne">
						<span><span v-if='item.isStick' style="display: inline-block;display: inline-block;
							width: 7.2VW;
							height: 4vw;
							font-size: 2.5vw;
							transform: translateY(-0.5vw);
							margin-right: 1vw;
							background-color: #ffef07;
							color: #6f3f15;
							border-radius: 1vw;

							text-align: center;
							line-height: 4.5vw;">置顶</span>{{item.title}}</span>
						<span  data-id='call' @click='openAPP'>立即联系</span>
					</p>

					<p class="topTwo">
						<span><span v-if='Number(item.price) != 0'>$</span>{{Number(item.price)  == '0' ? '面议' : Number(item.price)  + '/月'}}</span>
						<span><img src="/static/img/work_icon_position.png"> &nbsp;<span>{{item.position}}</span></span>
					</p>
					
				</div>
				<!-- bom -->
				<div class="bom">
					<p class="bomOne">
						<time>{{item.create_time}}</time>
						<span>{{item.address}} {{item.area}}</span>
					</p>
				</div>
			</div>


		</div>



		<div class="grey" v-if='part == 7'>
		<div class="priBox">
			<div   :data-id='item.privilege_id' class="priItem"  v-for = "(item,index) in productList" :key='index'>
				<p class="img"><img :src="item.image + '200_200.jpg'"></p>
				<div class="text">
					<p class="top"><span v-if='item.recommend != 0' class="tui">推荐</span><span class="title">{{item.title}}</span></p>
					<p class="btm"><span>{{item.cate_title}}</span><span>{{item.browse + '浏览 | ' +item.distance + '英里'}}</span></p>
				</div>
				<p class="right" v-if='!item.verify '>
					<span >
						{{item.verify ?  '立即领取' :'查看详情' }}
					</span>
				</p>
				<p class="right2" v-if='item.verify'>
					<span >
						{{item.verify ?  '立即领取' :'查看详情' }}
					</span>
				</p>
			</div>
		</div>
	</div>













<div v-show='sets' id="set">
				<div class="in">
					<span class="o"></span>
					<span class="t"></span>
					<span class="e"></span>
					<i id="texxxt">加载中 ...</i>
				</div>
	</div>
<div v-show='setss' id='next' @touchstart='next'>
					<div v-show='showff' class="fff"></div>

					<span id='xia' data-iid='id'>点击加载更多...</span>

		</div>

	
	
		</main>
	
		<Footer></Footer>

	</div>


</template>


<script>
	import axios from 'axios'
	import Header from '../components/header'
	import Footer from '../components/footer'
	export default {
		data(){
			return({
				productList:[],
				sets:false,
				part:null,
				val:null,
				setss:false,
				showff:false
				,part:null

			})
		},
		components:{
			'Header':Header,
			'Footer':Footer
		},
		methods:{
			openAPP(){
				console.log('giuoiijk')
			},
			todetails(id){

				this.$router.push({path:`/details/${id}`,query:{g:3}})				
			},
			next(){
				
			localStorage.searchPages = Number(localStorage.searchPages) + 1
			console.log(localStorage.searchPages)
				this.showff = true
				if(this.$route.query.part == 1 || this.$route.query.part == 2 || this.$route.query.part == 3 ||this.$route.query.part == 4){
				axios.get(`https://time2.jglist.com/index.php?r=v2/magor/lists&auth_name=id&cate_id=0&grand_id=${this.$route.query.part}&id=1&tx=3f556f66353c5945a3633ae209a3e0ff&search=${this.val}&page=${localStorage.searchPages}`)

					.then((res)=>{

						console.log(res.data.data)
						if(!res.data.data.length){
							this.showff = false
							alert('暂时没有相关的数据')

							return
						}
						for(let i in res.data.data){
						this.productList.push(res.data.data[i])
						}
						this.showff = false
						
					})
				}else if(this.$route.query.part == 5){
					axios.get(`https://time2.jglist.com/index.php?r=merchant/shop/list&auth_name=id&grand_id=5&id=1&name=${this.val}&tx=3f556f66353c5945a3633ae209a3e0ff&page=${localStorage.searchPages}`)
						.then((res)=>{
							console.log(res.data.data)
							if(!res.data.data.length){
								this.showff = false
								alert('暂时没有相关的数据')
								return
							}
							for(let i in res.data.data){
								this.productList.push(res.data.data[i])
							}
						this.showff = false
							
						})
				}else if(this.$route.query.part == 6){
					https://time2.jglist.com/index.php?r=delicacy/food/list&auth_name=id&grand_id=6&id=1&tx=3f556f66353c5945a3633ae209a3e0ff&search=%E5%8A%B3
					axios.get(`https://time2.jglist.com/index.php?r=delicacy/food/list&auth_name=id&grand_id=6&id=1&tx=3f556f66353c5945a3633ae209a3e0ff&search=${this.val}&page=${localStorage.searchPages}`)
						.then((res)=>{
							console.log(res.data.data)
							if(!res.data.data.length){
								this.showff = false
								alert('暂时没有相关的数据')
								return
							}
							for(let i in res.data.data){
								this.productList.push(res.data.data[i])
							}
						this.showff = false

						})
				}else if(this.$route.query.part == 7){
					axios.get(`https://time2.jglist.com/index.php?r=merchant/shop/privilegelist&auth_name=id&id=1&lat=30.55102013717875&lng=104.06901177707833&tx=3f556f66353c5945a3633ae209a3e0ff&search=${this.val}&page=${localStorage.searchPages}`)
						.then((res)=>{
							console.log(res.data.data)
							if(!res.data.data.length){
								this.showff = false
								alert('暂时没有相关的数据')
								return
							}
							for(let i in res.data.data){
								this.productList.push(res.data.data[i])
							}
						this.showff = false

						})
				}else if(this.$route.query.part == 8){
					axios.get(`https://time2.jglist.com/index.php?r=newtravel/travel/list&auth_name=id&grand_id=8&id=1&search=${this.val}&tx=3f556f66353c5945a3633ae209a3e0ff&page=${localStorage.searchPages}`)
						.then((res)=>{
							console.log(res.data.data)
							if(!res.data.data.length){
								this.showff = false
								alert('暂时没有相关的数据')
								return
							}
							for(let i in res.data.data){
								this.productList.push(res.data.data[i])
							}
						this.showff = false

						})
					
				}
			},
			backk(val){


			},
			getVal(val){
				if(this.productList.length != 0){
					this.productList = []

				}
				this.sets = true
				this.setss = false
				localStorage.searchPages = 1
				// ${localStorage.searchPages? localStorage.searchPages : 1}
				this.val =  val
				console.log(this.val,this.$route.query.part)
				//https://time2.jglist.com/index.php?r=merchant/shop/list&auth_name=id&category_child=0&grand_id=5&id=1&lat=32&lng=123&name=%E7%94%B5&tx=3f556f66353c5945a3633ae209a3e0ffx
				console.log(`https://time2.jglist.com/index.php?r=v2/magor/lists&auth_name=id&cate_id=0&grand_id=${this.$route.query.part}&id=1&tx=3f556f66353c5945a3633ae209a3e0ff${this.val}&page=1`)
				if(this.$route.query.part == 1 || this.$route.query.part == 2 || this.$route.query.part == 3 ||this.$route.query.part == 4){
				axios.get(`https://time2.jglist.com/index.php?r=v2/magor/lists&auth_name=id&cate_id=0&grand_id=${this.$route.query.part}&id=1&tx=3f556f66353c5945a3633ae209a3e0ff&search=${this.val}&page=1`)

					.then((res)=>{
						if(!res.data.data.length){
							alert('暂时没有相关的数据')
							this.sets = 0
							return
						}
						console.log(res.data.data)
						this.productList = res.data.data
						this.sets = false
						this.setss = true
					})
				}else if(this.$route.query.part == 5){
					axios.get(`https://time2.jglist.com/index.php?r=merchant/shop/list&auth_name=id&grand_id=5&id=1&name=${this.val}&tx=3f556f66353c5945a3633ae209a3e0ff`)
						.then((res)=>{
							if(!res.data.data.length){
								alert('暂时没有相关的数据')
								this.sets = 0
								return
							}
							console.log(res.data.data)
							this.productList = res.data.data
							this.sets = false
						this.setss = true

						})
				}else if(this.$route.query.part == 6){
					https://time2.jglist.com/index.php?r=delicacy/food/list&auth_name=id&grand_id=6&id=1&tx=3f556f66353c5945a3633ae209a3e0ff&search=%E5%8A%B3
					axios.get(`https://time2.jglist.com/index.php?r=delicacy/food/list&auth_name=id&grand_id=6&id=1&tx=3f556f66353c5945a3633ae209a3e0ff&search=${this.val}`)
						.then((res)=>{
							if(!res.data.data.length){
								alert('暂时没有相关的数据')
								this.sets = 0
								return
							}

							console.log(res.data.data)
							this.productList = res.data.data
							this.sets = false
						this.setss = true
						})
				}else if(this.$route.query.part == 7){
					axios.get(`https://time2.jglist.com/index.php?r=merchant/shop/privilegelist&auth_name=id&id=1&lat=30.55102013717875&lng=104.06901177707833&tx=3f556f66353c5945a3633ae209a3e0ff&search=${this.val}`)
						.then((res)=>{
							if(!res.data.data.length){
								alert('暂时没有相关的数据')
								this.sets = 0
								return
							}

							console.log(res.data.data)
							this.productList = res.data.data
							this.sets = false
						this.setss = true
						})
				}else if(this.$route.query.part == 8){
					axios.get(`https://time2.jglist.com/index.php?r=newtravel/travel/list&auth_name=id&grand_id=8&id=1&search=${this.val}&tx=3f556f66353c5945a3633ae209a3e0ff`)
						.then((res)=>{
							if(!res.data.data.length){
								alert('暂时没有相关的数据')
								this.sets = 0
								return
							}

							console.log(res.data.data)
							this.productList = res.data.data
							this.sets = false
						this.setss = true
						})
					
				}
				
			},
			down(aid,pid,sid){
				var part = this.$route.query.part
				var id =  aid ? aid : pid ?pid :sid 
				console.log(id)
				
				
					if(part == 1){
						this.$router.push({path:`/details/${id}`,query:{g:1}})
					}else if(part == 2){
						this.$router.push({path:`/details/${id}`,query:{g:2}})						
					}else if(part == 3){
						this.$router.push({path:`/details/${id}`,query:{g:3}})
					}else if(part == 4){
						this.$router.push({path:`/details/${id}`,query:{g:4}})

					}else if(part == 5){
						this.$router.push({path:`/detailT/${id}`,query:{tyep:"mer"}})

					}else if(part == 6){
						this.$router.push({path:`/detailT/${id}`,query:{tyep:"cate"}})

					}else if(part == 7){
						this.$router.push({path:`/pridetail/${id}`})
					}else if(part == 8){
						this.$router.push({path:`/detailT/${id}`,query:{tyep:"jour"}})

					}
					
						
						
				
			}
			,
			

			otherShow(){
				this.showw = false
			},
			getPart(e){



			// 	this.showw = false
			// 	this.sets = true
				

			// 	this.part = Number(e.target.dataset.id) + 1
			// 	localStorage.Part = this.part 
			// 	if(!localStorage.text && localStorage.text != this.text){
			// 			alert('请输入关键词')
			// 			return
			// 		}
			// 	let  val =  this.$route.query.val
			// let part = this.$route.query.part
			// if(!localStorage.text){
			// 	alert('输入关键词')
			// 	this.$router.replace('/index')
			// }
			// console.log(localStorage.text)
			// axios.get(`https://time2.jglist.com/index.php?r=v2/magor/lists&auth_name=id&grand_id=${this.$route.query.part}&id=1&search=${this.$route.query.val}&tx=3f556f66353c5945a3633ae209a3e0ff`)
			// 	.then((res)=>{
			// 		var a = res.data.data.splice(50)					
			// 		this.productList =  res.data.data
			// 		this.sets = false
			// 		if(! this.productList.length ){
			// 			document.getElementsByTagName('main')[0].innerHTML='没有信息'
			// 		}
			// 	})


				
			},
					
		},
		mounted(){
		},
		created(){
			localStorage.searchPages = 1
			this.part = this.$route.query.part
			console.log(this.part)
		}

	}

</script>


<style lang='scss' scoped>
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
#role{
	width: 9.2vw;
    display: inline-block;
    height: 4vw;
    border: 1px solid;
    font-size: 2.66vw;
    text-align: center;
    line-height: 4.8vw;
    border-radius: 1vw;
}

	.warp{
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		background-color: #f3f3f3;

		>header{
			background-color: #fff;

		}
		>main{
			flex: 1;
			overflow: auto;
					>#set{
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
			>dl{ 
				width: 100%;
				hyphens: 28.53vw;
				padding: 4vw 4vw;
				box-sizing: border-box;
				display: flex;
				border-top: 1px solid #eeeeee;
				font-size: 3.73vw;
				background-color: #fff;
				>dt{
					width: 20.53vw;
					height: 20.53vw;
					margin-right: 2.93vw;
					>img{
						width: 100%;
						height: 100%;
					}
				}
				>dd{
					width: 70vw;
					overflow: hidden;
					text-overflow:ellipsis;
					white-space:nowrap
					:nth-child(1){}
					:nth-child(2){
						.star{
							display: inline-block;
						}
						.starB{
							display: inline-block;
						    width: 15.46vw;
   							 height: 2.66vw;
							background-image: url('/static/img/unstar.png');
							background-repeat: no-repeat;
							margin-right: 1vw;
							background-size: 15.46vw 2.66vw;
							.starW{
								  width: 15.46vw;
   								 height: 3vw;
   								 display: inline-block;
   								 overflow: hidden;
								>img{
									   width: 15.46vw;
   										 height: 2.66vw;
   										 transform: translateY(-0.6vw);
   										 
								}
							}					
						}
						:nth-child(1){
							color: #f15a4a;
							font-size: 3.46vw;
						}
						:nth-child(2){
							float: right;
						}

					}
					:nth-child(3){
						font-size: 3.5vw;
						color: #999999;
						:nth-child(1){
							margin-right: 1vw;
						}
						:nth-child(2){}
						:nth-child(3){
							float: right;
						}

					}


				}
			}
		}
	}



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

.bx{
	box-sizing: border-box;
}
	.workBaseWarp:not(:nth-last-child(1)){
		border-bottom: 2.66vw solid #eee;

	}
	.workBaseWarp{
		width: 100%;
		    background-color: #fff;
		height: 28vw;
		border-bottom: 2.66vw solid #eee;
		>.workBase{
			width: 100%;
			height: 100%;
			padding:4vw 4vw 0; 
			>.top{
				height: 14.4vw;
				border-bottom: 1px solid #eee;
				font-size: 4vw;
				>.topOne{
					>:nth-child(1){
						color: #353535;
						display: inline-block;
						width: 70%;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						word-wrap:break-word;
					}
					>:nth-child(2){
						display: inline-block;
						width: 16.8vw;
						height: 6.66vw;
						background-color: #ffa84b;
						color: #fff;
						font-size: 3.5vw;
						border-radius: 1vw;
						float: right;
						text-align: center;
						line-height: 7.5vw;
					}

				}
				>.topTwo{
						margin-top: 1vw;

					>:nth-child(1){
						color: #f15a4a;
						font-size: 3.63vw;
						>:nth-child(1){
							font-size: 2.4vw;
						}
					}
					>:nth-child(2){
							transform: translateY(0.5vw);

						box-sizing: border-box;
						color: #999999;
						font-size: 2.66vw;
						line-height: 3.9vw;
						width: 50%;
						display: inline-block;

						float: right;
						>img{
							width: 2.93vw;
							height: 3.73vw;
							vertical-align: bottom;
						}
						>span{
							display: inline-block;
							transform: translateY(0.5vw);

						}
					}
				}
			}
			>.bom{
				height: 7.6vw;
				>.bomOne{
					font-size: 3vw;
					color: #999999;
					line-height: 8.8vw;
						>:nth-child(1){
						}
						>:nth-child(2){
							float: right;
						}
				}
			}
		}

	}
		.grey{
		width: 100%;
		min-height: 94%;
		background-color: #f3f3f3;
		padding: 2.66vw 2.66vw 0 ;
		box-sizing: border-box;
		font-size: 4vw;
		.priBox{
			width: 100%;
			height: 100%;
			.priItem{
				width: 100%;
				height: 17.06vw;
				background-color: #fff;
				display: flex;
				margin-bottom:2vw;

				>.img{
					width: 22.4vw;
					height: 100%;
					margin-right: 2vw;
					>img{
						width: 100%;
						height: 100%;
					}
				}
				>.text{
					width: 50%;
					padding: 2vw 0;
					box-sizing: border-box;
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					flex:1;
					padding-right:5vw;

					>p{
					height: 5.5vw;
				}
					>.top{
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						>.tui{
							width: 6.66vw;
							height: 3.73vw;
							display: inline-block;
							font-size: 2.5vw;
							color: #f72c1d;
							background-color: #ffdecf;
							border: 1px solid #ffcdc1;
							border-radius: 1vw;
							text-align: center;
							line-height: 3.9vw;
							margin-right: 0.5vw;

						}
						>.title{
							font-size: 3.2vw;
							color: #333333;
						}
					}
					>.btm{
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						line-height: 5.5vw;
						>:nth-child(1){
							font-size: 2.8vw;
							color: #666666;
							float: left;
							overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						width: 30%;
						}
						>:nth-child(2){
							font-size: 2.5vw;
							color: #999999;
							float: right;
						}
					}

				}
				>.right{
					width: 10.66vw;
					background-color: #ffa84b;
					font-size: 3.33vw;
					padding:  0 3.73vw;
					box-sizing: border-box;
					color: #fff;		
					>span{
						width: 3.33vw;
						display: inline-block;
						margin: 0 auto;
						letter-spacing:0.3em;
					line-height: 0.3em;	

						position: relative;
					writing-mode:lr-tb;		



					} 
					>span::after{
							content:'';						
							display: block;
							position: absolute;
							top: 55%;
							left: -8vw;
							border: 2.4vw solid #ffa84b;
							border-right: 2.4vw solid #ffa84b;
							border-left: 2.4vw solid  transparent;
							border-top: 2.4vw solid transparent;
							border-bottom: 2.4vw solid transparent;

						}
				}
				>.right2{
					width: 10.66vw;
					background-color: #fb6b5c;
					font-size: 3.33vw;
					padding:  0 3.73vw;
					box-sizing: border-box;
					color: #fff;					
					>span{
					    width: 3.33vw;
					    display: inline-block;
					    letter-spacing: 0.1em;
					    position: relative;
					    -webkit-writing-mode: lr-tb;
					    -ms-writing-mode: lr-tb;
					    writing-mode: tb-rl;	
					    transform: translateY(1.5vw) translateX(0.5vw);



					} 
					>span::after{
							content:'';						
							display: block;
							position: absolute;
							top: 55%;
							left: -8vw;
							border: 2.4vw solid #fb6b5c;
							border-right: 2.4vw solid #fb6b5c;
							border-left: 2.4vw solid  transparent;
							border-top: 2.4vw solid transparent;
							border-bottom: 2.4vw solid transparent;

						}
				}
			}
		}

	}
	
</style>