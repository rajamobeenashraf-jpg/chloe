import Link from "next/link";
export default function NotFound() {
  return <div className="flex min-h-[70svh] flex-col items-center justify-center px-6 text-center"><p className="font-display text-9xl font-black text-orange">404</p><p className="mt-4 text-lg">looks like this page got a bit too hot to handle.</p><Link href="/" className="btn btn-primary mt-8">back to home</Link></div>;
}
