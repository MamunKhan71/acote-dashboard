import { Link } from "react-router";
import PageMeta from "../../components/common/PageMeta";

export default function NotFound() {
  return (
    <>
      <PageMeta
        title="React.js 404 Dashboard | TailAdmin - React.js Admin Dashboard Template"
        description="This is React.js 404 Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Background circuit pattern elements */}
        <div>
          <img src="login-bg.jpg" alt="login-bg" className="absolute w-full h-full inset-0 -z-10 object-cover" />
          <div className="absolute inset-0 bg-black/50 -z-10"></div>
        </div>

        {/* Content container */}
        <div className="relative z-10 w-full max-w-md p-8 mx-auto bg-[#0c2522]/80 backdrop-blur-sm border border-[#10b981]/20 rounded-lg shadow-xl text-center">
          <h1 className="text-7xl font-bold text-white mb-2">404</h1>
          <h2 className="text-2xl font-semibold text-white mb-4">Page Not Found</h2>
          <p className="text-[#a3e0d3] mb-8">
            The page you are looking for doesn't exist or has been moved.
          </p>

          <Link
            to={'/'}
            className="inline-block w-full py-3 px-4 bg-[#10b981] hover:bg-[#0d9668] text-white font-medium rounded-md transition-colors duration-200"
          >
            Return to Dashboard
          </Link>
        </div>
      </div>
    </>
  );
}
