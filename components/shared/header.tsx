import React from "react";
import { cn } from "@/lib/utils";
import { Container } from "./container";
import Image from "next/image";
import Logo from "/public/logo.png";
import Link from "next/link";
import { Button } from "../ui";
import { ArrowRight, ShoppingCart, User } from "lucide-react";

interface Props {
  className?: string;
}

export const Header: React.FC<Props> = ({ className }) => {
  return (
    <header className={cn(className, "border border-b")}>
      <Container className="flex items-center justify-between py-8">
        <Link href="/" className="flex items-center gap-4">
          <Image src={Logo} alt="Logo" width={60} height={60} />
          <div className="flex flex-col">
            <h2 className="text-3xl uppercase font-black">Just Toss</h2>
            <span className="text-sm text-gray-400 leading-3">
              Health in harmony with nature
            </span>
          </div>
        </Link>
        {/* Search */}

        <div className="flex items-center gap-3">
          <Button variant="outline" className="flex items-center gap-1">
            <User size={16} />
            Enter
          </Button>
          <Button className="group relative">
            <b>$110</b>
            <span className="h-full w-[1px] bg-white/30 mx-3" />
            <div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
              <ShoppingCart size={16} className="relative" strokeWidth={2} />
              <b>3</b>
            </div>
            <ArrowRight
              size={20}
              className="absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
            />
          </Button>
        </div>
      </Container>
    </header>
  );
};
