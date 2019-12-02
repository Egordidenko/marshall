import stepItem from './template-step-item';

export default `
<transition name="configurator-transition">
<div class="configurator-settings" data-cursor-color="white" v-show="!isTimeToConfirm">
  <div class="configurator-settings__steps"
    :class="{
      'no-border': activeStep === steps.length - 1 && activeStep !== previousStep
    }"
  >
    <div class="configurator-settings__step"
      v-for="(step, stepIndex) in steps" :key = step.id>
      <div class="configurator-settings__step-heading"
      data-cursor-type="bigger"
        @click="handleStepClick(stepIndex)"
      >
        <span class="configurator-settings__step-number">{{stepIndex + 1}}</span>
        <span class="configurator-settings__step-title">{{step.title}}</span>
        <span class="configurator-settings__step-selected"
        :class="{size: step.modifier !== 'size'}"
        v-if="step.modifier !== 'mattress'"
        >{{steps[stepIndex].elements[selectedElement['step_' + stepIndex]].name}}<span v-if="step.modifier === 'size'"> cm</span></span>
        <span class="configurator-settings__step-selected"
        v-else
        >No. {{selectedElement['step_' + stepIndex] + 1}}</span>
      </div>
      <div class="configurator-settings__step-content"
        :style="stepIndex > 0 ? 'height: 0' : ''"
        :class="{
          'has-border': activeStep === stepIndex && activeStep !== previousStep
        }"
        ref="stepContent"
        >
        <div class="configurator-settings__step-content-items"
                ref="stepContentInner"
                :class="'configurator-settings__step-content-items--' + step.modifier"
              >
           ${stepItem}
        </div>
      </div>
    </div>
  </div>
  <div class="configurator-settings__confirm-button">
    <button class="button button--white" @click="isTimeToConfirm = true">Confirm Selection</button>
  </div>
</div>
</transition>
`;
