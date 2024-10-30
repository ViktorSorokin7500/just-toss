import React from "react";
import { WhiteBlock } from "../white-block";
import { FormInput } from "./form/form-input";

interface Props {
  className?: string;
}

export const CheckoutPersonalForm: React.FC<Props> = ({ className }) => {
  return (
    <WhiteBlock title="2. Personal details" className={className}>
      <div className="grid grid-cols-2 gap-5">
        <FormInput name="firstName" placeholder="Name" className="text-base" />
        <FormInput
          name="lastName"
          placeholder="Lastname"
          className="text-base"
        />
        <FormInput name="email" placeholder="Email" className="text-base" />
        <FormInput name="phone" placeholder="Phone" className="text-base" />
      </div>
    </WhiteBlock>
  );
};
