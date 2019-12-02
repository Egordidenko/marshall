export default {
  data: {
    headerIsSmall: false,
    headerIsWhite: true,
  },

  methods: {

    makeHeaderBig() {
      this.headerIsSmall = false;
    },

    makeHeaderSmall() {
      this.headerIsSmall = true;
    },

    initHeader() {
      this.$pageHeader.makeHeaderColorWhite();
    },
  },

  watch: {
    isViewMode(current) {
      if (current) {
        this.$pageHeader.makeHeaderColorDefault();
      } else {
        this.$pageHeader.makeHeaderColorWhite();
      }
    },

    isTimeToConfirm(current) {
      if (current) {
        this.generateUrl();
        this.headerIsWhite = false;
        this.$pageHeader.hideHeader();
      } else {
        this.headerIsWhite = true;
        this.$pageHeader.showHeader();
      }
    },
  },

  created() {
    window.addEventListener('headerBig', this.makeHeaderBig);
    window.addEventListener('headerSmall', this.makeHeaderSmall);
  },

  destroyed() {
    window.removeEventListener('headerBig', this.makeHeaderBig);
    window.removeEventListener('headerSmall', this.makeHeaderSmall);

    this.headerIsSmall = false;
    this.headerIsWhite = true;
  },
}
