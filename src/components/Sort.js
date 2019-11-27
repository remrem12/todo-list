import React, { Component } from 'react'

export default class Sort extends Component {

    constructor(props){
        super(props);
        this.state = {
            sort: {
                by: 'name',
                value: 1
            }
        }
    }

    onClick = (sortBy, sortValue) => {
        this.setState({
            sort: {
                by: sortBy,
                value: sortValue
            }
        })
        this.props.onSort(sortBy, sortValue);
    }




    render() {

        let {sort} = this.state;

        return (
            <div className="col">
                <div className="btn-group">
                <button type="button" className="btn btn-outline-info dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="fas fa-sort" /> Sort </button>
                <div className="dropdown-menu">

                    <li  className="dropdown-item" onClick = { () => this.onClick('name', 1)}><i className="fas fa-sort-alpha-down" /> Name A-Z <span
                        className = {sort.by === 'name' && sort.value === 1 ? 'sort_seleted fas fa-check' : ''}
                    ></span></li>


                    <li  className="dropdown-item" onClick = { () => this.onClick('name', -1)}><i className="fas fa-sort-alpha-down-alt" /> Name Z-A <span
                        className = {sort.by === 'name' && sort.value === -1 ? 'sort_seleted fas fa-check' : ''}
                    ></span></li>


                    <div className="dropdown-divider" />
                    <li  className="dropdown-item" onClick = { () => this.onClick('status', 1)}>Active <span
                        className = {sort.by === 'status' && sort.value === 1 ? 'sort_seleted fas fa-check' : ''}
                    ></span></li>

                    <li  className="dropdown-item" onClick = { () => this.onClick('status', -1)}>Hide <span
                        className = {sort.by === 'status' && sort.value === -1 ? 'sort_seleted fas fa-check' : ''}    
                    ></span></li>
                </div>
                </div>
            </div>
        )
    }
}
