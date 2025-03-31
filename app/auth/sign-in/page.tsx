import { redirect } from "next/navigation";

import { auth, signIn } from "@/auth";
import SignInForm from "@/components/signin/signInForm";
import { Button } from "@heroui/button";
import { IconBrandGoogleFilled } from "@tabler/icons-react";
import { siteConfig } from "@/config/site";
import Link from "next/link";

export default async function SignInPage() {
  const session = await auth();
  const user = session?.user;

  if (user) redirect('/');

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 w-full">
      <SignInForm />
      <div className="text-center">OR</div>
      <form action={async () => {
        "use server";
        await signIn('google');
      }} className="w-full md:w-96 flex items-center justify-center">

        <Button className="w-full flex items-center justify-center" color="default" type="submit" variant="flat">
          <IconBrandGoogleFilled size={20} className="mr-4" />
          Sign In with Google
        </Button>

      </form>
      <div className="text-center mt-2">Don&apos;t have a account? <Link className="text-primary-500 hover:text-primary-400" href={siteConfig.navSignUps[0].href}>{siteConfig.navSignUps[0].label}</Link></div>
    </section>

  );
}
