import {gql} from "@apollo/client";

export default gql`
mutation DeleteSong($id: ID) {
    deleteSong(id: $id) {
        id
    }
}
`;