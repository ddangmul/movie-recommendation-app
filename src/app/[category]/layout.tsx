import { ReactNode } from "react";

type ContentLayoutProps = {
  children: ReactNode;
};

const ContentLayout: React.FC<ContentLayoutProps> = ({ children }) => {
  return <div className="min-h-screen">{children}</div>;
};

export default ContentLayout;
