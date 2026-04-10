import React from "react";

type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  size?: AvatarSize;
  fallback?: string;
  rounded?: boolean;
}

const sizeStyles: Record<AvatarSize, string> = {
  xs: "w-6 h-6 text-xs",
  sm: "w-8 h-8 text-sm",
  md: "w-10 h-10 text-base",
  lg: "w-12 h-12 text-lg",
  xl: "w-16 h-16 text-xl",
};

export function Avatar({
  src,
  alt,
  size = "md",
  fallback,
  rounded = false,
  className = "",
  ...props
}: AvatarProps) {
  const initials = fallback
    ? fallback
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "?";

  const [imageError, setImageError] = React.useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div
      className={`
        flex items-center justify-center
        overflow-hidden
        bg-primary text-white font-medium
        ${sizeStyles[size]}
        ${rounded ? "rounded-full" : "rounded-lg"}
        ${className}
      `}
      {...props}
    >
      {src && !imageError ? (
        <img
          src={src}
          alt={alt || "Avatar"}
          className="w-full h-full object-cover"
          onError={handleImageError}
        />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
}

export default Avatar;
