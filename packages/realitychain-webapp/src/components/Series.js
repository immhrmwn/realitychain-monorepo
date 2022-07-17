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
import { useNavigate } from "react-router-dom";
import { nftCreateParcelSeries, nftCreateVoucherSeries } from "@realitychain/sdk";

export const SeriesComponent = ({ balance }) => {
  const [value, setValue] = React.useState();
  const navigate = useNavigate();

  const voucherParams = {
    token_metadata: {
      title: 'Dark',
      media: 'bafybeifdbvb6yzajogbe4dbn3bgxoli3sp7ol7upfmu2givpvbwufydthu',
      reference: 'bafybeifvzitvju4ftwnkf7w7yakz7i5colcey223uk2ui4t5z3ss7l2od4',
      copies: 100,
      issued_at: '',
      description: null,
      media_hash: null,
      expires_at: null,
      starts_at: null,
      updated_at: null,
      extra: null,
      reference_hash: null,
    },
    price: null,
    royalty: {
      [window.accountId]: 1000,
    }
  };
  const parcelParams = {
    parcel_metadata: {
      world_id: 'world_id',
      land_id: 'land_id',
      land_size: 0,
      land_x: 0,
      land_y: 0,
    },
    ...voucherParams
  };

  const handleCreateSeries = async () => {
    await nftCreateParcelSeries(window.parcelsContract, parcelParams);
    await nftCreateVoucherSeries(window.vouchersContract, voucherParams);
    navigate("/staking");
  };

  const price = () => {
    return "0";
  };

  return (
    <div
      style={{
        height: "calc(100vh - 66px)",
        padding: 50,
      }}
    >
      <h1>CREATE SERIES</h1>
      <Container style={{ marginTop: 50 }}>
        <Row>
          <Col>
            <div className="col1">
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: 24,
                  }}
                >
                  <Button
                    variant={value !== price() ? "outline-dark" : "primary"}
                    style={{ width: "100%" }}
                    onClick={handleCreateSeries}
                  >
                    CREATE SERIES
                  </Button>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
