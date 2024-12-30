"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { TypeAnimation } from "react-type-animation";
import { Github, Linkedin, Twitter } from "lucide-react";
import { useTheme } from "next-themes";

export function Hero() {
  const { theme, setTheme } = useTheme();
  return (
    <section className="min-h-screen flex items-center justify-center bg-[url('/hero-bg.jp')] bg-cover bg-center bg-no-repeat">
      <div
        className={`absolute inset-0  backdrop-blur-lg $
      {theme === "dark" ? "bg-black/80" : "bg-white/20"}
        `}
      ></div>
      <div className="relative z-10 text-center ">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-10">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-500 via-orange-500 to-yellow-500">
              Mrutunjay Yadav
            </span>
          </h1>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-xl md:text-2xl mb-8">
            I'm a{" "}
            <TypeAnimation
              sequence={["Full Web Developer", 2000, "UI/UX Designer", 2000]}
              wrapper="span"
              cursor={true}
              repeat={Infinity}
              className="font-bold text-teal-400"
            />
          </h2>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-8"
        >
          <div className="flex justify-center space-x-4 mb-6">
            <a
              href="https://github.com/Mrutunjay113/"
              className="text-muted-foreground hover:text-white transition-colors"
            >
              <Github className="h-6 w-6" />
            </a>
            <a
              href="https://www.linkedin.com/in/mrutunjay-yadav-48a856168/"
              className="text-muted-foreground hover:text-white transition-colors"
            >
              <Linkedin className="h-6 w-6" />
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-white transition-colors"
            >
              <Twitter className="h-6 w-6" />
            </a>
          </div>
          <Button asChild variant="default" size="lg" className="mr-4">
            <a href="#projects">View My Work</a>
          </Button>
          <Button asChild variant="outline" size="lg">
            <a href="#contact">Contact Me</a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
