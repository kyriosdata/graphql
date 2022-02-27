import React from "react";
import {
    useParams
} from "react-router-dom";

const SongDetail = (props) => {
    const { id } = useParams();

    return (
      <div>
          <h2>Detalhe da música {id}</h2>
      </div>
    );
};

export default SongDetail;