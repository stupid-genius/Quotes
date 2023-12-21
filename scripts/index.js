(()=>{var r=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.renderList()}static get observedAttributes(){return["items","fragment"]}attributeChangedCallback(t,e,s){(t==="items"||t==="fragment")&&e!==s&&this.renderList()}get items(){return JSON.parse(this.getAttribute("items")||"[]")}set items(t){this.setAttribute("items",JSON.stringify(t))}get fragment(){return this.getAttribute("fragment")||""}renderList(){let t=document.createElement("template");this.items.forEach(e=>{let s=this.fragment.replace(/\{\{item\}\}/g,e);t.innerHTML+=s}),this.shadowRoot.innerHTML="",this.shadowRoot.appendChild(t.content.cloneNode(!0))}};customElements.define("list-component",r);var a=class extends HTMLElement{name;quote;get name(){return this.name}set name(t){this.name=t}get quote(){return this.quote}set quote(t){this.quote=t}render(){this.innerHTML=`
            \u201C<span id="quote">${this.quote.replace(/\n/g,"<br />")}</span>\u201D
            <div id="nameTag">\u2015<span id="name">${this.name}</span></div>
        `}};function u(){if(!new.target)return new u;let n={},t=[],e={get:function(s,o){let i=String(o);if(isNaN(Number(i))){let d=t.indexOf(i);return s[d]}else return s[i]},set:function(s,o,i){return s[t.length]=i,t.push(o),!0}};return new Proxy(n,e)}var c=class extends r{quote=new a;quotes=new u;constructor(){super();let t=document.querySelector("#rightPage > div");t.innerHTML="",t.appendChild(this.quote)}connectedCallback(){super.connectedCallback(),this.generateList()}generateList(){let t=document.createElement("ul");t.setAttribute("id","quotesList"),t.setAttribute("part","quotesList");let e=this.shadowRoot.children;Object.entries(e).forEach(([s,o])=>{o.setAttribute("part","quote"),o.addEventListener("click",()=>{this.selectQuote(s),history.pushState({},"",`${window.location.pathname}?id=${s}`)}),t.appendChild(o)}),this.shadowRoot.innerHTML="",this.shadowRoot.appendChild(t)}selectQuote(t){let e=this.quotes[t];e&&(this.quote.name=e[0],this.quote.quote=e[1],this.quote.render())}};customElements.define("quote-display",a);customElements.define("quote-list",c);customElements.whenDefined("quote-list").then(async()=>{let n=document.querySelector("quote-list");if(n.isConnected){let t=await fetch("/quotes.json");if(!t.ok)throw new Error(`Failed to fetch quotes: ${t.statusText}`);n.items=(await t.json()).sort().map(o=>{let i=o.split(/::/);return n.quotes[i[0]]=i,i[0]}),n.connectedCallback();let e=new URLSearchParams(window.location.search),s=e.get("id")||e.get("name");s&&n.selectQuote(s)}});})();
