import { KameleoonClient } from "@kameleoon/javascript-sdk";
import { useCallback, useEffect, useState } from "react";
import { Ball } from "./Ball";
import { Props } from "@/pages";

const SITE_CODE = "0byr9yahtt";
const featureKey = "bb_demo";

export type State = {
  [key: string]: number | string;
  ball_size: number;
  ball_speed: number;
  balls_amount: number;
  ball_color: string;
};

const state: State = {
  ball_color: "random",
  ball_speed: 5,
  ball_size: 100,
  balls_amount: 1,
};

export function BallsDashboard({ ballsAmount }: Props) {
  state.balls_amount = ballsAmount;
  const [ballState, setBallState] = useState(state);

  const init = useCallback(async (): Promise<void> => {
    // -- Initialize Kameleoon client-side SDK
    const client = new KameleoonClient({ siteCode: SITE_CODE });

    // -- Initialize the SDK
    await client.initialize();

    // -- Get the visitor code
    const visitorCode = client.getVisitorCode();

    // -- Get the feature flag variation
    const variation = client.getVariation({
      visitorCode,
      featureKey,
      track: false,
    });

    // -- Get feature flag variables from the variation
    const variables = variation.variables;
    const updatedState = { ...state };

    // -- Update the state with the feature flag variables
    variables.forEach(({ key, value, type }) => {
      updatedState[key] = value as typeof type;
    });

    setBallState(updatedState);
  }, []);

  useEffect(() => {
    init();
  }, [init]);

  const ballArr = Array.from({ length: ballState.balls_amount }, (_, i) => i);

  return (
    <>
      {ballArr.map((i) => (
        <Ball
          key={i}
          color={ballState.ball_color}
          speed={ballState.ball_speed}
          size={ballState.ball_size}
        />
      ))}
    </>
  );
}
