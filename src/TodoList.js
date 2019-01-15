import React, {Component} from 'react';
import Task from "./Task"
import {Input, Button, List} from "antd";
import {init} from "ityped";

const Style = {
    listInputStyle:{    
        width: "50%",
        display: "block",
        margin: "auto",
        marginTop: 20,
        fontSize:"18px"
    },
    todolistStyle:{
        height:"100%",
        width: "50%",
        margin: "auto",
        backgroundColor:"white",
        fontSize:"18px"
    },
    buttonStyle:{
        marginRight:"10px"
    }
}


class TodoList extends React.Component{
    constructor(props){
        super(props);

        this.state={
            displayMode:"normal",
            userInput:"",
            counter:3,
            list:[
                {
                    id:0,
                    content:"This is my Todo list app",
                    isFinish: false
                },
                {
                    id:1,
                    content:"You can try to click the task to finish it",
                    isFinish: false
                }
                ,
                {
                    id:2,
                    content:"And try different buttons to display different kind of tasks",
                    isFinish: false
                }

            ]
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
                <div id="todoTitle" style={{height:"15px",width:"auto",marginBottom:10, fontSize:16}}/>
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
                <Button style={Style.buttonStyle} onClick={this.handleAdd}>>Add Todo</Button>
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
