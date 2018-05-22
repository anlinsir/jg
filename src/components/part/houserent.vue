<template>
	<div>
		
		<Base  @detali='detali' @next='next' :data='data'></Base>
	</div>

</template>


<script>
	import Base from './base'
	import axios from 'axios'

	export default {
		data(){
			return({
				data:[]
			})
		},
		created(){
			localStorage.pages4 = 1
				if(localStorage.dataG4){
					this.data = JSON.parse(localStorage.dataG4)
					return
				}

			axios.get(`https://time2.jglist.com/index.php?r=v2/magor/lists&auth_name=id&city_id=${localStorage.RentCity ? localStorage.RentCity : 0 }&level=${localStorage.RentAdd ? localStorage.RentAdd : 0}&cate_id=${localStorage.RentCate ? localStorage.RentCate : 0}&grand_id=4&source=${localStorage.RentRole ? localStorage.RentRole : 0}&id=1&tx=3f556f66353c5945a3633ae209a3e0ff&type=${localStorage.RentTime ? 0 : 3 }&lat=${localStorage.LAT ? localStorage.LAT : 0}&lng=${localStorage.LNG ? localStorage.LNG : 0}`)
			.then(res=>{
				if(!res.data.data.length){
						localStorage.none = 1

					//this.data  = JSON.parse(localStorage.dataG42)
					return
				}
				this.data = res.data.data
				localStorage.dataG4 = JSON.stringify(res.data.data)
				localStorage.dataG42 = localStorage.dataG4

			})
		},
		components:{
			Base
		},
		methods:{
			detali(id){
				this.$router.push({path:`/details/${id}`,query:{g:4}})					
				
			},
				next(pages){
				
				localStorage.pages4 = Number(localStorage.pages4) + 1
				axios.get(`https://time2.jglist.com/index.php?r=v2/magor/lists&auth_name=id&city_id=${localStorage.RentCity ? localStorage.RentCity : 0 }&level=${localStorage.RentAdd ? localStorage.RentAdd : 0}&cate_id=${localStorage.RentCate ? localStorage.RentCate : 0}&grand_id=4&source=${localStorage.RentRole ? localStorage.RentRole : 0}&id=1&tx=3f556f66353c5945a3633ae209a3e0ff&type=${localStorage.RentTime ? localStorage.RentTime : 3 }&page=${localStorage.pages4}&lat=${localStorage.LAT ? localStorage.LAT : 0}&lng=${localStorage.LNG ? localStorage.LNG : 0}`)
				.then(res=>{
					if(!res.data.data.length){
						alert('没有了')
						return

					}
					console.log(res.data.data)
					for(let i in res.data.data){
						this.data.push(res.data.data[i])
					}


				})
			}
		}
	}
</script>


<style scoped lang="scss"></style>