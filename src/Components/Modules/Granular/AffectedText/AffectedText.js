import React from 'react';

import { StyledText } from './AffectedText.styled';

function AffectedText({ txt }) {
  const text = txt || 'smashed';

  return <StyledText>{text}</StyledText>;
}

export default AffectedText;
