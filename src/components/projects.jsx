"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const projects = [
  {
    title: "Project 1",
    description:
      "A brief description of Project 1 and its key features. This project showcases my skills in frontend development and user interface design.",
    image: "/image.png?height=300&width=400",
    tags: ["React", "Next.js", "TailwindCSS"],
    liveUrl: "#",
    codeUrl: "#",
  },
  {
    title: "Project 2",
    description:
      "An overview of Project 2, highlighting the main functionalities and the technologies used. This project demonstrates my backend development and database management skills.",
    image: "/image.png?height=300&width=400",
    tags: ["Vue.js", "Node.js", "MongoDB"],
    liveUrl: "#",
    codeUrl: "#",
  },
  {
    title: "Project 3",
    description:
      "Details about Project 3, explaining its purpose and the problems it solves. This project illustrates my ability to create cross-platform mobile applications.",
    image: "/image.png?height=300&width=400",
    tags: ["React Native", "Firebase", "Redux"],
    liveUrl: "#",
    codeUrl: "#",
  },
];

export function Projects() {
  return (
    <section id="projects" className="py-20 bg-secondary/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          My Projects
        </motion.h2>
        <div className="space-y-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/2">
                      <h3 className="text-2xl font-semibold mb-2">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag) => (
                          <Badge key={tag} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="space-x-4">
                        <Button asChild variant="default">
                          <Link
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Live Demo
                          </Link>
                        </Button>
                        <Button asChild variant="outline">
                          <Link
                            href={project.codeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View Code
                          </Link>
                        </Button>
                      </div>
                    </div>
                    <div className="md:w-1/2">
                      <Image
                        src={project.image}
                        alt={project.title}
                        width={400}
                        height={300}
                        className="w-full h-auto object-cover rounded-md"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
