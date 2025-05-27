// import { FilePlusIcon, PlusIcon } from "lucide-react";

// export function EmptyDocuments() {
//   return (
//     <div className="text-center">
//       <FilePlusIcon
//         className="mx-auto h-12 w-12 text-muted-foreground"
//         strokeWidth={1}
//       />
//       <h3 className="mt-2 text-sm font-medium text-foreground">
//         No documents here
//       </h3>
//       <p className="mt-1 text-sm text-muted-foreground">
//         Get started by uploading a new document.
//       </p>
    
//     </div>
//   );
// }



import {
  UploadIcon,
  Share2Icon,
  ActivityIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
} from "lucide-react";

export function EmptyDocuments() {
  return (
    <div className="text-center flex flex-col items-center justify-center px-4 py-10">
      {/* Image from public folder */}
      <img
        src="/images/rocket-pra.jpg" // Replace with your actual image filename
        alt="Empty documents"
        className="max-w-52 max-h-52 object-contain mb-4"
      />

      {/* Title */}
      <h3 className="text-xl mt-3 font-semibold text-foreground" style={{ fontFamily: 'SF Pro Display Light' }}>Let&apos;s get your pitch off the ground! 🚀</h3>

      {/* Description */}
      <p className="mt-5 text-sm text-muted-foreground max-w-md" style={{ fontFamily: 'SF Pro Display Light' }}>
      Start sharing your pitch deck with potential investors and track engagement in real-time.
      </p>

      {/* Icons row */}
      <div className="flex items-center gap-6 mt-16">
  {/* Upload */}
  <div className="flex flex-col items-center">
    <div className="w-12 h-12 rounded-full bg-[#FFEDD5] p-2 flex items-center justify-center">
      {/* Upload SVG */}
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_409_2066)">
<path d="M11.25 4.26855V13.749C11.25 14.4404 10.6914 14.999 10 14.999C9.30859 14.999 8.75 14.4404 8.75 13.749V4.26855L5.88281 7.13574C5.39453 7.62402 4.60156 7.62402 4.11328 7.13574C3.625 6.64746 3.625 5.85449 4.11328 5.36621L9.11328 0.366211C9.60156 -0.12207 10.3945 -0.12207 10.8828 0.366211L15.8828 5.36621C16.3711 5.85449 16.3711 6.64746 15.8828 7.13574C15.3945 7.62402 14.6016 7.62402 14.1133 7.13574L11.25 4.26855ZM2.5 13.749H7.5C7.5 15.1279 8.62109 16.249 10 16.249C11.3789 16.249 12.5 15.1279 12.5 13.749H17.5C18.8789 13.749 20 14.8701 20 16.249V17.499C20 18.8779 18.8789 19.999 17.5 19.999H2.5C1.12109 19.999 0 18.8779 0 17.499V16.249C0 14.8701 1.12109 13.749 2.5 13.749ZM16.875 17.8115C17.1236 17.8115 17.3621 17.7128 17.5379 17.5369C17.7137 17.3611 17.8125 17.1227 17.8125 16.874C17.8125 16.6254 17.7137 16.3869 17.5379 16.2111C17.3621 16.0353 17.1236 15.9365 16.875 15.9365C16.6264 15.9365 16.3879 16.0353 16.2121 16.2111C16.0363 16.3869 15.9375 16.6254 15.9375 16.874C15.9375 17.1227 16.0363 17.3611 16.2121 17.5369C16.3879 17.7128 16.6264 17.8115 16.875 17.8115Z" fill="#F97316"/>
</g>
<defs>
<clipPath id="clip0_409_2066">
<path d="M0 0H20V20H0V0Z" fill="white"/>
</clipPath>
</defs>
</svg>

    </div>
    <span className="text-xs mt-2">Upload</span>
  </div>

  {/* Line */}
{/* Line */}
<div className="h-[2px] w-12 bg-[#E5E7EB]" />


  {/* Share */}
  <div className="flex flex-col items-center">
    <div className="w-12 h-12 rounded-full bg-[#FFEDD5] p-2 flex items-center justify-center">
      {/* Share SVG */}
      <svg width="26" height="20" viewBox="0 0 26 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M25.5 20H0.5V0H25.5V20Z" stroke="#E5E7EB"/>
<path d="M25.5 20H0.5V0H25.5V20Z" stroke="#E5E7EB"/>
<path d="M23.1484 10.4572C25.3555 8.2502 25.3555 4.67598 23.1484 2.46895C21.1953 0.515827 18.1172 0.261921 15.8711 1.86739L15.8086 1.91036C15.2461 2.3127 15.1172 3.09395 15.5195 3.65255C15.9219 4.21114 16.7031 4.34395 17.2617 3.94161L17.3242 3.89864C18.5781 3.00411 20.293 3.14473 21.3789 4.23458C22.6094 5.46505 22.6094 7.45723 21.3789 8.6877L16.9961 13.0783C15.7656 14.3088 13.7734 14.3088 12.543 13.0783C11.4531 11.9885 11.3125 10.2736 12.207 9.02364L12.25 8.96114C12.6523 8.39864 12.5195 7.61739 11.9609 7.21895C11.4023 6.82052 10.6172 6.94942 10.2188 7.50801L10.1758 7.57052C8.56641 9.8127 8.82031 12.8908 10.7734 14.844C12.9805 17.051 16.5547 17.051 18.7617 14.844L23.1484 10.4572ZM2.85156 9.54317C0.644531 11.7502 0.644531 15.3244 2.85156 17.5315C4.80469 19.4846 7.88281 19.7385 10.1289 18.133L10.1914 18.09C10.7539 17.6877 10.8828 16.9065 10.4805 16.3479C10.0781 15.7893 9.29688 15.6565 8.73828 16.0588L8.67578 16.1018C7.42188 16.9963 5.70703 16.8557 4.62109 15.7658C3.39062 14.5315 3.39062 12.5393 4.62109 11.3088L9.00391 6.92208C10.2344 5.69161 12.2266 5.69161 13.457 6.92208C14.5469 8.01192 14.6875 9.72677 13.793 10.9807L13.75 11.0432C13.3477 11.6057 13.4805 12.3869 14.0391 12.7854C14.5977 13.1838 15.3828 13.0549 15.7812 12.4963L15.8242 12.4338C17.4336 10.1877 17.1797 7.10958 15.2266 5.15645C13.0195 2.94942 9.44531 2.94942 7.23828 5.15645L2.85156 9.54317Z" fill="#3B82F6"/>
</svg>

    </div>
    <span className="text-xs mt-2">Share</span>
  </div>

  {/* Line */}
  <div className="h-[2px] w-12  bg-[#E5E7EB]" />

  {/* Track */}
  <div className="flex flex-col items-center">
    <div className="w-12 h-12 rounded-full bg-[#FFEDD5] p-2 flex items-center justify-center">
      {/* Track SVG */}
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20 20H0V0H20V20Z" stroke="#E5E7EB"/>
<path d="M20 20H0V0H20V20Z" stroke="#E5E7EB"/>
<path d="M2.5 2.5C2.5 1.80859 1.94141 1.25 1.25 1.25C0.558594 1.25 0 1.80859 0 2.5V15.625C0 17.3516 1.39844 18.75 3.125 18.75H18.75C19.4414 18.75 20 18.1914 20 17.5C20 16.8086 19.4414 16.25 18.75 16.25H3.125C2.78125 16.25 2.5 15.9688 2.5 15.625V2.5ZM18.3828 5.88281C18.8711 5.39453 18.8711 4.60156 18.3828 4.11328C17.8945 3.625 17.1016 3.625 16.6133 4.11328L12.5 8.23047L10.2578 5.98828C9.76953 5.5 8.97656 5.5 8.48828 5.98828L4.11328 10.3633C3.625 10.8516 3.625 11.6445 4.11328 12.1328C4.60156 12.6211 5.39453 12.6211 5.88281 12.1328L9.375 8.64453L11.6172 10.8867C12.1055 11.375 12.8984 11.375 13.3867 10.8867L18.3867 5.88672L18.3828 5.88281Z" fill="#F2C94C"/>
</svg>

    </div>
    <span className="text-xs mt-2">Track</span>
  </div>
</div>


    </div>
  );
}
