import React from "react";
import { Modal, Button } from "react-bootstrap";

import { ReactComponent as NearIcon } from "../assets/wallets/near24.svg";
import { ReactComponent as MetamaskIcon } from "../assets/wallets/metamask.svg";

export const ConnectWallet = (props) => {
  const { open, onHide, onLogin } = props;

  return (
    <Modal show={open} onHide={onHide} backdrop centered>
      <Modal.Header closeButton={true}>
        <Modal.Title>Connect Wallet</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ height: "200px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <Button
            variant="outline-dark"
            style={{ width: "100%" }}
            onClick={onLogin}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span>NEAR Wallet</span>
              <svg width={24} height={24} viewBox="0 0 24 24">
                <NearIcon />
              </svg>
            </div>
          </Button>
          <Button variant="outline-dark" style={{ width: "100%" }} disabled>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span>Metamask</span>
              <svg width={24} height={24} viewBox="0 0 32 32">
                <MetamaskIcon />
              </svg>
            </div>
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};
