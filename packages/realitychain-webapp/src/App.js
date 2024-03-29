import "regenerator-runtime/runtime";

import React from "react";

import {ThemeProvider} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import { Header } from "./components/Header";
// import { ConnectWallet } from "./components/ConnectWallet";
import { HomePage } from "./components/HomePage";
import { SeriesComponent } from "./components/Series";
import { WorldComponent } from "./components/World";
import ParcelComponent from "./components/Parcel/Parcel";
import { Navbar } from './components/Navbar/Navbar'
import { CreateComponent } from "./components/Create/Create";
import { CreateNFTComponent } from "./components/CreateNFT/CreateNFT";
import { DiscoverComponent } from "./components/Discover/Discover";
import { ProfileComponent } from "./components/Profile/Profile";
import { ProjectComponent } from "./components/Project/Project";
import { ProjectDetail} from "./components/ProjectDetail/ProjectDetail"
import { NFTDetail } from "./components/NFTDetail/NftDetail";

import { login, logout } from "./utils";
import theme from './themes/dark-theme';
import { ModalConnect } from "./components/ModalConnect";

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
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        {/* <Header onConnect={handleOpenModal} onLogout={logout} balance={balance} /> */}
        {/* <ConnectWallet open={open} onHide={handleCloseModal} onLogin={onLogin} /> */}
        <Navbar onConnect={handleOpenModal} balance={balance} />
        <ModalConnect open={open} onHide={handleCloseModal} onLogin={onLogin} />
        <Routes>
          <Route path="/minting" element={<ParcelComponent />} />
          <Route path="/series" element={<SeriesComponent balance={balance} />} />
          <Route path="/staking" element={<WorldComponent balance={balance} />} />
          <Route path="/discover" element={<DiscoverComponent />} />
          <Route path="/profile" element={<ProfileComponent />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
          <Route path="/project" element={<ProjectComponent />} />
          <Route path="/create-metaverse" element={<CreateComponent />} />
          <Route path="/nft-utility/create" element={<CreateNFTComponent />} />
          <Route path="/nft-utility/:id" element={<NFTDetail />} />
          <Route path="/" element={<HomePage onConnect={handleOpenModal} />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
