import React from "react";
import { Container, Card, Button, Accordion } from "react-bootstrap";
import MapImage from "../../assets/map.png";

const Parcel = () => {
  // TODO: GET DATA MINTING PARCEL

  const handleMintingAll = () => {
    // TODO: handle minting all
  };

  const handleMinting = (data) => {
    // TODO: handle minting
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
          {/* TODO: MAPING DATA MINTING PARCEL */}
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
                onClick={handleMinting}
              >
                Minting
              </Button>
            </Card.Footer>
          </Card>

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
                  <span>-</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "0px 10px",
                  }}
                >
                  <span style={{ fontWeight: 600 }}>land_id:</span>
                  <span>-</span>
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
                        <span>0m²</span>
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
              >
                Minting
              </Button>
            </Card.Footer>
          </Card>
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
                  <span>-</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "0px 10px",
                  }}
                >
                  <span style={{ fontWeight: 600 }}>land_id:</span>
                  <span>-</span>
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
                        <span>0m²</span>
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
              >
                Minting
              </Button>
            </Card.Footer>
          </Card>
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
                  <span>-</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "0px 10px",
                  }}
                >
                  <span style={{ fontWeight: 600 }}>land_id:</span>
                  <span>-</span>
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
                        <span>0m²</span>
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
              >
                Minting
              </Button>
            </Card.Footer>
          </Card>
        </section>
      </Container>
    </div>
  );
};

export default Parcel;
