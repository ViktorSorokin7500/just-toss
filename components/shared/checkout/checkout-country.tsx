import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Country, State, City } from "country-state-city";

interface Props {
  state: string;
  country: string;
  setCity: (value: string) => void;
  setState: (value: string) => void;
  setCountry: (value: string) => void;
}

export const CheckoutCountry: React.FC<Props> = ({
  state,
  country,
  setCity,
  setState,
  setCountry,
}) => {
  const countries = Country.getAllCountries();
  const states = State.getStatesOfCountry(country);
  const cities = City.getCitiesOfState(country, state);

  return (
    <div className="grid grid-cols-3 gap-5">
      <Select onValueChange={(value) => setCountry(value)}>
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
      <Select disabled={!country} onValueChange={(value) => setState(value)}>
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
      <Select disabled={!state} onValueChange={(value) => setCity(value)}>
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
    </div>
  );
};
