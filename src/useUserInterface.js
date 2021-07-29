import React, { useState } from 'react';

// import React from 'react';

function useUserInterface() {
  const [ui, setUi] = useState({});

  return [ui, setUi];
}

export default useUserInterface;
