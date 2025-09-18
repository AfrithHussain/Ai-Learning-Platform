import { Github, Linkedin } from "lucide-react";
import Image from "next/image";

import Link from "next/link";


const links = [
  { title: "Home", href: "#home" },
  { title: "About", href: "#about" },
  { title: "Features", href: "#features" },
  { title: "Pricing", href: "#pricing" },
  { title: "Contact", href: "#contact" },
  
];

export default function FooterSection() {
  return (
    <footer id="contact" className="py-16 md:py-24 dark:border-t-neutral-800  border ">
      <div className="mx-auto max-w-6xl px-6 text-center md:text-left">
        {/* Logo */}
       <div className="flex items-center justify-around ">
         {/* flex 1 */}
         <div className="">
            <Link
          href="/"
          aria-label="Go home"
          className="mx-auto md:mx-0 block w-fit"
        >
          {/* The component's CSS will hide the logo when collapsed */}
        <Image alt="logo-light" className="block dark:hidden mt-2 mx-auto " width={160} height={45} src="/logo.png" />
         <Image alt="logo-dark" className="hidden dark:block mt-2 mx-auto" width={160} height={45} src="/logo-dark.png" />
        </Link>

        {/* Navigation */}
        <div className="mt-8 flex flex-wrap justify-center md:justify-start gap-6 text-sm">
          {links.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="text-muted-foreground hover:text-primary transition-colors duration-200"
            >
              {link.title}
            </Link>
          ))}
        </div>

        {/* Socials + Contact */}
        <div className="mt-10">
          {/* Socials */}
          <div className="flex flex-wrap justify-center md:justify-start gap-6">
            
            <Link href={'https://www.linkedin.com/in/afrith-hussain/'}><Linkedin className="text-neutral-400"/></Link>
            <Link href={'https://github.com/AfrithHussain'}><Github  className="text-neutral-400"/></Link>
            {/* LinkedIn, Instagram, etc. → keep all other icons exactly as they are */}
          </div>
         </div>
          
       </div>

       {/* flex 2 */}
          {/* Contact Form */}
          {/* <div className="w-full max-w-sm text-center md:text-right">
            <p className="text-sm text-muted-foreground mb-3">
              Any questions or issues? Reach out to us:
            </p>
            <form className="flex w-full max-w-sm items-center space-x-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1"
              />
              <Button type="submit">Contact</Button>
            </form>
          </div>
           */}
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-border/30 pt-6">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            © 2025
            <span className="font-medium">Mindlyst</span>. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
