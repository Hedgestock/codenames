# TODO

## Game

- [ ] Add english board generation
- [ ] Add turn handling
- [ ] Add word picking/board generation
- [ ] Better wordlist
- [ ] Delete game on last quit
- [x] Fix goback with websocket
- [ ] Game loop
- [ ] Pass your turn
- [ ] Timeout on disconnect/or maybe give gamemaster option to change role during a game only if spymaster gets diconnected.
- [ ] Update board on role change
- [ ] Use state machine pattern for game
- [ ] implement win condition
- [ ] Make player afk on disconnect
- [x] Add spymaster interface
- [x] Fix chat size

### Lobby

- [ ] Add change team option
- [ ] Add gamemaster commands
- [ ] Add player contextual menu for game master
- [ ] Add possibility for game master to lock team picking
- [ ] Disable startGame for nonGameMaster
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

- [ ] Get rid of GameMasterUUID or use a unique setter
- [ ] Make setter to dispatch players changed event
- [ ] Sort Game.ts methods
- [ ] Split Game.ts
- [ ] Split shared/interfaces into single files
- [x] Transform getXXX into real getter
- [ ] Unify admin and GameMaster
- [ ] Use enums instead of types for Team and HistoryAction
- [x] Use maps to get rid of @ts-ignore
- [x] Fix HUMONGOUS bundle size
- [x] Fix get spies and admins
- [x] Get rid of spymaster red and blue properties
- [x] `this.player[playerUUID] -> player` vv
- [ ] try to not use Array.form() in removePlayer for spyMaster


## Style

- [ ] Make playerChip extend Chip to add icons
- [ ] Put everything in theme

## Features

- [ ] Add possibility of custom board
- [ ] Add possibility of custom wordlist
- [x] Display name on profile page
- [x] Fix typos
- [ ] Going to profile
- [ ] New game after game finish
- [ ] Possibility to kick a player
- [ ] Possibility to make password protected games
- [ ] Team chats
- [ ] voting system ?

## One step-er
