export default global => {

  const leaveTransition = (container, trigger) => {
    return new Promise(resolve => {
      try {
        let time = 0.3;
        if (trigger.closest && trigger.closest('#nav-list-mobile')) {
          time = 0.5;
        }
        const tl = TweenLite.to(container, time, {
          opacity: 0,
        });
        tl.eventCallback('onComplete', () => resolve());
      } catch (e) {
        console.log(e);
        resolve();
      }
    });
  };

  const enterTransition = container => {
    TweenLite.fromTo(container, 0.5, {
      opacity: 0,
    }, {
      opacity: 1,
    });
  };

  return [
    {
      async leave({current, next, trigger}) {
        await leaveTransition(current.container, trigger);

      },
      enter({current, next, trigger}) {
        enterTransition(next.container);

      },
    },
  ];
}
