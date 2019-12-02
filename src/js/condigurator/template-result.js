export default `
<transition name="configurator-transition">
  <div class="configurator-result" v-show="isTimeToConfirm">
    <div class="configurator-result__inner">
      <ul class="configurator-result__list" ref="resultList" id="test">
        <li class="configurator-result__item"
        v-for="(step, index) in steps"
        >
          <span class="configurator-result__item-name">{{formatStepResultTitle(step.resultsTitle)}}</span>
          <span class="configurator-result__item-value"
          :class="{
            italic: step.modifier !== 'size'
          }"
          v-if="step.modifier !== 'mattress'"
          >{{steps[index].elements[selectedElement['step_' + index]].name}} <span v-if="step.modifier === 'size'">cm</span></span>
          <span class="configurator-result__item-value"
          v-else
          >No. {{selectedElement['step_' + index] + 1}}</span>
        </li>
      </ul>
      <div class="configurator-result__buttons" v-if="pdfScriptIsLoaded">
        <div class="configurator-result__button">
          <button class="button" @click="downloadPDF()">
          <img :style="{
          opacity: isLoading && isTouchDevice ? 1 : 0
          }" 
          src="https://jmarshall.co.uk/wp-content/themes/my-theme/assets/img/loader.svg'" alt="loader">
          <span :style="{
          opacity: isLoading && isTouchDevice ? 0 : 1
          }" 
          >Download PDF</span>
          </button>
        </div>
        <div class="configurator-result__button">
          <button @click="sharePopupIsOpened = true" class="button">Share</button>
        </div>
      </div>
      <p class="configurator-result__info">Or if you have any question or if you want to see your bed in person, <a :href="baseURL + 'contact/'">get in touch</a> or <a :href="baseURL + 'find-us/'">find a store</a>.</p>
    </div>
  </div>
</transition>
`;
