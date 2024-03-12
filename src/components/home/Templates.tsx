import React from "react";
import Container from "../Container";
import Cards from "./Cards";

export default function Templates() {
  return (
    <Container>
      <section className="mt-24 flex w-full flex-col gap-4">
        <div className="grid auto-rows-[auto_200px] grid-cols-autofill gap-8">
          <Cards />
        </div>
      </section>
    </Container>
  );
}
