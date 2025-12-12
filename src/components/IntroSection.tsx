"use client";

import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import Image from "next/image";
import { useMemo } from "react";
import FeatureSection from "./FeatureSection";
import FAQSection from "./FaqSection";
import FeedbackSection from "./FeedbackSection";
import FooterSection from "./FooterSectiont";

export default function HeroIntroSection() {
  const particles = useMemo(
    () =>
      Array.from({ length: 40 }, () => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 4 + 2,
        duration: Math.random() * 6 + 4,
      })),
    []
  );
  return (
    <section className="relative w-full overflow-hidden bg-white text-gray-900">
      {/* Animated Background Layer  */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Layer */}
        <div className="absolute inset-0 from-white via-gray-50 to-gray-100" />

        {/* Floating Glow Orbs */}
        <motion.div
          className="absolute top-[-10%] left-[-10%] h-72 w-72 rounded-full bg-blue-200 blur-3xl opacity-40"
          animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="absolute bottom-[-15%] right-[-10%] h-80 w-80 rounded-full bg-purple-200 blur-3xl opacity-40"
          animate={{ x: [0, -60, 0], y: [0, -40, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Animated Particles */}
        {particles.map((p, i) => (
          <motion.div
            key={i}
            className="absolute bg-blue-300 rounded-full opacity-50"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: p.size,
              height: p.size,
            }}
            animate={{
              y: [0, -15, 0],
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: i * 0.1,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Light background decoration */}
      <div className="absolute inset-0 from-white via-gray-50 to-gray-100" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 pt-28 pb-24 flex flex-col items-center text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 1 }}
          animate={{
            opacity: 1,
            boxShadow: [
              "0 0 0px rgba(59,130,246,0.0)",
              "0 0 8px rgba(59,130,246,0.35)",
              "0 0 0px rgba(59,130,246,0.0)",
            ],
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
          }}
          className="mb-6 inline-flex items-center rounded-full px-4 py-1 text-sm font-medium bg-white border border-blue-300/40"
        >
          <span className="mr-2 h-2 w-2 rounded-full bg-blue-500" />
          Introducing BrainLY →
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="text-4xl font-bold leading-tight sm:text-5xl md:text-6xl 
             bg-linear-to-r from-black via-gray-700 to-gray-900
             bg-clip-text text-transparent"
        >
          Organize your mind.
          <br />
          Supercharge your thinking.
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6 max-w-2xl text-lg text-gray-600"
        >
          BrainLY is your personal second brain — save ideas, connect thoughts,
          ask AI, and remember anything effortlessly. Built for creators,
          students, and anyone who thinks for a living.
        </motion.p>

        {/* CTA Button */}
        <motion.a
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75 }}
          href="#"
          className="mt-8 inline-flex items-center rounded-md bg-blue-600 px-6 py-3 font-medium text-white shadow hover:bg-blue-700 transition"
        >
          Activate BrainLY
          <FiArrowRight className="ml-2 mt-0.5" />
        </motion.a>
      </div>

      {/* Image Mockup */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="relative mx-auto mb-10 max-w-5xl rounded-xl border border-gray-100 bg-white p-2 shadow-md"
      >
        <Image
          src="/brainly-mockup.png" // replace with your screenshot / UI mockup
          alt="BrainLY App Interface"
          width={1400}
          height={900}
          className="rounded-lg"
        />
      </motion.div>

      {/* FeatureSection */}
      <FeatureSection />

      {/* Feeback Section */}
      {/* <FeedbackSection /> */}

      {/* FAQ Section */}
      <FAQSection />

      {/* Footer Section */}
      <FooterSection />
    </section>
  );
}
