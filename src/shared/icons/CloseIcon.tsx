import { TIcon } from "../types/icon.types";

export default function CloseIcon({
  width = 5,
  height = 5,
  color = "currentColor",
}: TIcon) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke={color}
      className={`w-${width} h-${height}`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18 18 6M6 6l12 12"
      />
    </svg>
  );
}
