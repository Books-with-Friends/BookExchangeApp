const React = require('react');
import { Link } from "react-router-dom";

class Nav extends React.Component {
  render(props) {
    return (
      <>
      <div className="nav-bar">
        <ul className="nav-items">
          <li ><Link to="/">Home</Link></li>
          <li ><Link to="/mypage">My Books</Link></li>
          <li ><Link to="/search">Find Books</Link></li>
          <li ><Link to="/searchAll">search all</Link></li>
          <li><Link to='/addmybook'>Add My Book</Link></li>
          <li ><a href="/logout" >Logout</a></li>
        </ul>
      </div>
      </>
    )
  }
}

export default Nav;
