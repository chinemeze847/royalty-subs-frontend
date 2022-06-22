import { useTransition } from "@remix-run/react";

export default function TopLoaderComponent() {
  const transition = useTransition();

  if (transition.state === 'idle') return null;

  return (
    <div 
      className="fixed top-0 left-0 w-full h-dimen-md z-50 bg-color-primary animate-horizontal-loader"
    ></div>
  );
}
