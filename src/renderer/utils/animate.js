// Based on: https://stackoverflow.com/a/39494245
export default function animate(onStep, onFinish, duration) {
  let startTime = null
  let step = timestamp => {
    if (!startTime) {
      startTime = timestamp
    }

    let time = timestamp - startTime
    let percent = Math.min(time / duration, 1)

    onStep(percent)

    if (time < duration) {
      window.requestAnimationFrame(step)
    } else {
      onFinish()
    }
  }

  window.requestAnimationFrame(step)
}