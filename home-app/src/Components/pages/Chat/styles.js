export const styles = {
  chatWithMeButton: {
    cursor: "pointer",
    boxShadow: "0px 0px 16px 6px rgba(0, 0, 0, 0.33)",
    // Border
    borderRadius: "50%",
    // Background
    backgroundImage: `url(https://i.pravatar.cc/300)`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "84px",
    // Size
    width: "84px",
    height: "84px",
  },
  avatarHello: {
    // Position
    position: "absolute",
    left: "calc(-100% - 44px - 28px)",
    top: "calc(50% - 24px)",
    // Layering
    zIndex: "10000",
    boxShadow: "0px 0px 16px 6px rgba(0, 0, 0, 0.33)",
    // Border
    padding: "12px 12px 12px 16px",
    borderRadius: "24px",
    // Color
    backgroundColor: "#f9f0ff",
    color: "black",
  },
  chatBoxLogoWrapper: {
    position: "fixed",
    width: "100%",
    height: "100%",
    display: "flex",
    flexWrap: "wrap-reverse",
    flexDirection: "row-reverse",
    bottom: "25px",
    right: "25px",
  },
  chatBoxWindowWrapper: {
    // Position
    position: "fixed",
    bottom: "116px",
    right: "24px",
    // Size
    width: "420px",
    height: "530px",
    maxWidth: "calc(100% - 48px)",
    maxHeight: "calc(100% - 48px)",
    backgroundColor: "white",
    // Border
    borderRadius: "12px",
    border: `2px solid #f9f0ff`,
    overflow: "hidden",
    // Shadow
    boxShadow: "0px 0px 4px 2px rgba(0, 0, 0, 0.33)",
  },
  chatBoxWindowContant: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "4px",
  },
};