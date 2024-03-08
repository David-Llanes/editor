import Workspace from "@/components/Workspace";
import Navbar from "@/components/Navbar";
import LeftNavbar from "@/components/editor/LeftNavbar";
import RightNavbar from "@/components/editor/RightNavbar";

export default function Page() {
  return (
    <main className="flex h-svh flex-col">
      <Navbar />
      <section className="content flex h-full flex-row">
        <LeftNavbar />
        <Workspace />
        <RightNavbar />
      </section>
    </main>
  );
}

// Falta poner un loading en este nivel
