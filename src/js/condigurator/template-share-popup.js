export default `
<div class="conf-share-popup"
  :class="{visible: sharePopupIsOpened}"
  @click.self="sharePopupIsOpened = false"
  data-cursor-color="white"
>
  <div class="conf-share-popup__inner" data-cursor-color="default">
    <button class="conf-share-popup__close" @click="sharePopupIsOpened = false">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18.2 16">
        <path d="M9.1 6.9L14 2l1.1 1.1L10.2 8l4.9 4.9L14 14 9.1 9l-4.9 5-1.1-1.1 5-4.9-5-4.9L4.2 2l4.9 4.9z"/>
      </svg>
    </button>
    <p class="conf-share-popup__title">Share with others</p>
    <h3 class="conf-share-popup__sub-title">Share via Link</h3>
    <div class="conf-share-popup__link-box">
      <input @click="copyLink" type="text" class="conf-share-popup__link" ref="shareInput" readonly :value="codedUrl">
      <div class="conf-share-popup__link-btn">
        <button @click="copyLink" class="button">
          <span>Copy Link</span>
          <span>Copied</span>
        </button>
      </div>
    </div>
    <h3 class="conf-share-popup__sub-title">Share via Socials</h3> 
    <div class="conf-share-popup__socials">
      <a class="barba-prevent" :href="'https://www.facebook.com/sharer.php?u=' + codedUrl" @click.prevent="shareSocial">Facebook</a>
      <a class="barba-prevent" :href="'https://twitter.com/intent/tweet?url=' + codedUrl" @click.prevent="shareSocial">Twitter</a>
    </div>
  </div>
</div>
`
