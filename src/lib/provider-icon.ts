import type { AppId } from "./provider-types";

const ROUTOK_ICON = "routok";

export function resolveProviderIcon(
  appId: AppId,
  icon?: string,
  iconColor?: string,
  hints: Array<string | undefined> = [],
): string | undefined {
  const normalizedIcon = icon?.trim();
  if (!normalizedIcon) {
    // Providers created manually carry no icon. Recognize RouTok by name or URL.
    return hints.some((hint) => hint?.toLowerCase().includes(ROUTOK_ICON))
      ? ROUTOK_ICON
      : undefined;
  }
  if (appId === "grokbuild" && normalizedIcon === "grok" && !iconColor?.trim())
    return undefined;
  return normalizedIcon;
}
