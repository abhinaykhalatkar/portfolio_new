import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { AiOutlineRight } from "react-icons/ai";
import { getTimelineSourceUrl, useTimelineFeed } from "../data/useTimelineFeed";
import "./HomeTimeline.scss";

type HomeTimelineProps = {
  darkTheme: boolean;
};

function formatPeriod(start: string, end: string): string {
  const safeStart = start.trim();
  const safeEnd = end.trim();
  return `${safeStart} - ${safeEnd}`;
}

export default function HomeTimeline({ darkTheme }: HomeTimelineProps) {
  const timelineState = useTimelineFeed(getTimelineSourceUrl());
  const items = timelineState.items;
  const count = items.length;
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const rafRef = useRef<number | null>(null);

  const refreshActiveCard = () => {
    const scroller = scrollerRef.current;
    if (!scroller || count <= 0) {
      setActiveIndex(0);
      return;
    }

    const scrollerRect = scroller.getBoundingClientRect();
    const centerY = scrollerRect.top + scrollerRect.height * 0.5;

    let bestIndex = 0;
    let bestDistance = Number.POSITIVE_INFINITY;

    cardRefs.current.forEach((card, index) => {
      if (!card) {
        return;
      }
      const rect = card.getBoundingClientRect();
      const cardCenter = rect.top + rect.height * 0.5;
      const distance = Math.abs(cardCenter - centerY);
      if (distance < bestDistance) {
        bestDistance = distance;
        bestIndex = index;
      }
    });

    setActiveIndex(bestIndex);
  };

  useEffect(() => {
    refreshActiveCard();
    const onResize = () => {
      refreshActiveCard();
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [count]);

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
      refreshActiveCard();
      rafRef.current = null;
    });
  };

  const activeProgress = useMemo(() => {
    if (count <= 1) {
      return 0;
    }
    return activeIndex / (count - 1);
  }, [activeIndex, count]);

  return (
    <motion.aside
      className={`home-timeline ${darkTheme ? "" : "light"}`}
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 30 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      data-wheel-lock="true"
      data-wheel-axis="y"
      aria-label="Experience timeline"
    >
      <div className="timeline-header">
        <div className="timeline-heading">Timeline</div>
        <a
          className="timeline-link"
          href="https://www.linkedin.com/in/abhinay-khalatkar/"
          target="_blank"
          rel="noreferrer"
        >
          LinkedIn
          <AiOutlineRight />
        </a>
      </div>

      <div className="timeline-rail">
        <motion.div
          className="timeline-axis"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        />
        <motion.div
          className="timeline-focus"
          animate={{ top: `${activeProgress * 100}%` }}
          transition={{ type: "spring", stiffness: 320, damping: 25, mass: 0.7 }}
        />
      </div>

      <div
        className="timeline-scroll"
        ref={scrollerRef}
        onScroll={onScroll}
        data-wheel-lock="true"
        data-wheel-axis="y"
      >
        {timelineState.status === "loading" || timelineState.status === "idle" ? (
          <div className="timeline-state">Loading timeline data...</div>
        ) : timelineState.status === "error" ? (
          <div className="timeline-state">
            Could not load timeline feed.
            <div className="timeline-error-message">{timelineState.message}</div>
          </div>
        ) : items.length === 0 ? (
          <div className="timeline-state">
            No entries in the timeline feed yet.
            <div className="timeline-error-message">
              Add items to `public/data/linkedin-timeline.json`.
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
                transition={{ delay: 0.12 + index * 0.06, duration: 0.35, ease: "easeOut" }}
                ref={(element) => {
                  cardRefs.current[index] = element;
                }}
              >
                <div className="timeline-card-type">{entry.type}</div>
                <div className="timeline-card-title">{entry.title}</div>
                <div className="timeline-card-org">{entry.organization}</div>
                <div className="timeline-card-meta">
                  {formatPeriod(entry.start, entry.end)}
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
                  <a className="timeline-card-link" href={entry.link} target="_blank" rel="noreferrer">
                    Learn more
                    <AiOutlineRight />
                  </a>
                ) : null}
              </motion.article>
            );
          })
        )}
      </div>
    </motion.aside>
  );
}
