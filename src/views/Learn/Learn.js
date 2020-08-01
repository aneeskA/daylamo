import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import MobileStepper from "@material-ui/core/MobileStepper";
import Button from "@material-ui/core/Button";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import Box from "@material-ui/core/Box";
import Languages from "../../Languages";
import Card from "@material-ui/core/Card";
import Defines from "../../Defines";
import Typography from "@material-ui/core/Typography";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Diacritic from "../Diacritic/Diacritic";
import IconButton from "@material-ui/core/IconButton";
import { GEvent } from "../../components/Tracking";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(4),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    fontSize: 28,
  },
  header: {
    fontSize: 18,
    m: 1,
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  card: {
    marginTop: 16,
    marginBottom: 16,
    spacing: 4,
    padding: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    textAlign: "center",
    color: theme.palette.text.secondary,
    minHeight: 200,
  },
  shortcut: {
    marginTop: 5,
    marginBottom: 5,
    spacing: 4,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    textAlign: "center",
    color: theme.palette.text.secondary,
    fontSize: 10,
  },
  shortcutTitle: {
    fontSize: 14,
    marginTop: 16,
  },
  diacritics: {
    marginTop: 5,
    marginBottom: 5,
    spacing: 4,
    color: theme.palette.text.secondary,
    backgroundColor: "#dcf2e5",
  },
  nextprev: {
    marginTop: 16,
    marginBottom: 16,
    spacing: 4,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

export default function Learn() {
  const prefix = Defines.Prefix;
  const classes = useStyles();
  // source language
  const [langSrc, setLangSrc] = React.useState(() => {
    if (localStorage.getItem(prefix + "langSrc") === null) {
      return 0;
    }
    return parseInt(localStorage.getItem(prefix + "langSrc"), 10);
  });
  const handleChangeSrc = (event) => {
    setLangSrc(event.target.value);
    GEvent(
      "learn",
      "set learn",
      Languages.languages[event.target.value].name,
      event.target.value
    );
    // save choice
    localStorage.setItem(prefix + "langSrc", event.target.value);
  };
  const [langSrcLetter, setLangSrcLetter] = React.useState(() => {
    if (localStorage.getItem(prefix + "langSrcLetter") === null) return 0;
    return parseInt(localStorage.getItem(prefix + "langSrcLetter"), 10);
  });

  // destination language
  const [langDst, setLangDst] = React.useState(
    localStorage.getItem(prefix + "langDst")
  );
  const handleChangeDst = (event) => {
    setLangDst(event.target.value);
    GEvent(
      "learn",
      "set know",
      Languages.languages[event.target.value].name,
      event.target.value
    );
    // save choice
    localStorage.setItem(prefix + "langDst", event.target.value);
  };
  const [langDstLetter, setLangDstLetter] = React.useState(() => {
    if (localStorage.getItem(prefix + "langDstLetter") === null) return 0;
    return parseInt(localStorage.getItem(prefix + "langDstLetter"), 10);
  });

  const getLetter = (index, offset) => {
    if (typeof index === "undefined" || index === null) {
      return;
    }
    if (typeof offset === "undefined" || offset === null) {
      return;
    }
    return Languages.languages[index].letters[offset];
  };

  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(() => {
    if (localStorage.getItem(prefix + "activeStep") === null) {
      return 0;
    }

    return parseInt(localStorage.getItem(prefix + "activeStep"), 10);
  });
  const handleNext = () => {
    GEvent("learn", "next", Languages.languages[langSrc].name);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setLangSrcLetter(langSrcLetter + 1);
    setLangDstLetter(langDstLetter + 1);
    localStorage.setItem(prefix + "langSrcLetter", langSrcLetter + 1);
    localStorage.setItem(prefix + "langDstLetter", langDstLetter + 1);
    localStorage.setItem(prefix + "activeStep", activeStep + 1);
  };
  const handleBack = () => {
    GEvent("learn", "back", Languages.languages[langSrc].name);
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setLangSrcLetter(langSrcLetter - 1);
    setLangDstLetter(langDstLetter - 1);
    localStorage.setItem(prefix + "langSrcLetter", langSrcLetter - 1);
    localStorage.setItem(prefix + "langDstLetter", langDstLetter - 1);
    localStorage.setItem(prefix + "activeStep", activeStep - 1);
  };
  const getStepCount = (index) => {
    if (typeof index === "undefined" || index == null) {
      return -1;
    }
    return Languages.languages[index].letters.length;
  };

  const handleShortCut = (event) => {
    const value = parseInt(event.currentTarget.value, 10);
    setLangSrcLetter(value);
    setLangDstLetter(value);
    setActiveStep(value);
    localStorage.setItem(prefix + "langSrcLetter", value);
    localStorage.setItem(prefix + "langDstLetter", value);
    localStorage.setItem(prefix + "activeStep", value);
  };

  // learning page
  return (
    <div className={classes.root}>
      {/* Show language selection */}
      <Grid container spacing={3}>
        <Grid item xs={1} sm={3} md={3} lg={3} xl={3}></Grid>
        <Grid
          item
          xs={5}
          sm={3}
          md={3}
          lg={3}
          xl={3}
          component={Card}
          className={classes.card}
        >
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">
              I want to learn
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={langSrc}
              onChange={handleChangeSrc}
            >
              {Languages.languages.map((language, index) => (
                <MenuItem
                  value={index}
                  disabled={
                    typeof langDst !== "undefined" &&
                    langDst !== null &&
                    Languages.languages[langDst].name === language.name
                  }
                >
                  {language.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {/* show alphabet */}
          <Box fontSize={80}>{getLetter(langSrc, langSrcLetter)}</Box>
        </Grid>
        {typeof langSrc !== "undefined" && langSrc !== null && (
          <Grid
            item
            xs={5}
            sm={3}
            md={3}
            lg={3}
            xl={3}
            component={Card}
            className={classes.card}
          >
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">I know</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={langDst}
                onChange={handleChangeDst}
              >
                {Languages.languages.map((language, index) => (
                  <MenuItem
                    value={index}
                    disabled={
                      Languages.languages[langSrc].name === language.name
                    }
                  >
                    {language.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {/* show alphabet */}
            <Box fontSize={80}>{getLetter(langDst, langDstLetter)}</Box>
          </Grid>
        )}
        {typeof langSrc !== "undefined" && langSrc !== null && (
          <Grid item xs={1} sm={3} md={3} lg={3} xl={3}></Grid>
        )}
      </Grid>

      {/* Show shortcut */}
      <Grid container spacing={3}>
        {typeof langDst !== "undefined" && langDst !== null && (
          <Grid item xs={1} sm={3} md={3} lg={3} xl={3}></Grid>
        )}
        {typeof langDst !== "undefined" && langDst !== null && (
          <Grid
            item
            xs={10}
            sm={6}
            md={6}
            lg={6}
            xl={6}
            component={Card}
            className={classes.shortcut}
          >
            <Box>
              {typeof langDst !== "undefined" &&
                langDst !== null &&
                typeof Languages.languages[langDst].diacritics[
                  getLetter(langDst, langDstLetter)
                ] !== "undefined" && (
                  <ExpansionPanel className={classes.diacritics}>
                    <ExpansionPanelSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography className={classes.header}>
                        {
                          Languages.languages[langDst].diacritics[
                            getLetter(langDst, langDstLetter)
                          ][0]
                        }{" "}
                        {
                          Languages.languages[langDst].diacritics[
                            getLetter(langDst, langDstLetter)
                          ][1]
                        }{" "}
                        {
                          Languages.languages[langDst].diacritics[
                            getLetter(langDst, langDstLetter)
                          ][2]
                        }{" "}
                        {
                          Languages.languages[langDst].diacritics[
                            getLetter(langDst, langDstLetter)
                          ][3]
                        }
                      </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                      <Diacritic />
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                )}
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Typography className={classes.shortcutTitle}>
                  jump to
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <IconButton value={0} onClick={handleShortCut}>
                  {getLetter(langDst, 0)}
                </IconButton>
                <IconButton value={7} onClick={handleShortCut}>
                  {getLetter(langDst, 7)}
                </IconButton>
                <IconButton value={15} onClick={handleShortCut}>
                  {getLetter(langDst, 15)}
                </IconButton>
                <IconButton value={20} onClick={handleShortCut}>
                  {getLetter(langDst, 20)}
                </IconButton>
                <IconButton value={25} onClick={handleShortCut}>
                  {getLetter(langDst, 25)}
                </IconButton>
                <IconButton value={30} onClick={handleShortCut}>
                  {getLetter(langDst, 30)}
                </IconButton>
                <IconButton value={35} onClick={handleShortCut}>
                  {getLetter(langDst, 35)}
                </IconButton>
                <IconButton value={40} onClick={handleShortCut}>
                  {getLetter(langDst, 40)}
                </IconButton>
              </Grid>
            </Box>
          </Grid>
        )}
        {typeof langDst !== "undefined" && langDst !== null && (
          <Grid item xs={1} sm={3} md={3} lg={3} xl={3}></Grid>
        )}
      </Grid>

      {/* Prev..Next navigation */}
      <Grid container spacing={3}>
        {typeof langDst !== "undefined" && langDst !== null && (
          <Grid item xs={1} sm={3} md={3} lg={3} xl={3}></Grid>
        )}
        {typeof langDst !== "undefined" && langDst !== null && (
          <Grid
            item
            xs={10}
            sm={6}
            md={6}
            lg={6}
            xl={6}
            component={Card}
            className={classes.nextprev}
          >
            <MobileStepper
              variant="progress"
              steps={getStepCount(langSrc)}
              position="static"
              activeStep={activeStep}
              // className={classes.root}
              nextButton={
                <Button
                  size="large"
                  onClick={handleNext}
                  disabled={
                    getStepCount(langSrc) < 0 ||
                    getStepCount(langDst) < 0 ||
                    activeStep === getStepCount(langSrc) - 1
                  }
                >
                  Next
                  {theme.direction === "rtl" ? (
                    <KeyboardArrowLeft />
                  ) : (
                    <KeyboardArrowRight />
                  )}
                </Button>
              }
              backButton={
                <Button
                  size="large"
                  onClick={handleBack}
                  disabled={activeStep === 0}
                >
                  {theme.direction === "rtl" ? (
                    <KeyboardArrowRight />
                  ) : (
                    <KeyboardArrowLeft />
                  )}
                  Prev
                </Button>
              }
            />
          </Grid>
        )}
        {typeof langDst !== "undefined" && langDst !== null && (
          <Grid item xs={1} sm={3} md={3} lg={3} xl={3}></Grid>
        )}
      </Grid>
    </div>
  );
}
