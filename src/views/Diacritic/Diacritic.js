import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import MobileStepper from "@material-ui/core/MobileStepper";
import Button from "@material-ui/core/Button";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import Box from "@material-ui/core/Box";
import Languages from "../../Languages";
import Card from "@material-ui/core/Card";
import Defines from "../../Defines";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  card: {
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
  const getLangSrc = () => {
    if (localStorage.getItem(prefix + "langSrc") === null) {
        return 0;
      }
      return parseInt(localStorage.getItem(prefix + "langSrc"), 10);
  }
  const [langSrc, setLangSrc] = React.useState(() => {
    return getLangSrc()
  });

  const getLangSrcLetter = () => {
    if (localStorage.getItem(prefix + "langSrcLetter") === null) return 0;
    return parseInt(localStorage.getItem(prefix + "langSrcLetter"), 10);
  }
  // current src letter
  const [langSrcLetter, setLangSrcLetter] = React.useState(() => {
    return getLangSrcLetter()
  });

  // current src letter diacritic
  const [langSrcLetterDiac, setLangSrcLetterDiac] = React.useState(() => {
    if (isNaN(localStorage.getItem(prefix + "langSrcLetterDiac"))) 
        return 1;
    if (localStorage.getItem(prefix + "langSrcLetterDiac") === null) 
        return 1;
    return parseInt(localStorage.getItem(prefix + "langSrcLetterDiac"), 10);
  })

  // destination language
  const getLangDst = () => {
    return parseInt(localStorage.getItem(prefix + "langDst"), 10)
  }
  const [langDst, setLangDst] = React.useState(() => {
      return getLangDst()
  });

  const getLangDstLetter = () => {
    if (localStorage.getItem(prefix + "langDstLetter") === null) return 0;
    return parseInt(localStorage.getItem(prefix + "langDstLetter"), 10);
  }
  // current destination letter TODO: need to read from Learn component
  const [langDstLetter, setLangDstLetter] = React.useState(() => {
    return getLangDstLetter()
  });

  // current destination letter diacritic
  const [langDstLetterDiac, setLangDstLetterDiac] = React.useState(() => {
    if (isNaN(localStorage.getItem(prefix + "langDstLetterDiac")))
        return 1;
    if (localStorage.getItem(prefix + "langDstLetterDiac") === null)
        return 1;
    return parseInt(localStorage.getItem(prefix + "langDstLetterDiac"), 10);
  })

  // get diacritic
  const getLetter = (index, offset) => {
    if (typeof index === "undefined" || index === null) {
      return;
    }
    if (typeof offset === "undefined" || offset === null) {
      return;
    }
    
    let letter = Languages.languages[index].letters[offset]
    if (letter === "-")
        return "-"
    return Languages.languages[index].diacritics[letter][langDstLetterDiac];
  };

  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(() => {
    if (localStorage.getItem(prefix + "activeStepDiac") === null) {
      return 1;
    }

    return parseInt(localStorage.getItem(prefix + "activeStepDiac"), 10);
  });
  
  const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setLangSrcLetterDiac(langSrcLetterDiac + 1);
      setLangDstLetterDiac(langDstLetterDiac + 1);
      localStorage.setItem(prefix + "langSrcLetterDiac", langSrcLetterDiac + 1);
      localStorage.setItem(prefix + "langDstLetterDiac", langDstLetterDiac + 1);
      localStorage.setItem(prefix + "activeStepDiac", activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setLangSrcLetterDiac(langSrcLetterDiac - 1);
    setLangDstLetterDiac(langDstLetterDiac - 1);
    localStorage.setItem(prefix + "langSrcLetterDiac", langSrcLetterDiac - 1);
    localStorage.setItem(prefix + "langDstLetterDiac", langDstLetterDiac - 1);
    localStorage.setItem(prefix + "activeStepDiac", activeStep - 1);
  };

  const getStepCount = (index) => {
    if (typeof index === "undefined" || index == null) {
      return -1;
    }
    let letter = Languages.languages[index].letters[langSrcLetter]
    if (letter === "-")
        return "-"
    return Languages.languages[index].diacritics[letter].length;
  };

  // learning page
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid
          item
          xs={6}
          sm={6}
          md={6}
          lg={6}
          xl={6}
          component={Card}
          className={classes.card}
        >
          {/* show alphabet */}
          <Box fontSize={48}>{getLetter(getLangSrc(), getLangSrcLetter())}</Box>
        </Grid>
        {typeof langSrc !== "undefined" && langSrc !== null && (
          <Grid
            item
            xs={6}
            sm={6}
            md={6}
            lg={6}
            xl={6}
            component={Card}
            className={classes.card}
          >
            {/* show alphabet */}
            <Box fontSize={48}>{getLetter(getLangDst(), getLangDstLetter())}</Box>
          </Grid>
        )}
      </Grid>

      {/* Prev..Next navigation */}
      <Grid container spacing={3}>
        {typeof langDst !== "undefined" && langDst !== null && (
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} component={Card}>
            <MobileStepper
              variant="progress"
              steps={getStepCount(langSrc)}
              position="static"
              activeStep={activeStep}
              // className={classes.root}
              nextButton={
                <Button
                  size="small"
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
                  size="small"
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
      </Grid>

    </div>
  );
}
