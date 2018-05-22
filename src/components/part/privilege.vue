
<template>
	<div class="grey">
		<div class="priBox">
			<div @touchend='getDetail(item.privilege_id,$event)' @touchstart='getDetail(item.privilege_id,$event)' @touchmove='getDetail(item.privilege_id,$event)'  :data-id='item.privilege_id' class="priItem"  v-for = "(item,index) in list" :key='index'>
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
</template>


<script >
	import axios from 'axios'
	export default{
		data(){
			return({
				list:[],
				none:null
			})
		},
		methods:{
			getDetail(id,e){
				 switch (e.type) {
	                case 'touchstart':
	                    this.flag = true;
	                    break;
	                case 'touchmove':
	                    this.flag = false;
	                    break;
	                case 'touchend':
	                    if(this.flag){
						this.$router.push({path:`/pridetail/${id}`})
	                        
	                    }else{
	                    // 滑动事件
	                    console.log('move')
	                    }
	                        default:
	                            break;
	                    }   

			}
		}
		,
		created(){
			if(localStorage.dataPri){
				this.list = JSON.parse(localStorage.dataPri)
				return
			}
			axios.get(`https://time2.jglist.com/index.php?r=merchant/shop/privilegelist&auth_name=id&cate=${localStorage.childPri ? localStorage.childPri : 0}&grand_id=${localStorage.parentPri ? localStorage.parentPri : 0 }&role=${localStorage.PriRole ? localStorage.PriRole : 0}&id=1&lat=30.55102013717875&lng=104.06901177707833&tx=3f556f66353c5945a3633ae209a3e0ff&sort=${localStorage.SortPri ==1 ? 1 : localStorage.SortPri == 2 ? 2 :0}`)
				.then(res=>{
					console.log(res.data.data)
					if(!res.data.data.length){
						alert('none')
						localStorage.none = 1
						this.none = localStorage.none
						// this.list =JSON.parse(localStorage.dataPri2)
						return
					}
					localStorage.removeItem('none')
					this.list = res.data.data
					localStorage.dataPri = JSON.stringify(res.data.data)
					localStorage.dataPri2 = localStorage.dataPri
				})
		}
	}
</script>



<style scoped lang="scss">
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