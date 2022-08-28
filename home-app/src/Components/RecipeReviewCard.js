import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AdImages from "./AdImages";
import AdPart from "./AdPart";
import AdContentPart from "./AdContentPart";
import AdUserPart from "./AdUserPart.js";
import Parameter from "./Parameter.js";
import { v4 as uuidv4 } from "uuid";
import instance from "../api/AxiosInstance";
import useAuth from "../Auth/useAuth";
import "../styles/RecipeReviewCard.css";
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeReviewCard(props) {
  const { auth } = useAuth();
  const [expanded, setExpanded] = React.useState(false);
  const addOrRemoveToFavorites = async (e) => {
    e.preventDefault();
    if (props.isFavorite) {
      const result = await instance.request({
        data: {
          data_type: "removeFromFavorites",
          params: {
            adID: props.adBlock.ad[0].adID,
            user_id: props.adBlock.ad[0].user_id,
          },
        },
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      });
      console.log(result.data);
      if (result.data === false) {
        props.setIsFavorite(false);
      }
      console.log("remove to favorites");
    } else {
      const result = await instance.request({
        data: {
          data_type: "addToFavorites",
          params: {
            adID: props.adBlock.ad[0].adID,
            user_id: props.adBlock.ad[0].user_id,
          },
        },
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      });
      console.log(result.data);
      if (result.data === false) {
        props.setIsFavorite(true);
      }
      console.log("add to favorites");
    }
  };
  const shareWhatsapp = (e) => {
    e.preventDefault();
    console.log("share link in whatsapp");
  };
  const handleExpandClick = (e) => {
    e.preventDefault();
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: props.maxSize }}>
      <CardHeader
        title={<AdUserPart key={uuidv4()} user={props.adBlock.user} />}
        subheader={
          <Parameter
            paramName="תאריך פג תוקף "
            paramValue={props.adBlock.ad[0].expire_date}
          />
        }
      />
      <AdImages
        key={uuidv4()}
        images={props.adBlock.adImages}
        numPicToDisplay="1"
      />
      <CardContent style={{ display: "flex", justifyContent: "end" }}>
        <AdPart
          ad={props.adBlock.ad}
          className="adPart"
          watch={props.didWatch}
        />
      </CardContent>
      <CardActions disableSpacing>
        {auth.roles ? (
          <IconButton
            aria-label="add to favorites"
            onClick={addOrRemoveToFavorites}
          >
            <FavoriteIcon
              display={auth.accessToken != undefined ? "block" : "none"}
              color={props.isFavorite ? "success" : ""}
            />
          </IconButton>
        ) : (
          ""
        )}
        <IconButton aria-label="share" onClick={shareWhatsapp}>
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon fontSize={"large"} />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <AdContentPart adContent={props.adBlock.adContent} />
        </CardContent>
      </Collapse>
    </Card>
  );
}
RecipeReviewCard.defaultProps = {
  didWatch: 0,
};
