# PS-Sound (markup for phase-scripter)
Create audio graphs with HTML. Pattern DSL similar to Tidal Cycles.

Development ongoing, documentation to follow.

## Build scripts
install dependencies: `npm install`  
run tests: `npm test`  
run linter: `npm run lint`  
build: `npm run build`  

---

## Usage example

```html
<ps-dac>
  <ps-gain value="0.1">
    <ps-env-osc wav="squ" attack="0" sustain="0" release="40" trigger="a"></ps-env-osc>
  </ps-gain>
</ps-dac>

<ps-seq>
  <ps-pat-mod speed="0.5" degrade="0.5">
    <ps-pat-midi pattern="a:52 a:60 a:65 a:72"></ps-pat-midi>
    <ps-pat-midi pattern="a a a"></ps-pat-midi>
  </ps-pat-mod>
</ps-seq>
```
