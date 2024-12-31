"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const skills = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "TailwindCSS",
  "GraphQL",
  "MongoDB",
  "PostgreSQL",
  "Docker",
  "AWS",
  "Git",
  "Figma",
];

export function About() {
  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          About Me
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardContent className="p-6">
              <h3 className="text-2xl font-semibold mb-4">
                Hello, I'm Mrutunjay Yadav
              </h3>
              <p className="text-muted-foreground mb-6">
                I'm a passionate web developer with 5 years of experience in
                creating responsive and user-friendly websites. My journey in
                web development started with a curiosity for how things work on
                the internet, and it has evolved into a fulfilling career where
                I get to bring ideas to life through code.
              </p>
              <h4 className="text-xl font-semibold mb-4">My Skills</h4>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
