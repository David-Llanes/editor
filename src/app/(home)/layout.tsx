import Footer from "@/components/home/Footer";
import Header from "@/components/home/Header";

export default function HomeLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      <Header />
      <main className="min-h-svh overflow-x-hidden">{children}</main>
      <Footer />
    </div>
  );
}
