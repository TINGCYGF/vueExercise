
	let app = new Vue({
				el: '#app',
				data: {
					TING: 'TING',
					todoData: [],
					inp_data: '',
					ched: false,
				},
				//在页面渲染之前渲染
				mounted:function(){
					this.getAll()
				},
				methods: {
					getAll(){
						axios.get('http://localhost:3000/todoList')
								.then((backdata) =>{
									//普通函数会指向window，所以用箭头函数固定this指向运行环境Vue
									let {data} = backdata;
									this.todoData = data;
									console.log(data);
								})
					},
					//添加任务
					add(){
						let data = {id:this.todoData.length>0?this.todoData[this.todoData.length-1].id+1:1, title: this.inp_data, status: false};
						axios({
							method: 'post',
							url: 'http://localhost:3000/todoList',
							data:data,
						}).then((backdata)=>{
							let {data, status} = backdata;
							if(status === 201){
								this.todoData.push(data);
								this.inp_data = '';
							}
						})
					},
					//删除任务
					del(key){
						axios({
							method: 'delete',
							url: 'http://localhost:3000/todoList/'+this.todoData[key].id
						}).then((backdata)=>{
							let {status} = backdata;
							if(status == 200){
								this.todoData.splice(key,1);
							}
						})
					},
					//全选
					chedAll(){
						let buer = !this.ched;
						for(let i=0; i<this.todoData.length;i++){
							this.todoData[i].status = buer;
							axios({
								method: 'put',
								url: 'http://localhost:3000/todoList/'+this.todoData[i].id,
								data: this.todoData[i]
							}).then((backdata)=>{
								if(backdata.status == 200){
									console.log("成功");
								}
							})
						}
					},
					//清除已完成代办事件
					clear(){
						let x = this.todoData.length
						for(let i=0; i<x; i++){
							if(this.todoData[i].status === true){
								axios({
									method: 'delete',
									url: 'http://localhost:3000/todoList/'+this.todoData[i].id
								}).then((backdata)=>{
									if(backdata.state == 200){
										this.getAll();
									}
								})
							}
						}
					},
				}
			});