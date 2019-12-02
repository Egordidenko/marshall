import settings from './template-settings';
import preview from './template-preview';
import result from './template-result';
import header from './template-header';
import outConfirmation from './template-out-confirmation';
import sharePopup from './template-share-popup';

export default `
<div class="configurator">
  ${outConfirmation}
  ${header}
  ${sharePopup}
  <div class="configurator__build-part" ref="content">
    ${settings}
    ${result}
    ${preview}
  </div>
</div>
`;
