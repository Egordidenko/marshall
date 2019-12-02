export default `
<div class="configurator-preview"
  :class="{visible: isViewMode}"
>
  <div class="configurator-preview__inner">
    <div class="configurator-preview__images" ref="images">
      <div class="configurator-preview__images-box">
        <transition-group name="configurator-image-animation" tag="div">
          <img
          v-for="image in selectedImages"
          :src="image.src" 
          :key="image.key"
          alt="layer of configurator"
          >
        </transition-group>
      </div>
    </div>
    <div class="configurator-preview__size">
      <span>Photo for illustrative purposes. Size shown: 150x200 cm.</span>
    </div>
    <div class="configurator-preview__side-select">
      <button
        v-for="side in sidesArray"
        :class="{
          active: activeSide === side
        }"
        @mouseenter="loadImageOnHoverSide(side)"
        @click="activeSide = side"
      >{{side}}</button>
    </div>
    <div class="configurator-preview__confirm-button">
      <button class="button" @click="isTimeToConfirm = true; isViewMode = false">Confirm Selection</button>
    </div>
  </div>
  <div class="configurator-preview__preloaded-images" v-if="loadedImagesArr.length">
    <img :src="image" alt="preloded image" v-for="image in loadedImagesArr" :key="image">
  </div>
</div>
`;
