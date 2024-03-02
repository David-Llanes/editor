import Workspace from "@/components/Workspace";
import Navbar from "@/components/Navbar";

export default function Page() {
  return (
    <main className="overflow-hidden">
      <Navbar />
      <section className="flex h-full flex-row">
        <Workspace />
      </section>
    </main>
  );
}

// Falta poner un loading en este nivel
