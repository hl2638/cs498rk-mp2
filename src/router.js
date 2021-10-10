import {
    Redirect,
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import ListView from "./views/ListView"
import GalleryView from "./views/GalleryView";
import DetailView from "./views/DetailView";

export default function router() {
    return (
        <Router>
            <div>
                <ul>
                    <li>
                        <Link to="/list">List View</Link>
                    </li>
                    <li>
                        <Link to="/gallery">Gallery</Link>
                    </li>
                </ul>

                <hr />

                {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
                <Switch>
                    <Route exact path="/">
                        <Redirect to="/list" />
                    </Route>
                    <Route path="/list">
                        <ListView />
                    </Route>
                    <Route path="/gallery">
                        <GalleryView />
                    </Route>
                    <Route path="/detail/:id">
                        <DetailView />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

// You can think of these components as "pages"
// in your app.

