import { ListComponent } from './ListComponent.js';

class QuoteComponent extends HTMLElement{
	name;
	quote;

	get name(){
		return this.name;
	}

	set name(newVal){
		this.name = newVal;
	}

	get quote(){
		return this.quote;
	}

	set quote(newVal){
		this.quote = newVal;
	}

    render(){
        this.innerHTML = `
            “<span id="quote">${this.quote.replace(/\n/g,'<br />')}</span>”
            <div id="nameTag">―<span id="name">${this.name}</span></div>
        `;
    }
}

function Quotes(){
	if(!new.target){
		return new Quotes();
	}
	const quotes = {};
	const keys = [];
	const handler = {
		get: function(target, prop){
			const key = String(prop);
			if(!isNaN(Number(key))){
				return target[key];
			}else{
				const index = keys.indexOf(key);
				return target[index];
			}
		},
		set: function (target, prop, value) {
			target[keys.length] = value;
			keys.push(prop);
			return true;
		},
	};

	return new Proxy(quotes, handler);
}

class QuoteListComponent extends ListComponent{
	quote = new QuoteComponent();
	quotes = new Quotes();

	constructor(){
		super();
		const rightPage = document.querySelector('#rightPage > div');
		rightPage.innerHTML = '';
		rightPage.appendChild(this.quote);
	}

	connectedCallback(){
		super.connectedCallback();
		this.generateList();
	}

	generateList(){
		const wrapper = document.createElement('ul');
		wrapper.setAttribute('id', 'quotesList');
		wrapper.setAttribute('part', 'quotesList');

		const listItems = this.shadowRoot.children;
		Object.entries(listItems).forEach(([i, li]) => {
			li.setAttribute('part', 'quote');
			li.addEventListener('click', () => {
				this.selectQuote(i);
				history.pushState({}, '', `${window.location.pathname}?id=${i}`);
			});
			wrapper.appendChild(li);
		});

		this.shadowRoot.innerHTML = '';
		this.shadowRoot.appendChild(wrapper);
	}

	selectQuote(query){
		const quote = this.quotes[query];
		if(quote){
			this.quote.name = quote[0];
			this.quote.quote = quote[1];
			this.quote.render();
		}
	}
}

customElements.define('quote-display', QuoteComponent);
customElements.define('quote-list', QuoteListComponent);
