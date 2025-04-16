import {
  GetDataParametersType,
  IExternalVisitorCodeManager,
  KameleoonUtils,
  SetDataParametersType,
} from "@kameleoon/nodejs-sdk";

// -- Custom Implementation of Kameleoon Visitor Code Manager for Next.js
export class NextVisitorCodeManager implements IExternalVisitorCodeManager {
  public getData({ request, key }: GetDataParametersType): string | null {
    // - Get cookie from server request
    const cookieString = request.headers.cookie;

    // - Return `null` if no cookie was found
    if (!cookieString) {
      return null;
    }

    // - Parse cookie using the provided `key`
    return KameleoonUtils.getCookieValue(cookieString, key);
  }

  public setData({
    visitorCode,
    response,
    domain,
    maxAge,
    key,
    path,
  }: SetDataParametersType): void {
    // - Set cookie to request using provided parameters
    let resultCookie = `${key}=${visitorCode}; Max-Age=${maxAge}; Path=${path}`;

    if (domain) {
      resultCookie += `; Domain=${domain}`;
    }

    response.setHeader("Set-Cookie", resultCookie);
  }
}
