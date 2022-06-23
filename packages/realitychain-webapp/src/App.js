import React from "react";
import "./App.css";
import { Header } from "./components/Header";
import { ConnectWallet } from "./components/ConnectWallet";
import { HomePage } from "./components/HomePage";
import { WorldComponent } from "./components/World";
import { login, logout } from "./utils";
import ParcelComponent from "./components/Parcel/Parcel";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [open, setOpen] = React.useState(false);

  const [, setLoading] = React.useState(false);

  const [balance, setBalance] = React.useState("~");
  const [, setContractOwner] = React.useState("");
  const [, setLandMetadata] = React.useState([]);
  const [, setLands] = React.useState([]);

  React.useEffect(() => {
    window.ftContract
      .ft_balance_of({ account_id: window.accountId })
      .then((balance) => setBalance((balance / 10 ** 8).toFixed(2)))
      .catch(() => console.log)
      .then(() => window.contract.get_contract_owner())
      .then((owner) => setContractOwner(owner))
      .then(() => window.contract.get_lands())
      .then((landsFromContract) => {
        setLands(landsFromContract);
        const promises = Promise.all(
          landsFromContract.map((land_id) => {
            return window.contract.get_land_metadata({ land_id });
          })
        );
        return promises;
      })
      .then((landMetadata) => {
        setLandMetadata(landMetadata);
      });
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
