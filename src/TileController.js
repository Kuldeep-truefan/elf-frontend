import "./App.css";
import { Button, Stack} from "@mui/material";

function TileController({FetchLink}) {
      // else{
      //   setState({ open: false});
      // }

  return (
    <div className="tc">
      <div>
      <Stack spacing={2} direction="row">
        {/* GetLink */}
        <Button sx={{borderRadius:"1rem"}} variant="outlined"
        onClick = {FetchLink}
        >Refresh Tiles</Button>
      </Stack>
      </div>
    </div>
  );
}

export default TileController;
