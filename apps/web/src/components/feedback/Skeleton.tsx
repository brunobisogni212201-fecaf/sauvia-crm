import React from "react";

type SkeletonVariant = "text" | "circular" | "rectangular";
type SkeletonAnimation = "none" | "pulse" | "wave";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: SkeletonVariant;
  width?: string | number;
  height?: string | number;
  animation?: SkeletonAnimation;
}

const variantStyles: Record<SkeletonVariant, string> = {
  text: "rounded-lg",
  circular: "rounded-full",
  rectangular: "rounded-xl",
};

const animationStyles: Record<SkeletonAnimation, string> = {
  none: "",
  pulse: "animate-pulse",
  wave: "animate-shimmer",
};

export function Skeleton({
  variant = "rectangular",
  width,
  height,
  animation = "wave",
  className = "",
  ...props
}: SkeletonProps) {
  return (
    <div
      className={`
        bg-surface-container
        ${variantStyles[variant]}
        ${animationStyles[animation]}
        ${className}
      `}
      style={{
        width: width ?? (variant === "circular" ? 40 : "100%"),
        height: height ?? (variant === "text" ? 16 : 40),
      }}
      {...props}
    />
  );
}

interface CardSkeletonProps {
  showImage?: boolean;
  showContent?: boolean;
  lines?: number;
}

export function CardSkeleton({
  showImage = true,
  showContent = true,
  lines = 3,
}: CardSkeletonProps) {
  return (
    <div className="p-6 bg-white rounded-2xl shadow-md space-y-4">
      {showImage && (
        <Skeleton variant="rectangular" height={160} className="mb-4" />
      )}
      {showContent && (
        <>
          <Skeleton variant="text" width="60%" height={20} />
          <div className="space-y-2">
            {Array.from({ length: lines }).map((_, i) => (
              <Skeleton
                key={i}
                variant="text"
                width={i === lines - 1 ? "40%" : "100%"}
                height={14}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden">
      <div className="p-4 border-b border-surface-container">
        <div className="flex gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} variant="text" width="20%" height={16} />
          ))}
        </div>
      </div>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="p-4 border-b border-surface-container">
          <div className="flex gap-4">
            {[1, 2, 3, 4].map((col) => (
              <Skeleton key={col} variant="text" width="20%" height={14} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Skeleton;
