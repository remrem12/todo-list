import React, { Component } from 'react'
import TaskItem from './TaskItem';

export default class TaskTable extends Component {

    constructor(props){
        super(props);
        this.state = {
            filterName: '',
            filterStatus: -1
        }
    }

    getIdOfStatus = (id) => {
        this.props.getIdOfStatus(id);
    }


    deleteTask = (id) => {
        this.props.deleteTask(id);
    }

    getEditInput = (id, newInput) => {
        this.props.getEditInput(id, newInput);
    }

    onChange = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        
        this.props.onFilter(
            name === 'filterName'   ? value : this.state.filterName,
            name === 'filterStatus' ? value : this.state.filterStatus
        );

        this.setState({
            [name]: value
        })

    }

    



    render() {
        
        // let filtedList = this.props.tasks;

        return (
            <table className="table table-striped table-inverse">
                <thead className="thead-inverse">
                    <tr>
                    <th className="text-center">No</th>
                    <th className="text-center">Name</th>
                    <th className="text-center">Status</th>
                    <th className="text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td/>
                        <td><input type="text" className="form-control" name = 'filterName'
                            onChange = { this.onChange }
                        /></td>
                        <td>
                            <select className="form-control" name = 'filterStatus' 
                            onChange = { this.onChange }>
                            <option value = {-1}>All</option>
                            <option value = {0}>Hide</option>
                            <option value = {1}>Active</option>
                            </select>
                        </td>
                        <td/>
                    </tr>

                    {this.props.tasks.map((task, index) => {
                        return <TaskItem
                                    task = {task}
                                    key = {task.id}
                                    index = {index}
                                    getIdOfStatus = {(id) => this.getIdOfStatus(id) }
                                    deleteTask = { (id) => this.deleteTask(id) }
                                    getEditInput = {(id, newInput) =>  this.getEditInput(id, newInput) }
                                />
                    })}
                    
                    

                </tbody>
            </table>

        )
    }
}
