Class {
	#name : #BaselineOfScgbib,
	#superclass : #BaselineOf,
	#category : #BaselineOfScgbib
}

{ #category : #baseline }
BaselineOfScgbib >> baseline: spec [
	<baseline>
		^ spec for: #common do: [
			spec package: 'Scgbib'
		]
]
