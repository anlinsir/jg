<template>
	
	<div>
		<Base @detali='detali' @next='next' :data='data'></Base>

	</div>
</template>


<script>
	import Base from './base'
	import axios from 'axios'
	export default {
		methods:{
			detali(id){
				console.log(id)
				this.$router.push({path:`/details/${id}`,query:{g:2}})					

			},
			next(pages){
				
				localStorage.pages2 = Number(localStorage.pages2) + 1
				console.log(localStorage.pages2)
				axios.get(`https://time2.jglist.com/index.php?r=v2/magor/lists&auth_name=id&cate_id=${localStorage.CarCate ? localStorage.CarCate : 0 }&grand_id=2&id=1&source=${localStorage.CarRole ? localStorage.CarRole : 0}&city_id=${localStorage.CarCity ? localStorage.CarCity  : 0}&level=${localStorage.CarCity ? localStorage.CardAdd : ''}&tx=3f556f66353c5945a3633ae209a3e0ff&page=${localStorage.pages2}&type=${localStorage.CarTime ? localStorage.CarTime : 3 }&lat=${localStorage.LAT ? localStorage.LAT : 0}&lng=${localStorage.LNG ? localStorage.LNG : 0}`)
				.then(res=>{
					for(let i in res.data.data){
						this.data.push(res.data.data[i])
					}


				})
			}
		}
		,
		components:{
			Base
		},
		data(){
			return({
				data:[],
			})
		},
		created(){
			localStorage.pages2 = 1

				if(localStorage.dataG2){
					this.data = JSON.parse(localStorage.dataG2)
					return
				}
			axios.get(`https://time2.jglist.com/index.php?r=v2/magor/lists&auth_name=id&cate_id=${localStorage.CarCate ? localStorage.CarCate : 0 }&grand_id=2&id=1&source=${localStorage.CarRole ? localStorage.CarRole : 0}&city_id=${localStorage.CarCity  ? localStorage.CarCity   : 0}&level=${localStorage.CarCity?  localStorage.CardAdd  : ''}&tx=3f556f66353c5945a3633ae209a3e0ff&page=1&type=${localStorage.CarTime ? 0 : 3 }&lat=${localStorage.LAT ? localStorage.LAT : 0}&lng=${localStorage.LNG ? localStorage.LNG : 0}`)
					.then( res => {
						if(!res.data.data.length){
							localStorage.none = 1
							// this.data  = JSON.parse(localStorage.dataG22)
							return
						}
						this.data = res.data.data
						localStorage.dataG2 = JSON.stringify(res.data.data)
						localStorage.dataG22 = localStorage.dataG2
					})
		}
		// https://time2.jglist.com/index.php?r=v2/magor/lists&auth_name=id&cate_id=0&grand_id=4&id=1&tx=3f556f66353c5945a3633ae209a3e0ff
	}
</script>


<style lang="scss" scoped></style>