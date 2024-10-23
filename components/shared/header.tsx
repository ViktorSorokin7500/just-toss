import React from "react";
import { cn } from "@/lib/utils";
import { Container } from "./container";
import Image from "next/image";
import Logo from "/public/logo.png";
import Link from "next/link";
import { Button } from "../ui";
import { User } from "lucide-react";
import { SearchInput } from "./search-input";
import { CartButton } from "./cart-button";

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

        <div className="mx-10 flex-1">
          <SearchInput />
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" className="flex items-center gap-1">
            <User size={16} />
            Enter
          </Button>
          <CartButton />
        </div>
      </Container>
    </header>
  );
};
