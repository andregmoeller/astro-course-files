import type { ReactNode } from "react";

const ReactWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      {children}
    </div>
  );
};

export default ReactWrapper;
