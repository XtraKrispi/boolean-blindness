import React, { useReducer } from "react";
import { Aligned } from "./Demo3.styles";
import { RadioButton, CenteredDisplay, Container, TextBox } from "../helpers";

type ContactMethod =
  | { type: "phone"; phoneNumber: string }
  | { type: "email"; email: string };

interface Model {
  firstName: string;
  lastName: string;
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
      if (state.contactMethod.type === "email") {
        return {
          ...state,
          contactMethod: { ...state.contactMethod, email: action.email },
        };
      }
      return state;
    case "UPDATE_FIRSTNAME":
      return { ...state, firstName: action.firstName };
    case "UPDATE_LASTNAME":
      return { ...state, lastName: action.lastName };
    case "UPDATE_PHONENUMBER":
      if (state.contactMethod.type === "phone") {
        return {
          ...state,
          contactMethod: {
            ...state.contactMethod,
            phoneNumber: action.phoneNumber,
          },
        };
      }
      return state;
  }
};

export const Demo3 = () => {
  const [model, dispatch] = useReducer(reducer, {
    firstName: "",
    lastName: "",
    contactMethod: { type: "email", email: "" },
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
              checked={model.contactMethod.type === "email"}
              onChange={() =>
                dispatch({
                  type: "CHANGE_CONTACTMETHOD",
                  contactMethod: { type: "email", email: "" },
                })
              }
            />
            <RadioButton
              name="contact"
              label="Phone"
              checked={model.contactMethod.type === "phone"}
              onChange={() =>
                dispatch({
                  type: "CHANGE_CONTACTMETHOD",
                  contactMethod: { type: "phone", phoneNumber: "" },
                })
              }
            />
          </Aligned>
          {model.contactMethod.type === "email" ? (
            <TextBox
              type="email"
              placeholder="Email"
              value={model.contactMethod.email}
              onChange={(e) =>
                dispatch({ type: "UPDATE_EMAIL", email: e.target.value })
              }
            />
          ) : (
            <TextBox
              type="text"
              placeholder="Phone Number"
              value={model.contactMethod.phoneNumber}
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
