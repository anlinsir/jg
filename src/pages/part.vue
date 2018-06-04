<template>
	<div class="warp">
		<Header wi='#fff' left='1'></Header>	

		<main >
			<!-- 选择 参数 -->
			<section class="choose">
				<ul>
					<li 
					:class="active == index ? 'active' : '' " 
					@touchstart='choose(index,$event,9)' 
					data-iss='warp'  
					@touchend='choose(index,$event,9)' 
					@touchmove='choose(index,$event,9)' 
					v-for='(item,index) in nav ' 
					:key="index">{{item.name}}

						<span  v-if='item.sel'></span>

						<ul  :style="{left: nav[3].sel && !nav[4] ? index == 0 ? 1 * -20 + '%' : index * -130 + '%' :index == 0 ? 1*-20 + '%' : index*-100 + '%'}"  v-if='item.sel' v-show='showPart == index' :key='index' id='chooseItem'>

							<li   
							@touchstart.stop='chooseItem(indexs,$event,items.child)' 
							@touchend.stop='chooseItem(indexs,$event,items.child)' 
							:data-pricess='items.pricess'  :data-add='items.level'  
							 @touchmove.stop='chooseItem(indexs,$event,items.child)' 
							 @mouseenter="chooseItem(indexs,$event)" :key='indexs'  
							 :data-id='items.id' :data-role="item.role ? item.role: '' " 
							 v-for="(items,indexs) in useClassify  ? useClassify[0].child?  useClassify[0].child.length ?   useClassify[0].child: useClassify : useClassify : '' ">
								
									<span 
									:class="active == index ? 'active' : '' "
									 v-if='items.child && items.child.length'
									 >></span>{{items.title}}

								<ul v-if='items.child && showPartItem == indexs'>

									<li 
									@touchstart.stop='hide(indexss,$event,props.id,props.title)'
									@touchmove.stop='hide(indexss,$event,props.id,props.title)' 
									@touchend.stop='hide(indexss,$event,props.id,props.title)' 
									v-for='(props,indexss) in items.child' :data-id='items.id'  
									:key='indexss' :data-pid='props.id'
									>{{props.title}}</li>

								</ul>
							</li>
						</ul>
					</li>
				</ul>
			</section>
			<!-- 选择  end -->
			<router-view  class='main'></router-view>
		</main>

		<Footer></Footer>
	</div>


</template>




<script>
	import axios from 'axios'
	import Header from '../components/header'
	import Footer from '../components/footer'
	export default {
		data(){
			return({
				nav:[
					{
						name:'区域',//
						sel:true
					},
					{
						name: '分类' ,//
						sel:true

					},
					{
						name:'时间'//时间
					},
					{
						name:'距离'//距离
					},
					{
						name: '来源',//
						sel:true

					}
				],
				active:0,
				showPartItem:-1,
				showPart:-1,
				useClassify:null,
				filtercity :null,
				show:-1,
				flag:true,
				cityId:null
			})
		},
		components:{
			'Footer':Footer,
			'Header':Header
		},
		methods:{

			hide(idx,e,id,tit){

				console.log(e.type)
				 switch (e.type) {
	                case 'touchstart':
	                    this.flag = true;
	                    break;
	                case 'touchmove':
	                    this.flag = false;
	                    break;
	                case 'touchend':
	                    if(this.flag){

	                    	console.log(id)
				var name = this.$route.name
	           	this.nav[this.showPart].name =  tit.substring(0,2) + '...'
					if(name == 'work'){
	        			
	        			if(this.showPart == 1 ){
	        				localStorage.WorkCate = id        					  
	        				location.reload()
	        			}
	                    			
	                }
            	

                if(name == 'merchant'){ // || name == 'privilege' || name == 'jour'
            		
                	if(this.showPart == 0){
                		localStorage.NavChooseMer0 =  e.target.innerText
                		this.nav[this.showPart].name =localStorage.NavChooseMer0 

                		localStorage.parentMer =  e.target.dataset.id
                		localStorage.childMer = e.target.dataset.pid
                	
                		location.reload()

                	}

                }



                if(name == 'jour'){

                	localStorage.removeItem('dataJour')
                	if(this.showPart == 0){
                	localStorage.NavChooseJour0 = e.target.innerText
                	this.nav[this.showPart].name =localStorage.NavChooseJour0 
                		localStorage.parentJour =  e.target.dataset.id
                		localStorage.childJour = e.target.dataset.pid
                		location.reload()
                	}
                	
                }


                	if(name == 'privilege'){
                		localStorage.removeItem('dataPri')
            			if(this.showPart == 0){
            				console.log(e.target.innerText)

            				localStorage.NavChoosePri0 = e.target.innerText
                			this.nav[this.showPart].name =localStorage.NavChoosePri0 
            				localStorage.parentPri =  e.target.dataset.id
                			localStorage.childPri = e.target.dataset.pid
            				location.reload()                    				

            			}
            			if(this.showPart == 1){
	                    			
	                    			// &sort=2
	                    	if(localStorage.SortPri == '1'){
	                    		localStorage.removeItem('SortPri')
	                    		location.reload()
	                    			return
	                    		}
                		

	                    			localStorage.SortPri = 1
	                    			location.reload()
	                    		}
	                    if(this.showPart == 2){
	                    			// &sort=2
	                    			if(localStorage.SortPri == '2'){
	                    				localStorage.removeItem('SortPri')
	                    				location.reload()
	                    				return
	                    			}
	                    			localStorage.SortPri = 2
	                    			location.reload()
	                    		}

            		}
				this.showPart = -1	



	                    }else{
	                    // 滑动事件
	                    

	                    }
	                        default:
	                            break;
	                    }     

				

	         


			},
			choose(index,e,num){
				 switch (e.type) {
	                case 'touchstart':
	                    this.flag = true;
	                    break;
	                case 'touchmove':
	                    this.flag = false;
	                    break;
	                case 'touchend':
	                    if(this.flag){
	                    	var name = this.$route.name

	                    	if( name == 'used' || name == 'rent'){
	                    		if(index == 2){
	                    			if(name == 'used'){localStorage.removeItem('dataG1')}
	                    			if(localStorage.UsedTime == 2){
	                    				
	                    				localStorage.removeItem('UsedTime')
		                    			location.reload()

	                    				return 
	                    			}
	                    			localStorage.UsedTime = 2
		                    	
		                    		location.reload()
	                    		}
	                    		if(index == 3){

	                    			if(name == 'used'){localStorage.removeItem('dataG1')}
										if(localStorage.LAT || localStorage.LNG){
											localStorage.removeItem('LAT')
											localStorage.removeItem('LNG')
											location.reload()
											return
										}		               		
		                    			localStorage.LAT = localStorage.lat ? localStorage.lat : 0
		                    			localStorage.LNG = localStorage.lng ? localStorage.lng : 0

		                    		
		                    			location.reload()

		                    	}

	                    	}
	                    	if( name == 'car' ){
	                    		if(index == 2){
	                    			if(name == 'car'){localStorage.removeItem('dataG2')}
	                    			if(localStorage.CarTime == 2){
	                    				localStorage.removeItem('CarTime')
		                    			location.reload()

	                    				return 
	                    			}
	                    			localStorage.CarTime = 2
		                    	
		                    		location.reload()
	                    		}
	                    		if(index == 3){

	                    			if(name == 'car'){localStorage.removeItem('dataG2')}

										if(localStorage.LAT || localStorage.LNG){
											localStorage.removeItem('LAT')
											localStorage.removeItem('LNG')
											location.reload()
											return
										}		               		
		                    			localStorage.LAT = localStorage.lat ? localStorage.lat : 0
		                    			localStorage.LNG = localStorage.lng ? localStorage.lng : 0

		                    		
		                    			location.reload()

		                    	}
	                    	}

	                    	if( name == 'rent' ){
	                    		if(index == 2){
	                    			if(name == 'rent'){localStorage.removeItem('dataG4')}
	                    			if(localStorage.RentTime == 2){
	                    				localStorage.removeItem('RentTime')
		                    			location.reload()

	                    				return 
	                    			}
	                    			localStorage.RentTime = 2
		                    	
		                    		location.reload()
	                    		}
	                    		if(index == 3){
	                    			if(name == 'rent'){localStorage.removeItem('dataG4')}

										if(localStorage.LAT || localStorage.LNG){
											localStorage.removeItem('LAT')
											localStorage.removeItem('LNG')
											location.reload()
											return
										}		               		
		                    			localStorage.LAT = localStorage.lat ? localStorage.lat : 0
		                    			localStorage.LNG = localStorage.lng ? localStorage.lng : 0

		                    		
		                    			location.reload()

		                    	}
	                    	}




	                    	if(name == 'work'){
	                    		if(index == 2){
	                    			localStorage.removeItem('dataWork')
	                    			if(localStorage.UsedTime == 0){
	                    				localStorage.UsedTime = 3
		                    			location.reload()

	                    				return 
	                    			}
	                    			localStorage.UsedTime = 0
		                    		location.reload()


	                    		}
	                    	}
	                    	if(name == 'merchant'){
	                    		localStorage.removeItem('dataMer')
	                    		if(index == 1){
	                    			if(localStorage.DisMer == 0){
	                    				localStorage.DisMer = 1
	                    				location.reload() 
	                    				return
	                    			}
	                    			localStorage.DisMer = 0
	                    				location.reload() 

	                    		}

	                    		if(index == 2){
	                    			if(localStorage.DisMer == 2){
	                    				localStorage.DisMer = 0
	                    				location.reload() 
	                    				return
	                    			}
	                    			localStorage.DisMer = 2
	                    				location.reload()    
	                    		}
	                    		if(index == 3){
	                    			if(localStorage.OPenMer == 1){
	                    				localStorage.OPenMer = 0
	                    				location.reload() 
	                    				return
	                    			}
	                    			localStorage.OPenMer = 1
	                    				location.reload()
	                    		}

	                    	}

	                    	if(name == 'cate'){
	                    		localStorage.removeItem('dataCate')
	                    		if(index == 1){
	                    			if(localStorage.CateType3 == '3'){
	                    				localStorage.removeItem('CateType3')
	                    				location.reload()
	                    				return
	                    			}

	                    			localStorage.CateType3 = 3   
	                    			location.reload()         			
	                    		}

	                    		if(index == 2){
	                    			if(localStorage.CateType3 == '4'){
	                    				localStorage.removeItem('CateType3')
	                    				
	                    				location.reload() 
	                    				return
	                    			}
	                    			localStorage.CateType3 = 4
	                    				location.reload()                     			
	                    		}
	                    		if(index == 3){
	                    			if(localStorage.OPenCate == 1){
	                    				localStorage.OPenCate = 0
	                    				location.reload() 
	                    				return
	                    			}
	                    			localStorage.OPenCate = 1
	                    				location.reload()
	                    		}
	                    	}
	                    	if(name == 'jour'){
	                    		localStorage.removeItem('dataJour')
	                    		if(index == 1){
	                    			if(localStorage.JourType == '1'){
	                    				localStorage.removeItem('JourType')
	                    				location.reload()
	                    				return
	                    			}
	                    			localStorage.JourType = 1
	                    			location.reload()
	                    			return
	                    		}
	                    		if(index == 2){
	                    			if(localStorage.JourType == '2'){
	                    				localStorage.removeItem('JourType')
	                    				location.reload()
	                    				return
	                    			}
	                    			localStorage.JourType = 2
	                    			location.reload()
	                    			return
	                    		}
	                    		if(index == 3){
	                    			if(localStorage.JourOpen){
	                    				localStorage.removeItem('JourOpen')
	                    				location.reload()
	                    				return
	                    			}
	                    			
				                		localStorage.JourOpen = 1
				                		location.reload()
				                		return
                				}
	                    		
	                    	}




	                    	
	                    	if(name == 'privilege'){
	                    		localStorage.removeItem('dataPri')

	                    		if(index == 1){
	                    			
	                    			// &sort=2
	                    			if(localStorage.SortPri == '1'){
	                    				localStorage.removeItem('SortPri')
	                    				location.reload()
	                    				return
	                    			}
                		

	                    			localStorage.SortPri = 1
	                    			location.reload()
	                    		}
	                    		if(index == 2){
	                    			// &sort=2
	                    			if(localStorage.SortPri == '2'){
	                    				localStorage.removeItem('SortPri')
	                    				location.reload()
	                    				return
	                    			}
	                    			localStorage.SortPri = 2
	                    			location.reload()
	                    		}

	                    	}


	                        	this.active = index
	                        	if(num == 9){
									 if(this.showPart == -1 || this.showPart != index ){
									 	this.showPart = index
									 }else{
									 this.showPart = -1
									 }
								}


									var parts = this.$route.path.substring(6)
										if(parts == 'used' || parts == 'car' || parts == 'rent' || parts == 'work' ){
											if(index == 0){
												this.useClassify  = JSON.parse(localStorage.basedata).filtercity
											}else if(index == 4){
												this.useClassify = [{title:'不限',role:0,id:0},{title:'个人',role:1,id:1},{title:'商家',role:2,id:2},{title:'经纪人',role:3,id:3}]
											}
										}



										if(parts == 'used'){
											if(index == 1){
												this.useClassify  =  JSON.parse(localStorage.basedata).category.filter((item,index)=>{
													return item.title == '闲置二手' && item.id == 1
												})
											}
										}else if(parts == 'car'){
											if(index == 1){
												this.useClassify  =  JSON.parse(localStorage.basedata).category.filter((item,index)=>{
													return item.title == '新旧车辆' && item.id == 2
												})
											}
										}else if(parts == 'rent'){
											if(index == 1){
												this.useClassify  =  JSON.parse(localStorage.basedata).category.filter((item,index)=>{
													return item.title == '房屋租赁' && item.id == 4
												})
											}
											
										}





								if(parts == 'merchant'){
									if(index == 0){
										this.useClassify = JSON.parse(localStorage.basedata).merchant
									}
								}
								if(parts == 'cate'){
									if(index == 0){
										this.useClassify = JSON.parse(localStorage.basedata).delicacy
									}
								}
								if(parts == 'jour'){
									if(index == 0){
										this.useClassify = JSON.parse(localStorage.basedata).travel
									}
								}
								if(parts == 'work'){
									if(index ==0){
										this.useClassify = JSON.parse(localStorage.basedata).job_address
									}
									if(index == 1){
										this.useClassify  =  JSON.parse(localStorage.basedata).category.filter((item,index)=>{
													return item.title == '工作招聘' && item.id == 3
										})
									}
									if(index == 3){
										this.useClassify = [{title:"不限",pricess:"0,1000000"},{title:'1000元以下',pricess:'0,1000'},{title:'1000-2000',pricess:'1000,2000'},{title:'2000-3000',pricess:'2000,3000'},{title:'3000-4000',pricess:'3000,4000'},{title:'4000-5000',pricess:'4000,5000'},{title:'5000-6000',pricess:'5000,6000'},{title:'6000-7000',pricess:'6000-7000'},{title:'10000以上',pricess:'10000,100000'}]
									}
								}

								if(parts == 'privilege'){
									if(index == 3){
										this.useClassify = [{title:'不限',id:0},{title:'商家',id:1},{title:'经纪人',id:2}]
									}
									if(index == 0){
										this.useClassify = [
														{
															id:0,
															title:'商家服务',
															child:[]
														},
														{
															id:1,
															title:'美食',
															child:[]
														}
												]
										return	
										this.useClassify =[JSON.parse(localStorage.basedata).merchant[0]];
										this.useClassify.push(JSON.parse(localStorage.basedata).delicacy[0])
										console.log(this.useClassify)
										return
										for(var i in JSON.parse(localStorage.basedata).delicacy){
											this.useClassify.push(JSON.parse(localStorage.basedata).delicacy[i])
										}
										return
										
										console.log(this.useClassify)
										

									}
									if(index == 4){
										this.useClassify  = (JSON.parse(localStorage.basedata).delicacy)
										
									}
								}















	                    }else{
	                    // 滑动事件
	                    console.log(document.documentElement.scrollTop)
	                    }
	                        default:
	                            break;
	              
	            }

			
					
			
			
				

			},
			chooseItem(id,e,child){
	           

				 switch (e.type) {
	                case 'touchstart':

	                    this.flag = true;
	                    break;
	                case 'touchmove':
	                    this.flag = false;
	                    break;
	                case 'touchend':
	                    if(this.flag){
	                    	var name = this.$route.name
	                    	var a  = this.showPart
	                    	if(!child || !child.length){
	                    		// console.log((e.target.innerText).substring(0,2))
	                    		this.nav[this.showPart].name = (e.target.innerText).substring(0,2) + '...'
	                    		if(name == 'used'){//name == 'rent' ||  || name == 'car'
	                    		
	                    				if(name == 'used'){localStorage.removeItem('dataG1')}
	                    		// if(name == 'car'){localStorage.removeItem('dataG2')}
	                    		// if(name == 'rent'){localStorage.removeItem('dataG4')}

	                    			if(this.showPart == 4){
	                    			
	                    				localStorage.NavChooseUsed4  = e.target.innerText 
	                    				this.nav[this.showPart] = localStorage.NavChooseUsed4
		                    		

		                    			localStorage.UsedRole = e.target.dataset.id	                    			
		                    			location.reload()
		                    		}
		                    		if(this.showPart == 0){
		                    			localStorage.NavChooseUsed0 = e.target.innerText 
	                    				this.nav[this.showPart] = localStorage.NavChooseUsed0
		                    			

		                    			localStorage.UsedCity = e.target.dataset.id	     
		                    			localStorage.UsedAdd = e.target.dataset.add 
		                    			location.reload()

		                    		}
		                    		if(this.showPart == 1){
		                    			localStorage.NavChooseUsed1  = e.target.innerText 
	                    				this.nav[this.showPart] = localStorage.NavChooseUsed1
		                    		
		                    			localStorage.UsedCate = e.target.dataset.id	   

		                    		
		                    			location.reload()

		                    		}

		                    	

	                    		}

	                    		if(name == 'car'){
	                    			if(name == 'car'){localStorage.removeItem('dataG2')}

	                    				if(this.showPart == 4){
	                    			
	                    				localStorage.NavChooseCar4  = e.target.innerText 
	                    				this.nav[this.showPart] = localStorage.NavChooseCar4
		                    		

		                    			localStorage.CarRole = e.target.dataset.id	
		                    			console.log(localStorage.CarRole)                    			

		                    			location.reload()
		                    		}
		                    		if(this.showPart == 0){
		                    			localStorage.NavChooseCar0 = e.target.innerText 
	                    				this.nav[this.showPart] = localStorage.NavChooseCar0
		                    			

		                    			localStorage.CarCity = e.target.dataset.id	     
		                    			localStorage.CardAdd = e.target.dataset.add 
		                    			location.reload()

		                    		}
		                    		if(this.showPart == 1){
		                    			localStorage.NavChooseCar1  = e.target.innerText 
	                    				this.nav[this.showPart] = localStorage.NavChooseCar1
		                    		
		                    			localStorage.CarCate = e.target.dataset.id	   

		                    		
		                    			location.reload()

		                    		}
		                    		if(this.showPart == 3){
												                    		
		                    			localStorage.LAT = localStorage.lat ? localStorage.lat : 0
		                    			localStorage.LNG = localStorage.lng ? localStorage.lng : 0

		                    		
		                    			location.reload()

		                    		}


	                    		}

	                    		if(name == 'rent'){
	                    			if(name == 'rent'){localStorage.removeItem('dataG4')}
	                    				if(this.showPart == 4){
	                    			
	                    				localStorage.NavChooseRent4  = e.target.innerText 
	                    				this.nav[this.showPart] = localStorage.NavChooseRent4
		                    		

		                    			localStorage.RentRole = e.target.dataset.id	
		                    			                 			

		                    			location.reload()
		                    		}
		                    		if(this.showPart == 0){
		                    			localStorage.NavChooseRent0 = e.target.innerText 
	                    				this.nav[this.showPart] = localStorage.NavChooseRent0
		                    			

		                    			localStorage.RentCity = e.target.dataset.id	     
		                    			localStorage.RentAdd = e.target.dataset.add 
		                    			location.reload()

		                    		}
		                    		if(this.showPart == 1){
		                    			localStorage.NavChooseRent1  = e.target.innerText 
	                    				this.nav[this.showPart] = localStorage.NavChooseRent1
		                    		
		                    			localStorage.RentCate = e.target.dataset.id	   

		                    		
		                    			location.reload()

		                    		}
		                    		if(this.showPart == 3){
											console.log('yjhbhb')												                    		
		                    			localStorage.LAT = localStorage.lat ? localStorage.lat : 0
		                    			localStorage.LNG = localStorage.lng ? localStorage.lng : 0

		                    		
		                    			location.reload()

		                    		}
	                    		}



	                    		if(name == 'used' || name == 'car'){
		                    		
		                    		
		                    		
	                    		}else if(name == 'work'){

	                    			localStorage.removeItem('dataWork')
	                    			if(this.showPart == 0){
	                    				localStorage.NavChooseWork0 = e.target.innerText
	                    				localStorage.WorkCity = e.target.dataset.id        					  
	                    				location.reload()
	                    			}
	                    			if(this.showPart == 1 ){
	                    				localStorage.NavChooseWork1 = e.target.innerText
	                    				localStorage.WorkCate = e.target.dataset.id        					  
	                    				location.reload()
	                    			}
	                    			if(this.showPart == 3){
	                    				localStorage.NavChooseWork3 = e.target.innerText
	                    				localStorage.Pricess = e.target.dataset.pricess 
	                    				location.reload()                    				
	                    			}
	                    			if(this.showPart == 4){
	                    				localStorage.NavChooseWork4 = e.target.innerText
	                    				localStorage.WorkRole =  e.target.dataset.id
	                    				location.reload()                    				
	                    				            				
	                    			}
	                    			
	                    		}
	                    		
	                    		if(name == 'cate'){
	                    			localStorage.removeItem('dataCate') 
	                    			if(this.showPart == 0){
	                    				localStorage.NavChooseCatee0 = e.target.innerText
	                    				this.nav[this.showPart] = localStorage.NavChooseCatee0
	                    				localStorage.CateNum = e.target.dataset.id 
	                    				location.reload()                    				

	                    			}

	                    		}
	                    		if(name == 'privilege'){
	                    	
	                    			localStorage.removeItem('dataPri')
	                    			if(this.showPart == 0){
		                    			localStorage.parentPcate = (e.target.dataset.id)
		                    			localStorage.parentPri = 0
		                    			if(e.target.innerText == '商家服务'){
		                    				this.useClassify =JSON.parse(localStorage.basedata).merchant
		                    					this.useClassify.push({title:'美食',child:[],id:1})
		                    				return
		                    			}
		                    			if(e.target.innerText == '美食'){
		                    				this.useClassify =JSON.parse(localStorage.basedata).delicacy 
		                    					this.useClassify.unshift({title:'商家服务',child:[],id:0})
		                    				return
		                    			}
		                    			localStorage.NavChoosePri0 = e.target.innerText
		                    			location.reload()
		                    			return
		                    		}
	                    			if(this.showPart == 3){
	                    				localStorage.PriChoose3 = e.target.innerText
	                    				this.nav[this.showPart].name =  localStorage.PriChoose3
	                    				localStorage.PriRole = e.target.dataset.id
	                    				
	                    				location.reload()                    				

	                    			}
	                    			if(this.showPart == 0){
	                    			
	                    				localStorage.NavChoosePri0 = e.target.innerText
                						this.nav[this.showPart].name =localStorage.NavChoosePri0 
	                    				localStorage.parentPri =  e.target.dataset.id || 0
                						localStorage.childPri = e.target.dataset.pid || 0
                						location.reload()  
	                    			}
	                    			if(this.showPart == 4){
											
	                    				localStorage.NavChoosePri4 = e.target.innerText
	                    				localStorage.parentPcate = e.target.dataset.id
	                    				console.log(localStorage.parentPcate)

                						this.nav[this.showPart].name =localStorage.NavChoosePri4 
                						location.reload()
	                    			}

	                    		}
	                    		if(name == 'jour'){
					                	localStorage.removeItem('dataJour')
					                	if(this.showPart == 0){
					                	localStorage.NavChooseJour0 = e.target.innerText
					                	this.nav[this.showPart].name =localStorage.NavChooseJour0 
					                		if(id == 0){
					                			
					                			localStorage.parentJour = 0
						                		localStorage.childJour = 0
						                		location.reload()
					                		}
					                	}
					                }



	                    		this.showPart = -1


	                    		
	                    	}

	                    	if(child.length){
	                    		if(this.showPartItem == -1 || this.showPartItem != id){
	                    			this.showPartItem = id		

	                    		}else if(this.showPartItem == id){
	                    			this.showPartItem = -1
	                    		}
	                    	}
	                    	

	      //               	if(!name || !name.length){
							// this.showPart = false
	      //               	}
	      //                   if(this.showPartItem == id){
	      //               		this.showPartItem = -1
	      //               		this.showPart = true

	      //               		return
	      //               	}
	      //               	this.showPartItem = id
							// this.showPart = true

	                    	
	                    	
	                    }else{
	                    // 滑动事件
	                   
	                    }	            
	                        default:
	                            break;
	                    } 
			}
		},
		created(){
			if(this.$route.path.substring(6) == 'used'){
				this.nav =[
						{
							name:localStorage.NavChooseUsed0 ? (localStorage.NavChooseUsed0).substring(0,2) + '...' : '区域',//
							sel:true
						},
						{
							name:localStorage.NavChooseUsed1 ? (localStorage.NavChooseUsed1).substring(0,2) + '...' : '分类' ,//
							sel:true

						},
						{
							name:'时间'//时间
						},
						{
							name:'距离'//距离
						},
						{
							name: localStorage.NavChooseUsed4 ? (localStorage.NavChooseUsed4).substring(0,2) + '...' : '来源',//
							sel:true

						}
					]
				}

			if(this.$route.path.substring(6) == 'car'){
				this.nav =[
						{
							name:localStorage.NavChooseCar0 ? (localStorage.NavChooseCar0).substring(0,2) + '...' : '区域',//
							sel:true
						},
						{
							name:localStorage.NavChooseCar1 ? (localStorage.NavChooseCar1).substring(0,2) + '...' : '分类' ,//
							sel:true

						},
						{
							name:'时间'//时间
						},
						{
							name:'距离'//距离
						},
						{
							name: localStorage.NavChooseCar4 ? (localStorage.NavChooseCar4).substring(0,2) + '...' : '来源',//
							sel:true

						}
					]


			}


			if(this.$route.path.substring(6) == 'rent'){
				this.nav =[
						{
							name:localStorage.NavChooseRent0 ? (localStorage.NavChooseRent0).substring(0,2) + '...' : '区域',//
							sel:true
						},
						{
							name:localStorage.NavChooseRent1 ? (localStorage.NavChooseRent1).substring(0,2) + '...' : '分类' ,//
							sel:true

						},
						{
							name:'时间'//时间
						},
						{
							name:'距离'//距离
						},
						{
							name: localStorage.NavChooseRent4 ? (localStorage.NavChooseRent4).substring(0,2) + '...' : '来源',//
							sel:true

						}
					]


			}












			if(this.$route.path.substring(6) == 'merchant'){// || this.$route.path.substring(6) =='cate' || this.$route.path.substring(6) =='jour'
				this.nav = [
						{
							name:localStorage.NavChooseMer0 ? localStorage.NavChooseMer0.substring(0,2) + '...' : '分类',
							sel:true
						},
						{
							name:"距离"
						},
						{
							name:'评分'
						},
						{
							name:'营业'
						}
					]
			}
			if(this.$route.path.substring(6) =='cate'){
				this.nav = [
						{
							name:localStorage.NavChooseCatee0 ? localStorage.NavChooseCatee0.substring(0,2) + '...' : '分类',
							sel:true
						},
						{
							name:"距离"
						},
						{
							name:'评分'
						},
						{
							name:'营业'
						}
					]
			}
			if(this.$route.path.substring(6) =='jour'){
				this.nav = [
						{
							name:localStorage.NavChooseJour0 ? localStorage.NavChooseJour0.substring(0,2) + '...' : '分类',
							sel:true
						},
						{
							name:"距离"
						},
						{
							name:'评分'
						},
						{
							name:'营业'
						}
					]
			}

			if(this.$route.path.substring(6) == 'work'){
				this.nav = [
						{
							name:localStorage.NavChooseWork0 ? localStorage.NavChooseWork0.substring(0,2) + '...' : '区域',
							sel:true
						},
						{
							name:localStorage.NavChooseWork1 ? localStorage.NavChooseWork1.substring(0,2) + '...' : "职位",
							sel:true
						},
						{
							name:'时间'
						},
						{
							name:localStorage.NavChooseWork3 ?localStorage.NavChooseWork3.substring(0,2) + '...' :'薪资',
							sel:true

						}
						,
						{
							name:localStorage.NavChooseWork4 ? localStorage.NavChooseWork4.substring(0,2) + '...' : '来源',
							sel:true
							
						}
					]
			}
			if(this.$route.path.substring(6) == 'privilege'){
				this.nav = [
						{
							name:localStorage.NavChoosePri0 ? localStorage.NavChoosePri0.substring(0,2) + '...' :'分类',
							sel:true
						},
						{
							name:"距离",
						},
						{
							name:'评分'
						},
						{
							name:localStorage.PriChoose3 ? localStorage.PriChoose3.substring(0,2) + '...' : '筛选',
							sel:true
						}
					
					]
			}
		}
		
	}
</script>



<style lang="scss" scoped>

	.warp{
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		background-color: #f3f3f3;

		>main{
			width: 100%;
			height: 100%;
			flex:1;
			overflow: auto;
			overflow-x: hidden;
			background-color: #fff;
			>.choose{
				width: 100%;
				height: 10.66vw;
			border-bottom: 1px solid #f2f2f2;

				background-color: #fff;
				>ul{
					display: flex;
					height: 10.66vw;
					justify-content:space-around;
					font-size: 3.6vw;
					color: #666666;
					>.active{
						color: #333333;
						border-color:red;

					}
					>li{
						width:20vw;
						text-align: center;
						height: 10.66vw;
						line-height: 10.66vw;
						position: relative;

						
						>span{
						    border: 2vw solid;
						    border-top: 0.8vw solid #333;
						    border-right: 0.8vw solid transparent;
						    border-left: 0.8vw solid transparent;
						    border-bottom: 0.8vw solid transparent;
						    position: absolute;
					        top: 4.5vw;
							left: 15.5vw;
						}
						/*item*/
						>#chooseItem{
							position: absolute;
							z-index: 10;
							width: 100vw;
							top: 10.66vw;
							left:0;
							text-align: left;
							height: 70vw;
							overflow: auto;
							padding: 0 5vw;
							    box-shadow: 2vw 2vw 3vw -1vw #bbb;
							background-color: #fff;
							>li{
								color: #999;
								>ul{
									transform: translateX(5vw);
									>li{

									}
								}

							}
						}
						
					}

				}
			}
			>.main{
				box-sizing: border-box;

			}
		}
	}
/*	#chooseItem{
	width: 100vw;
	position: absolute;
	top: 0;
	left: 0;
	overflow: auto;height: 80vw;box-sizing: border-box;overflow-x:hidden;
}*/
</style>