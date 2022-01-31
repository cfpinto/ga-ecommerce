export class Storage {
  private readonly storageKey: string;

  private json: any;

  constructor() {
    this.storageKey = 'ga-tracker-storage';
    this.init();
  }

  read() {
    return JSON.parse(localStorage.getItem(this.storageKey));
  }

  write(json: any) {
    this.json = json;
    localStorage.setItem(this.storageKey, JSON.stringify(json));

    return this;
  }

  init() {
    this.json = (this.read() || {});
    this.write(this.json);
    return this;
  }

  setKey(key: string, value: any) {
    return this.write({ ...this.json, [key]: value });
  }

  getKey(key: string, defaultValue:any = null): any {
    return this.json[key] || defaultValue;
  }
}

export const LIST_NAME_KEY = 'list[name]';
export const ITEM_LIST_NAME_PREFIX = 'item[list][name]';
export const ITEM_LIST_POSITION_PREFIX = 'item[list][position]';
export const CHECKOUT_STEP_PREFIX = 'checkout[step]';
