import React from "react";
import {
  Button,
  ButtonGroup,
  Navbar,
  Nav,
  Container,
  OverlayTrigger,
  Popover,
} from "react-bootstrap";
import Logo from "../assets/realitychain.webp";

import { useNavigate } from "react-router-dom";

export const Header = ({ onConnect, onLogout, balance }) => {
  const navigate = useNavigate();
  const handleConnectWallet = () => {
    onConnect();
  };

  const handleLogout = () => {
    onLogout();
  };

  const account = () => {
    return (
      <ButtonGroup>
        <Button variant="outline-dark" disabled>
          {balance} REAL
        </Button>
        <OverlayTrigger
          trigger="click"
          placement={"bottom"}
          overlay={
            <Popover id={`popover-positioned-bottom`}>
              <Popover.Body>
                <Button variant="light" onClick={handleLogout} size="sm">
                  Logout
                </Button>
              </Popover.Body>
            </Popover>
          }
        >
          <Button variant="outline-dark">{window.accountId}</Button>
        </OverlayTrigger>
      </ButtonGroup>
    );
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand>
          <a
            href="https://www.realitychain.io/"
            target={"_blank"}
            rel="noreferrer"
          >
            <img style={{ height: 40 }} src={Logo} alt={"reality-chain"} />
          </a>
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link onClick={() => navigate("/")}>Home</Nav.Link>
          <Nav.Link onClick={() => navigate("/series")}>Series</Nav.Link>
          <Nav.Link onClick={() => navigate("/staking")}>Staking</Nav.Link>
          <Nav.Link onClick={() => navigate("/minting")}>
            Parcel Minting
          </Nav.Link>
        </Nav>
        {window.walletConnection.isSignedIn() ? (
          account()
        ) : (
          <Button variant="outline-dark" onClick={handleConnectWallet}>
            Connect Wallets
          </Button>
        )}
      </Container>
    </Navbar>
  );
};
