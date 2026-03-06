import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { AiOutlineRight } from "react-icons/ai";
import { getIntlLocale } from "../../../i18n/localeRoutes";
import { getTimelineSourceUrl, useTimelineFeed } from "../data/useTimelineFeed";
import { useLocaleContext } from "../../../i18n/LocaleContext";
import "./HomeTimeline.scss";

type HomeTimelineProps = {
  darkTheme: boolean;
};

function parseTimelineDate(raw: string): Date | null {
  if (raw.toLowerCase() === "present") {
    return null;
  }

  const match = raw.match(/^(\d{4})-(\d{2})$/);
  if (!match) {
    return null;
  }

  const year = Number(match[1]);
  const month = Number(match[2]) - 1;
  if (!Number.isFinite(year) || !Number.isFinite(month) || month < 0 || month > 11) {
    return null;
  }

  return new Date(Date.UTC(year, month, 1));
}

function formatTimelineDate(raw: string, localeTag: string, presentLabel: string): string {
  if (raw.toLowerCase() === "present") {
    return presentLabel;
  }

  const parsed = parseTimelineDate(raw);
  if (!parsed) {
    return raw;
  }

  return new Intl.DateTimeFormat(localeTag, {
    month: "short",
    year: "numeric",
  }).format(parsed);
}

function formatPeriod(
  start: string,
  end: string,
  localeTag: string,
  presentLabel: string
): string {
  return `${formatTimelineDate(start, localeTag, presentLabel)} - ${formatTimelineDate(
    end,
    localeTag,
    presentLabel
  )}`;
}

export default function HomeTimeline({ darkTheme }: HomeTimelineProps) {
  const { locale, t } = useLocaleContext();
  const timelineState = useTimelineFeed(getTimelineSourceUrl(), locale);
  const items = timelineState.items;
  const count = items.length;
  const hasTimelineItems =
    timelineState.status === "success" && timelineState.items.length > 0;
  const [activeIndex, setActiveIndex] = useState(0);
  const [focusTop, setFocusTop] = useState(9);

  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const railRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const rafRef = useRef<number | null>(null);
  const localeTag = getIntlLocale(locale);
  const presentLabel = t("timeline.present");

  const refreshTimelineState = useCallback(() => {
    const scroller = scrollerRef.current;
    const rail = railRef.current;
    if (!scroller || !rail || count <= 0) {
      setActiveIndex(0);
      setFocusTop(9);
      return;
    }

    const scrollerRect = scroller.getBoundingClientRect();
    const viewportCenterY = scrollerRect.top + scrollerRect.height * 0.5;

    let bestIndex = 0;
    let bestDistance = Number.POSITIVE_INFINITY;
    let bestCardRect: DOMRect | null = null;

    cardRefs.current.forEach((card, index) => {
      if (!card) {
        return;
      }

      const rect = card.getBoundingClientRect();
      const cardCenter = rect.top + rect.height * 0.5;
      const distance = Math.abs(cardCenter - viewportCenterY);
      if (distance < bestDistance) {
        bestDistance = distance;
        bestIndex = index;
        bestCardRect = rect;
      }
    });

    const railRect = rail.getBoundingClientRect();
    const markerRadius = 9;
    const cardCenterInRail = bestCardRect
      ? bestCardRect.top + bestCardRect.height * 0.5 - railRect.top
      : markerRadius;
    const nextFocusTop = Math.min(
      Math.max(cardCenterInRail, markerRadius),
      Math.max(markerRadius, railRect.height - markerRadius)
    );

    setActiveIndex(bestIndex);
    setFocusTop(nextFocusTop);
  }, [count]);

  useEffect(() => {
    refreshTimelineState();

    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", refreshTimelineState);
      return () => {
        window.removeEventListener("resize", refreshTimelineState);
      };
    }

    const resizeObserver = new ResizeObserver(() => {
      refreshTimelineState();
    });

    if (scrollerRef.current) {
      resizeObserver.observe(scrollerRef.current);
    }
    if (railRef.current) {
      resizeObserver.observe(railRef.current);
    }
    cardRefs.current.forEach((card) => {
      if (card) {
        resizeObserver.observe(card);
      }
    });

    return () => {
      resizeObserver.disconnect();
    };
  }, [items, refreshTimelineState]);

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  const onScroll = () => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
    }

    rafRef.current = requestAnimationFrame(() => {
      refreshTimelineState();
      rafRef.current = null;
    });
  };

  return (
    <motion.aside
      className={`home-timeline ${darkTheme ? "" : "light"}`}
      initial={{ opacity: 0, x: 26, y: -16 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      exit={{ opacity: 0, x: 26, y: -16 }}
      transition={{ duration: 0.48, ease: "easeOut" }}
      data-wheel-lock="true"
      data-wheel-axis="y"
      aria-label={t("timeline.aria")}
    >
      <div className="timeline-header">
        <div className="timeline-heading">{t("timeline.heading")}</div>
        <a
          className="timeline-link"
          href="https://www.linkedin.com/in/abhinay-khalatkar/"
          target="_blank"
          rel="noreferrer noopener"
        >
          {t("timeline.linkedIn")}
          <AiOutlineRight />
        </a>
      </div>

      <div className="timeline-body">
        <div className="timeline-rail" ref={railRef}>
          <motion.div
            className="timeline-axis"
            initial={{ scaleY: 0, opacity: 0.45 }}
            animate={{ scaleY: 1, opacity: 1 }}
            transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
          />
          {hasTimelineItems ? (
            <motion.div
              className="timeline-focus"
              animate={{ top: focusTop }}
              transition={{ type: "spring", stiffness: 320, damping: 28, mass: 0.72 }}
            />
          ) : null}
        </div>

        <div
          className="timeline-scroll"
          ref={scrollerRef}
          onScroll={onScroll}
          data-wheel-lock="true"
          data-wheel-axis="y"
        >
          {timelineState.status === "loading" || timelineState.status === "idle" ? (
            <div className="timeline-state">{t("timeline.loading")}</div>
          ) : timelineState.status === "error" ? (
            <div className="timeline-state">
              {t("timeline.error")}
              <div className="timeline-error-message">{timelineState.message}</div>
            </div>
          ) : items.length === 0 ? (
            <div className="timeline-state">
              {t("timeline.empty")}
              <div className="timeline-error-message">
                {t("timeline.emptyHint")}
              </div>
            </div>
          ) : (
            items.map((entry, index) => {
              const isActive = index === activeIndex;
              return (
                <motion.article
                  key={entry.id}
                  className={`timeline-card ${isActive ? "active" : ""}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.08 + index * 0.045,
                    duration: 0.42,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  ref={(element) => {
                    cardRefs.current[index] = element;
                  }}
                >
                  <div className="timeline-card-type">
                    {entry.type === "education"
                      ? t("timeline.type.education")
                      : t("timeline.type.experience")}
                  </div>
                  <div className="timeline-card-title">{entry.title}</div>
                  <div className="timeline-card-org">{entry.organization}</div>
                  <div className="timeline-card-meta">
                    {formatPeriod(entry.start, entry.end, localeTag, presentLabel)}
                    {entry.location ? ` | ${entry.location}` : ""}
                  </div>
                  <p className="timeline-card-desc">{entry.description}</p>
                  {entry.skills && entry.skills.length > 0 ? (
                    <div className="timeline-tags">
                      {entry.skills.map((skill) => (
                        <span key={`${entry.id}-${skill}`} className="timeline-tag">
                          {skill}
                        </span>
                      ))}
                    </div>
                  ) : null}
                  {entry.link ? (
                    <a
                      className="timeline-card-link"
                      href={entry.link}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      {t("timeline.learnMore")}
                      <AiOutlineRight />
                    </a>
                  ) : null}
                </motion.article>
              );
            })
          )}
        </div>
      </div>
    </motion.aside>
  );
}
