import { Dispatch, SetStateAction, useMemo } from "react";

import { ImageIcon } from "lucide-react";
import ReactTextareaAutosize from "react-textarea-autosize";

import { Facebook } from "../shared/icons/facebook";
import LinkedIn from "../shared/icons/linkedin";
import Twitter from "../shared/icons/twitter";

export default function Preview({
  data,
  setData,
}: {
  data: {
    metaImage: string | null;
    metaTitle: string | null;
    metaDescription: string | null;
  };
  setData: Dispatch<
    SetStateAction<{
      metaImage: string | null;
      metaTitle: string | null;
      metaDescription: string | null;
    }>
  >;
}) {
  const {
    metaTitle: title,
    metaDescription: description,
    metaImage: image,
  } = data;

  const hostname = "docupitch.com";

  return (
    <div>
      <div className="sticky top-0 z-10 flex h-10 items-center justify-center border-b border-border bg-white px-5 dark:bg-gray-900 sm:h-14">
        <h2 className="text-lg font-medium">Previews</h2>
      </div>
      <div className="grid gap-5 p-5">
        {/* Twitter */}
        <div>
          <div className="relative mb-2">
            <div
              className="absolute inset-0 flex items-center"
              aria-hidden="true"
            >
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center">
              <div className="flex items-center space-x-2 bg-white px-3 dark:bg-gray-900">
                <Twitter className="h-4 w-4" />
                <p className="text-sm text-muted-foreground">Twitter</p>
              </div>
            </div>
          </div>
          <div className="group relative overflow-hidden rounded-2xl border border-border">
            <ImagePreview image={image} />
            {(title || title === "") && (
              <div className="absolute bottom-2 left-2 rounded-md bg-[#414142] px-1.5 py-px">
                <h3 className="max-w-sm truncate text-sm text-white">
                  {title}
                </h3>
              </div>
            )}
          </div>
          {hostname && (
            <p className="mt-2 text-[0.8rem] text-[#606770]">{hostname}</p>
          )}
        </div>

        {/* LinkedIn */}
        <div>
          <div className="relative mb-2">
            <div
              className="absolute inset-0 flex items-center"
              aria-hidden="true"
            >
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center">
              <div className="flex items-center space-x-2 bg-white px-3 dark:bg-gray-900">
                <LinkedIn className="h-4 w-4" />
                <p className="text-sm text-muted-foreground">LinkedIn</p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-[2px] shadow-[0_0_0_1px_rgba(0,0,0,0.15),0_2px_3px_rgba(0,0,0,0.2)] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.15),0_2px_3px_rgba(255,255,255,0.2)]">
            <ImagePreview image={image} />
            <div className="grid gap-1 border-t border-border bg-white p-3">
              {title || title === "" ? (
                <input
                  className="truncate border-none bg-transparent p-0 font-semibold text-[#000000E6] outline-none focus:ring-0"
                  value={title}
                  onChange={(e) => {
                    setData((prev) => ({
                      ...prev,
                      title: e.currentTarget.value,
                    }));
                  }}
                />
              ) : (
                <div className="mb-1 h-5 w-full rounded-md bg-gray-200" />
              )}
              {hostname ? (
                <p className="text-xs text-[#00000099]">{hostname}</p>
              ) : (
                <div className="mb-1 h-4 w-24 rounded-md bg-gray-200" />
              )}
            </div>
          </div>
        </div>

        {/* Facebook */}
        <div>
          <div className="relative mb-2">
            <div
              className="absolute inset-0 flex items-center"
              aria-hidden="true"
            >
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center">
              <div className="flex items-center space-x-2 bg-white px-3 dark:bg-gray-900">
                <Facebook className="h-4 w-4" />
                <p className="text-sm text-muted-foreground">Facebook</p>
              </div>
            </div>
          </div>
          <div className="relative border border-border">
            <ImagePreview image={image} />
            <div className="grid gap-1 border-t border-border bg-[#f2f3f5] p-3">
              {hostname ? (
                <p className="text-[0.8rem] uppercase text-[#606770]">
                  {hostname}
                </p>
              ) : (
                <div className="mb-1 h-4 w-24 rounded-md bg-gray-200" />
              )}
              {title || title === "" ? (
                <input
                  className="truncate border-none bg-transparent p-0 font-semibold text-[#1d2129] outline-none focus:ring-0"
                  value={title}
                  onChange={(e) => {
                    setData((prev) => ({
                      ...prev,
                      title: e.currentTarget.value,
                    }));
                  }}
                />
              ) : (
                <div className="mb-1 h-5 w-full rounded-md bg-gray-200" />
              )}
              {description || description === "" ? (
                <ReactTextareaAutosize
                  className="mb-1 line-clamp-2 w-full resize-none rounded-md border-none bg-gray-200 bg-transparent p-0 text-sm text-[#606770] outline-none focus:ring-0"
                  value={description}
                  maxRows={2}
                  onChange={(e) => {
                    setData((prev) => ({
                      ...prev,
                      description: e.currentTarget.value,
                    }));
                  }}
                />
              ) : (
                <div className="grid gap-2">
                  <div className="h-4 w-full rounded-md bg-gray-200" />
                  <div className="h-4 w-48 rounded-md bg-gray-200" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const ImagePreview = ({ image }: { image: string | null }) => {
  const previewImage = useMemo(() => {
    if (image) {
      return (
        <img
          src={image}
          alt="Preview"
          className="aspect-[1200/630] h-full w-full object-cover"
        />
      );
    } else {
      return (
        <div className="flex aspect-[1200/630] h-full min-h-[250px] w-full flex-col items-center justify-center space-y-4 bg-gray-100">
          <ImageIcon className="h-8 w-8 text-gray-400" />
          <p className="text-sm text-gray-400">
            Add an image to generate a preview.
          </p>
        </div>
      );
    }
  }, [image]);

  return <>{previewImage}</>;
};
