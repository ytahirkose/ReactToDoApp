import React, {Component} from 'react';
import axios from "axios";
const ToDoContext = React.createContext();

const reducer = (state, action) => {
    if (action.type === "ADD_TODO") {
        let check = true;
        let newList = [];
        // eslint-disable-next-line array-callback-return
        state.toDoList.map(item => {
            if ([action.payload][0].id === item.id) {
                check = false;
            }
        })
        check ? newList = state.toDoList.concat([action.payload]) : newList = state.toDoList;

        return {
            toDoList: newList
        }
    } else if (action.type === "DELETE_TODO") {
        return {
            ...state,
            toDoList: state.toDoList.filter(item => action.payload !== item.id)
        }
    } else if (action.type === "UPDATE_STATUS_TODO"){
        return {
            ...state,
            toDoList: state.toDoList.filter(item => action.payload.id !== item.id).concat([action.payload])
        }
    } else return state;
}


export class ToDoProvider extends Component {
    state = {
        toDoList: [],
        dispatch: (action) => {
            this.setState(toDoList => reducer(toDoList, action))
        }
    }
    componentDidMount = async () => {
        const response = await axios.get("https://jsonplaceholder.typicode.com/todos")
        this.setState({toDoList: response.data})
    }

    render() {
        return (
            <ToDoContext.Provider value={this.state}>
                {this.props.children}
            </ToDoContext.Provider>
        );
    }
}

const ToDoConsumer = ToDoContext.Consumer;

export default ToDoConsumer
