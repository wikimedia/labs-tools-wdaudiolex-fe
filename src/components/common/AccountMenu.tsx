import React, { useEffect, useId, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import type { Icon, SimpleIcon } from "@wikimedia/codex-icons";
import { cdxIconExpand, cdxIconUserAvatar } from "@wikimedia/codex-icons";
import "@wikimedia/codex-design-tokens/theme-wikimedia-ui.css";
import "@wikimedia/codex/dist/codex.style.css";

import { clearSession, readSession, saveRequestToken, type StoredSession } from "../../auth/session";
import { apiErrorMessage, logout, startLogin } from "../../services/api";

function iconMarkup(icon: Icon): string {
  if (typeof icon === "string") {
    return icon;
  }
  if ("path" in icon) {
    return `<path d="${icon.path}"/>`;
  }
  if ("ltr" in icon) {
    return iconMarkup(icon.ltr as SimpleIcon);
  }
  return iconMarkup(icon.default);
}

function CodexIcon({ icon }: { icon: Icon }) {
  return (
    <span className="cdx-icon cdx-icon--small">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        aria-hidden="true"
        dangerouslySetInnerHTML={{ __html: iconMarkup(icon) }}
      />
    </span>
  );
}

const AccountMenu: React.FC = () => {
  const location = useLocation();
  const menuId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<Array<HTMLElement | null>>([]);
  const [session, setSession] = useState<StoredSession | null>(() => readSession());
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setSession(readSession());
    setOpen(false);
  }, [location.key]);

  useEffect(() => {
    if (!open) {
      return undefined;
    }
    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onPointerDown);
    itemRefs.current[0]?.focus();
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [open]);

  const handleLogin = () => {
    setBusy(true);
    setError(null);
    startLogin()
      .then((start) => {
        saveRequestToken(start.request_token);
        window.location.assign(start.redirect_string);
      })
      .catch((loginError: unknown) => {
        setError(apiErrorMessage(loginError));
        setBusy(false);
      });
  };

  const handleLogout = () => {
    const token = session?.token;
    setOpen(false);
    setError(null);
    const finish = () => {
      clearSession();
      setSession(null);
      setBusy(false);
    };
    if (!token) {
      finish();
      return;
    }
    setBusy(true);
    logout(token).catch(() => undefined).finally(finish);
  };

  const onMenuKeyDown = (event: React.KeyboardEvent<HTMLUListElement>) => {
    const items = itemRefs.current.filter((item): item is HTMLElement => item !== null);
    const current = items.indexOf(document.activeElement as HTMLElement);
    if (event.key === "Escape") {
      event.preventDefault();
      setOpen(false);
      triggerRef.current?.focus();
      return;
    }
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const step = event.key === "ArrowDown" ? 1 : -1;
      const next = current < 0 ? 0 : (current + step + items.length) % items.length;
      items[next]?.focus();
      return;
    }
    if (event.key === "Home") {
      event.preventDefault();
      items[0]?.focus();
      return;
    }
    if (event.key === "End") {
      event.preventDefault();
      items[items.length - 1]?.focus();
    }
  };

  return (
    <div className="wdaudiolex-account" ref={rootRef}>
      {session ? (
        <button
          ref={triggerRef}
          type="button"
          className="cdx-button cdx-button--weight-quiet"
          aria-haspopup="menu"
          aria-expanded={open}
          aria-controls={menuId}
          disabled={busy}
          onClick={() => setOpen((current) => !current)}
        >
          <CodexIcon icon={cdxIconUserAvatar} />
          {session.username}
          <CodexIcon icon={cdxIconExpand} />
        </button>
      ) : (
        <button
          type="button"
          className="cdx-button"
          disabled={busy}
          onClick={handleLogin}
        >
          {busy ? "Signing in…" : "Login"}
        </button>
      )}
      {error ? (
        <p className="wdaudiolex-account__error" role="alert">{error}</p>
      ) : null}
      {session && open ? (
        <div className="cdx-menu">
          <ul
            id={menuId}
            className="cdx-menu__listbox"
            role="menu"
            aria-label={session.username}
            onKeyDown={onMenuKeyDown}
          >
            <li className="cdx-menu-item cdx-menu-item--enabled" role="presentation">
              <Link
                ref={(node) => {
                  itemRefs.current[0] = node;
                }}
                className="cdx-menu-item__content"
                role="menuitem"
                to="/contributions"
                onClick={() => setOpen(false)}
              >
                <span className="cdx-menu-item__text">
                  <span className="cdx-menu-item__text__label">My contributions</span>
                </span>
              </Link>
            </li>
            <li className="cdx-menu-item cdx-menu-item--enabled" role="presentation">
              <button
                ref={(node) => {
                  itemRefs.current[1] = node;
                }}
                type="button"
                className="cdx-menu-item__content"
                role="menuitem"
                onClick={handleLogout}
              >
                <span className="cdx-menu-item__text">
                  <span className="cdx-menu-item__text__label">Log out</span>
                </span>
              </button>
            </li>
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default AccountMenu;
