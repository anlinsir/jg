<template>
	
	<div>
		
			<Base @detali='detali' @next='next' :data='data'></Base>
		
	</div>

</template>


<script>
	import Base from './base'
	import axios from 'axios'
	export default {
		components:{
			
		}
		,
		data(){
			return({
				data:[],
				pages:0,
				cityID:null
			})
		},
		components:{
			'Base':Base
		},
		updated(){
 			console.log(this.$route.query)

		},
		methods:{
			detali(id){	
				console.log(id)
					this.$router.push({path:`/details/${id}`,query:{g:1}})		
			},
			next(pages){
 				
				localStorage.pages1 = Number(localStorage.pages1) + 1
				console.log(localStorage.pages1)

				axios.get(`https://time2.jglist.com/index.php?r=v2/magor/lists&auth_name=id&cate_id=${localStorage.UsedCate ? localStorage.UsedCate : 0 }&grand_id=1&id=1&source=${localStorage.UsedRole ? localStorage.UsedRole : 0 }&city_id=${localStorage.UsedCity ? localStorage.UsedCity  : 0}&level=${localStorage.UsedCity ? localStorage.UsedAdd : ''}&tx=3f556f66353c5945a3633ae209a3e0ff&page=${localStorage.pages1}&type=${localStorage.UsedTime ? localStorage.UsedTime : 3 }&lat=${localStorage.LAT ? localStorage.LAT : 0}&lng=${localStorage.LNG ? localStorage.LNG : 0}`)
				.then(res=>{
					if(!res.data.data.length){
						alert('没有了')
						
						


					}
					for(let i in res.data.data){
						this.data.push(res.data.data[i])
					}



				})
			}
		},
		created(){

			//加载 数据 传到子组件
		//通过路由判断 加载什么数据
			localStorage.pages1 = 1
		// https://time2.jglist.com/index.php?r=magor/five/details&auth_name=name&grand_id=1&id=${}&name=1&tx=3f556f66353c5945a3633ae209a3e0ff&user_id=1402
				if(localStorage.dataG1){
					this.data = JSON.parse(localStorage.dataG1)
					return
				}

				axios.get(`https://time2.jglist.com/index.php?r=v2/magor/lists&auth_name=id&cate_id=${localStorage.UsedCate ? localStorage.UsedCate : 0 }&grand_id=1&id=1&source=${localStorage.UsedRole ? localStorage.UsedRole : 0 }&city_id=${localStorage.UsedCity ? localStorage.UsedCity  : 0}&level=${localStorage.UsedCity ? localStorage.UsedAdd : ''}&tx=3f556f66353c5945a3633ae209a3e0ff&page=1&type=${localStorage.UsedTime ? 0 : 3 }&lat=${localStorage.LAT ? localStorage.LAT : 0}&lng=${localStorage.LNG ? localStorage.LNG : 0}`)
				.then(res=>{
						localStorage.removeItem('none')
					
					if(res.data.data.length == 0){
						localStorage.none = 1
						// this.data = JSON.parse(localStorage.dataG12)


						// localStorage.NavChoose0 = '区域'
						// localStorage.NavChoose1 = '分类'
						// localStorage.NavChoose4 = '来源'
	                    // location.reload()
						
					
					}else{
						localStorage.removeItem('none')

						this.data = res.data.data
						// alert(this.data[0].distance)
						localStorage.dataG1 = JSON.stringify(res.data.data)
						localStorage.dataG12 = localStorage.dataG1	
					}
					
					

				})
			
	}
}
</script>


<style lang="scss" scoped>
	

</style>