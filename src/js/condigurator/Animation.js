export default {
  methods: {

    blur() {
      if (!this.isTimeToConfirm) {
        this.$pageHeader.blurHeader();
      }
      TweenLite.set(document.body, {
        backgroundColor: '#000',
      });
      TweenLite.fromTo([this.$refs.content, this.$refs.header], this.blurTime, {
        webkitFilter: `blur(0) brightness(100%)`,
        filter: `blur(0) brightness(100%)`,
      }, {
        webkitFilter: `blur(${this.BLUR_VALUE}) brightness(${this.BRIGHTNESS_VALUE})`,
        filter: `blur(${this.BLUR_VALUE}) brightness(${this.BRIGHTNESS_VALUE})`,
      });
    },

    unBlur() {
      if (!this.isTimeToConfirm) {
        this.$pageHeader.unBlurHeader();
      }
      const tl = TweenLite.to([this.$refs.content, this.$refs.header], this.blurTime, {
        webkitFilter: `blur(0) brightness(100%)`,
        filter: `blur(0) brightness(100%)`,
      });

      tl.eventCallback('onComplete', () => {
        this.$refs.content.removeAttribute('style');
      });
    },
  },

  watch: {
    outConfirmationIsOpened(current) {
      if (current) {
        this.blur();
      } else {
        this.unBlur();
      }
    },
  },

  created() {
    this.stepOpenTime = 1;
    this.blurTime = 0.5;
    this.BLUR_VALUE = '20px';
    this.BRIGHTNESS_VALUE = '70%';
    this.BODY_COLOR = '#737373';
  },
};
