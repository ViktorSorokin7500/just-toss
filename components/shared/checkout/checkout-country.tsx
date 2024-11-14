"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Country, State, City } from "country-state-city";
import { useFormContext } from "react-hook-form";

export const CheckoutCountry: React.FC = () => {
  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const country = watch("country");
  const state = watch("state");

  const countries = Country.getAllCountries();
  const states = State.getStatesOfCountry(country);
  const cities = City.getCitiesOfState(country, state);

  return (
    <div className="grid grid-cols-3 gap-5">
      <div className="flex flex-col">
        <Select onValueChange={(value) => setValue("country", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Country" />
          </SelectTrigger>
          <SelectContent>
            {countries.map((item) => (
              <SelectItem key={item.isoCode} value={item.isoCode}>
                {item.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.country && typeof errors.country === "string" && (
          <p className="text-xs text-red-500">{errors.country}</p>
        )}
      </div>
      <div className="flex flex-col">
        <Select
          disabled={!country}
          onValueChange={(value) => setValue("state", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="State" />
          </SelectTrigger>
          <SelectContent>
            {states.map((item) => (
              <SelectItem key={item.isoCode} value={item.isoCode}>
                {item.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.state && typeof errors.state === "string" && (
          <p className="text-xs text-red-500">{errors.state}</p>
        )}
      </div>
      <div className="flex flex-col">
        <Select
          disabled={!state}
          onValueChange={(value) => setValue("city", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="City" />
          </SelectTrigger>
          <SelectContent>
            {cities.map((item) => (
              <SelectItem key={item.name} value={item.name}>
                {item.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.city && typeof errors.city === "string" && (
          <p className="text-xs text-red-500">{errors.city}</p>
        )}
      </div>
    </div>
  );
};
