import { useRouter } from "next/router";

import { useEffect, useMemo, useState } from "react";
import React from "react";

import { useTeam } from "@/context/team-context";
import { motion } from "framer-motion";
import { CheckIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useAnalytics } from "@/lib/analytics";
import { STAGGER_CHILD_VARIANTS } from "@/lib/constants";
import { getStripe } from "@/lib/stripe/client";
import { PLANS } from "@/lib/stripe/utils";
import { usePlan } from "@/lib/swr/use-billing";
import { capitalize } from "@/lib/utils";

import { DataroomTrialModal } from "../datarooms/dataroom-trial-modal";
import { Badge } from "../ui/badge";

export function UpgradePlanModal({
  clickedPlan,
  trigger,
  open,
  setOpen,
  children,
}: {
  clickedPlan: "Data Rooms" | "Business" | "Pro";
  trigger?: string;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  children?: React.ReactNode;
}) {
  const router = useRouter();
  const [plan, setPlan] = useState<"Pro" | "Business" | "Data Rooms">(
    clickedPlan,
  );
  const [period, setPeriod] = useState<"yearly" | "monthly">("yearly");
  const [clicked, setClicked] = useState<boolean>(false);
  const teamInfo = useTeam();
  const { plan: teamPlan, trial } = usePlan();
  const analytics = useAnalytics();

  const isTrial = !!trial;

  console.log("49-------upgrade plan modals")

  const features = useMemo(() => {
    console.log("52-------upgrade plan modals",plan)

    if (plan === "Pro") {
      return [
        "2 users included",
        "Custom branding",
        "Folder organization",
        "Require email verification",
        "DocuPitch branding removed",
        "1-year analytics retention",
      ];
    }

    if (plan === "Business") {
      return [
        "3 users included",
        "1 dataroom",
        "Multi-file sharing",
        <span key="custom-domain">
          Custom domain <b>for documents</b>
        </span>,
        "Advanced link controls",
        "Allow/Block list",
        "Unlimited documents",
        "Unlimited subfolder levels",
        "Large file uploads",
        "48h priority support",
      ];
    }
    if (plan === "Data Rooms") {
      return [
        "3 users included",
        "Unlimited data rooms",
        <span key="custom-dataroom">
          Custom domain <b>for data rooms</b>
        </span>,

        "NDA agreements",
        "Dynamic watermark",
        "Granular user/group permisssions",
        "Advanced data rooms analytics",
        "24h priority support",
        "Custom onboarding",
      ];
    }

    return [
      "2 users",
      "Custom branding",
      "1-year analytics retention",
      "Folders",
    ];
  }, [plan]);

  // Track analytics event when modal is opened
  useEffect(() => {
    if (open) {
      analytics.capture("Upgrade Button Clicked", {
        trigger: trigger,
        teamId: teamInfo?.currentTeam?.id,
      });
    }
  }, [open, trigger,analytics ,teamInfo?.currentTeam?.id]);
// }, [open, trigger]);

  // Track analytics event when child button is present
  const handleUpgradeClick = () => {
    analytics.capture("Upgrade Button Clicked", {
      trigger: trigger,
      teamId: teamInfo?.currentTeam?.id,
    });
  };

  // If button is present, clone it and add onClick handler
  const buttonChild = React.isValidElement<{
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
  }>(children)
    ? React.cloneElement(children, { onClick: handleUpgradeClick })
    : children;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{buttonChild}</DialogTrigger>
      <DialogContent className="bg-gray-200 dark:bg-gray-700  text-foreground">
        <motion.div
          variants={{
            show: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center justify-center space-y-3 border-b border-border py-8 sm:px-12"
        >
          <motion.div variants={STAGGER_CHILD_VARIANTS}>
            <p className="text-2xl font-bold tracking-tighter text-foreground">
              DocuPitch
            </p>
          </motion.div>
          <motion.h3
            className="text-lg font-medium"
            variants={STAGGER_CHILD_VARIANTS}
          >
            Upgrade to {plan}
          </motion.h3>
          <motion.p
            className="text-center text-sm text-muted-foreground"
            variants={STAGGER_CHILD_VARIANTS}
          >
            Enjoy higher limits and extra features with our {plan} plan.
          </motion.p>
        </motion.div>

        <div className="bg-background pb-8 text-left sm:px-8">
          <Tabs className="pb-4" defaultValue={plan}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="Pro" onClick={() => setPlan("Pro")}>
                Pro
              </TabsTrigger>
              <TabsTrigger value="Business" onClick={() => setPlan("Business")}>
                Business
              </TabsTrigger>
              <TabsTrigger
                value="Data Rooms"
                onClick={() => setPlan("Data Rooms")}
              >
                Data Rooms
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <motion.div
            className="flex flex-col space-y-3"
            variants={STAGGER_CHILD_VARIANTS}
            initial="hidden"
            animate="show"
          >
            <div className="mb-4">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <h4 className="font-medium text-foreground">
                    {plan} {capitalize(period)}
                  </h4>
                  <Badge
                    variant="outline"
                    className="text-sm font-normal normal-case"
                  >
                    {`€${
                      PLANS.find((p) => p.name === plan)!.price[period].amount
                    }/month`}{" "}
                    {period === "yearly" ? (
                      <span className="ml-1 text-xs">(billed yearly)</span>
                    ) : null}
                  </Badge>
                </div>
                <button
                  onClick={() => {
                    setPeriod(period === "monthly" ? "yearly" : "monthly");
                  }}
                  className="text-xs text-muted-foreground underline underline-offset-4 transition-colors hover:text-gray-800 hover:dark:text-muted-foreground/80"
                >
                  {period === "monthly"
                    ? plan === "Business"
                      ? "Want 43% off?"
                      : plan === "Data Rooms"
                        ? "Want 50% off?"
                        : "Want 35% off?"
                    : "Switch to monthly"}
                </button>
              </div>
              <motion.div
                variants={{
                  show: {
                    transition: {
                      staggerChildren: 0.08,
                    },
                  },
                }}
                initial="hidden"
                animate="show"
                className="flex flex-col space-y-2"
              >
                {features.map((feature, i) => (
                  <motion.div
                    key={i}
                    variants={STAGGER_CHILD_VARIANTS}
                    className="flex items-center gap-x-3 text-sm text-muted-foreground"
                  >
                    <CheckIcon
                      className="h-5 w-5 flex-none text-[#fb7a00]"
                      aria-hidden="true"
                    />
                    <span>{feature}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
            <Button
              loading={clicked}
              onClick={async () => {
                setClicked(true);
                // @ts-ignore
                // prettier-ignore
                  console.log('clicked upgrade plan modal ---------255',teamPlan)
                if (teamPlan !== "free") {
                  console.log('257---------------- upgrade plan modal')
                  // fetch(
                  //   `/api/teams/${teamInfo?.currentTeam?.id}/billing/manage`,
                  //   {
                  //     method: "POST",
                  //   },
                  // )
                  //   .then(async (res) => {
                  //     console.log("264-----upgrade plan modal not free ",teamPlan)
                  //     const url = await res.json();
                  //     router.push(url);
                  //   })
                  //   .catch((err) => {
                  //     alert(err);
                  //     setClicked(false);
                  //   });
                } else {
                  console.log('274---------------- upgrade plan modal')
                // fetch(
                //   `/api/teams/${
                //     teamInfo?.currentTeam?.id
                //   }/billing/upgrade?priceId=${
                //     PLANS.find((p) => p.name === plan)!.price[period].priceIds[
                //       process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
                //         ? "production"
                //         : "test"
                //     ]
                //   }`,
                //   {
                //     method: "POST",
                //     headers: {
                //       "Content-Type": "application/json",
                //     },
                //   },
                // )
                //   .then(async (res) => {
                //     // console.log('upgrade modal plan 289-------')

                //     const data = await res.json();
                //     console.log('upgrade modal plan 292-------',data)
                //     const { id: sessionId } = data;
                //     // console.log('upgrade modal plan 294-------',sessionId)
                //     console.log('upgrade modal plan 295---- pan---',plan)
                //     const stripe = await getStripe();
                //     stripe?.redirectToCheckout({ sessionId });
                   
                //   })
                //   .catch((err) => {
                //     console.log('upgrade modal plan 295 err-------',err)
                //     alert(err);
                //     setClicked(false);
                //   });
                }

                  fetch(`/api/teams/${
                    teamInfo?.currentTeam?.id
                  }/billing/upgrade?priceId=${
                    PLANS.find((p) => p.name === plan)!.price[period].priceIds[
                      process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
                        ? "production"
                        : "test"
                    ]
                  }`,
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                  },
                )
                  .then(async (res) => {
                    // console.log('upgrade modal plan 289-------')

                    const data = await res.json();
                    console.log('upgrade modal plan 292-------',data)
                    const { id: sessionId } = data;
                    // console.log('upgrade modal plan 294-------',sessionId)
                    console.log('upgrade modal plan 295---- pan---',plan)
                    const stripe = await getStripe();
                    stripe?.redirectToCheckout({ sessionId });
                   
                  })
                  .catch((err) => {
                    console.log('upgrade modal plan 295 err-------',err)
                    alert(err);
                    setClicked(false);
                  });

              }}
            >{`Upgrade to ${plan} ${capitalize(period)}`}  ** </Button>
            {/* <p style={{backgroundColor:'white',color:'black'}}>{`/api/teams/${
              teamInfo?.currentTeam?.id
            }/billing/upgrade?priceId=${
              PLANS.find((p) => p.name === plan)!.price[period].priceIds[
                process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
                  ? "production"
                  : "test"
              ]
            }`}</p> */}
            <div className="flex items-center justify-center space-x-2">
              {plan === "Business" && !isTrial ? (
                <DataroomTrialModal>
                  <button
                    className="text-center text-xs text-muted-foreground underline-offset-4 transition-all hover:text-gray-800 hover:underline hover:dark:text-muted-foreground/80"
                    onClick={() => analytics.capture("Dataroom Trial Clicked")}
                  >
                    Looking for a trial?
                  </button>
                </DataroomTrialModal>
              ) : (
                <a
                  href="https://cal.com/marcseitz/docupitch"
                  target="_blank"
                  className="text-center text-xs text-muted-foreground underline-offset-4 transition-all hover:text-gray-800 hover:underline hover:dark:text-muted-foreground/80"
                >
                  Looking for DocuPitch Enterprise?
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
