import Link from "next/link";

export default function Page() {
  return (
    <div>
      <span>main content</span>
      <Link href={"/canvas"} className="ml-4 text-yellow-200">
        Canvas
      </Link>
    </div>
  );
}
