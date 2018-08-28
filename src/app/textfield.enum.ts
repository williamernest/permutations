enum TextfieldType {
  Default,
  Outlined,
  Textarea,
  Fullwidth,
  FullwidthTextArea,
}

enum TextfieldParameters {
  NoIcon,
  LeadingIcon,
  TrailingIcon,
  BothIcons
}

enum TextfieldHelperTextStyles {
  None,
  DefaultHelperText,
  PersistentHelperText,
  ValidationMsg,
  PersistentValidationMsg,
}

enum TextfieldStates {
  Default,
  Focused,
  Invalid,
  FocusedInvalid,
  Disabled,
}

export {TextfieldType, TextfieldParameters, TextfieldStates, TextfieldHelperTextStyles};
