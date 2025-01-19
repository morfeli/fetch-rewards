import clsx from "clsx";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { Button } from "../ShadcnUI/Button";

interface MobileMenuProps {
  isOpen: boolean;
  closeMenu: React.MouseEventHandler<HTMLLIElement>;
  links: {
    href: string;
    label: string;
  }[];
  handleLogout: () => Promise<void>;
  isLoading: boolean;
}
const navBarVariants = {
  closed: { opacity: 0, x: 100 },
  open: { opacity: 1, x: 0 },
};

const sideVariants = {
  closed: {
    transition: {
      staggerChildren: 0.2,
      staggerDirection: -1,
    },
  },
  open: {
    transition: {
      staggerChildren: 0.2,
      staggerDirection: 1,
    },
  },
};

const MobileMenu = ({
  isOpen,
  links,
  closeMenu,
  handleLogout,
  isLoading,
}: MobileMenuProps) => {
  const navStyles =
    "lg:hidden fixed w-[200px] top-[70px] right-2 z-[51] bg-white flex flex-col items-center justify-evenly rounded-3xl border-[2px] border-[#304778]";

  const ulStyles = clsx({
    hidden: !isOpen,
    "flex flex-col justify-evenly items-center opacity-100 transition-all my-4 text-black min-h-[700px]":
      isOpen,
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          aria-label="Site Navigation"
          role="navigation"
          variants={navBarVariants}
          initial="closed"
          animate="open"
          transition={{ type: "spring", stiffness: 100 }}
          exit={{
            opacity: 0,
            x: "100%",
            transition: { delay: 0.1, duration: 0.2 },
          }}
          className={navStyles}
        >
          <motion.ul
            initial="closed"
            animate="open"
            exit="closed"
            variants={sideVariants}
            className={ulStyles}
          >
            {links.map((item) => (
              <Link key={item.href} href={item.href}>
                <li className="text-xl tracking-tight" onClick={closeMenu}>
                  {item.label}
                </li>
              </Link>
            ))}

            <Button
              variant="outline"
              onClick={handleLogout}
              disabled={isLoading}
              className="p-0 h-8 px-4 rounded-2xl bg-slate-700 text-white hover:bg-slate-800"
              aria-label={isLoading ? "Logging out" : "Logout"}
            >
              {isLoading ? "Logging out..." : "Logout"}
            </Button>
          </motion.ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
