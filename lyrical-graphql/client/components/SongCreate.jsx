import React from "react";
import gql from "graphql-tag";
import {graphql} from "@apollo/client/react/hoc";
import { Link, useNavigate } from "react-router-dom";

class SongCreate extends React.Component {
    constructor(props) {
        super(props);

        this.state = { title: ""}
    }

    onSubmit(evento) {
        evento.preventDefault();

        //const navigate = useNavigate();

        this.props.mutate({
            variables: {
                title: this.state.title
            }
        }).then(() => console.log("mutation executed ok"));

        console.log(" onSubmit...");
    }

    render() {
        return (
            <div>
                <Link to="/">Home</Link>
                <h3>Crie uma música</h3>
                <form onSubmit={this.onSubmit.bind(this)}>
                    <label>Título da música:</label>
                    <input onChange={event => this.setState({ title: event.target.value})}
                    value={this.state.title}/>
                </form>
            </div>
        )
    }
}

const mutation = gql`
mutation AddSong($title: String) {
  addSong(title: $title) {
    id 
    title
  }
}
`;

export default graphql(mutation)(SongCreate);