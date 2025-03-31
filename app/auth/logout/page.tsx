"use server"
import { redirect } from 'next/navigation';

import { signOut } from '@/auth';

const Logout = () => {
  // logout logic here
  const signOutUser = async () => {
    "use server"
    await signOut();
    console.log("sign out is successful")
  }

  signOutUser();
  console.log("sign out is successful client")

  return redirect("/auth/sign-in")
}

export default Logout;
