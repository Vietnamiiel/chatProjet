import React, { Component } from 'react';
import Input from '@material-ui/core/Input';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

class TodoList extends Component {
    constructor() {
        super();
        this.state = {
            userInput: '',
            items: []
        };
        // Update userInput avec ce que renseigne l'utilisateur
        this.onChange = (event) => {
            this.setState({
                userInput: event.target.value
            });
        };
        // On ajoute l'element userInput au tableau items
        this.addTask = (event) => {
            event.preventDefault();
            this.setState({
                userInput: '',
                items: [...this.state.items, this.state.userInput],
            });
        };
        //supprime la tache correspondante au bouton
        this.deleteTask = (item) => {
            const array = this.state.items;
            const index = array.indexOf(item);
            array.splice(index, 1);
            this.setState({
                items: array
            });
        };
        // Permet de visualiser les différentes taches
        this.showTask = () => {
            return this.state.items.map((item) => {
                return (
                    <div className="list-group-item item_show"
                         key={item}>
                        <div>
                            {item}
                        </div>
                        <div>
                            <Fab color="secondary"
                                 size="small"
                                 aria-label="Add"
                                 onClick={this.deleteTask.bind(this, item)}>
                                X
                            </Fab>
                        </div>
                    </div>
                );
            });
        }
    };

    render() {
        return(
            <div className="container-fluid"
                 style={{background: 'white', padding: '30px', opacity:'0.9', borderRadius: '5px',minHeight:'250px'}}>
                <div style={{textAlign:'center', fontSize:'40px', fontFamily:'Roboto'}}>To do List</div>
                <hr/>
                <form className="form-row align-items-center">
                    <Input type="text"
                           placeholder="Ajouter une tache"
                           onChange={this.onChange.bind(this)}
                           value={this.state.userInput}
                           className="Input"
                    /><br/>
                    <Fab size="small"
                         color="primary"
                         aria-label="Add"
                         type="submit"
                         onClick={this.addTask.bind(this)}>
                        <AddIcon/>
                    </Fab>
                </form>
                <div className="list-group">
                    {this.showTask()}
                </div>
            </div>
        );
    }
}

export default TodoList;