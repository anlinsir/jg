<template>
	
	<div>
		<div @touchstart='aaa($event,item.id)' @touchend='aaa($event,item.id)' @touchmove='aaa($event,item.id)' :data-id='item.id' id='id' class="workBaseWarp" v-for='(item,index) in list' :key='index'>
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
						<span @touchstart='openApp(item.id,$event)' @touchmove='openApp(item.id,$event)' @touchend='openApp(item.id,$event)'  data-id='call' >立即联系</span>
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





<div v-show='sets' id="set">

			<div class="in">
				<span class="o"></span>
				<span class="t"></span>
				<span class="e"></span>
				<i id="texxxt">加载中 ...</i>
			</div>
		</div>


					<div v-show='!sets && !none' @touchstart='next' id='next'>
						<div v-show='show' class="fff"></div>
						<span id='xia' >点击加载更多...</span>
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



			</div>
	</div>






</template>


<script>
	import axios from 'axios'
	export default {
		data(){
			return({
				list:[],
				flag:1,
				sets:true,
				flags:false,
				showfff:false,
				show:false,
				none:null


			})
		},
		methods:{
			openApp(id,e){
			
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
								this.$router.push('/down')
												
										 window.location.href =`jglist://deeplinks/openWith?grand_id=3&id=${id}`
										// 		window.location.href =`com.ziqi.easylife://3&${id}`;
										 // setTimeout(()=>{
										 // 	alert('未安装')
											// // window.location.href = 'https://itunes.apple.com/cn/app/id1192657874?mt=8'
										 // },2000)
										
									}else if(window.navigator.userAgent.indexOf('Android') != -1){
								this.$router.push('/down')
										
											 	window.location.href =`jglist://deeplinks/openWith?grand_id=3&id=${id}`
										
											// setTimeout(()=>{
										 // 	alert('未安装')
												
											// 	// window.location.href = 'https://jglist.onelink.me/1789171185?pid=mobileWebPage'
											// },2000)
									}
	                    }else{
	                    // 滑动事件
	                    

	                    }
	                        default:
	                            break;
	                    } 


			}
			,
			next(){

				this.show  = true
				setTimeout(()=>{
					this.show = false
				},2500)
				localStorage.Workpages = Number(localStorage.Workpages) + 1
				console.log(localStorage.Workpages)

				axios.get(`https://time2.jglist.com/index.php?r=v2/magor/lists&auth_name=id&cate_id=${localStorage.WorkCate ? localStorage.WorkCate : 0}&city_id=${localStorage.WorkCity ? localStorage.WorkCity : 0}&level=${localStorage.WorkCity ? localStorage.WorkCity == 0 ? 0 : 2  : 0 }&price=${localStorage.Pricess ? localStorage.Pricess : '0,1000000' }&source=${localStorage.WorkRole ? localStorage.WorkRole : 0 }&grand_id=3&id=1&tx=3f556f66353c5945a3633ae209a3e0ff&type=${localStorage.UsedTime == 0  ? 0 : 3 }&page=${localStorage.Workpages}`)
				.then(res=>{
					if(!res.data.data.length){
						alert('none')
						return
					}
					for(let i in res.data.data){
						this.list.push(res.data.data[i])
					}
						this.sets = false
				})
			},
			aaa(e,id){

					 switch (e.type) {
	                case 'touchstart':
	                    this.flags = true;
	                    break;
	                case 'touchmove':
	                    this.flags = false;
	                    break;
	                case 'touchend':
	                    if(this.flags){

							if(e.target.dataset.id == 'call'){
								console.log('bknjl')
								return
							}
						
							this.$router.push({path:`/details/${id}`,query:{g:3}})	

	                    }else{
	                    // 滑动事件
	                    

	                    }
	                        default:
	                            break;
	                    }   



			

			}
		},
		mounted(){
			if(!this.list.length){
				var timer =  setInterval(()=>{

			 		if(this.list.length){ clearInterval(timer) ;this.sets = 0}
			 		
			 		
		 		},100)		
			 }
			 if(this.list.length){this.sets = 0}
		},
		created(){
			localStorage.Workpages = 1
			if(localStorage.dataWork){
				this.list = JSON.parse(localStorage.dataWork)
				return
			}
			axios.get(`https://time2.jglist.com/index.php?r=v2/magor/lists&auth_name=id&cate_id=${localStorage.WorkCate ? localStorage.WorkCate : 0}&city_id=${localStorage.WorkCity ? localStorage.WorkCity : 0}&level=${localStorage.WorkCity ? localStorage.WorkCity == 0 ? 0 : 2  : 0 }&price=${localStorage.Pricess ? localStorage.Pricess : '0,1000000' }&source=${localStorage.WorkRole ? localStorage.WorkRole : 0 }&grand_id=3&id=1&tx=3f556f66353c5945a3633ae209a3e0ff&type=${localStorage.UsedTime == 0  ? 0 : 3 }`)
				.then(res=>{
					if(!res.data.data.length){
						this.sets = 0
						localStorage.WorkNone = 1
						this.none = localStorage.WorkNone
						// localStorage.clear()
						// location.reload()
						return
					this.list = JSON.parse(localStorage.dataWork2)
						return
					}
					localStorage.removeItem('WorkNone')
					console.log(res.data.data)
					this.list = res.data.data
					localStorage.dataWork = JSON.stringify(res.data.data)
					localStorage.dataWork2 = localStorage.dataWork
				})
			
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

.bx{
	box-sizing: border-box;
}
	.workBaseWarp:not(:nth-last-child(1)){
		border-bottom: 2.66vw solid #eee;

	}
	.workBaseWarp{
		width: 100%;
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
</style>