import React from "react";
import {graphql} from "@apollo/client/react/hoc";

import query from "../queries/fetchSongs.js";
import deleteSong from "../queries/deleteSong.js";
// import {useNavigate} from "react-router-dom";

const SongList = (props) => {

    // A opção por navigate foi usada em SongCreate
    // (aqui segue uma alternativa)
    // const navigate = useNavigate();

    function onSongDelete(id) {
        console.log("delete song...");
        props.mutate({
            variables: {id},
            // refetchQueries: [{query}]
        }).then(() => {
            // Estratégia usada em SongCreate
            // navigate("/songs/list");
            // console.log("mutation executed ok for", id);

            // Esta opção está disponível porque query
            // está associada ao presente componente.
            props.data.refetch();
        });
        ;
    }

    function renderSongs() {
        if (props.data.loading) {
            return (<li>Carregando...</li>);
        }

        const musicas = props.data.songs;

        if (musicas.length == 0) {
            return (<div key={0}>Nenhuma música disponível</div>);
        }

        return musicas.map(song => {
                return (
                    <li key={song.id} className="collection-item mudanca">
                        {song.title}
                        <i className="material-icons secondary-content" onClick={() => onSongDelete(song.id)}>delete</i>
                    </li>
                );
            }
        );
    }

    return (
        <div>
            <ul className="collection">
                {renderSongs()}
            </ul>
        </div>
    );
}

export default graphql(deleteSong)(
    graphql(query)(SongList)
);