import React, {Component} from 'react';
import Task from "./Task"
import {Input, Button, List} from "antd";
import {init} from "ityped";
import Store from './store'


class TodoList extends React.Component{
    constructor(props){
        super(props);

        this.state= Store.getState();
        this.handleAdd = this.handleAdd.bind(this);
        this.handleClear = this.handleClear.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleFinish = this.handleFinish.bind(this);
        this.handleDisplayMode = this.handleDisplayMode.bind(this);
        this.handleChangeState = this.handleChangeState.bind(this);

        Store.subscribe(this.handleChangeState);
    }
    componentDidMount(){
        const todoTitle = document.querySelector('#todoTitle')
      init(todoTitle, { showCursor: false, strings: ['This is my Todo-list', 'Enjoy!' ],backDelay:  1500, })
      this.setState({
          windowSize: document.body.offsetWidth
      })
      window.addEventListener('resize', this.handleResize.bind(this))
    }

    handleChangeState(){
        this.setState(Store.getState());
    }

    handleResize(e){
        console.log('浏览器窗口大小改变事件', e.target.innerWidth)
        const action = {
            type: "window_size_change",
            value: e.target.innerWidth
        }
        Store.dispatch(action);
    }

    handleAdd(){
        const action = {
            type: 'add_todo_task',
            value: {
                id: this.state.counter,
                content:this.state.userInput,
                isFinish:false
                }
        }
        Store.dispatch(action);
    }

    handleClear(){
        const action = {
            type: "clear_all_task",
            value: ""
        }
        Store.dispatch(action);
    }

    
    handleChange(event){
         const action = {
             type: "user_input_change",
             value: event.target.value
         }
        Store.dispatch(action);
    }

   handleDelete(taskId){
        const action = {
            type: "task_delete",
            value: taskId,
        }
        Store.dispatch(action);
   }

   handleFinish(taskId){
        const action = {
            type: "finish_mode",
            value: taskId
        }
        Store.dispatch(action);
   }

   handleDisplayMode(event){
       const action = {
           type: "display_mode_change",
           value: event.target.getAttribute("mode")
       }

       Store.dispatch(action);
   }
   
    render(){
        const Style = this.state.windowSize<770?
        {
            listInputStyle:{    
                width: "80%",
                display: "block",
                margin: "auto",
                marginTop: 20,
                fontSize:"16px"
            },
            todolistStyle:{
                height:"100%",
                width: "80%",
                margin: "auto",
                backgroundColor:"white",
                fontSize:"16px"
            },
            buttonStyle:{
                marginRight:"4px",
                width:"15%",
                fontSize:10,
                //textAlign:"left"
                paddingLeft: 0
            }
        }:{
            listInputStyle:{    
                width: "70%",
                display: "block",
                margin: "auto",
                marginTop: 20,
                fontSize:"18px"
            },
            todolistStyle:{
                height:"100%",
                width: "70%",
                margin: "auto",
                backgroundColor:"white",
                fontSize:"18px"
            },
            buttonStyle:{
                marginRight:"10px"
            }
        }

        const todolist = 
        this.state.displayMode === "normal"?this.state.list.map((item)=>{
            return<Task taskId={item.id} content={item.content} handleDelete={this.handleDelete} 
       handleFinish={this.handleFinish} isFinish={item.isFinish}/>
        }):
        this.state.displayMode === "finish"?this.state.list.filter((item)=>{
            return item.isFinish === true;
        }).map((item)=>{
            return<Task taskId={item.id} content={item.content} handleDelete={this.handleDelete} 
       handleFinish={this.handleFinish} isFinish={item.isFinish}/>
        }):
        this.state.list.filter((item)=>{
            return item.isFinish === false;
        }).map((item)=>{
            return<Task taskId={item.id} content={item.content} handleDelete={this.handleDelete} 
       handleFinish={this.handleFinish} isFinish={item.isFinish}/>
        })
        

        return (
           
            <div style={{backgroundColor:"gray",height:"100%"}}>
                <h1>Todo-List</h1>
                <div id="todoTitle" style={{height:"15px",width:"auto",marginBottom:20, fontSize:20}}/>
                <List
                 style={Style.todolistStyle}
                 header={<div>Displaying: {this.state.displayMode}</div>}
                 footer={<div style={{marginBottom:"20px"}}>Todolist Version: v0.0.3</div>}
                 bordered
                 dataSource={todolist}
                 renderItem={item => (
                 <List.Item>{item}</List.Item>
                 )}
                  />
                  
                <Input style={Style.listInputStyle} type="string" onChange={this.handleChange} value={this.state.userInput}></Input>
                <div style={{marginTop: 10}}>
                <Button style={Style.buttonStyle} onClick={this.handleAdd}>Add Todo</Button>
                <Button style={Style.buttonStyle} onClick={this.handleClear}>clear</Button>
                <Button style={Style.buttonStyle} onClick={this.handleDisplayMode} mode="normal">show all</Button>
                <Button style={Style.buttonStyle} onClick={this.handleDisplayMode} mode="unfinish">show unfinish</Button>
                <Button style={Style.buttonStyle} onClick={this.handleDisplayMode} mode="finish">show finish</Button>
                </div>
             </div>
        )
    }
}

export default TodoList;
