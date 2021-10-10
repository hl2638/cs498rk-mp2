import React from "react";
import {
    useParams
} from "react-router-dom";
function DetailView() {
    let {id} = useParams();
    return (
        <div className="DetailView">
            <header className="View-header">
                {/*<img src={logo} className="App-logo" alt="logo" />*/}
                <p>
                    This is a Detail View of "{id}". It's supposed to be about {id}.
                </p>
            </header>
        </div>
    );
}

export default DetailView;
