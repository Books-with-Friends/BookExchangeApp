const React = require("react");
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
//will house all the react components
import Nav from './components/Nav.jsx';
import Root from './routes/Root.jsx';
import Login from './routes/Login.jsx';
import Register from './routes/Register.jsx';
import MyPage from './routes/MyPage.jsx';
import Search from './routes/Search.jsx';
import NotFound from './routes/NotFound.jsx';
import AddMyBook from './routes/AddMyBook.jsx';
import SearchAll from "./routes/SearchAll";
import Header from "./components/Header";

class App extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   name: this.props.cookies.get("name"),
    //   img: this.props.cookies.get("img"),
    // };
  }

  render() {
    return (
      <div>
        <Header />
        <Router>
          {/* NAV will always be rendered */}
          <Nav />
          <Routes>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/mypage" element={<MyPage />} ></Route>
            <Route path="/search" element={<Search />}></Route>
            <Route path="/" element={<Root />}></Route>
            <Route path="/:id" element={<NotFound />}></Route>
            <Route path="/addmybook" element={<AddMyBook loggedIn={this.state.loggedIn} userID={this.state.userID} />}></Route>
            <Route path="/searchAll" element={<SearchAll />}></Route>
          </Routes>
        </Router>
      </div>
    );
  }
}

export default App;
