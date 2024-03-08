import Link from "next/link";
import Container from "../Container";
import Image from "next/image";
import { Separator } from "../ui/separator";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="mt-44 flex h-56 w-full items-center justify-center border-t border-border bg-background">
      <Container>
        <div className="gap- flex flex-col items-center justify-center gap-4">
          <Link href="/">
            <Image
              src="/assets/brand/logotipo.png"
              alt="Logo"
              width={164}
              height={82}
            />
          </Link>
          <p className="text-sm text-muted-foreground">
            &#169; {currentYear}. Todos los derechos reservados.
          </p>
          <div className="mt-6 flex items-center gap-2 text-sm max-sm:flex-col">
            <Link
              href="/"
              className="text-center text-foreground hover:text-primary"
            >
              Términos y condiciones
            </Link>
            <Separator
              className="mx-2 h-4 text-foreground max-sm:hidden"
              orientation="vertical"
            />
            <Link href="/" className="text-foreground hover:text-primary">
              Política de privacidad
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
