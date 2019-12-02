import HomePage from './pages/Home-page';
import ContactPage from './pages/Contact-page';
import scrollTo from './helpers/scroll-to';
import BedsPage from './pages/Beds-page';
import ConfiguratorPage from './pages/Configurator-page';
import FindUsPage from './pages/Find-us-page';


export default (global) => {
  return [
    {
      namespace: 'home-page',
      afterEnter() {
        try {
          setTimeout(() => {
            global.homePage = new HomePage();
            global.homePage.init();
            global.languageMenu.init();
            global.header.initStyleTrigger();
            global.header.resetMobileMenuControl();
            scrollTo();
            global.lazyImages.init();
            window.scrollTo(0, 0);
          }, 0);
        } catch (e) {
          console.log(e);
        }
      },
      beforeLeave() {
        try {
          global.homePage.destroy();
          global.homePage = null;
          global.header.destroyStyleTrigger();
          global.header.closeMobileLang();
          global.header.closeMobileMenu();
          global.languageMenu.destroy();
          global.lazyImages.destroy();
        } catch (e) {
          console.log(e);
        }
      },
    },
    {
      namespace: 'contact-page',
      afterEnter() {
        try {
          setTimeout(() => {
            global.contactsPage = new ContactPage();
            global.contactsPage.init();
            global.header.initStyleTrigger();
            global.header.resetMobileMenuControl();
            global.languageMenu.init();
            window.scrollTo(0, 0);
          }, 0);
        } catch (e) {
          console.log(e);
        }
      },
      beforeLeave() {
        try {
          global.contactsPage.destroy();
          global.contactsPage = null;
          global.languageMenu.destroy();
          global.header.destroyStyleTrigger();
          global.header.closeMobileLang();
          global.header.closeMobileMenu();
        } catch (e) {
          console.log(e);
        }
      },
    },
    {
      namespace: 'beds-page',
      afterEnter(data) {
        try {
          setTimeout(() => {
            const trigger = data.trigger;
            const bedIndex = trigger.getAttribute && trigger.getAttribute('data-bed-slide');
            if (bedIndex) {
              global.bedIndex = +bedIndex;
            }
            global.bedsPage = new BedsPage({
              bedIndex: global.bedIndex,
            });
            global.bedsPage.init();
            global.header.initStyleTrigger();
            global.header.resetMobileMenuControl();
            global.languageMenu.init();
            scrollTo();
            global.lazyImages.init();
            window.scrollTo(0, 0);
          }, 0);
        } catch (e) {
          console.log(e);
        }
      },
      beforeLeave() {
        try {
          global.bedIndex = 0;
          global.bedsPage.destroy();
          global.bedsPage = null;
          global.languageMenu.destroy();
          global.header.destroyStyleTrigger();
          global.header.closeMobileLang();
          global.header.closeMobileMenu();
          global.lazyImages.destroy();
        } catch (e) {
          console.log(e);
        }
      },
    },
    {
      namespace: 'configurator-page',
      afterEnter() {
        try {
          setTimeout(() => {
            global.configuratorPage = new ConfiguratorPage({header: global.header});
            global.configuratorPage.init();
            global.header.initStyleTrigger();
            global.header.resetMobileMenuControl();
            global.header.enableConfiguratorMode();
            window.scrollTo(0, 0);
          }, 0);
        } catch (e) {
          console.log(e);
        }
      },
      beforeLeave() {
        try {
          global.configuratorPage.destroy();
          global.configuratorPage = null;
          global.header.disableConfiguratorMode();
          global.header.closeMobileLang();
          global.header.closeMobileMenu();
          global.header.unBlurHeader();
        } catch (e) {
          console.log(e);
        }
      },
    },
    {
      namespace: 'privacy-page',
      afterEnter() {
        try {
          setTimeout(() => {
            global.header.initStyleTrigger();
            global.header.resetMobileMenuControl();
            window.scrollTo(0, 0);
          }, 0);
        } catch (e) {
          console.log(e);
        }
      },
      beforeLeave() {
        try {
          global.header.closeMobileLang();
          global.header.closeMobileMenu();
        } catch (e) {
          console.log(e);
        }
      },
    },
    {
      namespace: 'slavery-page',
      afterEnter() {
        try {
          setTimeout(() => {
            global.header.initStyleTrigger();
            global.header.resetMobileMenuControl();
            window.scrollTo(0, 0);
          }, 0);
        } catch (e) {
          console.log(e);
        }
      },
      beforeLeave() {
        try {
          global.header.closeMobileLang();
          global.header.closeMobileMenu();
        } catch (e) {
          console.log(e);
        }
      },
    },
    {
      namespace: 'find-us-page',
      afterEnter() {
        try {
          setTimeout(() => {
            global.findUsPage = new FindUsPage();
            global.findUsPage.init();
            global.header.initStyleTrigger();
            global.header.resetMobileMenuControl();
            window.scrollTo(0, 0);
          }, 0);
        } catch (e) {
          console.log(e);
        }
      },
      beforeLeave() {
        try {
          global.findUsPage.destroy();
          global.findUsPage = null;
          global.header.closeMobileLang();
          global.header.closeMobileMenu();
        } catch (e) {
          console.log(e);
        }
      },
    },
  ];
}
