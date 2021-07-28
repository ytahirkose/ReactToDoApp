import React, {Component} from 'react';
import ToDo from "./ToDo";
import ToDoConsumer from "../context";

class ToDoList extends Component {

    render() {
        return (
            <ToDoConsumer>
                {
                    value => {
                        const toDos = value.toDoList;
                        return (<div className="w-75">
                            {value.toDoList.length > 0 ? toDos.map(
                                (item) =>
                                    <ToDo
                                        key={item.id}
                                        el={item}
                                        deleteToDo={this.deleteToDo}
                                    />
                            ) : <h2 className="text-center">There is no task in the list!</h2>
                            }
                        </div>)

                    }
                }
            </ToDoConsumer>
        );
    }
}

export default ToDoList;
