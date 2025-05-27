// import prisma from "@/lib/prisma"; // Adjust import based on your project structure  // by aniket
// // import { prisma } from "@/lib/prisma"; // Adjust import based on your project structure
// // import { stripe } from "@/lib/stripe";
// import { stripe } from "@/lib/stripe";
// import Stripe from "stripe"; // ✅ Import Stripe types
// import type { NextApiRequest, NextApiResponse } from "next";

// export async function customerSubscriptionDeleted(
//   event: Stripe.Event,
//   res: NextApiResponse
// ) {
//   const subscription = event.data.object as Stripe.Subscription;

//   console.log("Subscription canceled:", subscription);

//   // Update the database to mark the subscription as canceled
//   await prisma.team.update({
//     where: { subscriptionId: subscription.id },
//     data: {
//       status: "canceled", // Example: Add a 'canceled' status in your schema
//     },
//   });

//   res.status(200).end();
// }


// by aniket 
import prisma from "@/lib/prisma"; // Adjust import based on your project structure  // by aniket
// import { prisma } from "@/lib/prisma"; // Adjust import based on your project structure
// import { stripe } from "@/lib/stripe";
import { stripe } from "@/lib/stripe";
import Stripe from "stripe"; // ✅ Import Stripe types
import type { NextApiRequest, NextApiResponse } from "next";

export async function customerSubscriptionDeleted(
  event: Stripe.Event,
  res: NextApiResponse
) {
  const subscription = event.data.object as Stripe.Subscription;

  console.log("Subscription canceled:", subscription);

  // Update the database to mark the subscription as canceled
  await prisma.team.update({
    where: { subscriptionId: subscription.id },
    data: {
      // status: "canceled", // Example: Add a 'canceled' status in your schema // by aniket
    },
  });

  res.status(200).end();
}
