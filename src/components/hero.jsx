"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { TypeAnimation } from "react-type-animation";
import { Github, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center ">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      <div className="relative z-10 text-center ">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
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
              sequence={[
                "Web Developer",
                2000,
                "UI/UX Designer",
                2000,
                "Problem Solver",
                2000,
              ]}
              wrapper="span"
              cursor={true}
              repeat={Infinity}
              className="font-bold text-purple-400"
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
            <Link
              href="#"
              className="text-white hover:text-purple-400 transition-colors"
            >
              <Github className="h-6 w-6" />
            </Link>
            <Link
              href="#"
              className="text-white hover:text-purple-400 transition-colors"
            >
              <Linkedin className="h-6 w-6" />
            </Link>
            <Link
              href="#"
              className="text-white hover:text-purple-400 transition-colors"
            >
              <Twitter className="h-6 w-6" />
            </Link>
          </div>
          <Button asChild variant="default" size="lg" className="mr-4">
            <Link href="#projects">View My Work</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="#contact">Contact Me</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
