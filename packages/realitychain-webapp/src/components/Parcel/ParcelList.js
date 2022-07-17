import React from "react";
import { nftGetSeries } from "@realitychain/sdk";
import MapImage from "../../assets/map.png";
import { Card, Button, Accordion } from "react-bootstrap";
import { nftMint } from "@realitychain/sdk";

export const ParcelListComponent = () => {
  const handleMinting = async (data) => {
    await nftMint(window.parcelsContract, {
      token_series_id: `${data}`,
      receiver_id: window.accountId,
    });
  };

  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    getParcelSeries();
  }, []);

  const getParcelSeries = async () => {
    try {
      const response = await nftGetSeries(window.parcelsContract);
      console.log(response);

      setData(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section
      style={{
        display: "flex",
        gap: 16,
        flexWrap: "wrap",
        justifyContent: "flex-start",
        marginTop: 20,
      }}
    >
      {!!data.length &&
        data.map((nft, i) => (
          <>
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
                    <span>{nft.parcel_metadata.world_id}</span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "0px 10px",
                    }}
                  >
                    <span style={{ fontWeight: 600 }}>land_id:</span>
                    <span>{nft.parcel_metadata.land_id}</span>
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
                          <span>{nft.parcel_metadata.land_x}</span>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            color: "gray",
                          }}
                        >
                          <span>Land Y:</span>
                          <span>{nft.parcel_metadata.land_y}</span>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            color: "gray",
                          }}
                        >
                          <span>Land Size:</span>
                          <span>{nft.parcel_metadata.land_size}</span>
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
          </>
        ))}
      {!data.length && <div>Empty Component</div>}
    </section>
  );
};
