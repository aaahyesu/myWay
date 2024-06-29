import TabBar from "@/components/tap-bar";
import { ReactNode } from "react";
import Providers from "@/components/Providers";

export default function TabLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Providers> {children} </Providers>
      <TabBar />
    </div>
  );
}
