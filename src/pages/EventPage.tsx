import { FC } from "react";
import { useParams } from "react-router-dom";
import EventData from "../data/events.json";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import ReactMarkdown from "markdown-to-jsx";
import Link from "@mui/material/Link";

function MarkdownListItem(props: any) {
  return <Box component="li" sx={{ mt: 1, typography: "body1" }} {...props} />;
}

const options = {
  overrides: {
    h1: {
      component: Typography,
      props: {
        gutterBottom: true,
        variant: "h4",
        component: "h1",
      },
    },
    h2: {
      component: Typography,
      props: { gutterBottom: true, variant: "h6", component: "h2" },
    },
    h3: {
      component: Typography,
      props: { gutterBottom: true, variant: "subtitle1" },
    },
    h4: {
      component: Typography,
      props: {
        gutterBottom: true,
        variant: "caption",
        paragraph: true,
      },
    },
    p: {
      component: Typography,
      props: { paragraph: true },
    },
    a: { component: Link },
    li: {
      component: MarkdownListItem,
    },
  },
};

function Markdown(props: any) {
  return <ReactMarkdown options={options} {...props} />;
}
export const EventPage: FC<{}> = (props) => {
  const { idParam } = useParams();
  const data = EventData["events"].filter(
    (event) => event.id.toString() === idParam
  )[0];
  //   console.log(data);
  const { id, title, date, description, imageSource } = data;

  return (
    <Grid
      item
      xs={12}
      md={8}
      sx={{
        "& .markdown": {
          py: 3,
        },
      }}
    >
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      {date}
      <Divider />
      <img src={imageSource}></img>
      <Markdown className="markdown" key={description.substring(0, 40)}>
        {description}
      </Markdown>
    </Grid>
  );
};
