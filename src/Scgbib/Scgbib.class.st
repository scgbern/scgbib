"
I encapsulate the SCG bibliography data.
I am a Singleton, as there is no reason to reload me.
"
Class {
	#name : #Scgbib,
	#superclass : #Object,
	#instVars : [
		'data'
	],
	#classInstVars : [
		'instance'
	],
	#category : #Scgbib
}

{ #category : #accessing }
Scgbib class >> instance [
	^ instance ifNil: [ instance := self new ]
]

{ #category : #accessing }
Scgbib >> data [
	^ data
]

{ #category : #accessing }
Scgbib >> data: anObject [
	data := anObject
]

{ #category : #accessing }
Scgbib >> gtItemsFor: aView [
	<gtView>
	^ aView forward
		title: 'SCG Bib items';
		priority: 20;
		object: [ self data  ];
		view: #gtItemsFor:
]

{ #category : #testing }
Scgbib >> hasKey: aKey [
	^ self data includesKey: aKey
]

{ #category : #accessing }
Scgbib >> initialize [
	self
		data: ((STON fromString: self jsonFile contents)
				collect: [ :each | (each at: 'key') -> each ]) asOrderedDictionary
]

{ #category : #constant }
Scgbib >> jsonFile [
	^ FileLocator imageDirectory / 'pharo-local/iceberg/scgbern/scgbib/scgbib.json'
]

{ #category : #accessing }
Scgbib >> oldInitializeFromUrl [
	| url json |
	url := 'https://raw.githubusercontent.com/scgbern/scgbib/main/scgbib.json'.
	json := ZnClient new get: url.
	self
		data: ((STON fromString: json) collect: [ :each | (each at: 'key') -> each ])
				asOrderedDictionary
]
