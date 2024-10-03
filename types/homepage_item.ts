import { toast } from "react-toastify";

import Endpoints, { fetchEndpoint } from "./endpoints";
import { ProviderType } from "./provider";

export type HomepageItem = {
  name: string;
  icon: string;
  category: string;
  description: string;
  widget_config: Record<string, any>;

  url: string;
  alt_url: string;
  source_type: ProviderType;
};

export type HomepageItems = Record<string, HomepageItem[]>;

export async function getHomepageItems() {
  try {
    const response = await fetchEndpoint(Endpoints.HOMEPAGE_CFG);
    const data = await response.json();

    return data as HomepageItems;
  } catch (error) {
    toast.error("Failed to fetch homepage items " + error);

    return {};
  }
}