export interface Country {
  country_id: number;
  name: string;
  name_en: string;
  cheer_count: number;
  available: boolean;
  cheered_by_me?: boolean;
}

export type GuestCountry = Omit<Country, "cheered_by_me">;
