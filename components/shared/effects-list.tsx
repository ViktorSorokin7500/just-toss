import React from "react";
import { cn } from "@/lib/utils";
import { effectCriteria } from "@/lib/data_details";

interface Effect {
  effect: { name: string; id: number };
  value: number;
}

interface Props {
  effects: Effect[];
  className?: string;
}

export const EffectsList: React.FC<Props> = ({ className, effects }) => {
  return (
    <div
      className={cn(
        className,
        "flex flex-wrap gap-1 mx-auto p-2 bg-stone-600 shadow rounded-lg justify-around"
      )}
    >
      {effects
        .sort((a, b) => b.value - a.value)
        .map((effect, i) => {
          const effectName = effect.effect.name.replace(/_/g, " ");

          let bgColorClass = "";

          if (effectCriteria.good.includes(effect.effect.name)) {
            bgColorClass = "bg-green-500";
          } else if (effectCriteria.neutral.includes(effect.effect.name)) {
            bgColorClass = "bg-gray-500";
          } else if (effectCriteria.bad.includes(effect.effect.name)) {
            bgColorClass = "bg-red-500";
          }

          if (effect.value <= 20) {
            bgColorClass += " opacity-70";
          } else if (effect.value > 20 && effect.value <= 40) {
            bgColorClass += " opacity-80";
          } else if (effect.value > 40 && effect.value <= 75) {
            bgColorClass += " opacity-90";
          } else if (effect.value > 75) {
            bgColorClass += " opacity-100";
          }

          return (
            <span
              key={i}
              className={`${bgColorClass} text-white text-sm text-shadow w-fit py-1 px-2 rounded-lg cursor-default shadow hover:shadow-none hover:opacity-100`}
            >
              {effectName} {effect.value}%
            </span>
          );
        })}
    </div>
  );
};
