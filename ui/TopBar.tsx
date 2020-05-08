import {
  AppBar,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { Menu as MenuIcon } from "@material-ui/icons";
import * as React from "react";
import { useHistory } from "react-router-dom";
import { Store } from "./Store";
import { setCookie, setLang } from "./tools/helpers";

const TopBar = () => {
  const { state, dispatch } = React.useContext(Store);

  const [anchorLang, setAnchorLang] = React.useState(null);
  const [anchor, setAnchor] = React.useState(null);
  const isLangMenuOpen = Boolean(anchorLang);
  const isMenuOpen = Boolean(anchor);

  const history = useHistory();

  function handleLangMenuOpen(event) {
    setAnchorLang(event.currentTarget);
  }

  function handleMenuOpen(event) {
    setAnchor(event.currentTarget);
  }

  function handleMenuClose() {
    setAnchorLang(null);
    setAnchor(null);
  }

  function handleLang(lang) {
    handleMenuClose();
    setLang(state.cookieName, { ...state.cookie, lang: lang }, dispatch);
  }

  function resetName() {
    setCookie(state.cookieName, { ...state.cookie, name: undefined }, dispatch);
    handleMenuClose();
  }

  function navigate(location) {
    history.push(location);
    handleMenuClose();
  }

  const renderLangMenu = (
    <Menu
      anchorEl={anchorLang}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id="lang-menu"
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isLangMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={() => handleLang("fr")}>
        {state.langRes.topBar.languageName.french}
      </MenuItem>
      <MenuItem onClick={() => handleLang("en")}>
        {state.langRes.topBar.languageName.english}
      </MenuItem>
    </Menu>
  );

  const renderMenu = (
    <Menu
      anchorEl={anchor}
      anchorOrigin={{ vertical: "top", horizontal: "left" }}
      id="menu"
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "left" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={() => navigate("/")}>
        {state.langRes.topBar.home}
      </MenuItem>
      <MenuItem onClick={() => navigate("/profile")}>
        {state.langRes.topBar.profile}
      </MenuItem>
    </Menu>
  );

  return (
    <>
      <AppBar position="relative">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleMenuOpen}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            {state.langRes.topBar.codenames}
          </Typography>
          <Button color="inherit" onClick={handleLangMenuOpen}>
            {state.langRes.topBar.language}
          </Button>
        </Toolbar>
      </AppBar>
      {renderLangMenu}
      {renderMenu}
    </>
  );
};

export default TopBar;
