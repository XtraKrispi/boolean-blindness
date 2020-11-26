import React, { useReducer } from "react";
import { CenteredDisplay, Container, TextBox } from "./Styles";

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
          <TextBox
            type="radio"
            name="contact"
            value="email"
            checked={model.contactMethod === "email"}
            onClick={() =>
              dispatch({ type: "CHANGE_CONTACTMETHOD", contactMethod: "email" })
            }
          />
          <TextBox
            type="radio"
            name="contact"
            value="phone"
            checked={model.contactMethod === "phone"}
            onClick={() =>
              dispatch({ type: "CHANGE_CONTACTMETHOD", contactMethod: "phone" })
            }
          />
          {model.contactMethod === "email" ? (
            <input
              type="email"
              value={model.emailAddress ? model.emailAddress : ""}
              onChange={(e) =>
                dispatch({ type: "UPDATE_EMAIL", email: e.target.value })
              }
            />
          ) : (
            <input
              type="email"
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
