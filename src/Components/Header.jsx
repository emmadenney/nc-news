import logo from "../icons8-morning-news-90.png";

function Header({ loggedInUser }) {
  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" /> NC News
      <p id="loggedUser">Logged in as: {loggedInUser}</p>
    </header>
  );
}

export default Header;
