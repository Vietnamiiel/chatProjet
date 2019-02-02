import React, { Component } from 'react';
import TodoList from "./components/TodoList";
import Chat from "./components/Chat";

class App extends Component {
    render() {
        return (
            <div className="container-fluid main">
                <div className="row">
                    <div className="col-lg-6 todolist">
                        <TodoList/>
                    </div>
                    <div className="col-lg-5 chat">
                        <Chat/>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;