import React, {Component} from 'react';
import ToDoConsumer from "../context";
import axios from "axios";

class ToDoAdd extends Component {
    state = {
        isEmpty: false,
        newTask: {
            title: "",
            completed: false,
            userId: 1,
            id: ""
        }
    }

    changeInput = (e) => {
        this.setState({newTask: {title: e.target.value, completed: false, userId: 1, id: ""}})
        this.setState({
            isEmpty: false
        })
    }

    addItem = async (dispatch, e) => {
        if (this.state.newTask.title.length < 1) {
            this.setState({
                isEmpty: true
            })
        } else {
            this.setState({
                isEmpty: false
            })
            const newToDo = {
                title: this.state.newTask.title, completed: false, userId: 1, id: ""
            }
            const response = await axios.post("https://jsonplaceholder.typicode.com/todos", newToDo)
            dispatch({type: "ADD_TODO", payload: response.data});
        }
    }

    render() {
        return (
            <ToDoConsumer>
                {
                    value => {
                        const {dispatch} = value;
                        return (
                            <div className="w-50 my-5">
                                <div className="form d-flex justify-content-center">
                                    <input
                                        className="form-control"
                                        placeholder="New Task"
                                        id="newTask"
                                        name="newTask"
                                        value={this.state.newTask.title}
                                        onChange={this.changeInput}
                                    />
                                    <button onClick={this.addItem.bind(this, dispatch)}
                                            className="btn btn-primary ms-5">Add
                                    </button>
                                </div>
                                {this.state.isEmpty ?
                                    <div className="mt-2">
                                        <h5 className="alert alert-danger">It mustn't be empty</h5></div>
                                    : null
                                }
                            </div>
                        );
                    }
                }
            </ToDoConsumer>
        );
    }
}

export default ToDoAdd;
