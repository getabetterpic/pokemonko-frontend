import { ICard } from '../interfaces/card.interface';

export class Card implements ICard {
  public id: string;
  public name: string;
  public national_pokedex_number?: number;
  public image_url: string;
  public image_url_hi_res: string;
  public subtype: string;
  public supertype: string;
  public ability?: object;
  public ancient_trait?: string;
  public hp?: string;
  public number: string;
  public artist: string;
  public rarity: string;
  public series: string;
  public set_code: string;
  public retreat_cost?: string[];
  public text?: any;
  public types: string[];
  public attacks?: object[];
  public weaknesses?: object[];
  public resistances?: object[];
  public evolves_from?: string;

  constructor(card: ICard) {
    this.id = card.id;
    this.name = card.name;
    this.national_pokedex_number = card.national_pokedex_number;
    this.image_url = card.image_url;
    this.image_url_hi_res = card.image_url_hi_res;
    this.subtype = card.subtype;
    this.supertype = card.supertype;
    this.ability = card.ability;
    this.ancient_trait = card.ancient_trait;
    this.hp = card.hp;
    this.number = card.number;
    this.artist = card.artist;
    this.rarity = card.rarity;
    this.series = card.series;
    this.set_code = card.set_code;
    this.retreat_cost = card.retreat_cost;
    this.text = card.text;
    this.types = card.types;
    this.attacks = card.attacks;
    this.weaknesses = card.weaknesses;
    this.resistances = card.resistances;
    this.evolves_from = card.evolves_from;
  }
}
