import React from "react";
import {
  Button,
  ButtonGroup,
  Navbar,
  Container,
  OverlayTrigger,
  Popover,
} from "react-bootstrap";
import Logo from "../assets/realitychain.webp";

export const Header = ({ onConnect, onLogout, balance }) => {
  const handleConnectWallet = () => {
    onConnect();
  };

  const handleLogout = () => {
    onLogout();
  };

  const account = () => {
    return (
      // <OverlayTrigger
      //   trigger="click"
      //   placement={"bottom"}
      //   overlay={
      //     <Popover id={`popover-positioned-bottom`}>
      //       <Popover.Header
      //         as="h3"
      //         style={{ background: "black", color: "#FFF" }}
      //       >
      //         Account
      //       </Popover.Header>
      //       <Popover.Body>
      //         <h5>$REAL: {balance}</h5>
      //         <Button variant="dark" onClick={handleLogout} size="sm">
      //           logout
      //         </Button>
      //       </Popover.Body>
      //     </Popover>
      //   }
      // >
      //   <Button variant="outline-dark">{window.accountId}</Button>
      // </OverlayTrigger>
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
          <a href="https://www.realitychain.io/">
            <img style={{ height: 40 }} src={Logo} alt={"reality-chain"} />
          </a>
        </Navbar.Brand>
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
