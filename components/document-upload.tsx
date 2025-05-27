import { useMemo } from "react";

import { UploadIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";

import { usePlan } from "@/lib/swr/use-billing";
import { bytesToSize } from "@/lib/utils";
import { fileIcon } from "@/lib/utils/get-file-icon";
import { getPagesCount } from "@/lib/utils/get-page-number-count";

// const fileSizeLimits: { [key: string]: number } = {
//   "application/vnd.ms-excel": 40, // 40 MB
//   "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": 40, // 40 MB
//   "application/vnd.oasis.opendocument.spreadsheet": 40, // 40 MB
//   "text/csv": 40, // 40 MB
// };

const fileSizeLimits: { [key: string]: number } = {
  "application/vnd.ms-excel": 40, // 40 MB
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": 40, // 40 MB
  "application/vnd.oasis.opendocument.spreadsheet": 40, // 40 MB
  "text/csv": 40, // 40 MB
  "video/mp4": 100, // 100 MB
  "video/quicktime": 100, // 100 MB
};


export default function DocumentUpload({
  currentFile,
  setCurrentFile,
}: {
  currentFile: File | null;
  setCurrentFile: React.Dispatch<React.SetStateAction<File | null>>;
}) {
  const { theme, systemTheme } = useTheme();
  const isLight =
    theme === "light" || (theme === "system" && systemTheme === "light");
  const { plan, trial } = usePlan();
  const isFreePlan = plan === "free";
  const isTrial = !!trial;
  const maxSize = plan === "business" || plan === "datarooms" ? 100 : 30;
  const maxNumPages = plan === "business" || plan === "datarooms" ? 500 : 100;

  const { getRootProps, getInputProps } = useDropzone({
    // accept:
    //   isFreePlan && !isTrial
    //     ? {
    //         "application/pdf": [], // ".pdf"
    //         "application/vnd.ms-excel": [], // ".xls"
    //         "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
    //           [], // ".xlsx"
    //         "text/csv": [], // ".csv"
    //         "application/vnd.oasis.opendocument.spreadsheet": [], // ".ods"
    //       }
    //     : {
    //         "application/pdf": [], // ".pdf"
    //         "application/vnd.ms-excel": [], // ".xls"
    //         "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
    //           [], // ".xlsx"
    //         "text/csv": [], // ".csv"
    //         "application/vnd.oasis.opendocument.spreadsheet": [], // ".ods"
    //         "application/vnd.ms-powerpoint": [], // ".ppt"
    //         "application/vnd.openxmlformats-officedocument.presentationml.presentation":
    //           [], // ".pptx"
    //         "application/vnd.oasis.opendocument.presentation": [], // ".odp"
    //         "application/msword": [], // ".doc"
    //         "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
    //           [], // ".docx"
    //         "application/vnd.oasis.opendocument.text": [], // ".odt"
    //       },
    accept:
  isFreePlan && !isTrial
    ? {
        "application/pdf": [],
        "application/vnd.ms-excel": [],
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [],
        "text/csv": [],
        "application/vnd.oasis.opendocument.spreadsheet": [],
        "video/mp4": [],
        "video/quicktime": [],
      }
    : {
        "application/pdf": [],
        "application/vnd.ms-excel": [],
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [],
        "text/csv": [],
        "application/vnd.oasis.opendocument.spreadsheet": [],
        "application/vnd.ms-powerpoint": [],
        "application/vnd.openxmlformats-officedocument.presentationml.presentation":
          [],
        "application/vnd.oasis.opendocument.presentation": [],
        "application/msword": [],
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
          [],
        "application/vnd.oasis.opendocument.text": [],
        "video/mp4": [],
        "video/quicktime": [],
      },

    multiple: false,
    maxSize: maxSize * 1024 * 1024, // 30 MB
    // onDropAccepted: (acceptedFiles) => {
    //   const file = acceptedFiles[0];
    //   const fileType = file.type;
    //   const fileSizeLimit = fileSizeLimits[fileType] * 1024 * 1024;

    //   if (file.size > fileSizeLimit) {
    //     toast.error(
    //       `File size too big for ${fileType} (max. ${fileSizeLimits[fileType]} MB)`,
    //     );
    //     return;
    //   }

    //   if (file.type !== "application/pdf") {
    //     setCurrentFile(file);
    //     return;
    //   }
    //   file
    //     .arrayBuffer()
    //     .then((buffer) => {
    //       getPagesCount(buffer).then((numPages) => {
    //         if (numPages > maxNumPages) {
    //           toast.error(`File has too many pages (max. ${maxNumPages})`);
    //         } else {
    //           setCurrentFile(file);
    //         }
    //       });
    //     })
    //     .catch((error) => {
    //       console.error("Error reading file:", error);
    //       toast.error("Failed to read the file");
    //     });
    // },
    onDropAccepted: (acceptedFiles) => {
      const file = acceptedFiles[0];
      const fileType = file.type;
      const fileSizeLimit = fileSizeLimits[fileType] * 1024 * 1024;
    
      if (file.size > fileSizeLimit) {
        toast.error(
          `File size too big for ${fileType} (max. ${fileSizeLimits[fileType]} MB)`
        );
        return;
      }
    
      if (file.type.startsWith("video/")) {
        setCurrentFile(file); // Directly set the video file
        return;
      }
    
      if (file.type === "application/pdf") {
        file
        .arrayBuffer()
        .then((buffer) => {
          getPagesCount(buffer).then((numPages) => {
            if (numPages === undefined) {
              toast.error("Failed to get page count");
              return;
            }
      
            if (numPages > maxNumPages) {
              toast.error(`File has too many pages (max. ${maxNumPages})`);
            } else {
              setCurrentFile(file);
            }
          });
        })
        .catch((error) => {
          console.error("Error reading file:", error);
          toast.error("Failed to read the file");
        });
      } else {
        setCurrentFile(file);
      }
    },
    
    onDropRejected: (fileRejections) => {
      const { errors } = fileRejections[0];
      let message;
      if (errors[0].code === "file-too-large") {
        message = `File size too big (max. ${maxSize} MB)`;
      } else if (errors[0].code === "file-invalid-type") {
        message = "File type not supported";
      } else {
        message = errors[0].message;
      }
      toast.error(message);
    },
  });

  const imageBlobUrl = useMemo(
    () => (currentFile ? URL.createObjectURL(currentFile) : ""),
    [currentFile],
  );

  return (
<div className="col-span-full">
  <div
    {...getRootProps()}
    className="group relative block cursor-pointer rounded-lg border-dashed border-gray-300 dark:border-white/25 bg-white dark:bg-gray-800 p-6 transition hover:bg-gray-50 dark:hover:bg-gray-700"
  >
    <input {...getInputProps()} name="file" className="sr-only" />

    <div className="flex flex-col items-center justify-center space-y-4 text-center min-h-[200px]">
      {/* Upload Icon */}
     {/* Custom SVG Icon */}
     {!currentFile && (
        <div className="h-10 w-10 text-gray-400 dark:text-gray-500">
          <svg
            width="28"
            height="36"
            viewBox="0 0 28 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto"
          >
            <g clipPath="url(#clip0_397_1668)">
              <g clipPath="url(#clip1_397_1668)">
                <path
                  d="M5 0C2.51797 0 0.5 2.01797 0.5 4.5V31.5C0.5 33.982 2.51797 36 5 36H23C25.482 36 27.5 33.982 27.5 31.5V11.25H18.5C17.2555 11.25 16.25 10.2445 16.25 9V0H5ZM18.5 0V9H27.5L18.5 0ZM15.6875 28.6875C15.6875 29.6227 14.9352 30.375 14 30.375C13.0648 30.375 12.3125 29.6227 12.3125 28.6875V21.5086L10.1328 23.6883C9.47188 24.3492 8.40312 24.3492 7.74922 23.6883C7.09531 23.0273 7.08828 21.9586 7.74922 21.3047L12.8117 16.2422C13.4727 15.5813 14.5414 15.5813 15.1953 16.2422L20.2578 21.3047C20.9188 21.9656 20.9188 23.0344 20.2578 23.6883C19.5969 24.3422 18.5281 24.3492 17.8742 23.6883L15.6945 21.5086V28.6875H15.6875Z"
                  fill="#D1D5DB"
                />
              </g>
            </g>
            <defs>
              <clipPath id="clip0_397_1668">
                <rect width="27" height="36" fill="white" transform="translate(0.5)" />
              </clipPath>
              <clipPath id="clip1_397_1668">
                <path d="M0.5 0H27.5V36H0.5V0Z" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
      )}

      {/* Upload Message */}
      <div className="space-y-1">
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Drag and drop your file here
        </p>
        <p className="text-sm text-gray-500 py-3 dark:text-gray-400">
          or
        </p>

        {/* Browse Button */}
        <button
          type="button"
          className="inline-flex items-center rounded-md  bg-[#FFEDD5] px-3 py-1.5 text-sm font-medium text-[#F97316] shadow-sm hover:bg-gray-100 dark:border-white/30 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
        >
          Browse Files
        </button>
      </div>

      {/* Max Size Info */}
      <p className="text-xs text-gray-500 dark:text-gray-400">
        Max file size: {maxSize}MB. Supported formats: PDF, DOCX, PPTX, etc.
      </p>

      {/* Preview if file is selected */}
      {currentFile && (
        <div className="mt-4 flex flex-col items-center text-sm text-foreground">
          <div className="mb-2">
            {fileIcon({ fileType: currentFile.type, isLight })}
          </div>
          <p>{currentFile.name}</p>
          <p className="text-gray-500">{bytesToSize(currentFile.size)}</p>
        </div>
      )}
    </div>

    {/* Background image if file is an image */}
    {currentFile && (
      <div
        className="pointer-events-none absolute inset-0 opacity-10 transition-opacity group-hover:opacity-5"
        style={{
          backgroundImage: `url(${imageBlobUrl})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      />
    )}
  </div>
</div>

  );
}
