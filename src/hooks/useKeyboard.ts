export default function useKeyboard() {
  function onPressEnter(callBack: VoidFunction) {
    document.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        callBack();
      }
    });
  }

  return { onPressEnter } as const;
}
