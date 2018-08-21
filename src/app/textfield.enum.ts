enum TextfieldType {
  Default, // Box
  Outlined,
  Textarea,
  Fullwidth,
  FullwidthTextArea,
}

enum TextfieldParameters {
  LeadingIcon,
  TrailingIcon,
  HelperText,
}

enum TextfieldHelperTextStyles {
  Default,
  Persistent,
  ValidationMsg,
  PersistentValidationMsg,
}

enum TextfieldStates {
  Default,
  Focused,
  // Hovered,
  Invalid,
  FocusedInvalid,
  Disabled,
}

export {TextfieldType, TextfieldParameters, TextfieldStates, TextfieldHelperTextStyles};
