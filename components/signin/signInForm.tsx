"use client"
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { useFormState, useFormStatus } from "react-dom";

import { signInAction } from "@/actions/signInAction";
import AlertCard from "@/components/alertCards";

export default function SignInForm() {

  const initialState = {
    message: "",
    success: false,
  }

  const {pending} = useFormStatus();
  const [state, formAction] = useFormState(signInAction, initialState);




  return (
    <>
      <div className="flex flex-col items-center justify-center gap-4 py-8 md:pt-10 w-full">
        <h2 className="text-5xl font-regular">Sign In</h2>

        {state?.message != ""?<AlertCard className="mt-4" message={state.message}/>:<></>}

        <form action={formAction} className="grid grid-cols-6 gap-4 mt-10 w-full md:w-96">
          <Input isRequired className="col-span-6" id="email" label="Email" name="email" type="email" />
          <Input isRequired className="col-span-6" id="password" label="Password" name="password" type="password" />

          <Button className="bg-gray-800 dark:bg-white dark:text-gray-800 text-white my-4 col-start-1 col-end-7" color="default" isDisabled={pending} isLoading={pending} type="submit" variant="shadow">
            Submit
          </Button>

        </form>
        

      </div>
    </>
  )
}
