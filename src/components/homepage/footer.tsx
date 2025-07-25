import { config as siteConfig } from "@/config/site";
import Link from "next/link";
import {
  RiInstagramFill,
  RiWhatsappFill,
  RiTwitterXFill,
} from "react-icons/ri";
import { MdEmail } from "react-icons/md";

const links: { href: string; title: string; icon: React.ReactNode }[] = [
  {
    href: "https://mail.google.com",
    title: "Email",
    icon: (
      <MdEmail className="h-5 w-5 text-home-footer-foreground hover:text-foreground" />
    ),
  },
  {
    href: "https://whatsapp.com",
    title: "WhatsApp",
    icon: (
      <RiWhatsappFill className="h-5 w-5 text-home-footer-foreground hover:text-foreground" />
    ),
  },
  {
    href: "https://www.instagram.com/mr.wisethetic",
    title: "Instagram",
    icon: (
      <RiInstagramFill className="h-5 w-5 text-home-footer-foreground hover:text-foreground" />
    ),
  },
  {
    href: "https://twitter.com/MrWisethetic",
    title: "Twitter",
    icon: (
      <RiTwitterXFill className="h-5 w-5 text-home-footer-foreground hover:text-foreground" />
    ),
  },
];

const internalLinks: { href: string; title: string }[] = [
  { href: "/home", title: "Home" },
  { href: "/portfolio", title: "Portfolio" },
  { href: "/services", title: "Services" },
  { href: "/account", title: "Account" },
];

export function Footer() {
  return (
    <footer className="bottom-0 border-t mt-40 grid w-full place-items-center gap-6 bg-home-footer px-10 py-14">
      <div>
        <span className="font-firaSans text-xl uppercase tracking-[0.25em] text-primary-accent">
          {siteConfig.name}
        </span>
      </div>
      <div>
        <ul className="flex gap-5 md:gap-10">
          {internalLinks.map((link) => (
            <li
              key={link.href}
              className="text-home-footer-foreground hover:text-foreground"
            >
              <Link href={link.href}>{link.title}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex w-full max-w-[800px] flex-col items-center justify-between gap-5 md:flex-row md:gap-0">
        <div className="text-home-footer-foreground">
          &copy; 2024 {siteConfig.name}
        </div>
        <div className="flex gap-4">
          {links.map((link) => {
            return (
              <div key={link.href}>
                <a href={link.href}>
                  <span className="sr-only">{link.title}</span>
                  {link.icon}
                </a>
              </div>
            );
          })}
        </div>
        <div className="text-home-footer-foreground">
          Designed by Mr.Wisethetic
        </div>
      </div>
    </footer>
  );
}
