import React, {Component} from 'react';

class Task extends React.Component{
    constructor(props){
        super(props);

        this.handleDelete = this.handleDelete.bind(this);
    }

handleDelete(){
    console.log(this.props.taskId)
    this.props.handleDelete(this.props.taskId);
}
    render(){
        return <li>{this.props.content}
        <button  onClick={this.handleDelete} >delete</button></li>
    }
}

export default Task;