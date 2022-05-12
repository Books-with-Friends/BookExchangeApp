const React = require('react');
import { Link } from "react-router-dom";

class Nav extends React.Component {
  render() {
    // const navComponents = [];
    // if (true) {
    //   navComponents.push(
    //     <ul className="nav-items">
    //       <li key={0}><Link to="/">Home</Link></li>
    //       <li key={1}><Link to="/mypage">My Books</Link></li>
    //       <li key={2}><Link to="/search">Find Books</Link></li>
    //       <li key={3}>dsds</li>
    //     </ul>
    //   )
    // } else {
    //   navComponents.push(
    //     <ul>
    //       <li key={1}><Link to="/login">Login</Link></li>
    //       <li key={2}><Link to="/register">Register</Link></li>
    //     </ul>
    //   )
    // }

    return (
      <div className="nav-bar">
        <ul className="nav-items">
          <li ><Link to="/">Home</Link></li>
          <li ><Link to="/mypage">My Books</Link></li>
          <li ><Link to="/search">Find Books</Link></li>
          <li ><Link to="/searchAll">search all</Link></li>
          <li ><a href="/logout" >Logout</a></li>
        </ul>
      </div>
    )
  }
}

export default Nav;
