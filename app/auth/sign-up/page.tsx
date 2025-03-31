"use client";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { useEffect, useState } from "react";

import { signIn } from "@/auth";
import AlertCard from "@/components/alertCards";
import { siteConfig } from "@/config/site";
import { IconBrandGoogleFilled } from "@tabler/icons-react";
import Link from "next/link";

export default function SignUpPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({email: "", password : "", cpassword: "", name: "", phone: ""});
  const [gotResponse, setGotResponse] = useState<string|null>(null);
  const [btnDisabled, setBtnDisabled] = useState(true)

  useEffect(() => {
    if (formData.email == "" || formData.password == "" || formData.name == "" || formData.phone == "" || formData.cpassword != formData.password){
      setBtnDisabled(true);
    } else {
      setBtnDisabled(false);
    }
  }, [formData])
  
  const handleChange = (e: any) => {
    setFormData({...formData, [e.target.name]: e.target.value});
    console.log(formData)
  };

  const handleSubmit = async (e: any) => {
    setIsLoading(true);
    try{
      const response = await fetch('/api/sign-up', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const resJson = await response.json();

      console.log(resJson);
      if (resJson.success){
        setFormData({email: "", password: "", cpassword: "", name: "", phone: ""});
      }

      setGotResponse(resJson.message);

    } catch (e) {
      setGotResponse("Error submitting the form")
    }
    setIsLoading(false);
  };


  return (
    <>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <h2 className="text-5xl font-regular">Sign Up</h2>

        {gotResponse?<AlertCard className="mt-4" message={gotResponse}/>:<></>}

        <form className="grid grid-cols-4 gap-4 mt-10 md:w-[60vw] w-full">
          <Input isRequired className="col-span-4 md:col-span-2" label="Name" name="name" type="text" value={formData.name} onChange={(e) => handleChange(e)}/>
          <Input isRequired className="col-span-4 md:col-span-2" label="Phone" name="phone" type="tel" value={formData.phone} onChange={(e) => handleChange(e)}/>
          <Input isRequired className="col-span-4" label="Email" name="email" type="email" value={formData.email} onChange={(e) => handleChange(e)}/>
          <Input isRequired className="col-span-4 md:col-span-2" label="Password" name="password" type="password" value={formData.password} onChange={(e) => handleChange(e)} />
          <Input isRequired className="col-span-4 md:col-span-2" label="Confirm Password" name="cpassword" type="password" value={formData.cpassword} onChange={(e) => handleChange(e)} />
          
          <Button className="bg-gray-800 dark:bg-white dark:text-gray-800 text-white my-4 col-span-4 md:col-span-2 lg:col-span-1" color="default" isDisabled={btnDisabled} isLoading={isLoading} type="submit" variant="shadow" onClick={handleSubmit}>
            Submit
          </Button>

        </form>
      <div className="text-center mt-2">Already have a account? <Link className="text-primary-500 hover:text-primary-400" href={siteConfig.navSignUps[1].href}>{siteConfig.navSignUps[1].label}</Link></div>
      </section>
    </>
  )
}
