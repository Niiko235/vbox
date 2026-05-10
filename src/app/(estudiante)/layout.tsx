
// import { redirect } from "next/navigation";
import type { Metadata } from "next";
const APP_NAME = "VBox";

export const metadata: Metadata = {
  title: {
    template: "%s | " + APP_NAME,
    default: APP_NAME,
  },
  description: "VBox",
};
export default async function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const userRole = await getUserRole();

  // if (userRole !== "teacher") {
  //   redirect("/dashboard");
  // }
  // if (userRole !== "admin") {
  //   redirect("/dashboard");
  // }
  return <>{children}</>;
}
