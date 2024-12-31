"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import {
  Moon,
  Sun,
  Home,
  User,
  Briefcase,
  Mail,
  BookOpen,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "About", href: "/#about", icon: User },
  { name: "Projects", href: "/#projects", icon: Briefcase },
  { name: "Blog", href: "/blog", icon: BookOpen },
  { name: "Contact", href: "/#contact", icon: Mail },
];

const scrollToSection = (e, href) => {
  e.preventDefault();
  const targetId = href.replace("/#", "");
  const elem = document.getElementById(targetId);
  elem?.scrollIntoView({ behavior: "smooth" });
};

export function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => setMounted(true), []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "user" && password === "123") {
      setIsLoggedIn(true);
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-sm z-50 border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="text-2xl font-bold">
            YN
          </Link>
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                onClick={(e) =>
                  item.href.startsWith("/#")
                    ? scrollToSection(e, item.href)
                    : null
                }
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
          <div className="flex items-center space-x-4">
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
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <>
                  <nav className="flex flex-col space-y-4 mt-8">
                    {navItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                        onClick={(e) => {
                          setIsOpen(false);
                          if (item.href.startsWith("/#"))
                            scrollToSection(e, item.href);
                        }}
                      >
                        <item.icon className="h-5 w-5 mr-2" />
                        <span>{item.name}</span>
                      </Link>
                    ))}
                  </nav>
                  {/* <Button className="mt-4" onClick={() => setIsLoggedIn(false)}>
                    Logout
                  </Button> */}
                </>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
