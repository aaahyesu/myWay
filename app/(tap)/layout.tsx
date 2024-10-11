import TabBar from "@/components/common/TabBar";
import { ReactNode } from "react";
import Providers from "@/components/common/Providers";

export default function TabLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Providers> {children} </Providers>
      <TabBar />
    </div>
  );
}
