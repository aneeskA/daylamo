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
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Footer from "../Footer";

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
    fontSize: 32,
    m: 1,
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
    minHeight: 200,
  },
  answers: {
    marginTop: 16,
    marginBottom: 16,
    spacing: 4,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    textAlign: "center",
    color: theme.palette.text.secondary,
    fontSize: 30,
  },
  optionsTitle: {
    fontSize: 14,
  },
  answerDefault: {
    fontSize: 36,
    color: theme.palette.text.secondary,
  },
  answerWrong: {
    fontSize: 36,
    color: theme.palette.error.dark,
  },
  answerCorrect: {
    fontSize: 36,
    color: theme.palette.primary.light,
  },
}));

export default function Review() {
  const prefix = Defines.Prefix;
  const classes = useStyles();

  // random number generator
  const getRandom = (min, max) => {
    const step1 = max - min + 1;
    const step2 = Math.random() * step1;
    const r = Math.floor(step2) + min;
    return r;
  };

  const createArrayIndices = (start, end) => {
    let a = [];
    for (let i = start; i <= end; i++) {
      a.push(i);
    }

    return a;
  };

  // source language
  const [langSrc, setLangSrc] = React.useState(() => {
    if (localStorage.getItem(prefix + "langSrc") === null) {
      return 0;
    }
    return parseInt(localStorage.getItem(prefix + "langSrc"), 10);
  });
  const handleChangeSrc = (event) => {
    setLangSrc(event.target.value);
    setSrcLangLettersAll(getLangLettersAll(event.target.value))
    setReviewLetter(generateLetter(event.target.value, langDst));
    setCorrectAnswer("?");
  };

  // build list of entire set of letters including diacritics
  const getLangLettersAll = (lang) => {
    if (typeof lang === "undefined")
      return [];
    
      var array = [...Languages.languages[lang].letters]
      for(const letter of Languages.languages[lang].letters) {
        let l = Languages.languages[lang].diacritics[letter]
        if (typeof l === "undefined")
          l = "-"
        array = array.concat(l)
      }
      // console.log(array)
      return array
  }
  const [langSrcLettersAll, setSrcLangLettersAll] = React.useState(() => {
    return getLangLettersAll(langSrc)
  })

  // destination language
  const [langDst, setLangDst] = React.useState(() => {
    if (localStorage.getItem(prefix + "langDst") === null) {
      return 0;
    }
    return parseInt(localStorage.getItem(prefix + "langDst"), 10);
  });
  const handleChangeDst = (event) => {
    setLangDst(event.target.value);
    setDstLangLettersAll(getLangLettersAll(event.target.value))
    setReviewLetter(generateLetter(langSrc, event.target.value));
    setCorrectAnswer("?");
  };
  const [langDstLettersAll, setDstLangLettersAll] = React.useState(() => {
    return getLangLettersAll(langDst)
  })

  // create src language indices array for question creation
  const [srcArray, setSrcArray] = React.useState(() => {
    if (typeof langSrc !== "undefined") {
      return createArrayIndices(
        0,
        langSrcLettersAll.length - 1
      );
    }
    return [];
  });

  // answer key
  const [answerOptions, setAnswerOptions] = React.useState([]);

  const answerArray = (letter, langD) => {
    var array = [
      {
        letter: letter,
        answer: "yes",
      },
    ];
    // remove duplicates and absent letters
    for (var i = 0; i < 3; i++) {
      let index = getRandom(0, langD.length - 1);
      let letter = langD[index];
      // locate letter in array
      var found = false;
      for (var j = 0; j < array.length; j++) {
        if (letter === array[j].letter || letter === "-") {
          found = true;
          break;
        }
      }
      if (found === true) {
        i--;
        continue;
      }
      array.push({ letter: letter, answer: "no" });
    }

    // console.log(array);
    return array;
  };

  const shuffle = (array) => {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  };

  // generate question letter
  const generateLetter = (langS, langD) => {
    // I am ashamed of this
    // reason: since on a state change, the latest value is not
    // available immediately and total letters are now created
    // on every visit, this temp array(s) is needed to accommodate
    // that workflow.
    // basically, my react-fu is bad
    let templangSrcLettersAll = []
    let templangDstLettersAll = []
    if (langS !== langSrc) {
      templangSrcLettersAll = getLangLettersAll(langS)
    } else {
      templangSrcLettersAll = langSrcLettersAll
    }
    if (langD !== langDst) {
      templangDstLettersAll = getLangLettersAll(langD)
    } else {
      templangDstLettersAll = langDstLettersAll
    }
    // shame ends

    if (srcArray.length === 1) {
      const letter = templangSrcLettersAll[srcArray[0]];
      setSrcArray(
        createArrayIndices(0, templangSrcLettersAll.length - 1)
      );
      // answer key
      setAnswerOptions(
        shuffle(answerArray(templangDstLettersAll[srcArray[0]]))
      );
      return letter;
    }

    // find a letter other than hyphen
    let i, l, letter;
    do {
      i = getRandom(0, srcArray.length - 1);
      l = srcArray[i];
      letter = templangSrcLettersAll[l];
      if (typeof letter === "undefined") {
        break;
      }
      srcArray.splice(i, 1);
      setSrcArray(srcArray);
    } while (letter === "-");

    // answer key
    setAnswerOptions(
      shuffle(answerArray(templangDstLettersAll[l], templangDstLettersAll))
    );
    return letter;
  };
  // show review letter
  const [reviewLetter, setReviewLetter] = React.useState(() => {
    if (typeof langSrc === "undefined") {
      return;
    }
    return generateLetter(langSrc, langDst);
  });

  const createDefaultColors = () => {
    let array = [];
    for (let i = 0; i < 4; i++) { // Change 4 if more options are added
      array.push(classes.answerDefault);
    }
    return array;
  };

  // color settings
  const [colorValues, setColorValues] = React.useState(() => {
    return createDefaultColors();
  });
  // answer buttons
  const [correctAnswer, setCorrectAnswer] = React.useState("?");
  const handleAnswer = (event) => {
    let colorCopy = [...colorValues];
    if (answerOptions[event.currentTarget.value].answer === "yes") {
      setCorrectAnswer(answerOptions[event.currentTarget.value].letter);
      colorCopy[event.currentTarget.value] = classes.answerCorrect;
    } else {
      colorCopy[event.currentTarget.value] = classes.answerWrong;
    }

    setColorValues(colorCopy);
  };

  // next letter widget
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setReviewLetter(generateLetter(langSrc, langDst));
    setCorrectAnswer("?");
    setColorValues(createDefaultColors())
  };
  const getSteps = () => {
    if (typeof langSrc === "undefined") {
      return 0;
    }
    return langSrcLettersAll.length * 10;
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
              {Defines.Revise}
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={langSrc}
              onChange={handleChangeSrc}
            >
              {Languages.languages.map((language, index) => (
                <MenuItem
                  key={index}
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
          <Box fontSize={80}>{reviewLetter}</Box>
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
              <InputLabel id="demo-simple-select-label">
                {Defines.ReviseWith}
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={langDst}
                onChange={handleChangeDst}
              >
                {Languages.languages.map((language, index) => (
                  <MenuItem
                    key={index}
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
            <Box fontSize={80}>{correctAnswer}</Box>
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
            className={classes.answers}
          >
            <Box>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Typography className={classes.optionsTitle}>
                  Which letter is this?
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                {answerOptions.map((option, index) => (
                  <IconButton key={index} value={index} onClick={handleAnswer}>
                    <Typography className={colorValues[index]}>
                      {option.letter}
                    </Typography>
                  </IconButton>
                ))}
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
          <Grid item xs={10} sm={6} md={6} lg={6} xl={6} component={Card}>
            <MobileStepper
              variant="progress"
              steps={getSteps()}
              position="static"
              activeStep={activeStep}
              nextButton={
                <Button size="large" onClick={handleNext} disabled={false}>
                  Next
                  {theme.direction === "rtl" ? (
                    <KeyboardArrowLeft />
                  ) : (
                    <KeyboardArrowRight />
                  )}
                </Button>
              }
              backButton={
                <Button size="large" disabled={true}>
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
      <Footer />
    </div>
  );
}
