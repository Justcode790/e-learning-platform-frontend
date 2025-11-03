let setIsLoadingFn = null;

export const registerLoadingHandler = (setIsLoading) => {
  setIsLoadingFn = setIsLoading;
};

export const loadingHandler = {
  start: () => {
    if (setIsLoadingFn) setIsLoadingFn(true);
  },
  stop: () => {
    if (setIsLoadingFn) setIsLoadingFn(false);
  },
};
