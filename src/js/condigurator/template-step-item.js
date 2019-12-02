export default `
<div class="configurator-step-item"
   :class="[
   ('configurator-step-item--' + step.modifier),
   {active: selectedElement['step_' + stepIndex] === elementIndex}
   ]"
   @click="handleElementClick(stepIndex, elementIndex)"
   @mouseenter="loadImageOnHoverElement(element)"
   data-cursor-type="bigger"
   v-for="(element, elementIndex) in step.elements"
>
  <div class="configurator-step-item__inner">
    <div class="configurator-step-item__image">
      <img :src="element.thumbnail" :alt="'image for ' +  element.name">
    </div>
    <div class="configurator-step-item__name">
      <span v-if="step.modifier === 'mattress'">No. {{elementIndex + 1}}</span>
      <span v-if="step.modifier === 'size'">{{element.name}} cm</span>
      <span v-else-if="step.modifier === 'fabric'" v-html="formatFabricCapture(element.name)"></span>
      <span v-else>{{element.name}}</span>
    </div>
  </div>
</div>
`;
