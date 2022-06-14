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

export default function RecipeReviewCardUrl(props) {
  const [expanded, setExpanded] = React.useState(false);
  const addToFavorites = async (e) => {
    e.preventDefault();
    const result = await instance.request({
      data: {
        data_type: "addToFavorites",
        params: {
          adID: props.adBlock.ad.adID,
          user_id: props.adBlock.ad.user_id,
        },
      },
    });
    console.log(result.data);
    console.log("add to favorites");
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
        subheader="<Parameter paramName=תאריך יצירת המודעה
            paramValue=props.adBlock.ad.create_time/> "
      />
      <AdImages
        key={uuidv4()}
        images={props.adBlock.adImages}
        numPicToDisplay="1"
      />
      <CardContent>
        <AdPart ad={props.adBlock.ad} className="adPart" />
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={addToFavorites}>
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share" onClick={shareWhatsapp}>
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
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
