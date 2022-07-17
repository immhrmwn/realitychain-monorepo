import * as buffer from "buffer";
import "regenerator-runtime/runtime";

import React from "react";
import { Container, Button } from "react-bootstrap";
import { ParcelListComponent } from "./ParcelList";
import { nftMint } from "@realitychain/sdk";

const Parcel = () => {
  window.Buffer = buffer.Buffer;

  const handleMintingAll = async () => {
    for (let i = 1; i <= 4; i++) {
      await nftMint(window.parcelsContract, {
        token_series_id: `${i}`,
        receiver_id: window.parcelsContract.account.accountId,
      });
    }
  };

  return (
    <div className={"root"} style={{ textAlign: "left" }}>
      <Container>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2 style={{ marginTop: 20 }}>Mint Parcels</h2>
          <Button
            variant="dark"
            disabled={!window.walletConnection.isSignedIn()}
            onClick={handleMintingAll}
          >
            Minting All
          </Button>
        </div>
        <ParcelListComponent />
      </Container>
    </div>
  );
};

export default Parcel;
