Under Active development, NOT in playable state

__GOAL:__ Play singleplayer/multiplayer card games all you need to do is load a config file.

__RELEASE:__ Playable release will be versioned 1.0

__GETTING STARTED:__

```npm install```

```npm run start```

__REQUIREMENTS:__

Frontend: [react-card-client](https://github.com/donleyac/react-card-client)

__PROCESS FLOW:__
* Client Connects to Port 8090 -> Emit Server Store to Client
* Client Emits Action -> Merge Action into Server Store
* Server Store Changes -> Emit Server Store to all Clients

__REDUX REDUCER ACTIONS:__
* INITIAL_STATE: Creates Immutable Map from JSON Config
* INDICATORS: Replace Indicator or Add/Minus Val to Indicator
* COLLECTIONS:
  * (layout=free, prop=content, op=chg): Replace inner content in 2D collection
  * Push content to collection
  * Remove content from collection
  * Replace entire collection
