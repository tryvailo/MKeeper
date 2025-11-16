import React from "react";

interface IconProps {
  className?: string;
  size?: number;
  strokeWidth?: number;
}

// MemoryKeeper Logo Icon - Candle/Light symbol (represents preserving memories)
export const MemoryKeeperLogo: React.FC<IconProps> = ({ 
  className = "", 
  size = 24, 
  strokeWidth = 2 
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Candle base */}
      <rect x="9" y="2" width="6" height="8" rx="1" />
      {/* Flame */}
      <path d="M12 10v4" />
      <path d="M12 14c-1.5 0-3-1-3-2.5 0-1.5 1.5-2.5 3-2.5s3 1 3 2.5c0 1.5-1.5 2.5-3 2.5z" />
      {/* Light rays */}
      <path d="M12 10l-2 2" />
      <path d="M12 10l2 2" />
    </svg>
  );
};

// Memorial/Respect Icon
export const MemorialIcon: React.FC<IconProps> = ({ 
  className = "", 
  size = 24, 
  strokeWidth = 2 
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Flower/Rose */}
      <circle cx="12" cy="8" r="3" />
      <path d="M12 11v10" />
      <path d="M8 14l4-2 4 2" />
      <path d="M8 18l4-2 4 2" />
    </svg>
  );
};

// Legacy/Letter Icon
export const LegacyIcon: React.FC<IconProps> = ({ 
  className = "", 
  size = 24, 
  strokeWidth = 2 
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Envelope with heart */}
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
      <path d="M12 13l-2-1.5" />
      <path d="M12 13l2-1.5" />
      {/* Heart */}
      <path d="M12 16c-1.5 0-3-1-3-2.5 0-1.5 1.5-2.5 3-2.5s3 1 3 2.5c0 1.5-1.5 2.5-3 2.5z" />
    </svg>
  );
};

// Peace/Mind Icon
export const PeaceIcon: React.FC<IconProps> = ({ 
  className = "", 
  size = 24, 
  strokeWidth = 2 
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Dove/Peace symbol */}
      <path d="M12 2c-5 0-9 4-9 9s4 9 9 9 9-4 9-9-4-9-9-9z" />
      <path d="M12 8l-2 2 2 2 2-2-2-2z" />
      <path d="M8 12h8" />
    </svg>
  );
};

// Family Unity Icon
export const FamilyIcon: React.FC<IconProps> = ({ 
  className = "", 
  size = 24, 
  strokeWidth = 2 
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Connected hearts */}
      <path d="M7 12c-1.5 0-3-1-3-2.5 0-1.5 1.5-2.5 3-2.5s3 1 3 2.5c0 1.5-1.5 2.5-3 2.5z" />
      <path d="M12 12c-1.5 0-3-1-3-2.5 0-1.5 1.5-2.5 3-2.5s3 1 3 2.5c0 1.5-1.5 2.5-3 2.5z" />
      <path d="M17 12c-1.5 0-3-1-3-2.5 0-1.5 1.5-2.5 3-2.5s3 1 3 2.5c0 1.5-1.5 2.5-3 2.5z" />
      {/* Connection lines */}
      <path d="M10 12h2" />
      <path d="M14 12h2" />
    </svg>
  );
};

// Trust/Security Icon
export const TrustIcon: React.FC<IconProps> = ({ 
  className = "", 
  size = 24, 
  strokeWidth = 2 
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Shield with checkmark */}
      <path d="M12 2L4 5v7c0 5.5 3.8 10.7 8 12 4.2-1.3 8-6.5 8-12V5l-8-3z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
};

