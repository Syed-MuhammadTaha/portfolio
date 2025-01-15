import React from "react";
import { LavaLamp } from "@/components/acceternity/LavaLamp";
import emailjs from 'emailjs-com';
import { ToastContainer, toast } from 'react-toastify';

export function Contact() {

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const service = process.env.NEXT_PUBLIC_SERVICE_ID;
    const template = process.env.NEXT_PUBLIC_TEMPLATE_ID;
    const user = process.env.NEXT_PUBLIC_USER_ID;
    event.preventDefault();
    emailjs.sendForm(
      service as string,
      template as string,
      event.target as HTMLFormElement,
      user as string
    ).then(() => {
      toast.success('Email sent successfully!');
    }).catch(() => {
      toast.error('Failed to send email, please try again later.');
    });
  };
  return (
    <LavaLamp>
      <ToastContainer
        position="top-right" // Position of the toast (e.g., 'top-left', 'bottom-center')
        autoClose={5000} // Time in milliseconds before the toast auto closes
        hideProgressBar={false} // Whether to show the progress bar
        newestOnTop={true} // Whether new toasts appear on top
        closeButton={false} // Whether to show the close button
        theme="dark" // You can set the theme to "light" or "dark"
        pauseOnHover // Pause toast on hover
        draggable // Allow dragging the toast
      />
      <div className="absolute z-50 inset-0 flex items-center justify-center text-white mx-8">

        <div className="p-10 mx-auto max-w-xl backdrop-blur-md bg-black/60 rounded-xl">
          <h1 className="text-3xl font-bold text-center mb-4 text-neutral-400">Lets <span className="text-primary">Connect</span>!</h1>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input type='text' placeholder='Name'
              className="w-full rounded-sm p-4 bg-neutral-900 focus:border-black text-sm outline-none transition-all" name="user_name" />
            <input type='email' placeholder='Email'
              className="w-full rounded-sm p-4 bg-neutral-900 focus:border-black text-sm outline-none transition-all" name="email" />
            <input type='text' placeholder='Subject'
              className="w-full rounded-sm p-4 bg-neutral-900 focus:border-black text-sm outline-none transition-all" name="subject" />
            <textarea placeholder='Message' rows={4} className="w-full bg-neutral-900 rounded-sm text-sm px-4 pt-3 outline-none transition-all mb-5" name="message" ></textarea>
            <button type='submit' className="text-secondary border border-secondary tracking-wide text-sm font-bold rounded-sm p-4 w-full outline-none mt-4 hover:bg-secondary hover:text-black">SEND</button>
          </form>
        </div>

      </div>

    </LavaLamp>
  );
}

export default Contact;
