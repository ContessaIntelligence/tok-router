import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Languages, Monitor, Moon, Sun } from "lucide-react";

import packageInfo from "../../../package.json";
import appIcon from "../../assets/app-icon.svg";
import { appDefinition } from "../../lib/apps";
import { useI18n } from "../../lib/i18n";
import {
  appIsVisible,
  type AppVisibility,
  type Theme,
} from "../../lib/preferences";
import type { CoreAppDescriptor } from "../../lib/provider-types";
import { cn } from "../../lib/utils";
import { ProviderIcon } from "../ProviderIcon";
import { Button } from "../ui/button";

interface SettingsPanelProps {
  apps: CoreAppDescriptor[];
  theme: Theme;
  appVisibility: AppVisibility;
  onThemeChange: (theme: Theme) => void;
  onAppVisibilityChange: (visibility: AppVisibility) => void;
}

type SettingsTab = "general" | "about";
const SETTINGS_TABS: SettingsTab[] = ["general", "about"];
const ACTIVE_CONTROL_CLASS =
  "bg-blue-600 text-white shadow-sm hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-600";

export function SettingsPanel({
  apps,
  theme,
  appVisibility,
  onThemeChange,
  onAppVisibilityChange,
}: SettingsPanelProps) {
  const { language, setLanguage, t } = useI18n();
  const [tab, setTab] = useState<SettingsTab>("general");
  const reduceMotion = useReducedMotion();
  const panelDuration = reduceMotion ? 0 : 0.3;
  const visibleCount = apps.filter((app) =>
    appIsVisible(appVisibility, app.id),
  ).length;

  const toggleApp = (appId: string) => {
    const visible = appIsVisible(appVisibility, appId);
    if (visible && visibleCount <= 1) return;
    onAppVisibilityChange({ ...appVisibility, [appId]: !visible });
  };

  const moveTab = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    current: SettingsTab,
  ) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const index = SETTINGS_TABS.indexOf(current);
    const next =
      event.key === "Home"
        ? SETTINGS_TABS[0]
        : event.key === "End"
          ? SETTINGS_TABS.at(-1)!
          : SETTINGS_TABS[
              (index +
                (event.key === "ArrowRight" ? 1 : -1) +
                SETTINGS_TABS.length) %
                SETTINGS_TABS.length
            ];
    setTab(next);
    document.getElementById(`settings-${next}-tab`)?.focus();
  };

  return (
    <div className="flex h-full flex-col overflow-hidden px-6">
      <div
        role="tablist"
        aria-label={t("Settings sections")}
        className="mb-6 grid w-full grid-cols-2 items-center justify-center gap-1 rounded-lg bg-muted p-1 text-muted-foreground glass"
      >
        {SETTINGS_TABS.map((item) => (
          <button
            key={item}
            id={`settings-${item}-tab`}
            type="button"
            role="tab"
            aria-selected={tab === item}
            aria-controls={`settings-${item}-panel`}
            tabIndex={tab === item ? 0 : -1}
            autoFocus={item === "general"}
            onClick={() => setTab(item)}
            onKeyDown={(event) => moveTab(event, item)}
            className={cn(
              "inline-flex min-w-[120px] items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              tab === item
                ? ACTIVE_CONTROL_CLASS
                : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
            )}
          >
            {item === "general" ? t("General") : t("About")}
          </button>
        ))}
      </div>

      <div className="flex min-h-0 flex-1 flex-col">
        <div className="flex-1 overflow-y-auto overflow-x-hidden pr-2">
          {tab === "general" ? (
            <motion.div
              id="settings-general-panel"
              role="tabpanel"
              aria-labelledby="settings-general-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: panelDuration }}
              className="mt-0 space-y-6"
            >
              <SettingsSection
                title={t("Appearance")}
                description={t("Use a light, dark, or system-matched theme.")}
              >
                <div className="inline-flex gap-1 rounded-md border border-border-default bg-background p-1">
                  <ThemeButton
                    active={theme === "light"}
                    icon={Sun}
                    onClick={() => onThemeChange("light")}
                  >
                    {t("Light")}
                  </ThemeButton>
                  <ThemeButton
                    active={theme === "dark"}
                    icon={Moon}
                    onClick={() => onThemeChange("dark")}
                  >
                    {t("Dark")}
                  </ThemeButton>
                  <ThemeButton
                    active={theme === "system"}
                    icon={Monitor}
                    onClick={() => onThemeChange("system")}
                  >
                    {t("System")}
                  </ThemeButton>
                </div>
              </SettingsSection>

              <SettingsSection
                title={t("Language")}
                description={t("Choose the display language of the interface.")}
              >
                <div
                  role="group"
                  aria-label={t("Language")}
                  className="inline-flex gap-1 rounded-md border border-border-default bg-background p-1"
                >
                  <ThemeButton
                    active={language === "en"}
                    icon={Languages}
                    onClick={() => setLanguage("en")}
                  >
                    English
                  </ThemeButton>
                  <ThemeButton
                    active={language === "zh"}
                    icon={Languages}
                    onClick={() => setLanguage("zh")}
                  >
                    中文
                  </ThemeButton>
                </div>
              </SettingsSection>

              <SettingsSection
                title={t("Visible applications")}
                description={t(
                  "Choose which applications appear in the provider switcher. At least one stays visible.",
                )}
              >
                <div className="flex flex-wrap gap-1 rounded-md border border-border-default bg-background p-1">
                  {apps.map((app) => {
                    const definition = appDefinition(app.id, [app]);
                    const visible = appIsVisible(appVisibility, app.id);
                    return (
                      <Button
                        key={app.id}
                        type="button"
                        size="sm"
                        variant={visible ? "default" : "ghost"}
                        disabled={visible && visibleCount <= 1}
                        aria-pressed={visible}
                        aria-label={t(
                          visible
                            ? "Hide {app} in application switcher"
                            : "Show {app} in application switcher",
                          { app: definition.label },
                        )}
                        onClick={() => toggleApp(app.id)}
                        className={cn(
                          "w-auto min-w-[90px] gap-1.5 px-3",
                          visible
                            ? ACTIVE_CONTROL_CLASS
                            : "text-muted-foreground hover:bg-muted hover:text-foreground",
                        )}
                      >
                        <ProviderIcon
                          icon={definition.icon}
                          name={definition.label}
                          size={14}
                        />
                        {definition.label}
                      </Button>
                    );
                  })}
                </div>
              </SettingsSection>
            </motion.div>
          ) : (
            <motion.div
              id="settings-about-panel"
              role="tabpanel"
              aria-labelledby="settings-about-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: panelDuration }}
              className="mt-0 space-y-6"
            >
              <header className="space-y-1">
                <h2 className="text-sm font-medium">{t("About")}</h2>
                <p className="text-xs text-muted-foreground">
                  {t("Version and project information.")}
                </p>
              </header>
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: panelDuration,
                  delay: reduceMotion ? 0 : 0.1,
                }}
                className="space-y-5 rounded-xl border border-border bg-gradient-to-br from-card/80 to-card/40 p-6 shadow-sm"
              >
                <div className="flex items-center gap-8">
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex items-center gap-2">
                      <img src={appIcon} alt="" className="h-5 w-5" />
                      <h3 className="text-lg font-semibold text-foreground">
                        Token Router
                      </h3>
                    </div>
                    <div className="flex items-center gap-1.5 rounded-md border border-border bg-background/80 px-2.5 py-1 text-xs">
                      <span className="text-muted-foreground">
                        {t("Version")}
                      </span>
                      <span className="font-medium">
                        v{packageInfo.version}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {t("Copyright: routok.com")}
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

function SettingsSection({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-2">
      <header className="space-y-1">
        <h2 className="text-sm font-medium">{title}</h2>
        <p className="text-xs text-muted-foreground">{description}</p>
      </header>
      {children}
    </section>
  );
}

function ThemeButton({
  active,
  icon: Icon,
  onClick,
  children,
}: {
  active: boolean;
  icon: React.ComponentType<{ className?: string }>;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Button
      type="button"
      size="sm"
      variant={active ? "default" : "ghost"}
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "min-w-[96px] gap-1.5",
        active
          ? ACTIVE_CONTROL_CLASS
          : "text-muted-foreground hover:bg-muted hover:text-foreground",
      )}
    >
      <Icon className="h-3.5 w-3.5" />
      {children}
    </Button>
  );
}
