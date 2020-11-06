/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
export default function mixin<V, U>(to: U, from: V): V & U {
  for (const key in from) {
    (to as V & U)[key] = from[key] as any;
  }

  return to as V & U;
}
