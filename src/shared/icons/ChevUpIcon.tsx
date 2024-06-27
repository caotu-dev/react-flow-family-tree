import { TIcon } from "../types/icon.types";

export default function ChevUpIcon({
  width = 5,
  height = 5,
  color = "currentColor",
}: TIcon) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`w-${width} h-${height}`}
      fill={color}
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m4.5 15.75 7.5-7.5 7.5 7.5"
      />
    </svg>
  );
}
