import scriptLoader from '../helpers/scriptLoader';
import QRCode from 'qrcode';
import loadPdfFont from '../helpers/load-pdf-font';

export default {

  data: {
    pdfScriptIsLoaded: false,
  },

  created() {
    this.jsPdfOptions = {
      url: process.env.NODE_ENV === 'development' ? process.env.PDF_DEV_SCRIPT_URL : process.env.PDF_PROD_SCRIPT_URL,
      libraryName: 'pdf-library',
      integrity: process.env.NODE_ENV === 'development' ? process.env.PDF_DEV_INTEGRITY : process.env.PDF_PROD_INTEGRITY,
      crossorigin: 'anonymous',
    };

    this.pdfAPI = null;
    this.pdfFont = null;
    this.loaderOptions = {
      detail: {
        isLoading: false,
      },
    };
    this.loaderEvent = new CustomEvent('cursorLoader', this.loaderOptions);
  },

  mounted() {
    Promise.all([
      this.getPdfFont(),
      scriptLoader(this.jsPdfOptions),
    ]).then(() => {
      this.initPDF_API();
    });
  },

  methods: {

    async getPdfFont() {
      const path = process.env.NODE_ENV === 'development' ? process.env.PDF_PATH_TO_FONT : process.env.PDF_PATH_TO_FONT_PROD;
      this.pdfFont = await loadPdfFont(path);
    },

    async initPDF_API() {
      this.pdfAPI = new jsPDF();
      const loadAddFont = new Promise(resolve => {
        this.pdfAPI.addFileToVFS('gtamerica.ttf', this.pdfFont);
        this.pdfAPI.addFont('gtamerica.ttf', 'gtamerica', 'Light');
        resolve();
      });
      await loadAddFont;
      this.pdfScriptIsLoaded = true;
      this.pdfFont = null;
    },

    async hetQrCode(link) {
      try {
        return await QRCode.toCanvas(link);
      } catch (e) {
        console.log(e);
      }
    },

    enableLoader() {
      this.loaderOptions.detail.isLoading = true;
      this.isLoading = true;
      window.dispatchEvent(this.loaderEvent);
    },

    disableLoader() {
      this.loaderOptions.detail.isLoading = false;
      this.isLoading = false;
      window.dispatchEvent(this.loaderEvent);
    },

    async downloadPDF() {
      this.enableLoader();
      const link = this.codedUrl;
      const text = 'If you have any question or if you want to see your bed in person, get in touch or find a store.';

      const pageWidth = 210;
      const pageHeight = 300;
      const pageFillColor = '#F5EFEE';
      const xOffset = 20;
      const yOffset = 20;

      const domLogo = document.getElementById('logo-for-svg');
      const logoWidth = 60;
      const logoHeight = logoWidth * 0.139;
      const logoX = pageWidth / 2 - logoWidth / 2;
      const logoY = yOffset;

      const textFontSize = 12;
      const cellPadding = 9;
      const textOffsetX = xOffset + 10;

      const imageSide = 150; // it is square
      const qrSide = 35;

      let currentY = 0;

      this.pdfAPI.deletePage(1);
      this.pdfAPI.addPage('a4', 'portrait');
      this.pdfAPI.setFont('gtamerica', 'Light');
      this.pdfAPI.setFontSize(textFontSize);

      this.pdfAPI.setFillColor(pageFillColor);
      this.pdfAPI.rect(0, 0, pageWidth, pageHeight, 'F');

      const loadLogo = new Promise(resolve => {
        setTimeout(() => {
          this.pdfAPI.addImage(domLogo, 'PNG', logoX, logoY, logoWidth, logoHeight);
          resolve();
        }, 0);
      });
      await loadLogo;
      currentY = logoY;

      currentY += cellPadding * 2.8;
      this.pdfAPI.line(xOffset, currentY, pageWidth - xOffset, currentY);
      currentY += cellPadding;
      this.steps.forEach((step, index) => {
        let selectedValue = step.elements[this.selectedElement[`step_${index}`]].name;
        if (step.modifier === 'size') {
          selectedValue += ' cm';
        } else if (step.modifier === 'mattress') {
          selectedValue = `No. ${this.selectedElement[`step_${index}`] + 1}`;
        }
        this.pdfAPI.text(this.formatStepResultTitle(step.resultsTitle), textOffsetX, currentY);
        this.pdfAPI.text(selectedValue, pageWidth - textOffsetX, currentY, {
          align: 'right',
        });
        currentY += cellPadding - 3.5;
        this.pdfAPI.line(xOffset, currentY, pageWidth - xOffset, currentY);
        currentY += cellPadding;
      });

      currentY -= 32;

      const images = this.$refs.images.getElementsByTagName('img');
      if (images.length) {
        for (const image of Array.from(images)) {
          const promise = new Promise(resolve => {
            setTimeout(() => {
              this.pdfAPI.addImage(image, 'PNG', xOffset + 9, currentY, imageSide, imageSide);
              resolve();
            }, 0);
          });
          await promise;
        }
      }
      currentY += imageSide + 18;
      this.pdfAPI.setFontSize(12);

      this.pdfAPI.text(text, xOffset, currentY, {
        maxWidth: pageWidth * 0.45,
      });

      currentY += textFontSize + 5;
      this.pdfAPI.setFontSize(14);

      this.pdfAPI.textWithLink(link, xOffset, currentY, { // be careful to change, link coordinated manually
        url: link,
      });

      this.pdfAPI.setFillColor('#000');
      //this.pdfAPI.rect(56, currentY - 16, 25, 5, 'F');
      //this.pdfAPI.rect(87, currentY - 16, 25, 5, 'F');

      this.pdfAPI.link(56, currentY - 16, 25, 5, {
        url: 'https://jmarshall.co.uk/contact/',
      });

      this.pdfAPI.link(87, currentY - 16, 25, 5, {
        url: 'https://jmarshall.co.uk/find-us/',
      });

      const canvas = await this.hetQrCode(link);

      const loadQr = new Promise(resolve => {
        setTimeout(() => {
          this.pdfAPI.addImage(canvas, 'JPEG', pageWidth - xOffset - qrSide, pageHeight - yOffset - qrSide, qrSide, qrSide);
          resolve();
        }, 0);
      });
      await loadQr;
      this.pdfAPI.save('jmarshal-configurator.pdf');
      this.disableLoader();
    },

  },
};
