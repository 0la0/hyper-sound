let fns = [];
let nextPaint;

export function batchRender(fn) {
  fns.push(fn);
  if (nextPaint) {
    return;
  }
  nextPaint = requestAnimationFrame(() => {
    fns.forEach(fn => fn());
    nextPaint = undefined;
  });
}
