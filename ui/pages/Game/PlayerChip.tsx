import { Chip, Menu, MenuItem, useTheme } from "@material-ui/core";
import { Settings, Visibility, VisibilityOff } from "@material-ui/icons";
import * as React from "react";
import { EPlayerStatus, IPlayer } from "../../../shared";
import { Store } from "../../Store";
import { blueTeamColor, redTeamColor } from "../../shared/theme";

interface ICommands {
  makeSpyMaster: () => void;
  makeGameMaster: () => void;
  changeTeam: () => void;
}

interface PlayerChipProps {
  player: IPlayer;
  commands?: ICommands;
}

const iconStyle = { color: "#FFF" };

const PlayerChip = ({ player, commands }: PlayerChipProps) => {
  const { state } = React.useContext(Store);

  const theme = useTheme();

  const [anchor, setAnchor] = React.useState(null);
  const isMenuOpen = Boolean(anchor);

  function getColor() {
    let color = player.team === "red" ? redTeamColor : blueTeamColor;
    if (player.socketsNo <= 0) {
      color += "44";
    }
    return color;
  }

  function displayMenu(event) {
    setAnchor(event.currentTarget);
  }

  function closeMenu() {
    setAnchor(null);
  }

  function createMenuCallback(callback) {
    if (callback) {
      return () => {
        callback();
        closeMenu();
      };
    }
    return closeMenu;
  }

  function doNothing() {}

  return (
    <>
      <Chip
        onClick={displayMenu}
        label={player.name}
        style={{
          backgroundColor: getColor(),
          color: "#FFF",
          marginRight: "5px",
        }}
        size="small"
        onDelete={
          commands && !player.isSpyMaster ? commands.makeSpyMaster : doNothing
        }
        deleteIcon={
          player.isSpyMaster ? (
            <Visibility style={iconStyle} />
          ) : (
            <VisibilityOff style={iconStyle} />
          )
        }
        icon={player.isGameMaster ? <Settings style={iconStyle} /> : null}
      />
      {commands ? (
        <Menu
          anchorEl={anchor}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          id="menu"
          keepMounted
          transformOrigin={{ vertical: "bottom", horizontal: "center" }}
          open={isMenuOpen}
          onClose={closeMenu}
        >
          <MenuItem onClick={createMenuCallback(commands.makeSpyMaster)}>
            {state.langRes.playerChip.makeSpyMaster}
          </MenuItem>
          <MenuItem onClick={createMenuCallback(commands.makeGameMaster)}>
            {state.langRes.playerChip.makeGameMaster}
          </MenuItem>
          <MenuItem onClick={createMenuCallback(commands.changeTeam)}>
            {state.langRes.playerChip.changeTeam}
          </MenuItem>
          <MenuItem onClick={closeMenu}>
            {state.langRes.playerChip.close}
          </MenuItem>
        </Menu>
      ) : null}
    </>
  );
};

export default PlayerChip;
