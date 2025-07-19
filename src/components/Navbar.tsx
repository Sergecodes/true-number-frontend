import { useContext } from "react";
import Link from "next/link";
import { AuthContext } from "../context/AuthContext";

const Navbar: React.FC = () => {
   const auth = useContext(AuthContext);

   return (
      <nav className="w-full bg-cerulean text-white p-4 flex justify-between items-center">
         <div className="text-lg font-bold">
            <Link href="/" className="">TrueNumber</Link>
         </div>
         {auth?.user ? (
            <div className="space-x-6">
               {/* Links visible to all authenticated users */}
               <Link href="/" className="hover:underline">Game</Link>
               <Link href="/profile" className="hover:underline">Profile</Link>
               <Link href="/history" className="hover:underline">My History</Link>
               {/* Admin-only links */}
               {auth.user.role === "admin" && (
                  <>
                     <Link href="/admin/history" className="hover:underline">All History</Link>
                     <Link href="/admin/users" className="hover:underline">Admin Panel</Link>
                  </>
               )}
               <button onClick={auth.logout} className="ml-4 text-red-200 hover:text-red-100">
                  Logout
               </button>
            </div>
         ) : (
            // If not logged in, show login/register links
            <div className="space-x-4">
               <Link href="/login" className="hover:underline">Login</Link>
               <Link href="/register" className="hover:underline">Sign Up</Link>
            </div>
         )}
      </nav>
   );
};

export default Navbar;
