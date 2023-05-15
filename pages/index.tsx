import { BallsDashboard } from "@/components/BallsDashboard";
import styles from "@/styles/Home.module.css";
import { KameleoonClient, KameleoonUtils } from "@kameleoon/nodejs-sdk";
import { NextPageContext } from "next";

const SITE_CODE = "0fpmcg34lg";
const DOMAIN =
  "https://app.netlify.com/sites/thunderous-speculoos-e7fe29/overview";

type Props = {
  ballsAmount: number;
};

export default function Home({ ballsAmount }: Props) {
  return (
    <>
      <main className={styles.main}>
        <p className={styles.title}>Amount of balls: {ballsAmount}</p>
        <BallsDashboard />
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

  client = new KameleoonClient({ siteCode: SITE_CODE });
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
  const visitorCode = KameleoonUtils.getVisitorCode({
    domain: DOMAIN,
    request: req,
    response: res,
  });

  // -- Trigger an experiment
  const experimentId = 197421;
  const variationId = client.triggerExperiment(visitorCode, experimentId);

  // -- Get the amount of balls depending on the variation
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

  return {
    props: { ballsAmount },
  };
}
