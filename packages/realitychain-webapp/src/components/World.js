import React from "react";
import {
  Button,
  Row,
  Col,
  Container,
  Badge,
  InputGroup,
  Form,
} from "react-bootstrap";
import "./World.css";
import { ReactComponent as NearIcon } from "../assets/wallets/near.svg";
import { ReactComponent as EthereumIcon } from "../assets/wallets/ethereum.svg";
import { ReactComponent as PolygonIcon } from "../assets/wallets/polygon.svg";
import { useNavigate } from "react-router-dom";
import { ftTransferCall } from "@realitychain/sdk";

export const WorldComponent = ({ balance }) => {
  const [blockchain, setBlockchain] = React.useState(null);
  const [world, setWorld] = React.useState(null);
  const [size, setSize] = React.useState(null);
  const [value, setValue] = React.useState();
  const navigate = useNavigate();

  const selectBlockchain = (_blockchain) => {
    setBlockchain(_blockchain);
  };

  const selectWorld = (_world) => {
    setWorld(_world);
  };

  const selectSize = (_size) => {
    setSize(_size);
  };

  // TODO: get data parcel price
  const price = () => {
    switch (size) {
      case "small":
        return `${1 * 10 ** 13}`;
      case "medium":
        return `${3 * 10 ** 13}`;
      case "large":
        return `${5 * 10 ** 13}`;
      default:
        return "0";
    }
  };

  const formatBlockchain = () => {
    switch (blockchain) {
      case "near":
        return "NEAR";
      case "ethereum":
        return "Ethereum";
      case "polygon":
        return "Polygon";
      default:
        return "-";
    }
  };

  const handleStake = async () => {
    // TODO: make sure the data payload is required
    const payload = {
      blockchain,
      world,
      size,
      value,
      id: window.accountId,
    };
    if (balance >= value) {
      await ftTransferCall(window.ftContract, {
        receiver_id: "rc-vouchers.testnet",
        amount: "10000000000000",
        msg: '{ "token_series_id": "1" }',
      });
      navigate("/minting");
    } else {
      // TODO: Error handling
      console.log("your balance is not sufficient");
    }
  };

  return (
    <div
      style={{
        height: "calc(100vh - 66px)",
        padding: 50,
      }}
    >
      {!blockchain && <h1>SELECT BLOCKCHAIN FOR METAVERSE</h1>}
      {blockchain && !(world && size) && (
        <h1>SELECT {!world ? "WORLD" : "SIZE"}</h1>
      )}
      {world && size && <h1>LETS STAKE</h1>}
      <div style={{ display: "flex", justifyContent: "center", gap: 8 }}>
        {blockchain && <Badge bg="dark">{formatBlockchain()}</Badge>}
        {world && <Badge bg="dark">{world}</Badge>}
        {size && <Badge bg="dark">{size}</Badge>}
      </div>

      <Container style={{ marginTop: 50 }}>
        <Row xs={1} md={2} lg={2}>
          <Col>
            <div className="col1">
              <div style={{ marginBottom: 16 }}>
                <h6>Select blockchain for metaverse</h6>
                <Row xs={2} md={3} lg={3}>
                  <Col>
                    <div
                      className={`card1 ${blockchain === "near" && "selected"}`}
                      onClick={() => selectBlockchain("near")}
                    >
                      <NearIcon />
                      <span style={{ marginTop: 8 }}>NEAR</span>
                    </div>
                  </Col>
                  <Col>
                    <div
                      className={`card1 ${
                        blockchain === "ethereum" && "selected"
                      }`}
                      onClick={() => selectBlockchain("ethereum")}
                    >
                      <EthereumIcon />
                      <span style={{ marginTop: 8 }}>Ethereum</span>
                    </div>
                  </Col>
                  <Col>
                    <div
                      className={`card1 ${
                        blockchain === "polygon" && "selected"
                      }`}
                      onClick={() => selectBlockchain("polygon")}
                    >
                      <PolygonIcon />
                      <span style={{ marginTop: 8 }}>Polygon</span>
                    </div>
                  </Col>
                </Row>
              </div>
              <div style={{ marginBottom: 16 }}>
                <h6>Select metaverse type</h6>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: 24,
                  }}
                >
                  <Button
                    variant={world === "2D" ? "warning" : "outline-dark"}
                    style={{ width: 100 }}
                    onClick={() => selectWorld("2D")}
                    className={`${world === "2D" && "selected"}`}
                  >
                    2D
                  </Button>
                  <Button
                    variant={world === "3D" ? "warning" : "outline-dark"}
                    style={{ width: 100 }}
                    onClick={() => selectWorld("3D")}
                  >
                    3D
                  </Button>
                </div>
              </div>
              <div>
                <h6>Select metaverse size</h6>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: 24,
                  }}
                >
                  <Button
                    variant={size === "small" ? "warning" : "outline-dark"}
                    onClick={() => selectSize("small")}
                  >
                    SMALL
                  </Button>
                  <Button
                    variant={size === "medium" ? "warning" : "outline-dark"}
                    onClick={() => selectSize("medium")}
                  >
                    MEDIUM
                  </Button>
                  <Button
                    variant={size === "large" ? "warning" : "outline-dark"}
                    onClick={() => selectSize("large")}
                  >
                    LARGE
                  </Button>
                </div>
              </div>
            </div>
          </Col>
          <Col>
            <div className="col2">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Blockchain:</span>
                <span>{formatBlockchain()}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Type:</span>
                <span>{world || "-"}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Size:</span>
                <span>{size || "-"}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Balance Required:</span>
                <span>$REAL {price()}</span>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                }}
              >
                <InputGroup>
                  <InputGroup.Text>$REAL</InputGroup.Text>
                  <Form.Control
                    type="number"
                    placeholder={price()}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                  />
                </InputGroup>
                <span style={{ fontSize: 12, color: "grey" }}>
                  Balance: {balance}
                </span>
              </div>
              <div style={{ marginBottom: 32 }} />
              <Button
                variant={value !== price() ? "outline-dark" : "primary"}
                style={{ width: "100%" }}
                onClick={handleStake}
                disabled={
                  value !== price() || !window.walletConnection.isSignedIn()
                }
              >
                STAKE
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
