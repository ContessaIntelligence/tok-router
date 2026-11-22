import { invoke } from "@tauri-apps/api/core";

export const ROUTOK_SITE_URL = "https://api.routok.com";

export const siteApi = {
  open: () => invoke<void>("open_routok_site"),
};
