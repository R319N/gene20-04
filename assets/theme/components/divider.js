import colors from "../base/colors";
import rgba from "../functions/rgba";
import pxToRem from "../functions/pxToRem";

const { light, transparent, white, dark, text } = colors;

const divider = {
  styleOverrides: {
    root: {
      backgroundColor: transparent.main,
      backgroundImage:
        `linear-gradient(to right,#655dd811 0%,#655dd8 30%, #7E78D208 100%),
       linear-gradient(to right,#7E78D211 0%,#7D2EB2 50%, #655dd808 100%)`,
      height: pxToRem(1.5),
      margin: `${pxToRem(4)} 0`,
      borderBottom: "none",
      opacity: 0.25,
    },

    vertical: {
      // backgroundColor: transparent.main,
      backgroundImage: `linear-gradient(to bottom, ${rgba(
        dark.main,
        0
      )}, ${rgba(text.primary, 0.4)}, ${rgba(text.primary, 0)}) !important`,
      width: pxToRem(2),
      height: pxToRem(40),// transform to dynamic @100%
      margin: `0 ${pxToRem(16)}`,
      borderRight: "none",
      opacity: 0.25,
    },

    light: {
      backgroundColor: transparent.main,
      backgroundImage: `linear-gradient(to right, ${rgba(white.main, 0)}, ${white.main
        }, ${rgba(white.main, 0)}) !important`,

      "&.MuiDivider-vertical": {
        backgroundImage: `linear-gradient(to bottom, ${rgba(white.main, 0)}, ${white.main
          }, ${rgba(white.main, 0)}) !important`,
      },
    },
  },
};

export default divider;
