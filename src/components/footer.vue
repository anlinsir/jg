<template>
	<footer>
			<dl>
				<dt><img src="/static/img/icon.png"></dt>
				<dd>
					<p>华人的生活百宝箱</p>
					<p>下载简购生活APP华人生活...</p>
				</dd>
								
			</dl>
			<button @touchstart='showDown'>立即下载APP</button>

			<div class="showWarp" v-if='show'>
			<div class="show" >
				<p>在{{msg}}中打开？</p>
				<span class="qu" @touchend='nowDown'>取消</span>
				<span @touchend='nowDown' class="co">立即下载</span>
			</div>
			</div>
		</footer>


</template>


<script>
	import axios from 'axios'
	export default {
		props:{
			isShow:{
				type:Boolean || String
			},
			app:{
				type:String
			},
			idd:{
				type: String
			}
		}
		,
		data(){
			return({
				show:false,
				msg:''
			})
		},
		methods:{
			showDown(){
				this.show = true
			},
			nowDown(e){
				if(this.app && this.idd){
					console.log(this.idd)
				}

				if(e.target.className =='qu'){
					this.show = false
				}else if(e.target.className =='co'){

						
							if( window.navigator.userAgent.indexOf('iPhone' || 'iPad' || 'iPod') != -1){
								
								//  window.location.href =`com.ziqi.easylife://${this.app}&${this.idd}`;
								// setTimeout(()=>{
									window.location.href = 'https://itunes.apple.com/cn/app/id1192657874?mt=8'
								// },2000)


							
						}else if(window.navigator.userAgent.indexOf('Android') != -1){
								
								//  	window.location.href =`jglist://deeplinks/openWith?grand_id=${this.app}&id=${this.idd}`
								
								// setTimeout(()=>{
									window.location.href = 'https://jglist.onelink.me/1789171185?pid=mobileWebPage'
								// },1500)
						}


				}
				
			}
		},
		mounted(){


			if( window.navigator.userAgent.indexOf('iPhone' || 'iPad' || 'iPod') != -1){
								
				this.msg = 'APP Store'
							
			}else if(window.navigator.userAgent.indexOf('Android') != -1){
				this.msg = '应用商店'


			}









			setTimeout(()=>{
				this.show = this.isShow
			},1000)
		}
	}


</script>



<style lang="scss" scoped>
		footer{
			box-shadow:0px 13px 38px #000;

			width: 100%;
			height: 18vw;
			background-color: #fff;
			padding: 3.2vw 3.2vw 0 ;
			box-sizing: border-box;
			>.showWarp{
				width: 100%;
				height: 100%;
				position: absolute;
				box-sizing: border-box;
				z-index: 2;
				top:0;
				left: 0;
				>.show{
				width: 70vw;
				height: 25vw;
				font-size: 4vw;
				background-color: #fff;
				border: 1px solid #eee;
				border-radius: 2vw;
				position: absolute;
				top: 50%;
				left: 50%;
				text-align: center;
				transform: translateX(-50%) translateY(-50%);
				>p{
					height: 12.5vw;
					border-bottom: 1px solid #eee;
					line-height: 12.5vw;

				}
				>span{
					display: inline-block;
					width: 34vw;
					height: 12.5vw;
					line-height: 12.5vw;
				}
				>.qu{
					border-right: 1px solid #eee;
				}	
				>.co{
					color: #00d1b2;
				}
			}
			}
			>dl{
				display: flex;
				float: left;
				>dt{
					width: 11.73vw;
					height: 11.73vw;
					>img{
						width: 100%;
						height:100%;

					}
				}
				>dd{
					margin-left: 3vw;
					:nth-child(1){
						font-size: 4vw;
						color: #333333;
					}
					:nth-child(2){
						font-size: 3.33vw;
						color: #00d1b2;
					}
				}
			}
			>button{
				float: right;
				width: 24.8vw;
				height: 8.53vw;
				margin-top: 1.2vw;
				background-color: #00d1b2;
				border-radius: 1vw;
				border: none;
				font-size: 2.93vw;
				color: #fff;
				margin-right: 4vw;
			}
		}

</style>