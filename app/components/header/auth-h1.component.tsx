import { Link } from '@remix-run/react';

export default function AuthH1Component() {
  return (
    <Link to="/" className="block mb-dimen-md">
      <h1 className="font-bold text-3xl text-color-primary text-center">Royaltysubs</h1>
    </Link>
  );
}
