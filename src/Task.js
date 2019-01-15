import React, {Component} from 'react';
import {Button} from "antd";

class Task extends React.Component{
    constructor(props){
        super(props);

        this.handleDelete = this.handleDelete.bind(this);
        this.handleFinish = this.handleFinish.bind(this);
    }

handleDelete(){
    console.log(this.props.taskId)
    this.props.handleDelete(this.props.taskId);
}

handleFinish(){
    this.props.handleFinish(this.props.taskId);
}
    render(){

        return <div style={{width:"100%"}}>
        <li style={this.props.isFinish==false?{display:"inline-block",width:"80%",textDecoration:"none",textAlign:"left"}:
        {display:"inline-block",textDecoration:"line-through",textAlign:"left",width:"80%"}} onClick={this.handleFinish}>{this.props.content}</li>
        <Button type="danger" size="small" onClick={this.handleDelete} style={{display:"inline-block",marginRight:"0"}}>delete</Button>
        </div> 
    }
}

export default Task;