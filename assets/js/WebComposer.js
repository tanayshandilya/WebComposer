/*------------ PollyFills --------------*/
if (! Object.prototype.import) {
  /**
  * @param {Function} elementFunction
  */
  Object.prototype.import = function(elementFunction){
    if(this.getAttribute('type') && this.getAttribute('type') === 'template'){
      if(this.getAttribute('src')){
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            elementFunction(this.responseText);
          }
        };
        xhttp.open('GET', this.getAttribute('src'), true);
        xhttp.send(); 
      }else{
        this.innerHTML = '<pre style="color:#f44336">"src" Attribute is not defined</pre>';
      }
    }else{
      this.innerHTML = '<pre style="color:#f44336">"type" Attribute is not defined</pre>';
    }
  }
}

if (! Object.prototype.translateAttributes ) {
  /**
  * @param {Object} targetElement
  */
  Object.prototype.translateAttributes = function(targetElement){
    for(var i = 0; i < this.attributes.length; i++){
      if (!this.attributes[i].name.startsWith(':'))
        targetElement.setAttribute(this.attributes[i].name,this.attributes[i].value);
      this.removeAttribute(this.attributes[i].name);
    }    
  }
}

if (! Object.prototype.translateHTML) {
  /**
  * @param {Object} targetElement
  */
  Object.prototype.translateHTML = function(targetElement){
    this._content = this.innerHTML;
    this.innerHTML = '';
    targetElement.innerHTML = this._content;
  }
}
/*------------ /PollyFills --------------*/

class WebComposer {
  /**
  * @param {Object} config
  */
  constructor(config){
    this.config = config;
    this.importTemplates();
  }
  async importTemplates(){
    this.IMPORTS = document.querySelectorAll('import');
    for (var i = 0; i < this.IMPORTS.length; i++) {
      this.IMPORTS[i].import((responseText)=>{
        this.registerElements(responseText);
      });
    }
  }
  registerElements(templateTxt){
    this.templateNodes = this.templateParser(templateTxt);
    for (var i = 0; i < this.templateNodes.length; i++) {
      this.createNewElement(
        this.templateNodes[i],
        this.templateNodes[i].id,
        this.templateNodes[i].getAttribute('type'),
        this.config
      );
    }
  }
  createNewElement(template,elementName,elementType,elementBehavior){
    window.customElements.define(elementName, class extends HTMLElement {
      constructor() {
          super();
          this._shadowRoot = this.attachShadow({ 'mode': 'open' });
          this._shadowRoot.appendChild(template.content.cloneNode(true));
          elementBehavior[elementType](this, this._shadowRoot);
        }
    });
  }
  templateParser(txt){
    let dp = new DOMParser();
    let html = dp.parseFromString(txt,'text/html');
    return html.querySelectorAll('template');
  }
}