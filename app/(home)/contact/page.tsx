"use client";
import { Input, Textarea, addToast } from "@heroui/react";
import { Button } from "@heroui/button";
import { useEffect, useState } from "react";
// import { addToast } from "@heroui/toast";

export default function ContactPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({name : "", email: "", phone: "", message:"", subject:""});

  const [btnDisabled, setBtnDisabled] = useState(true)

  useEffect(() => {
    if (formData.email == "" || formData.phone == "" || formData.name == "" || formData.message == "" || formData.subject == "") {
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
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const resJson = await response.json();

      if (resJson.success){
        setFormData({name : "", email: "", phone: "", message:"", subject:""});
      }

      addToast({
        title: resJson.success ? "Thank You for Contacting Us" : "Failed to Submit the Form",
        description: resJson.message,
        color: resJson.success ? "success" : "danger",
      })



    } catch (e) {
      addToast({
        title: "Failed to Submit the Form",
        description: "An error occurred while submitting the form. Please try again later.",
        color: "danger",
      })
    }
    setIsLoading(false);
  };


  return (
    <>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <h2 className="text-5xl font-regular">Contact Us</h2>

        <div className="grid grid-cols-4 gap-4 mt-10 md:w-[60vw] w-full">
          <Input isRequired className="col-span-4 md:col-span-2" label="Name" name="name" type="text" value={formData.name} onChange={(e) => handleChange(e)}/>
          <Input isRequired className="col-span-4 md:col-span-2" label="Email" name="email" type="email" value={formData.email} onChange={(e) => handleChange(e)}/>
          <Input isRequired className="col-span-4" label="Phone" name="phone" type="tel" value={formData.phone} onChange={(e) => handleChange(e)} />
          <Input isRequired className="col-span-4" label="Subject" name="subject" type="text" value={formData.subject} onChange={(e) => handleChange(e)} />
          <Textarea
            isRequired
            className="col-span-4"
            label="Message or Feedback"
            name="message"
            placeholder="Write your message or feedback here..."
            value={formData.message} onChange={(e) => handleChange(e)}
          />
          <Button className="bg-gray-800 dark:bg-white dark:text-gray-800 text-white my-4 col-span-4 md:col-span-2 lg:col-span-1" color="default" isDisabled={btnDisabled} isLoading={isLoading} type="submit" variant="shadow" onPress={handleSubmit}>
            Submit
          </Button>

        </div>
      </section>
    </>
  )
}
