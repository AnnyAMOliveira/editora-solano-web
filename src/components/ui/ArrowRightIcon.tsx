import { cn } from "@/lib/utils";

interface ArrowRightIconProps {
  className?: string;
}

/**
 * The arrow drawn in the Figma `Botão icon` component, transcribed from the
 * exported asset (13.51 × 7.36) with the fill switched to `currentColor` so it
 * inherits the button's text color.
 */
export function ArrowRightIcon({ className }: ArrowRightIconProps) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width="13.51"
      height="7.36"
      viewBox="0 0 13.51 7.36396"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("shrink-0", className)}
    >
      <path
        d="M0.5 3.18198C0.223858 3.18198 0 3.40584 0 3.68198C0 3.95812 0.223858 4.18198 0.5 4.18198V3.68198V3.18198ZM13.3635 4.03553C13.5588 3.84027 13.5588 3.52369 13.3635 3.32843L10.1816 0.146447C9.98631 -0.0488155 9.66972 -0.0488155 9.47446 0.146447C9.2792 0.341709 9.2792 0.658291 9.47446 0.853554L12.3029 3.68198L9.47446 6.51041C9.2792 6.70567 9.2792 7.02225 9.47446 7.21751C9.66972 7.41278 9.98631 7.41278 10.1816 7.21751L13.3635 4.03553ZM0.5 3.68198V4.18198H13.01V3.68198V3.18198H0.5V3.68198Z"
        fill="currentColor"
      />
    </svg>
  );
}
