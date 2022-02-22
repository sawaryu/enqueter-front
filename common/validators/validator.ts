
// Regex
const requiredRegex: RegExp = /\S/;
const passwordRegex: RegExp = /^[A-Za-z0-9]*$/;
const usernameRegex: RegExp = /^[A-Za-z0-9]*$/;
const emailRegex: RegExp = /^(?!.*…)[a-zA-Z0-9_+-]+(.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;

// User
export const emailRules: Array<any> = [
  (v: string) => (!!v && requiredRegex.test(v)) || "Must be required.",
  (v: string) => (!!v && emailRegex.test(v)) || "Incorrect email format.",
  (v: string) => v.length <= 255 || "Must be less than 255 characters.",
]

export const usernameRules: Array<any> = [
  (v: string) => (!!v && requiredRegex.test(v)) || "Must be required.",
  (v: string) => usernameRegex.test(v) || "Must be using half-width alphanumeric characters.",
  (v: string) => v.length <= 15 || "Must be less than 15 characters.",
]

export const passwordRules: Array<any> = [
  (v: string) => (!!v && requiredRegex.test(v)) || "Must be required.",
  (v: string) =>
    passwordRegex.test(v) ||
    "Must be using half-width alphanumeric characters.",
  (v: string) => v.length >= 8 || "Must be more than 8 characters.",
  (v: string) => v.length <= 72 || "Must be less than 72 characters.",
]

export const nicknameRules: Array<any> = [
  (v: string) => (!!v && requiredRegex.test(v)) || "Must be required",
  (v: string) => v.length <= 20 || "Must be less than 20 characters",
]

export const introduceRules: Array<any> = [
  (v: string) => v.length <= 140 || "Must be less than 15 characters",
]

// Question
export const questionRules: Array<any> = [
  (v: string) => (!!v && requiredRegex.test(v)) || "Must be required",
  (v: string) => v.length <= 140 || "Must be less than 255 characters",
]

export const optionRules: Array<any> = [
  (v: string) => (!!v && requiredRegex.test(v)) || "Must be required",
  (v: string) => v.length <= 15 || "Must be less than 15 characters",
]
