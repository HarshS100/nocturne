interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  className?: string;
}

export function SectionTitle({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className = "",
}: SectionTitleProps) {
  const alignClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  return (
    <div className={`${alignClasses[align]} ${className}`}>
      {eyebrow && (
        <p className="font-display text-xs tracking-[0.25em] uppercase text-primary mb-3">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="font-body text-base md:text-lg text-muted-foreground mt-4 max-w-2xl leading-relaxed mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
