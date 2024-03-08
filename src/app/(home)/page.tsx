import HeroSection from "@/components/home/HeroSection";
import Templates from "@/components/home/Templates";
import { Separator } from "@/components/ui/separator";

export default function Page() {
  return (
    <div className="flex w-full flex-col gap-8 sm:gap-4">
      <HeroSection />
      {/* <Separator /> */}
      <Templates />
    </div>
  );
}
