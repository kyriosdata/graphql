import React, {Component} from "react";
import {graphql} from "@apollo/client/react/hoc";

import query from "../queries/fetchSongs.js";
import deleteSong from "../queries/deleteSong.js";
import {useNavigate} from "react-router-dom";

const SongList = (props) => {

    const navigate = useNavigate();

    function onSongDelete(id) {
        console.log("delete song...");
        props.mutate({
            variables: {id},
            refetchQueries: [{query}]
        }).then(() => {
            navigate("/songs/list");
            console.log("mutation executed ok for", id);
        });
        ;
    }

    function renderSongs() {
        if (props.data.loading) {
            return (<li>Carregando...</li>);
        }

        const musicas = props.data.songs;

        if (musicas.length == 0) {
            return (<li key={0}>Nenhuma música disponível</li>);
        }

        return musicas.map(song => {
                return (
                    <li key={song.id}>
                        {song.title}
                        <i className="material-icons" onClick={() => onSongDelete(song.id)}>delete</i>
                    </li>
                );
            }
        );
    }

    return (
        <div>
            <ul>
                {renderSongs()}
            </ul>
        </div>
    );
}

export default graphql(deleteSong)(
    graphql(query)(SongList)
);