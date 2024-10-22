"use client";
import { Button } from "@/components/ui";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function NotFound() {
  const [clicks, setClicks] = useState(0);
  const [showMessage, setShowMessage] = useState(false);

  const phrases = [
    "The robot looks at you with disapproval.",
    "Don't give up!",
    "Really? That's all?",
    "Do you think Ben Affleck and J.Lo will get back together (one more time) in about 20 years?",
    "Nice try, but no.",
    "What if all job titles used feminine forms, like doctor becomes doctoressa?",
    "You call that a challenge?",
    "Keep pushing, you can do it!",
    "Seriously, is that your best effort?",
    "Step it up, my friend!",
    "You've got to be kidding me!",
    "Are we playing hide and seek with that enthusiasm?",
    "Do you think this is a walk in the park?",
    "You can do better than this!",
    "What if unicorns actually exist?",
    "Is that your final answer?",
    "Could you be any less motivated?",
    "Maybe try a little harder next time?",
    "What if every snack was healthy?",
    "Is that all you can muster?",
    "Wouldn't it be weird if fish had legs?",
    "Try harder; I believe in you!",
    "Could you bring a little more energy?",
    "If cats ruled the world, would we all be their servants? Stop! We're already!",
    "You could totally surprise me if you really tried!",
  ];

  const getRandomPhrase = () => {
    return phrases[Math.floor(Math.random() * phrases.length)];
  };

  const handleMouseEnter = () => {
    if (clicks < 5) {
      setClicks(clicks + 1);
    }
  };

  const handleMouseLeave = () => {
    if (clicks === 5) {
      setClicks(0);
    }
    setShowMessage(true);
  };

  const getButtonClass = () => {
    switch (clicks) {
      case 1:
        return "translate-x-80";
      case 2:
        return "-translate-x-24";
      case 3:
        return "-translate-x-80";
      case 4:
        return "translate-x-40";
      case 5:
        return "opacity-0 cursor-default";
      default:
        return "";
    }
  };

  return (
    <div className="h-screen grid">
      <div className="h-full flex flex-col justify-center items-center">
        <video
          src="/assets/404.webm"
          autoPlay
          loop
          muted
          playsInline
          className="w-5/6 h-5/6"
        />
        <div className="flex flex-col gap-4 items-center">
          <Button
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`transform transition-all duration-500 ${getButtonClass()} w-fit`}
          >
            Go to home <ArrowRight size={20} />
          </Button>

          <Link href="/">
            <span
              className="mt-4 underline hover:no-underline"
              title="You got it!"
            >
              {showMessage
                ? getRandomPhrase()
                : "Click here to return to the homepage."}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
