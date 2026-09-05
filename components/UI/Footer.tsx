import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Mail,
} from "lucide-react";

const exploreLinks = [
  {
    label: "Nutrition",
    href: "/nutrition",
  },
  {
    label: "Workouts",
    href: "/workouts",
  },
  {
    label: "Lifestyle",
    href: "/lifestyle",
  },
  {
    label: "Travel",
    href: "/travel",
  },
  {
    label: "Recipes",
    href: "/recipes",
  },
];

const aboutLinks = [
  {
    label: "About Kuska",
    href: "/about",
  },
  {
    label: "My Mission",
    href: "/about#mission",
  },
  {
    label: "Vlogs",
    href: "/vlogs",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

const legalLinks = [
  {
    label: "Privacy Policy",
    href: "/privacy",
  },
  {
    label: "Terms & Conditions",
    href: "/terms",
  },
  {
    label: "Disclaimer",
    href: "/disclaimer",
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-[#211C1A] text-white">
      {/* Soft ambient background */}
      <div
        className="
          pointer-events-none
          absolute
          -right-[15%]
          -top-[40%]
          h-[600px]
          w-[600px]
          rounded-full
          bg-[#C98F84]/10
          blur-[120px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -bottom-[40%]
          -left-[10%]
          h-[500px]
          w-[500px]
          rounded-full
          bg-[#E7B6AB]/5
          blur-[120px]
        "
      />

      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 xl:px-16">
        {/* ======================================
            TOP / BRAND
        ====================================== */}

        <div className="border-b border-white/[0.08] py-16 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            {/* Brand */}
            <div>
              <Link
                href="/"
                className="inline-flex transition-opacity duration-300 hover:opacity-80"
              >
                <Image
                  src="/logo.png"
                  alt="Kuska Motion"
                  width={180}
                  height={60}
                  className="h-auto w-[150px] object-contain sm:w-[170px]"
                />
              </Link>

              <h2
                className="
                  mt-8
                  max-w-[700px]
                  font-serif
                  text-[42px]
                  leading-[0.98]
                  tracking-[-0.035em]
                  text-white
                  sm:text-[54px]
                  lg:text-[64px]
                "
              >
                Move well.
                <br />
                <span className="italic text-[#E7B6AB]">
                  Live fully.
                </span>
              </h2>

              <p className="mt-6 max-w-[500px] text-sm leading-7 text-white/50 sm:text-[15px]">
                Training, nutrition, lifestyle and travel for a
                stronger, healthier and more balanced life.
              </p>
            </div>

            {/* Social / contact */}
            <div className="lg:justify-self-end">
              <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-[#D7A39A]">
                Stay connected
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                {/* Instagram */}
                <a
                  href="https://www.instagram.com/basically_kuska/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="
                    group
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-white/[0.10]
                    bg-white/[0.05]
                    backdrop-blur-xl
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:border-[#E7B6AB]/30
                    hover:bg-[#E7B6AB]/10
                  "
                >
                  <Image
                    src="/icons/InstagramLogo.svg"
                    alt=""
                    width={18}
                    height={18}
                    className="
                      h-[18px]
                      w-[18px]
                      object-contain
                      opacity-70
                      transition-all
                      duration-300
                      group-hover:opacity-100
                    "
                  />
                </a>

                {/* Email */}
                <a
                  href="mailto:Reka.tokaji11@gmail.com"
                  aria-label="Email Kuska Motion"
                  className="
                    group
                    flex
                    h-11
                    items-center
                    gap-2
                    rounded-full
                    border
                    border-white/[0.10]
                    bg-white/[0.05]
                    px-4
                    text-xs
                    text-white/70
                    backdrop-blur-xl
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:border-[#E7B6AB]/30
                    hover:bg-[#E7B6AB]/10
                    hover:text-[#E7B6AB]
                  "
                >
                  <Mail
                    size={15}
                    strokeWidth={1.7}
                  />

                  Email me
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ======================================
            LINKS
        ====================================== */}

        <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-16">
          {/* Explore */}
          <FooterColumn title="Explore">
            {exploreLinks.map((link) => (
              <FooterLink
                key={link.href}
                href={link.href}
              >
                {link.label}
              </FooterLink>
            ))}
          </FooterColumn>

          {/* About */}
          <FooterColumn title="About">
            {aboutLinks.map((link) => (
              <FooterLink
                key={link.href}
                href={link.href}
              >
                {link.label}
              </FooterLink>
            ))}
          </FooterColumn>

          {/* Legal */}
          <FooterColumn title="Legal">
            {legalLinks.map((link) => (
              <FooterLink
                key={link.href}
                href={link.href}
              >
                {link.label}
              </FooterLink>
            ))}
          </FooterColumn>

          {/* Newsletter */}
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-[#D7A39A]">
              The good stuff
            </p>

            <p className="mt-5 max-w-[280px] text-sm leading-6 text-white/50">
              New recipes, workouts, travel moments and everyday
              inspiration.
            </p>

            <Link
              href="/newsletter"
              className="
                group
                mt-6
                inline-flex
                items-center
                gap-2
                border-b
                border-[#D7A39A]/40
                pb-1.5
                text-[12px]
                font-medium
                uppercase
                tracking-[0.14em]
                text-[#E7B6AB]
                transition-colors
                hover:border-[#E7B6AB]
              "
            >
              Join the newsletter

              <ArrowUpRight
                size={14}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </div>

        {/* ======================================
            BOTTOM
        ====================================== */}

        <div
          className="
            flex
            flex-col
            gap-4
            border-t
            border-white/[0.08]
            py-6
            text-[11px]
            text-white/35
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <p>
            © {currentYear} Kuska Motion. All rights reserved.
          </p>

          <p>
            Movement · Nutrition · Lifestyle · Travel
          </p>
        </div>

        {/* ======================================
            LARGE FOOTER WORDMARK
        ====================================== */}

        <div className="overflow-hidden border-t border-white/[0.05] pt-3">
          <p
            aria-hidden="true"
            className="
              select-none
              whitespace-nowrap
              text-center
              font-serif
              text-[21vw]
              leading-[0.72]
              tracking-[-0.07em]
              text-white/[0.025]
            "
          >
            KUSKA
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ═════════════════════════════════════
   FOOTER COLUMN
═════════════════════════════════════ */

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-[#D7A39A]">
        {title}
      </p>

      <div className="mt-5 flex flex-col items-start gap-3">
        {children}
      </div>
    </div>
  );
}

/* ═════════════════════════════════════
   FOOTER LINK
═════════════════════════════════════ */

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="
        group
        flex
        items-center
        gap-1.5
        text-[14px]
        text-white/55
        transition-all
        duration-300
        hover:translate-x-1
        hover:text-white
      "
    >
      {children}

      <ArrowUpRight
        size={11}
        className="
          translate-y-1
          opacity-0
          transition-all
          duration-300
          group-hover:translate-y-0
          group-hover:opacity-60
        "
      />
    </Link>
  );
}