import mongoose from "mongoose";
import graphql from "graphql";

const {GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList} = graphql;

import "../models/song.js";
import LyricType from "./lyric_type.js";

const Song = mongoose.model('song');

const SongType = new GraphQLObjectType({
    name: 'SongType',
    fields: () => ({
        id: {type: GraphQLID},
        title: {type: GraphQLString},
        lyrics: {
            type: new GraphQLList(LyricType),
            resolve(parentValue) {
                return Song.findLyrics(parentValue.id);
            }
        }
    })
});

export default SongType;
