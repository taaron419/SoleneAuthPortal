export function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      aria-hidden="true"
      fill="none"
    >
      <path
        d="M16 2 L30 16 L16 30 L2 16 Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path d="M16 9 L23 16 L16 23 L9 16 Z" fill="currentColor" />
    </svg>
  )
}
