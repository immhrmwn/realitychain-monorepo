import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        height: "calc(100vh - 66px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h1>Reality Chain</h1>
      <h3>MULTICHAIN, INTEROPERABLE METAVERSE-AS-A-SERVICE</h3>
      <h4>
        Create your own 2d or 3d metaverse, link it to the ecosystem, watch it
        thrive!
      </h4>
      <h3>Making The #Metaverse $REAL.</h3>
      {window.walletConnection.isSignedIn() && (
        <Button
          variant="outline-primary"
          size="lg"
          style={{ marginTop: 16 }}
          onClick={() => navigate("/staking")}
        >
          STAKING
        </Button>
      )}
    </div>
  );
};
