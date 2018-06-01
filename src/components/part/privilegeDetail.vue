<template>
	<div class="warp">
		<header>
			<span @click='toIndex' class="back"><img style="width: 2.66vw;height: 4.8vw;transform: translateY(4vw);" src="/static/img/businessservice_icon_return_whitess.png"></span>
			<span class="title">优惠券详情</span>
			<p @click='merDetail'>
				查看店铺
			</p>

		</header>
		<main v-for="(item,index) in detail" :key='index'>
			<div class="card">
				<p class="title" ><span>券</span><span>{{item.zh_name}}</span></p>
				<p class="info">商家享有最终解释权</p>
				<p class="time">有效期 {{times}} -- {{timee}}</p>
			</div>	


			<div class="peiInfo">
				<img src="/static/img/release_icon_location.png" class="point">
				<span style="    width: 86%;
				    display: inline-block;
				    text-overflow: ellipsis;
				    overflow: hidden;
				    height: 10vw;
				    white-space: nowrap;">{{item.address}}</span>
				<div class="phonrW">
					<img src="/static/img/businessservice_icon_phone_m.png" class="phonr">
					
				</div>


				<div class="tipL">
					<div class="rag"></div>
					<div class="cycle"></div>
				</div>


				<div class="tipR">
					<div class="rag"></div>
					<div class="cycle"></div>
				</div>


			</div>


			<div class="cardInfo">
				<div class="bigCycle">
					<img src="/static/img/businessservice_icon_kjbs.png">
				</div>


				<div class="smlCycleL">
					
				</div>
				<div class="smlCycleR">
					
				</div>



				<div class="cardInfoTop">
					<p>
						{{item.title}}
					</p>
				</div>

				<div class="cardInfoBtm">
					<p>优惠券使用说明：</p>
					<ol>
						<li>{{item.info}}</li>
						
					</ol>
				</div>

			</div>


		</main>


		<footer v-if='verify == 1' @click='openApp'>
			添加到卡包
		</footer>
		<footer v-if='verify != 1'  class="footer">
			下载简购生活APP， <span>享更多优惠</span>
		</footer>
		
	</div>

</template>

<script>
	import axios from 'axios'
	export default{
		components:{
		},
		data(){
			return({
				detail:[],
				Stime:null,
				Etime:null,
				id:null,
				verify:null,
				cancelShow:false
			})
		},
		computed:{
			times(){
				if(this.Stime){
					return '12/23/2017'
					// new Date(Number(this.Stime)).getFullYear() + '-' + new Date(Number(this.Stime)).getMonth() + 1 + '-' + new Date(Number(this.Stime)).getDate()
				}else{
					return '....'
				}
			},
			timee(){
				if(this.Stime){
					return  '06/30/2018'
					//new Date(Number(this.Etime)).getFullYear() + '-' + new Date(Number(this.Etime)).getMonth() + 1 + '-' + new Date(Number(this.Etime)).getDate()
				}else{
					return '....'
				}	
			}
		}
		,
		methods:{
			
			openApp(){
			
				
					if( window.navigator.userAgent.indexOf('iPhone' || 'iPad' || 'iPod') != -1){
												
											 	 window.location.href =`jglist://deeplinks/openWith?grand_id=3&id=${id}`
											 	 
										// 	window.location.href =`com.ziqi.easylife://7&${this.$route.params.id}`;
										//  setTimeout(()=>{
										//  alert('未安装')
										// 	//window.location.href = 'https://itunes.apple.com/cn/app/id1192657874?mt=8'
										// },2000)
								this.$router.push('/down')

										
									}else if(window.navigator.userAgent.indexOf('Android') != -1){
										
											 	window.location.href =`jglist://deeplinks/openWith?grand_id=7&id=${this.$route.params.id}`
										
											// setTimeout(()=>{
											// 	alert('未安装')
											// 	//window.location.href = 'https://jglist.onelink.me/1789171185?pid=mobileWebPage'
											// },2000)
								this.$router.push('/down')
											
					}




					
				 // window.location.href =`jglist://deeplinks/openWith?grand_id=7&id=${this.$route.params.id}`

				
												
			}
			,
			toIndex(){
				//this.$router.push('/index')
				//退后
				if(this.imgShow){
					this.imgShow = false
					return
				}
				history.back(1)

				
			},
			merDetail(){

				this.$router.push({path:`/detailT/${this.id}`,query:{tyep:"mer"}})
			}
		},
		created(){
			console.log(this.$route.params.id)
			axios.get(`https://time2.jglist.com/index.php?r=merchant/shop/privilegedetail&auth_name=name&name=1&privilege_id=${this.$route.params.id}&tx=3f556f66353c5945a3633ae209a3e0ff&user_id=1402`)
				.then(res=>{
					console.log(res.data.data)
					this.detail = [res.data.data]
					this.shopName = res.data.data.zh_name
					this.Stime = res.data.data.start_time
					this.Etime = res.data.data.end_time
					this.verify = res.data.data.verify
					this.id	= res.data.data.shop_id
					console.log(this.id)

					axios.get(`https://time2.jglist.com/index.php?r=merchant/shop/shopinfo&auth_name=name&name=1&shop_id=${res.data.data.shop_id}&tx=3f556f66353c5945a3633ae209a3e0ff&user_id=1402`)
						.then(res=>{
							console.log(res.data.data)
						})
					
				})
		}
	}
</script>



<style scoped lang="scss">
.cancel{
	position: absolute;
	width: 80vw;
	height: 30vw;
	top: 0;
	right:0;
	bottom:0;
	margin: auto;
	left: 0;
	z-index: 500;
	background-color: #f5f5f5;

}



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
			margin-bottom: 2.66vw;
			overflow: hidden;
				:nth-child(1){
				float: left;
				width: 10vw;
				display: inline-block;
			}
			>.title{
				margin-left: 11vw;
			}
			:nth-child(3){
				float: right;
				color: #00d1b2;
				font-size: 3.33vw;
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

		>main{
			flex: 1;
			overflow: auto;
			>.card{
				width: 93.6vw;
				height: 47.46vw;
				background-color: #000;
				margin: 0 auto;
				border-radius: 1.5vw;
				background: linear-gradient(left top,#fb6f5c 5% , #f25454 95%);
				padding: 0 6.4vw;
				padding-top: 4.53vw;
				box-sizing: border-box;
				margin-bottom: 4vw;
				>.title{
					margin-bottom: 20vw;
					>:nth-child(1){
						display: inline-block;
						width: 8vw;
						height: 8vw;
						background-color: #fff;
						color: #fb6f5c;
						text-align: center;
						line-height: 8vw;
						font-size: 4.2vw;
						border-radius: 50%;
						margin-right: 2.66vw;
					}
					>:nth-child(2){
						font-size: 4vw;
						color: #fff;
					}
				}
				>.info{
					font-size: 2.66vw;
					color: #aa190b;
					margin-bottom: 3vw;
				}
				>.time{
					color: #fff;
					font-size: 2.8vw;
				}

			}
			>.peiInfo{
				width: 93.6vw;
				height: 17.06vw;
				border: 1px solid #e8e8e8;
				border-radius: 1.5vw;
				background-color: #fff;
				margin: 0 auto;
				line-height: 17.06vw;
				padding:  0 5.46vw 0 7.6vw;
				box-sizing: border-box;
				margin-bottom: 13.06vw;
				font-size: 3.46vw;
				position: relative;
				>.tipL,>.tipR{
					position: absolute;
					top: -4.1vw;
    				left: 5vw;	
					>.rag{
						position: absolute;
						width: 1vw;
						height: 7.5vw;
						border-radius: 1vw;
						background-color: #fff;
						top: 0;
						z-index: 10;	
					}
					>.cycle{
						position: absolute;
						bottom: -9.26vw;
						width: 1.86vw;
						height: 1.86vw;
						background-color: #f3f3f3;
						border: 1px solid #eaeaea;
						border-radius: 50%;
						 transform: translateX(-0.65vw);
					}
				}
					>.tipR{	left: 88vw;	}
				>img{
					vertical-align: baseline;
				}
				>.point{
					margin-top: 1vw;
					width: 3.06vw;
					height: 3.73vw;
				}
				>.phonrW{
					display: inline-block;
					float: right;
					>.phonr{
						width: 5.3vw;
						height: 5.3vw;
						vertical-align: text-bottom;
					}
				}
				
			}
			>.cardInfo{
				width: 93.6vw;
				min-height: 64vw;
				
				margin: 0 auto;margin-bottom: 5vw;
				background-color: #fff;
				border: 1px solid #eee;
				position: relative;
				border-radius: 1.5vw; 
				>.smlCycleL,>.smlCycleR{
					position: absolute;
					top: 24.6vw;
   					 left: -2.4vw;
					background-color: #f3f3f3;
					width: 4.26vw;
					height: 4.26vw;
					border-radius: 50%;
				}
				>.smlCycleR{
					    top: 24.6vw;
  				  left: 91.5vw;
				}
				>.bigCycle{
					position: absolute;
					top: -8vw;
  					left: 40vw;
					width: 13.33vw;
					height: 13.33vw;
					background-color: #fff;
					border: 1px solid #eee;
					border-radius: 50%;
					text-align: center;
					line-height: 13vw;
					border-bottom: none;
					>img{
						width: 60%;
						vertical-align: middle;
						height: 40%;

					}
				}
				>.cardInfoTop{
					height: 26.66vw;
					padding: 6.66vw 20vw 0;
					box-sizing: border-box;
					text-align: center;
					border-bottom: 1px dashed #eee;
					>p{
					text-align: justify;
					font-size: 4.1vw;
					text-align: center;
					display:inline-block;
					word-break :break-all; 

					}
				
				}
				>.cardInfoBtm{
					padding: 6.4vw 6.66vw 0;
					box-sizing: border-box;
					>p{
						font-size: 3.33vw;
						color: #999999;
						margin-bottom: 6.4vw;
					}
					>ol{
						>li{
							font-size: 3.3vw;
							list-style-position: inside;
						}
					}
				}
			}
		}
		>footer{
			width: 100%;
			height: 11.7vw;
			background-color: #00d1b2;
			text-align: center;
			line-height: 11.7vw;
			color: #fff;
			font-size: 4vw;

		}
		>.footer{
			background-color: #f3f3f3;
			color: #00d1b2;
			>span{
				color: #333333;
			}
		}
	}

</style>