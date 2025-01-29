import { Fragment } from "react";
import { redirect } from "next/navigation";

import { Paths } from "@/config/app";

export default function HomeRoot() {
  redirect(Paths.HOME);

  return <Fragment>Redirecting...</Fragment>;
}
