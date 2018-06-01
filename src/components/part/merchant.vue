<template>
	<div>
		<BaseT :data='data' @next='next'  @toDetails='todetail'></BaseT>

	</div>

</template>

<script>
	import BaseT from './base2'
	import axios from 'axios'
	export default {
		components:{
			BaseT			
		}
		,
		data(){
			return({
				data:[],
				

			})
		}
		,
		mounted(){
		
		},
		methods:{
			next(num){
				localStorage.Merpages = Number(localStorage.Merpages) + 1
				console.log(localStorage.Merpages)
				
				axios.get(`https://time2.jglist.com/index.php?r=merchant/shop/list&auth_name=id&category_child=${localStorage.childMer ? localStorage.childMer : 0}&category_parent=${localStorage.parentMer ? localStorage.parentMer : 0 }&grand_id=5&id=1&lat=32&lng=123&tx=3f556f66353c5945a3633ae209a3e0ff&type=${localStorage.DisMer == 0 || localStorage.DisMer == 2 ? localStorage.DisMer : 1}&isOpen=${localStorage.OPenMer ? localStorage.OPenMer : 0}&page=${localStorage.Merpages}`)
				.then(res=>{
					if(!res.data.data.length){
						alert('暂时没有相关的数据')
						return

					}
					for(let i in res.data.data){
						this.data.push(res.data.data[i])
					}



				})
			},
			todetail(id){
				console.log(id)
				// this.$router.push({path:`/details/${id}`,query:{g:5}})
				// if(id){
				// 	axios.get(`https://time2.jglist.com/index.php?r=merchant/shop/shopinfo&auth_name=name&name=1&shop_id=${id}&tx=3f556f66353c5945a3633ae209a3e0ff&user_id=1402`)
				// }
				this.$router.push({path:`/detailT/${id}`,query:{tyep:"mer"}})
				//跳到 新的详情页  传id
			}
		},
		created(){
			localStorage.Merpages = 1
			
			// https://time2.jglist.com/index.php?r=merchant/shop/shopinfo&auth_name=name&name=1&shop_id=8663&tx=3f556f66353c5945a3633ae209a3e0ff&user_id=1402  /商家服务的链接  改id的值   新开一个details页面
			if(localStorage.dataMer){
				this.data = JSON.parse(localStorage.dataMer)
				return
			}
					   
			axios.get(`https://time2.jglist.com/index.php?r=merchant/shop/list&auth_name=id&category_child=${localStorage.childMer ? localStorage.childMer : 0}&category_parent=${localStorage.parentMer ? localStorage.parentMer : 0 }&grand_id=5&id=1&lat=32&lng=123&tx=3f556f66353c5945a3633ae209a3e0ff&type=${localStorage.DisMer == 0 || localStorage.DisMer == 2 ? localStorage.DisMer : 1}&isOpen=${localStorage.OPenMer ? localStorage.OPenMer : 0}`)//page
				.then(res=>{
					if(!res.data.data.length){
						alert('暂时没有相关的数据')
						localStorage.None =1
						// this.data = JSON.parse(localStorage.dataMer2)
						return
					}
					localStorage.removeItem('None')

					this.data =  res.data.data
					localStorage.dataMer = JSON.stringify(res.data.data)
					localStorage.dataMer2 = localStorage.dataMer
					
				})
		}

	}


</script>


<style scoped lang="scss"></style>