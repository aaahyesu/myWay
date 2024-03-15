import TabBar from "@/components/tap-bar";
import { ReactNode } from "react";

export default function TabLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      {children}
      <TabBar />
    </div>
  );
}
