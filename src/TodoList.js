import React, {Component} from 'react';
import Task from "./Task"
class TodoList extends React.Component{
    constructor(props){
        super(props);

        this.state={
            
            list:[],
            userInput:""
        }

        this.handleAdd = this.handleAdd.bind(this);
        this.handleClear = this.handleClear.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }
    handleAdd(event){
        let newlist = this.state.list.concat(this.state.userInput);
        console.log(newlist);
        this.setState({
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
           (item,index)=>{
               return index != taskId;
           }
       )
        console.log(newlist);
       this.setState(
           {
               list: newlist
           }
       )
   }
    render(){
        const todolist = this.state.list.map((item,index)=>{
           return  <Task taskId={index} content={item} handleDelete={this.handleDelete}/>
                })
        return (
            
            <div>
                <h1>To-Do-List</h1>
                <ul>
                    {todolist}
                </ul>
                <input type="string" onChange={this.handleChange} value={this.state.userInput}/>
                <button onClick={this.handleAdd}>Add Todo</button>
                <button onClick={this.handleClear}>clear</button>
            </div>
        )
    }
}

export default TodoList;
