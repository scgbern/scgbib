Extension { #name : #GtHome }

{ #category : #'*Scgbib' }
GtHome >> scgbibSection [
	<gtHomeSection>
	^ GtHomeStartPageSection new 
		title: 'SCG Bibliography';
		description: 'SCG Bibliography project';
		databaseName: 'scgbern/scgbib/lepiter';
		startPageName: 'SCG Bibliography';
		priority: 8
]
