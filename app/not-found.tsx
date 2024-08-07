import Link from "next/link";


export default function NotFound(): React.JSX.Element {
    return (
        <div className="flex flex-col gap-5 items-center justify-center h-screen">
            <h1 className="text-4xl font-bold text-black/60">404 - Page Not Found</h1>
            <Link href="/" className="border px-5 py-2 rounded-lg border-primary-100 text-primary-100">Search Github Account</Link>
        </div>
    )
}