import React, { Component } from 'react';
import './App.css';
import Title from './components/Title';
import TaskForm from './components/TaskForm';
import Control from './components/Control';
import TaskTable from './components/TaskTable';

export default class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      tasks: [],
      showAddButton: false,
      filter: {
        name: '',
        status: -1
      },
      sort: {
        by: 'name',   //sort by name
        value: 1  //ascendant
      }
    }
  }

  componentWillMount(){
    if(localStorage && localStorage.getItem('tasks')){
      this.setState({
        tasks: JSON.parse(localStorage.getItem('tasks'))
      })
    }

  }

  S4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);

  generateId = () => {
    return this.S4() + '-' + this.S4() + '-' + this.S4();
  }



  toggleAddForm = () => {
    this.setState({
      showAddButton: !this.state.showAddButton
    })
  }

  getTask = (data) => {
    data.id = this.generateId()
    let tasks = this.state.tasks;
    tasks.push(data);
    this.setState({
      tasks: tasks
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }


  getIdOfStatus = (id) => {

    let tempTasks = this.state.tasks;
    for (let index = 0; index < tempTasks.length; index++) {
      if(tempTasks[index].id === id){
        tempTasks[index].status = !tempTasks[index].status;
      }
    }
    
    this.setState({
      tasks: tempTasks
    })
    localStorage.setItem('tasks', JSON.stringify(this.state.tasks));
  }

  deleteTask = id => {
    let tempTasks = this.state.tasks;
    for (let index = 0; index < tempTasks.length; index++) {
      if(tempTasks[index].id === id){
        tempTasks.splice(index, 1);
      }
    }
    
    this.setState({
      tasks: tempTasks
    })
    localStorage.setItem('tasks', JSON.stringify(this.state.tasks));
  }


  getEditInput = (id, newInput) => {
    let tempTasks = this.state.tasks;
    for (let index = 0; index < tempTasks.length; index++) {
      if(tempTasks[index].id === id){
        tempTasks[index].name = newInput;
      }
    }
    this.setState({
      tasks: tempTasks
    })
    localStorage.setItem('tasks', JSON.stringify(this.state.tasks));
  }


  onFilter = (filterName, filterStatus) => {
    this.setState({
      filter: {
        name: filterName,
        status: Number(filterStatus)
      }
    })
  }

  // SEARCH

  sendKey = (keyWord) => {
    this.setState({
      filter: {
        name: keyWord,
        status: Number(this.state.filter.status)
      }
    })
    // console.log(keyWord);
    
  }


  onSort = (sortBy, sortValue) => {
    this.setState({
      sort: {
        by: sortBy,
        value: sortValue
      }
    })
  }


  render(){
    var { tasks, showAddButton, filter, sort } = this.state;

    // Filter
    if(filter){
      if(filter.name){
        tasks = tasks.filter((task) => {
          return task.name.toLowerCase().indexOf(filter.name.toLowerCase()) !== -1
        })
      }
      
      tasks = tasks.filter((task) => {
        
        if(filter.status === -1){
          return task;
        }
        return Number(task.status) === filter.status;
      })
      
    }

    if(sort){
      if(sort.by === 'name'){   
        tasks.sort((a, b) => {
          
          if(a.name.toLowerCase() > b.name.toLowerCase()){ return sort.value;}  // A-Z
          if(a.name.toLowerCase() < b.name.toLowerCase()){ return -sort.value;} // Z-A
          return 0;
        });
      }
      else{
        tasks.sort((a, b) => {
          
          if(a.status > b.status){ return -sort.value;}  // A-Z
          if(a.status < b.status){ return sort.value;} // Z-A
          return 0;
        });
      }
      



    }


    return (
      <div className="App">
        <div className="container">
          <Title/>
          <div className="row">

            {showAddButton && <TaskForm 
              toggleAddForm = {this.toggleAddForm}
              getTask = {this.getTask}
            />}

            <div className="col text-left">
              {/* add button component */}
              
              <div className="btn btn-outline-success"
                onClick = {this.toggleAddForm}
              ><div className="fas fa-plus" /> Add Task</div>


              <Control 
                sendKey = {(keyWord) => this.sendKey(keyWord) }
                onSort = {this.onSort}
              />

              <TaskTable tasks = {tasks}
                getIdOfStatus = { (id) => {this.getIdOfStatus(id)} }
                deleteTask = { (id) => this.deleteTask(id) }
                getEditInput = {(id, newInput) =>  this.getEditInput(id, newInput) }
                onFilter = {this.onFilter}
              />

            </div>  
          </div>        
        </div>

      </div>
    );
  }
  
}

