interface ScrollContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function ScrollContainer({ children, className }: ScrollContainerProps) {
  return (
    <div className="relative">
      <div
        className="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-background via-background/80 to-transparent z-10"
        style={{
          maskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
        }}
      />
      <div className={`h-[calc(100vh-16rem)] overflow-y-auto ${className}`}>
        {children}
      </div>
      <div
        className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-background via-background/80 to-transparent z-10"
        style={{
          maskImage: "linear-gradient(to top, black 0%, transparent 100%)",
        }}
      />
    </div>
  );
}
