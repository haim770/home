export const styles = {
  chatWithMeButton: {
    cursor: "pointer",
    boxShadow: "0rem 0rem 1.6rem 0.6rem rgba(0, 0, 0, 0.33)",
    // Border
    borderRadius: "50%",
    // Background
    // backgroundImage: `url(https://i.pravatar.cc/300)`,
    // backgroundRepeat: "no-repeat",
    // backgroundPosition: "center",
    // backgroundSize: "8rem",
    // Size
    width: "8rem",
    height: "8rem",
    zIndex: "200000",
  },
  avatarHello: {
    // Position
    position: "absolute",
    left: "calc(-100% - 4.4rem - 2.8rem)",
    top: "calc(50% - 2.4rem)",
    // Layering
    zIndex: "10000",
    boxShadow: "0rem 0rem 1.6rem 0.6rem rgba(0, 0, 0, 0.33)",
    // Border
    padding: "1.2rem 1.2rem 1.2rem 1.6rem",
    borderRadius: "2.4rem",
    // Color
    backgroundColor: "#f9f0ff",
    color: "black",
  },
  chatBoxLogoWrapper: {
    position: "fixed",
    display: "flex",
    flexWrap: "wrap-reverse",
    flexDirection: "row-reverse",
    bottom: "3rem",
    right: "3rem",
    zIndex: "200000",
  },
  chatBoxWindowWrapper: {
    // Position
    // Size

    // maxWidth: "calc(100% - 4.8rem)",
    // maxHeight: "calc(100% - 4.8rem)",
    backgroundColor: "white",
    padding: "1rem",
    maxHeight: "70vh",
    minHeight: "70vh", //30b4
    // overflow: "scroll",
    // Border
    borderRadius: "1.2rem",
    border: `0.2rem solid #f9f0ff`,

    // Shadow
    boxShadow: "0rem 0rem 0.4rem 0.2rem rgba(0, 0, 0, 0.33)",
    zIndex: "200000",
  },
  chatBoxWindowContant: {
    display: "flex",
    marginTop: "0.4rem",
    zIndex: "200000",
  },
};
