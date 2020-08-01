import ReactGA from "react-ga";

/**
 * Event - Add custom tracking event.
 * @param {string} category
 * @param {string} action
 * @param {string} label
 * * @param {number} value
 */
export const GEvent = (category, action, label, value) => {
  console.log("reactga:event:", category, action, label, value);
  ReactGA.event({
    category: category,
    action: action,
    label: label,
    value: value,
  });
};
