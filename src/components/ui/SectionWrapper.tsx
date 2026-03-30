import { ReactNode } from "react";

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
  size?: "compact" | "standard" | "large";
  fullBleed?: boolean;
}

export default function SectionWrapper({
  children,
  className = "",
  size = "standard",
  fullBleed = false,
}: SectionWrapperProps) {
  const paddingMap = {
    compact:  "py-section-sm",
    standard: "py-section",
    large:    "py-section-lg",
  };

  return (
    <section className={`${paddingMap[size]} ${className}`}>
      {fullBleed ? (
        children
      ) : (
        <div className="mx-auto max-w-[1400px] px-6 md:px-12 lg:px-20">
          {children}
        </div>
      )}
    </section>
  );
}
