

// import { useEventRunStatuses } from "@trigger.dev/react";
// import { Progress } from "@/components/ui/progress";
// import { cn } from "@/lib/utils";
// import { useState, useEffect } from "react";

// export default function ProcessStatusBar({
//   documentVersionId,
//   className,
// }: {
//   documentVersionId: string;
//   className?: string;
// }) {
//   console.log("process status bar document version id", documentVersionId);

//   // Ensure documentVersionId is valid
//   if (!documentVersionId) {
//     console.error("documentVersionId is invalid or undefined");
//     return (
//       <div className={cn("w-full rounded-none text-[8px] font-semibold", className)}>
//         Invalid Document ID
//       </div>
//     );
//   }

//   // DEBUG: Print the QueryClient instance

//   const { fetchStatus, error, statuses, run } = useEventRunStatuses(documentVersionId);
//   const [isMounted, setIsMounted] = useState(false);

//   useEffect(() => {
//     setIsMounted(true);
//     console.log("process status bar fetchStatus", fetchStatus);
//   }, []);

//   if (!isMounted) {
//     return null; // Prevents rendering during hydration
//   }

//   if (fetchStatus === "loading") {
//     return (
//       <Progress
//         value={0}
//         text="Processing document..."
//         className={cn("w-full rounded-none text-[8px] font-semibold", className)}
//       />
//     );
//   }

//   if (fetchStatus === "error") {
//     return (
//       <Progress
//         value={0}
//         text={error.message}
//         className={cn("w-full rounded-none text-[8px] font-semibold", className)}
//       />
//     );
//   }

//   if (run?.status === "SUCCESS") {
//     return null;
//   }

//   const progress = Number(statuses[0]?.data?.progress) * 100 || 0;
//   const text = String(statuses[0]?.data?.text) || "";

//   if (run?.status === "FAILURE") {
//     return (
//       <Progress
//         value={progress}
//         text={`Error processing document page ${Number(statuses[0]?.data?.currentPage)}`}
//         error={true}
//         className={cn("w-full rounded-none text-[8px] font-semibold", className)}
//       />
//     );
//   }

//   return (
//     <Progress
//       value={progress}
//       text={text}
//       className={cn("w-full rounded-none text-[8px] font-semibold", className)}
//     />
//   );
// }

// added by aniket
import { useEventRunStatuses } from "@trigger.dev/react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

export default function ProcessStatusBar({
  documentVersionId,
  className,
}: {
  documentVersionId: string;
  className?: string;
}) {
  console.log("process status bar document version id", documentVersionId);

  // Hooks must always be called at the top level
  const { fetchStatus, error, statuses, run } = useEventRunStatuses(documentVersionId);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    console.log("process status bar fetchStatus", fetchStatus);
  }, [fetchStatus]);
// }, []);

  // Handle invalid documentVersionId after Hooks are called
  if (!documentVersionId) {
    console.error("documentVersionId is invalid or undefined");
    return (
      <div className={cn("w-full rounded-none text-[8px] font-semibold", className)}>
        Invalid Document ID
      </div>
    );
  }

  if (!isMounted) {
    return null; // Prevents rendering during hydration
  }

  if (fetchStatus === "loading") {
    return (
      <Progress
        value={0}
        text="Processing document..."
        className={cn("w-full rounded-none text-[8px] font-semibold", className)}
      />
    );
  }

  if (fetchStatus === "error") {
    return (
      <Progress
        value={0}
        text={error.message}
        className={cn("w-full rounded-none text-[8px] font-semibold", className)}
      />
    );
  }

  if (run?.status === "SUCCESS") {
    return null;
  }

  const progress = Number(statuses[0]?.data?.progress) * 100 || 0;
  const text = String(statuses[0]?.data?.text) || "";

  if (run?.status === "FAILURE") {
    return (
      <Progress
        value={progress}
        text={`Error processing document page ${Number(statuses[0]?.data?.currentPage)}`}
        error={true}
        className={cn("w-full rounded-none text-[8px] font-semibold", className)}
      />
    );
  }

  return (
    <Progress
      value={progress}
      text={text}
      className={cn("w-full rounded-none text-[8px] font-semibold", className)}
    />
  );
}
// added by aniket end