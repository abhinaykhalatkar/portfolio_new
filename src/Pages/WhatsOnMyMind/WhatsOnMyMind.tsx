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

  useEffect(() => {
    const initial = readConsent();
    setConsent(initial);
    if (initial === "needsConsent") {
      setDialogOpen(true);
    }
  }, []);

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

  const reopenDialog = () => setDialogOpen(true);

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
      <div
        className="p-WhatsOnMyMind__frame"
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

  useEffect(() => {
    acceptRef.current?.focus();
  }, []);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onDismiss();
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
