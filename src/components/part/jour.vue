<template>
	
	<div>
		
		<BaseT :data='data' @next='next' :textNext='nt'  @toDetails='todetail' />
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
				flag:1,
				nt:"next"
			})
		},
		methods:{
			next(){
				localStorage.Jourpages = Number(localStorage.Jourpages) + 1
				console.log(localStorage.Jourpages)
				axios.get(`https://time2.jglist.com/index.php?r=newtravel/travel/list&auth_name=id&category_child=0&grand_id=8&id=1&tx=3f556f66353c5945a3633ae209a3e0ff&page=${localStorage.Jourpages}`)
				.then(res=>{
					if(!res.data.data.length){alert('没有了')}
					for(let i in res.data.data){
						this.data.push(res.data.data[i])
					}


				})
			},
			todetail(id){
			
				
					this.$router.push({path:`/detailT/${id}`,query:{tyep:"jour"}})

				
			
			}
		},
		created(){
			localStorage.Jourpages  = 1 
				if(localStorage.dataJour){
					this.data = JSON.parse(localStorage.dataJour)
					return
				}
			axios.get(`https://time2.jglist.com/index.php?r=newtravel/travel/list&auth_name=id&category_child=${localStorage.childJour ? localStorage.childJour : 0}&category_parent=${localStorage.parentJour? localStorage.parentJour : 0}&grand_id=8&id=1&tx=3f556f66353c5945a3633ae209a3e0ff&type=${localStorage.JourType == 1 ? 1 : localStorage.JourType == 2 ? 2 : 0}`)
				.then(res=>{
					if(!res.data.data.length){
						alert('none')
						localStorage.None = 1
						// this.data = JSON.parse(localStorage.dataJour2)

						return
					}
					localStorage.removeItem('None')
					console.log(res.data.data)
					this.data = res.data.data
					localStorage.dataJour = JSON.stringify(res.data.data)
					localStorage.dataJour2 = localStorage.dataJour
				})
		}
	}

</script>



<style scoped lang="scss"></style>