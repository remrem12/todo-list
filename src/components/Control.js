import React, { Component } from 'react'
import Search from './Search';
import Sort from './Sort';

export default class Control extends Component {

    sendKey = (keyWord) => {
        this.props.sendKey(keyWord);
    }

    render() {
        return (
            <div className="row mt-3 mb-4">
                <Search sendKey = {(keyWord) => this.sendKey(keyWord) }/>

                {/* Sort component */}
                <Sort onSort = {this.props.onSort}/>
            </div>

        )
    }
}
