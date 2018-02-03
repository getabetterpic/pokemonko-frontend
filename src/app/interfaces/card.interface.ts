export interface ICard {
  id: string;
  name: string;
  national_pokedex_number?: number;
  image_url: string;
  image_url_hi_res: string;
  subtype: string;
  supertype: string;
  ability?: object;
  ancient_trait?: string;
  hp?: string;
  number: string;
  artist: string;
  rarity: string;
  series: string;
  set_code: string;
  retreat_cost?: string[];
  text?: any;
  types: string[];
  attacks?: object[];
  weaknesses?: object[];
  resistances?: object[];
  evolves_from?: string;
}
