import './App.css';
import ToDoList from "./components/ToDoList";
import React from "react";
import ToDoAdd from "./components/ToDoAdd";

function App() {
    return (
        <div className="container">
            <h1 className="text-center">ToDo List</h1>
            <div className="d-flex justify-content-center">
                <ToDoAdd/>
            </div>
            <div className="d-flex justify-content-center">
                <ToDoList/>
            </div>
        </div>
    );
}

export default App;
