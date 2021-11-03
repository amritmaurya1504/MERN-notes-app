import React , { useEffect, useState } from "react";
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Header from './component/Header';
import Footer from './component/Footer';
import LandingPage from './screens/LandingPage';
import MyNotes from './screens/MyNotes';
import Login from './screens/Login';
import Register from './screens/Register';
import "./App.css"
import CreateNotes from "./screens/CreateNotes";
import SingleNote from "./screens/SingleNote";
import Profile from "./screens/Profile";
import { setUserDetails } from "../src/actions/index"
import { useDispatch, useSelector } from 'react-redux'

function App() {
  const [search , setSearch] = useState();
  console.log(search);
  const dispatch = useDispatch()
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    dispatch(setUserDetails(user));
  })

  return (
    <div>
      <Router>
        <Header setSearch={setSearch} />
        <Switch>
          <Route exact path="/"><main><LandingPage /> </main></Route>
          <Route path="/mynotes"><MyNotes search={search} /></Route>
          <Route path="/login"><Login /></Route>
          <Route path="/register"><Register /></Route>
          <Route path="/createnote"><CreateNotes /></Route>
          <Route path="/note/:id"><SingleNote /></Route>
          <Route path="/profile"><Profile /></Route>
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
