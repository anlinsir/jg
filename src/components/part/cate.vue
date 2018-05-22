<template>
	<div>
		<BaseT :data='data' @next='next' @toDetails='todetail'/>

	</div>


</template>


<script>
	import BaseT from './base2'
	import axios from 'axios'
	export default {
		components:{
			BaseT
		},
		data(){
			return({
				data:[],
				f:1
			})
		},
		methods:{
			next(){
				localStorage.Catepages = Number(localStorage.Catepages) + 1
				console.log(localStorage.Catepages)
				
				axios.get(`https://time2.jglist.com/index.php?r=delicacy/food/list&auth_name=id&category_parent=${localStorage.CateNum ? localStorage.CateNum : 0 }&grand_id=6&id=1&tx=3f556f66353c5945a3633ae209a3e0ff&type=${localStorage.CateType3  == 4 ?  4 : localStorage.CateType3 == 3 ? 0 : 3  }&isOpen=${localStorage.OPenCate ?  localStorage.OPenCate : 0}&page=${localStorage.Catepages}`)
				.then(res=>{
					for(let i in res.data.data){
						this.data.push(res.data.data[i])
					}


				})
			},
			todetail(id){
				// if(!this.f){

				console.log(id)
				// this.$router.push({path:`/details/${id}`,query:{g:5}})
				// if(id){
				// 	axios.get(`https://time2.jglist.com/index.php?r=merchant/shop/shopinfo&auth_name=name&name=1&shop_id=${id}&tx=3f556f66353c5945a3633ae209a3e0ff&user_id=1402`)
				// }
				this.$router.push({path:`/detailT/${id}`,query:{tyep:"cate"}})
				//跳到 新的详情页  传id
				// }
				// this.f = 0

			}
		},
		created(){
			localStorage.Catepages = 1
			if(localStorage.dataCate){
				this.data = JSON.parse(localStorage.dataCate)
				return
			}
			axios.get(`https://time2.jglist.com/index.php?r=delicacy/food/list&auth_name=id&category_parent=${localStorage.CateNum ? localStorage.CateNum : 0 }&grand_id=6&id=1&tx=3f556f66353c5945a3633ae209a3e0ff&type=${localStorage.CateType3  == 4 ?  4 : localStorage.CateType3 == 3 ? 0 : 3  }&isOpen=${localStorage.OPenCate ?  localStorage.OPenCate : 0}`)
				.then(res=>{
					if(!res.data.data.length){
						alert('none')
						localStorage.None =1
					// this.data = 	JSON.parse(localStorage.dataCate2)
					return
					}
					localStorage.removeItem('None')
					
					console.log(res.data.data)
					this.data = res.data.data
					localStorage.dataCate = JSON.stringify(res.data.data)
					localStorage.dataCate2 = localStorage.dataCate
				})
		}

	}

</script>


<style scoped lang="scss">
	
</style>