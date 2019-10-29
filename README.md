# Hyper-Sound
Audio synthesis with HTML.

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

## TODO:
- Sound interpolation
- Sound modulation
- change `time.timestamp` to `time`
- GrainSampler component
- Nested sequence option
- sequences should emit real values (i.e. mtof(ps-pat-midi))