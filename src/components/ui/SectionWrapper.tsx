import { ReactNode } from "react";

type Padding = "standard" | "compact" | "large";

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
  padding?: Padding;
  id?: string;
}

const paddingMap: Record<Padding, string> = {
  compact:  "py-12 md:py-16 lg:py-20",
  standard: "py-20 md:py-28 lg:py-36",
  large:    "py-24 md:py-32 lg:py-40",
};

export default function SectionWrapper({
  children,
  className = "",
  padding = "standard",
  id,
}: SectionWrapperProps) {
  return (
    <section id={id} className={`${paddingMap[padding]} ${className}`}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-20">
        {children}
      </div>
    </section>
  );
}
