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
  chatBoxWrapper: {
    position: "fixed",
    width: "100%",
    height: "100%",
    display: "flex",
    flexWrap: "wrap-reverse",
    flexDirection: "row-reverse",
    bottom: "25px",
    right: "25px",
  },
  chatBoxInned: {
    width: "130px",
    height: "130px",
    position: "absolute",
    backgroundColor: "green",
  },
};