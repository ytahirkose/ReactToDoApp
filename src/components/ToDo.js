import React, {Component} from 'react';
import ToDoConsumer from "../context";
import axios from "axios";

class ToDo extends Component {

    state = {
        isCompleted: this.props.el.completed
    }
    onDeleteItem = async (dispatch) => {
        await axios.delete(`https://jsonplaceholder.typicode.com/todos/${this.props.el.id}`)
        dispatch({type: "DELETE_TODO", payload: this.props.el.id});
    }

    isTaskDone = async () => {
        this.setState({isCompleted: !this.state.isCompleted})
        this.props.el.completed = !this.props.el.completed
    }

    render() {
        return (
            <ToDoConsumer>
                {
                    value => {
                        const {dispatch} = value;
                        return (
                            <div>
                                <div className="card">
                                    <div className="card-body">
                                        <div id={this.props.el.id} className="d-flex justify-content-between mx-4 my-1">
                                            <input className="mt-2" type="checkbox"
                                                   checked={this.state.isCompleted}
                                                   onChange={this.isTaskDone}
                                                   />
                                            {this.props.el.completed ? <s>{this.props.el.title}</s> :
                                                <span>{this.props.el.title}</span>

                                            }
                                            <svg
                                                onClick={this.onDeleteItem.bind(this, dispatch)}
                                                xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="red"
                                                className="bi bi-trash-fill mt-1" style={{cursor: "pointer"}}
                                                viewBox="0 0 16 16">
                                                <path
                                                    d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    }
                }
            </ToDoConsumer>
        )


    }
}

export default ToDo;
