import ChatEngine from "./ChatEngine";
import { styles } from "./styles";

const index = () => {
  return (
    <div
      className="transition-5"
      style={{
        ...styles.chatBoxLogoWrapper,
      }}
    >
      <ChatEngine />
    </div>
  );
}

export default index