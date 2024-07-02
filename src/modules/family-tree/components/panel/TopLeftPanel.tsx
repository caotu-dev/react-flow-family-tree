import Image from "next/image";

export default function TopLeftPanel() {
  return (
    <div className="rounded-md relative">
      <Image src={"/images/logo.png"} width={80} height={60} alt="logo" />
      <h1 className="text-3xl font-bold text-green-600 dark:text-green-400">
        FamiTree
      </h1>
    </div>
  );
}
