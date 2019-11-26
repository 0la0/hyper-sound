# Examples

## Make a sound
```html
<h-dac>
  <h-gain value="0.1">
    <h-env-osc wav="squ" attack="0" sustain="0" release="40">
      <h-seq>
        <h-pat-mod mtof>
          <h-pat pattern="a:52 a:60 a:65 a:72" />
          <h-pat pattern="a a a" />
        </h-pat-mod>
      </h-seq>
    </h-env-osc>
  </h-gain>
</h-dac>
```

## Play samples
```html
<h-dac>
  <h-gain value="0.9">
    <h-sampler name="kick" attack="0" sustain="0" release="200" trigger="k" />
    <h-sampler name="hatClosed" attack="0" sustain="0" release="200" trigger="h" />
  </h-gain>
</h-dac>

<h-seq>
  <h-pat-mod mtof>
    <h-pat pattern="k h k h" />
  </h-pat-mod>
</h-seq>
```

## Play a sin wave
```html
<h-dac>
  <h-gain value="0.2">
    <h-osc wav="sin" frequency="332" />
  </h-gain>
</h-dac>
```

## Frequency modulation
```html
<h-dac>
  <h-gain value="0.2">
    <h-osc wav="sin" frequency="440" modulator="mod(modSignal)" />
  </h-gain>
</h-dac>

<h-gain value="200" id="modSignal">
  <h-osc wav="squ" frequency="addr(modFreq)" />
</h-gain>

<h-seq>
  <h-pat-mod mtof>
    <h-pat address="modFreq" pattern="54 _65 72" />
  </h-pat-mod>
</h-seq>
```
