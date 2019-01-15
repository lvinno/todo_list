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

        return <div>
        <li style={this.props.isFinish==false?{textDecoration:"none"}:{textDecoration:"line-through"}} onClick={this.handleFinish}>{this.props.content}</li>
        <Button type="danger" size="small" onClick={this.handleDelete} style={{marginLeft:400}}>delete</Button>
        </div> 
    }
}

export default Task;