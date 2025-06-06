import Link from "next/link";

import { Session } from "next-auth";

import { useDomains } from "@/lib/swr/use-domains";
import { CustomUser } from "@/lib/types";
import { calculateDaysLeft } from "@/lib/utils";

//by aniket
import { Button } from "../../components/ui/button";
// by aniket end
// import { Button } from "./ui/button";

const cutoffDate = new Date("2023-10-12T00:00:00.000Z");

export default function Banner({ session }: { session: Session | null }) {
  const { domains } = useDomains();

  const userDaysLeft = calculateDaysLeft(
    new Date((session?.user as CustomUser).createdAt || 0),
  );

  const noDomains = domains && domains.length === 0;
  const someNotVerified =
    domains && !noDomains && domains.some((domain) => !domain.verified);
  const allVerified =
    domains && !noDomains && domains.every((domain) => domain.verified);

  return (
    <aside className="mb-2 flex w-full flex-col justify-center rounded-lg border border-gray-700 bg-background p-4 text-foreground">
      <div className="flex space-x-2">
        <span className="text-sm font-bold">✨ Pro Trial ✨</span>
      </div>
      <p className="my-4 text-sm">
        {`You are on the Pro trial for the next ${userDaysLeft} days.`}
      </p>
      {allVerified ? (
        <p className="text-sm text-green-500">{`Your domain is verified.`}</p>
      ) : (
        <Button variant={someNotVerified ? `destructive` : `default`}>
          <Link href="/settings/domains" target="_blank">
            {someNotVerified
              ? `Please verify your domain`
              : `Connect custom domain`}
          </Link>
        </Button>
      )}
    </aside>
  );
}
