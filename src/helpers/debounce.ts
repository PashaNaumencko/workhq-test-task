export function debounce<TFunctionArgs extends Array<unknown>>(callback: (...args: TFunctionArgs) => void, delay: number) {
  let timer: NodeJS.Timeout;

  return (...args: TFunctionArgs) => {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      callback(...args)
    }, delay);
  }
}