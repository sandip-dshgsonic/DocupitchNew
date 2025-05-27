// import { NextApiRequest, NextApiResponse } from "next";

// import { getServerSession } from "next-auth/next";

// import { identifyUser, trackAnalytics } from "@/lib/analytics";
// import prisma from "@/lib/prisma";
// import { stripe } from "@/lib/stripe";
// import { CustomUser } from "@/lib/types";

// import { authOptions } from "../../../auth/[...nextauth]";






// export default async function handle(
//   req: NextApiRequest,
//   res: NextApiResponse,
// ) {
//   console.log("pricing upgrade ----16")
//   if (req.method === "POST") {
//     // POST /api/teams/:teamId/billing/upgrade
//     console.log("pricing upgrade ----19")
//     const session = await getServerSession(req, res, authOptions);
//     if (!session) {
//       res.status(401).end("Unauthorized");
//       return;
//     }

//     const { teamId, priceId } = req.query as {
//       teamId: string;
//       priceId: string;
//     };

//     const { id: userId, email: userEmail } = session.user as CustomUser;
//     console.log("pricing upgrade ----32")
//     const team = await prisma.team.findUnique({
//       where: {
//         id: teamId,
//         users: {
//           some: {
//             userId,
//           },
//         },
//       },
//       select: { stripeId: true },
//     });

//     if (!team) {
//       res.status(404).end("Unauthorized");
//       return;
//     }

//     let stripeSession;
//     console.log("pricing upgrade ----51")
//     if (team.stripeId) {
//       console.log("pricing upgrade ----53")
//       // if the team already has a stripeId (i.e. is a customer) let's use as a customer
//       stripeSession = await stripe.checkout.sessions.create({
//         customer: team.stripeId,
//         customer_update: { name: "auto" },
//         billing_address_collection: "required",
//         success_url: `${process.env.NEXTAUTH_URL}/settings/billing?success=true`,
//         cancel_url: `${process.env.NEXTAUTH_URL}/settings/billing?cancel=true`,
//         line_items: [{ price: priceId, quantity: 1 }],
//         automatic_tax: {
//           enabled: true,
//         },
//         tax_id_collection: {
//           enabled: true,
//         },
//         mode: "subscription",
//         allow_promotion_codes: true,
//         client_reference_id: teamId,
//       });
//     } else {
//       console.log("pricing upgrade ----73",priceId)
//       // else initialize a new customer
//       stripeSession = await stripe.checkout.sessions.create({
//         customer_email: userEmail ?? undefined,
//         billing_address_collection: "required",
//         success_url: `${process.env.NEXTAUTH_URL}/settings/billing?success=true`,
//         cancel_url: `${process.env.NEXTAUTH_URL}/settings/billing?cancel=true`,
//         line_items: [{ price: priceId, quantity: 1 }],
//         automatic_tax: {
//           enabled: true,
//         },
//         tax_id_collection: {
//           enabled: true,
//         },
//         mode: "subscription",
//         allow_promotion_codes: true,
//         client_reference_id: teamId,
//       });
//     }
//     console.log("pricing upgrade ----92")
//     await identifyUser(userEmail ?? userId);
//     await trackAnalytics({
//       event: "Stripe Checkout Clicked",
//       teamId,
//       priceId: priceId,
//       referral: req.body.referral ? true : undefined,
//     });

//     return res.status(200).json(stripeSession);
//   } else {
//     console.log("pricing upgrade ----103")
//     // We only allow POST requests
//     res.setHeader("Allow", ["POST"]);
//     return res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }



// import { NextApiRequest, NextApiResponse } from "next";
// import { getServerSession } from "next-auth/next";
// import { identifyUser, trackAnalytics } from "@/lib/analytics";
// import prisma from "@/lib/prisma";
// import { stripe } from "@/lib/stripe"; // Ensure this is correctly set up
// import { CustomUser } from "@/lib/types";
// import { authOptions } from "../../../auth/[...nextauth]";
// import Stripe from "stripe";  // Import Stripe here

// export default async function handle(req: NextApiRequest, res: NextApiResponse) {
//   console.log("pricing upgrade ----16");
  
//   if (req.method === "POST") {
//     console.log("pricing upgrade ----19");
    
//     const session = await getServerSession(req, res, authOptions);
//     if (!session) {
//       res.status(401).end("Unauthorized");
//       return;
//     }

//     const { teamId, priceId } = req.query as {
//       teamId: string;
//       priceId: string;
//     };

//     const { id: userId, email: userEmail } = session.user as CustomUser;
//     console.log("pricing upgrade ----32");

//     // Fetch the team to ensure the user is a member
//     const team = await prisma.team.findUnique({
//       where: {
//         id: teamId,
//         users: {
//           some: {
//             userId,
//           },
//         },
//       },
//       select: { stripeId: true },
//     });

//     if (!team) {
//       res.status(404).end("Unauthorized");
//       return;
//     }

//     let stripeSession;
//     console.log("pricing upgrade ----51");

//     // Create a Stripe checkout session
//     try {
//       if (team.stripeId) {
//         console.log("pricing upgrade ----53");
//         // Team is a customer, use existing customer ID
//         stripeSession = await stripe.checkout.sessions.create({
//           customer: team.stripeId,
//           customer_update: { name: "auto" },
//           billing_address_collection: "required",
//           success_url: `${process.env.NEXTAUTH_URL}/settings/billing?success=true`,
//           cancel_url: `${process.env.NEXTAUTH_URL}/settings/billing?cancel=true`,
//           line_items: [{ price: priceId, quantity: 1 }],
//           automatic_tax: { enabled: true },
//           tax_id_collection: { enabled: true },
//           mode: "subscription",
//           allow_promotion_codes: true,
//           client_reference_id: teamId,
//         });
//       } else {
//         console.log("pricing upgrade ----73", priceId);
//         // New customer, create a new Stripe customer
        
//         stripeSession = await stripe.checkout.sessions.create({
//           customer_email: userEmail ?? undefined,
//           billing_address_collection: "required",
//           success_url: `${process.env.NEXTAUTH_URL}/settings/billing?success=true`,
//           cancel_url: `${process.env.NEXTAUTH_URL}/settings/billing?cancel=true`,
//           line_items: [{ price: priceId, quantity: 1 }],
//           // automatic_tax: { enabled: true },
//           // tax_id_collection: { enabled: true },
//           mode: "subscription",
//           allow_promotion_codes: true,
//           client_reference_id: teamId,
//         });
//       }
      
//       console.log("pricing upgrade ----202");
//       await identifyUser(userEmail ?? userId);
//       console.log("pricing upgrade ----204");

//       await trackAnalytics({
//         event: "Stripe Checkout Clicked",
//         teamId,
//         priceId,
//         referral: req.body.referral ? true : undefined,
//       });
//       console.log("pricing upgrade ----212");

//       return res.status(200).json(stripeSession);
//     } catch (error: any) {  // Change unknown to any
//       console.error("Stripe error:", error);
      
//       // Check for specific Stripe error properties
//       if (error?.type === 'StripeInvalidRequestError') {
//         // Handle specific Stripe error
//         return res.status(400).json({ error: error.message });
//       } else {
//         // Handle general errors
//         return res.status(500).json({ error: "Internal Server Error" });
//       }
//     }
//   } else {
//     console.log("pricing upgrade ----103");
//     // We only allow POST requests
//     res.setHeader("Allow", ["POST"]);
//     return res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }





import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { identifyUser, trackAnalytics } from "@/lib/analytics";
import prisma from "@/lib/prisma";
import { stripe } from "@/lib/stripe"; // Ensure this is correctly set up
import { CustomUser } from "@/lib/types";
import { authOptions } from "../../../auth/[...nextauth]";
import Stripe from "stripe";  // Import Stripe here


type Plan = {
  name: string;
  price: number;
  currency: string;
};

const getPlanFromAmount = (amountTotal: number, currency: string): string => {
  // Define the list of plans
  const plans: Plan[] = [
    { name: "Datarooms", price: 118800, currency: "usd" }, // $1,188.00 USD
    { name: "Datarooms", price: 19900, currency: "usd" }, // ₹199.00 INR
    { name: "Business", price: 54000, currency: "usd" },   // $540.00 USD
    { name: "Business", price: 7900, currency: "usd" },   // $79.00 USD
    { name: "Pro", price: 3900, currency: "usd" },        // $39.00 USD
    { name: "Pro", price: 30000, currency: "usd" },        // $300.00 USD
  ];

  // Find the plan that matches the amount and currency
  const matchingPlan = plans.find(
    (plan) => plan.price === amountTotal && plan.currency.toLowerCase() === currency.toLowerCase()
  );

  // Return the plan name or a default message
  return matchingPlan ? matchingPlan.name : "No matching plan found.";
};


export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  console.log("pricing upgrade ----16");
  
  if (req.method === "POST") {
    console.log("pricing upgrade ----19");
    
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      res.status(401).end("Unauthorized");
      return;
    }

    const { teamId, priceId } = req.query as {
      teamId: string;
      priceId: string;
    };
    
    const { id: userId, email: userEmail } = session.user as CustomUser;
    console.log("pricing upgrade ----32", );
    console.log("pricing upgrade ----32 teamid ",teamId );
    console.log("pricing upgrade ----32 priceId ",priceId );
    console.log("pricing upgrade ----32", );
    console.log("pricing upgrade ----32", );

    // Fetch the team to ensure the user is a member
    const team = await prisma.team.findUnique({
      where: {
        id: teamId,
        users: {
          some: {
            userId,
          },
        },
      },
      select: { stripeId: true, subscriptionId: true },  // Include subscriptionId
    });

    if (!team) {
      res.status(404).end("Unauthorized");
      return;
    }

    let stripeSession;
    console.log("pricing upgrade ----51");

    try {
      if (team.stripeId) {
        console.log("pricing upgrade ----53");
        // Team is a customer, use existing customer ID
        stripeSession = await stripe.checkout.sessions.create({
          customer: team.stripeId,
          customer_update: { name: "auto" },
          billing_address_collection: "required",
          success_url: `${process.env.NEXTAUTH_URL}/settings/billing?success=true`,
          cancel_url: `${process.env.NEXTAUTH_URL}/settings/billing?cancel=true`,
          line_items: [{ price: priceId, quantity: 1 }],
          automatic_tax: { enabled: true },
          tax_id_collection: { enabled: true },
          mode: "subscription",
          allow_promotion_codes: true,
          client_reference_id: teamId,
        });
      } else {
        console.log("pricing upgrade ----73", priceId);
        // New customer, create a new Stripe customer
        
        stripeSession = await stripe.checkout.sessions.create({
          customer_email: userEmail ?? undefined,
          billing_address_collection: "required",
          success_url: `${process.env.NEXTAUTH_URL}/settings/billing?success=true`,
          cancel_url: `${process.env.NEXTAUTH_URL}/settings/billing?cancel=true`,
          line_items: [{ price: priceId, quantity: 1 }],
          mode: "subscription",
          allow_promotion_codes: true,
          client_reference_id: teamId,
        });

        console.log('-----upgrade 354 44 ',stripeSession)
      }

      console.log("pricing upgrade ----355",teamId,stripeSession);

      console.log("pricing upgrade ----357",stripeSession.subscription);

      // Update the team's current plan in your database

      // if(stripeSession.subscription){
        try {
          const d = await prisma.team.update({
            where: { id: teamId },
            data: {
              subscriptionId: stripeSession.id ,
                plan: getPlanFromAmount(stripeSession.amount_total ?? 0, stripeSession.currency ?? ""),
            },
            //////////// they did not edit plan, EDIT IT ANIKET ***************************-----------------++++++++++++++
          });
      
          console.log('---------340----upgrade billing , ',d)
          console.log("---team ",teamId)
          console.log("===session ",stripeSession)
        } catch (error) {
          console.log('--------- pricng upgrade 329 error ',error)
        }
      // }
      
      
      await identifyUser(userEmail ?? userId);
      console.log("pricing upgrade ----204");

      await trackAnalytics({
        event: "Stripe Checkout Clicked",
        teamId,
        priceId,
        referral: req.body.referral ? true : undefined,
      });
      console.log("pricing upgrade ----212");

      return res.status(200).json(stripeSession);
    } catch (error: any) {
      console.error("Stripe error:", error);
      
      // Check for specific Stripe error properties
      if (error?.type === 'StripeInvalidRequestError') {
        return res.status(400).json({ error: error.message });
      } else {
        return res.status(500).json({ error: "Internal Server Error" });
      }
    }
  } else {
    console.log("pricing upgrade ----103");
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

