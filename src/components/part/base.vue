<template>
	<div id='aa'>
		<ul v-show='sets'>
			<li @touchend='toDetali' @touchstart='toDetali' @touchmove='toDetali'  :data-id='item.id' v-for='(item,index) in data' :key='index'>
				<dl :data-id='item.id'>
					<dt><img :data-id='item.id' :src="item.image + '200_200.jpg'"></dt>
					<dd :data-id='item.id'>
						<p :data-id='item.id'><span :data-id='item.id' v-if='item.isStick' class="issss">置顶</span> <span :data-id='item.id'>{{item.title}}</span></p>
						<p :data-id='item.id'><span :data-id='item.id' style="font-size: 3.63vw;"><span style='font-size: 2.4vw;' v-if="item.price != '0.00' ">$</span>{{item.price == '0.00' ? '面议' :  item.price}}</span>



							<span :data-id='item.id' v-if='item.role == 1' class="listProson">个人</span>
							<span :data-id='item.id' v-if='item.role == 2' class="merchant">商家</span>
							<span :data-id='item.id' v-if='item.role == 3' class="proxy">经纪人</span>






						</p>
						<p :data-id='item.id'><span :data-id='item.id'>{{item.address ? item.address  : item.city}}</span> <span :data-id='item.id'></span> <span :data-id='item.id'>{{item.create_time}}</span></p>
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
		<div v-show='sets && !none' id='next' @click='getnext'>
			<div v-show='show' class="fff"></div>

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
		props:{
			data:{
				type:Array
			}
		},
		data(){
			return({
				newData:null,
				sets:0,
				flag:true,
				show:false,
				none:0,
				ja:true
			})
		},
		methods:{
			toDetali(e){
				 switch (e.type) {
	                case 'touchstart':
	                    this.flag = true;
	                    break;
	                case 'touchmove':
	                    this.flag = false;
	                    break;
	                case 'touchend':
	                    if(this.flag){
	                        this.$emit('detali',e.target.dataset.id)
	                    }else{
	                    // 滑动事件
	                    

	                    }
	                        default:
	                            break;
	                    }     
               	
				// if(!this.flag){
				// 	this.$emit('detali',e.target.dataset.id)
				// }
				// this.flag = 0


				

			},
			getnext(e){
				this.show = true
				setTimeout(()=>{
					this.show = false
				},2500)
				this.$emit('next',1)				
			}
			
		},
		mounted(){
			this.none = 0
			this.sets = 0

			var dura = this.$route.name == 'rent' ? 4000 : 2000;
		
			if(!this.data.length){
				var timer =  setTimeout(()=>{
					// setInterval
			 		if(this.data.length){
			 		 clearInterval(timer);
			 		 this.none = 0
			 		 this.sets = 1	
			 		 localStorage.removeItem('none')
			 		 console.log('yyy')		 		 
			 		}else if(localStorage.none == '1'){

			 			clearInterval(timer);
			 			console.log('nnn')
			 			this.none = localStorage.none
			 			 this.sets = 1	
			 			
			 		}
			 		this.newData = this.data
			 		
		 		},dura)		
			 }

			 if(this.data.length){this.sets = 1}

		
		},
	updated(){
	
			if(this.data.length){
				this.none = 0
			}
		}
	}
</script>


<style lang="scss" scoped>
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
	ul{
		width: 100%;
		box-sizing: border-box;
		padding-left:4vw; 
		margin-top: 2vw;
	>li:not(:nth-child(1)){
			border-top: 1px solid #eee;
			padding-top: 4vw;
			height: 28.53vw;
		}
		>li{
			height: 24.53vw;
			padding-right:4vw; 			
			box-sizing: border-box;

	
			>dl{
				display: flex;
				>dt{
					width: 20.53vw;
					height: 20.53vw;
					>img{
						width: 100%;
						height: 100%;
					}
				}
				>dd{
					width: 60vw;
					margin-left: 4vw;
					height: 20.53vw;
					
					>p{
						width: 68vw;
						overflow: hidden;
						text-overflow:ellipsis;
						white-space: nowrap;
						font-size: 4vw;
					}
					>:nth-child(1){
						width: 55vw;
						>.issss{
							display: inline-block;
							width: 7.2VW;
							height: 4vw;
							font-size: 2.5vw;
							transform: translateY(-0.7vw);
							background-color: #ffef07;
							color: #6f3f15;
							border-radius: 1vw;

							text-align: center;
							line-height: 4.5vw;

						}
						:nth-child(2){
							color: #353535;

						}



					}
					>:nth-child(2){
					    margin-top: 0.56vw;
  						margin-bottom: 6.5vw;
						:nth-child(1){
							color: #f15a4a;
							font-size: 3.33vw;
						}
						:nth-child(2){
							float: right;
						}
						>.listProson , .merchant , .proxy{
							width: 9.2vw;
							display:inline-block;
							height: 4vw;
							border: 1px solid;
							font-size: 2.66vw;
							text-align: center;
							line-height: 4.8vw;
							border-radius: 1vw;
						}
						>.listProson{color: #00d1b2;border-color: #00d1b2;}
						>.proxy{color: #ffa84b;border-color: #ffa84b;}
						>.merchant{color: #fb6b5c;border-color: #fb6b5c;}

					}
					>:nth-child(3){
						color: #999;
						font-size: 3vw;
						:nth-child(1){}
						:nth-child(2){}
						:nth-child(3){
							float: right;
						}

					}

				}
			}
		}
	}

</style>