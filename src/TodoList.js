import React, {Component} from 'react';
import Task from "./Task"
import {Input, Button, List} from "antd";
import {init} from "ityped";

const Style = {
    listInputStyle:{    
        width: "60%",
        display: "block",
        margin: "auto",
    },
    todolistStyle:{
        height:"100%",
        width: "60%",
        margin: "auto",
        height: "70vh"
    }
}


class TodoList extends React.Component{
    constructor(props){
        super(props);

        this.state={
            displayMode:"normal",
            userInput:"",
            counter:0,
            list:[]
        }
        
        this.handleAdd = this.handleAdd.bind(this);
        this.handleClear = this.handleClear.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleFinish = this.handleFinish.bind(this);
        this.handleDisplayMode = this.handleDisplayMode.bind(this);
    }
    componentDidMount(){
        const todoTitle = document.querySelector('#todoTitle')
      init(todoTitle, { showCursor: false, strings: ['This is my Todo-list', 'Enjoy!' ],backDelay:  1500, })
    }
    handleAdd(){
        let newlist = this.state.list.concat({
            id: this.state.counter,
            content:this.state.userInput,
            isFinish:false
            });
        console.log(newlist);
        this.setState({
            counter:this.state.counter+1,
            list: newlist,
            userInput:''
        }        
    )
    }

    handleClear(){
        this.setState({
            list: []
        })
    }

    
    handleChange(event){
        this.setState(
            {
                userInput:event.target.value
            }
        )
    }

   handleDelete(taskId){
       console.log(taskId)
       let newlist = this.state.list.filter(
           (item)=>{
               return item.id !== taskId;
           }
       )
        console.log(newlist);
       this.setState(
           {
               list: newlist
           }
       )
   }

   handleFinish(taskId){
       console.log("success");
       let newlist = this.state.list.map((item)=>{
           if(item.id === taskId){
               let newitem = {
                   id:item.id,
                   content:item.content,
                   isFinish:!item.isFinish
               }
                return newitem;
            }else{
                return item;
        }
       });
       
    this.setState({
        list:newlist
    })      
   }

   handleDisplayMode(event){
       console.log(event.target.getAttribute("mode"))
       this.setState({
        displayMode:event.target.getAttribute("mode")
       })
       
   }
   
    render(){
        
        const todolist = 
        this.state.displayMode=="normal"?this.state.list.map((item)=>{
            return<Task taskId={item.id} content={item.content} handleDelete={this.handleDelete} 
       handleFinish={this.handleFinish} isFinish={item.isFinish}/>
        }):
        this.state.displayMode=="finish"?this.state.list.filter((item)=>{
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
                <div id="todoTitle" style={{height:"15px",width:"auto"}}/>
                <h2>displaying {this.state.displayMode}</h2>
                <List
                 style={Style.todolistStyle}
                 header={<div>Displaying: {this.state.displayMode}</div>}
                 footer={<div>Todolist Version: v0.0.3</div>}
                 bordered
                 dataSource={todolist}
                 renderItem={item => (
                 <List.Item>{item}</List.Item>
                 )}
                  />
                  
                <Input style={Style.listInputStyle} type="string" onChange={this.handleChange} value={this.state.userInput}></Input>
                
                <Button onClick={this.handleAdd}>>Add Todo</Button>
                <Button onClick={this.handleClear}>clear</Button>
                <Button onClick={this.handleDisplayMode} mode="normal">show all</Button>
                <Button onClick={this.handleDisplayMode} mode="finish">show finish</Button>
                <Button onClick={this.handleDisplayMode} mode="unfinish">show unfinish</Button>
             </div>
        )
    }
}

export default TodoList;
