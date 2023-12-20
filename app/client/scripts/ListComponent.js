export class ListComponent extends HTMLElement {
	constructor(){
		super();
		this.attachShadow({ mode: 'open' });
	}

	connectedCallback(){
		this.renderList();
	}

	static get observedAttributes(){
		return ['items', 'fragment'];
	}

	attributeChangedCallback(name, oldValue, newValue){
		if((name === 'items' || name === 'fragment') && oldValue !== newValue){
			this.renderList();
		}
	}

	get items(){
		return JSON.parse(this.getAttribute('items') || '[]');
	}

	set items(value){
		this.setAttribute('items', JSON.stringify(value));
	}

	get fragment(){
		return this.getAttribute('fragment') || '';
	}

	renderList(){
		const template = document.createElement('template');
		this.items.forEach(item => {
			const processedFragment = this.fragment.replace(/\{\{item\}\}/g, item);
			template.innerHTML += processedFragment;
		});

		this.shadowRoot.innerHTML = '';
		this.shadowRoot.appendChild(template.content.cloneNode(true));
	}
}

customElements.define('list-component', ListComponent);
