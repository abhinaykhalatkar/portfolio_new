import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { usePageAnimationContext } from "../../Context/PageAnimationContext/PageAnimationContext";
import { useLocaleContext } from "../../i18n/LocaleContext";
import { stripLocalePrefix } from "../../i18n/localeRoutes";
import "./ProgressNav.scss";
import ScrollBtn from "./ScrollBtn";

export const navsData = [
  { Name: "00", Address: "/" },
  { Name: "01", Address: "/about" },
  { Name: "02", Address: "/skills" },
  { Name: "03", Address: "/projects" },
  { Name: "04", Address: "/contact" },
  { Name: "05", Address: "/whats-on-my-mind" },
];

// Returns the x-translation that centres the lavalamp under the active item,
// independent of total item count. Items are assumed to share `linkWidth`
// (`.NavLink { width: 100px }` in ProgressNav.scss).
export function getLavalampOffset(
  index: number,
  totalItems: number,
  linkWidth: number
): number {
  if (index < 0 || totalItems <= 0) return 0;
  return (index - (totalItems - 1) / 2) * linkWidth;
}

type ProgressNavProps = {
  endPosition: string;
};

export function ProgressNav({ endPosition }: ProgressNavProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { localizePath, t } = useLocaleContext();
  const basePath = stripLocalePrefix(location.pathname);

  const [squash, setSquash] = useState(false);
  const [prevIndex, setPrevIndex] = useState(
    navsData.findIndex((item) => item.Address === basePath)
  );

  const activeNavLinkRef = useRef<HTMLSpanElement | null>(null);
  const squashTimerRef = useRef<number | null>(null);
  const [activeLinkWidth, setActiveLinkWidth] = useState(0);

  const {
    handleSetScrollDirection,
    setActiveIndex,
    isOnMainPage,
    isVerProgressBarOpen,
  } = usePageAnimationContext();

  useEffect(() => {
    if (activeNavLinkRef.current) {
      setActiveLinkWidth(activeNavLinkRef.current.offsetWidth);
    }
  }, [isOnMainPage, basePath]);

  useEffect(() => {
    if (isOnMainPage) {
      setSquash(true);
    }
  }, [isOnMainPage]);

  useEffect(() => {
    return () => {
      if (squashTimerRef.current !== null) {
        window.clearTimeout(squashTimerRef.current);
      }
    };
  }, []);

  const activateAddress = (currentAddress: string) => {
    const index = navsData.findIndex((item) => item.Address === currentAddress);

    if (!currentAddress || index === -1) {
      return;
    }

    setActiveIndex(index);
    navigate(localizePath(currentAddress));

    handleSetScrollDirection(prevIndex >= index ? 1 : 0);
    setPrevIndex(index);

    setSquash(true);
    if (squashTimerRef.current !== null) {
      window.clearTimeout(squashTimerRef.current);
    }

    squashTimerRef.current = window.setTimeout(() => {
      setSquash(false);
      squashTimerRef.current = null;
    }, 1000);
  };

  const handleSquash = (event: React.MouseEvent<HTMLSpanElement>) => {
    const currentAddress = event.currentTarget.getAttribute("data-address") || "";
    activateAddress(currentAddress);
  };

  const handleNavKeyDown = (event: React.KeyboardEvent<HTMLSpanElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      const currentAddress =
        event.currentTarget.getAttribute("data-address") || "";
      activateAddress(currentAddress);
    }
  };

  return (
    <>
      <nav className="progress-nav-wrapper" aria-label={t("nav.sectionAria")}>
        <motion.div
          className="navigation-progress"
          initial={{
            x: `${!isVerProgressBarOpen ? "50%" : `${endPosition}`}`,
            y: `${!isVerProgressBarOpen ? "90vh" : "50vh"}`,
            rotate: `${!isVerProgressBarOpen ? 0 : -90}`,
          }}
          animate={{ x: "50%", y: "90vh", rotate: 0 }}
          transition={{
            ease: "easeOut",
            duration: 0.5,
            delay: 0,
          }}
          style={{
            bottom: "95vh",
            right: "50%",
            transform: "translateX(50%)",
            position: "fixed",
          }}
        >
          {navsData.map((item, index) => {
            const isActive = basePath === item.Address;
            return (
              <span
                key={`main-nav-${index}`}
                className={`NavLink ${isActive ? "NavActive" : ""}`}
                data-address={item.Address}
                role="button"
                tabIndex={0}
                aria-label={`${item.Name} — ${item.Address}`}
                aria-current={isActive ? "page" : undefined}
                onClick={handleSquash}
                onKeyDown={handleNavKeyDown}
                ref={isActive ? activeNavLinkRef : null}
              >
                {item.Name}
              </span>
            );
          })}

          <motion.div
            className={`lavalamp ${squash ? "squash" : ""}`}
            animate={{
              x: getLavalampOffset(
                navsData.findIndex((item) => item.Address === basePath),
                navsData.length,
                activeLinkWidth
              ),
              width: activeLinkWidth,
            }}
            transition={{ ease: "easeOut", duration: 0.3 }}
          />
        </motion.div>
      </nav>

      <ScrollBtn />
    </>
  );
}
