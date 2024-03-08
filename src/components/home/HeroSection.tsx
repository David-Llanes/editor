import React from "react";
import Container from "../Container";
import Image from "next/image";
import { Button } from "../ui/button";
import { ChevronRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="flex min-h-[70vh] flex-col overflow-hidden bg-gradient-to-b from-primary/30 to-background/10">
      <div className="container mt-44 grid gap-4  lg:grid-cols-2">
        {/* Titulo y descripcion con botones */}
        <div className="flex flex-col gap-4 justify-self-start">
          <p className="-mb-4 font-bold text-primary">Rápido y fácil de usar</p>
          <h1 className="text-balance font-workSans text-5xl font-bold text-foreground md:text-6xl xl:text-7xl">
            Crea tus diseños en minutos
          </h1>
          <p className="text-pretty text-sm text-foreground sm:text-lg md:text-lg">
            Un editor minimalista con plantillas para que personalices tus
            productos con todas las funcionalidades y caracteristicas que estás
            esperando.
          </p>
          <div className="max mt-6 flex gap-4">
            <Button
              variant="default"
              size="lg"
              className="group font-bold max-md:flex-1"
            >
              <span className="hidden sm:block">Comenzar a diseñar</span>
              <span className="sm:hidden">Diseñar</span>
              <ChevronRight className="size-4 transition-transform group-hover:translate-x-2" />
            </Button>
            <Button
              variant="ghost"
              size="lg"
              className="group border border-foreground bg-transparent font-bold max-md:flex-1"
            >
              Ver plantillas
              <ChevronRight className="size-4 transition-transform group-hover:translate-x-2" />
            </Button>
          </div>
        </div>

        {/* Imagen del editor */}
        <div className="flex w-full items-center justify-center">
          <Image
            src="/assets/brand/editorSample.png"
            alt="Imagen del editor"
            width={600}
            height={500}
            className="drop-shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}
