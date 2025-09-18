"use client";
import { useEffect ,useState} from "react";
import axios from "axios";

import Link from "next/link";



export default  function VerifyEmail(){
   const [token, setToken] = useState("");
   const [error, setError] = useState("");
         const [verified, setVerified] = useState(false);
   const [loading, setLoading] = useState(false);
        const verifyUseremail = async () => {
            try {
             await axios.post('/api/users/verifyemail',  { token } );    
                  setVerified(false);
                  setLoading(false);
            } catch (error: unknown) {
                setError(error instanceof Error ? error.message : "An error occurred");   
                setLoading(false);
                setVerified(true);
                setError(error instanceof Error ? error.message : "An error occurred");
                setLoading(false);
            }
        }

         useEffect(() => {
            const urlToken = window.location.search.split("=")[1];
            setToken(urlToken || "");
         }, []);
         useEffect(() => {
               if(token.length>0){
                  verifyUseremail();
               }
         }, [token]);

         return (
            <div className="flex flex-col items-center justify-center min-h-screen py-2">
               {loading && (
                  <div className="flex flex-col items-center justify-center">
                     <h2 className="text-2xl font-bold">Loading...</h2>
                  </div>
               )}
               <h1 className="text-4xl font-bold">Verifying Email</h1>
               <h2 className="p-2">{token ? `${token}` : "No token"}</h2>
               {verified && (
                  <div className="flex flex-col items-center justify-center">
                     <h2 className="text-2xl font-bold">Email verified successfully</h2>
                     <Link href="/login">Login</Link>
                  </div>
               )}
               {error && (
                  <div className="flex flex-col items-center justify-center">
                     <h2 className="text-2xl font-bold">Error</h2>
                     <p>{error}</p>
                  </div>
               )}

            </div>
         )
}