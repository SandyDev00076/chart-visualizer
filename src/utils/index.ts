export function generateRandomColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

/**
 * @returns Whether the store is residing in the localStorage or not
 */
export function checkWhetherStateIsPersisted(): boolean {
  return Boolean(localStorage.getItem("persist:charts"));
}
