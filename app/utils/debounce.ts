type Debounce = {
  _actual: null | NodeJS.Timeout;
  set: (cb: () => void, ms?: number) => void;
  clear: () => void;
};

export default function debounce() {
  return {
    _actual: null,
    set: function (cb: () => void, ms: number = 50) {
      this.clear();
      this._actual = setTimeout(cb, ms);
    },
    clear: function () {
      const actual = this._actual;
      if (!actual) return;
      clearTimeout(actual);
    },
  } as Debounce;
}
