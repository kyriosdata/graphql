import React, {Component} from "react";
import gql from "graphql-tag";
import {graphql} from "@apollo/client/react/hoc";

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

const query = gql`
{
    songs {
        id
        title
    }
}
`;

export default graphql(query)(SongList);