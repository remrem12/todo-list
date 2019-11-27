import React, { Component } from 'react'

export default class TaskItem extends Component {

    constructor(props){
        super(props);
        this.state = {
            showEditInput: false
        }
    }

    

    changeStatus = (id) => {
        this.props.getIdOfStatus(id);
    }

    deleteTask = (id) => {
        this.props.deleteTask(id);
    }



    showEditInputForm = (name) => {
        this.setState({
            showEditInput: !this.state.showEditInput
        })
        
    }

    getEditInput = (id) => {
        // send id and new input to TaskTable -> App
        let newInput = document.querySelector('.newInput').value;
        if(newInput === ''){
            alert('U must fill the name BAKA >.< !!');
            return;
        }
        this.props.getEditInput(id, newInput);
        
        this.setState({
            showEditInput: !this.state.showEditInput
        })
        
    }

    

    componentDidUpdate(){
        let oldInput = document.querySelector('.newInput');
        if(oldInput){
            oldInput.addEventListener('focus', function(){
                this.select();
            })
        }
        
    }

    onChange = () => {

    }

    render() {

        let { task, index } = this.props


        return (
            <tr>
                <td className="text-center">{index + 1}</td>
                <td>{!this.state.showEditInput ? task.name : <input type = 'text' 
                    className = 'form-control newInput'
                    defaultValue = {task.name} 
                    onChange = { this.onChange }
                    
                />}
                
                </td>
                <td className="text-center trangthai"> 
                    <span className = { task.status === true ? "badge badge-success" : "badge badge-secondary"}
                        onClick = {() => this.changeStatus(task.id)}
                    >{task.status === true ? 'Active' : 'Hide'}</span>
                </td>
                <td className="text-center">

                    {!this.state.showEditInput ? 
                        <div className="btn btn-outline-warning btn-sm m-1"
                            onClick = { () => this.showEditInputForm(task.name) }
                        ><i className="fas fa-pencil-alt" /> Edit</div> : 
                        <div className="btn btn-outline-success btn-sm m-1"
                            onClick = {() =>  this.getEditInput(task.id) }
                        ><i className="fas fa-clipboard" /> Save</div>
                    }
                
                    


                    <div className="btn btn-outline-danger btn-sm"
                        onClick = { () => this.deleteTask(task.id) }
                    ><i className="fas fa-trash" /> Delete</div>

                </td>
            </tr>
        )
    }
}
