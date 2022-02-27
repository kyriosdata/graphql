import React, {Component} from "react";
import {graphql} from "@apollo/client/react/hoc";

import query from "../queries/fetchSongs.js";
import deleteSong from "../queries/deleteSong.js";

class SongList extends Component {
    renderSongs() {
        if (this.props.data.loading) {
            return (<li>Carregando...</li>);
        }

        const musicas = this.props.data.songs;

        if (musicas.length == 0) {
            return (<li key={0}>Nenhuma música disponível</li>);
        }

        return musicas.map(song => {
                return (
                    <li key={song.id}>{song.title}</li>
                );
            }
        );
    }

    render() {
        return (
            <div>
                <ul>
                    {this.renderSongs()}
                </ul>
            </div>
        );
    }
}

export default graphql(deleteSong)(
    graphql(query)(SongList)
);