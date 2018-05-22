<template>
	<header>
		<!-- @click='toSearch' -->
			<span @click='toIndex' v-if='left == 1' :style="{color: color ? color : '' }"  class="back"><img class="backk" src="/static/img/businessservice_icon_return_white.png"></span>
			<span @click='toIndex' v-if='left == 2' :style="{color: color ? color : '' }"  class="back"><img style="width: 2.66vw;height: 4.8vw;" src="/static/img/businessservice_icon_return_whitess.png"></span>

			<form > <input  :style="{backgroundColor: wi ? '#fff' :''}" v-model='text' @click='toseac'  @keydown.enter='sendSearch'  type="text" placeholder="输入商家、商品名称" /></form>
			<span class="posi" v-show='0'>dsdddsdsds</span>
	</header>

</template>



<script>
	export default {
		props:{			
			left:{
				type:String || Number
			},
			part:{
				type:Number|| String  || Object
			},
			color:{
				type:String
			},
			wi:{
				type:String
			}
		},
		data(){
			return({
				text:''
			})
		},
		methods:{
			// toSearch(){
			// 	if(this.$route.name != 'search'){
			// 		this.$router.push('/search')

			// 	}
			// }
			toseac(){
				var name = this.$route.name
				if(name != 'index' || name != 'search'){
					 switch (name) {
	              		case 'used':
	              			this.$router.push({path:'/search',query:{part:1}})
	              			break;
	              		case 'car':
	              			this.$router.push({path:'/search',query:{part:2}})
	              			break;
	              		case 'work':
	              			this.$router.push({path:'/search',query:{part:3}})
	              			break;
              			case 'rent':
              				this.$router.push({path:'/search',query:{part:4}})
              				break;
              			case 'merchant':
              				this.$router.push({path:'/search',query:{part:5}})
              				break;
          				case 'cate':
          					this.$router.push({path:'/search',query:{part:6}})
          					break;
          				case 'privilege':
          					this.$router.push({path:'/search',query:{part:7}})
          					break;
          				case 'jour':
          					this.$router.push({path:'/search',query:{part:8}})
          					break;

	              		default:
	              			break;
	                 }  
					
				}
				this.$emit('show',true)
			},
			sendSearch(){

				this.$emit('getVal',this.text)
			//enter发请求  通过 子传夫  把拿到的数据  传到 searcb里面
					//吧类别 存到longstage里
				// 	this.$router.push({ path:'/search'})
				// 	console.log(this.part)
				// 	localStorage.text = this.text
				// 	if(!localStorage.text && localStorage.text != this.text){
				// 		return
				// 	}
				// 		return
				// if(this.text && this.part){
				// 	this.$router.push({ path:'/search', query: { val:this.text , id:this.part} })
				// }else{
				// 	console.log('滑动搜索框，选择类别')
				// }
			
			},
			toIndex(){
				// if(this.$route.name == 'search'){
				// 	this.$router.push({path:'/search',query:{part:localStorage.indexPart}})
				// 	this.$emit('backk',[])
				// } else
				//  if(this.$route.name != 'index'){
				// 	this.$router.push('/index')
				// }
				
				// localStorage.removeItem('UsedRole')
				// localStorage.removeItem('UsedCity')
				// localStorage.removeItem('UsedCate')
				// localStorage.removeItem('WorkCity')

				// localStorage.removeItem('WorkCate')
				// localStorage.removeItem('Pricess')
				// localStorage.removeItem('WorkRole')
				// localStorage.removeItem('CateNum')
				// localStorage.removeItem('UsedAdd')
				// localStorage.removeItem('parentMer')
				// localStorage.removeItem('childMer')
				
				// localStorage.removeItem('UsedTime')
				// localStorage.removeItem('DisMer')
				// localStorage.removeItem('OPenMer')

				
				// localStorage.removeItem('CateType')
				// localStorage.removeItem('CateType3')
				// localStorage.removeItem('CateType4')

				
				// localStorage.removeItem('OPenCate')
				// localStorage.removeItem('JourType')

localStorage.removeItem('LAT')
localStorage.removeItem('LNG')

				history.back()
				



				

			}
		}
	}


</script>


<style lang="scss" scoped>
	header{
		display: flex;
		width: 100%;
		height: 13.33vw;
		padding: 1.8vw 3.2vw;
		box-sizing: border-box;
		text-align: center;
		background-color: #04d6b6;
			>.back{
				display: inline-block;
				width: 5vw;
				color: #fff;
				height: 100%;
				line-height:10.33vw; 
				font-size: 8vw;
				margin-right: 5vw;
			}
			.backk{
			
width: 2.66vw;height: 4.8vw;
			}
			>form{
				width: 100%;
				>input{
				width: 100%;
				border: none;
				background-color: #f3f3f3;
				height: 9vw;
				text-align: center;
				outline: none;
				font-size: 3.5vw;
				background-image: url(/static/img/home_icon_search.png);
				background-repeat: no-repeat;
				background-position: 28%;

			}
			}
			.posi{
				position: absolute;
				top: 3.86vw;
				font-size: 4vw;
				left: 7.66vw;
			}
		
		

	}

</style>