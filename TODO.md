# TODO

**Legend**
- [ ] Not done
- [x] Done
- [ ] <span style="background-color:yellow">Quality of development</span>
- [ ] <span style="background-color:darkorange">Better playability</span>
- [ ] <span style="background-color:lightgreen">Optional (Might never be implemented)</span>
- [ ] <span style="background-color:lightcoral">Critical (game breaking or crash potential)</span>


## Game

- [ ] <span style="background-color:darkorange">Add english board generation</span>
- [ ] <span style="background-color:darkorange">Better wordlist</span>
- [ ] <span style="background-color:darkorange">Pass your turn</span>
- [ ] <span style="background-color:lightcoral">implement win condition</span>
- [x] <span style="background-color:darkorange">Add spymaster interface</span>
- [x] <span style="background-color:darkorange">Fix chat size</span>
- [x] <span style="background-color:darkorange">Give gamemaster option to change role during a game</span>
- [x] <span style="background-color:darkorange">Make player afk on disconnect</span>
- [x] <span style="background-color:lightcoral">Add word picking/board generation</span>
- [x] <span style="background-color:lightcoral">Fix goback with websocket</span>
- [x] <span style="background-color:lightcoral">Hitting F5 too much will disconnect beacause of multipple instances</span>
- [x] <span style="background-color:lightcoral">Update board on role change</span>
- [x] <span style="background-color:lightcoral">change color should take care of spymaster</span>
- [x] <span style="background-color:lightcoral">connecting from two tabs and then disconnecting disconnect the player</span>
- [x] <span style="background-color:yellow">Delete game on last quit</span>
- [x] <span style="background-color:yellow">Use state machine pattern for game</span>

### Lobby

- [ ] <span style="background-color:darkorange">Add change team option</span>
- [ ] <span style="background-color:darkorange">Add possibility for game master to lock team picking</span>
- [x] <span style="background-color:darkorange">Add gamemaster commands</span>
- [x] <span style="background-color:darkorange">Add player contextual menu for game master</span>
- [x] <span style="background-color:darkorange">Add room overview</span>

### History

- [x] <span style="background-color:darkorange">Fix text alignment</span>
- [x] <span style="background-color:darkorange">Make playerchip white theme friendly</span>
- [x] <span style="background-color:lightcoral">Handle card reveal</span>
- [x] <span style="background-color:lightcoral">Handle disconnect</span>
- [x] <span style="background-color:lightcoral">Handle set game master</span>
- [x] <span style="background-color:lightcoral">Handle set spy master</span>

## Tests

- [ ] <span style="background-color:lightcoral">Join game exactly when it deletes</span>
- [ ] <span style="background-color:lightcoral">Server Crash on gamestart ??? isAdmin undefined</span>
- [ ] <span style="background-color:yellow">Begin</span>
- [ ] <span style="background-color:yellow">Install a CI</span>
- [ ] <span style="background-color:yellow">Use moccha/nyc ?</span>
- [x] <span style="background-color:lightcoral">Call state method without parameters</span>

## Cleanup

- [ ] <span style="background-color:yellow">Implement reducers</span>
- [ ] <span style="background-color:yellow">Look at fork-ts-checker-webpack-plugin</span>
- [ ] <span style="background-color:yellow">Make setter to dispatch players changed event</span>
- [ ] <span style="background-color:yellow">Sort Game.ts methods</span>
- [ ] <span style="background-color:yellow">Split Game.ts</span>
- [ ] <span style="background-color:yellow">Use class for player instead of interface</span>
- [ ] <span style="background-color:yellow">Use enums instead of types for Team and HistoryAction</span>
- [ ] <span style="background-color:yellow">find a method to bundle 'playersUpdate'</span>
- [x] <span style="background-color:darkorange">Fix HUMONGOUS bundle size</span>
- [x] <span style="background-color:lightcoral">Fix get spies and admins</span>
- [x] <span style="background-color:yellow">Get rid of GameMasterUUID or use a unique setter</span>
- [x] <span style="background-color:yellow">Get rid of spymaster red and blue properties</span>
- [x] <span style="background-color:yellow">Split shared/interfaces into single files</span>
- [x] <span style="background-color:yellow">Transform getXXX into real getter</span>
- [x] <span style="background-color:yellow">Unify admin and GameMaster</span>
- [x] <span style="background-color:yellow">Use maps to get rid of @ts-ignore</span>
- [x] <span style="background-color:yellow">`this.player[playerUUID] -> player` vv</span>
- [x] <span style="background-color:yellow">try to not use Array.form() in removePlayer for spyMaster</span>

## Style

- [ ] <span style="background-color:darkorange">Disable player context menues for nonGameMaster</span>
- [ ] <span style="background-color:darkorange">Disable startGame for nonGameMaster</span>
- [ ] <span style="background-color:darkorange">put border around dinamic elements</span>
- [ ] <span style="background-color:lightgreen">Extremely long name breaks style</span>
- [ ] <span style="background-color:yellow">Put everything in theme</span>
- [x] <span style="background-color:yellow">Add icons to playerchip</span>

## Features

- [ ] <span style="background-color:darkorange">Add games overview on home page</span>
- [ ] <span style="background-color:darkorange">Going to profile from a game remembers it ? (also use last page or mouse 4 button you dummy...)</span>
- [ ] <span style="background-color:darkorange">New game after game finish</span>
- [ ] <span style="background-color:lightgreen">Add possibility of custom board</span>
- [ ] <span style="background-color:lightgreen">Add possibility of custom wordlist</span>
- [ ] <span style="background-color:lightgreen">Possibility to kick a player</span>
- [ ] <span style="background-color:lightgreen">Possibility to make password protected games</span>
- [ ] <span style="background-color:lightgreen">Team chats</span>
- [ ] <span style="background-color:lightgreen">voting system ?</span>
- [x] <span style="background-color:darkorange">Display name on profile page</span>
- [x] <span style="background-color:darkorange">Fix typos</span>

## One step-er
