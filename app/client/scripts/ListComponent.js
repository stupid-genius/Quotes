export class ListComponent extends HTMLElement{
	constructor(){
		super();
		this.attachShadow({ mode: 'open' });
	}

	connectedCallback(){
		this.renderList();
	}

	static get observedAttributes(){
		return ['items'];
	}

	attributeChangedCallback(name, oldValue, newValue){
		if((name === 'items') && oldValue !== newValue){
			this.renderList();
		}
	}

	get items(){
		return JSON.parse(this.getAttribute('items') || '[]');
	}

	set items(value){
		this.setAttribute('items', JSON.stringify(value));
	}

	renderList(){
		const fragment = [].filter.call(this.childNodes, node => node.nodeType === 1)[0].outerHTML;
		const template = document.createElement('template');
		this.items.forEach(item => {
			const processedFragment = fragment.replace(/\{\{item\}\}/g, item);
			template.innerHTML += processedFragment;
		});

		this.shadowRoot.innerHTML = '';
		this.shadowRoot.appendChild(template.content.cloneNode(true));
	}
}

customElements.define('list-component', ListComponent);
