import "regenerator-runtime/runtime";

import React from "react";
import "./App.css";
import { Header } from "./components/Header";
import { ConnectWallet } from "./components/ConnectWallet";
import { HomePage } from "./components/HomePage";
import { SeriesComponent } from "./components/Series";
import { WorldComponent } from "./components/World";
import { login, logout } from "./utils";
import ParcelComponent from "./components/Parcel/Parcel";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [open, setOpen] = React.useState(false);

  const [, setLoading] = React.useState(false);

  const [balance, setBalance] = React.useState("~");

  React.useEffect(() => {
    window.ftContract
      .ft_balance_of({ account_id: window.accountId })
      .then((balance) => setBalance((balance / 10 ** 8).toFixed(2)))
      .catch((err) => console.log(err));
  }, []);

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const onLogin = () => {
    setLoading(true);
    login();
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  };

  return (
    <div className="App">
      <Router>
        <Header
          onConnect={handleOpenModal}
          onLogout={logout}
          balance={balance}
        />
        <ConnectWallet
          open={open}
          onHide={handleCloseModal}
          onLogin={onLogin}
        />
        <Routes>
          <Route path="/minting" element={<ParcelComponent />} />
          <Route
            path="/series"
            element={<SeriesComponent balance={balance} />}
          />
          <Route
            path="/staking"
            element={<WorldComponent balance={balance} />}
          />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
