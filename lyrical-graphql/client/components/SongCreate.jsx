import React, {useState} from "react";
import {gql} from "@apollo/client";
import {graphql} from "@apollo/client/react/hoc";
import {Link, useNavigate} from "react-router-dom";

import fecthQuery from "../queries/fetchSongs.js";

function SongCreate(props) {
    const [title, setTitle] = useState("");
    const navigate = useNavigate();

    const onSubmit = (evento) => {
        evento.preventDefault();

        props.mutate({
            variables: {title},
            refetchQueries: [{query: fecthQuery}]
        }).then(() => { navigate("/songs/list"); console.log("mutation executed ok for", title); });

        console.log(" onSubmit...");
    }

    return (
        <div>
            <Link to="/">Home</Link>
            <h3>Crie uma música</h3>
            <form onSubmit={onSubmit}>
                <label>Título da música:</label>
                <input onChange={event => setTitle(event.target.value)}
                       value={title.title}/>
            </form>
        </div>
    )

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