import template from './template';
import scriptLoader from '../helpers/scriptLoader';
import loadPdfFont from '../helpers/load-pdf-font';
import DownloadPDF from './DownloadPDF';
import Sharer from './Sharer';
import Header from './Header';
import Animation from './Animation';

export default {
  mixins: [DownloadPDF, Sharer, Header, Animation],
  el: '#app-configurator',
  template: template,
  data: {
    selectedElement: {},
    previousStep: -1,
    activeStep: 0,
    activeSide: '',
    outConfirmationIsOpened: false,
    isTimeToConfirm: false,
    isViewMode: false,
    loadedImagesArr: [],
    selectedImages: [],
    isTouchDevice: false,
    isLoading: false,
  },

  computed: {
    baseURL() {
      return process.env.NODE_ENV === 'development' ?
          process.env.DEV_PATH : process.env.PROD_PATH;
    },

    selectedSize() {
      const sizeStep = this.steps.find(step => {
        return step.modifier === 'size';
      });
      return sizeStep.elements[this.selectedElement.step_0].name;
    },

    computedImages() {
      return this.getImagesBySide(this.activeSide).sort((a, b) => {
        return b.key - a.key;
      });
    },
  },

  created() {
    const data = window.configuratorData;
    this.steps = Object.keys(data).map(key => data[key]);
    this.sidesArray = null;
    this.setupConfigurator();
    this.activeSide = this.sidesArray[0];
    this.correctConfiguratorByUrlData();
    window.addEventListener('touchstart', this.setTouchDevice);
  },

  mounted() {
    this.$nextTick(() => {
      this.initHeader();
      window.addEventListener('resize', this.handleResize);
    });
  },

  methods: {

    setTouchDevice() {
      this.isTouchDevice = true;
    },

    formatStepResultTitle(title) {
      return title === 'Headbord fabric' ? 'Headboard fabric' : title;
    },

    formatFabricCapture(text) {
      return text.replace(': ', '<br>');
    },

    getImagesBySide(side) {
      if (!this.steps) return [];
      return Object.values(this.selectedElement).reduce((acc, elementIndex, stepIndex) => {
        const element = this.steps[stepIndex].elements[elementIndex];
        const imagesBySide = element.images;
        if (imagesBySide) {
          let index = stepIndex;
          if (stepIndex === 2) index = 3;
          if (stepIndex === 3) index = 2;
          acc.push({
            src: imagesBySide[side],
            key: index,
            modifier: this.steps[stepIndex].modifier,
          });
        }
        return acc;
      }, []);
    },

    loadImageOnHoverSide(side) {
      const images = this.getImagesBySide(side);
      if (images.length) {
        for (const image of images) {
          if (!this.loadedImagesArr.includes(image.src)) {
            this.loadedImagesArr.push(image.src);
          }
        }
      }
    },

    loadImageOnHoverElement(element) {
      const images = element.images;
      if (images) {
        const src = images[this.activeSide];
        if (this.loadedImagesArr.includes(src)) return;
        this.loadedImagesArr.push(src);
      }
    },

    handleResize() {
      this.updateStepHeight();
      if (window.innerWidth > 1023) {
        this.isViewMode = false;
      }
    },

    updateStepHeight() {
      if (this.activeStep === this.previousStep) return;
      this.openStep(this.activeStep);
    }
    ,

    handleStepClick(index) {
      if (index === this.activeStep) { // click on active step
        if (this.previousStep !== index) {
          this.closeStep(index);
          this.previousStep = index;
        } else {
          this.openStep(index);
          this.previousStep = -1;
        }
      } else {
        this.closeStep(this.activeStep);
        this.previousStep = this.activeStep;
        this.openStep(index);
        this.activeStep = index;
      }
    },

    goBack() {
      console.log(window.location);
      if (window.history.length < 2) {
        window.location.assign(window.location.origin);
      } else {
        window.history.back();
      }
    },

    setupConfigurator() {
      let sidesSet = new Set([]);
      this.steps.forEach((step, index) => {
        // set object for active element
        this.$set(this.selectedElement, `step_${index}`, 0);

        // create sides array
        step.elements.forEach((element, index) => {
          const images = element.images;
          if (!images) return;
          Object.keys(images).forEach(key => {
            sidesSet.add(key);
          });
        });
      });
      this.sidesArray = Array.from(sidesSet);
      sidesSet = null;
    },

    setActiveOption(step, item) {
      this.selectedElement[`step_${step}`] = item;
    },

    handleElementClick(step, item) {
      this.setActiveOption(step, item);
      if (window.innerWidth < 1024) {
        this.closeStep(step);
        if (this.$refs.stepContent[step + 1]) {
          this.openStep(step + 1);
        } else {
          this.isViewMode = true;
        }
      }
    },

    openStep(index) {
      const content = this.$refs.stepContent[index];
      const contentInner = this.$refs.stepContentInner[index];
      if (!contentInner) return;
      const height = contentInner.offsetHeight;
      TweenLite.to(content, this.stepOpenTime, {height});
    },

    closeStep(index) {
      if (index >= 0) {
        const content = this.$refs.stepContent[index];
        TweenLite.to(content, this.stepOpenTime, {height: 0});
      }
    },

    getNewImages(currentImages, prevImages) {
      return currentImages.reduce((acc, image) => {
        if (!prevImages.includes(image)) {
          acc.push(image);
        }
        return acc;
      }, []);
    },

    handleImagesChanging(currentImages, prevImages) {
      this.selectedImages = currentImages;

      //const newImages = this.getNewImages(currentImages, prevImages);
      //console.log(newImages);
    },
  },

  watch: {

    computedImages(current, prev) {
      if (prev.length) {
        this.handleImagesChanging(current, prev);
      } else {
        this.selectedImages = current;
      }
    },

  },

  destroyed() {
    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener('touchstart', this.setTouchDevice);

    this.activeStep = 0;
    this.activeSide = '';
    this.outConfirmationIsOpened = false;
    this.isTimeToConfirm = false;
    this.isViewMode = false;
  },
};
