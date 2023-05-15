# Kameleoon SDK Next JS Integration

Simple demo that can be used as a template for integrating your NextJS app with Kameleoon SDKs. This demo uses a single experiment that has some actions defined both on the server-side and on the client-side. Basically, depending on the variation obtained for a given user, there is either 5, 10 or 20 balls. The title of the page is generated on server and contains the number of balls; the animation itself is done on the client and also reflects the number of balls.

## Info

- Server-side Kameleoon SDK example can be found in [`pages/index.tsx`](https://github.com/Slava-Inyu/bouncing-ball-next/blob/master/pages/index.tsx). Server-side SDK is [`NodeJS SDK`](https://developers.kameleoon.com/feature-management-and-experimentation/web-sdks/nodejs-sdk).
- Client-side Kameleoon SDK example can be found in [`components/BallsDashboard.tsx`](https://github.com/Slava-Inyu/bouncing-ball-next/blob/master/components/BallsDashboard.tsx). Client-side SDK is [`JavaScript SDK`](https://developers.kameleoon.com/feature-management-and-experimentation/web-sdks/js-sdk).

## Contents

- Code examples use [`@kameleoon/nodejs-sdk`](https://developers.kameleoon.com/feature-management-and-experimentation/web-sdks/nodejs-sdk) (server) and [`@kameleoon/javascript-sdk`](https://developers.kameleoon.com/feature-management-and-experimentation/web-sdks/js-sdk) (client) methods to initialize SDKs with the Kameleoon configuration retrieved from our servers.
- After that an **experiment** is triggered and visitor is bucketed into one of the **variations**. Kameleoon automatically handles consistency between server and client sides; i.e., the same variation will automatically be assigned on both sides. The number of balls will thus always match.

For more information on Feature Management and Experimentation follow the [`link`](https://developers.kameleoon.com/feature-management-and-experimentation/overview)

## Demo
- [Website Link](https://master--thunderous-speculoos-e7fe29.netlify.app/)
