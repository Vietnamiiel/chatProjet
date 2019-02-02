import React from "react";
import io from "socket.io-client";
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import div from '@material-ui/core/Grid';

class Chat extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username: '',
            message: '',
            messages: []
        };

        this.socket = io('localhost:8080');

        //Envoi les données au server
        this.sendMessage = (event) => {
            event.preventDefault();
            this.socket.emit('SEND_MESSAGE', {
                author: this.state.username,
                message: this.state.message
            });
            this.setState({message: ''});
        };
        // Réception des données (user+messages)
        this.socket.on('RECEIVE_MESSAGE', (data) => {
            addMessage(data);
        });
        // On ajoute les données(user+message) au tableau messages
        const addMessage = (data) => {
            this.setState({messages: [...this.state.messages, data]});
        };
        // Update username avec ce que renseigne l'utilisateur
        this.userName = (event) => {
            this.setState({
                username: event.target.value
            });
        };
        // Update message avec ce que renseigne l'utilisateur
        this.showMessage = (event) => {
            this.setState({
                message: event.target.value
            });
        };
    };
    render(){
        return (
            <div className="container-fluid" style={{background: 'white', padding: '30px', opacity:'0.9', borderRadius: '5px'}}>
                <div style={{textAlign:'center', fontSize:'40px', fontFamily:'Roboto'}}>Chat Room</div>
                <hr/>
                <div style={{fontSize:'18px', minHeight:'250px'}}>
                    {this.state.messages.map((message) => {
                        return (
                            <div> <span style={{color:'#c62828', fontWeight:'bold'}}> {message.author} </span>: {message.message} </div>
                        )
                    })}
                </div>
                <div>
                    <Input type="text"
                           placeholder="Pseudonyme"
                           value={this.state.username}
                           onChange={this.userName.bind(this)}
                           className="Input"/>
                    <br/>
                    <Input type="text"
                           placeholder="Message"
                           value={this.state.message}
                           onChange={this.showMessage.bind(this)}
                           className="Input"/>
                    <br/>
                    <Button variant="contained"
                            color="primary"
                            onClick={this.sendMessage.bind(this)}
                            style={{opacity:'1'}}> Envoyer </Button>
                </div>
            </div>
        );
    }
}
export default Chat;
