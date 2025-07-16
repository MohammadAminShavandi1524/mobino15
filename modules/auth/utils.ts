import "server-only"
import { headers as getHeaders, cookies as getCookies } from "next/headers";

interface GenerateCookiesProps {
  prefix: string;
  value: string;
}

export const generateCookies = async ({
  prefix,
  value,
}: GenerateCookiesProps) => {
  const cookies = await getCookies();
  cookies.set({
    name: `${prefix}-token`,
    value: value,
    httpOnly: true,
    path: "/",
    //? for later
    // sameSite : "none",
    // domain : ""
  });
};
