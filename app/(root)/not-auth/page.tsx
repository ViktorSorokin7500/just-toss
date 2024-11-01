import { Title } from "@/components/shared";
import { Button } from "@/components/ui";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <div className="flex flex-col items-center mt-40">
      <div className="flex items-center justify-between w-[840px] gap-12">
        <div className="flex flex-col">
          <div className="w-[445px]">
            <Title
              size="lg"
              text="You are not authorized to access this page"
            />
            <p className="text-gray-400 text-lg">
              Please login to access this page
            </p>
          </div>

          <div className="flex gap-5 mt-11">
            <Link href="/">
              <Button variant="outline" className="gap-2">
                <ArrowLeft size={16} />
                Home page
              </Button>
            </Link>
            <a href="">
              <Button
                variant="outline"
                className="text-gray-500 border-gray-400 hover:bg-gray-50"
              >
                Refresh
              </Button>
            </a>
          </div>
        </div>
        <img src="/assets/images/lock.png" alt="Not authorized" width={300} />
      </div>
    </div>
  );
}
