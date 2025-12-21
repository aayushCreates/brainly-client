import { useRouter } from "next/router";
import HeroIntroSection from "../components/IntroSection";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import ProfileSection from "./profile";

export default function Home() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/home");
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated) return null;

  return (
    <div>
      <HeroIntroSection />
      <ProfileSection />
    </div>
  );
}
