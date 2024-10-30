import React from "react";
import { WhiteBlock } from "../white-block";
import { CheckoutCountry } from "./checkout-country";
import { FormInput, FormTextarea } from "./form";

interface Props {
  className?: string;
}

export const CheckoutDeliveryDetails: React.FC<Props> = ({ className }) => {
  return (
    <WhiteBlock title="3. Delivery details" className={className}>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <FormInput
            name="address"
            placeholder="Address"
            className="text-base"
          />
          <CheckoutCountry />
        </div>

        <FormTextarea
          name="comment"
          rows={5}
          className="text-base"
          placeholder="Comment"
        />
      </div>
    </WhiteBlock>
  );
};
