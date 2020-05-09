# TODO

## Game

- [ ] Add english board generation
- [ ] Add turn handling
- [ ] Add word picking/board generation
- [ ] Better wordlist
- [ ] Delete game on last quit
- [ ] Game loop
- [ ] Give gamemaster option to change role during a game only if spymaster gets diconnected.
- [ ] Pass your turn
- [ ] Update board on role change
- [ ] Use state machine pattern for game
- [ ] implement win condition
- [x] Add spymaster interface
- [x] Fix chat size
- [x] Fix goback with websocket
- [x] Make player afk on disconnect

### Lobby

- [ ] Add change team option
- [ ] Add gamemaster commands
- [ ] Add player contextual menu for game master
- [ ] Add possibility for game master to lock team picking
- [x] Add room overview
- [x] Lobby

### History

- [x] Fix all of the above
- [x] Fix text alignment
- [x] Handle card reveal
- [x] Handle disconnect
- [x] Handle set game master
- [x] Handle set spy master
- [x] Make playerchip white theme friendly

## Tests

- [ ] Begin
- [ ] Install a CI
- [ ] Server Crash on gamestart ??? isAdmin undefined
- [ ] Use moccha/nyc ?

## Cleanup

- [ ] Make setter to dispatch players changed event
- [ ] Sort Game.ts methods
- [ ] Split Game.ts
- [ ] Split shared/interfaces into single files
- [ ] Use enums instead of types for Team and HistoryAction
- [ ] find a method to bundle 'playersUpdate'
- [ ] try to not use Array.form() in removePlayer for spyMaster
- [x] Fix HUMONGOUS bundle size
- [x] Fix get spies and admins
- [x] Get rid of GameMasterUUID or use a unique setter
- [x] Get rid of spymaster red and blue properties
- [x] Transform getXXX into real getter
- [x] Unify admin and GameMaster
- [x] Use maps to get rid of @ts-ignore
- [x] `this.player[playerUUID] -> player` vv


## Style

- [x] Make playerChip extend Chip to add icons
- [ ] Put everything in theme
- [ ] Disable startGame for nonGameMaster


## Features

- [ ] Add possibility of custom board
- [ ] Add possibility of custom wordlist
- [ ] Going to profile
- [ ] New game after game finish
- [ ] Possibility to kick a player
- [ ] Possibility to make password protected games
- [ ] Team chats
- [ ] voting system ?
- [x] Display name on profile page
- [x] Fix typos

## One step-er
