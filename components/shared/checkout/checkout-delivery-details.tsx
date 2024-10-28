import React from "react";
import { WhiteBlock } from "../white-block";
import { Input, Textarea } from "@/components/ui";
import { CheckoutCountry } from "./checkout-country";
import { State } from "country-state-city";

interface Props {
  className?: string;
}

export const CheckoutDeliveryDetails: React.FC<Props> = () => {
  const [city, setCity] = React.useState<string>("");
  const [state, setState] = React.useState<string>("");
  const [country, setCountry] = React.useState<string>("");

  const region = State.getStateByCodeAndCountry(state, country);
  console.log("region =>", region);

  console.log(
    `Delivery to city: ${city}, state: ${region?.name}, country: ${country}`
  );
  return (
    <WhiteBlock title="3. Delivery details">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <Input name="address" placeholder="Address" className="text-base" />
          <CheckoutCountry
            state={state}
            country={country}
            setCity={setCity}
            setState={setState}
            setCountry={setCountry}
          />
        </div>

        <Textarea rows={5} className="text-base" placeholder="Comment" />
      </div>
    </WhiteBlock>
  );
};
