import { Textarea } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';

const ResizableTextarea = ({textareaBg,placeholder}) => {
  const responseRef = useRef();
  const [value, setValue] = useState("");

  useEffect(() => {
    if (responseRef.current) {
      responseRef.current.style.height = "38px";
      const scrollHeight = responseRef.current.scrollHeight;
      if (scrollHeight < 300)
        responseRef.current.style.height = scrollHeight + "px";
      else responseRef.current.style.height = 300 + "px";
    }
  }, [responseRef, value]);
    return (
        <Textarea ref={responseRef} bg={textareaBg} onChange={(e)=>setValue(e.target.value)}
          placeholder={placeholder ?? "Ecrire quelque chose..."}
          sx={{
            "::-webkit-scrollbar": { display: "none" },
            "::-webkit-resizer": { display: "none" },
          }}
        ></Textarea>
    );
};

export default ResizableTextarea;