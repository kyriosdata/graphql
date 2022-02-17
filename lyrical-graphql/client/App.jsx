import React from "react";
import { Outlet, Link } from "react-router-dom";

class App extends React.Component {
    render() {
        return (
            <div>
                <h1>Músicas</h1>
                <nav
                    style={{
                        borderBottom: "solid 1px",
                        paddingBottom: "1rem"
                    }}
                >
                    <Link to="songs/list">Exibe</Link> |{" "}
                    <Link to="songs/create">Cria</Link>
                </nav>
                <Outlet/>
            </div>
        );
    }
}

export default App;