import { BallsDashboard } from "@/components/BallsDashboard";
import styles from "@/styles/Home.module.css";
import { KameleoonClient } from "@kameleoon/nodejs-sdk";
import { NextPageContext } from "next";
import { KameleoonEventSource } from "@kameleoon/nodejs-event-source";
import { KameleoonRequester } from "@kameleoon/nodejs-requester";
import { NextVisitorCodeManager } from "@/components/visitorCodeManager";

const SITE_CODE = "0byr9yahtt";
const featureKey = "bb_demo";

export type Props = {
  ballsAmount: number;
};

export default function Home({ ballsAmount }: Props) {
  return (
    <>
      <main className={styles.main}>
        <p className={styles.title}>Amount of balls: {ballsAmount}</p>
        <BallsDashboard ballsAmount={ballsAmount} />
      </main>
    </>
  );
}

let client: KameleoonClient | null = null;

// -- Create persisted instance of Kameleoon server-side SDK
async function initClient(): Promise<KameleoonClient> {
  if (client) {
    return client;
  }

  client = new KameleoonClient({
    siteCode: SITE_CODE,
    credentials: {
      clientId: "client_id",
      clientSecret: "client_secret",
    },
    externals: {
      visitorCodeManager: new NextVisitorCodeManager(),
      eventSource: new KameleoonEventSource(),
      requester: new KameleoonRequester(),
    },
  });

  await client.initialize();

  return client;
}

// -- Server-side logic
export async function getServerSideProps(context: NextPageContext) {
  const { res, req } = context;

  if (!res || !req) {
    throw new Error("Invalid context");
  }

  // -- Wait for the SDK to be initialized
  const client = await initClient();

  // -- Get the visitor code from the Kameleoon cookie
  const visitorCode = client.getVisitorCode({
    request: req,
    response: res,
  });

  // -- Get the feature flag variation
  const variation = client.getVariation({
    visitorCode,
    featureKey,
    track: false,
  });

  // -- Get feature flag variables from the variation
  const variables = variation.variables;
  const variable = variables.get("balls_amount");

  let ballsAmount = 0;
  if (variable) {
    ballsAmount = variable.value as number;
  }

  return {
    props: { ballsAmount },
  };
}
