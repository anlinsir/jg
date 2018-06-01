<template>
	<div class="down">
		<img src="/static/img/icon.png">
		<p class="p1">华人生活的百宝箱</p>
		<p class="p2">下载简购生活APP</p>
		<button @click='down' class="btn">立即下载</button>
	</div>
</template>		

<script>
	export default{
		methods:{
			down(){
				if( window.navigator.userAgent.indexOf('iPhone' || 'iPad') != -1){
					
						window.location.href = 'https://itunes.apple.com/cn/app/id1192657874?mt=8'
					
					
				}else if(window.navigator.userAgent.indexOf('Android') != -1){
					

						
							window.location.href = 'https://jglist.onelink.me/1789171185?pid=mobileWebPage'
						
				}
			}
		}
	}
</script>


<style scoped lang="scss">
	.down{
		position: absolute;
		width: 85%;
		text-align: center;
		height: 50%;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		margin: auto;
		>img{

		}
		>p{
			margin: 3vw 0;
			font-size: 5vw;
		}
		>.p2{
			color: #00d1b2;
		}
		>.btn{
			margin-top: 5vw;
			border:none;
			background-color: #00d1b2;
			color: #fff;
			height: 10vw;
			font-size: 4vw;
			width: 50%;
			border-radius:5vw;

		}
	}
</style>