import { SVGProps } from "react";

export function Opacity(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M19 13v-2h2v2zm2-4V7h-2v2zm0-6h-2v2h2zm-4 12h2v-2h-2zm4 2v-2h-2v2zm-8 0v-2h2v-2h-2v-2h2V9h-2V7h2V5h-2V3H3v18h10v-2h2v-2zm2 4h2v-2h-2zm2-18h-2v2h2zm0 8h2V9h-2zm-2 6h2v-2h-2zm2 2h2v-2h-2zm4 2v-2h-2v2zM15 9h2V7h-2zm0 4h2v-2h-2zm2-8v2h2V5z"
      />
    </svg>
  );
}

export function Borders(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M3.975 20q-.425 0-.7-.288T3 19q0-.425.3-.712T4.025 18q.425 0 .7.288T5 19q0 .425-.3.713T3.975 20m4 0q-.425 0-.7-.288T7 19q0-.425.3-.712T8.025 18q.425 0 .7.288T9 19q0 .425-.3.713T7.975 20m4 0q-.425 0-.7-.288T11 19q0-.425.288-.712T12 18q.425 0 .713.288T13 19q0 .425-.3.713t-.725.287M16 20q-.425 0-.712-.288T15 19q0-.425.3-.712t.725-.288q.425 0 .7.288T17 19q0 .425-.288.713T16 20m4 0q-.425 0-.712-.288T19 19q0-.425.288-.712T20 18q.425 0 .713.288T21 19q0 .425-.288.713T20 20M3.975 16q-.425 0-.7-.288T3 15q0-.425.288-.712T4 14h3.025q.425 0 .7.288T8 15q0 .425-.288.713T7 16zm6.5 0q-.425 0-.7-.288T9.5 15q0-.425.288-.712T10.5 14h3.025q.425 0 .7.288T14.5 15q0 .425-.288.713T13.5 16zm6.5 0q-.425 0-.7-.288T16 15q0-.425.288-.712T17 14h3.025q.425 0 .7.288T21 15q0 .425-.288.713T20 16zm-13-4q-.425 0-.7-.288T3 11q0-.425.288-.712T4 10h6.025q.425 0 .7.288T11 11q0 .425-.288.713T10 12zm10 0q-.425 0-.7-.288T13 11q0-.425.288-.712T14 10h6.025q.425 0 .7.288T21 11q0 .425-.288.713T20 12zM4 8q-.425 0-.712-.288T3 7V5q0-.425.288-.712T4 4h16q.425 0 .713.288T21 5v2q0 .425-.288.713T20 8z"
      />
    </svg>
  );
}

export function DotLine(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M21.707 2.297a1 1 0 0 1 0 1.414l-.5.5a1 1 0 1 1-1.414-1.414l.5-.5a1 1 0 0 1 1.414 0m-4.004 4a1 1 0 0 1 0 1.414l-.997.997a1 1 0 1 1-1.414-1.414l.997-.997a1 1 0 0 1 1.414 0m-4.496 4.496a1 1 0 0 1 0 1.414l-1 1a1 1 0 0 1-1.414-1.414l1-1a1 1 0 0 1 1.414 0M8.703 16.71a1 1 0 1 0-1.414-1.414l-.998.997a1 1 0 1 0 1.414 1.415zm-4.491 4.496a1 1 0 0 0-1.414-1.414l-.5.5a1 1 0 0 0 1.414 1.414z"
      />
    </svg>
  );
}

export function DashLine(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M2 12a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2H3a1 1 0 0 1-1-1m7.5 0a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1m7.5 0a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1"
      />
    </svg>
  );
}

export function NoBorder(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <g
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="m4.9 4.9l14.2 14.2" />
      </g>
    </svg>
  );
}

export function TextBold(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <g fill="none">
        <path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
        <path
          fill="currentColor"
          d="M13 2.5a5.5 5.5 0 0 1 4.213 9.036a5.5 5.5 0 0 1-2.992 9.96L14 21.5H6.1a1.6 1.6 0 0 1-1.593-1.454L4.5 19.9V4.1a1.6 1.6 0 0 1 1.454-1.593L6.1 2.5zm1 11H7.5v5H14a2.5 2.5 0 0 0 0-5m-1-8H7.5v5H13a2.5 2.5 0 0 0 0-5"
        />
      </g>
    </svg>
  );
}

export function TextItalic(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M19 4h-9m4 16H5M15 4L9 20"
      />
    </svg>
  );
}

export function TextUnderline(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 16 16"
      {...props}
    >
      <path
        fill="currentColor"
        d="M4 13.75a.75.75 0 0 1 .75-.75h6.5a.75.75 0 0 1 0 1.5h-6.5a.75.75 0 0 1-.75-.75M4.75 2a.75.75 0 0 1 .75.75V8a2.5 2.5 0 1 0 5 0V2.75a.75.75 0 0 1 1.5 0V8a4 4 0 1 1-8 0V2.75A.75.75 0 0 1 4.75 2"
      />
    </svg>
  );
}

export function TextCross(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M13.848 11.5H19.5a1 1 0 0 1 0 2h-2.387a4.03 4.03 0 0 1 .998 2.685c0 2.928-3.28 4.914-7.033 4.478c-2.328-.27-3.965-1.219-4.827-2.832c-.26-.487-.207-1.016.248-1.331c.455-.316 1.256-.099 1.516.388c.533.998 1.604 1.592 3.294 1.789c2.586.3 4.802-.91 4.802-2.492c0-1.099-.547-1.94-2.107-2.685H5a1 1 0 1 1 0-2h8.812zM6.987 9.695a5.122 5.122 0 0 1-.298-.51c-.3-.59-.468-1.214-.435-1.835c.16-2.965 2.934-4.713 6.602-4.287c2.26.263 3.99 1.084 5.147 2.487a.993.993 0 0 1-.153 1.4c-.426.351-1.049.326-1.4-.1c-.813-.985-2.068-1.596-3.825-1.8c-2.56-.298-4.371.718-4.371 2.323c0 .714.239 1.22.762 1.81c.225.254.647.525 1.265.815H7.192a38.03 38.03 0 0 1-.205-.303"
      />
    </svg>
  );
}

export function TextAlign(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M21 6H3m14 6H7m12 6H5"
      />
    </svg>
  );
}

export function TextAa(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M21 14h-5m0 2v-3.5a2.5 2.5 0 0 1 5 0V16M4.5 13h6M3 16l4.5-9l4.5 9"
      />
    </svg>
  );
}
