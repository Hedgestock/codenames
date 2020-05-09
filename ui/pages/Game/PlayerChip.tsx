import { Chip, Menu, MenuItem, useTheme } from "@material-ui/core";
import { Settings, Visibility, VisibilityOff } from "@material-ui/icons";
import * as React from "react";
import { EPlayerStatus, IPlayer } from "../../../shared/interfaces";
import { Store } from "../../Store";
import { blueTeamColor, redTeamColor } from "../../theme";

interface PlayerChipProps {
  player: IPlayer;
  makeSpyMaster?: () => void;
  makeGameMaster?: () => void;
}

const iconStyle = { color: "#FFF" };

const PlayerChip = ({ player, makeSpyMaster }: PlayerChipProps) => {
  const { state, dispatch } = React.useContext(Store);

  const theme = useTheme();

  const [anchor, setAnchor] = React.useState(null);
  const isMenuOpen = Boolean(anchor);

  function getColor() {
    let color = player.team === "red" ? redTeamColor : blueTeamColor;
    if (player.status == EPlayerStatus.DISCONNECTED) {
      color += "44";
    }
    console.log(color);
    return color;
  }

  function displayMenu(event) {
    setAnchor(event.currentTarget);
  }

  function closeMenu() {
    setAnchor(null);
  }
  const renderMenu = (
    <Menu
      anchorEl={anchor}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      id="menu"
      keepMounted
      transformOrigin={{ vertical: "bottom", horizontal: "center" }}
      open={isMenuOpen}
      onClose={closeMenu}
    >
      <MenuItem onClick={makeSpyMaster ?? (() => null)}>
        {state.langRes.playerChip.makeSpyMaster}
      </MenuItem>
      <MenuItem onClick={closeMenu}>
        {state.langRes.playerChip.makeGameMaster}
      </MenuItem>
      <MenuItem onClick={closeMenu}>
        {state.langRes.playerChip.changeTeam}
      </MenuItem>
      <MenuItem onClick={closeMenu}>{state.langRes.playerChip.close}</MenuItem>
    </Menu>
  );

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
        onDelete={makeSpyMaster ?? (() => null)}
        deleteIcon={
          player.isSpyMaster ? (
            <Visibility style={iconStyle} />
          ) : (
            <VisibilityOff style={iconStyle} />
          )
        }
        icon={player.isGameMaster ? <Settings style={iconStyle} /> : null}
      />
      {renderMenu}
    </>
  );
};

export default PlayerChip;
