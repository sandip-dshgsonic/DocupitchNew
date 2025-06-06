export function getSupportedContentType(contentType: string): string | null {
  switch (contentType) {
    case "video/mp4":
    case "video/quicktime":
      return "video"
    case "application/pdf":
      return "pdf";
    case "application/vnd.ms-excel":
    case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
    case "text/csv":
    case "application/vnd.oasis.opendocument.spreadsheet":
      return "sheet";
    case "application/msword":
    case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
    case "application/vnd.oasis.opendocument.text":
      return "docs";
    case "application/vnd.ms-powerpoint":
    case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
    case "application/vnd.oasis.opendocument.presentation":
      return "slides";
    default:
      return null;
  }
}

export function getExtensionFromContentType(
  contentType: string,
): string | null {
  switch (contentType) {
    case "application/pdf":
      return "pdf";
    case "application/vnd.ms-excel":
      return "xls";
    case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
      return "xlsx";
    case "text/csv":
      return "csv";
    case "application/vnd.oasis.opendocument.spreadsheet":
      return "ods";
    case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      return "docx";
    case "application/vnd.oasis.opendocument.text":
      return "odt";
    case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
      return "pptx";
    case "application/vnd.oasis.opendocument.presentation":
      return "odp";
    case "application/vnd.ms-powerpoint":
      return "ppt";
    case "application/msword":
      return "doc";
    default:
      return null;
  }
}

export function getExtensionFromSupportedType(
  supportedType: string,
): string | null {
  switch (supportedType) {
    case "pdf":
      return "pdf";
    case "sheet":
      return "xlsx";
    default:
      return null;
  }
}

export function getMimeTypeFromSupportedType(
  supportedType: string,
): string | null {
  switch (supportedType) {
    case "pdf":
      return "application/pdf";
    case "sheet":
      return "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    default:
      return null;
  }
}
