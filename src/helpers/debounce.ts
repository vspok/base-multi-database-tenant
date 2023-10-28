interface Timeout {
  id: number;
  timeout: NodeJS.Timeout;
}

const timeouts: Timeout[] = [];

const findAndClearTimeout = (chatId: number) => {
  if (timeouts.length > 0) {
    const timeoutIndex = timeouts.findIndex(timeout => timeout.id === chatId);

    if (timeoutIndex !== -1) {
      clearTimeout(timeouts[timeoutIndex].timeout);
      timeouts.splice(timeoutIndex, 1);
    }
  }
};

const debounce = (
  func: { (): Promise<void>; (...args: never[]): void },
  wait: number,
  chatId: number
) => {
  return function executedFunction(...args: never[]): void {
    const later = () => {
      findAndClearTimeout(chatId);
      func(...args);
    };

    findAndClearTimeout(chatId);

    const newTimeout = {
      id: chatId,
      timeout: setTimeout(later, wait)
    };

    timeouts.push(newTimeout);
  };
};

export { debounce };
