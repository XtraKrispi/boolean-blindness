import React, { useReducer } from "react";
import { Aligned } from "./Demo3.styles";
import { RadioButton, CenteredDisplay, Container, TextBox } from "../helpers";

type ContactMethod = "phone" | "email";

interface Model {
  firstName: string;
  lastName: string;
  phoneNumber: string | null;
  emailAddress: string | null;
  contactMethod: ContactMethod;
}

type Action =
  | { type: "UPDATE_FIRSTNAME"; firstName: string }
  | { type: "UPDATE_LASTNAME"; lastName: string }
  | { type: "UPDATE_PHONENUMBER"; phoneNumber: string }
  | { type: "UPDATE_EMAIL"; email: string }
  | { type: "CHANGE_CONTACTMETHOD"; contactMethod: ContactMethod };

const reducer = (state: Model, action: Action): Model => {
  switch (action.type) {
    case "CHANGE_CONTACTMETHOD":
      return { ...state, contactMethod: action.contactMethod };
    case "UPDATE_EMAIL":
      return { ...state, emailAddress: action.email };
    case "UPDATE_FIRSTNAME":
      return { ...state, firstName: action.firstName };
    case "UPDATE_LASTNAME":
      return { ...state, lastName: action.lastName };
    case "UPDATE_PHONENUMBER":
      return { ...state, phoneNumber: action.phoneNumber };
  }
};

export const Demo3 = () => {
  const [model, dispatch] = useReducer(reducer, {
    firstName: "",
    lastName: "",
    phoneNumber: null,
    emailAddress: null,
    contactMethod: "email",
  });
  return (
    <CenteredDisplay>
      <Container>
        <form>
          <TextBox
            type="text"
            placeholder="First Name"
            value={model.firstName}
            onChange={(e) =>
              dispatch({ type: "UPDATE_FIRSTNAME", firstName: e.target.value })
            }
          />
          <TextBox
            type="text"
            placeholder="Last Name"
            value={model.lastName}
            onChange={(e) =>
              dispatch({ type: "UPDATE_LASTNAME", lastName: e.target.value })
            }
          />
          <Aligned>
            <RadioButton
              name="contact"
              label="Email"
              checked={model.contactMethod === "email"}
              onChange={() =>
                dispatch({
                  type: "CHANGE_CONTACTMETHOD",
                  contactMethod: "email",
                })
              }
            />
            <RadioButton
              name="contact"
              label="Phone"
              checked={model.contactMethod === "phone"}
              onChange={() =>
                dispatch({
                  type: "CHANGE_CONTACTMETHOD",
                  contactMethod: "phone",
                })
              }
            />
          </Aligned>
          {model.contactMethod === "email" ? (
            <TextBox
              type="email"
              placeholder="Email"
              value={model.emailAddress ? model.emailAddress : ""}
              onChange={(e) =>
                dispatch({ type: "UPDATE_EMAIL", email: e.target.value })
              }
            />
          ) : (
            <TextBox
              type="text"
              placeholder="Phone Number"
              value={model.phoneNumber ? model.phoneNumber : ""}
              onChange={(e) =>
                dispatch({
                  type: "UPDATE_PHONENUMBER",
                  phoneNumber: e.target.value,
                })
              }
            />
          )}
          <pre>{JSON.stringify(model, null, 2)}</pre>
        </form>
      </Container>
    </CenteredDisplay>
  );
};
