import { useEffect, useId, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useThemeContext } from "../../Context/ThemeContext/ThemeContext";
import { useLocaleContext } from "../../i18n/LocaleContext";
import { usePageAnimationContext } from "../../Context/PageAnimationContext/PageAnimationContext";
import "./WhatsOnMyMind.scss";

const TARGET_URL = "https://doordarshi.de";
const TARGET_HOSTNAME = "doordarshi.de";
const CONSENT_KEY = "portfolio-whats-on-my-mind-consent";
const FALLBACK_TIMEOUT_MS = 4000;

type ConsentState = "needsConsent" | "accepted" | "declined";

function readConsent(): ConsentState {
  if (typeof window === "undefined") return "needsConsent";
  try {
    const v = window.localStorage.getItem(CONSENT_KEY);
    return v === "accepted" ? "accepted" : v === "declined" ? "declined" : "needsConsent";
  } catch {
    return "needsConsent";
  }
}

function writeConsent(state: Exclude<ConsentState, "needsConsent">): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(CONSENT_KEY, state);
  } catch {
    // localStorage may be blocked; fall back to in-memory state for the session.
  }
}

export default function WhatsOnMyMindPage() {
  const { darkTheme } = useThemeContext();
  const { t } = useLocaleContext();
  const { pageVariants, pageTransition } = usePageAnimationContext();

  const [consent, setConsent] = useState<ConsentState>("needsConsent");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  // Remember which element opened the dialog so we can restore focus on close.
  const dialogTriggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const initial = readConsent();
    setConsent(initial);
    if (initial === "needsConsent") {
      setDialogOpen(true);
    }
  }, []);

  // When the dialog closes, return focus to whatever opened it (or fall back
  // to <main>). Only fires after a real open→close cycle, not on initial mount.
  const wasOpenRef = useRef(false);
  useEffect(() => {
    if (dialogOpen) {
      wasOpenRef.current = true;
      return;
    }
    if (!wasOpenRef.current) return;
    wasOpenRef.current = false;
    const target =
      dialogTriggerRef.current ??
      (document.getElementById("main-content") as HTMLElement | null);
    target?.focus({ preventScroll: true });
  }, [dialogOpen]);

  useEffect(() => {
    if (consent !== "accepted") return;
    if (loaded) return;
    const timer = window.setTimeout(() => {
      setBlocked(true);
    }, FALLBACK_TIMEOUT_MS);
    return () => window.clearTimeout(timer);
  }, [consent, loaded]);

  const accept = () => {
    writeConsent("accepted");
    setBlocked(false);
    setLoaded(false);
    setConsent("accepted");
    setDialogOpen(false);
  };

  const decline = () => {
    writeConsent("declined");
    setConsent("declined");
    setDialogOpen(false);
  };

  const reopenDialog = (event?: React.MouseEvent<HTMLElement>) => {
    if (event && event.currentTarget instanceof HTMLElement) {
      dialogTriggerRef.current = event.currentTarget;
    }
    setDialogOpen(true);
  };

  const showIframe = consent === "accepted" && !blocked;
  const showBlocked = consent === "accepted" && blocked;
  const showPlaceholder = consent !== "accepted";

  return (
    <motion.div
      className={`p-WhatsOnMyMind ${darkTheme ? "" : "light"}`}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={pageTransition}
    >
      <h1 className="sr-only">{t("whatsOnMyMind.heading")}</h1>
      <div className="p-WhatsOnMyMind__stage">
        <div className="p-WhatsOnMyMind__window" role="group" aria-label={t("whatsOnMyMind.iframeTitle")}>
          <div className="p-WhatsOnMyMind__chrome">
            <div className="p-WhatsOnMyMind__lights" aria-hidden="true">
              <span className="p-WhatsOnMyMind__light p-WhatsOnMyMind__light--red" />
              <span className="p-WhatsOnMyMind__light p-WhatsOnMyMind__light--yellow" />
              <span className="p-WhatsOnMyMind__light p-WhatsOnMyMind__light--green" />
            </div>
            <div className="p-WhatsOnMyMind__address" aria-hidden="true">
              <svg
                className="p-WhatsOnMyMind__addressIcon"
                viewBox="0 0 24 24"
                width="14"
                height="14"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <span className="p-WhatsOnMyMind__addressText">{TARGET_HOSTNAME}</span>
            </div>
            <a
              className="p-WhatsOnMyMind__chromeAction"
              href={TARGET_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("whatsOnMyMind.openInNewTab")}
              title={t("whatsOnMyMind.openInNewTab")}
            >
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14 4h6v6" />
                <path d="M10 14L20 4" />
                <path d="M19 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6" />
              </svg>
            </a>
          </div>
          <div
            className="p-WhatsOnMyMind__viewport"
            data-wheel-lock="true"
            data-wheel-axis="y"
          >
            {showIframe && (
              <iframe
                ref={iframeRef}
                className="p-WhatsOnMyMind__iframe"
                src={TARGET_URL}
                title={t("whatsOnMyMind.iframeTitle")}
                onLoad={() => setLoaded(true)}
                referrerPolicy="no-referrer-when-downgrade"
                sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                loading="eager"
                allow="clipboard-read; clipboard-write"
              />
            )}
            {showBlocked && (
              <Card
                heading={t("whatsOnMyMind.blockedTitle")}
                body={t("whatsOnMyMind.blockedBody")}
                primaryAction={{
                  label: t("whatsOnMyMind.openInNewTab"),
                  href: TARGET_URL,
                }}
              />
            )}
            {showPlaceholder && (
              <Card
                heading={
                  consent === "declined"
                    ? t("whatsOnMyMind.placeholderTitle")
                    : t("whatsOnMyMind.heading")
                }
                body={
                  consent === "declined"
                    ? t("whatsOnMyMind.placeholderBody")
                    : t("whatsOnMyMind.lede")
                }
                primaryAction={{
                  label: t("whatsOnMyMind.reconsider"),
                  onClick: reopenDialog,
                }}
                secondaryAction={{
                  label: t("whatsOnMyMind.openInNewTab"),
                  href: TARGET_URL,
                }}
              />
            )}
          </div>
        </div>
      </div>

      {dialogOpen && (
        <ConsentDialog
          hostname={TARGET_HOSTNAME}
          title={t("whatsOnMyMind.consentTitle")}
          body={t("whatsOnMyMind.consentBody")}
          acceptLabel={t("whatsOnMyMind.consentAccept")}
          declineLabel={t("whatsOnMyMind.consentDecline")}
          onAccept={accept}
          onDecline={decline}
          onDismiss={() => setDialogOpen(false)}
        />
      )}
    </motion.div>
  );
}

type ActionLink =
  | { label: string; href: string; onClick?: never }
  | { label: string; onClick: () => void; href?: never };

type CardProps = {
  heading: string;
  body: string;
  primaryAction: ActionLink;
  secondaryAction?: ActionLink;
};

function Card({ heading, body, primaryAction, secondaryAction }: CardProps) {
  return (
    <div className="p-WhatsOnMyMind__card" role="region" aria-label={heading}>
      <h2 className="p-WhatsOnMyMind__cardTitle">{heading}</h2>
      <p className="p-WhatsOnMyMind__cardBody">{body}</p>
      <div className="p-WhatsOnMyMind__cardActions">
        <ActionButton action={primaryAction} variant="primary" />
        {secondaryAction && (
          <ActionButton action={secondaryAction} variant="secondary" />
        )}
      </div>
    </div>
  );
}

function ActionButton({
  action,
  variant,
}: {
  action: ActionLink;
  variant: "primary" | "secondary";
}) {
  const className = `p-WhatsOnMyMind__btn p-WhatsOnMyMind__btn--${variant}`;
  if ("href" in action && action.href) {
    return (
      <a
        className={className}
        href={action.href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {action.label}
      </a>
    );
  }
  return (
    <button type="button" className={className} onClick={action.onClick}>
      {action.label}
    </button>
  );
}

type ConsentDialogProps = {
  hostname: string;
  title: string;
  body: string;
  acceptLabel: string;
  declineLabel: string;
  onAccept: () => void;
  onDecline: () => void;
  onDismiss: () => void;
};

function ConsentDialog({
  hostname,
  title,
  body,
  acceptLabel,
  declineLabel,
  onAccept,
  onDecline,
  onDismiss,
}: ConsentDialogProps) {
  const titleId = useId();
  const bodyId = useId();
  const acceptRef = useRef<HTMLButtonElement | null>(null);
  const declineRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    acceptRef.current?.focus();
  }, []);

  // Trap Tab / Shift-Tab inside the dialog so keyboard users can't escape
  // to the (visually obscured) page beneath the modal backdrop.
  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onDismiss();
        return;
      }
      if (event.key !== "Tab") return;
      const accept = acceptRef.current;
      const decline = declineRef.current;
      if (!accept || !decline) return;

      const active = document.activeElement;
      if (event.shiftKey) {
        if (active === accept || !active || (active !== decline && active !== accept)) {
          event.preventDefault();
          decline.focus();
        }
      } else {
        if (active === decline || !active || (active !== accept && active !== decline)) {
          event.preventDefault();
          accept.focus();
        }
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onDismiss]);

  return (
    <div
      className="p-WhatsOnMyMind__dialogBackdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={bodyId}
    >
      <div className="p-WhatsOnMyMind__dialog">
        <h2 className="p-WhatsOnMyMind__dialogTitle" id={titleId}>
          {title}
        </h2>
        <p className="p-WhatsOnMyMind__dialogBody" id={bodyId}>
          {body}
        </p>
        <p className="p-WhatsOnMyMind__dialogHost">{hostname}</p>
        <div className="p-WhatsOnMyMind__dialogActions">
          <button
            ref={acceptRef}
            type="button"
            className="p-WhatsOnMyMind__btn p-WhatsOnMyMind__btn--primary"
            onClick={onAccept}
          >
            {acceptLabel}
          </button>
          <button
            ref={declineRef}
            type="button"
            className="p-WhatsOnMyMind__btn p-WhatsOnMyMind__btn--secondary"
            onClick={onDecline}
          >
            {declineLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
