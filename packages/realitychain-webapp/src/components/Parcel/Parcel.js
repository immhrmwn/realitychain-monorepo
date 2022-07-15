import * as buffer from 'buffer';
import 'regenerator-runtime/runtime';

import React from "react";
import { Container, Card, Button, Accordion } from "react-bootstrap";
import MapImage from "../../assets/map.png";
import { nftMint } from "@realitychain/sdk";

const Parcel = () => {
  window.Buffer = buffer.Buffer;

  const handleMintingAll = async() => {
    for(let i = 1; i <= 4; i++) {
      await nftMint(window.parcelsContract, {
        token_series_id: `${i}`,
        receiver_id: window.parcelsContract.account.accountId
      });
    }
  };
  
  const handleMinting = async (data) => {
    await window.parcelsContract.nft_mint({
      args: {
        token_series_id: `${data}`,
        receiver_id: window.accountId
      },
      gas: 300000000000000,
      amount: '7090000000000000000000'
    });
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
        <section
          style={{
            display: "flex",
            gap: 16,
            flexWrap: "wrap",
            justifyContent: "flex-start",
            marginTop: 20,
          }}
        >
          {(() => {
            const cards = [];
            for (let i = 1; i <= 4; i++) {
              cards.push(
                <Card style={{ width: 310, wordBreak: "break-word" }}>
                  <Card.Body>
                    <Card.Img variant="top" src={MapImage} />
                    <Card.Text style={{ fontSize: "18px" }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          padding: "0px 10px",
                        }}
                      >
                        <span style={{ fontWeight: 600 }}>world_id:</span>
                        <span>jkt</span>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          padding: "0px 10px",
                        }}
                      >
                        <span style={{ fontWeight: 600 }}>land_id:</span>
                        <span>jkt1</span>
                      </div>
                      <Accordion>
                        <Accordion.Item eventKey="0">
                          <Accordion.Header>Stats</Accordion.Header>
                          <Accordion.Body>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                color: "gray",
                              }}
                            >
                              <span>Land X:</span>
                              <span>224 of 408</span>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                color: "gray",
                              }}
                            >
                              <span>Land Y:</span>
                              <span>390 of 408</span>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                color: "gray",
                              }}
                            >
                              <span>Land Size:</span>
                              <span>1000m²</span>
                            </div>
                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer style={{ textAlign: "center" }}>
                    <Button
                      variant="dark"
                      disabled={!window.walletConnection.isSignedIn()}
                      onClick={() => handleMinting(i)}
                    >
                      Minting
                    </Button>
                  </Card.Footer>
                </Card>
              );
            }
            return cards;
          })()}
        </section>
      </Container>
    </div>
  );
};

export default Parcel;
