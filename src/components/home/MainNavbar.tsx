"use client";

import { ThemeToggle } from "../ThemeToggle";
import Link from "next/link";
import Image from "next/image";
import Container from "../Container";
import { ChevronRight, MenuIcon, Sparkle, Sparkles } from "lucide-react";
import { Avatar } from "../ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import { Toggle } from "@/components/ui/toggle";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useMemo } from "react";
import MobileNavbar from "./MobileNavbar";

const links = [
  { label: "Mis diseños", href: "/designs" },
  { label: "Plantillas", href: "/templates" },
  { label: "Canvas", href: "/canvas" },
];

const currentRoute = "/templates";

export default function MainNavbar() {
  const isLogged = true;
  // const isDesktop = useMediaQuery("(min-width: 768px)");

  // if (isDesktop)
  const navLinks = useMemo(
    () => (
      <ul className="flex gap-4 text-foreground max-md:flex-col max-md:gap-6">
        {links.map((link, index) => (
          <li
            key={index}
            className={cn(
              "relative flex-auto before:absolute before:-bottom-1 before:w-full before:scale-0 before:rounded-full before:border-2 before:border-primary before:transition-transform before:ease-in-out hover:before:scale-100",
              { "font-bold text-primary": link.href === currentRoute },
            )}
          >
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
    ),
    [],
  );
  return (
    <nav className="w-full">
      <Container>
        <div className="relative flex h-20 items-center justify-between gap-6">
          {/* Lado izquierdo */}
          <div className="flex flex-1 items-center gap-6">
            <Link href="/" className="min-w-32 shrink">
              <Image
                src="/assets/brand/logotipo.png"
                alt="Logo"
                width={156}
                height={78}
                className="max-lg:w-32"
              />
            </Link>
            <a
              target="_blank"
              aria-label="Compra en nuestra tienda en linea. KURO"
              href="https://www.kuro.com.mx"
              className="group hidden shrink-0 rounded-full px-4 py-1 text-xs shadow-sm ring-1 ring-foreground/10 transition-all hover:ring-foreground/15 sm:block"
            >
              <div className="flex flex-1 items-center justify-center gap-2">
                <Sparkles className="ease size-5 scale-75 transition-transform group-hover:rotate-6 group-hover:scale-100 group-hover:text-primary/80" />
                <span className="hidden lg:block">
                  Compra en nuestra tienda en linea.
                </span>
              </div>
            </a>
          </div>

          {/* Lado derecho */}
          <div className="flex shrink-0 items-center gap-6">
            <div className="hidden md:block">{navLinks}</div>

            <Separator
              orientation="vertical"
              className="hidden h-6 bg-primary/15 md:block"
            />

            <div className="flex items-center gap-4">
              <Button
                variant="default"
                size="sm"
                className="group hidden items-center justify-center font-bold sm:flex"
              >
                <span className="hidden lg:block">Crea un diseño</span>
                <span className="lg:hidden">Diseña</span>
                <ChevronRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Button>
              {isLogged ? (
                <DropdownMenu modal={false}>
                  <DropdownMenuTrigger
                    asChild
                    className="cursor-pointer select-none"
                  >
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback className="size-14 animate-pulse bg-foreground/40"></AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Mi perfil</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Ajustes</DropdownMenuItem>
                    <DropdownMenuItem>Diseños</DropdownMenuItem>
                    <DropdownMenuItem>Cerrar sesión</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button variant="link">Log in</Button>
              )}
              <div className="max-md:hidden">
                <ThemeToggle />
              </div>
              <div className="md:hidden">
                <MobileNavbar navLinks={navLinks} />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </nav>
  );
}
