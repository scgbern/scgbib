Class {
	#name : #BaselineOfScgbib,
	#superclass : #BaselineOf,
	#category : #BaselineOfScgbib
}

{ #category : #accessing }
BaselineOfScgbib class >> loadLepiter [
	[ | currentProperties |
	currentProperties := LeDatabasesRegistry defaultLogicalDatabase properties.
	currentProperties
		addRegisteredDirectory: FileLocator imageDirectory / 'pharo-local' / 'iceberg' / 'scgbern' / 'scgbib'
				/ 'lepiter'.
	LeDatabasesRegistry default defaultLogicalDatabase reload ]
]

{ #category : #baseline }
BaselineOfScgbib >> baseline: spec [
	<baseline>
		^ spec for: #common do: [
			spec package: 'Scgbib'
		]
]
