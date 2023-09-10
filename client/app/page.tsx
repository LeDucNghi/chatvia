import Image from "next/image";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function Home() {
  return redirect("/signin");
}
