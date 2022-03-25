import React from "react";

export type inputChangeEventHandler = React.ChangeEvent<HTMLInputElement>;

export type ChangeEvent = React.ChangeEvent<HTMLInputElement>;

export type SubmitEvent = React.FormEvent<HTMLFormElement>;

export type setValue = React.Dispatch<React.SetStateAction<string>>;
