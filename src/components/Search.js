import React, { Component } from 'react'

export default class Search extends Component {


    getKeyWord = (event) => {
        event.preventDefault();
        let keyWord = document.querySelector('input').value;
        this.props.sendKey(keyWord);
    }



    render() {
        return (
            <div className="col-6">
                {/* Search component */}
                <form className="form-inline"
                    onSubmit = {this.getKeyWord}
                >
                <input className="form-control mr-1 mb-1" type="search" placeholder="Enter keyword..." />
                <button className="btn btn-outline-secondary mb-1" type="submit"><div className="fas fa-search" 
                    
                /> Search</button>
                </form>
            </div>
        )
    }
}
