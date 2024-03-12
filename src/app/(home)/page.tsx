import HeroSection from "@/components/home/HeroSection";
import Templates from "@/components/home/Templates";

export default function Page() {
  return (
    <div className="flex w-full flex-col gap-8 sm:gap-4">
      <HeroSection />
      <Templates />
    </div>
  );
}
