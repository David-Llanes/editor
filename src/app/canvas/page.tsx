import Live from "@/components/Live";
import Navbar from "@/components/Navbar";

export default function Page() {
  return (
    <main className="h-svh overflow-hidden">
      <Navbar />
      <section className="flex h-full flex-row">
        <Live />;
      </section>
    </main>
  );
}

// Falta poner un loading en este nivel
