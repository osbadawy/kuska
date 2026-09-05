import { FoodSection } from "@/components/home/FoodSection";
import { Hero } from "@/components/home/Hero";
import { MissionSection } from "@/components/home/MissionSection";
import { ProgramsSection } from "@/components/home/ProgramsSection";
import { VlogSection } from "@/components/home/VlogSection";

export default function HomePage() {
  return (
    <main>
      <Hero backgroundImage="/images/heroBackground.png"/>
      <FoodSection />
      <ProgramsSection />
      <MissionSection/>
      <VlogSection/>
    </main>
  );
}