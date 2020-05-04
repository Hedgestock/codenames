# TODO

## Game

- [ ] Game loop
- [x] Add spymaster interface
- [x] Fix chat size
- [ ] Delete game on last quit
- [ ] Fix goback with websocket ??
- [ ] Add word picking/board generation
- [ ] implement win condition
- [ ] Add english board generation
- [ ] Update board on role change
- [ ] Better wordlist
- [ ] Timeout on disconnect/or maybe give gamemaster option to change role during a game only if spymaster gets diconnected.

### Lobby

- [x] Lobby
- [x] Add room overview
- [ ] Add gamemaster commands
- [ ] Disable startGame for nonGameMaster

### History

- [x] Handle card reveal
- [x] Handle disconnect
- [x] Fix text alignment
- [x] Handle set spy master
- [x] Hanldle set game master
- [x] Fix all of the above
- [ ] make playerchip 


## Tests

- [ ] Begin
- [ ] Server Crash on gamestart ??? isAdmin undefined

## Cleanup

- [x] `this.player[playerUUID] -> player` vv
- [x] Get rid of spymaster red and blue properties
- [ ] use maps to get rid of @ts-ignore
- [ ] sort Game.ts methods
- [x] fix get spies and admins
- [ ] unify admin and GameMaster
- [ ] get rid of GameMasterUUID
- [ ] make setter to dispatch players changed event
- [ ] Reduce bundle size (webpack as external ?)

## Features

- [ ] Display name on profile page
- [ ] Add possibility of custom wordlist
- [ ] Add possibility of custom board
- [ ] New game after game finish
- [ ] Fix typos
- [ ] Going to profile
- [ ] Possibility to kick a player
- [ ] Possibility to make password protected games