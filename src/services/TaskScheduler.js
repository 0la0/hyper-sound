let functions = [];
let nextPaint;

export function batchRender(fn) {
  functions.push(fn);
  if (nextPaint) {
    return;
  }
  nextPaint = requestAnimationFrame(() => {
    functions.forEach(fn => fn());
    functions = [];
    nextPaint = undefined;
  });
}
