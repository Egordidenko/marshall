import {getUrl} from '../helpers/coded-url-api';
import copyToClipboard from '../helpers/copy-to-clipboard';

export default {

  data: {
    sharePopupIsOpened: false,
    codedUrlHash: '',
  },

  computed: {
    codedUrl() {
      return `${window.location.origin + window.location.pathname}${this.codedUrlHash}`;
    },
  },

  created() {
    this.shareTimer = null;
    this.shareJsonData = null;
  },

  methods: {

    correctConfiguratorByUrlData() {
      const urlData = window.configuratorSavedState;
      if (urlData) {
        const dataParsed = JSON.parse(urlData);
        if (dataParsed.side) {
          this.activeSide = dataParsed.side;
        }
        if (dataParsed.steps) {
          Object.keys(dataParsed.steps).forEach((key, index) => {
            if (this.selectedElement[key] !== undefined) {
              const elIndex = this.steps[index].elements.findIndex(el => {
                return el.id === dataParsed.steps[key];
              });
              if (elIndex >= 0) {
                this.selectedElement[key] = elIndex;
              }
            }
          });
        }
      }
    },

    createJsonData() {
      this.shareJsonData = {
        steps: {},
        side: this.activeSide,
      };
      console.log(this.selectedElement)
      Object.keys(this.selectedElement).forEach((key, id) => {
        this.shareJsonData.steps[key] = this.steps[id].elements[this.selectedElement[key]].id;
      });
    },

    generateUrl() {
      this.createJsonData();
      this.getCodedUrlHashFromApi();
    },

    async getCodedUrlHashFromApi() {
      this.codedUrlHash = await getUrl(this.shareJsonData);
    },

    copyLink(e) {
      const button = e.target;
      copyToClipboard(this.$refs.shareInput);
      button.classList.add('copied');
      clearTimeout(this.shareTimer);
      this.shareTimer = setTimeout(() => {
        button.classList.remove('copied');
      }, 3000);
    },

    shareSocial(e) {
      const shareLink = e.target;
      const url = shareLink.href;
      console.log(shareLink);
      window.open(url, '_blank', 'resizable=yes,scrollbars=yes,top=20,left=20,width=600,height=400');
    },
  },

  watch: {

    sharePopupIsOpened(current) {
      if (current) {
        this.blur();
      } else {
        this.unBlur();
      }
    },
  },

  destroyed() {
    this.sharePopupIsOpened = false;
    this.shareJsonData = null;
  },
};
