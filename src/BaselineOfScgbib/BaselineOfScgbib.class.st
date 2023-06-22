Class {
	#name : #BaselineOfScgbib,
	#superclass : #BaselineOf,
	#category : #BaselineOfScgbib
}

{ #category : #loading }
BaselineOfScgbib class >> loadLepiter [
	IceRepository registry  
		detect: [ :aRepository |
			aRepository name = 'scgbib' ]
		ifFound: [ :aRepository | 
			| defaultDatabase currentProperties |
			defaultDatabase := LeDatabasesRegistry defaultLogicalDatabase.
			currentProperties := defaultDatabase properties.
			currentProperties addRegisteredDirectory: aRepository repositoryDirectory / 'lepiter'.
			defaultDatabase reload ]
		ifNone: [
			self inform: 'Repository not found.' ]
]

{ #category : #baseline }
BaselineOfScgbib >> baseline: spec [
	<baseline>
		^ spec for: #common do: [
			spec package: 'Scgbib'
		]
]
