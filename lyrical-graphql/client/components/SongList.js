import React, { Component } from "react";
import gql from "graphql-tag";
import {graphql} from "@apollo/client/react/hoc";

class SongList extends Component {
    render() {
        console.log(this.props.data.songs);

        return (
            <div>
                {this.props.data.loading || this.props.data.songs.map(s => <h1>{s.title}</h1>)}
            </div>
        );
    }
}

const query = gql`
{
    songs {
        title
    }
}
`;

export default graphql(query)(SongList);