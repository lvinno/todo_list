import React, {Component} from 'react';
import Task from "./Task"

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
            
            <div>
                <h1>To-Do-List</h1>
                <h2>displaying {this.state.displayMode}</h2>
                <ul>
                    {
                        todolist
                    }
                </ul>
                <input type="string" onChange={this.handleChange} value={this.state.userInput}></input>
                <button onClick={this.handleAdd}>Add Todo</button>
                <button onClick={this.handleClear}>clear</button>
                <button onClick={this.handleDisplayMode} mode="normal">show all</button>
                <button onClick={this.handleDisplayMode} mode="finish">show finish</button>
                <button onClick={this.handleDisplayMode} mode="unfinish">show unfinish</button>
            </div>
        )
    }
}

export default TodoList;
