Class {
	#name : #ScgbibHomeSection,
	#superclass : #GtHomeMultiCardSection,
	#category : #'Scgbib-Sections'
}

{ #category : #accessing }
ScgbibHomeSection >> scgbibCard [
	<gtSectionCard>
	<gtExample>
	^ GtHomeCard page
		title: 'SCG Bibliography';
		description: 'SCG Bibliography project';
		databaseName: 'scgbern/scgbib/lepiter';
		pageName: 'SCG Bibliography';
		priority: 10
]

{ #category : #accessing }
ScgbibHomeSection >> sectionTitle [
	^ 'SCG bib section'
]
