import { buffer } from "micro";
import Stripe from "stripe";
// import { prisma } from "@/prisma"; // Adjust path based on your project structure
// by aniket
import {prisma} from '@prisma/client'
// by aniket end

export const config = {
  api: {
    bodyParser: false, // Disable body parsing for raw Stripe payload
  },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-08-16",
});

export default async function webhookHandler(req, res) {
  if (req.method === "POST") {
    const buf = await buffer(req);
    const sig = req.headers["stripe-signature"];

    let event;
    try {
      event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
      console.error("Webhook signature verification failed:", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Process the event
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        const { client_reference_id: teamId, subscription } = session;

        if (teamId && subscription) {
          try {
            const updatedTeam = await prisma.team.update({
              where: { id: teamId },
              data: {
                subscriptionId: typeof subscription === "string" ? subscription : subscription.id,
                plan: getPlanFromAmount(session.amount_total ?? 0, session.currency ?? ""),
              },
            });

            console.log("Team subscription updated successfully:", updatedTeam);
          } catch (error) {
            console.error("Database update error:", error);
          }
        }
        break;
      }

      case "checkout.session.expired": {
        console.log("Checkout session expired:", event.data.object.id);
        break;
      }

      default: {
        console.log(`Unhandled event type: ${event.type}`);
      }
    }

    // Acknowledge receipt of the event
    res.status(200).send("Webhook received");
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
