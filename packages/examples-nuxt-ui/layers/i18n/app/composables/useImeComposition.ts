/**
 * Tracks IME composition so that the Enter key confirming a conversion can be ignored.
 *
 * Safari fires the confirming keydown after compositionend (`KeyboardEvent.isComposing` is already false),
 * so the flag is cleared on the next task instead of immediately.
 */
export const useImeComposition = () => {
  let composing = false

  function onCompositionStart() {
    composing = true
  }

  function onCompositionEnd() {
    setTimeout(() => {
      composing = false
    })
  }

  function isComposing(event: KeyboardEvent) {
    return event.isComposing || composing
  }

  return { onCompositionStart, onCompositionEnd, isComposing }
}
