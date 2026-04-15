import { ReactNode } from "react";
import LangRenderer from "../../../components/lang";
import Image from "next/image";
import { CustomLink } from "@/components/custom-link";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { cn } from "@/lib/utils";

const Layout = ({
  children,
  params,
}: {
  children: ReactNode;
  params: { lang: string };
}) => {
  const { lang } = params;

  return (
    <main className="md:flex h-screen">
      ...
      {children}
    </main>
  );
};

export default Layout;
