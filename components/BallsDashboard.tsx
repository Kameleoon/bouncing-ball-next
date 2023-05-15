import { KameleoonClient, KameleoonUtils } from "@kameleoon/javascript-sdk";
import { useCallback, useEffect, useState } from "react";
import { Ball } from "./Ball";

const SITE_CODE = "0fpmcg34lg";
const DOMAIN = "https://app.netlify.com/sites/thunderous-speculoos-e7fe29/overview";

export function BallsDashboard() {
  const [ballState, setBallState] = useState({
    color: "random",
    speed: 5,
    size: 100,
    amount: 1,
  });

  const init = useCallback(async (): Promise<void> => {
    // -- Initialize Kameleoon client-side SDK
    const client = new KameleoonClient(SITE_CODE);
    await client.initialize();

    // -- Get the visitor code from the Kameleoon cookie
    const visitorCode = KameleoonUtils.getVisitorCode(DOMAIN);

    // -- Trigger an experiment
    const experimentId = 197421;
    const variationId = client.triggerExperiment(visitorCode, experimentId);
    let ballsAmount = 0;

    switch (variationId) {
      case 0:
        ballsAmount = 5;
        break;
      case 848374:
        ballsAmount = 10;
        break;
      case 848375:
        ballsAmount = 20;
        break;
    }

    setBallState((prevState) => ({
      ...prevState,
      amount: ballsAmount,
    }));
  }, []);

  useEffect(() => {
    init();
  }, [init]);

  const ballArr = Array.from(Array(ballState.amount).keys());

  return (
    <>
      {ballArr.map((i) => (
        <Ball
          key={i}
          color={ballState.color}
          speed={ballState.speed}
          size={ballState.size}
        />
      ))}
    </>
  );
}
