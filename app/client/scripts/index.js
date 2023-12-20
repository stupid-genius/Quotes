import './QuoteList';

/* TODO
change text size of quote to fit to div
add random mode
? allow filtering
? change UI to be single
add MD service to allow MD in quotes
*/

customElements.whenDefined('quote-list').then(async () => {
	const quotesList = document.querySelector('quote-list');

	if(quotesList.isConnected){
		const response = await fetch('quotes.json');

		if(!response.ok){
			throw new Error(`Failed to fetch quotes: ${response.statusText}`);
		}

		// this has side effects
		quotesList.items = (await response.json()).sort().map((e) => {
			const quote = e.split(/::/);
			quotesList.quotes[quote[0]]=quote;
			return quote[0];
		});
		quotesList.connectedCallback();

		const searchParams = new URLSearchParams(window.location.search);
		const query = searchParams.get('id') || searchParams.get('name');
		if(query){
			quotesList.selectQuote(query);
		}
	}
});
