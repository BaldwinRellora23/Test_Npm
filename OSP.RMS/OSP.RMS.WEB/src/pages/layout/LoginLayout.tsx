import Bg_Stpeter from "../../assets/StPeter-Background.png";

export const leftBG = {
  display: {
    base: "none",
    md: "block",
  },
  flex: "1",
  color: "white",
  bgImage: `url(${Bg_Stpeter})`,
  bgSize: "cover",
  bgRepeat: "no-repeat",
  bgPosition: "center",
};

export const FlexLeftBG = {
  mt: "400px",
  alignItems: "center",
  height: 170,
  bgColor: "green.700",
  opacity: 0.9,
};

export const FlexRightBG = {
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  flexDirection: "column",
};

export const InputLayout = {
  width: {
    base: "300px",
    md: "500px",
    lg: "500px",
  },
  variant: "outline",
  focusBorderColor: "green.700",
  borderColor: "gray.300",
  mb: "3",
};

export const ButtonLayout = {
  colorScheme: "green",
  width: {
    base: "93.5%",
    md: "100%",
    lg: "100%",
  },
  mb: 3,
  mx: {
    base: "10px",
    md: "0px",
    lg: "0px",
  },
};

export const FormControlRes = {
  paddingLeft: {
    base: "10px",
    md: "0px",
    lg: "0px",
  },
};

export const HeadingLayout = {
  fontWeight: "medium",
  pb: 5,
  color: "green.700",
  fontSize: { base: "4xl" },
};
