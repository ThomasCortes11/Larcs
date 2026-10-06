interface TikTokIconProps {
  className?: string;
}

export function TikTokIcon({ className }: TikTokIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path d="M16.6 2h-3.2v13.3a2.8 2.8 0 1 1-2.8-2.8c.3 0 .6 0 .8.1V9.3a6 6 0 1 0 5.2 5.9V8.6a7.4 7.4 0 0 0 4.3 1.4V6.8A4.3 4.3 0 0 1 16.6 2z" />
    </svg>
  );
}
