document.addEventListener('DOMContentLoaded',()=>{
  new WebComposer({
    button: (customElement,shadowRoot)=>{
      this._style = shadowRoot.querySelector('style');
      this._style.prepend(`:host{
        --theme-color: ${customElement.getAttribute(':theme') || '#515151'};
        --theme-background: ${customElement.getAttribute(':theme') || '#515151'}14;
        --theme-font: ${customElement.getAttribute(':font') || 'sans-serif'};
      }`);
      customElement.translateAttributes(shadowRoot.querySelector('button'));
      customElement.translateHTML(shadowRoot.querySelector('button'));
    },
    a: (customElement,shadowRoot)=>{
      this._style = shadowRoot.querySelector('style');
      this._style.prepend(`:host{
        --theme-color: ${customElement.getAttribute(':theme') || '#515151'};
        --theme-background: ${customElement.getAttribute(':theme') || '#515151'}14;
        --theme-font: ${customElement.getAttribute(':font') || 'sans-serif'};
      }`);
      customElement.translateAttributes(shadowRoot.querySelector('a'));
      customElement.translateHTML(shadowRoot.querySelector('a'));
    }
  });
});