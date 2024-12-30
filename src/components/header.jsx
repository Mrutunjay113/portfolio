"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { Moon, Sun, Home, User, Briefcase, Mail, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "About", href: "/#about", icon: User },
  { name: "Projects", href: "/#projects", icon: Briefcase },
  { name: "Blog", href: "/blog", icon: BookOpen },
  { name: "Contact", href: "/#contact", icon: Mail },
];

export function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => setMounted(true), []);

  return (
    <header className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-sm z-50 border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="text-2xl font-bold">
            MY
          </Link>
          <nav className="flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setActive(item.name.toLowerCase())}
                className={`flex items-center text-sm font-medium  text-muted-foreground hover:text-primary transition-colors
                ${active === item.name.toLowerCase() ? "text-primary" : ""}  
                `}
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="flex items-center"
                >
                  <item.icon className="h-5 w-5 mr-2" />
                  <span>{item.name}</span>
                </motion.div>
              </Link>
            ))}
          </nav>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {mounted &&
              (theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              ))}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
