export function DevTools() {
  if (process.env.NODE_ENV === "production") return null;

  return (
    <div className="fixed right-4 top-16 z-50 flex size-10 items-center justify-center rounded-full bg-background text-sm font-bold text-foreground shadow-sm outline outline-1 outline-secondary">
      {/* MEDIA QUERY HELPER */}
      <div className="block sm:hidden">xs</div>
      <div className="hidden sm:block md:hidden">sm</div>
      <div className="hidden md:block lg:hidden">md</div>
      <div className="hidden lg:block xl:hidden">lg</div>
      <div className="hidden xl:block 2xl:hidden">xl</div>
      <div className="hidden 2xl:block">2xl</div>
    </div>
  );
}
