"use client";
import React, { createContext, useReducer } from "react";

// Define the initial state
const initialState = {
  referred_by: "",
  name: "",
  email: "",
  gender: "",
  subject: "",
  dob: "",
  state: "",
  city: "",
  pincode: "",
  language: "",
  mobilenumber: "",
  countryIso: "",
  countryCode: "",
  countryName:"",
  currencySymbol:"",
  aadhar: "",
  profileImage: null,
  educations: [], // Store education data here
  certifications: [],
  introduction: "",
  youtubeLink: "",
  thumbnail: "",
  video: null,
  availability: {
    Monday: [{ from: "00:00", to: "00:00" }],
    Tuesday: [{ from: "00:00", to: "00:00" }],
    Wednesday: [{ from: "00:00", to: "00:00" }],
    Thursday: [{ from: "00:00", to: "00:00" }],
    Friday: [{ from: "00:00", to: "00:00" }],
    Saturday: [{ from: "00:00", to: "00:00" }],
    Sunday: [{ from: "00:00", to: "00:00" }],
  },
  experience: "",
  baseRate: "",
  referral_code: "",
};

// Define the reducer
const formReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_FORM_DATA":
      return { ...state, ...action.payload };

    case "UPDATE_PROFILE_IMAGE":
      return { ...state, profileImage: action.payload };

    case "RESET_FORM_DATA":
      return initialState;

    default:
      return state;
  }
};

// Create the context
export const FormContext = createContext();

// Create the provider component
export const FormProvider = ({ children }) => {
  const [state, dispatch] = useReducer(formReducer, initialState);

  return (
    <FormContext.Provider value={{ state, dispatch }}>
      {children}
    </FormContext.Provider>
  );
};
