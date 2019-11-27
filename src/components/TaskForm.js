import React, { Component } from 'react'

export default class TaskForm extends Component {

    constructor(props){
        super(props);

        this.state = {
            name: '',
            status: false
        }
    }

    closeAddForm = () => this.props.toggleAddForm();

    getInput = (event) => {
        let name = event.target.name
        let value = event.target.value;
        if(name === 'status'){
            value = (value === 'true' ? true : false);
        }
        this.setState({
            [name]: value
        })
    }

    onSubmit = (event) => {
        event.preventDefault();
        this.props.getTask(this.state);
        this.setState({
            name: '',
            status: false
        })
    }

    render() {
        return (
            <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 text-left">
                <div className="card text-black bg-white mb-3">
                    <div className="card-header">Add Task <i className="far fa-times-circle text-right close" onClick = {this.closeAddForm}/></div>
                    <div className="card-body">
                        <form onSubmit = {this.onSubmit}>
                            <div className="form-group mbt">
                                <label>Name: </label>
                                <input type="text" className="form-control mb-2" name="name" 
                                    onChange = { this.getInput } value = {this.state.name}
                                />
                                <label>Status: </label>
                                <select className="form-control" name="status"
                                    onChange = { this.getInput } value = {this.state.status}
                                >
                                    <option value={true}>Active</option>
                                    <option value={false}>Hide</option>
                                </select>
                                <div className="option mt-2 text-center">
                                    <button type = 'submit' className="btn btn-outline-success m-1"><i className="fas fa-check" /> Add</button>
                                    <button className="btn btn-outline-danger" onClick = {this.closeAddForm}><i className="fas fa-times" /> Cancel</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                </div>

        )
    }
}
